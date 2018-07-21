const Model = require('./Model')
const path = require('path');
class Picture extends Model {
  // static filePath = path.join(__dirname, './users.json');
  defaultListFn(item) {
    return true
  }
  constructor(props) {
    super(props);
    this.email = props.email;
  }
}
Picture.prototype.filePath = path.join(__dirname, './pictures.json');

module.exports = Picture