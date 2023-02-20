angular.module('FOCUSAPP').controller('RegisterController', function ($scope, $http, $state, $timeout, GlobalVar, $q, $localstorage, serviceAuthen) {
    var baseURL = $("base")[0].href;//$("base").attr("href");
    var config = GlobalVar.HeaderConfig;

    $scope.init = function () {
        $scope.Register = {};
        $("#loading").fadeOut();
    }

    $scope.initConfirm = function () {
        $scope.Register = {};
        $scope.Register = $localstorage.getObject('register_value');
        $scope.Register.IsCondition = false;
        $("#loading").fadeOut();
    }

    $scope.OnClickNext = function () {
        try {
            if ($scope.Register.Email == undefined || $scope.Register.Email == '')
                throw "กรุณาระบุอีเมล";
            else if ($scope.Register.Email != undefined && $scope.Register.Email != '' && !ValidateEmail($scope.Register.Email))
                throw "กรุณาระบุอีเมลให้ถูกต้อง";
            if ($scope.Register.Password == undefined || $scope.Register.Password == '')
                throw "กรุณาระบุรหัสผ่าน";
            else if ($scope.Register.Password.length < 6)
                throw "กรุณาระบุรหัสผ่านอย่างน้อย 6 หลัก";
            else if ($scope.Register.ConfirmPassword == undefined || $scope.Register.ConfirmPassword == '')
                throw "กรุณาระบุยืนยันรหัสผ่าน";
            else if ($scope.Register.Password != $scope.Register.ConfirmPassword)
                throw "กรุณาระบุรหัสผ่านไม่ตรงกัน";
            else {
                $localstorage.setObject('register_value', $scope.Register);
                $state.go('confirmregister');
                //window.location.href = "#/ConfirmRegister";
            }
        }
        catch (err) {
            showWariningToast(err);
        }
    }

    $scope.OnClickConfirm = function () {
        try {
            if ($scope.Register.FirstName == undefined || $scope.Register.FirstName == '')
                throw "กรุณาระบุชื่อ";
            else if ($scope.Register.LastName == undefined || $scope.Register.LastName == '')
                throw "กรุณาระบุนามสกุล";
            else if ($scope.Register.FirstNameEn == undefined || $scope.Register.FirstNameEn == '')
                throw "กรุณาระบุชื่อ";
            else if ($scope.Register.LastNameEn == undefined || $scope.Register.LastNameEn == '')
                throw "กรุณาระบุนามสกุล";
            else if ($scope.Register.Telephone == undefined || $scope.Register.Telephone == '')
                throw "กรุณาระบุเบอร์โทรศัพท์";
            else if ($scope.Register.CitizenId == undefined || $scope.Register.CitizenId == '')
                throw "กรุณาระบุเลขที่บัตรประชาชน";
            else if ($scope.Register.Address == undefined || $scope.Register.Address == '')
                throw "กรุณาระบุที่อยู่";
            else if ($scope.Register.IsCondition == undefined || $scope.Register.IsCondition == false)
                throw "กรุณายอมรับเงื่อนไข และ นโยบายรักษาความลับ";
            else {
                $("#loading").fadeOut();

                var data = {
                    Username: $scope.Register.Email,
                    Password: $scope.Register.Password
                }

                data.EmployeeData = {};
                data.EmployeeData.FirstName = $scope.Register.FirstName;
                data.EmployeeData.LastName = $scope.Register.LastName;
                data.EmployeeData.FirstNameEn = $scope.Register.FirstNameEn;
                data.EmployeeData.LastNameEn = $scope.Register.LastNameEn;
                data.EmployeeData.CitizenId = $scope.Register.CitizenId;
                data.EmployeeData.Email = $scope.Register.Email;
                data.EmployeeData.Address = $scope.Register.Address;
                data.EmployeeData.MobilePhone = $scope.Register.Telephone;

                console.log(data);

                var qq = $q.all([serviceAuthen.postRegister(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                //window.location.href = "#/BranchAdd";
                                $state.go('branchadd');
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
