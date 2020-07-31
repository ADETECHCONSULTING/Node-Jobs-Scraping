const request = require('request');
const cheerio = require('cheerio');

request('https://www.directemploi.com/candidatOffre/search/mot_cle/%22d%C3%A9veloppeur%22', (error, response, html) => {
       if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const siteOffer = $('.intitule');

        //console.log(siteOffer.html());
        //console.log(siteOffer.text());

        const output = siteOffer
        .children('h3')
        .next()
        .text()
        .trim();

        console.log(output);
    }
});

