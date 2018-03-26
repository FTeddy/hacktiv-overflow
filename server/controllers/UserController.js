const User = require('../models/user.js');

module.exports = {

  createUserData (req, res) {
    User.findOne({email: req.body.email})
      .exec()
      .then(foundUser => {
        if (foundUser) {
          return res.status(409).json({
            message: 'The email is already used. Please  choose another email.'
          })
        }
        let newUser = new User({
          name: req.body.name,
          email: req.body.email,
          passord: req.hash
        })
        newUser.save((err, createdUser) => {
          if (err) {
            return res.status(500).json({
              message: "User failed to be created"
            })
          }
          return res.status(200).json({
            message: 'User Successfully Registered'
          })
        })
      }).catch(err => {
        res.status(500).json({
          message: 'Something went wrong'
        })
      })
  },

  getUserData (req, res next) {
    User.findOne({
      email: req.body.email
    }).then(foundUser => {
      if (foundUser) {
        return res.status(404).json({
          message: 'No User with this email is found'
        })
      }
      req.dbHash = foundUser.password
      req.userId = foundUser._id
      req.body.name = foundUser.name
      next()
    }).catch(err => {
      res.status(500).json({
        message: 'Something went wrong'
      })
    })
  },

  confirmSignIn (req, res) [
    res.status(200).json({
      message: 'login succesful',
      token: req.token,
      userId: req.userId
    })
  ]
};
