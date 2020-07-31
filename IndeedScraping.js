const indeed = require('indeed-scraper');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const queryOptions = {
    host: 'www.indeed.fr',
    query: 'Developpeur',
    city: '',
    radius: '25',
    level: 'entry_level',
    jobType: 'fulltime',
    maxAge: '7',
    sort: 'date',
    limit: 4000
  };

  const csvWWriter = createCsvWriter({
    path: 'IndeedScraping.csv',
    header: [
        {id: 'title', title: 'query'},
        {id: 'url', title: 'url'},
        {id: 'company', title: 'Company'},
        {id: 'salary', title: 'Salary'}
    ]
});

const records = [
    {Title: 'title'},
    {Url: 'url'},
    {Company: 'company'},
    {Salary: 'salary'},
];
    indeed.query(queryOptions).then(res => {
        console.log(res); // An array of Job objects
    csvWWriter.writeRecords(res)
    .then(() => {
        console.log('...Done');
    });
    });