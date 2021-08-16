const url = "https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415";
const request = require("request");
const cheerio = require("cheerio");

// Home Page request
request(url,cb);

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
  console.log(fullLink);

}
