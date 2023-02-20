angular.module('FOCUSAPP').controller('AdminAllRequestFormController', function ($scope, $http, $timeout, GlobalVar, $q, globalService, serviceBilling) {
    var baseURL = $("base")[0].href;
    var config = GlobalVar.HeaderConfig;

    $scope.TableMain = [];
    $scope.Table = [];
    $scope.Search = {};

    var gRequest = serviceBilling.getRequestFormAll();
    var gConfig = globalService.getConfigSystem();

    $scope.initComponent = function () {
        $('.dropdown2').select2();

        if ($("#input-search-start").length) {
            $('#input-search-start').datepicker({
                enableOnReadonly: true,
                todayHighlight: true,
                autoclose: true,
                format: "dd/mm/yyyy"
            });
        }
        if ($("#input-search-end").length) {
            $('#input-search-end').datepicker({
                enableOnReadonly: true,
                todayHighlight: true,
                autoclose: true,
                format: "dd/mm/yyyy"
            });
        }


    }

    $scope.init = function () {
        try {
            $scope.initComponent();

            $("#loading").fadeIn();
            var qq = $q.all([gRequest, gConfig]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                            $scope.TableMain = data[0].data.responsedata;
                            
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
        $scope.itemsPerPage = "10";
        $scope.Search.SelectStatus = "00";
        //$scope.Search.InputDateStart = GetDatetimeNowAddDay(-30);
        //$scope.Search.InputDateEnd = GetDatetimeNow();

        globalService.SetupSequence($scope.TableMain);
        _.each($scope.TableMain, function (item) {
            item.RequestDate = formatDateFull(item.RequestDate);
            item.ApproveOn = item.ApproveOn != undefined ? formatDateFull(item.ApproveOn) : undefined;
        })
        $scope.Table = $scope.TableMain;
        $scope.retpage = [];
        $scope.range();

        //  $scope.Profiles.EmployeeData.RegisterDate = formatDate($scope.Profiles.EmployeeData.RegisterDate);
        GlobalVar.waitForRenderAndDoSomething();
        //var type = $scope.Parameter.Province.filter(function (item) { return item.Code == $scope.Profiles.ProvinceCode; });
        //if (type.length > 0)
        //    $scope.Profiles.SelectProvince = type[0];

    }

    $scope.OnClickFilter = function () {
        $scope.Table = $scope.TableMain;
        $("#loading").fadeIn();
        if ($scope.Search.SelectStatus == "00")
            $scope.Table = $scope.TableMain;
        else
            $scope.Table = _.where($scope.TableMain, { Status: $scope.Search.SelectStatus });

        $scope.Table = _.filter($scope.Table, function (item) {

            var c1 = true, c2 = true, c3 = true, c4 = true;

            if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "") {
                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.RequestId != undefined && (item.RequestId).indexOf($scope.Search.InputFilter) > -1)
                    c1 = true;
                else if (item.RequestId == undefined || (item.RequestId).indexOf($scope.Search.InputFilter) < 0)
                    c1 = false;

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.Subject != undefined && (item.Subject).indexOf($scope.Search.InputFilter) > -1)
                    c2 = true;
                else if (item.Subject == undefined || (item.Subject).indexOf($scope.Search.InputFilter) < 0)
                    c2 = false;

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.Detail != undefined && (item.Detail).indexOf($scope.Search.InputFilter) > -1)
                    c3 = true;
                else if (item.Detail == undefined || (item.Detail).indexOf($scope.Search.InputFilter) < 0)
                    c3 = false;
            }

            if ($scope.Search.InputDateStart != undefined && $scope.Search.InputDateStart != ""
                && $scope.Search.InputDateEnd != undefined && $scope.Search.InputDateEnd != "") {

                var fromarry = formatDateSameYear(item.RequestDate).split('/');
                var from = new Date(fromarry[0], fromarry[1] - 1, fromarry[2]);

                var startarry = $scope.Search.InputDateStart.split('/');
                var start = new Date(startarry[0], startarry[1] - 1, startarry[2]);

                var endarry = $scope.Search.InputDateEnd.split('/');
                var to = new Date(endarry[0], endarry[1] - 1, endarry[2]);

                if (from >= start && from <= to)
                    c4 = true;
                else
                    c4 = false;
            }

            if ((c1 || c2 || c3) && c4) {
                return item;
            }
        });

        $scope.retpage = [];
        $scope.range();

        $("#loading").fadeOut();
    }

    $scope.OnClickTable = function (val) {
        if (val != undefined) {
            $scope.TableAdd = [];
            $scope.TableAdd = val;
            $('#ModalRequestForm').modal('show');
        }
    }

    $scope.OnClickConfirm = function () {
        try {
            var data = {
                RequestKey: $scope.TableAdd.RequestKey,
                ResponseMessage: $scope.TableAdd.ResponseMessage,
                Status: $scope.TableAdd.Status,
            };
            console.log(data);
            var qq = $q.all([serviceBilling.postChangeStatusRequestForm(data)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            var qq = $q.all([serviceBilling.getRequestFormAll()]).then(function (data) {
                                try {
                                    if (data[0] != undefined && data[0] != "") {
                                        if (data[0].data.responsecode == 200) {
                                            $scope.TableMain = data[0].data.responsedata;
                                            $scope.OnBinding();
                                            showSuccessText('อัพเดทสถานะเรียบร้อย');
                                            $('#ModalConfirm').modal('hide');
                                            $scope.TableAdd = {};
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
                    else
                        showErrorToast(data[0].data.errormessage);

                }
                catch (err) {
                    showErrorToast(response.data.errormessage);
                }
            });
        }
        catch (ex) {
            showErrorToast(ex);
        }
       
    }

    $scope.OnClickChangeStatus = function (values, status) {
        if (values != undefined) {
            $scope.TableAdd = [];
            $scope.TableAdd = angular.copy(values);
            $scope.TableAdd.Status = status;
            $('#ModalConfirm').modal('show');
        }
    }

    $scope.OnClickSave = function (after) {
        try {
            var data = {
                RequestKey: $scope.TableAdd.RequestKey,
                ResponseMessage: $scope.TableAdd.ResponseMessage,
                Status: $scope.TableAdd.Status,
            };
            console.log(data);
            var qq = $q.all([serviceBilling.postChangeStatusRequestForm(data)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            var qq = $q.all([serviceBilling.getRequestFormAll()]).then(function (data) {
                                try {
                                    if (data[0] != undefined && data[0] != "") {
                                        if (data[0].data.responsecode == 200) {
                                            $scope.TableMain = data[0].data.responsedata;
                                            $scope.OnBinding();
                                            showSuccessText('บันทึกรายการเรียบร้อย');
                                            if (after == 'close') {
                                                $('#ModalRequestForm').modal('hide');
                                                $scope.TableAdd = {};
                                            }
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
                    else
                        showErrorToast(data[0].data.errormessage);

                }
                catch (err) {
                    showErrorToast(response.data.errormessage);
                }
            });
        }
        catch (ex) {
            showErrorToast(ex);
        }

    }

    $scope.currentPage = 0;

    $scope.LimitFirst = 0;
    $scope.LimitPage = 5;

    $scope.orderByField = 'Seq';
    $scope.reverseSort = false;

    $scope.OnClickChangePageTotal = function () {
        $scope.retpage = [];
        $scope.range();
    }

    $scope.pageCount = function () {
        return Math.ceil($scope.Table.length / parseInt($scope.itemsPerPage)) - 1;
    };

    $scope.range = function () {
        $scope.itemsCount = $scope.Table.length;
        $scope.pageshow = $scope.pageCount() > $scope.LimitPage && $scope.pageCount() > 0 ? 1 : 0;

        var rangeSize = 50;
        var ret = [];
        var start = 1;

        for (var i = 0; i <= $scope.pageCount(); i++) {
            ret.push({ code: i, name: i + 1, show: i <= rangeSize ? 1 : 0 });
        }
        $scope.pageshowdata = 1;
        $scope.retpage = ret;

        $scope.changePages = $scope.retpage[0];
        if ($scope.retpage != undefined && $scope.retpage.length > 0)
            $scope.currentPage = $scope.retpage[0].code;
    };

    $scope.showallpages = function () {
        if ($scope.pageshowdata == 1) {
            _.each($scope.retpage, function (e) {
                e.show = 1;
            });
            $scope.pageshowdata = 0;
        }
        else {
            _.each($scope.retpage, function (e) {
                if (e.code >= $scope.LimitFirst && e.code <= $scope.LimitPage)
                    e.show = 1;
                else
                    e.show = 0;
            });
            $scope.pageshowdata = 1;
        }
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }

        if ($scope.currentPage < $scope.LimitFirst && $scope.currentPage >= 1) {
            $scope.LimitFirst = $scope.LimitFirst - $scope.LimitPage;
            $scope.LimitPage = $scope.LimitPage - $scope.LimitPage;
            for (var i = 1; i <= $scope.retpage.length; i++) {
                if (i >= $scope.LimitFirst && i <= $scope.LimitPage) {
                    $scope.retpage[i - 1].show = 1;
                }
                else
                    $scope.retpage[i - 1].show = 0;
            }
        }
    };

    $scope.prevPageDisabled = function () {
        return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }

        if ($scope.currentPage >= $scope.LimitPage && $scope.currentPage <= $scope.pageCount()) {
            $scope.LimitFirst = $scope.LimitFirst + $scope.LimitPage;
            $scope.LimitPage = $scope.LimitPage + $scope.LimitPage;
            for (var i = 1; i <= $scope.retpage.length; i++) {
                if (i >= $scope.LimitFirst && i <= $scope.LimitPage) {
                    $scope.retpage[i - 1].show = 1;
                }
                else
                    $scope.retpage[i - 1].show = 0;
            }
        }

    };

    $scope.nextPageDisabled = function () {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };

    $scope.setPage = function (n) {
        $scope.currentPage = $scope.changePages.code;
    };
});
