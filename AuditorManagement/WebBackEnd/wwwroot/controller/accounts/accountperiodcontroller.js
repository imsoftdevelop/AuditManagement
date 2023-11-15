angular.module('FOCUSAPP').controller('AccountperiodController', function ($stateParams, $rootScope, $state, $scope, $http, $timeout, $q, GlobalVar, globalService,
    serviceAccount, serviceParameter) {
    var baseURL = $("base")[0].href;//$("base").attr("href");
    var config = GlobalVar.HeaderConfig;
    $scope.Search = [];
    $scope.Table = [];
    $scope.Parameter = [];
    $scope.TableMain = [];

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

    $scope.init = function () {
        try {
            $scope.initComponent();

            $("#loading").fadeIn();
            var qq = $q.all([serviceAccount.getAccountPeriods(), serviceParameter.getParameterCustomerWithOwner(), serviceParameter.getParameterProposalWithOwner()]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                            $scope.TableMain = data[0].data.responsedata;
                        }
                        else if (data[0].data.responsecode == '400') { showErrorToast(data[0].data.errormessage); }

                        $scope.OnBinding();
                    }

                    if (data[1] != undefined && data[1] != "") {
                        if (data[1].data.responsecode == '200' && data[1].data.responsedata != undefined && data[1].data.responsedata != "") {
                            $scope.Parameter.Customer = data[1].data.responsedata;
                        }
                        else if (data[1].data.responsecode == '400') { showErrorToast(data[1].data.errormessage); }
                    }

                    if (data[2] != undefined && data[2] != "") {
                        if (data[2].data.responsecode == '200' && data[2].data.responsedata != undefined && data[2].data.responsedata != "") {
                            $scope.Parameter.Proposal = data[2].data.responsedata;
                        }
                        else if (data[2].data.responsecode == '400') { showErrorToast(data[2].data.errormessage); }
                    }

                    $scope.Parameter.Year = [];
                    var today = new Date();
                    var year = today.getFullYear();
                    for (var i = 0; i >= -10; i--) {
                        var j = year + i;
                        $scope.Parameter.Year.push(j);
                    }

                    if ($stateParams.ref_id != undefined && $stateParams.ref_id != '') {
                        
                        var qq = $q.all([serviceAccount.getAccountProposalKey($stateParams.ref_id)]).then(function (data1) {
                            try {
                                if (data1[0] != undefined && data1[0] != "") {
                                    if (data1[0].data.responsecode == 200) {
                                        $scope.TableProposal = data1[0].data.responsedata;

                                        $scope.TableAdd = {};
                                        $scope.TableAdd.Action = 'เพิ่ม';
                                        $scope.TableAdd.IsActive = true;
                                        $scope.TableAdd.IsMapPeriod = 'Y';
                                        $scope.TableAdd.SelectCustomer = undefined;
                                        $scope.TableAdd.SelectPeriodType = undefined;
                                        $scope.TableAdd.Year = undefined;

                                        var type = $scope.Parameter.Proposal.filter(function (item) { return item.ProposalId == $scope.TableProposal.ProposalId; });
                                        if (type.length > 0)
                                            $scope.TableAdd.SelectProposal = type[0];

                                        var type = $scope.Parameter.Customer.filter(function (item) { return item.CustomerId == $scope.TableProposal.CustomerId; });
                                            if (type.length > 0)
                                                $scope.TableAdd.SelectCustomer = type[0];

                                        $scope.TableAdd.Name = $scope.TableProposal.ProposalName;
                                        $scope.TableAdd.StartDate = formatDate($scope.TableProposal.StartDate);
                                        $scope.TableAdd.EndDate = formatDate($scope.TableProposal.ExpireDate);
                                        $scope.TableAdd.ProposalId = $scope.TableProposal.ProposalId;
                                        
                                        $('#ModalAdd').modal('show');

                                    }
                                    else {
                                        showErrorToast(data1[0].data.errormessage);
                                    }
                                }
                                else {
                                    showErrorToast(data1[0].data.errormessage);
                                }
                            }
                            catch (err) {
                                showErrorToast(data1[0].data.errormessage);
                            }
                        });
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

        $scope.Table = _.filter($scope.Table, function (item) {

            var c1 = true, c2 = true, c3 = true, c4 = true, c5 = true, c6 = true;

            if (($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "")) {

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.PeriodCode != undefined && (item.PeriodCode).indexOf($scope.Search.InputFilter) > -1)
                    c1 = true;
                else if (item.PeriodCode == undefined || (item.PeriodCode).indexOf($scope.Search.InputFilter) < 0)
                    c1 = false;

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.Name != undefined && (item.Name).indexOf($scope.Search.InputFilter) > -1)
                    c2 = true;
                else if (item.Name == undefined || (item.Name).indexOf($scope.Search.InputFilter) < 0)
                    c2 = false;

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.Customer.Name != undefined && (item.Customer.Name).indexOf($scope.Search.InputFilter) > -1)
                    c3 = true;
                else if (item.Customer.Name == undefined || (item.Customer.Name).indexOf($scope.Search.InputFilter) < 0)
                    c3 = false;

            }

            if ($scope.Search.SelectCustomer != undefined) {
                if (item.CustomerId == $scope.Search.SelectCustomer.CustomerId)
                    c4 = true;
                else
                    c4 = false;
            }
            else
                c4 = true;

            if ($scope.Search.SelectType != undefined) {
                if (item.PeriodType == $scope.Search.SelectType)
                    c5 = true;
                else
                    c5 = false;
            }
            else
                c5 = true;

            if ($scope.Search.SelectYear != undefined) {
                if (item.Year == $scope.Search.SelectYear)
                    c6 = true;
                else
                    c6 = false;
            }
            else
                c6 = true;


            if ((c1 || c2 || c3) && c4 && c5 && c6) {
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
            $scope.TableAdd = angular.copy(_.where($scope.Table, { PeriodId: val.PeriodId })[0]);
            $scope.TableAdd.Action = 'แก้ไข';
            if ($scope.TableAdd.CustomerId != undefined) {
                var type = $scope.Parameter.Customer.filter(function (item) { return item.CustomerId == $scope.TableAdd.CustomerId; });
                if (type.length > 0)
                    $scope.TableAdd.SelectCustomer = type[0];
            }
            else {
                $scope.Employee.SelectCustomer = undefined;
            }

            $scope.TableAdd.SelectPeriodType = $scope.TableAdd.PeriodType;
            $scope.TableAdd.IsActive = $scope.TableAdd.IsActive == 'Yes' ? true : false;
            $scope.TableAdd.StartDate = formatDate($scope.TableAdd.StartDate);
            $scope.TableAdd.EndDate = formatDate($scope.TableAdd.EndDate);
            $scope.TableAdd.Quater = $scope.TableAdd.Quater != undefined ? $scope.TableAdd.Quater.toString() : undefined;

            if ($scope.TableAdd.IsMapPeriod == 'Y') {

                $scope.TableAdd.SelectMapYear = $scope.TableAdd.MapYear;

                var qq = $q.all([serviceParameter.getParameterPeriodAccountWithOwnerAndBranchAndCustomer(
                    $scope.TableAdd.CustomerId,
                    $scope.TableAdd.PeriodId != undefined ? $scope.TableAdd.PeriodId : ''
                )]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                                $scope.Parameter.MapPeriod = data[0].data.responsedata;

                                if ($scope.TableAdd.MapPeriodId != undefined) {
                                    var type = $scope.Parameter.MapPeriod.filter(function (item) { return item.PeriodId == $scope.TableAdd.MapPeriodId; });
                                    if (type.length > 0)
                                        $scope.TableAdd.SelectMapId = type[0];
                                }
                                else {
                                    $scope.TableAdd.SelectMapId = undefined;
                                }

                            }
                            else if (data[0].data.responsecode == '200') {
                                $scope.Parameter.MapPeriod = [];
                            }
                            else if (data[0].data.responsecode == '400') { showErrorToast(data[0].data.errormessage); }
                        }
                    }
                    catch (err) {
                        showErrorToast(err);
                    }
                });
            }

            $('#ModalAdd').modal('show');
        }
    }

    $scope.OnClickAdd = function () {
        $scope.TableAdd = {};
        $scope.TableAdd.Action = 'เพิ่ม';
        $scope.TableAdd.IsActive = true;
        $scope.TableAdd.IsMapPeriod = 'Y';
        $scope.TableAdd.SelectCustomer = undefined;
        $scope.TableAdd.SelectPeriodType = undefined;
        $scope.TableAdd.Year = undefined;

        if ($scope.UserProfiles.CustomerIdActive != undefined && $scope.UserProfiles.CustomerIdActive != '') {
            var type = $scope.Parameter.Customer.filter(function (item) { return item.CustomerId == $scope.UserProfiles.CustomerIdActive; });
            if (type.length > 0)
                $scope.TableAdd.SelectCustomer = type[0];
        }

        $('#ModalAdd').modal('show');
    }

    $scope.OnClickConfirm = function () {
        try {
            var qq = $q.all([serviceAccount.deleteAccountPeriods($scope.TableAdd.PeriodId)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            var qq = $q.all([serviceAccount.getAccountPeriods()]).then(function (data) {
                                try {
                                    if (data[0] != undefined && data[0] != "") {
                                        if (data[0].data.responsecode == 200) {
                                            $scope.TableMain = data[0].data.responsedata;
                                            $scope.OnBinding();
                                            showSuccessText('ลบรายการเรียบร้อย');
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
                        else
                            showErrorToast(data[0].data.errormessage);
                    }
                    else
                        showErrorToast(data[0].data.errormessage);

                }
                catch (err) {
                    showErrorToast(response.data.errormessage);
                }
            });
            $('#ModalConfirm').modal('hide');
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

    $scope.OnChangeProposal = function () {
        if ($scope.TableAdd.SelectProposal != undefined) {

            var qq = $q.all([serviceAccount.getAccountProposalKey($scope.TableAdd.SelectProposal.ProposalId)]).then(function (data1) {
                try {
                    if (data1[0] != undefined && data1[0] != "") {
                        if (data1[0].data.responsecode == 200) {
                            $scope.TableProposal = data1[0].data.responsedata;

                            $scope.TableAdd = {};
                            $scope.TableAdd.Action = 'เพิ่ม';
                            $scope.TableAdd.IsActive = true;
                            $scope.TableAdd.IsMapPeriod = 'Y';
                            $scope.TableAdd.SelectCustomer = undefined;
                            $scope.TableAdd.SelectPeriodType = undefined;
                            $scope.TableAdd.Year = undefined;

                            var type = $scope.Parameter.Proposal.filter(function (item) { return item.ProposalId == $scope.TableProposal.ProposalId; });
                            if (type.length > 0)
                                $scope.TableAdd.SelectProposal = type[0];

                            var type = $scope.Parameter.Customer.filter(function (item) { return item.CustomerId == $scope.TableProposal.CustomerId; });
                            if (type.length > 0)
                                $scope.TableAdd.SelectCustomer = type[0];

                            $scope.TableAdd.Name = $scope.TableProposal.ProposalName;
                            $scope.TableAdd.StartDate = formatDate($scope.TableProposal.StartDate);
                            $scope.TableAdd.EndDate = formatDate($scope.TableProposal.ExpireDate);
                            $scope.TableAdd.ProposalId = $scope.TableProposal.ProposalId;

                            $('#ModalAdd').modal('show');

                        }
                        else {
                            showErrorToast(data1[0].data.errormessage);
                        }
                    }
                    else {
                        showErrorToast(data1[0].data.errormessage);
                    }
                }
                catch (err) {
                    showErrorToast(data1[0].data.errormessage);
                }
            });
        }
    }

    $scope.OnClickSave = function (after) {
        try {
            if ($scope.TableAdd.SelectCustomer == undefined)
                throw "กรุณาเลือกลูกค้า";
            else if ($scope.TableAdd.Name == undefined || $scope.TableAdd.Name == '')
                throw "กรุณาระบุรอบบัญชีชื่อ";
            else if ($scope.TableAdd.PeriodType == undefined)
                throw "กรุณาเลือกประเภท";
            else if ($scope.TableAdd.Year == undefined)
                throw "กรุณาเลือกปี";
            else if ($scope.TableAdd.PeriodType == 'Quarter' && $scope.TableAdd.Quater == undefined)
                throw "กรุณาเลือกปี";
            else if ($scope.TableAdd.StartDate == undefined || $scope.TableAdd.StartDate == '')
                throw "กรุณาระบุวันที่เริ่มรอบบัญชี";
            else if ($scope.TableAdd.EndDate == undefined || $scope.TableAdd.EndDate == '')
                throw "กรุณาระบุวันที่สิ้นสุดรอบบัญชี";
            else if ($scope.TableAdd.IsMapPeriod == 'Y' && $scope.TableAdd.SelectMapId == undefined)
                throw "กรุณาเลือกปีเปรียบเทียบ";
            else {
                $("#loading").fadeIn();
                var data = {
                    PeriodId: $scope.TableAdd.PeriodId,
                    PeriodCode: $scope.TableAdd.PeriodCode,
                    CustomerId: $scope.TableAdd.SelectCustomer.CustomerId,
                    Name: $scope.TableAdd.Name,
                    PeriodType: $scope.TableAdd.PeriodType,
                    Year: $scope.TableAdd.Year,
                    Quater: $scope.TableAdd.Quater,
                    StartDate: ToJsonDate2($scope.TableAdd.StartDate),
                    EndDate: ToJsonDate2($scope.TableAdd.EndDate),
                    IsMapPeriod: $scope.TableAdd.IsMapPeriod,
                    MapYear: $scope.TableAdd.IsMapPeriod == 'N' ? undefined : $scope.TableAdd.SelectMapYear,
                    MapPeriodId: $scope.TableAdd.IsMapPeriod == 'N' ? undefined : $scope.TableAdd.SelectMapId != undefined ? $scope.TableAdd.SelectMapId.PeriodId : undefined,
                    Remark: $scope.TableAdd.Remark,
                    IsActive: $scope.TableAdd.IsActive ? 'Yes' : 'No',
                    ProposalId: $scope.TableAdd.SelectProposal.ProposalId,
                };

                console.log(data);
                var qq = $q.all([serviceAccount.postAccountPeriods(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                var qq = $q.all([serviceAccount.getAccountPeriods()]).then(function (data) {
                                    try {
                                        if (data[0] != undefined && data[0] != "") {
                                            if (data[0].data.responsecode == 200) {
                                                $scope.TableMain = data[0].data.responsedata;
                                                $scope.OnBinding();
                                                showSuccessText('บันทึกรายการเรียบร้อย');
                                                $('#ModalAdd').modal('hide');
                                                if (after == 'new') {
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
                            else
                                showErrorToast(data[0].data.errormessage);
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
        catch (err) {
            showWariningToast(err);
            $("#loading").fadeOut();
        }
        finally {
            $("#loading").fadeOut();
        }
    }

    $scope.OnChangeYearMap = function () {
        $scope.TableAdd.SelectMapId = undefined;
        try {
            if ($scope.TableAdd.SelectCustomer != undefined && $scope.TableAdd.SelectMapYear != undefined) {
                $("#loading").fadeIn();
                var qq = $q.all([serviceParameter.getParameterPeriodAccountWithOwnerAndBranchAndCustomer(
                    $scope.TableAdd.SelectCustomer.CustomerId,
                    $scope.TableAdd.PeriodId != undefined ? $scope.TableAdd.PeriodId : ''
                )]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                                $scope.Parameter.MapPeriod = data[0].data.responsedata;
                                console.log($scope.Parameter.MapPeriod);
                                $scope.Parameter.MapPeriod = _.where($scope.Parameter.MapPeriod, { Year: parseInt($scope.TableAdd.SelectMapYear) });
                            }
                            else if (data[0].data.responsecode == '200') {
                                $scope.Parameter.MapPeriod = [];
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
            showErrorToast(err);
        }
        finally {
            $("#loading").fadeOut();
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
