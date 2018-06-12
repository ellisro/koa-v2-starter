const Document = require('./Document')
const path = require('path');
class Picture extends Document {
  // static filePath = path.join(__dirname, './users.json');
  defaultListFn(item) {
    return true
  }
  constructor(props) {
    super(props);
    this.email = props.email;
  }
}
Picture.prototype.filePath = path.join(__dirname, './users.json');

module.exports = Picture