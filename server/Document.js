const uuidV4 = require('uuid/v4');
const path = require('path')

const {promisify} = require('util');

const fs = require('fs');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

function fun() { return true }

class Document { 

  constructor(props) {
    this.id = props.id || uuidV4();;
  }
  // filePath() {
  //   return this.constructor.filePath
  // }
  read() {
    return readFile(this.filePath, { encoding: 'utf8' })
      .then((text) => { return JSON.parse(text) })    
  }
  save() {
    
    return this.read()
      .then((items) => { 
        let index = items.findIndex(i => i.id === this.id);
        if (index !== -1) {
          // this means we didn't find item 
          // not even index number 0
          // we are replacing 
          // if we changed any unique fileds,
          // we have to make sure there 
          // are no conflicts, with any unique fields          
          items[index] = this; 
        }
        else { 
          // make it last one in the list
          // but we have to make sure there 
          // are no conflicts, with any unique fields
          items.push(this); 
        }
        return items;
      })
      .then(items => {
        return writeFile(this.filePath, JSON.stringify(items))
      })
      .then(() => {
        return this
      })
      .catch((err) => {
          console.log('ERROR:', err);
      });
  }

  defaultListFn(item) {
    return true
  }  
}
Document.list = function() {
  return this.prototype.read().then(items => {
    return items
  })
}
Document.find = function(fn) {
  return this.read().then(items => {
    return items.filter(fn)
  })
}

module.exports = Document