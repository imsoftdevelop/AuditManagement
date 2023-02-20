function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


function ToJavaScriptDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
}

function ToJsonDate(value) {

    var result = '';

    if (value != '') {
        var from = value.split('/');
        result = (from[2] - 543) + '-' + from[1] + '-' + from[0];
    }
    return result;
}

function ToJsonDate2(value) {

    var result = '';

    if (value != '') {
        var from = value.split('/');
        result = (from[2]) + '-' + from[1] + '-' + from[0];
    }
    return result;
}

function ToJsonDate3(value) {

    var result = '';

    if (value != '') {
        var from = value.split('/');
        var time = from[2].split(' ');
        result = (time[0]) + '-' + from[1] + '-' + from[0] + ' ' +time[1];
    }
    return result;
}


function formatFullDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + (date.getFullYear() + 543) + strTime;
}

function formatShortDate(date) {
    var result = '';
    if (date != null & date != '') {
        var from = date.split('-');
        result = from[2] + "/" + from[1] + "/" + from[0]
    }
    return result;
}

function formatDate(date) {
    var result = '';
    if (date != null & date != '') {
        var res = date.substring(0, 10);
        var from = res.split('/');
        result = from[0] + "/" + from[1] + "/" + (parseInt(from[2]) -543).toString();
    }
    return result;
}

function formatDateFull(date) {
    var result = '';
    if (date != null & date != '') {
        var res = date.substring(0, date.length);
        var from = res.split('/');
        var time = from[2].split(' ');

        result = from[0] + "/" + from[1] + "/" + (parseInt(from[2]) - 543).toString() + ' ' + time[1];
    }
    return result;
}

function formatDateSameYear(date) {
    var result = '';
    if (date != null & date != '') {
        var res = date.substring(0, 10);
        var from = res.split('/');
        result = from[0] + "/" + from[1] + "/" + (parseInt(from[2])).toString();
    }
    return result;
}


function formatDate2(date) {
    var result = '';
    if (date != null & date != '') {
        var res = date.substring(0, 10);
        var from = res.split('/');
        if (from.length == 3) {
            var d = new Date();
            var n = d.getFullYear();

            if (from[0].length == 1)
                from[0] = "0" + from[0]

            if (from[1].length == 1)
                from[1] = "0" + from[1]

            if (parseInt(from[2]) > (n + 443) && parseInt(from[1]) < 13 && parseInt(from[0]) < 31)
                result = from[0] + "/" + from[1] + "/" + from[2];
        }
    }
    return result;
}

function formatDate3(date) {
    var result = '';
    if (date != null & date != '') {
        var res = date.substring(0,10);
        var from = res.split('/');
        result = (parseInt(from[2]) - 543) + "-" + from[1] + "-" + from[0]
    }
    return result;
}



function formatDate5(date) {
    var result = '';
    if (date != null & date != '') {
        var res = date.substring(0, 10);
        var from = res.split('-');
        result = parseInt(from[0]) + "-" + from[1]
    }
    return result;
}

function gethourminute(date, type) {
    var result = '';
    if (date != null & date != '') {
        var time = date.substring(10, date.length).trim();
        var from = time.split(':');
        if (type == '1')
            result = from[0]
        else if (type == '2')
        result = from[1]
    }
    return result;
}

function GetDatetimeNow() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var ms = today.getMinutes();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    if (hh < 10) {
        hh = '0' + hh
    }

    if (ms < 10) {
        ms = '0' + ms
    }

    today = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + ms;
    //var todayre = formatDate(today);
    return today
}

function GetDatetimeNowAddDay(day) {

    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + day);

    var dd = tomorrow.getDate();
    var mm = tomorrow.getMonth() + 1; //January is 0!
    var yyyy = tomorrow.getFullYear();
    var hh = today.getHours();
    var ms = tody.getMinutes();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    if (hh < 10) {
        hh = '0' + h
    }

    if (ms < 10) {
        ms = '0' + ms
    }

    tomorrow = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + ms;
    return tomorrow
}

function Addyear(date) {
    var result = '';
    if (date != null & date != '') {
        var res = date.substring(0, 10);
        var from = res.split('-');
        result = (parseInt(from[0]) + 1).toString() + '-' + from[1] + "-" + from[2];
    }
    return result;
}

function GetMonthNow() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
  
    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

   
    var todayre = formatDate(today);
    return todayre
}

function clearnotifications()
{ $('#noto').css("display", "none"); }

function vinotifications(txt, typ) {
    //danger //success //info //waring
    $.notify({ message: txt }, { type: typ });
}


function AFormatNumber(value, digit) {
    var myval = '';

    if (value != undefined && value != null && value !== '') {
        myval = value.toString();
        myval = myval.replace(/,/g, '');
        myval = Number(parseFloat(myval).toFixed(2)).toLocaleString('en', {
            minimumFractionDigits: digit
        });
    }

    return myval
}

function ConvertToDecimal(value) {
    var val = ''
    if (value != undefined && value != null && value !== '') {
        val = value.toString();
        val = val.replace(/,/g, '');
        val = parseFloat(val);
    }
    return val;
}


function ValidateEmail(mail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat))
        return true;
    return false;
}


function getFilename(fullPath) {
    if (fullPath) {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
        return filename;
    }
}

function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function findchildnodesreturnvalue(elechildNodes, eleid) {
    var childNodes = elechildNodes,
        children = [],
        i = childNodes.length,
        id = '';

    while (i--) {
        if (childNodes[i].id == eleid) {
            id = childNodes[i].value;
        }
    }

    return id;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getMonthTh(date) {
    var months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    var result = '';
    if (date != null & date != '') {
        var res = date.substring(0, 10);
        var from = res.split('/');
        result = months[parseInt(from[1]) - 1];
    }
    return result;
}