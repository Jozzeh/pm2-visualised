class errorVisual{

    addError(message, messagetype = "ALERT"){
        let currentdate = new Date();
        let logdatetime = currentdate.getFullYear() + "-" + utility.addZero((currentdate.getMonth()+1)) + '-' + utility.addZero(currentdate.getDate()) + ' ' + utility.addZero(currentdate.getHours()) + ':' + utility.addZero(currentdate.getMinutes()) + ':' + utility.addZero(currentdate.getSeconds());
        let prefix = "<span class='logdate'>" + logdatetime + "</span>  &nbsp;  <strong>" + messagetype + ": </strong>";
        let messageul = document.getElementById("warninglist");
        let messageli = document.createElement("li");
        messageli.innerHTML = prefix + message;
        messageul.insertBefore(messageli, messageul.firstChild);
    }

}