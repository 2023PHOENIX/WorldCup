const url = "https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415";
const request = require("request");
const cheerio = require("cheerio");
const matchLinkObj = require("./AllMatchesScoreCard");
// Home Page request
request(url,cb);

/* =========create the ipl directory========= */

const path = require("path");
const fs = require("fs");


function dirCreator(link){
  if(fs.existsSync(link)==false){
    fs.mkdirSync(link);
  }
}

const iplPath = path.join(__dirname + "/ipl")
dirCreator(iplPath);



/* ========================== */


function cb(err,request,html){
    if(err){
      console.log(err);
    }else{    /* call for the extracting Link */
      // console.log(html)

      extractLink(html);
    }
}


/* extracting full page of all the matches */
function extractLink(html){
  let $ = cheerio.load(html);

  let anchorElement = $("a[data-hover='View All Results']");
  let link = anchorElement.attr("href");
  let fullLink = "https://www.espncricinfo.com" + link;
  matchLinkObj.GML(fullLink);

}


