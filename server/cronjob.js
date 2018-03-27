const CronJob = require('cron').CronJob
const nodemailer = require('nodemailer');
const kue = require ('kue')
const queue = kue.createQueue()
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'system.werkbau@gmail.com',
    pass: 'SilversmithBJ221A'
  }
})

// {
//  title: `Your question has been answered by ${foundUser.name}`,
//  to: foundThread.userId.email,
//  template: 'reminder-email'
// }
console.log('before');
new CronJob('* * */1 * * *', function() {
  //execute kue emailing
  console.log('hello');
  queue.process('email', 10, function(job, done) {
    let payload = job.data

    const mailOptions = {
      from: 'system.werkbau@gmail.com', // sender address
      to: payload.to, // list of receivers
      subject: payload.title, // Subject line
      html: '<p>Your question on hacktiv overflow has received answer!</p>'// plain text body
    };
    // send email
    transporter.sendMail(mailOptions, function (err, info) {
       if(err) {
         console.log(err)
         return done(new Error('invalid to address'));
       } else {
         console.log(info);
         done()
       }
    });

  })
}, false, 'Asia/Jakarta')
