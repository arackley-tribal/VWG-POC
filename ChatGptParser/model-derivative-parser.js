import { writeFile } from 'fs';

let modelData = null;
/*
{
  "id": "30260",
  "title": "Taigo",
  "name": "taigo",
  "bodyStyleName": "SUV",
  "marketingStatusName": "Current",
  "straplineLong": null,
  "minimumP11dPrice": 24275,
  "maximumP11dPrice": 32530,
  "minimumRetailPrice": 24550,
  "maximumRetailPrice": 32855,
  "minimumOfferPrice": null,
  "maximumOfferPrice": null,
  "minimumP11dPriceDerivativeTitle": "Life 1.0 TSI 95PS 5-speed Manual 5 Door",
  "maximumP11dPriceDerivativeTitle": "Black Edition 1.5 TSI 150PS 7-speed DSG 5 Door",
  "minimumRetailPriceDerivativeTitle": "Life 1.0 TSI 95PS 5-speed Manual 5 Door",
  "maximumRetailPriceDerivativeTitle": "Black Edition 1.5 TSI 150PS 7-speed DSG 5 Door",
  "minimumBik": [
      {
          "year": "2023/25",
          "bikPercentage": 29
      }
  ],
  "minimumEmissions": 120.0,
  "maximumEmissions": 134.0,
  "minimumEvRange": null,
  "maximumEvRange": null,
  "availableFuelTypeNames": [
      "Petrol"
  ],
  "availability": {
      "allowingBookATestDrive": true,
      "havingFinanceQuote": true,
      "configurator": true
  },
  "numberOfCurrentDerivatives": 12,
  "numberOfCurrentTrims": 5,
  "heroTrimName": "Life",
  "heroTrimId": "30260-life",
  "dateLaunched": null,
  "minimumSubsidyAmount": null,
  "maximumSubsidyAmount": null,
  "crmId": null
},
*/
let carRangeData = null;
/*
{
    "id": "30205",
    "title": "Polo",
    "aggregations": {
        "minimumMonthlyPayment": [
            {
                "capCode": "VWPO10LFE5HPIM  7",
                "productId": "942758",
                "productType": "BCH",
                "label": null,
                "trimId": "30205-life",
                "trimTitle": "Life",
                "derivativeId": "AE13GV-2025-GPI3PI3-GRBPRBP-GWD1WD1-GWLDWLD-GYKMYKM-GYOSYOS",
                "derivativeTitle": "Life 1.0 80PS 5-speed Manual 5 Door",
                "defaultCalculations": {
                    "monthlyPayment": 239.03,
                    "deposit": null,
                    "rentalInAdvance": 1434.18
                }
            },
            {
                "capCode": "VWPO10LFE5HPIM  7",
                "productId": "942865",
                "productType": "PCP",
                "label": "Solutions PCP 6.9% APR Representative and £1,000 Deposit Contribution",
                "trimId": "30205-life",
                "trimTitle": "Life",
                "derivativeId": "AE13GV-2025-GPI3PI3-GRBPRBP-GWD1WD1-GWLDWLD-GYKMYKM-GYOSYOS",
                "derivativeTitle": "Life 1.0 80PS 5-speed Manual 5 Door",
                "defaultCalculations": {
                    "monthlyPayment": 245.45,
                    "deposit": 3181.50,
                    "rentalInAdvance": null
                }
            }
        ],
        "availableFuelTypeNames": [
            "Petrol"
        ],
        "minimumP11dPrice": 20935,
        "maximumP11dPrice": 30105,
        "minimumRetailPrice": 21210,
        "maximumRetailPrice": 30430
    },
    "trims": [
        {
            "id": "30205-life",
            "title": "Life",
            "derivatives": [
                {
                    "id": "AE13AZ-2025-GPF3PF3-GPI3PI3-GRBPRBP-GWD1WD1-GWLDWLD-GYKMYKM-GYOSYOS",
                    "title": "Life 1.0 TSI 95PS 7-speed DSG 5 Door",
                    "capCode": "VWPO10LFE5HPTA  7",
                    "retailPrice": 23585,
                    "p11dPrice": 23310,
                    "products": [
                        {
                            "productId": "942865",
                            "label": "Solutions PCP 6.9% APR Representative and £1,000 Deposit Contribution",
                            "productType": "PCP",
                            "defaultProduct": true,
                            "defaultCalculations": {
                                "monthlyPayment": 278.63,
                                "deposit": 3537.75,
                                "rentalInAdvance": null
                            }
                        },
                        {
                            "productId": "942758",
                            "label": null,
                            "productType": "BCH",
                            "defaultProduct": false,
                            "defaultCalculations": {
                                "monthlyPayment": 269.85,
                                "deposit": null,
                                "rentalInAdvance": 1619.10
                            }
                        }
                    ]
                },
                {
                    "id": "AE13GV-2025-GPI3PI3-GRBPRBP-GWD1WD1-GWLDWLD-GYKMYKM-GYOSYOS",
                    "title": "Life 1.0 80PS 5-speed Manual 5 Door",
                    "capCode": "VWPO10LFE5HPIM  7",
                    "retailPrice": 21210,
                    "p11dPrice": 20935,
                    "products": [
                        {
                            "productId": "942865",
                            "label": "Solutions PCP 6.9% APR Representative and £1,000 Deposit Contribution",
                            "productType": "PCP",
                            "defaultProduct": true,
                            "defaultCalculations": {
                                "monthlyPayment": 245.45,
                                "deposit": 3181.50,
                                "rentalInAdvance": null
                            }
                        },
                        {
                            "productId": "942758",
                            "label": null,
                            "productType": "BCH",
                            "defaultProduct": false,
                            "defaultCalculations": {
                                "monthlyPayment": 239.03,
                                "deposit": null,
                                "rentalInAdvance": 1434.18
                            }
                        }
                    ]
                },
                {
                    "id": "AE13AV-2025-GPF3PF3-GPI3PI3-GRBPRBP-GWD1WD1-GWLDWLD-GYKMYKM-GYOSYOS",
                    "title": "Life 1.0 TSI 95PS 5-speed Manual 5 Door",
                    "capCode": "VWPO10LFE5HPTM  7",
                    "retailPrice": 22150,
                    "p11dPrice": 21875,
                    "products": [
                        {
                            "productId": "942865",
                            "label": "Solutions PCP 6.9% APR Representative and £1,000 Deposit Contribution",
                            "productType": "PCP",
                            "defaultProduct": true,
                            "defaultCalculations": {
                                "monthlyPayment": 258.98,
                                "deposit": 3322.50,
                                "rentalInAdvance": null
                            }
                        },
                        {
                            "productId": "942758",
                            "label": null,
                            "productType": "BCH",
                            "defaultProduct": false,
                            "defaultCalculations": {
                                "monthlyPayment": 251.91,
                                "deposit": null,
                                "rentalInAdvance": 1511.46
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "30205-r-line",
            "title": "R-Line",
            "derivatives": [
                {
                    "id": "AE15AZ-2025-GPF3PF3-GRBFRBF-GWD1WD1-GWLCWLC-GYKMYKM-GYOSYOS-MSSH4KF-MHKA9AK-MMFA9S0",
                    "title": "R-Line 1.0 TSI 95PS 7-speed DSG 5 Door",
                    "capCode": "VWPO10RLI5HPTA  7",
                    "retailPrice": 25985,
                    "p11dPrice": 25710,
                    "products": [
                        {
                            "productId": "942530",
                            "label": "Solutions PCP 6.9% APR Representative and £1,500 Deposit Contribution",
                            "productType": "PCP",
                            "defaultProduct": true,
                            "defaultCalculations": {
                                "monthlyPayment": 304.22,
                                "deposit": 3897.75,
                                "rentalInAdvance": null
                            }
                        },
                        {
                            "productId": "942758",
                            "label": null,
                            "productType": "BCH",
                            "defaultProduct": false,
                            "defaultCalculations": {
                                "monthlyPayment": 305.90,
                                "deposit": null,
                                "rentalInAdvance": 1835.40
                            }
                        }
                    ]
                },
                {
                    "id": "AE15BZ-2025-GPF3PF3-GRBFRBF-GWD1WD1-GWLCWLC-GYKMYKM-GYOSYOS-MSSH4KF-MHKA9AK-MMFA9S0",
                    "title": "R-Line 1.0 TSI 115PS 7-speed DSG 5 Door",
                    "capCode": "VWPO10RN55HPTA  7",
                    "retailPrice": 27210,
                    "p11dPrice": 26935,
                    "products": [
                        {
                            "productId": "942530",
                            "label": "Solutions PCP 6.9% APR Representative and £1,500 Deposit Contribution",
                            "productType": "PCP",
                            "defaultProduct": true,
                            "defaultCalculations": {
                                "monthlyPayment": 316.13,
                                "deposit": 4081.50,
                                "rentalInAdvance": null
                            }
                        },
                        {
                            "productId": "942758",
                            "label": null,
                            "productType": "BCH",
                            "defaultProduct": false,
                            "defaultCalculations": {
                                "monthlyPayment": 316.05,
                                "deposit": null,
                                "rentalInAdvance": 1896.30
                            }
                        }
                    ]
                },
                {
                    "id": "AE15AV-2025-GPF3PF3-GRBFRBF-GWD1WD1-GWLCWLC-GYKMYKM-GYOSYOS-MSSH4KF-MHKA9AK-MMFA9S0",
                    "title": "R-Line 1.0 TSI 95PS 5-speed Manual 5 Door",
                    "capCode": "VWPO10RLI5HPTM  7",
                    "retailPrice": 24550,
                    "p11dPrice": 24275,
                    "products": [
                        {
                            "productId": "942530",
                            "label": "Solutions PCP 6.9% APR Representative and £1,500 Deposit Contribution",
                            "productType": "PCP",
                            "defaultProduct": true,
                            "defaultCalculations": {
                                "monthlyPayment": 284.17,
                                "deposit": 3682.50,
                                "rentalInAdvance": null
                            }
                        },
                        {
                            "productId": "942758",
                            "label": null,
                            "productType": "BCH",
                            "defaultProduct": false,
                            "defaultCalculations": {
                                "monthlyPayment": 287.95,
                                "deposit": null,
                                "rentalInAdvance": 1727.70
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "30205-match",
            "title": "Match",
            "derivatives": [
                {
                    "id": "AE13AV-2025-MKSUKA1-GPF3PF3-GPI7PI7-GRBPRBP-GWD1WD1-GWLDWLD-GW10W10-GYKMYKM-GYOSYOS-MSSH4KF",
                    "title": "Match 1.0 TSI 95PS 5-speed Manual 5 Door",
                    "capCode": "VWPO10MTH5HPTM  7",
                    "retailPrice": 22840,
                    "p11dPrice": 22565,
                    "products": [
                        {
                            "productId": "942865",
                            "label": "Solutions PCP 6.9% APR Representative and £1,000 Deposit Contribution",
                            "productType": "PCP",
                            "defaultProduct": true,
                            "defaultCalculations": {
                                "monthlyPayment": 268.71,
                                "deposit": 3426.00,
                                "rentalInAdvance": null
                            }
                        },
                        {
                            "productId": "942758",
                            "label": null,
                            "productType": "BCH",
                            "defaultProduct": false,
                            "defaultCalculations": {
                                "monthlyPayment": 260.96,
                                "deposit": null,
                                "rentalInAdvance": 1565.76
                            }
                        }
                    ]
                },
                {
                    "id": "AE13AZ-2025-MKSUKA1-GPF3PF3-GPI7PI7-GRBPRBP-GWD1WD1-GWLDWLD-GW10W10-GYKMYKM-GYOSYOS-MSSH4KF",
                    "title": "Match 1.0 TSI 95PS 7-speed DSG 5 Door",
                    "capCode": "VWPO10MTH5HPTA  7",
                    "retailPrice": 24275,
                    "p11dPrice": 24000,
                    "products": [
                        {
                            "productId": "942865",
                            "label": "Solutions PCP 6.9% APR Representative and £1,000 Deposit Contribution",
                            "productType": "PCP",
                            "defaultProduct": true,
                            "defaultCalculations": {
                                "monthlyPayment": 288.01,
                                "deposit": 3641.25,
                                "rentalInAdvance": null
                            }
                        },
                        {
                            "productId": "942758",
                            "label": null,
                            "productType": "BCH",
                            "defaultProduct": false,
                            "defaultCalculations": {
                                "monthlyPayment": 278.90,
                                "deposit": null,
                                "rentalInAdvance": 1673.40
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "30205-gti",
            "title": "GTI",
            "derivatives": [
                {
                    "id": "AE19UZ-2025-GPDBPDB-GPF3PF3-GRBFRBF-GWD1WD1-GWLDWLD-GYKMYKM-GYOSYOS-MSSH4KF-MHKA9AK-MMFA9S0",
                    "title": "GTI 2.0 TSI 207PS 7-speed DSG 5 Door",
                    "capCode": "VWPO20GTI5HPTA  7",
                    "retailPrice": 30430,
                    "p11dPrice": 30105,
                    "products": [
                        {
                            "productId": "942810",
                            "label": "Solutions PCP 6.9% APR Representative and £2,250 Deposit Contribution",
                            "productType": "PCP",
                            "defaultProduct": true,
                            "defaultCalculations": {
                                "monthlyPayment": 337.52,
                                "deposit": 4564.50,
                                "rentalInAdvance": null
                            }
                        },
                        {
                            "productId": "942758",
                            "label": null,
                            "productType": "BCH",
                            "defaultProduct": false,
                            "defaultCalculations": {
                                "monthlyPayment": 351.92,
                                "deposit": null,
                                "rentalInAdvance": 2111.46
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "30205-style",
            "title": "Style",
            "derivatives": [
                {
                    "id": "AE14AV-2025-GPF3PF3-GPI5PI5-GRBFRBF-GWD1WD1-GWLDWLD-GYKMYKM-GYOSYOS-MHKA9AK-MMFA9S0",
                    "title": "Style 1.0 TSI 95PS 5-speed Manual 5 Door",
                    "capCode": "VWPO10STY5HPTM  7",
                    "retailPrice": 24550,
                    "p11dPrice": 24275,
                    "products": [
                        {
                            "productId": "942530",
                            "label": "Solutions PCP 6.9% APR Representative and £1,500 Deposit Contribution",
                            "productType": "PCP",
                            "defaultProduct": true,
                            "defaultCalculations": {
                                "monthlyPayment": 287.13,
                                "deposit": 3682.50,
                                "rentalInAdvance": null
                            }
                        },
                        {
                            "productId": "942758",
                            "label": null,
                            "productType": "BCH",
                            "defaultProduct": false,
                            "defaultCalculations": {
                                "monthlyPayment": 291.47,
                                "deposit": null,
                                "rentalInAdvance": 1748.82
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "30205-black-edition",
            "title": "Black Edition",
            "derivatives": [
                {
                    "id": "AE15BZ-2025-GPDRPDR-GPF3PF3-GPJEPJE-GPXAPXA-GRBFRBF-GWD1WD1-GWLDWLD-GW65W65-GYKMYKM-GYOSYOS-MSIH4A3-MHKA9AK-MMFA9S0",
                    "title": "Black Edition 1.0 TSI 115PS 7-speed DSG 5 Door",
                    "capCode": "VWPO10EB15HPTA  7",
                    "retailPrice": 27710,
                    "p11dPrice": 27435,
                    "products": [
                        {
                            "productId": "942530",
                            "label": "Solutions PCP 6.9% APR Representative and £1,500 Deposit Contribution",
                            "productType": "PCP",
                            "defaultProduct": true,
                            "defaultCalculations": {
                                "monthlyPayment": 318.90,
                                "deposit": 4156.50,
                                "rentalInAdvance": null
                            }
                        },
                        {
                            "productId": "942758",
                            "label": null,
                            "productType": "BCH",
                            "defaultProduct": false,
                            "defaultCalculations": {
                                "monthlyPayment": 318.02,
                                "deposit": null,
                                "rentalInAdvance": 1908.12
                            }
                        }
                    ]
                }
            ]
        }
    ]
},
*/


function getString(stringToCheck) {
  return stringToCheck !== null ? stringToCheck : ''
}
function derivativeJsonToMarkdown(data) {
  let markdown = `### Derivative - ${getString(data.title)}\n\n `;

  // Add main details
  markdown += `#### General Information \n`;
  markdown += `* **Year:** ${getString(data.year)}\n`;
  markdown += `* **Base:** £${getString(data.price.base)}\n\n`;
  markdown += `* **Company:** £${getString(data.price.company)}\n\n`;
  markdown += `* **Offer:** £${getString(data.price.offer)}\n\n`;
  markdown += `* **Subsidy:** £${getString(data.price.subsidy)}\n\n`;

  // Add engine details
  markdown += `#### Engine Information\n\n`;
  markdown += `* **Name:** ${getString(data.engine.name)}\n`;
  markdown += `* **Cylinder Type Name:** ${getString(data.engine.cylinderTypeName)}\n`;
  markdown += `* **Fuel Injection Type Name:** ${getString(data.engine.fuelInjectionTypeName)}\n`;
  markdown += `* **Fuel Type:** ${getString(data.engine.fuelTypeName)}\n`;
  markdown += `* **Cubic Capacity:** ${getString(data.engine.cubicCapacity)}\n`;
  markdown += `* **Engine Type:** ${getString(data.engine.engineType)}\n`;
  markdown += `* **Raw Fuel Types:** ${getString(data.engine.rawFuelTypes.toString())}\n`;

  // Add performance details
  markdown += `* **Power:** ${getString(data.performance.power)}\n`;
  markdown += `* **Torque:** ${getString(data.performance.torque)}\n`;
  markdown += `* **Acceleration (0-62 mph):** ${getString(data.performance.acceleration)}s \n`;
  markdown += `* **Max Speed:** ${getString(data.performance.maxSpeed)} mph\n\n`;

  // Add battery details (if electric)
  if (data.engine.fuelTypeName === "Electric") {
    markdown += `#### Battery Information\n\n`;
    markdown += `* **Type:** ${getString(data.battery.type)}\n`;
    markdown += `* **Capacity:** ${getString(data.battery.capacit)} kW-h\n`;
    markdown += `* **Range up to:** ${getString(data.battery.performanceRange)} mi\n\n`;
  }

  // Add key features
  markdown += `#### Key Features\n\n`;
  data.keyFeatures.forEach((feature) => {
    markdown += `* **${getString(feature.title)}**: ${getString(feature.description)}\n`;
  });

  // Add dimensions
  markdown += `#### Dimensions\n\n`;
  markdown += `* **Length:** ${getString(data.dimensions.length)} mm\n`;
  markdown += `* **Width:** ${getString(data.dimensions.width)} mm\n`;
  markdown += `* **Height:** ${getString(data.dimensions.height)} mm\n`;
  markdown += `* **Boot Volume:** ${getString(data.dimensions.bootVolume)} litres\n`;

  return markdown;
}
function optionsToMarkdown(data) {
  /*
      "title": "Exterior mirror housings painted in contrast color",
      "categoryPath": "/appearance & styling/mirror housings/null",
      "description": "Exterior mirror housings painted in contrast color",
      "price": 0,
      "availability": "optional-extra",
  */
  let markdown = `#### Options\n`;

  data.forEach((option) => {
    markdown += `* **${getString(option.title)}**\n`;
    markdown += `  * **Price:** £${getString(option.price)}\n`;
    markdown += `  * **Category:** ${getString(option.categoryPath)}\n`;
    markdown += `  * **Description:** ${getString(option.description)}\n`;
    markdown += `  * **Availability:** ${getString(option.availability)}\n\n`;
  });

  return markdown;
}
function getTrimsFromCarRangeData(modelId) {
  return carRangeData.models.find(model => model.id === modelId).trims;
}
async function getModelData() {
  // Get Models 
  try {
    const response = await fetch("https://www.volkswagen.co.uk/api/product/2.0/models");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    modelData = json;
  } catch (error) {
    console.error(error.message);
  }
}
async function getCarRangeData() {
  // Get Models 
  try {
    const response = await fetch("https://www.volkswagen.co.uk/api/product-finance/1.0/car-range");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    carRangeData = json;
  } catch (error) {
    console.error(error.message);
  }
}
async function getDerivativeData(derivativeId) {
  // Get Models 
  try {
    const response = await fetch(`https://www.volkswagen.co.uk/api/product/2.0/derivatives/${derivativeId}/extra`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json.derivative;
  } catch (error) {
    console.error(error.message);
  }
}
async function getDerivativeOptions(derivativeId) {
  // Get Models 
  try {
    const response = await fetch(`https://www.volkswagen.co.uk/api/product/2.0/derivatives/${derivativeId}/options`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json.options;
  } catch (error) {
    console.error(error.message);
  }
}
async function createForModel(modelInfo) {
  const currentModel = modelInfo.id;

  let markdownOutput = `# Model Information Sheet : ${modelInfo.id} - ${modelInfo.title}\n\n`;
  markdownOutput += `This document outlines all the current trims and derivatives for the ${getString(modelInfo.title)} as of the ${new Date().toDateString()}, ${new Date().toTimeString()} \n\n `

  // Base Model Data
  markdownOutput += `## General Information\n`;
  markdownOutput += `* **Model Name:** ${modelInfo.title}\n`;
  markdownOutput += `* **Body Style:** ${modelInfo.bodyStyleName}\n`;
  markdownOutput += `* **Marketing Status:** ${modelInfo.marketingStatusName}\n`;
  markdownOutput += `* **Minimum P11d Price:** £${modelInfo.minimumP11dPrice}\n`;
  markdownOutput += `* **Maximum P11d Price:** £${modelInfo.maximumP11dPrice}\n`;
  markdownOutput += `* **Minimum Retail Price:** £${modelInfo.minimumRetailPrice}\n`;
  markdownOutput += `* **Maximum Retail Price:** £${modelInfo.maximumRetailPrice}\n`;
  markdownOutput += `* **Minimum BIK:** ${modelInfo.minimumBik[0].bikPercentage}%\n`;
  markdownOutput += `* **Minimum Emissions:** ${modelInfo.minimumEmissions} g/km\n`;
  markdownOutput += `* **Maximum Emissions:** ${modelInfo.maximumEmissions} g/km\n`;
  markdownOutput += `* **Available Fuel Types:** ${modelInfo.availableFuelTypeNames.join(', ')}\n\n`;

  // Get model trims
  const trims = getTrimsFromCarRangeData(modelInfo.id);

  // Build an array of promises that fetch derivative data for each trim
  const trimPromises = trims.map(async (trim) => {
    let trimMarkdown = `## Trim - ${trim.title} Specification Data\n\n`;
    const derivativePromises = trim.derivatives.map(async (derivative) => {
      const derivativeData = await getDerivativeData(derivative.id);
      const derivativeMarkDown = await derivativeJsonToMarkdown(derivativeData);

      const optionsData = await getDerivativeOptions(derivative.id);
      const optionsMarkDown = await optionsToMarkdown(optionsData);

      return derivativeMarkDown + optionsMarkDown;

    });
    // Resolve all derivative fetches for this trim
    const derivativeMarkdowns = await Promise.all(derivativePromises);
    // Combine them into the trim Markdown
    return trimMarkdown + derivativeMarkdowns.join('');
  });

  // Resolve all trim fetches
  const allTrimsMarkdown = await Promise.all(trimPromises);

  // Combine into the final markdownOutput
  markdownOutput += allTrimsMarkdown.join('');

  // Specify the filename
  const filename = `${modelInfo.id}_${modelInfo.name}_car_details.md`;

  // Save the markdown string to a file
  writeFile(filename, markdownOutput, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('Markdown file saved successfully!');
    }
  });
}

await getModelData();
await getCarRangeData();

if(modelData.models.length > 0){
  modelData.models.forEach(async (model) => {
    await createForModel(model);
  })
}