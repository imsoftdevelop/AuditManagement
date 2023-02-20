var FOCUSAPP = angular.module('FOCUSAPP', ['ngFileUpload', 'ui.router', 'owner.route', 'oc.lazyLoad', 'ngAnimate', 'admin.route', 'office.router', 'account.router', 'audit.router','manager.router']);

angular.module('FOCUSAPP').controller('FOCUSAPPController', function ($rootScope, $scope, $http, $timeout, $state, GlobalVar) {
    var baseURL = $("base")[0].href;//$("base").attr("href");
    var config = GlobalVar.HeaderConfig;

    $scope.OnClickMenu = function (val) {
        if ($scope.Menu == val)
            $scope.Menu = undefined;
        else
            $scope.Menu = val;
    }

    $scope.init = function () {
        try {
            $http.get(baseURL + "Authen/GetProfiles?ref_key=" + makeid())
                .then(function (response) {
                    if (response.data.responsecode == '200' && response.data.responsedata != undefined && response.data.responsedata != "") {

                        $scope.UserProfiles = response.data.responsedata; console.log($scope.UserProfiles);
                        $scope.UserProfiles.EmployeeData.FullName = $scope.UserProfiles.EmployeeData.FirstNameEn + '.' +
                            ($scope.UserProfiles.EmployeeData.LastNameEn != undefined && $scope.UserProfiles.EmployeeData.LastNameEn != '' && $scope.UserProfiles.EmployeeData.LastNameEn != null ?
                                $scope.UserProfiles.EmployeeData.LastNameEn.substring(0, 1,) : '');

                        $scope.UserProfiles.BranchDataMain = angular.copy($scope.UserProfiles.BranchData);
                        $scope.UserProfiles.CustomerDataMain = angular.copy($scope.UserProfiles.CustomerData);

                        $scope.BranchTotal = true;
                        $scope.itemperBranch = 5;
                        $scope.MainSearch = {};

                        $scope.CustomerTotal = true;
                        $scope.itemperCustomer = 5;
                    }
                });
        }
        catch (err) {
            showErrorToast(err);
        }
    }

    $scope.OnClickBranchMore = function () { $scope.BranchTotal = false; $scope.itemperBranch = 5; }
    $scope.OnClickCustomerMore = function () { $scope.CustomerTotal = false; $scope.itemperCustomer = 5; }

    $scope.OnClickSearchBranch = function () {
        $scope.UserProfiles.BranchData = $scope.UserProfiles.BranchDataMain;
        $scope.UserProfiles.BranchData = _.filter($scope.UserProfiles.BranchData, function (item) {

            var c1 = true;
            if ($scope.MainSearch.BranchName != undefined && $scope.MainSearch.BranchName != "") {
                if ($scope.MainSearch.BranchName != undefined && $scope.MainSearch.BranchName != "" && item.Name != undefined && (item.Name).indexOf($scope.MainSearch.BranchName) > -1)
                    c1 = true;
                else if (item.Name == undefined || (item.Name).indexOf($scope.MainSearch.BranchName) < 0)
                    c1 = false;
            }

            if (c1) {
                return item;
            }
        });
    }

    $scope.OnClickChangeBranch = function (val) {
        try {
            if (val != $scope.UserProfiles.BranchIdActive) {
                $("#loading").fadeIn();
                $http.get(baseURL + "Authen/SelectBranch?ref_key=" + makeid() + '&ref_id=' + val)
                    .then(function (response) {
                        if (response.data.responsecode == '200' && response.data.responsedata != undefined && response.data.responsedata != "") {
                            $scope.UserProfiles = response.data.responsedata; console.log($scope.UserProfiles);
                            $state.go('office-index');
                            $("#loading").fadeOut();
                        }
                    });
            }
        }
        catch (err) {
            showErrorToast(err);
        }
    }

    $scope.OnClickSearchCustomer = function () {
        $scope.UserProfiles.CustomerData = $scope.UserProfiles.CustomerDataMain;
        $scope.UserProfiles.CustomerData = _.filter($scope.UserProfiles.CustomerData, function (item) {

            var c1 = true;
            if ($scope.MainSearch.CustomerName != undefined && $scope.MainSearch.CustomerName != "") {
                if ($scope.MainSearch.CustomerName != undefined && $scope.MainSearch.CustomerName != "" && item.Name != undefined && (item.Name).indexOf($scope.MainSearch.CustomerName) > -1)
                    c1 = true;
                else if (item.Name == undefined || (item.Name).indexOf($scope.MainSearch.CustomerName) < 0)
                    c1 = false;
            }

            if (c1) {
                return item;
            }
        });
    }

    $scope.OnClickChangeCustomer = function (val) {
        try {
            if (val != $scope.UserProfiles.CustomerIdActive) {
                $("#loading").fadeIn();
                $http.get(baseURL + "Authen/SelectCustomer?ref_key=" + makeid() + '&ref_id=' + val)
                    .then(function (response) {
                        if (response.data.responsecode == '200' && response.data.responsedata != undefined && response.data.responsedata != "") {
                            $scope.UserProfiles = response.data.responsedata; console.log($scope.UserProfiles);
                            $state.go('office-index');
                            $("#loading").fadeOut();
                        }
                    });
            }
        }
        catch (err) {
            showErrorToast(err);
        }
    }

    $scope.OnClickLogout = function () {
        window.location.href = baseURL + "Home/Loginindex";
    }

    $scope.OnClickCustomerDetail = function () {
        $state.go('office-customerdetailmanage', { ref_id: $scope.UserProfiles.CustomerIdActive, ref_action: 'แก้ไขข้อมูล' });
    }
});

angular.module('FOCUSAPP').controller('SUPERADMINAPPController', function ($rootScope, $scope, $http, $timeout, GlobalVar) {
    var baseURL = $("base")[0].href;//$("base").attr("href");
    var config = GlobalVar.HeaderConfig;

    $scope.OnClickMenu = function (val) {
        if ($scope.Menu == val)
            $scope.Menu = undefined;
        else
            $scope.Menu = val;
    }

    $scope.init = function () {
        try {
            $http.get(baseURL + "Authen/GetProfiles?ref_key=" + makeid())
                .then(function (response) {
                    if (response.data.responsecode == '200' && response.data.responsedata != undefined && response.data.responsedata != "") {

                        $scope.UserProfiles = response.data.responsedata;
                        $scope.UserProfiles.EmployeeData.FullName = $scope.UserProfiles.EmployeeData.FirstNameEn + '.' + $scope.UserProfiles.EmployeeData.LastNameEn.substring(0, 1,);
                    }
                });
        }
        catch (err) {
            showErrorToast(err);
        }
    }

    $scope.OnClickLogout = function () {
        window.location.href = baseURL + "Home/Loginindex";
    }
});

FOCUSAPP.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
FOCUSAPP.config(['$controllerProvider', function ($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();

}]);

FOCUSAPP.config(($provide, $controllerProvider) => {
    $provide.value('$controllerProvider', $controllerProvider);
});

FOCUSAPP.directive("select2", function ($timeout, $parse) {
    return {
        restrict: 'AC',
        require: 'ngModel',
        link: function (scope, element, attrs) {
            $timeout(function () {
                element.select2({ width: '100%', priority: 1 });
                element.select2Initialized = true;
            });
            var refreshSelect = function () {
                if (!element.select2Initialized) return;
                $timeout(function () {
                    element.trigger('change');
                });
            };

            scope.$watch(attrs.ngModel, refreshSelect);
        }
    };
});



FOCUSAPP.directive("numberOnly", function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

FOCUSAPP.directive('ngConfirmClick', [
    function () {
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click', function (event) {
                    if (window.confirm(msg)) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }])

FOCUSAPP.filter('offset', function () {
    return function (input, start) {
        start = parseInt(start, 10);
        return start != undefined && input != undefined ?    input.slice(start) : undefined;
    };
});


FOCUSAPP.filter('minLength', function () {
    return function (input, len, pad) {
        if (input != undefined) {
            input = input.toString();
            if (input.length >= len) return input;
            else {
                pad = (pad || 0).toString();
                return new Array(1 + len - input.length).join(pad) + input;
            }
        }
    };
});