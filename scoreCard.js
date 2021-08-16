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

    console.log(description);
    console.log(matchStatus);

    // extract useful data from description 
    let info = description.split(",");
    let venue = info[1].trim();
    let date = info[2].trim();
    console.log(venue);
    console.log(date);


    let innings = $('.card.content-block.match-scorecard-table .Collapsible');

    // console.log(innings.html());
    for(let i = 0; i<innings.length;i++){
        let teamName = $(innings[i]).find("h5").text();
        teamName = teamName.split("INNINGS")[0];
        console.log(teamName);

        
    }

}



