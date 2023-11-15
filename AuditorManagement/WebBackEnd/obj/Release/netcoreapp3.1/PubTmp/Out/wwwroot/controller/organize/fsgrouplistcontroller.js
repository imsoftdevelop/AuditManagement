angular.module('FOCUSAPP').controller('FsgroupListController', function ($stateParams, $rootScope, $state, $scope, $http, $timeout, $q, GlobalVar, globalService,
    serviceOrganize, serviceParameter) {
    var baseURL = $("base")[0].href;//$("base").attr("href");
    var config = GlobalVar.HeaderConfig;
    $scope.Search = [];
    $scope.Table = [];
    $scope.Parameter = [];
    $scope.TableMain = [];

    $scope.initComponent = function () {
        $('.dropdown2').select2();
        if ($("#inputreceivechaque-popup").length) {
            $('#inputreceivechaque-popup').datepicker({
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
            var qq = $q.all([serviceOrganize.getFSGroup()]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                            $scope.TableMain = data[0].data.responsedata;

                        }
                        else if (data[0].data.responsecode == '400') { showErrorToast(data[0].data.errormessage); }

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
        $scope.Search.SelectStatus = "All";
        globalService.SetupSequence($scope.TableMain);
        //_.each($scope.TableMain, function (item) { item.CreatedOn = formatDateFull(item.CreatedOn); item.UpdatedOn = formatDateFull(item.UpdatedOn); })
        $scope.Table = $scope.TableMain;
        $scope.retpage = [];
        $scope.range();
        GlobalVar.waitForRenderAndDoSomething();
    }

    $scope.OnClickFilter = function () {
        $scope.Table = $scope.TableMain;
        $("#loading").fadeIn();
        if ($scope.Search.SelectStatus == "All")
            $scope.Table = $scope.TableMain;
        else
            $scope.Table = _.where($scope.TableMain, { IsActive: $scope.Search.SelectStatus });

        if ($scope.Search.SelectInterface == "All")
            $scope.Table = $scope.Table;
        else
            $scope.Table = _.where($scope.Table, { IsInterface: $scope.Search.SelectInterface });

        $scope.Table = _.filter($scope.Table, function (item) {

            var c1 = true, c2 = true, c3 = true, c4 = true, c5 = true;

            if (($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "")) {

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.Code != undefined && (item.Code).indexOf($scope.Search.InputFilter) > -1)
                    c1 = true;
                else if (item.Code == undefined || (item.Code).indexOf($scope.Search.InputFilter) < 0)
                    c1 = false;

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.Name != undefined && (item.Name).indexOf($scope.Search.InputFilter) > -1)
                    c2 = true;
                else if (item.Name == undefined || (item.Name).indexOf($scope.Search.InputFilter) < 0)
                    c2 = false;

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.Interface != undefined && item.Interface.Code != undefined && (item.Interface.Code).indexOf($scope.Search.InputFilter) > -1)
                    c3 = true;
                else if (item.Interface == undefined ||item.Interface.Code == undefined || (item.Interface.Code).indexOf($scope.Search.InputFilter) < 0)
                    c3 = false;

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.Interface != undefined  && item.Interface.Name != undefined && (item.Interface.Name).indexOf($scope.Search.InputFilter) > -1)
                    c4 = true;
                else if (item.Interface == undefined  || item.Interface.Name == undefined || (item.Interface.Name).indexOf($scope.Search.InputFilter) < 0)
                    c4 = false;
            }

            if (c1 || c2 || c3|| c4) {
                return item;
            }
        });

        $scope.retpage = [];
        $scope.range();

        $("#loading").fadeOut();
    }

    $scope.OnClickTable = function (val) {
        if (val != undefined) {
            $scope.TableAdd = {};
            $scope.TableAdd = angular.copy(val);
            $scope.TableAdd.Action = 'แก้ไข';
            $scope.TableAdd.IsActive = $scope.TableAdd.IsActive == 'Yes' ? true : false;
            $scope.TableAdd.IsInterface = $scope.TableAdd.IsInterface == 'Yes' ? true : false;
            $('#ModalFSGroup').modal('show');
        }
    }

    $scope.OnClickConfirm = function () {
        try {
            var qq = $q.all([serviceOrganize.deleteFSGroup($scope.TableAdd.FsgroupId)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            var qq = $q.all([serviceOrganize.getFSGroup()]).then(function (data) {
                                try {
                                    if (data[0] != undefined && data[0] != "") {
                                        if (data[0].data.responsecode == 200) {
                                            $scope.TableMain = data[0].data.responsedata;
                                            $scope.OnBinding();
                                            showSuccessText('ลบรายการเรียบร้อย');
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

    $scope.OnClickDelete = function (values) {
        if (values != undefined) {
            $scope.TableAdd = [];
            $scope.TableAdd = angular.copy(values);
            $('#ModalConfirm').modal('show');
        }
    }

    $scope.OnClickAdd = function () {
        $scope.TableAdd = {};
        $scope.TableAdd.Action = 'เพิ่ม';
        $scope.TableAdd.IsActive = true;
        $('#ModalFSGroup').modal('show');
    }

    $scope.OnClickSave = function (after) {
        try {
            if ($scope.TableAdd.Code == undefined || $scope.TableAdd.Code == '')
                throw "กรุณาระบุรหัส";
            else if ($scope.TableAdd.Name == undefined || $scope.TableAdd.Name == '')
                throw "กรุณาระบุชื่อ";
            else if ($scope.TableAdd.NameEn == undefined || $scope.TableAdd.NameEn == '')
                throw "กรุณาระบุชื่อ (En)";
            else {
                var data = {
                    FsgroupId: $scope.TableAdd.FsgroupId,
                    Code: $scope.TableAdd.Code,
                    Name: $scope.TableAdd.Name,
                    NameEn: $scope.TableAdd.NameEn,
                    IsActive: $scope.TableAdd.IsActive ? 'Yes' : 'No',
                    IsSystem: $scope.TableAdd.IsSystem
                };

                if ($scope.TableAdd.IsSystem == 'Yes') {
                    data.Interface = {};
                    data.Interface.FsgroupId = $scope.TableAdd.FsgroupId;
                    data.Interface.Code = $scope.TableAdd.Interface.Code;
                    data.Interface.Name = $scope.TableAdd.Interface.Name;
                    data.Interface.NameEn = $scope.TableAdd.Interface.NameEn;
                    data.Interface.IsActive = $scope.TableAdd.IsInterface ? 'Yes' : 'No';
                }

                console.log(data);
                var qq = $q.all([serviceOrganize.postFSGroup(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                var qq = $q.all([serviceOrganize.getFSGroup()]).then(function (data) {
                                    try {
                                        if (data[0] != undefined && data[0] != "") {
                                            if (data[0].data.responsecode == 200) {
                                                $scope.TableMain = data[0].data.responsedata;
                                                $scope.OnBinding();
                                                showSuccessText('บันทึกรายการเรียบร้อย');
                                                if (after == 'close') {
                                                    $('#ModalFSGroup').modal('hide');
                                                    $scope.TableAdd = {};
                                                } else if (after == 'new') {
                                                    $scope.OnClickAdd();
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
        }
        catch (ex) {
            showWariningToast(ex);
        }

    }

    $scope.currentPage = 0;

    $scope.LimitFirst = 0;
    $scope.LimitPage = 5;

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
            var type = $scope.retpage.filter(function (item) { return item.code == $scope.currentPage; });
            if (type.length > 0) {
                $scope.changePages = type[0];
            }
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
            var type = $scope.retpage.filter(function (item) { return item.code == $scope.currentPage; });
            if (type.length > 0) {
                $scope.changePages = type[0];
            }
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