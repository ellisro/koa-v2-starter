const Model = require('./Model')
const path = require('path')

class User extends Model {
  // static filePath = path.join(__dirname, './users.json');
  defaultListFn(item) {
    return true
  }
  constructor(props) {
    super(props);
    this.email = props.email;
  }
}
User.prototype.filePath = path.join(__dirname, './users.json');

module.exports = User


// let users = User.list()
// .then(users => {
//   console.log(users)

// })
// .catch(err => {
//   console.log(err)
// })
// console.log(users)

// let user = new User({ email: 'khgfkfgj@hgfjf.khgfjfg' })
// console.log(user)
// user.save()