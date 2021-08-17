// const url = "https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results";
const cheerio = require("cheerio");
const request = require("request");
const scoreCardObj = require("./scoreCard.js");


function getAllMatchesLink(url) {
    request(url, cb);
}

function cb(err, request, html) {
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        extractAllMatch(html);
    }
}

function extractAllMatch(html) {
    //    console.log(html);
    $ = cheerio.load(html);

    let anchorElement = $("a[data-hover='Scorecard']");

    // FIXME: complete
    for (let i = 0; i < anchorElement.length; i++) {
        let link = $(anchorElement[i]).attr("href");
        // console.log(link);
        let fullLink = "https://www.espncricinfo.com" + link;
        // console.log(fullLink);
        scoreCardObj.ps(fullLink);
    }
}

module.exports = {
    GML : getAllMatchesLink
}