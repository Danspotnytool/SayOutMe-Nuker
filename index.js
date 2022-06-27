
const phin = require('phin');
const HTMLparser = require('node-html-parser');

const config = require('./config.js');

// Checking if the config is valid
if (config.message.length <= 6) {
    console.log('Error: The message is too short!');
    process.exit(1);
};
if (!config.url.toLocaleLowerCase().includes('https://sayout.me/say/')) {
    console.log('Error: The URL is not valid!');
    process.exit(1);
};

let loopIndex = 0;

const main = async () => {

    await phin({
        url: config.url,
        method: 'GET',
        parse: 'string',
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': config.cookies,
            'origin': 'https://sayout.me',
            'referer': `${config.url}`,
            'sec-ch-ua': '" Not;A Brand";v="99", "Microsoft Edge";v="103", "Chromium";v="103"',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36 Edg/103.0.1264.37'
        }
    }).then(async (res) => {
        const html = HTMLparser.parse(res.body);
        const token = html.querySelector('input[name="token"]')._rawAttrs.value;

        await phin({
            url: config.url,
            method: 'POST',
            parse: 'string',
            data: `message=${encodeURIComponent(config.message)}&token=${token}`,
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-language': 'en-US,en;q=0.9',
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': config.cookies,
                'origin': 'https://sayout.me',
                'referer': `${config.url}`,
                'sec-ch-ua': '" Not;A Brand";v="99", "Microsoft Edge";v="103", "Chromium";v="103"',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36 Edg/103.0.1264.37'
            }
        }).then(async (res) => {
            const html = HTMLparser.parse(res.body);
            const alert = html.querySelector('div.alert');
            if (alert.rawAttrs.includes('alert-danger')) {
                console.log(`[${loopIndex}] Error: ${alert.rawText}`);
            } else if (alert.rawAttrs.includes('alert-success')) {
                console.log(`[${loopIndex}] Message sent!`);
            };
            loopIndex++;

            setTimeout(async () => {
                if (config.limit === 0 || loopIndex < config.limit) {
                    await main();
                } else {
                    console.log(`[${loopIndex}] Limit reached!`);
                };
            }, config.delay);
        });
    });
};

main();