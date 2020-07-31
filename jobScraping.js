const request = require('request');
const cheerio = require('cheerio');

request('https://www.directemploi.com/candidatOffre/search/mot_cle/%22d%C3%A9veloppeur%22', (error, response, html) => {
       if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $('.intitule').each((i, el) => {
            const title = $(el)
            .find('h3')
            .text()
            .replace(/\s\s+/g, '');
        const link = $(el)
            .find('a')
            .attr('href');

        const entreprise = $(el)
            .find('h4')
            .text()
            .replace(/''/, ',');

            console.log(title, link, entreprise);
        });
    }
});

