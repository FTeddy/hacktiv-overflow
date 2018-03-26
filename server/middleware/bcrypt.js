const bcrypt = require('bcrypt')
const saltRounds = 10

function hash (req, res, next) {
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
  const hash = req.dbHash
  const password = req.body.passord
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
