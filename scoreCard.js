const url = "https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/england-vs-new-zealand-final-1144530/full-scorecard";

const request = require("request");
const cheerio = require("cheerio");
const { find } = require("domutils");




request(url,cb);

function cb(err,request,html){
    if(err){
        console.log(err);
    }else{
        // console.log(html);
        extractDetails(html);
    }
} 



function extractDetails(html){

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
    for(let i = 0; i<innings.length;i++){
        let teamName = $(innings[i]).find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        // console.log(teamName);

        let oppIdx = (i==0)?1:0;

        let oppName = $(innings[oppIdx]).find("h5").text();
        oppName = oppName.split("INNINGS")[0].trim();
        // console.log(oppName);


        let currInnings = $(innings[i]);

        let allBatsman = currInnings.find(".table.batsman tbody tr");
        
        // console.log(allBatsman.text());

        for(let j = 0; j<allBatsman.length;j++){
            let allColms = $(allBatsman[j]).find("td");
            

            let isWorthy = $(allColms[0]).hasClass("batsman-cell");
            
            if(isWorthy){
            let playerName = $(allColms[0]).text();
            let runs = $(allColms[2]).text();
            let balls = $(allColms[3]).text();
            let fours = $(allColms[5]).text();
            let sixes = $(allColms[6]).text();
            let sr = $(allColms[7]).text();

            // console.log(`${playerName}|| has ${runs}|| runs of ${balls}|| with ${fours} fours ,|| ${sixes} sixes with Strike rate of : ${sr}`);
            }
            
        }


    }

}



