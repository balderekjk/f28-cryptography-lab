const bcryptjs = require('bcryptjs');
const users = [];

module.exports = {
  login: (req, res) => {
    // console.log('Logging In User');
    // console.log(req.body);
    const { username, password } = req.body;
    for (let i = 0; i < users.length; i++) {
      const existingPass = bcryptjs.compareSync(
        password,
        users[i].passwordHash
      );
      if (users[i].username === username) {
        if (existingPass) {
          const userCopy = { ...users[i] };
          delete userCopy.passwordHash;
          return res.status(200).send(userCopy);
        }
      }
    }
    return res.status(400).send('User not found.');
  },
  register: (req, res) => {
    let securedUserInfo = { ...req.body };
    let { password } = securedUserInfo;
    // console.log(password);
    // console.log('Registering User');
    // console.log(req.body);
    const salt = bcryptjs.genSaltSync(5);
    const passwordHash = bcryptjs.hashSync(password, salt);
    delete password;
    securedUserInfo.passwordHash = passwordHash;
    users.push(securedUserInfo);
    res.status(200).send(securedUserInfo);
  },
};
