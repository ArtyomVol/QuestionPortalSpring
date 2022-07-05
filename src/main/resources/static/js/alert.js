function alertModify(dialog, header="Message") {
    let winW = window.innerWidth;
    let winH = window.innerHeight;
    let dialogoverlay = document.getElementById('dialogoverlay');
    let dialogbox = document.getElementById('dialogbox');
    dialogoverlay.style.display = "block";
    dialogoverlay.style.height = winH + "px";
    dialogbox.style.left = (winW / 2) - (550 * .5) + "px";
    dialogbox.style.top = "100px";
    dialogbox.style.display = "block";
    document.getElementById('dialogboxhead').innerHTML = header;
    document.getElementById('dialogboxbody').innerHTML = dialog;
    document.getElementById('dialogboxfoot').innerHTML = '<button id="btnAlertOk" class="btn-ok" type="submit">OK</button>';
    document.getElementById("btnAlertOk").focus();
}

function closeAlert(){
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
    return 1;
}