const fs = require('fs');
const path = require('path');
// Uncomment if you're using Node < 18
// const fetch = require('node-fetch');

async function fetchModelTrimsCSV() {
  const url = 'https://www.volkswagen.co.uk/api/product-finance/1.0/car-range';

  try {
    const res = await fetch(url);
    const data = await res.json();

    const csvRows = [['ModelName (ID)', 'TrimName']];

    for (const model of data.models) {
      const modelLabel = `${model.title} (${model.id})`;

      for (const trim of model.trims || []) {
        csvRows.push([modelLabel, trim.title]);
      }
    }

    const content = csvRows.map(row =>
      row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    const filePath = path.join(__dirname, 'model_trims.csv');
    fs.writeFileSync(filePath, content);

    console.log('✅ model_trims.csv written successfully!');
  } catch (err) {
    console.error('❌ Error fetching or writing CSV:', err);
  }
}

fetchModelTrimsCSV();
