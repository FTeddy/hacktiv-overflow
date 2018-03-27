const bcrypt = require('bcrypt')
const saltRounds = 10

function hash (req, res, next) {
  console.log('hashing...');
  const password = req.body.password
  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
      console.log(err)
      return res.status(500).json({
        message: 'hashing error'
      })
    }
    req.hash = hash
    next()
  });
}

function check (req, res, next) {
  console.log('checking hash...');
  const hash = req.dbHash
  // console.log(hash);
  const password = req.body.password
  // console.log(password);
  bcrypt.compare(password, hash)
    .then(function(response) {
    if (response === true) {
      next()
    } else if (response === false) {
      res.status(401).json({
        message: 'User is unauthorized'
      })
    }
  }).catch(err => {
    res.status(500).json({
      message: 'check hash error'
    })
  })
}

module.exports = {
  hash: hash,
  check: check
};
