const uuidV4 = require('uuid/v4');
const path = require('path')

const {promisify} = require('util');

const fs = require('fs');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const writeJsonFile = require('write-json-file');
const loadJsonFile = require('load-json-file');





function fun() { return true }

class Model { 

  constructor(props) {
    this.id = props.id || uuidV4();;
  }
  // filePath() {
  //   return this.constructor.filePath
  // }
  read() {
    let key = this.constructor.key; 
    return loadJsonFile(this.filePath).then(data => data[key])    
  }

  save() {

    let key = this.constructor.key; 
    let { filePath, id } = this;

    return loadJsonFile(this.filePath)
      .then(data => {
        data[key][id] = this
        return writeFile(filePath, JSON.stringify(items))
      }) 

      .then(writeResult => {
        console.log('writeResult:',write)
        return loadJsonFile(filePath)
      })
      .then(data => {
        return data[key][id]
      })
      .catch(err => {
        console.log(err)
      })

  }

  defaultListFn(item) {
    return true
  }  
}
Model.list = function() {
  return this.prototype.read().then(items => {
    return items
  })
}
Model.find = function(fn) {
  return this.read().then(items => {
    return items.filter(fn)
  })
}

module.exports = Model