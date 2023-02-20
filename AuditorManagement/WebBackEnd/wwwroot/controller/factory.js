FOCUSAPP.factory('GlobalVar', ['$http', function ($http) {
    var GlobalVar = {};
    var baseURL = $("base")[0].href;
    GlobalVar.HeaderConfig = { headers: { "Content-Type": "application/json; charset=utf-8", "dataType": "json" } };
    GlobalVar.HttpPathImages = baseURL;
    GlobalVar.HttpUploadImages = baseURL + 'images/icon/upload-image.png';
    GlobalVar.ProjectSystem = '00000000-0000-0000-0000-000000000000';
    GlobalVar.HttpDocumentThaiHealty = 'http://172.17.9.82/InsuranceDownload/ThaiHealth/';

    GlobalVar.waitForRenderAndDoSomething = function () {
        if ($http != undefined && $http.pendingRequests != undefined && $http.pendingRequests.length > 0) {
            setTimeout(function () { GlobalVar.waitForRenderAndDoSomething(); }, 500);
        } else {
            setTimeout(function () { $("#loading").fadeOut(); }, 500);
        }
    }
    return GlobalVar;
}]);

FOCUSAPP.directive("decimalOnly", function () {
    return {
        restrict: 'A',
        require: "ngModel",
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) return;

            ngModelCtrl.$formatters.unshift(function (a) {
                return AFormatNumber(ngModelCtrl.$modelValue, 2);
            });

            element.on('keydown', function (event) {
                if (event.which == 64 || event.which == 16)
                    return false;
                if ([8, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1)
                    return true;
                else if (event.which >= 48 && event.which <= 57 && ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(event.key) > -1)
                    return true;
                else if (event.which >= 96 && event.which <= 105)
                    return true;
                else if (event.which == 109)
                    return true;
                else if (event.which == 9)
                    return true;
                else if ([46, 110, 190].indexOf(event.which) > -1)
                    return true;
                else {
                    event.preventDefault();
                    return false;
                }
            }).on('blur', function (event) {
                
                var myval = element.val();
                
                myval = AFormatNumber(myval, 2);

                element.val(myval); scope.$apply();


            });
        }
    };
});

//$localstorage.setObject('cart_value', $scope.CartList);
//var cartlist = $localstorage.getObject('cart_value');
FOCUSAPP.factory('$localstorage', ['$window', function ($window) {
    return {
        set: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue || false;
        },
        setObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key, defaultValue) {
            if ($window.localStorage[key] != undefined) {
                return JSON.parse($window.localStorage[key]);
            } else {
                return defaultValue || false;
            }
        },
        remove: function (key) {
            $window.localStorage.removeItem(key);
        },
        clear: function () {
            $window.localStorage.clear();
        }
    }
}]);