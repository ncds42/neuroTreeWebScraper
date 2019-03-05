const rp = require('request-promise');
const testUrl = 'https://neurotree.org/neurotree/peopleinfo.php?pid=1';
var Person = require("./person.js");
const cheerio = require('cheerio')



const personParse = function (url) { // Each of these urls will be individual pid=n pages
    return rp(url)
    .then(function (html) {
        const $ = cheerio.load(html);
        const name = $('h1').text().trim();; // Captures Name
            const x = $('.personinfo table tr').text();
            const s = x.match("Affiliations:\\s(\\w*\\s?\\w*\\s?\\w*\\s?\\w*)-?,?\\s?" +
            "(\\w*\\s?\\w*\\s?\\w*\\s?\\w*)-?,?\\s?" +
            "(\\w*\\s?\\w*\\s?\\w*\\s?\\w*)-?,?\\s?" +
            "(\\w*\\s?\\w*\\s?\\w*\\s?\\w*)-?,?\\s?" +
            "(\\w*\\s?\\w*\\s?\\w*\\s?\\w*)-?,?\\s?" +
            "(\\w*\\s?\\w*\\s?\\w*\\s?\\w*)-?,?\\s?" +
            "(\\w*\\s?\\w*\\s?\\w*\\s?\\w*)-?,?\\s?" +
            "(\\w*\\s?\\w*\\s?\\w*\\s?\\w*)-?,?\\s?" +
            "(\\w*\\s?\\w*\\s?\\w*\\s?\\w*)-?,?\\s?" +
            "(\\w*\\s?\\w*\\s?\\w*\\s?\\w*)");
            const arr = [];
            if(Boolean(s)){
            for(var i = 1;i<s.length;i++){
                if(Boolean(s[i])){
                    arr.push(s[i]);
                }
            }
        }

        const person = new Person(name,arr);

        const jqObj = $('.connection_list');
        const parentsTable = jqObj[0];
        const childrenTable = jqObj[1];

        /* Children */
        $(parentsTable).find('tr').each(function (i, elem) {
            var tableData = $(elem).find('td')
            person.addParent($(tableData[0]).text(),$(tableData[1]).text(),
            $(tableData[2]).text(), $(tableData[3]).text())
        })

        $(childrenTable).find('tr').each(function (i, elem) {
            var tableData = $(elem).find('td')
            person.addChild($(tableData[0]).text(),$(tableData[1]).text(),
            $(tableData[2]).text(), $(tableData[3]).text())
        })
        return person; // Each of these will return a single person with children/parents included
    })
    .catch(function(err){
        console.log(err);
    })
};

module.exports = personParse;