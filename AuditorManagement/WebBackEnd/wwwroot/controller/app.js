var FOCUSAPP = angular.module('FOCUSAPP', ['ngFileUpload', 'ui.router', 'service.route', 'oc.lazyLoad', 'ngAnimate']);

angular.module('FOCUSAPP').controller('FOCUSAPPController', function ($rootScope, $scope, $http, $timeout, GlobalVar) {
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
           
            $http.get(baseURL + "Home/GetProfilesPages?ref_key=" + makeid())
                .then(function (response) {
                    if (response.data.responsecode == '200' && response.data.responsedata != undefined && response.data.responsedata != "") {
                        $scope.UserProfiles = response.data.responsedata;
                    }
                });
        }
        catch (err) {
            showErrorToast(err);
        }
    }
});

angular.module('FOCUSAPP').controller('authencontroller', function ($scope, $http, $timeout, GlobalVar) {
    var baseURL = $("base")[0].href;//$("base").attr("href");
    var config = GlobalVar.HeaderConfig;
    $scope.User = {};

    $scope.init = function () {
        $scope.User = {};
    };

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

    $scope.OnClickLogin = function () {
        try {
            if ($scope.User.Username == undefined || $scope.User.Username == "")
                throw "กรุณากรอก User Name.";
            else if ($scope.User.Password == undefined || $scope.User.Password == "")
                throw "กรุณากรอก Password";
            else {
                jQuery("#loading").delay().fadeIn("");
                var data = {
                    Username: $scope.User.Username,
                    Password: $scope.User.Password
                };

                $http.post(baseURL + "Home/Login", data, config).then(
                    function (response) {
                        try {
                            if (response != undefined && response != "") {
                                if (response.data.responsecode == 200) {
                                    window.location.href = baseURL + "Home/Index";
                                }
                                else {
                                    jQuery("#loading").delay().fadeOut("");
                                    showErrorToast(response.data.errormessage);
                                }
                            }
                        }
                        catch (err) {
                            jQuery("#loading").delay().fadeOut("");
                            showErrorToast(err);
                        }
                    });
            }
        }
        catch (err) {
            showWariningToast(err);
            jQuery("#loading").delay().fadeOut("");
        }
    };

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
        return input.slice(start);
    };
});

FOCUSAPP.filter('minLength', function () {
    return function (input, len, pad) {
        input = input.toString();
        if (input.length >= len) return input;
        else {
            pad = (pad || 0).toString();
            return new Array(1 + len - input.length).join(pad) + input;
        }
    };
});