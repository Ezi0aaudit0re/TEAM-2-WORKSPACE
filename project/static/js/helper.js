function checkIfSuccess(data) {

    if (data["code"] == 200) {
        console.log("Success")
        console.log(data["data"])
    } else {

        console.log("Error")


    }
}


// code for documentation
document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.');
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function notifyMe(msg, user="Test") {
  if (Notification.permission !== "granted")
    // if user has not allowed notification 
    // ask perrmission for nitification
    Notification.requestPermission();
  else {
    var notification = new Notification('Message from ' + user, {
        // TODO add our website logo
      icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
      body: msg,
    });

    notification.onclick = function () {
        // TODO change link here
      window.open("http://stackoverflow.com/a/13328397/1269037");
    };

  }

}
        
