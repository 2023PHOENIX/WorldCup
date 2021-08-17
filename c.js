const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csv = require('csv-parser');
const fs = require('fs');

const data = [
  {
    name: 'John',
    surname: 'Snow',
    age: 26,
    gender: 'M'
  }, {
    name: 'Clair',
    surname: 'White',
    age: 33,
    gender: 'F',
  }, {
    name: 'Fancy',
    surname: 'Brown',
    age: 78,
    gender: 'F'
  }
];

const url = 'hello.csv';
function write(url,data){
const csvWriter = createCsvWriter({
  path: url,
  header: [
    {id: 'name', title: 'Name'},
    {id: 'surname', title: 'Surname'},
    {id: 'age', title: 'Age'},
    {id: 'gender', title: 'Gender'},
  ]
});
csvWriter
  .writeRecords(data)
  .then(()=> console.log('The CSV file was written successfully'));


}


// write(url,data);
function readCsv(url){
  let arr = []
fs.createReadStream(url)
  .pipe(csv())
  .on('data', (row) => {
    // console.log(row);
    arr.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

  return arr;
}

console.log(readCsv(url));

