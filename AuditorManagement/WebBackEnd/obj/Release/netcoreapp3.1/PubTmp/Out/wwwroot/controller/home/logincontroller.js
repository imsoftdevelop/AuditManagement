angular.module('FOCUSAPP').controller('LoginController', function ($scope, $http, $timeout, GlobalVar, $q,$state) {
    var baseURL = $("base")[0].href;//$("base").attr("href");
    var config = GlobalVar.HeaderConfig;
    $scope.Login = {};

    $('.form-element-input-show').addClass('hasValue');

    //$scope.OnClickLogin = function () {
    //    var message = 'Please checck the checkbox';
    //    if (typeof (grecaptcha) != 'undefined') {
    //        var response = grecaptcha.getResponse();
    //        (response.length === 0) ? (message = 'Captcha verification failed') : (message = 'Success!');
    //    }
    //    if (message == 'Success!') {
    //        jQuery('#lblMessage').html(message);
    //        jQuery('#lblMessage').css('color', (message.toLowerCase() == 'success!') ? "green" : "red");

    //        var baseURL = $("base")[0].href;
    //        if (document.getElementById('nametext').value == '1') // admin
    //            window.location.href = baseURL + "Home/Index";
    //        else if (document.getElementById('nametext').value == '2') // office
    //            window.location.href = baseURL + "Home/IndexOffice";
    //        else if (document.getElementById('nametext').value == '3') // office
    //            window.location.href = baseURL + "Home/IndexAccount";
    //        else if (document.getElementById('nametext').value == '4') // office
    //            window.location.href = baseURL + "Home/IndexAudit";
    //        else if (document.getElementById('nametext').value == '5') // office
    //            window.location.href = baseURL + "Home/IndexAdmin";
    //        else if (document.getElementById('nametext').value == '6') // office
    //            window.location.href = baseURL + "Home/IndexCustomer";
    //    }
    //    else {
    //        jQuery('#lblMessage').html(message);
    //        jQuery('#lblMessage').css('color', (message.toLowerCase() == 'success!') ? "green" : "red");
    //    }
    //}

    var txtusername = document.getElementById("txtusername");

    txtusername.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $scope.OnClickLogin();
        }
    });

    var txtpassword = document.getElementById("txtpassword");

    // Execute a function when the user releases a key on the keyboard
    txtpassword.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $scope.OnClickLogin();
        }
    });

    $scope.init = function () {
        $("#loading").fadeOut();
    }

    $scope.OnClickLogin = function () {
        $state.go('customerlist');
       // window.location.href = baseURL + "Home/Default";
        try {
            if ($scope.Login.Email == undefined || $scope.Login.Email == '')
                throw "กรุณากรอกอีเมล";
            else if ($scope.Login.Password == undefined || $scope.Login.Password == '')
                throw "กรุณากรอกรหัสผ่าน";
            else {
            //    if (typeof (grecaptcha) != 'undefined') {
            //        var response = grecaptcha.getResponse();
            //        (response.length === 0) ? (message = 'Captcha verification failed') : (message = 'Success!');
            //    }
            //    if (message == 'Success!') {
            //        $("#loading").fadeIn();
                    var data = {
                        Email: $scope.Login.Email,
                        Password: $scope.Login.Password
                    };
                    $http.post(baseURL + "Authen/Login", data, config).then(
                        function (response) {
                            try {
                                if (response != undefined && response != "") {
                                    if (response.data.responsecode == 200) {
                                        $scope.Data = response.data.responsedata;
                                        if ($scope.Data != undefined && $scope.Data.PermissionData.length > 1)
                                            window.location.href = "#/RoleList";
                                        else
                                            window.location.href = baseURL + "Home/Default";
                                    }
                                    else {
                                        $("#loading").fadeOut();
                                        showErrorToast(response.data.errormessage);
                                    }
                                }
                            }
                            catch (err) {
                                $("#loading").fadeOut();
                                showErrorToast(err);
                            }
                        });
                //}
                //else {
                //    throw "กรุณาตรวจสอบโปรแรกมอัตโนมัติ (Captcha)";
                //}
            }
        }
        catch (err) {
            showWariningToast(err);
        }
    }
});
