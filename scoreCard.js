// const url = "https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/england-vs-new-zealand-final-1144530/full-scorecard";

const request = require("request");
const cheerio = require("cheerio");
// const { find } = require("domutils");

const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require("path");

function processScoreCard(url) {
    request(url, cb);
}

function cb(err, request, html) {
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        extractDetails(html);
    }
}



function extractDetails(html) {

    $ = cheerio.load(html);

    let description = $(".event .description").text();
    let matchStatus = $(".event .status-text").text();

    // console.log(description);
    // console.log(matchStatus);

    // extract useful data from description 
    let info = description.split(",");
    let venue = info[1].trim();
    let date = info[2].trim();
    // console.log(venue);
    // console.log(date);


    let innings = $('.card.content-block.match-scorecard-table .Collapsible');

    // console.log(innings.html());
    for (let i = 0; i < innings.length; i++) {
        let teamName = $(innings[i]).find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        // console.log(teamName);

        let oppIdx = (i == 0) ? 1 : 0;

        let oppName = $(innings[oppIdx]).find("h5").text();
        oppName = oppName.split("INNINGS")[0].trim();
        // console.log(oppName);


        let currInnings = $(innings[i]);

        let allBatsman = currInnings.find(".table.batsman tbody tr");

        // console.log(allBatsman.text());

        for (let j = 0; j < allBatsman.length; j++) {
            let allColms = $(allBatsman[j]).find("td");


            let isWorthy = $(allColms[0]).hasClass("batsman-cell");

            if (isWorthy) {
                let playerName = $(allColms[0]).text();
                let runs = $(allColms[2]).text();
                let balls = $(allColms[3]).text();
                let fours = $(allColms[5]).text();
                let sixes = $(allColms[6]).text();
                let sr = $(allColms[7]).text();

                console.log(`${playerName}|| has ${runs}|| runs of ${balls}|| with ${fours} fours ,|| ${sixes} sixes with Strike rate of : ${sr}`);
                proccessPlayers(playerName, runs, balls, fours, sixes, sr, oppName, venue, date);
            }

        }


    }

}


function proccessPlayers(teamName, oppName, playerName, runs, balls, fours, sixes, sr, venue, date) {
    // first i have to create every team folder 
    let teamPath = path.join(__dirname, "/ipl", "/teamName");
    dirCreator(teamPath);

    // make csv file for every player
    let PlayerPath = path.join(teamPath + playerName + ".csv");

    



}
// make data and url 
function writeCsv(address, data) {
    const csvWriter = createCsvWriter({
        path: url,
        header: [
            { id: 'name', title: 'Name' },
            { id: 'runs', title: 'Runs' },
            { id: 'balls', title: 'Balls' },
            { id: 'six', title: 'Sixes' },
            { id: 'sr', title: 'Strike Rate' },
            { id: 'venue', title: 'Venue' },
            { id: 'date', title: 'Date' },
        ]
    });
    csvWriter
        .writeRecords(data)
        .then(() => console.log('The CSV file was written successfully'));

}


function readCsv(add) {
    fs.createReadStream(add)
        .pipe(csv())
        .on('data', (row) => {
            console.log(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
        });
}


function dirCreator(link) {
    if (fs.existsSync(link) == false) {
        fs.mkdirSync(link);
    }
}


module.exports = {
    ps: processScoreCard
}