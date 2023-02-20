angular.module('FOCUSAPP').controller('OfficeTrialBalanceController', function ($stateParams, $rootScope, $state, $scope, $http, $timeout, $q, GlobalVar, globalService,
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
        $("#loading").fadeIn();
        try {

            var qq = $q.all([serviceParameter.getParameterCustomerWithOwner(), serviceParameter.getParameterFSGroupWithOwnerIsActiveForTrialBalance(), globalService.getProfile()]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                            $scope.Parameter.Customer = data[0].data.responsedata;
                            $scope.UserProfiles = data[2].data.responsedata;

                            if ($scope.UserProfiles.CustomerIdActive != undefined && $scope.UserProfiles.CustomerIdActive != '') {
                                var type = $scope.Parameter.Customer.filter(function (item) { return item.CustomerId == $scope.UserProfiles.CustomerIdActive; });
                                if (type.length > 0)
                                    $scope.Search.SelectCustomer = type[0];

                                $scope.OnClickChangeCustomer();
                            }
                            else {
                                $('#ModalCustomer').modal('show');
                                $("#selectcustomer").select2({
                                    dropdownParent: $("#ModalCustomer")
                                });
                            }
                        }
                        else if (data[0].data.responsecode == '200') {
                            $('#ModalCustomer').modal('show');
                            $("#selectcustomer").select2({
                                dropdownParent: $("#ModalCustomer")
                            });
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

    $scope.OnClickAddRedirectPeriod = function () {
        $state.go('account-periodaccountlist');
        $('#ModalPeriod').modal('hide');
    }

    $scope.OnClickChangeCustomer = function () {
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

                                if ($scope.UserProfiles.CustomerIdActive == undefined || $scope.UserProfiles.CustomerIdActive == '') {
                                    $('#ModalPeriod').modal('show');
                                    $("#selecrperiod").select2({
                                        dropdownParent: $("#ModalPeriod")
                                    });
                                }
                                else if ($scope.UserProfiles.PeriodIdActive == undefined || $scope.UserProfiles.PeriodIdActive == '') {
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
            showWariningToast(err);
        }
    }

    $scope.OnClickModalPeriod = function () {
        try {
            $("#loading").fadeIn();
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
            if ($scope.Search.SelectCustomer != undefined && $scope.Search.SelectPeriod != undefined) {
                var qq = $q.all([serviceAccount.getAccountPeriodsWithKey($scope.Search.SelectPeriod.PeriodId)]).then(function (data) {
                    try {

                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                                $scope.TablePeriod = data[0].data.responsedata;

                                if ($scope.TablePeriod.IsUploadTrial == 'Yes') {
                                    $scope.TablePeriod.UploadBy = $scope.TablePeriod.UploadData != undefined ? $scope.TablePeriod.UploadData.FullName : '-';
                                    $scope.TablePeriod.UploadDate = formatDateFull($scope.TablePeriod.UploadDate);
                                    $scope.TablePeriod.Record = $scope.TablePeriod.TrialBalance != undefined && $scope.TablePeriod.TrialBalance.length > 0 ? $scope.TablePeriod.TrialBalance.length + ' รายการ' : '-';
                                }
                                else {
                                    $scope.TablePeriod.UploadBy = '-';
                                    $scope.TablePeriod.UploadDate = '-';
                                    $scope.TablePeriod.Record = '-';
                                }

                                $scope.TablePeriod.Type = $scope.TablePeriod.PeriodType == 'Year' ? 'ปี' : 'ไตรมาส';
                                $scope.TablePeriod.Quater = $scope.TablePeriod.PeriodType == 'Year' ? '-' : $scope.TablePeriod.Quater;
                                $scope.TablePeriod.Date = formatDate($scope.TablePeriod.StartDate) + ' - ' + formatDate($scope.TablePeriod.EndDate);
                                $scope.TablePeriod.Mapping = $scope.TablePeriod.IsMapPeriod == 'Y' ? 'เปรียบเทียบข้อมูล' : 'ไม่เปรียบเทียบข้อมูล';
                                $scope.TablePeriod.MappingYear = $scope.TablePeriod.MapYear;
                                $scope.TablePeriod.TableMain = $scope.TablePeriod.TrialBalance;

                                if ($scope.TablePeriod.SubAdjustments != undefined && $scope.TablePeriod.SubAdjustments.length > 0) {
                                    var agreeadjustment = _.where($scope.TablePeriod.SubAdjustments, { AdjustmentAgree: 'Agree', AdjustmentPeriod : 'Current' });
                                    _.each(agreeadjustment, function (item) {
                                        var trial = _.where($scope.TablePeriod.TableMain, { AccountCode: item.AccountCode })[0];
                                        if (trial.Debit == undefined)
                                            trial.Debit = 0;
                                        trial.Debit += item.Debit;
                                        if (trial.Credit == undefined)
                                            trial.Credit = 0;
                                        trial.Credit += item.Credit;
                                    });

                                    var previousagreeadjustment = _.where($scope.TablePeriod.SubAdjustments, { AdjustmentAgree: 'Agree', AdjustmentPeriod: 'Previous' });
                                    _.each(previousagreeadjustment, function (item) {
                                        var trial = _.where($scope.TablePeriod.TableMain, { AccountCode: item.AccountCode })[0];
                                        if (trial.PreviousYear == undefined)
                                            trial.PreviousYear = 0;
                                        trial.PreviousYear += item.Debit;
                                        trial.PreviousYear -= item.Credit;
                                    });
                                }

                                _.each($scope.TablePeriod.TableMain, function (item) {
                                    item.Audit = 0;
                                    item.Audit = parseFloat(item.Amount != undefined ? item.Amount : 0) + parseFloat(item.Debit != undefined ? item.Debit : 0);
                                    item.Audit = parseFloat(item.Audit != undefined ? item.Audit : 0) - parseFloat(item.Credit != undefined ? item.Credit : 0);
                                });

                                $scope.TablePeriod.Table = $scope.TablePeriod.TableMain;
                                globalService.SetupSequence($scope.TablePeriod.Table);
                                console.log($scope.TablePeriod);
                                $scope.OnBindingTable();
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

    $scope.OnBindingTable = function () {
        _.each($scope.TablePeriod.Table, function (item) {
            if (item.iserror != "Y" && item.FsgroupId != undefined) {
                var type = $scope.Parameter.FSGroup.filter(function (item1) { return item1.FsgroupId == item.FsgroupId; });
                if (type.length > 0)
                    item.SelectFSGroup = type[0];
            }
            else
                item.SelectFSGroup = undefined;

            if ($scope.PreviousYear == undefined)
                $scope.PreviousYear = 0;
        });
        $scope.OnSummary();
    }

    $scope.OnSummary = function () {
        $scope.TablePeriod.Footer = {};
        let amount = $scope.TablePeriod.Table.reduce((s, f) => {
            return s + f.Amount;
        }, 0);
        $scope.TablePeriod.Footer.Amount = amount;

        let debit = $scope.TablePeriod.Table.reduce((s, f) => {
            return s + parseFloat(f.Debit == undefined ? 0 : f.Debit);
        }, 0);
        $scope.TablePeriod.Footer.Debit = debit;

        let credit = $scope.TablePeriod.Table.reduce((s, f) => {
            return s + parseFloat(f.Credit == undefined ? 0 : f.Credit);
        }, 0);
        $scope.TablePeriod.Footer.Credit = credit;

        let audit = $scope.TablePeriod.Table.reduce((s, f) => {
            return s + parseFloat(f.Audit == undefined ? 0 : f.Audit);
        }, 0);
        $scope.TablePeriod.Footer.Audit = audit;

        let previous = $scope.TablePeriod.Table.reduce((s, f) => {
            return s + parseFloat(f.PreviousYear == undefined ? 0 : f.PreviousYear);
        }, 0);
        $scope.TablePeriod.Footer.Previous = previous;
    }

    $scope.OnClickFilter = function () {
        $scope.TablePeriod.Table = $scope.TablePeriod.TableMain;
        $("#loading").fadeIn();

        $scope.TablePeriod.Table = _.filter($scope.TablePeriod.Table, function (item) {

            var c1 = true, c2 = true;

            if (($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "")) {

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.AccountCode != undefined && (item.AccountCode).indexOf($scope.Search.InputFilter) > -1)
                    c1 = true;
                else if (item.AccountCode == undefined || (item.AccountCode).indexOf($scope.Search.InputFilter) < 0)
                    c1 = false;

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.AccountName != undefined && (item.AccountName).indexOf($scope.Search.InputFilter) > -1)
                    c2 = true;
                else if (item.AccountName == undefined || (item.AccountName).indexOf($scope.Search.InputFilter) < 0)
                    c2 = false;
            }

            if ((c1 || c2)) {
                return item;
            }
        });

        $("#loading").fadeOut();
    }

    /*Section Add Period Account */
    $scope.OnClickAddAccountPeriod = function () {

        try {
            $scope.TableAdd = {};
            $scope.TableAdd.Action = 'เพิ่ม';
            $scope.TableAdd.IsActive = true;
            $scope.TableAdd.IsMapPeriod = 'Y';

            var type = $scope.Parameter.Customer.filter(function (item) { return item.CustomerId == $scope.Search.SelectCustomer.CustomerId; });
            if (type.length > 0)
                $scope.TableAdd.SelectCustomer = type[0];

            $scope.TableAdd.SelectPeriodType = undefined;
            $scope.TableAdd.Year = undefined;
            $('#ModalAddPeriod').modal('show');

            $scope.Parameter.Year = [];
            var today = new Date();
            var year = today.getFullYear();
            for (var i = 0; i >= -10; i--) {
                var j = year + i;
                $scope.Parameter.Year.push(j);
            }
        }
        catch (err) {
            $("#loading").fadeOut();
            showErrorToast(err);
        }
    }

    $scope.OnClickSavePeriod = function () {
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
                };

                console.log(data);
                var qq = $q.all([serviceAccount.postAccountPeriods(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                var qq = $q.all([serviceParameter.getParameterPeriodAccountWithOwnerAndBranchAndCustomer($scope.Search.SelectCustomer.CustomerId, '')]).then(function (data) {
                                    try {
                                        if (data[0] != undefined && data[0] != "") {
                                            if (data[0].data.responsecode == 200) {
                                                $scope.Parameter.Period = data[0].data.responsedata;
                                                showSuccessText('บันทึกรายการเรียบร้อย');
                                                $('#ModalAddPeriod').modal('hide');
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
                        showErrorToast(data[0].data.errormessage);
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

    /* Upload Trial Balance */
    $scope.OnClickDownTrial = function (val) {
        try {
            window.location = baseURL + "Accountings/DownloadTrialBalanceTemplate";
        }
        catch (err) {
            showWariningToast(err);
        }
    }

    $scope.OnClickDownPreviousTrial = function (val) {
        try {
            window.location = baseURL + "Accountings/DownloadPreviousTrialBalanceTemplate";
        }
        catch (err) {
            showWariningToast(err);
        }
    }

    $scope.OnClickUploadTrial = function () {
        if ($scope.Search.SelectPeriod != undefined) {
            if ($scope.TablePeriod.IsUploadTrial == 'No') {
                $scope.TablePeriod.ModalAction = 'อัพโหลด Trial Balance';
                $scope.TablePeriod.ModalEvent = 'T';
                $scope.TablePeriod.Result = {};
                initdropify('');
                $('#ModalUploadTrial').modal('show');
            }
            else
                $('#ModalNewUploadConfirm').modal('show');
        }
        else
            showWariningToast('กรุณาเลือกรอบบัญชี');
    }

    $scope.UploadFiles = function (files) {
        $scope.Upload = 1;
        $scope.SelectedFiles = files;
        if ($scope.TablePeriod.ModalEvent == 'T')
            $scope.OnClickAfterUplaodTrial();
        else if ($scope.TablePeriod.ModalEvent == 'P')
            $scope.OnClickAfterUplaodPrevious();
    };

    $scope.OnClickAfterUplaodTrial = function () {
        try {
            $("#loading").fadeIn();
            var input = document.getElementById("product_thumnail");
            var files = input.files;
            var formData = new FormData();

            for (var i = 0; i != files.length; i++) {
                formData.append("files", files[i]);
            }

            $.ajax(
                {
                    url: baseURL + "Accountings/UploadTrialBalance?ref_period=" + $scope.Search.SelectPeriod.PeriodId + "&ref_cus=" + $scope.Search.SelectCustomer.CustomerId,
                    data: formData,
                    processData: false,
                    contentType: false,
                    type: "POST",
                    success: function (data) {
                        if (data.responsecode == 200) {
                            showSuccessText('อัพโหลดข้อมูลเรียบร้อย');
                            console.log(data.responsedata);
                            $scope.TablePeriod.Table = data.responsedata;
                            globalService.SetupSequence($scope.TablePeriod.Table);
                            $scope.OnBindingTable();
                            $scope.TablePeriod.Result = data.responseresult;
                            $scope.$apply();
                        }
                        else
                            showErrorToast(data.errormessage);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        showErrorToast(textStatus);
                    }
                }
            );
        }
        catch (err) {
            showErrorToast(err);
        }
        finally {
            $("#loading").fadeOut();
        }
    }

    $scope.OnClickAfterUplaodPrevious = function () {
        try {
            $("#loading").fadeIn();
            var input = document.getElementById("product_thumnail");
            var files = input.files;
            var formData = new FormData();

            for (var i = 0; i != files.length; i++) {
                formData.append("files", files[i]);
            }

            $.ajax(
                {
                    url: baseURL + "Accountings/UploadPreviosTrialBalance?ref_period=" + $scope.Search.SelectPeriod.PeriodId + "&ref_cus=" + $scope.Search.SelectCustomer.CustomerId,
                    data: formData,
                    processData: false,
                    contentType: false,
                    type: "POST",
                    success: function (data) {
                        if (data.responsecode == 200) {
                            showSuccessText('อัพโหลดข้อมูลเรียบร้อย');
                            console.log(data.responsedata);
                            $scope.OnChangePeriod();
                            $scope.TablePeriod.Result = data.responseresult;
                            $scope.$apply();
                        }
                        else
                            showErrorToast(data.errormessage);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        showErrorToast(textStatus);
                    }
                }
            );
        }
        catch (err) {
            showErrorToast(err);
        }
        finally {
            $("#loading").fadeOut();
        }
    }

    $scope.OnClickConfirmNewUpload = function () {
        try {
            $("#loading").fadeIn();
            var qq = $q.all([serviceAccount.deleteUploadAccountTrialBalance($scope.TablePeriod.PeriodId)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            showSuccessText('ทำรายการเรียบร้อย');
                            $scope.OnChangePeriod();
                            $scope.TablePeriod.ModalAction = 'อัพโหลด Trial Balance';
                            $scope.TablePeriod.ModalEvent = 'T';
                            $scope.TablePeriod.Result = {};
                            initdropify('');
                            $('#ModalUploadTrial').modal('show');
                        }
                        else
                            showErrorToast(data[0].data.errormessage);
                    }
                }
                catch (err) {
                    showErrorToast(response.data.errormessage);
                }
            });
            $('#ModalNewUploadConfirm').modal('hide');
        }
        catch (ex) {
            showErrorToast(ex);
        }
        finally {
            $("#loading").fadeOut();
        }
    }

    $scope.OnClickUploadPreviousTrial = function () {
        if ($scope.Search.SelectPeriod != undefined) {
            $scope.TablePeriod.ModalAction = 'อัพโหลด Previous Yr';
            $scope.TablePeriod.ModalEvent = 'P';
            $scope.TablePeriod.Result = {};
            initdropify('');
            $('#ModalUploadTrial').modal('show');
        }
        else
            showWariningToast('กรุณาเลือกรอบบัญชี');
    }

    function initdropify(path) {
        $("#product_thumnail").addClass('dropify');
        var publicpath_identity_picture = path;

        var drEvent = $('.dropify').dropify();
        //drEvent.on('dropify.afterClear', function (event, element) {
        //    $scope.DeleteImages = 1;
        //});
        drEvent = drEvent.data('dropify');
        drEvent.resetPreview();
        drEvent.clearElement();
        drEvent.settings.defaultFile = publicpath_identity_picture;
        drEvent.destroy();

        drEvent.init();

        drEvent = $('.dropify').dropify();
        drEvent.on('dropify.afterClear', function (event, element) {
            $scope.DeleteImages = 1;
        });

        $('.dropify#identity_picture').dropify({
            defaultFile: publicpath_identity_picture,
        });

        $('.dropify').dropify();
    }

    /* Save Trial Balance*/
    $scope.OnClickSaveTrial = function (after) {
        try {
            $("#loading").fadeIn();
            var data = [];
            _.each($scope.TablePeriod.Table, function (item) {
                data.push({
                    TrialBalanceId: item.TrialBalanceId,
                    PeriodId: item.PeriodId,
                    CustomerId: item.CustomerId,
                    AccountCode: item.AccountCode,
                    AccountName: item.AccountName,
                    FsgroupId: item.SelectFSGroup != undefined ? item.SelectFSGroup.FsgroupId : undefined,
                    Amount: item.Amount,
                    IsUpload: item.IsUpload,
                    IsDelete: item.IsDelete,
                    PreviousYear: item.PreviousYear === '' ? 0 : item.PreviousYear,
                });
            })
            console.log(data);
            var qq = $q.all([serviceAccount.postAccountTrialBalance(data, $scope.Search.SelectPeriod.PeriodId, $scope.Search.SelectCustomer.CustomerId)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            showSuccessText('บันทึกรายการเรียบร้อย');
                            $scope.OnChangePeriod();
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
        catch (err) {
            showWariningToast(err);
            $("#loading").fadeOut();
        }
        finally {
            $("#loading").fadeOut();
        }
    }

    $scope.OnClickDeleteTrial = function (val) {
        try {
            $("#loading").fadeIn();
            var data = {
                TrialBalanceId: val.TrialBalanceId,
                PeriodId: $scope.Search.SelectPeriod.PeriodId,
                CustomerId: $scope.Search.SelectCustomer.CustomerId,
                AccountCode: val.AccountCode,
                AccountName: val.AccountName,
                FSGroupId: val.FsgroupId,
                Amount: val.Amount,
                PreviousYear: val.PreviousYear,
                IsDelete : 'Yes'
            };

            console.log(data);
            var qq = $q.all([serviceAccount.postAddAccountTrialBalance(data)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            var qq = $q.all([serviceParameter.getParameterPeriodAccountWithOwnerAndBranchAndCustomer($scope.Search.SelectCustomer.CustomerId, '')]).then(function (data) {
                                try {
                                    if (data[0] != undefined && data[0] != "") {
                                        if (data[0].data.responsecode == 200) {
                                            showSuccessText('ลบรายการเรียบร้อย');
                                            $scope.OnChangePeriod();
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
                    showErrorToast(data[0].data.errormessage);
                }
            });
        }
        catch (err) {
            showWariningToast(err);
            $("#loading").fadeOut();
        }
        finally {
            $("#loading").fadeOut();
        }
    }

    $scope.OnClickAddTrial = function () {
        if ($scope.Search.SelectPeriod != undefined) {
            $scope.TableAdd = {};
            $scope.TableAdd.Action = 'เพิ่ม';
            $('#ModalAddTrialBalance').modal('show');
        }
        else
            showWariningToast('กรุณาเลือกรอบบัญชี');
    }

    $scope.OnClickSaveAddTrialBalance = function () {
        try {
            if ($scope.TableAdd.AccountCode == undefined || $scope.TableAdd.AccountCode == '')
                throw "กรุณาระบุ A/C Code";
            else if ($scope.TableAdd.AccountName == undefined || $scope.TableAdd.AccountName == '')
                throw "กรุณาระบุ A/C Name";
            else if ($scope.TableAdd.SelectFsGroup == undefined)
                throw "กรุณาเลือก W/P No";
            else if ($scope.TableAdd.Amount === undefined || $scope.TableAdd.Amount === '')
                throw "กรุณาระบุ Current Yr";
            else {
                $("#loading").fadeIn();
                var data = {
                    TrialBalanceId: $scope.TableAdd.TrialBalanceId,
                    PeriodId: $scope.Search.SelectPeriod.PeriodId,
                    CustomerId: $scope.Search.SelectCustomer.CustomerId,
                    AccountCode: $scope.TableAdd.AccountCode,
                    AccountName: $scope.TableAdd.AccountName,
                    FSGroupId: $scope.TableAdd.SelectFsGroup.FsgroupId,
                    Amount: $scope.TableAdd.Amount,
                    PreviousYear: $scope.TableAdd.PreviousYear,
                    IsDelete: 'No'
                };

                console.log(data);
                var qq = $q.all([serviceAccount.postAddAccountTrialBalance(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                var qq = $q.all([serviceParameter.getParameterPeriodAccountWithOwnerAndBranchAndCustomer($scope.Search.SelectCustomer.CustomerId, '')]).then(function (data) {
                                    try {
                                        if (data[0] != undefined && data[0] != "") {
                                            if (data[0].data.responsecode == 200) {
                                                showSuccessText('บันทึกรายการเรียบร้อย');
                                                $scope.OnChangePeriod();
                                                $('#ModalAddTrialBalance').modal('hide');
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
                        showErrorToast(data[0].data.errormessage);
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

    /* Save Adjustmnet & Sub*/
    $scope.OnClickAddAdjustment = function () {
        if ($scope.Search.SelectPeriod != undefined) {
            var qq = $q.all([serviceParameter.getParameterTrialBalanceWithCustomerAndPeriod($scope.Search.SelectCustomer.CustomerId, $scope.Search.SelectPeriod.PeriodId)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                            $scope.Parameter.TrialBalance = data[0].data.responsedata;

                            $scope.TableAdd = {};
                            $scope.TableAdd.Action = 'เพิ่ม';
                            $scope.TableAdd.IsAgree = 'Agree';
                            $scope.TableAdd.IsPeriod = 'Current';
                            $('#ModalAdjustment').modal('show');
                        }
                        else if (data[0].data.responsecode == '200' && data[0].data.responsedata == "")
                            showWariningToast("กรุณาอัพโหลดข้อมูล Trial Balance ");

                        else if (data[0].data.responsecode == '400') { showErrorToast(data[0].data.errormessage); }
                    }
                }
                catch (err) {
                    showErrorToast(err);
                }
            });

        }
        else
            showWariningToast('กรุณาเลือกรอบบัญชี');
    }

    $scope.OnClickAddSub = function () {

        if ($scope.TableAdd.IsAgree == undefined || $scope.TableAdd.IsAgree == '')
            showWariningToast("กรุณาเลือก Agee / Disagree ");
        else {
            $scope.TableAddSub = {};
            $scope.TableAddSub.AdjustmentType = 'Debit';
            $scope.TableAddSub.AdjustmentAgree = $scope.TableAdd.IsAgree;
            $scope.TableAddSub.AdjustmentPeriod = $scope.TableAdd.IsPeriod;
            $('#ModalAdjustment').modal('hide');
            $('#ModalSubAdjustment').modal('show');

            $("#adjustmentaccount").select2({
                dropdownParent: $("#ModalSubAdjustment")
            });
        }
    }

    $scope.OnClickCloseSub = function () {
        $('#ModalSubAdjustment').modal('hide');
        $('#ModalAdjustment').modal('show');
    }

    $scope.OnClickSaveSub = function (type) {
        try {
            if ($scope.TableAddSub.AdjustmentModel == undefined)
                throw "กรุณาเลือก Balance Sheet / P&L";
            else if ($scope.TableAddSub.SelectAccount == undefined)
                throw "กรุณาเลือก Account No";
            else if ($scope.TableAddSub.Amount === undefined || $scope.TableAddSub.Amount === '')
                throw "กรุณาระบุจำนวนปรับปรุง";
            else {
                $("#loading").fadeIn();
                var data = {
                    SubAdjustmentId: $scope.TableAddSub.SubAdjustmentId,
                    AccountCode: $scope.TableAddSub.SelectAccount.AccountCode,
                    AccountName: $scope.TableAddSub.SelectAccount.AccountName,
                    AdjustmentType: $scope.TableAddSub.AdjustmentType,
                    AdjustmentAgree: $scope.TableAdd.IsAgree,
                    AdjustmentPeriod: 'Current',
                    AdjustmentModel: $scope.TableAddSub.AdjustmentModel,
                    Debit: $scope.TableAddSub.AdjustmentType == 'Debit' ? $scope.TableAddSub.Amount : 0,
                    Credit: $scope.TableAddSub.AdjustmentType == 'Credit' ? $scope.TableAddSub.Amount : 0,
                    IsDelete: 'No'
                };

                if ($scope.TableAdd.SubAdjustment == undefined)
                    $scope.TableAdd.SubAdjustment = [];

                $scope.TableAdd.SubAdjustment.push(data);
                $scope.TableAddSub = {};
                $scope.TableAddSub.AdjustmentType = 'Debit';
                $scope.TableAddSub.AdjustmentModel = undefined;
                $scope.TableAddSub.AdjustmentAgree = $scope.TableAdd.Agree;
                $scope.TableAddSub.AdjustmentPeriod = 'Current';
                console.log($scope.TableAdd.SubAdjustment);
                $scope.OnClickSummarySub();

                if (type == 'close') {
                    $('#ModalAdjustment').modal('show');
                    $('#ModalSubAdjustment').modal('hide');
                }
            }
        }
        catch (err) {
            showWariningToast(err);
        }
        finally {
            $("#loading").fadeOut();
        }
    }

    $scope.OnClickDeleteSub = function (index, values) {
        try {
            if (values != undefined) {
                if (values.SubAdjustmentId != undefined)
                    values.IsDelete = 'Yes';
                else
                    $scope.TableAdd.SubAdjustment.splice(index, 1);

                globalService.SetupSequence($scope.TableAdd.SubAdjustment);
                $scope.OnClickSummarySub();
            }
        }
        catch (ex) {
            showErrorToast(ex);
        }
    }

    $scope.OnClickSummarySub = function () {
        if ($scope.TableAdd.SubAdjustment != undefined && $scope.TableAdd.SubAdjustment.length > 0) {
            $scope.TableAdd.SumBSDebit = 0;
            $scope.TableAdd.SumBSCredit = 0;
            $scope.TableAdd.SumPLDebit = 0;
            $scope.TableAdd.SumPLCredit = 0;
        }
        $scope.TableAdd.SumBSDebit = _.where($scope.TableAdd.SubAdjustment, { AdjustmentType: 'Debit', AdjustmentModel: 'BS' }).reduce((s, f) => {
            return s + parseFloat(f.Debit);
        }, 0);

        $scope.TableAdd.SumBSCredit = _.where($scope.TableAdd.SubAdjustment, { AdjustmentType: 'Credit', AdjustmentModel: 'BS' }).reduce((s, f) => {
            return s + parseFloat(f.Credit);
        }, 0);

        $scope.TableAdd.SumPLDebit = _.where($scope.TableAdd.SubAdjustment, { AdjustmentType: 'Debit', AdjustmentModel: 'PL' }).reduce((s, f) => {
            return s + parseFloat(f.Debit);
        }, 0);

        $scope.TableAdd.SumPLCredit = _.where($scope.TableAdd.SubAdjustment, { AdjustmentType: 'Credit', AdjustmentModel: 'PL' }).reduce((s, f) => {
            return s + parseFloat(f.Credit);
        }, 0);
    }

    $scope.OnClickSave = function (action) {
        try {
            if ($scope.TableAdd.Name == undefined)
                throw "กรุณาระบุชื่อรายละเอียดการปรับปรุง";
            else if ($scope.TableAdd.SubAdjustment == undefined || $scope.TableAdd.SubAdjustment.length <= 0)
                throw "กรุณาเพิ่มรายการ Adjustment อย่างน้อย 1 รายการ";
            else if (($scope.TableAdd.SumBSDebit + $scope.TableAdd.SumPLDebit) != ($scope.TableAdd.SumBSCredit + $scope.TableAdd.SumPLCredit))
                throw "รายการ Debit / Credit ต้องเท่ากันเสมอ";
            else {
                $("#loading").fadeIn();
                var data = {
                    AdjustmentId: $scope.TableAdd.AdjustmentId,
                    PeriodId: $scope.TablePeriod.PeriodId,
                    Code: $scope.TableAdd.Code,
                    Name: $scope.TableAdd.Name,
                    Description: $scope.TableAdd.Description,
                    IsAgree: $scope.TableAdd.IsAgree,
                    IsPeriod: $scope.TableAdd.IsPeriod
                };
                data.SubAdjustment = [];
                _.each($scope.TableAdd.SubAdjustment, function (item) {
                    data.SubAdjustment.push({
                        SubAdjustmentId: item.SubAdjustmentId,
                        AdjustmentId: item.AdjustmentId,
                        AccountCode: item.AccountCode,
                        AccountName: item.AccountName,
                        AdjustmentType: item.AdjustmentType,
                        AdjustmentAgree: item.AdjustmentAgree,
                        AdjustmentModel: item.AdjustmentModel,
                        AdjustmentPeriod: item.AdjustmentPeriod,
                        Debit: item.Debit,
                        Credit: item.Credit,
                        IsDelete: item.IsDelete
                    });
                });

                console.log(data);
                var qq = $q.all([serviceAccount.postAccountAdjustment(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                showSuccessText('บันทึกรายการเรียบร้อย');
                                var type = $scope.TableAdd.IsAgree;
                                $scope.TableAdd = {};
                                $scope.TableAdd.Action = 'เพิ่ม';
                                $scope.TableAdd.IsAgree = type;
                                if (action == 'close') {
                                    $('#ModalAdjustment').modal('hide');
                                }
                                $scope.OnChangePeriod();
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
        }
        finally {
            $("#loading").fadeOut();
        }
    }

    /* SAVE Noted */
    $scope.OnClickAddNoted = function (val) {
        $scope.TableAdd = {};
        $scope.TableAdd = angular.copy(val);
        $('#ModalNoted').modal('show');
    }

    $scope.OnClickSaveNoted = function (action) {
        try {
            $("#loading").fadeIn();
            var data = {
                TrialBalanceId: $scope.TableAdd.TrialBalanceId,
                Noted: $scope.TableAdd.Noted,
            };
            console.log(data);
            var qq = $q.all([serviceAccount.postAccountTrialBalanceNoted(data)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            showSuccessText('บันทึกรายการเรียบร้อย');
                            $scope.OnChangePeriod();
                            $scope.TableAdd = {};
                            $('#ModalNoted').modal('hide');
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
        catch (err) {
            showWariningToast(err);
        }
        finally {
            $("#loading").fadeOut();
        }
    }
});