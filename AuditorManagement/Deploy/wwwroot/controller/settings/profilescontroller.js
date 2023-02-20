angular.module('FOCUSAPP').controller('ProfilesController', function ($scope, $http, $timeout, GlobalVar, $q, globalService) {
    var baseURL = $("base")[0].href;//$("base").attr("href");
    var config = GlobalVar.HeaderConfig;

    $scope.Profiles = {};

    var gProfile = globalService.getProfile();
    var gConfig = globalService.getConfigSystem();

    $scope.init = function () {
        try {
            if ($("#inputreceivechaque-popup").length) {
                $('#inputreceivechaque-popup').datepicker({
                    enableOnReadonly: true,
                    todayHighlight: true,
                    autoclose: true,
                    format: "dd/mm/yyyy"
                });
            }
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

                        $scope.OnBinding();
                    }
                   
                }
                catch (err) {
                    showErrorToast(err);
                    $("#loading").fadeOut();
                }
            });

        }
        catch (err) {
            $("#loading").fadeOut();
            showErrorToast(err);
        }
    }

    $scope.OnBinding = function () {
        $scope.Profiles.EmployeeData.RegisterDate = formatDate($scope.Profiles.EmployeeData.RegisterDate);

        if ($scope.Profiles.EmployeeData.SignImagePath != undefined && $scope.Profiles.EmployeeData.SignImagePath != "") {
            initdropify($scope.ConfigSystem.ImagePath + $scope.Profiles.EmployeeData.OwnerId + $scope.ConfigSystem.SignImage + $scope.Profiles.EmployeeData.SignImagePath);
        }
        else
            initdropify('');

        GlobalVar.waitForRenderAndDoSomething();
        //var type = $scope.Parameter.Province.filter(function (item) { return item.Code == $scope.Profiles.ProvinceCode; });
        //if (type.length > 0)
        //    $scope.Profiles.SelectProvince = type[0];

    }

    function initdropify(path) {
        $("#product_thumnail").addClass('dropify');
        var publicpath_identity_picture = path;

        var drEvent = $('.dropify').dropify();
        //drEvent.on('dropify.afterClear', function (event, element) {
        //    $scope.DeleteImages = 1;
        //});
        drEvent = drEvent.data('dropify');
        drEvent.resetPreview();
        drEvent.clearElement();
        drEvent.settings.defaultFile = publicpath_identity_picture;
        drEvent.destroy();

        drEvent.init();

        drEvent = $('.dropify').dropify();
        drEvent.on('dropify.afterClear', function (event, element) {
            $scope.DeleteImages = 1;
        });

        $('.dropify#identity_picture').dropify({
            defaultFile: publicpath_identity_picture,
        });

        $('.dropify').dropify();
    }

    $scope.UploadFiles = function (files) {
        $scope.Upload = 1;
        $scope.SelectedFiles = files;
    };

    $scope.OnClickSave = function () {
        try {

            if ($scope.Profiles.EmployeeData.FirstName == undefined || $scope.Profiles.EmployeeData.FirstName == '')
                throw "กรุณาระบุชื่อ";
            else if ($scope.Profiles.EmployeeData.LastName == undefined || $scope.Profiles.EmployeeData.LastName == '')
                throw "กรุณาระบุนามสกุล";
            else if ($scope.Profiles.EmployeeData.FirstNameEn == undefined || $scope.Profiles.EmployeeData.FirstNameEn == '')
                throw "กรุณาระบุชื่อ (EN)";
            else if ($scope.Profiles.EmployeeData.LastNameEn == undefined || $scope.Profiles.EmployeeData.LastNameEn == '')
                throw "กรุณาระบุนามสกุล (EN)";
            else if ($scope.Profiles.EmployeeData.MobilePhone == undefined || $scope.Profiles.EmployeeData.MobilePhone == '')
                throw "กรุณาระบุเบอร์โทรศัพท์";
            else if ($scope.Profiles.EmployeeData.CitizenId == undefined || $scope.Profiles.EmployeeData.CitizenId == '')
                throw "กรุณาระบุเลขที่บัตรประชาชน";
            else if ($scope.Profiles.EmployeeData.Email == undefined || $scope.Profiles.EmployeeData.Email == '')
                throw "กรุณาระบุอีเมล";
            else if ($scope.Profiles.EmployeeData.Email != undefined && $scope.Profiles.EmployeeData.Email != '' && !ValidateEmail($scope.Profiles.EmployeeData.Email))
                throw "กรุณาระบุอีเมลให้ถูกต้อง";
            else {
                $("#loading").fadeIn();
                var data = {
                    EmpId: $scope.Profiles.EmployeeData.EmpId,
                    OwnerId: $scope.Profiles.EmployeeData.OwnerId,
                    EmpCode: $scope.Profiles.EmployeeData.EmpCode,
                    TitleName: $scope.Profiles.EmployeeData.TitleName,
                    FirstName: $scope.Profiles.EmployeeData.FirstName,
                    LastName: $scope.Profiles.EmployeeData.LastName,
                    Gender: $scope.Profiles.EmployeeData.Gender,
                    CitizenId: $scope.Profiles.EmployeeData.CitizenId,
                    Email: $scope.Profiles.EmployeeData.Email,
                    Address: $scope.Profiles.EmployeeData.Address,
                    MobilePhone: $scope.Profiles.EmployeeData.MobilePhone,
                    FirstNameEn: $scope.Profiles.EmployeeData.FirstNameEn,
                    LastNameEn: $scope.Profiles.EmployeeData.LastNameEn,
                    RegisterDate: ToJsonDate2($scope.Profiles.EmployeeData.RegisterDate)
                };
                console.log(data);
                $http.post(baseURL + "Authen/PostProfiles", data, config).then(
                    function (response) {
                        try {
                            if (response != undefined && response != "") {
                                if (response.data.responsecode == 200) {

                                    if ($scope.SelectedFiles != undefined && $scope.Upload == 1) {
                                        try {
                                            var input = document.getElementById("product_thumnail");
                                            var files = input.files;
                                            var formData = new FormData();

                                            for (var i = 0; i != files.length; i++) {
                                                formData.append("files", files[i]);
                                            }

                                            $.ajax(
                                                {
                                                    url: baseURL + "Authen/UploadPictureSignature",
                                                    data: formData,
                                                    processData: false,
                                                    contentType: false,
                                                    type: "POST",
                                                    success: function (data) {
                                                        showSuccessToast();
                                                        $scope.Profiles.EmployeeData = response.data.responsedata;
                                                        $scope.OnBinding();
                                                    },
                                                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                                                        showErrorToast(textStatus);
                                                    }
                                                }
                                            );
                                        }
                                        catch (ex) {
                                            showErrorToast(ex);
                                        }
                                    }
                                    else {
                                        showSuccessToast();
                                        $scope.Profiles.EmployeeData = response.data.responsedata;
                                        $scope.OnBinding();
                                    }
                                }
                                else {
                                    $("#loading").fadeOut();
                                    showErrorToast(response.data.errormessage);
                                }
                            }
                        }
                        catch (err) {
                            $scope.table.binding = 0;
                            showErrorToast(err);
                        }
                    });
            }
        }
        catch (err) {
            showWariningToast(err);
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
