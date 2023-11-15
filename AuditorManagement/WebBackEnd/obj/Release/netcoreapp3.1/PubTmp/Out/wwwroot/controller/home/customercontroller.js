angular.module('FOCUSAPP').controller('CustomerController', function ($scope, $http, $timeout, GlobalVar, $q, globalService, serviceParameter, serviceAccount) {
    var baseURL = $("base")[0].href;//$("base").attr("href");
    var config = GlobalVar.HeaderConfig;

    $scope.Profiles = {};
    $scope.Parameter = [];
    $scope.Search = [];

    var gProfile = globalService.getProfile();

    $scope.init = function () {
        try {
            $("#loading").fadeIn();
            var qq = $q.all([serviceParameter.getParameterCustomerWithOwner()]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {

                            $scope.Parameter.CustomerMain = data[0].data.responsedata;
                            $scope.Parameter.Customer = $scope.Parameter.CustomerMain;

                            if ($scope.Parameter.Customer != undefined && $scope.Parameter.Customer.length > 0) {
                                _.each($scope.Parameter.Customer, function (item) {
                                    item.NameSplit = item.NameEn != undefined ? item.NameEn.substring(0, 1) : item.Name.substring(0, 1);
                                });
                                

                                console.log($scope.Parameter.Customer);
                                $scope.CustomerSelect = $scope.Parameter.Customer[0];
                                $scope.OnClickSelectCustomer($scope.CustomerSelect);
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
        catch (err) {
            showErrorToast(err);
        }
        finally {
            $("#loading").fadeOut();
        }
    }

    $scope.OnClickSelectCustomer = function (val) {
        if (val != undefined) {
            $scope.CustomerSelect = {};
            $scope.CustomerSelect = val;
            try {

                $scope.CustomerSelect.NameSplit = $scope.CustomerSelect.NameEn != undefined ? $scope.CustomerSelect.NameEn.substring(0, 1) : $scope.CustomerSelect.Name.substring(0,1);

                var qq = $q.all([serviceParameter.getParameterPeriodAccountWithOwnerAndBranchAndCustomer($scope.CustomerSelect.CustomerId, ''), globalService.getProfile()]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                                $scope.Parameter.Period = data[0].data.responsedata;
                                $scope.UserProfiles = data[1].data.responsedata;

                                $scope.TablePeriod = {};
                                $scope.SelectPeriod = undefined;
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

                                if ($scope.Parameter.Period != undefined && $scope.Parameter.Period.length > 0) {
                                    var type = $scope.Parameter.Period.filter(function (item) { return item.PeriodId == $scope.Parameter.Period[0].PeriodId; });
                                    if (type.length > 0)
                                        $scope.SelectPeriod = type[0];
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
            catch (err) {
                $scope.Search.SelectPeriod = undefined
                showWariningToast(err);
            }
            finally {
                $("#loading").fadeOut();
            }
        }
    }

    $scope.OnClickCustomer = function (val) {
        try {
            $("#loading").fadeIn();

            $http.get(baseURL + "Authen/SelectCustomer?ref_key=" + makeid() + '&ref_id=' + val)
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

    $scope.OnChangePeriod = function () {
        try {
            $scope.Error = undefined;
            if ($scope.SelectPeriod != undefined) {
                $("#loading").fadeIn();
                var qq = $q.all([serviceAccount.getAccountPeriodsWithKey($scope.SelectPeriod.PeriodId), serviceParameter.getParameterFSGroupWithOwnerIsActiveForTrialBalance()]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                                $scope.TablePeriod = data[0].data.responsedata;
                                $scope.FSGroupList = data[1].data.responsedata;

                                $scope.TablePeriod.Type = $scope.TablePeriod.PeriodType == 'Year' ? 'ปี' : 'ไตรมาส';
                                $scope.TablePeriod.Quater = $scope.TablePeriod.PeriodType == 'Year' ? '-' : $scope.TablePeriod.Quater;
                                $scope.TablePeriod.Date = formatDate($scope.TablePeriod.StartDate) + ' - ' + formatDate($scope.TablePeriod.EndDate);
                                $scope.TablePeriod.Mapping = $scope.TablePeriod.IsMapPeriod == 'Y' ? 'เปรียบเทียบข้อมูล' : 'ไม่เปรียบเทียบข้อมูล';
                                $scope.TablePeriod.MappingYear = $scope.TablePeriod.IsMapPeriod == 'Y' ? $scope.TablePeriod.MapYear : '-';
                                $scope.TablePeriod.TableMain = $scope.TablePeriod.TrialBalance;

                                if ($scope.TablePeriod.FSGroupsAssign != undefined && $scope.TablePeriod.FSGroupsAssign.length > 0) {
                                    if ($scope.UserProfiles.PermissionCodeActive == 'ASSIS001' || $scope.UserProfiles.PermissionCodeActive == 'ASSIS002') {
                                        $scope.TablePeriod.IsAssign = _.where($scope.TablePeriod.FSGroupsAssign, { EmpId: $scope.UserProfiles.EmpId });
                                        $scope.TablePeriod.FSGroupsMain = angular.copy($scope.TablePeriod.FSGroups);
                                        console.log($scope.TablePeriod.FSGroupsMain);
                                        $scope.TablePeriod.FSGroups = [];
                                        _.each($scope.TablePeriod.IsAssign, function (item) {
                                            var set = _.where($scope.TablePeriod.FSGroupsMain, { AuditFsgroupId: item.AuditFsgroupId })[0];
                                            if (set != undefined) {
                                                console.log(set);
                                                $scope.TablePeriod.FSGroups.push(set);
                                                console.log($scope.TablePeriod.FSGroups);
                                            }
                                        });
                                    }

                                    $scope.TablePeriod.FSGroups = _.each($scope.TablePeriod.FSGroups, function (item) {
                                        console.log(item);
                                        item.Percent = 0;
                                        if (item.PrepareStatus == 'Confirm')
                                            item.Percent += 25;
                                        if (item.ReveiwedStatus == 'Confirm')
                                            item.Percent += 25;
                                        if (item.AuditorStatus == 'Confirm')
                                            item.Percent += 50;
                                    });
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
            else {
                $scope.TablePeriod = {};
                $scope.SelectPeriod = undefined;
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
            }
        }
        catch (err) {
            showWariningToast(err);
        }
        finally {
            $("#loading").fadeOut();
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
