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

const baseUrl = "https://showroom-assets.volkswagen.co.uk/images/usedCars/";

// Generate SQL
function generateSQL(item) {
  let sql = '\n-- Insert data into knowledge_hub_items (Finance Items)\n';

    const title = sanitize(item.title);
    const subtitle = sanitize(item.subtitle);
    // YAML front matter for content

    // YAML front matter for content
    let content = `---\n`;
    if(item.features?.length > 0) {
        item.features.forEach(asset => {
            if(asset.buttonTitle) {
              asset.buttonTitle = sanitize(asset.buttonTitle)
            }
            if(asset.title) {
              asset.buttonTitle = sanitize(asset.title)
            }
            if (asset.posterImageURL) {
              asset.posterImageURL = baseUrl + asset.posterImageURL + '.jpg';
            }
            if (asset.videoURL) {
                asset.videoURL = baseUrl + asset.videoURL;
            }
          });
        const assets = yaml.dump({ assets: item.features || [] });
        content += assets;
    }
    content += `---\n\n`;

    // Insert statement
    sql += `INSERT INTO knowledge_hub_items (name, short_description, primary_image, content, category, popularity, featured)\n`;
    sql += `SELECT '${title}', '${subtitle}', '${'https://showroom-assets.volkswagen.co.uk/images/usedcars/usedCarsExchange.jpg'}', '${content}',\n`;
    sql += `  (SELECT id FROM knowledge_hub_categories WHERE LOWER(name) = LOWER('Used Cars') LIMIT 1), 0, false\n`;
    sql += `WHERE NOT EXISTS (SELECT 1 FROM knowledge_hub_items WHERE LOWER(name) = LOWER('${title}'));\n\n`;

  return sql;
}

// Run it
const sqlCommands = generateSQL(jsonData);
fs.writeFileSync(outputFile, sqlCommands, 'utf8');
console.log(`SQL seed commands file saved to ${outputFile}`);
