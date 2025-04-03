const https = require('https');
const fs = require('fs');
const path = require('path');

const flags = [
    { code: 'en', url: 'https://flagcdn.com/w20/gb.png' },
    { code: 'es', url: 'https://flagcdn.com/w20/es.png' },
    { code: 'fr', url: 'https://flagcdn.com/w20/fr.png' },
    { code: 'zh', url: 'https://flagcdn.com/w20/cn.png' }
];

const downloadFlag = (url, filename) => {
    https.get(url, (response) => {
        response.pipe(fs.createWriteStream(path.join(__dirname, filename)));
    }).on('error', (err) => {
        console.error(`Error downloading ${filename}:`, err.message);
    });
};

flags.forEach(flag => {
    downloadFlag(flag.url, `${flag.code}.png`);
});