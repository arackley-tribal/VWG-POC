
import './theme.css';
import './style.css';

// Initialise worker
const worker = new Worker(new URL('./worker.js', import.meta.url), {
  type: 'module',
});

let dataSet = [
  ` BP Pulse is a subscription network that offers great value for those who regularly charge away from home. For a monthly fee it allows you to charge at almost 5000 charging points for free. Those that aren’t included come at a discounted rate, so you’re still saving with every charge. Learn more about BP PulseOpens an external link`,
  
  `Our future is electric. Discover our range of incredible all-electric cars that feature everything you love about Volkswagen alongside innovative technologies that massively reduce your carbon footprint as you drive. Whether it’s the fun and dynamic performance of the ID.5 GTX or the class-leading technology found in the ID.3 and ID.4, our electric cars have something for every driver to fall in love with.`,

  `Id.3, The new ID.3 continues to advance electric mobility at Volkswagen. The second generation of the ID.3 based on the MEB truly is more mature in many ways thanks to the new ID. software.`,

  `Id.4, Dynamic, powerful and intelligent. The ID.4 is here. Combining the flexibility of an SUV with the sustainability and driving experience you only get with electric.`,

  `Id. 5, The ID.5 is the first Volkswagen to combine sporty, elegant coupé design with the qualities of the ID. family: it offers a completely new sense of space, intuitive operation, is fully networked - and can be updated and upgraded "over-the-air". The high-quality coupé design clearly stands out from the appearance of conventional vehicles - and is unique in its segment. Discover all-electric driving in an inspiring shape.`,

  `The all-electric ID.5 GTX, Dual-motor all-wheel drive system, athletic coupé design and acceleration that will take your breath away: experience sporty electric performance in an ID. that seamlessly combines responsible driving and driving pleasure.`,

  `The all-electric ID.7, The fully electric fastback combines high range values, fast charging, ample space and intuitive operation in the new premium standard from Volkswagen.`,

  `Electrifying our drives is an important step along the path toward CO2-neutral mobility for everyone. A PHEV enables purely electric driving over some distances thanks to the combination of the electric and petrol engine. For you, this means: Greater performance, driving comfort and more fun when driving off thanks to electric assistance, 	Practical electric ranges for day-to-day use & Brake energy recuperation extends electric range between charges`,

  `ID.Buzz, This electric van brings Volkswagen’s iconic camper van into the new era so that you can find new adventures, no matter where you are. The ID. Buzz is the next generation of the multi-purpose vehicle (MPV).  It is based on the modular electric drive kit (MEB) platform and provides comfort and lots of space for long journeys. The MEB platform allows for different battery options to suit different vehicle purposes and budgets. Because the ID. Buzz is a concept vehicle you'll still have to wait a while before you see it on the market. But we’re working hard to ensure that it’ll be worth the wait.`,

  `Driving pleasure as standard: the Golf GTE, A powerful PHEV with an impressive short-term 180 kW (245 bhp) system performance for true driving pleasure.`,

  `The new Tiguan eHybrid Electrifying prospects: whether daily errands or spontaneous long journeys, the new Tiguan eHybrid gets you to your destination in a more relaxed way – and back again too. `,

  `Golf GTE. With its fusion of electric motor and TSI, it puts 150 kW (204 bhp) on the road.`,

  `Golf Style eHybrid A PHEV with an electric motor and TSI petrol engine. That means you can drive with zero emissions in e-mode, or combine the combustion engine and electric motor in hybrid mode for maximum boost system power and efficient driving pleasure.`,

  `The new Passat Electrified mobility of the future, step inside the new Passat eHybrid. An electric motor and TSI petrol engine work together to offer you an efficient plug-in hybrid.`,

  `Touareg R The dual drive power of the Touareg R eHybrid creates a uniquely varied driving experience with impressive performance.`,

  `New Tiguan eHybrid The new Tiguan eHybrid delivers a combined system power that is offered on 204PS and 272PS variants.`,

  `Arteon With its plug-in hybrid drive system, this saloon-coupé combines efficiency and elegance in a class of its own: from the puristic design of its flowing silhouette to its exclusive interior.`,

  `eTSI Engine The Golf 8 is Volkswagen’s first model to feature the e-TSI engine with mild-hybrid technology. e-TSI uses a lithium-ion battery to help power the engine at low speeds and drastically reduce both fuel consumption and emissions. The battery is recharged using energy from braking and coasting.`,

  `Arteon Shooting Brake Experience the best of both worlds with a Shooting Brake, which intelligently combines practicality and luxurious comfort. `,

  `The best EV charge point apps Apps that locate your nearest charging station are a must-have for electric and hybrid car drivers in need of a power boost. Just open your phone to be directed to your closest charge point. The e‑Golf and e‑up! are super speedy when it comes to charging, reaching 80% capacity in just 30 minutes, so you won’t be hanging around for long. e‑Golf owners typically use public charge points for about 40% of their charging needs, so an app could make life a whole lot easier. Even GTE drivers will benefit from having the information close at hand – just in case you want to recharge while you’re far from home. Explore our list of charge point apps below.

  Pod Point Our preferred charging partner Pod Point are the industry's EV charging experts. Pod Point run a network of over 1,700 public charging points which are universally compatible with all our electric vehicles. Pod Point's public charging points are where you need them, what's more many of them are free to use and if they aren't - a simple pay as you charge system is used.No membership fees, RFIDs needed, simply install the Pod Point application and find your nearest chargepoint and receive Google Map's directions to get there when you need to.If you use Pod Point to charge your vehicle at home, you can pair your home charger with their app and monitor both your public and home charging activity and all its associated costs all from your mobile!Find your nearest Pod Point public charger or explore Pod Point's public charging network. Find out more about Pod Point's networkOpens an external link
  
  BP Pulse
  
  BP Pulse is a subscription network that offers great value for those who regularly charge away from home. For a monthly fee it allows you to charge at almost 5000 charging points for free. Those that aren’t included come at a discounted rate, so you’re still saving with every charge. Learn more about BP PulseOpens an external link
  
  Ecotricity Ecotricity is the UK’s greenest energy provider. All their energy comes from the sun, sea and wind so you can drive happy knowing that you’re an emission-free driver from source to exhaust. You can pay-as-you-go for £3 + 17p per unit and they use a regular AC supply. Their network of public charge stations can be found at motorway service stations making them the ideal partner for longer journeys. They’re currently working on placing charging points on A roads and beyond so keep an eye out – because Ecotricity is coming to a road near you. Read more about EcotricityOpens an external link
  
  Zap-Map Unlike the others, Zap-Map isn’t a network but a locator for every public charging point in the UK. So wherever you may find yourself running low, Zap-Map can point you in the right direction. Just choose your model and the Connector Selector tool will direct you to the nearest suitable charging point for free. Learn more about Zap-MapOpens an external link
  
  Road trips? No problem. If you’re planning a long drive or are taking a trip to the countryside then it’s worth planning your charge stops so you know you’re never going to be caught short. The apps listed above are perfect for pointing you in the right direction, however the more remote the drive, the fewer charging stations there will be so it’s always a good idea to plan ahead. Familiarise yourself with what each app does so you can be sure you're getting the most from each one.`,

  ' Lithium-ion batteries, of the type used in most electric vehicles (including Volkswagen electric vehicles) have a restricted lifespan. Battery capacity will reduce over time, with use and charging. Reduction in battery capacity will affect the performance of the vehicle, including the range achievable, and is one of a number of factors that may impact resale value. New vehicle performance figures (including battery capacity and range) may be provided for the purposes of comparison between vehicles. You should not rely on new vehicle performance figures (including battery capacity and range), in relation to used vehicles with older batteries, as they will not reflect used vehicle performance in the real world. For further information on battery degradation/preservation and the Volkswagen 8 year/100,00 mile new car battery warranty, please see here. Exclusions and Warranty Terms Apply.',

]


let contextData = dataSet.join(' ');

// text generation inputs
const QA_QUESTION_TEXTBOX = document.getElementById('qa-question-textbox');
const QA_ANSWER_TEXTBOX = document.getElementById('qa-answer-textbox');
const GENERATE_BUTTON = document.getElementById('generate');

const PROGRESS = document.getElementById('progress');
const PROGRESS_BARS = document.getElementById('progress-bars');

// Parameters
const GENERATION_OPTIONS = document.getElementsByClassName('generation-option');

function isVisible(e) {
  // https://stackoverflow.com/a/38873788
  return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}


GENERATE_BUTTON.addEventListener('click', async (e) => {

  let max_length = 384
  let stride = 128

  // Set and pass generation settings to web worker
  let data = {
    task: 'question-answering',
    generation: {
      max_length: max_length,
      truncation: "only_second",
      stride: stride,
      return_overflowing_tokens: true,
      return_offsets_mapping: true,
      padding: max_length
    }
  };

  data.context = contextData
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
