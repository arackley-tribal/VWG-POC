const fs = require('fs');
const TurndownService = require('turndown');
const yaml = require('js-yaml');

const jsonData = require('./usedcars.json'); // Replace with your actual file
const outputFile = 'seed_used-cars.sql';
const turndownService = new TurndownService();

// SQL text sanitizer
function sanitize(text) {
  return text ? text.replace(/'/g, "''") : '';
}

const baseUrl = "https://showroom-assets.volkswagen.co.uk/images/";

const parseFeatures = (item.features || []).map(a => {
  const copy = { ...a };

  if (copy.buttonTitle) copy.buttonTitle = sanitize(copy.buttonTitle);
  if (copy.title)       copy.title       = sanitize(copy.title); // fixed line

  // Only prefix if it’s a relative path; don't force .jpg
  if (copy.posterImageURL && !/^https?:\/\//.test(copy.posterImageURL)) {
    copy.posterImageURL = baseUrl + copy.posterImageURL.replace(/^\/+/, '');
  }

  // Build assetFileName only when videoURL is relative; keep videoURL as-is
  if (copy.videoURL && !/^https?:\/\//.test(copy.videoURL)) {
    copy.assetFileName = baseUrl + copy.videoURL.replace(/^\/+/, '');
  }

  return copy;
});

// Generate SQL
function generateSQL(item) {
  let sql = '\n-- Insert data into knowledge_hub_items (Finance Items)\n';

    const title = sanitize(item.title);
    const subtitle = sanitize(item.subtitle);

    // Front matter
    let frontMatter = `---\n` + yaml.dump({ assets: features }) + `---\n\n`;

    let secondaryMatter = "";
    secondaryMatter = sanitize(item.text || '') + '\n' + sanitize(item.bullets || '');

    let content = frontMatter + secondaryMatter;
    const contentSql = sanitize(content);

    // Insert statement
    sql += `INSERT INTO knowledge_hub_items (name, short_description, primary_image, content, category, popularity, featured)\n`;
    sql += `SELECT '${title}', '${subtitle}', '${'https://showroom-assets.volkswagen.co.uk/images/usedcars/usedCarsExchange.jpg'}', '${contentSql}',\n`;
    sql += `  (SELECT id FROM knowledge_hub_categories WHERE LOWER(name) = LOWER('Used Cars') LIMIT 1), 0, false\n`;
    sql += `WHERE NOT EXISTS (SELECT 1 FROM knowledge_hub_items WHERE LOWER(name) = LOWER('${title}'));\n\n`;

  return sql;
}

// Run it
const sqlCommands = generateSQL(jsonData);
fs.writeFileSync(outputFile, sqlCommands, 'utf8');
console.log(`SQL seed commands file saved to ${outputFile}`);
