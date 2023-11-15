angular.module('FOCUSAPP').controller('HourRateController', function ($scope, $http, $timeout, GlobalVar, $q, globalService, serviceParameter, serviceOrganize) {
    var baseURL = $("base")[0].href;
    var config = GlobalVar.HeaderConfig;

    $scope.TableMain = [];
    $scope.Table = [];
    $scope.Search = {};

    var gConfig = globalService.getConfigSystem();

    $scope.initComponent = function () {
        $('.dropdown2').select2();
    }

    $scope.init = function () {
        try {
            $scope.initComponent();

            $("#loading").fadeIn();
            var qq = $q.all([serviceOrganize.getHourRate(), gConfig]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                            $scope.TableAdd = data[0].data.responsedata;
                            if ($scope.TableAdd == undefined)
                                $scope.TableAdd = {};
                        }
                        else if (data[0].data.responsecode == '400') { showErrorToast(data[0].data.errormessage); }
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
        finally {
            $("#loading").fadeOut();
        }
    }

    $scope.OnClickSave = function () {
        try {
            if ($scope.TableAdd.AuditHour == undefined || $scope.TableAdd.AuditHour === '')
                throw "กรุณาระบุอัตราชั่วโมงผู้ตรวจสอบ";
            else if ($scope.TableAdd.PrepareHour == undefined || $scope.TableAdd.PrepareHour === '')
                throw "กรุณาระบุอัตราชั่วโมงผู้ช่วยผู้สอบ Level1";
            else if ($scope.TableAdd.ReviewHour == undefined || $scope.TableAdd.ReviewHour === '')
                throw "กรุณาระบุอัตราชั่วโมงผู้ช่วยผู้สอบ Level2";
            else if ($scope.TableAdd.ManagerHour == undefined || $scope.TableAdd.ManagerHour === '')
                throw "กรุณาระบุอัตราชั่วโมงหัวหน้าผู้ช่วยผู้สอบ";
            else {
                var data = {
                    HourId: $scope.TableAdd.HourId,
                    AuditHour: $scope.TableAdd.AuditHour,
                    PrepareHour: $scope.TableAdd.PrepareHour,
                    ReviewHour: $scope.TableAdd.ReviewHour,
                    ManagerHour: $scope.TableAdd.ManagerHour,
                };
                console.log(data);
                var qq = $q.all([serviceOrganize.postHourRate(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                showSuccessText('บันทึกรายการเรียบร้อย');
                            }
                        }
                        else
                            showErrorToast(data[0].data.errormessage);

                    }
                    catch (err) {
                        showErrorToast(response.data.errormessage);
                    }
                });
            }
        }
        catch (ex) {
            showWariningToast(ex);
        }

    }
});
