﻿angular.module('FOCUSAPP').controller('AuditTaggingcontroller', function ($stateParams, $rootScope, $state, $scope, $http, $timeout, $q, GlobalVar, globalService,
    serviceAccount, serviceParameter) {
    var baseURL = $("base")[0].href;//$("base").attr("href");
    var config = GlobalVar.HeaderConfig;
    $scope.Search = [];
    $scope.Table = [];
    $scope.Parameter = [];
    $scope.TableMain = [];
    $scope.TablePeriod = {};

    $scope.initComponent = function () {
        $('.dropdown2').select2();
        if ($("#inputstartperiod-popup").length) {
            $('#inputstartperiod-popup').datepicker({
                enableOnReadonly: true,
                todayHighlight: true,
                autoclose: true,
                format: "dd/mm/yyyy"
            });
        }

        if ($("#inputendperiod-popup").length) {
            $('#inputendperiod-popup').datepicker({
                enableOnReadonly: true,
                todayHighlight: true,
                autoclose: true,
                format: "dd/mm/yyyy"
            });
        }
    }

    $scope.initModal = function () {
        $scope.initComponent();
        try {
            $("#loading").fadeIn();
            $scope.Error = undefined;
            var qq = $q.all([serviceParameter.getParameterCustomerWithOwner(), globalService.getProfile()]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                            $scope.Parameter.Customer = data[0].data.responsedata;

                            if ($scope.UserProfiles.CustomerIdActive != undefined && $scope.UserProfiles.CustomerIdActive != '') {

                                var type = $scope.Parameter.Customer.filter(function (item) { return item.CustomerId == $scope.UserProfiles.CustomerIdActive; });
                                if (type.length > 0)
                                    $scope.Search.SelectCustomer = type[0];
                                $scope.OnChangeCustomer();
                            }
                            else {
                                $('#ModalCustomer').modal('show');
                                $("#selectcustomer").select2({
                                    dropdownParent: $("#ModalCustomer")
                                });
                            }
                        }
                        else if (data[0].data.responsecode == '400') { showErrorToast(data[0].data.errormessage); }
                    }

                    if (data[1] != undefined && data[1] != "") {
                        if (data[1].data.responsecode == '200' && data[1].data.responsedata != undefined && data[1].data.responsedata != "") {
                            $scope.Parameter.FSGroup = data[1].data.responsedata;
                        }
                        else if (data[1].data.responsecode == '400') { showErrorToast(data[1].data.errormessage); }
                    }
                }
                catch (err) {
                    showErrorToast(err);
                }
            });
        }
        catch (err) {
            showErrorToast(err);
        }
        finally {
            $("#loading").fadeOut();

        }
    }

    $scope.OnClickAddCustomer = function () {
        if ($scope.UserProfiles.PermissionCodeActive == 'ASSIS001' || $scope.UserProfiles.PermissionCodeActive == 'ASSIS002' || $scope.UserProfiles.PermissionCodeActive == 'AUDIT001'
            || $scope.UserProfiles.PermissionCodeActive == 'MAG001')
            $state.go('account-customermanagelist');
        else
            $state.go('office-customerdetailmanage', { ref_action: 'เพิ่มข้อมูล' });

        $('#ModalCustomer').modal('hide');
    }

    $scope.OnChangeCustomer = function () {
        try {
            if ($scope.Search.SelectCustomer == undefined)
                throw "กรุณาเลือกลูกค้า";
            else {
                var qq = $q.all([serviceParameter.getParameterPeriodAccountWithOwnerAndBranchAndCustomer($scope.Search.SelectCustomer.CustomerId, ''), globalService.getProfile()]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                                $scope.Parameter.Period = data[0].data.responsedata;
                                $scope.UserProfiles = data[1].data.responsedata;

                                $scope.TablePeriod = {};
                                $scope.Search.SelectPeriod = undefined;
                                $scope.TablePeriod.UploadBy = '-';
                                $scope.TablePeriod.UploadDate = '-';
                                $scope.TablePeriod.Record = '-';
                                $scope.TablePeriod.Name = '-';
                                $scope.TablePeriod.Year = '-';
                                $scope.TablePeriod.Quater = '-';
                                $scope.TablePeriod.Type = '-';
                                $scope.TablePeriod.Date = '-';
                                $scope.TablePeriod.Mapping = '-';
                                $scope.TablePeriod.Table = [];

                                $('#ModalCustomer').modal('hide');

                                if ($scope.UserProfiles.PeriodIdActive == undefined || $scope.UserProfiles.PeriodIdActive == '') {
                                    $('#ModalPeriod').modal('show');
                                    $("#selecrperiod").select2({
                                        dropdownParent: $("#ModalPeriod")
                                    });
                                }
                                else {
                                    var type = $scope.Parameter.Period.filter(function (item) { return item.PeriodId == $scope.UserProfiles.PeriodIdActive; });
                                    if (type.length > 0)
                                        $scope.Search.SelectPeriod = type[0];
                                    $scope.OnChangePeriod();
                                }

                            }
                            else if (data[0].data.responsecode == '400') { showErrorToast(data[0].data.errormessage); }
                        }
                    }
                    catch (err) {
                        showErrorToast(err);
                    }
                });

            }
        }
        catch (err) {
            $scope.Search.SelectPeriod = undefined
            showWariningToast(err);
        }
        finally {
            $("#loading").fadeOut();
        }
    }

    $scope.OnClickDirectTrial = function () {
        $('#ModalCustomer').modal('hide');
        $('#ModalValidate').modal('hide');
        $state.go('account-trialbalancelist');
    }

    $scope.OnClickAddRedirectPeriod = function () {
        $state.go('account-periodaccountlist');
        $('#ModalPeriod').modal('hide');
    }

    $scope.OnClickNewPeriod = function () {
        $('#ModalValidate').modal('hide');
        $('#ModalPeriod').modal('show');
    }

    $scope.OnClickChangePeriod = function () {
        $('#ModalPeriod').modal('show');
        $("#selecrperiod").select2({
            dropdownParent: $("#ModalPeriod")
        });
    }

    $scope.OnClickModalPeriod = function () {
        try {
            $http.get(baseURL + "Authen/SelectPeriod?ref_key=" + makeid() + '&ref_id=' + $scope.Search.SelectPeriod.PeriodId)
                .then(function (response) {
                    if (response.data.responsecode == '200' && response.data.responsedata != undefined && response.data.responsedata != "") {
                        $scope.UserProfiles = response.data.responsedata; console.log($scope.UserProfiles);
                        $scope.OnChangePeriod();
                        $('#ModalPeriod').modal('hide');
                        $("#loading").fadeOut();
                    }
                });
        }
        catch (err) {
            showErrorToast(err);
        }
    }

    $scope.OnChangePeriod = function () {
        try {
            $scope.Error = undefined;
            if ($scope.Search.SelectPeriod == undefined)
                throw "กรุณาเลือกรอบบัญชี";
            else if ($scope.Search.SelectCustomer != undefined && $scope.Search.SelectPeriod != undefined) {
                $("#loading").fadeIn();
                var qq = $q.all([serviceAccount.getAccountPeriodsWithKey($scope.Search.SelectPeriod.PeriodId), serviceParameter.getParameterFSTop(), serviceParameter.getParameterFSTopParentFSgroup()
                    , serviceParameter.getParameterFSGroupWithOwnerIsActiveForTrialBalance()]).then(function (data) {
                        try {
                            if (data[0] != undefined && data[0] != "") {
                                if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                                    $scope.TablePeriod = data[0].data.responsedata;
                                    $scope.Parameter.FSTopList = data[1].data.responsedata;
                                    $scope.Parameter.FSTopParentList = data[2].data.responsedata;
                                    $scope.Parameter.FSGroupList = data[3].data.responsedata;

                                    if ($scope.TablePeriod.TrialBalance == undefined || $scope.TablePeriod.TrialBalance.length <= 0)
                                        $scope.Error = "กรุณาอัพโหลด Trial Balance ก่อนทำรายการ";
                                    else if ($scope.TablePeriod.TrialBalance != undefined && $scope.TablePeriod.TrialBalance.length > 0) {
                                        console.log($scope.TablePeriod.TrialBalance);
                                        var valid = false;
                                        _.each($scope.TablePeriod.TrialBalance, function (item) {
                                            if (item.FsgroupId == undefined || item.FsgroupId == '') {
                                                valid = true;
                                            }
                                        });
                                        if (valid)
                                            $scope.Error = "กรุณาเลือกรายการ W/P No ใน Trial Balance ให้ครบถ้วน";
                                    }

                                    $('#ModalCustomer').modal('hide');

                                    if ($scope.Error == undefined || $scope.Error == "") {
                                        $scope.TablePeriod.AssignEmpsMain = $scope.TablePeriod.AssignEmps;
                                        $scope.OnClickEmployee($scope.TablePeriod.AssignEmps[0]);
                                        console.log($scope.TablePeriod);
                                    }
                                    else
                                        $('#ModalValidate').modal('show');
                                }
                                else if (data[0].data.responsecode == '400') { showErrorToast(data[0].data.errormessage); }
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
        finally {
            $("#loading").fadeOut();
        }
    }

    $scope.OnClickEmployee = function (val) {
        console.log(val)
        if (val != undefined) {
            $scope.EmployeeSelect = val;

            $scope.EmployeeSelect.Summary = 0;
            $scope.EmployeeSelect.Table = _.filter($scope.TablePeriod.FSGroups, function (item) {
                var fsgroup = _.where(item.Assigns, { EmpId: val.EmpId })[0];
                if (fsgroup != undefined) {
                    var datafsgroup = _.where($scope.Parameter.FSGroupList, { FsgroupId: item.FsgroupId })[0];
                    if (datafsgroup != undefined) {
                        fsgroup.Code = datafsgroup.Code;
                        fsgroup.Name = datafsgroup.Name;

                        item.Percent = 0;
                        if (item.PrepareStatus == 'Confirm')
                            item.Percent += 25;
                        if (item.ReveiwedStatus == 'Confirm')
                            item.Percent += 25;
                        if (item.AuditorStatus == 'Confirm')
                            item.Percent += 50;
                    }

                    $scope.EmployeeSelect.Summary += item.Percent;
                    return item;
                }
            });
            $scope.EmployeeSelect.Summary = $scope.EmployeeSelect.Table != undefined && $scope.EmployeeSelect.Table.length > 0 ? $scope.EmployeeSelect.Summary / $scope.EmployeeSelect.Table.length : 0;

            $scope.itemsPerPage = "10";
            globalService.SetupSequence($scope.EmployeeSelect.Table);
            $scope.retpage = [];
            $scope.range();
        }
    }

    $scope.OnClickViewAssign = function (val) {
        try {
            $scope.TableAddAssign = {};
            $scope.TableAddAssign = val.Assigns;
            globalService.SetupSequence($scope.TableAddAssign);
            $scope.TableAddAssignMain = $scope.TableAddAssign;
            $scope.itemsPerPage_3 = "10";
            $scope.retpage_3 = [];
            $scope.range_3();
            $('#ModalEmployee').modal('show');
        }
        catch (err) { showErrorToast(err); } finally { $("#loading").fadeOut(); }
    }

    $scope.OnClickFilter = function () {
        $scope.TablePeriod.AssignEmps = $scope.TablePeriod.AssignEmpsMain;

        $scope.TablePeriod.AssignEmps = _.filter($scope.TablePeriod.AssignEmps, function (item) {

            var c1 = true, c2 = true, c3 = true, c4 = true, c5 = true, c6 = true;

            if (($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "")) {

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.FullName != undefined && (item.FullName).indexOf($scope.Search.InputFilter) > -1)
                    c1 = true;
                else if (item.FullName == undefined || (item.FullName).indexOf($scope.Search.InputFilter) < 0)
                    c1 = false;

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.EmpCode != undefined && (item.EmpCode).indexOf($scope.Search.InputFilter) > -1)
                    c2 = true;
                else if (item.EmpCode == undefined || (item.EmpCode).indexOf($scope.Search.InputFilter) < 0)
                    c2 = false;

            }

            if (c1 || c2) {
                return item;
            }
        });
    }

    $scope.OnClickFilterEmployees = function () {
        $scope.TableAddAssign = $scope.TableAddAssignMain;

        $("#loading").fadeIn();

        $scope.TableAddAssign = _.filter($scope.TableAddAssign, function (item) {

            var c1 = true, c2 = true, c3 = true, c4 = true, c5 = true, c6 = true;

            if (($scope.Search.InputFilterEmployees != undefined && $scope.Search.InputFilterEmployees != "")) {

                if ($scope.Search.InputFilterEmployees != undefined && $scope.Search.InputFilterEmployees != "" && item.EmployeeData.FullName != undefined && (item.EmployeeData.FullName).indexOf($scope.Search.InputFilterEmployees) > -1)
                    c1 = true;
                else if (item.EmployeeData.FullName == undefined || (item.EmployeeData.FullName).indexOf($scope.Search.InputFilterEmployees) < 0)
                    c1 = false;

                if ($scope.Search.InputFilterEmployees != undefined && $scope.Search.InputFilterEmployees != "" && item.EmployeeData.EmpCode != undefined && (item.EmployeeData.EmpCode).indexOf($scope.Search.InputFilterEmployees) > -1)
                    c2 = true;
                else if (item.EmployeeData.EmpCode == undefined || (item.EmployeeData.EmpCode).indexOf($scope.Search.InputFilterEmployees) < 0)
                    c2 = false;

            }

            if (c1 || c2) {
                return item;
            }
        });

        $scope.retpage_3 = [];
        $scope.range_3();

        $("#loading").fadeOut();
    }

    $scope.OnClickAuditFSGroup = function (val) {
        $state.go('account-fsleadlist', { ref_id: val });
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
        return $scope.EmployeeSelect != undefined && $scope.EmployeeSelect.Table != undefined ? Math.ceil($scope.EmployeeSelect.Table.length / parseInt($scope.itemsPerPage)) - 1 : 0;
    };

    $scope.range = function () {
        $scope.itemsCount = $scope.EmployeeSelect != undefined && $scope.EmployeeSelect.Table != undefined ? $scope.EmployeeSelect.Table.length : 0;
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

    // #3

    $scope.currentPage_3 = 0;

    $scope.OnClickChangePageTotal_3 = function () {
        $scope.retpage_3 = [];
        $scope.range_3();
    }

    $scope.pageCount_3 = function () {
        return Math.ceil($scope.TableAddAssign == undefined ? 0 : $scope.TableAddAssign.length / parseInt($scope.itemsPerPage_3)) - 1;
    };

    $scope.range_3 = function () {

        $scope.itemsCount_3 = $scope.TableAddAssign == undefined ? 0 : $scope.TableAddAssign.length;

        $scope.pageshow_3 = $scope.pageCount_3() > $scope.LimitPage && $scope.pageCount_3() > 0 ? 1 : 0;

        var rangeSize = 50;
        var ret_3 = [];
        var start = 1;

        for (var i = 0; i <= $scope.pageCount_3(); i++) {
            ret_3.push({ code: i, name: i + 1, show: i <= rangeSize ? 1 : 0 });
        }
        $scope.pageshowdata_3 = 1;
        $scope.retpage_3 = ret_3;

        $scope.changePages_3 = $scope.retpage_3[0];
        if ($scope.retpage_3 != undefined && $scope.retpage_3.length > 0)
            $scope.currentPage_3 = $scope.retpage_3[0].code;
    };

    $scope.showallpages_3 = function () {
        if ($scope.pageshowdata_3 == 1) {
            _.each($scope.retpage_3, function (e) {
                e.show = 1;
            });
            $scope.pageshowdata_3 = 0;
        }
        else {
            _.each($scope.retpage_3, function (e) {
                if (e.code >= $scope.LimitFirst && e.code <= $scope.LimitPage)
                    e.show = 1;
                else
                    e.show = 0;
            });
            $scope.pageshowdata_3 = 1;
        }
    };

    $scope.prevPage_3 = function () {
        if ($scope.currentPage_3 > 0) {
            $scope.currentPage_3--;

            var type = $scope.retpage_3.filter(function (item) { return item.code == $scope.currentPage_3; });
            if (type.length > 0) {
                $scope.currentPage_3 = type[0];
            }
        }

        if ($scope.currentPage_3 < $scope.LimitFirst && $scope.currentPage_3 >= 1) {
            $scope.LimitFirst = $scope.LimitFirst - $scope.LimitPage;
            $scope.LimitPage = $scope.LimitPage - $scope.LimitPage;
            for (var i = 1; i <= $scope.retpage_3.length; i++) {
                if (i >= $scope.LimitFirst && i <= $scope.LimitPage) {
                    $scope.retpage_3[i - 1].show = 1;
                }
                else
                    $scope.retpage_3[i - 1].show = 0;
            }
        }
    };

    $scope.prevPageDisabled_3 = function () {
        return $scope.currentPage_3 === 0 ? "disabled" : "";
    };

    $scope.nextPage_3 = function () {
        if ($scope.currentPage_3 < $scope.pageCount_3()) {
            $scope.currentPage_3++;

            var type = $scope.retpage_3.filter(function (item) { return item.code == $scope.currentPage_3; });
            if (type.length > 0) {
                $scope.currentPage_3 = type[0];
            }
        }

        if ($scope.currentPage_3 >= $scope.LimitPage && $scope.currentPage_3 <= $scope.pageCount_3()) {
            $scope.LimitFirst = $scope.LimitFirst + $scope.LimitPage;
            $scope.LimitPage = $scope.LimitPage + $scope.LimitPage;
            for (var i = 1; i <= $scope.retpage_3.length; i++) {
                if (i >= $scope.LimitFirst && i <= $scope.LimitPage) {
                    $scope.retpage_3[i - 1].show = 1;
                }
                else
                    $scope.retpage_3[i - 1].show = 0;
            }
        }

    };

    $scope.nextPageDisabled_3 = function () {
        return $scope.currentPage_3 === $scope.pageCount_3() ? "disabled" : "";
    };

    $scope.setPage_3 = function (n) {
        $scope.currentPage_3 = $scope.changePages_3.code;
    };

});