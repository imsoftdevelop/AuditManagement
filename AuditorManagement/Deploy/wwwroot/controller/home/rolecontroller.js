angular.module('FOCUSAPP').controller('Rolecontroller', function ($scope, $http, $timeout, GlobalVar, $q, globalService) {
    var baseURL = $("base")[0].href;//$("base").attr("href");
    var config = GlobalVar.HeaderConfig;

    $scope.Profiles = {};

    var gProfile = globalService.getProfile();

    $scope.init = function () {
        try {
            var qq = $q.all([gProfile]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                            $scope.Profiles = data[0].data.responsedata;
                            $scope.Profiles.PermissionData = globalService.SetupSequence($scope.Profiles.PermissionData);
                            console.log($scope.Profiles);
                            $("#loading").fadeOut();
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
            showErrorToast(err);
            $("#loading").fadeOut();
        }

    }

    $scope.OnClickRole = function (val) {
        try {
            $("#loading").fadeIn();

            $http.get(baseURL + "Authen/SelectPermission?ref_key=" + makeid() + '&Permission=' + val)
                .then(function (response) {
                    if (response.data.responsecode == '200' && response.data.responsedata != undefined && response.data.responsedata != "") {
                        window.location.href = baseURL + "Home/Default";
                    }
                    else
                        $("#loading").fadeOut();
                });
        }
        catch (err) {
            showWariningToast(err);
        }
    }
});
