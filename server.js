var express = require('express');
const path = require('path');
var app = express();
const bodyParser = require('body-parser');
var fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'))
app.use(express.static('index.html' + '/public'));

//change it from https://www.twilio.com/console
const authToken = 'your_auth_token';
const accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const yourNumber = '+1850000000';
const client = require('twilio')(accountSid, authToken);

app.post('/sms', function(req, res) {
  var msg = req.body.Message;
  var friendNumber = req.body.PNumber;
  client.messages
    .create({
      body: msg,
      from: yourNumber,
      to: friendNumber
    })
    .then( (message)=> { console.log(message.sid);  return res.status(200).send("done");} )
    .catch((error) => {
      console.log("eroorr!");
      return res.status(400).send("error!");
    });

});

app.use('/static', express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
