var msg = "";
var SenderName = "";
var phoneNumber = 0;
var url = '/sms';

var successAlert = '<div class="alert alert-success" id="success-alert">' +
  '<button type="button" class="close" data-dismiss="alert">x</button>' +
  '<strong>Success! </strong> Your Message was Sent to your friend Successfully.' +
  '</div>';
document.body.innerHTML = successAlert + document.body.innerHTML;
$("#success-alert").hide();

var warningAlert = '<div class="alert alert-warning" id="warning-alert">' +
  '<button type="button" class="close" data-dismiss="alert">x</button>' +
  '<strong>Error! </strong> Your Message did not send,  Try Again!' +
  '</div>';
document.body.innerHTML = warningAlert + document.body.innerHTML;
$("#warning-alert").hide();

document.getElementById('Send-Button').addEventListener('click', function(e) {
  e.stopPropagation();
  e.preventDefault();
  msg = document.getElementById('Msg').value;
  phoneNumber = document.getElementById('Num-Res').value;
  SenderName = document.getElementById('Sender-Name').value;
  msg = msg + " ..from your friend: " + SenderName;
  const data = {
    Message: msg,
    PNumber: phoneNumber,
  };
  console.log(data);

  axios.post(url, data).then(res => {
    console.log(res.status);
    console.log("send to server " + res.statusText);
  }).then(function() {
    showSuccessAlert();
  }).catch((error) => {
    console.log("erooooorrrr!");
    showWarningAlert();
  });

});

function showSuccessAlert() {
  $("#success-alert").fadeTo(4000, 1000).slideUp(1000, function() {
    $("#success-alert").slideUp(1000);
  });
  document.getElementById('Msg').value = "";
  document.getElementById('Num-Res').value = "";
  document.getElementById('Sender-Name').value = "";
};

function showWarningAlert() {
  $("#warning-alert").fadeTo(4000, 1000).slideUp(1000, function() {
    $("#warning-alert").slideUp(1000);
  });
  document.getElementById('Msg').value = "";
  document.getElementById('Num-Res').value = "";
  document.getElementById('Sender-Name').value = "";
};
