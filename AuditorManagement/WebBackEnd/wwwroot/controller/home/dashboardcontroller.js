angular.module('FOCUSAPP').controller('DashBoardController', function ($rootScope, $state, $scope, $http, $timeout, GlobalVar) {
    var baseURL = $("base")[0].href;//$("base").attr("href");
    var config = GlobalVar.HeaderConfig;
    $scope.Search = [];
    $scope.TableSummary = [];
    $scope.TableProfiles = [];
    $scope.TableProduct = [];
    $scope.TableBranch = [];
    $scope.TableTop = [];
    $scope.TableMonth = [];
    $scope.currentPage = 0;
    $scope.itemsPerPage = 5;

    $scope.OnClickAlert  = function()
    {
        alert('hello iframe');
    }

  

    $scope.init = function () {
        try {
            $("#loading").fadeIn();
            $("#loading").fadeOut();
        }
        catch (err) {
            showErrorToast(err);
        }
    }



});