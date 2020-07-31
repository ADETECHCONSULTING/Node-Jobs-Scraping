const { LinkedinScraper, events, IData } = require('linkedin-jobs-scraper');
var array = [];

module.exports = {
linkedinJobs: async function getJobs() {

    return new Promise(resolve => {
// Each scraper instance is associated with one browser.
    // Concurrent queries will run on different pages within the same browser instance.
    const scraper = new LinkedinScraper({
        headless: true,
        slowMo: 10,
    });


    // Add listeners for scraper events
    scraper.on(events.scraper.data, (data) => {
        console.log(
            data.description.length,
            `Query='${data.query}'`,
            `Location='${data.location}'`,
            `Title='${data.title}'`,
            `Company='${data.company}'`,
            `Place='${data.place}'`,
            `Date='${data.date}'`,
            `Link='${data.link}'`,
            `senorityLevel='${data.senorityLevel}'`,
            `function='${data.jobFunction}'`,
            `employmentType='${data.employmentType}'`,
            `industries='${data.industries}'`,
        );

        if(data) array.push(data);
    });
 
    scraper.on(events.scraper.error, (err) => {
        console.error(err);
    });
    scraper.on(events.scraper.end, () => {
        console.log('All done!');
        resolve(array);
    });
 
    // Add listeners for puppeteer browser events
    scraper.on(events.puppeteer.browser.targetcreated, () => {
    });
    scraper.on(events.puppeteer.browser.targetchanged, () => {
    });
    scraper.on(events.puppeteer.browser.targetdestroyed, () => {
    });
    scraper.on(events.puppeteer.browser.disconnected, () => {
    });
 
    // Custom function executed on browser side to extract job description
    const descriptionProcessor = () => document.querySelector(".description__text")
        .innerText
        .replace(/[\s\n\r]+/g, " ")
        .trim();
 
    // Run queries concurrently
    Promise.all([
        scraper.run(
            "Développeur",
            "Paris",
            {
                paginationMax: 1, // max 1 pour les test
                descriptionProcessor,
                optimize: true // Block resources such as images, fonts etc to improve bandwidth usage
            }
        ),
        /* 
        scraper.run(
            ["Developer", "Software Engineer"],
            ["San Francisco", "New York"],
            {
                paginationMax: 3,
                descriptionProcessor,
                optimize: true, // Block resources such as images, fonts etc to improve bandwidth usage
            }
        ) 
        */
    ]);
 
    // Close browser
    scraper.close();
    })
    
}
};

/* var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
  // This opens up the writeable stream to `output`
  var writeStream = fs.createWriteStream('./output');

  // This pipes the POST data to the file
  req.pipe(writeStream);

  // After all the data is saved, respond with a simple html form so they can post more data
  req.on('end', function () {
    res.writeHead(200, {"content-type":"text/html"});
    res.end('<form method="POST"><input name="test" /><input type="submit"></form>');
  });

  // This is here incase any errors occur
  writeStream.on('error', function (err) {
    console.log(err);
  });
}).listen(8080);
*/