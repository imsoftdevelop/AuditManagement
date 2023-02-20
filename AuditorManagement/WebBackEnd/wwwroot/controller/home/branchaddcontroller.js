angular.module('FOCUSAPP').controller('BranchaddController', function ($scope, $http, $state, $timeout, GlobalVar, $q, $localstorage, serviceAuthen, serviceParameter, globalService) {
    var baseURL = $("base")[0].href;//$("base").attr("href");
    var config = GlobalVar.HeaderConfig;

    $scope.Parameter = [];
    $scope.Branch = {};

    $scope.initComponent = function () {
        $('.dropdown2').select2();
    }

    $scope.init = function () {
        try {
            $scope.initComponent();

            $("#loading").fadeIn();
            var qq = $q.all([serviceParameter.getParameterModel('Company')]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                            $scope.Parameter.Model = data[0].data.responsedata;
                            globalService.SetupDropdownDefault($scope.Parameter.Model);
                        }
                        else if (data[0].data.responsecode == '400') { showErrorToast(data[0].data.errormessage); }

                        var type = $scope.Parameter.Model.filter(function (item) { return item.Code == ''; });
                        if (type.length > 0)
                            $scope.Branch.SelectModel = type[0];
                    }
                    $("#loading").fadeOut();
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

    $scope.OnClickConfirm = function () {
        try {
            if ($scope.Branch.SelectModel.Code == '')
                throw "กรุณาเลือกประเภทนิติบุคคล";
            else if ($scope.Branch.Name == undefined || $scope.Branch.Name == '')
                throw "กรุณาระบุชื่อกิจการ";
            else if ($scope.Branch.NameEn == undefined || $scope.Branch.NameEn == '')
                throw "กรุณาระบุชื่อกิจการ (En)";
            else if ($scope.Branch.TaxId == undefined || $scope.Branch.TaxId == '')
                throw "กรุณาระบุเลขเสียภาษี";
            else {
                $("#loading").fadeOut();

                var data = {
                    Name: $scope.Branch.Name,
                    NameEn: $scope.Branch.NameEn,
                    Model: $scope.Branch.SelectModel.Code,
                    TaxId: $scope.Branch.TaxId,
                }
                console.log(data);

                var qq = $q.all([serviceAuthen.postBranch(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                showSuccessText(data[0].data.responsedata);
                                window.location.href = baseURL + "Home/Default";
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
