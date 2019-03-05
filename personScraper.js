const rp = require('request-promise'); // This imports rp modules
const $ = require('cheerio');          // This imports ??
const personParse = require('./personParse'); // This imports my potusParse Module
const url = 'https://neurotree.org/neurotree/peopleinfo.php?pid=';
const testUrl = 'https://neurotree.org/neurotree/peopleinfo.php?pid=1';


/* Loads in range of pid's you want to scrape */
urls = [];
var i;
for (i = 1; i <= 1000; i++) {
    urls.push(url + i)
}

var promise = new Promise((resolve, reject) => { resolve() })
    .then(function () {
        return Promise.all(urls.map(function (eachUrl) {
            return personParse(eachUrl);
        })
        )
    })
    .then((x) => {
        const fs = require('fs');
        console.log('Writing neurotree data to json file....')
        console.log('Attempting to log ' + (i-1) + ' people')
        console.log('*****************************************\n')
        x.forEach(function(person){
            console.log(person.name)
        })
        fs.writeFileSync("neurotreeData.json", JSON.stringify(x));
    }
    )
