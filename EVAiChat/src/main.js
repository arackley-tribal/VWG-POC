

import Chart from 'chart.js/auto';
import Prism from 'prismjs';

// Import code and styles for supported languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-clike';
import 'prismjs/themes/prism.css'

import './theme.css';
import './style.css';

// Initialise worker
const worker = new Worker(new URL('./worker.js', import.meta.url), {
  type: 'module',
});



// text generation inputs
const QA_CONTEXT_TEXTBOX = document.getElementById('qa-context-textbox');
const QA_QUESTION_TEXTBOX = document.getElementById('qa-question-textbox');
const QA_ANSWER_TEXTBOX = document.getElementById('qa-answer-textbox');
const GENERATE_BUTTON = document.getElementById('generate')

const DEFAULT_GREEDY_PARAMS = {
  max_new_tokens: 50,
  num_beams: 1,
  temperature: 1,
  top_k: 0,
  do_sample: false
}

const TASK_DEFAULT_PARAMS = {
  'translation': DEFAULT_GREEDY_PARAMS,
  'text-generation': {
    max_new_tokens: 100,
    num_beams: 1,
    temperature: 1,
    top_k: 20,
    do_sample: true
  },
  'code-completion': DEFAULT_GREEDY_PARAMS,
  'masked-language-modelling': {
    topk: 5 // number of samples
  },
  'sequence-classification': {},
  'token-classification': {},
  'zero-shot-classification': {
    multi_label: false
  },
  'question-answering': {},
  'summarization': {
    max_new_tokens: 50,
    num_beams: 2,
    temperature: 1,
    top_k: 0,
    do_sample: false
  },
  'automatic-speech-recognition': DEFAULT_GREEDY_PARAMS,
  'image-to-text': DEFAULT_GREEDY_PARAMS,
  'image-classification': {},
  'zero-shot-image-classification': {},
  'object-detection': {},
};

function updateParams(task) {
  let params = TASK_DEFAULT_PARAMS[task]
  if (!params) return;

  for (let [key, value] of Object.entries(params)) {
    let element = document.querySelector(`.generation-option[param-name="${key}"]`)
    if (!element) continue;
    element.value = value;
  }
}

// Parameters
const GENERATION_OPTIONS = document.getElementsByClassName('generation-option');


function isVisible(e) {
  // https://stackoverflow.com/a/38873788
  return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}

GENERATE_BUTTON.addEventListener('click', async (e) => {
  // Set and pass generation settings to web worker
  let data = {
    task: 'question-answering',
    generation: Object.fromEntries([...GENERATION_OPTIONS]
      .filter(isVisible) // Only use parameters that are visible on screen
      .map(x => {
        let value = parseValue(x.value, x.getAttribute('datatype'));
        return [x.getAttribute('param-name'), value]
      }))
  };

  data.context =
    data.question = QA_QUESTION_TEXTBOX.value
  data.elementIdToUpdate = QA_ANSWER_TEXTBOX.id

  worker.postMessage(data);
});

// Handle result returned by the web worker

worker.addEventListener('message', (event) => {
  const message = event.data;

  switch (message.type) {
    case 'download': // for session creation

      if (message.data.status === 'initiate') {
        PROGRESS.style.display = 'block';

        // create progress bar
        PROGRESS_BARS.appendChild(htmlToElement(`
					<div class="progress w-100" model="${message.data.name}" file="${message.data.file}">
						<div class="progress-bar" role="progressbar"></div>
					</div>
				`));

      } else {
        let bar = PROGRESS_BARS.querySelector(`.progress[model="${message.data.name}"][file="${message.data.file}"]> .progress-bar`)

        switch (message.data.status) {
          case 'progress':
            // update existing bar
            bar.style.width = message.data.progress.toFixed(2) + '%';
            bar.textContent = `${message.data.file} (${formatBytes(message.data.loaded)} / ${formatBytes(message.data.total)})`;
            break;

          case 'done':
            // Remove the progress bar
            bar.parentElement.remove();
            break;

          case 'ready':
            // Pipeline is ready - hide container
            PROGRESS.style.display = 'none';
            PROGRESS_BARS.innerHTML = '';
            break;
        }
      }

      break;
    case 'update': // for generation
      let target = message.target;
      let elem = document.getElementById(target);

      switch (message.targetType) {
        case 'code':
          CODE_BLOCKS[target].update(message.data);
          break;
        default: // is textbox
          elem.value = message.data
          break;
      }

      break;
    case 'complete':
      switch (message.targetType) {
        case 'chart':
          const chartToUpdate = CHARTS[message.target];

          let chartData = chartToUpdate.data.datasets[0].data;

          if (message.updateLabels) {
            for (let i = 0; i < message.data.length; ++i) {
              let item = message.data[i];
              chartData[i] = item.score;
              chartToUpdate.data.labels[i] = item.label;
            }
          } else {
            // set data, ensuring labels align correctly
            for (let item of message.data) {
              chartData[
                chartToUpdate.data.labels.indexOf(item.label)
              ] = item.score
            }
          }

          chartToUpdate.update(); // update the chart
          break;

        case 'tokens':
          let target = document.getElementById(message.target);
          target.innerHTML = '';

          let tokens = message.data;

          for (let token of tokens) {
            let elem;
            if (token.type === 'O') {
              elem = document.createTextNode(token.text);
            } else {
              let [textColour, backgroundColour, tagColour] = NER_TAGS[token.type];
              elem = htmlToElement(`<span class="ner-container" style="background-color: ${backgroundColour}; color: ${textColour};">${token.text}<span class="ner-tag" style="background-color: ${tagColour}; color: ${backgroundColour};">${token.type}</span></span>`);
            }
            target.appendChild(elem);

          }
          break;

        case 'overlay':
          let parent = document.getElementById(message.target);

          // Clear previous output, just in case
          parent.innerHTML = '';

          let viewbox = parent.viewBox.baseVal;

          let colours = [];
          let borderColours = [];

          let items = message.data;
          for (let i = 0; i < items.length; ++i) {
            const box = items[i].box;

            let svgns = "http://www.w3.org/2000/svg";
            let rect = document.createElementNS(svgns, 'rect');

            rect.setAttribute('x', viewbox.width * box.xmin);
            rect.setAttribute('y', viewbox.height * box.ymin);
            rect.setAttribute('width', viewbox.width * (box.xmax - box.xmin));
            rect.setAttribute('height', viewbox.height * (box.ymax - box.ymin));

            const colour = COLOURS[i % COLOURS.length];
            rect.style.stroke = rect.style.fill = `rgba(${colour}, 1)`;

            colours.push(`rgba(${colour}, 0.5)`);
            borderColours.push(`rgba(${colour}, 1)`);
            parent.appendChild(rect);
          }

          // Update chart label and data
          const chart = CHARTS[message.chartId];
          chart.data.labels = items.map(x => x.label);
          chart.data.datasets[0] = {
            data: items.map(x => x.score),
            backgroundColor: colours,
            borderColor: borderColours
          };
          chart.update()
          break;
        default: // is text
          document.getElementById(message.target).value = message.data
          break;
      }
      break;
    default:
      break;
  }
});

// Utility functions

function escapeHtml(unsafe) {
  return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}


function htmlToElement(html) {
  // https://stackoverflow.com/a/35385518
  let template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

function formatBytes(bytes, decimals = 0) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Bytes";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)), 10);
  const rounded = (bytes / Math.pow(1000, i)).toFixed(decimals);
  return rounded + " " + sizes[i];
}
