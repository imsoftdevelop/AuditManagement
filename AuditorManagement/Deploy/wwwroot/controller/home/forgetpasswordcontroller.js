angular.module('FOCUSAPP').controller('ForgetPasswordController', function ($scope, $http, $state, $timeout, GlobalVar, $q, $localstorage, serviceAuthen) {
    var baseURL = $("base")[0].href;//$("base").attr("href");
    var config = GlobalVar.HeaderConfig;

    $scope.init = function () {
        $scope.ForgetPassword = {};
        $("#loading").fadeOut();
    }

    $scope.OnClickConfirm = function () {
        try {
            if ($scope.ForgetPassword.Email == undefined || $scope.ForgetPassword.Email == '')
                throw "กรุณาระบุอีเมล";
            else if ($scope.ForgetPassword.Email != undefined && $scope.ForgetPassword.Email != '' && !ValidateEmail($scope.ForgetPassword.Email))
                throw "กรุณาระบุอีเมลให้ถูกต้อง";
            else {
                $("#loading").fadeOut();

                var data = {
                    Username: $scope.ForgetPassword.Email,
                }
                console.log(data);

                var qq = $q.all([serviceAuthen.postForgetPassword(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                showSuccessText(data[0].data.responsedata);
                                $state.go('login');
                            }
                            else
                                showErrorToast(data[0].data.errormessage);
                        }
                    }
                    catch (err) {
                        showErrorToast(response.data.errormessage);
                    }
                });
            }
        }
        catch (err) {
            showWariningToast(err);
        }
    }
});
