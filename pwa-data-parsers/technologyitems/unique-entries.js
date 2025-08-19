const fs = require('fs');

// Load JSON data (replace 'data.json' with the actual file name)
const jsonData = require('./technologyitems.json');

// Output file for unique seed entries
const outputFile = 'unique_seed_entries.sql';

// Function to extract unique values for seed data
function extractUniqueValues(json) {
    if (!json.technologyItems || !Array.isArray(json.technologyItems)) {
        console.error('Invalid JSON format: technologyItems array not found.');
        return {};
    }

    const uniqueEntries = {
        fuelTypes: new Set(),
        fuelInjectionTypes: new Set(),
        efficiencyLevels: new Set(),
        emissionsControlTypes: new Set(),
        gearboxTypes: new Set(),
        driveTypes: new Set(),
        bodyStyles: new Set(),
        specItemPrNumbers: new Set(),
        synonyms: new Set(),
        subsection: new Set()
    };

    json.technologyItems.forEach(item => {
        item.fuelTypeIDs?.forEach(id => uniqueEntries.fuelTypes.add(id));
        item.fuelInjectionTypeIDs?.forEach(id => uniqueEntries.fuelInjectionTypes.add(id));
        item.efficiencyLevelIDs?.forEach(id => uniqueEntries.efficiencyLevels.add(id));
        item.emissionsControlTypeIDs?.forEach(id => uniqueEntries.emissionsControlTypes.add(id));
        item.gearboxTypeIDs?.forEach(id => uniqueEntries.gearboxTypes.add(id));
        item.driveTypeIDs?.forEach(id => uniqueEntries.driveTypes.add(id));
        item.bodyStyleIDs?.forEach(id => uniqueEntries.bodyStyles.add(id));
        item.specItemPrNumbers?.forEach(id => uniqueEntries.specItemPrNumbers.add(id));
        item.synonyms?.forEach(id => uniqueEntries.synonyms.add(id));
        uniqueEntries.subsection.add(item.subsection)
    });

    return uniqueEntries;
}

// Function to generate SQL insert statements
function generateSQL(uniqueEntries) {
    let sql = '';

    Object.entries(uniqueEntries).forEach(([table, values]) => {
        if (values.size > 0) {
            sql += `\n-- Data for ${table}\n`;
            sql += `INSERT INTO "public"."${table}" (name) VALUES\n`;
            sql += Array.from(values).map(value => `  ('${value.replace(/'/g, "''")}')`).join(',\n');
            sql += ';\n';
        }
    });

    return sql;
}

// Extract unique values and generate SQL
const uniqueEntries = extractUniqueValues(jsonData);
const sqlSeedData = generateSQL(uniqueEntries);

// Save the output to a file
fs.writeFileSync(outputFile, sqlSeedData, 'utf8');

console.log(`Unique seed entries saved to ${outputFile}`);