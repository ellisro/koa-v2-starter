const {promisify} = require('util');

const fs = require('fs');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);


writeFile('genericfilepromies', 'genericfile contents promies', { encoding: 'utf8' })
  .then(() => {
    console.log('sucesful promies')
  })
  .catch(err => {
    console.log(err);
    if ('not that bad' === err) {
      return 'its okay'
    }
  })


