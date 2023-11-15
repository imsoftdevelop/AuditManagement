angular.module('FOCUSAPP').controller('CustomerProfilesController', function ($scope, $http, $timeout, GlobalVar, $q, globalService, serviceCustomer) {
    var baseURL = $("base")[0].href;//$("base").attr("href");
    var config = GlobalVar.HeaderConfig;

    $scope.Profiles = {};

    var gProfile = globalService.getProfile();
    var gConfig = globalService.getConfigSystem();

    $scope.init = function () {
        try {
            $("#loading").fadeIn();
            var qq = $q.all([gProfile, gConfig]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                            $scope.Profiles = data[0].data.responsedata;
                        }
                        else if (data[0].data.responsecode == '400') { showErrorToast(data[0].data.errormessage); }

                        if (data[1].data.responsecode == '200' && data[1].data.responsedata != undefined && data[1].data.responsedata != "") {
                            $scope.ConfigSystem = data[1].data.responsedata;
                        }
                        else if (data[1].data.responsecode == '400') { showErrorToast(data[1].data.errormessage); }

                    }

                }
                catch (err) {
                    showErrorToast(err);
                }
            });

        }
        catch (err) {
            showErrorToast(err);
        }
        finally {
            $("#loading").fadeOut();
        }
    }

    $scope.OnClickSave = function () {
        try {

            if ($scope.Profiles.ProfileData.FirstName == undefined || $scope.Profiles.ProfileData.FirstName == '')
                throw "กรุณาระบุชื่อ";
            else if ($scope.Profiles.ProfileData.LastName == undefined || $scope.Profiles.ProfileData.LastName == '')
                throw "กรุณาระบุนามสกุล";
            else if ($scope.Profiles.ProfileData.FirstNameEn == undefined || $scope.Profiles.ProfileData.FirstNameEn == '')
                throw "กรุณาระบุชื่อ (EN)";
            else if ($scope.Profiles.ProfileData.LastNameEn == undefined || $scope.Profiles.ProfileData.LastNameEn == '')
                throw "กรุณาระบุนามสกุล (EN)";
            else if ($scope.Profiles.ProfileData.MobilePhone == undefined || $scope.Profiles.ProfileData.MobilePhone == '')
                throw "กรุณาระบุเบอร์โทรศัพท์";
            else if ($scope.Profiles.ProfileData.CitizenId == undefined || $scope.Profiles.ProfileData.CitizenId == '')
                throw "กรุณาระบุเลขที่บัตรประชาชน";
            else if ($scope.Profiles.ProfileData.Email == undefined || $scope.Profiles.ProfileData.Email == '')
                throw "กรุณาระบุอีเมล";
            else if ($scope.Profiles.ProfileData.Email != undefined && $scope.Profiles.ProfileData.Email != '' && !ValidateEmail($scope.Profiles.ProfileData.Email))
                throw "กรุณาระบุอีเมลให้ถูกต้อง";
            else {
                $("#loading").fadeIn();
                var data = {
                    ProfileId: $scope.Profiles.ProfileData.ProfileId,
                    ProfileCode: $scope.Profiles.ProfileData.ProfileCode,
                    TitleName: $scope.Profiles.ProfileData.TitleName,
                    FirstName: $scope.Profiles.ProfileData.FirstName,
                    LastName: $scope.Profiles.ProfileData.LastName,
                    Gender: $scope.Profiles.ProfileData.Gender,
                    CitizenId: $scope.Profiles.ProfileData.CitizenId,
                    Email: $scope.Profiles.ProfileData.Email,
                    Address: $scope.Profiles.ProfileData.Address,
                    MobilePhone: $scope.Profiles.ProfileData.MobilePhone,
                    MobilePhone1: $scope.Profiles.ProfileData.MobilePhone1,
                    FirstNameEn: $scope.Profiles.ProfileData.FirstNameEn,
                    LastNameEn: $scope.Profiles.ProfileData.LastNameEn,
                };
                console.log(data);

                var qq = $q.all([serviceCustomer.postProfiles(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                $scope.Profiles.Profile = data[0].data.responsedata;
                                showSuccessText('บันทึกรายการเรียบร้อย');
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
        finally {
            $("#loading").fadeOut();
            }
    }

    $scope.OnClickChange = function () {
        $scope.ChangePassword = {};
        $('#ModalChangePassword').modal('show');
    }

    $scope.OnClickSavePassword = function () {
        try {
            if ($scope.ChangePassword.Password == undefined || $scope.ChangePassword.Password == '')
                throw "กรุณาระบุรหัสผ่านปัจจุบัน";
            else if ($scope.ChangePassword.NewPassword == undefined || $scope.ChangePassword.NewPassword == '')
                throw "กรุณาระบุรหัสผ่านใหม่";
            else if ($scope.ChangePassword.NewPassword.length < 6)
                throw "กรุณาระบุรหัสผ่านใหม่อย่างน้อย 6 หลัก";
            else if ($scope.ChangePassword.ConfirmNewPassword == undefined || $scope.ChangePassword.ConfirmNewPassword == '')
                throw "กรุณาระบุยืนยันรหัสผ่านใหม่";
            else if ($scope.ChangePassword.NewPassword != $scope.ChangePassword.ConfirmNewPassword)
                throw "กรุณาระบุรหัสผ่านไม่ตรงกัน";
            else {
                $("#loading").fadeOut();

                var data = {
                    BeforePassword: $scope.ChangePassword.Password,
                    Password: $scope.ChangePassword.NewPassword
                }
                console.log(data);

                $http.post(baseURL + "Authen/PostChangePassword", data, config).then(
                    function (response) {
                        try {
                            if (response != undefined && response != "") {
                                if (response.data.responsecode == 200) {
                                    $("#loading").fadeOut();
                                    showSuccessText(response.data.responsedata);
                                    $('#ModalChangePassword').modal('hide');
                                }
                                else {
                                    $("#loading").fadeOut();
                                    showErrorToast(response.data.errormessage);
                                }
                            }
                        }
                        catch (err) {
                            showErrorToast(err);
                        }
                    });

            }
        }
        catch (err) {
            showWariningToast(err);
        }
    }
});
