import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const baseImageUrl = "http://volkswagen.co.uk/api/image/2.3/car/derivative/";
const derivatiresUrl = "http://volkswagen.co.uk/api/product/2.0/derivatives";

const getDerivatives = async () => {
    const response = await fetch(derivatiresUrl);
    const data = await response.json();
    return data.derivatives;
};

const downloadAndProcessImage = async (url, imagePath) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to download: ${url}`);
    const buffer = await response.buffer();

    await sharp(buffer)
        .resize(1216, 1216, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .jpeg()
        .toFile(imagePath);
};

const saveTextDescription = (filePath, content) => {
    fs.writeFileSync(filePath, content);
};

const processDerivatives = async () => {
    const derivatives = await getDerivatives();

    for (const item of derivatives) {

        const images = [
            'exterior-front', 'exterior-side', 'exterior-rear', 'interior-front', 'interior-side',
            'exterior-front-left-zoomed', 'exterior-side-right', 'exterior-rear-centre', 'exterior-rear-right',
            'exterior-rear-boot', 'exterior-top-left', 'interior-side-rear-right',
            'exterior-360-1', 'exterior-360-2', 'exterior-360-3', 'exterior-360-4', 'exterior-360-5',
            'exterior-360-6', 'exterior-360-7', 'exterior-360-8', 'exterior-360-9', 'exterior-360-10',
            'exterior-360-11', 'exterior-360-12', 'interior-360'
        ];

        for (const imageName of images) {
            const finalUrl = `${baseImageUrl}${item.id}/${imageName}/512.png`;
            const filename = `${item.modelName}-${item.title}-${imageName}`;

            const imagePath = path.join('downloads', `${filename}.jpg`);
            const textPath = path.join('downloads', `${filename}.txt`);

            try {
                console.log(`Downloading and processing ${filename}`);
                await downloadAndProcessImage(finalUrl, imagePath);

                const description = `VW Volkswagen car, the model of the car is a ${item.modelName} and the trim is ${item.title.replace('-', ' ')} the view of the car is in a ${imageName.replace('-', ' ')}`;
                saveTextDescription(textPath, description);

                console.log(`Saved ${filename}`);
            } catch (err) {
                console.error(`Error with ${imageName}:`, err);
            }
        }
    }
};

processDerivatives();
