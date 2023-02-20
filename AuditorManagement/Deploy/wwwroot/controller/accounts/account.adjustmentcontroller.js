angular.module('FOCUSAPP').controller('AccountAdjustmentcontroller', function ($stateParams, $rootScope, $state, $scope, $http, $timeout, $q, GlobalVar, globalService,
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

            var qq = $q.all([serviceParameter.getParameterCustomerWithOwner(), globalService.getProfile()]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                            $scope.Parameter.Customer = data[0].data.responsedata;
                            $scope.UserProfiles = data[1].data.responsedata;

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

    $scope.OnClickAddCustomer = function () { $('#ModalCustomer').modal('hide'); $state.go('account-customermanagelist', { ref_action: 'เพิ่มข้อมูล' }); }

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

                                $scope.TablePeriod.Table = $scope.TablePeriod.TableMain = _.where($scope.TablePeriod.Adjustments, { IsAgree: 'Agree', IsPeriod: 'Current' });
                                $scope.TablePeriod.TableDisAgree = $scope.TablePeriod.TableDisAgreeMain = _.where($scope.TablePeriod.Adjustments, { IsAgree: 'Disagree', IsPeriod: 'Current' });

                                $scope.TablePeriod.PreviousTable = $scope.TablePeriod.PreviousTableMain = _.where($scope.TablePeriod.Adjustments, { IsAgree: 'Agree', IsPeriod: 'Previous' });
                                $scope.TablePeriod.PreviousTableDisAgree = $scope.TablePeriod.PreviousTableDisAgreeMain = _.where($scope.TablePeriod.Adjustments, { IsAgree: 'Disagree', IsPeriod: 'Previous' });

                                console.log($scope.TablePeriod);
                                console.log($scope.TablePeriod.Table);
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
        globalService.SetupSequence($scope.TablePeriod.Table);
        globalService.SetupSequence($scope.TablePeriod.TableDisAgree);
        globalService.SetupSequence($scope.TablePeriod.PreviousTable);
        globalService.SetupSequence($scope.TablePeriod.PreviousTableDisAgree);
        $scope.OnSummary();
    }

    $scope.OnSummary = function () {
        $scope.TablePeriod.Footer = {};
        $scope.TablePeriod.Footer.SumAgreeBSDebit = 0;
        $scope.TablePeriod.Footer.SumAgreeBSCredit = 0;
        $scope.TablePeriod.Footer.SumAgreePLDebit = 0;
        $scope.TablePeriod.Footer.SumAgreePLCredit = 0;
        $scope.TablePeriod.Footer.SumDisAgreeBSDebit = 0;
        $scope.TablePeriod.Footer.SumDisAgreeBSCredit = 0;
        $scope.TablePeriod.Footer.SumDisAgreePLDebit = 0;
        $scope.TablePeriod.Footer.SumDisAgreePLCredit = 0;

        var Agree = _.where($scope.TablePeriod.Table, { IsAgree: 'Agree' });
        _.each(Agree, function (item) {
            let amount = _.where(item.SubAdjustmentAgree, { AdjustmentAgree: 'Agree', AdjustmentModel: 'BS', AdjustmentType: 'Debit'  }).reduce((s, f) => {
                return s + parseFloat(f.Debit);
            }, 0);
            $scope.TablePeriod.Footer.SumAgreeBSDebit += amount;

            amount = _.where(item.SubAdjustmentAgree, { AdjustmentAgree: 'Agree', AdjustmentModel: 'BS', AdjustmentType: 'Credit' }).reduce((s, f) => {
                return s + parseFloat(f.Credit);
            }, 0);
            $scope.TablePeriod.Footer.SumAgreeBSCredit += amount;

            amount = _.where(item.SubAdjustmentAgree, { AdjustmentAgree: 'Agree', AdjustmentModel: 'PL', AdjustmentType: 'Debit' }).reduce((s, f) => {
                return s + parseFloat(f.Debit);
            }, 0);
            $scope.TablePeriod.Footer.SumAgreePLDebit += amount;

            amount = _.where(item.SubAdjustmentAgree, { AdjustmentAgree: 'Agree', AdjustmentModel: 'PL', AdjustmentType: 'Credit' }).reduce((s, f) => {
                return s + parseFloat(f.Credit);
            }, 0);
            $scope.TablePeriod.Footer.SumAgreePLCredit += amount;
        });

        var DisAgree = _.where($scope.TablePeriod.TableDisAgree, { IsAgree: 'Disagree' });
        _.each(DisAgree, function (item) {
            let amount = _.where(item.SubAdjustmentDisagree, { AdjustmentAgree: 'Disagree', AdjustmentModel: 'BS', AdjustmentType: 'Debit' }).reduce((s, f) => {
                return s + parseFloat(f.Debit);
            }, 0);
            $scope.TablePeriod.Footer.SumDisAgreeBSDebit += amount;

            amount = _.where(item.SubAdjustmentDisagree, { AdjustmentAgree: 'Disagree', AdjustmentModel: 'BS', AdjustmentType: 'Credit' }).reduce((s, f) => {
                return s + parseFloat(f.Credit);
            }, 0);
            $scope.TablePeriod.Footer.SumDisAgreeBSCredit += amount;

            amount = _.where(item.SubAdjustmentDisagree, { AdjustmentAgree: 'Disagree', AdjustmentModel: 'PL', AdjustmentType: 'Debit' }).reduce((s, f) => {
                return s + parseFloat(f.Debit);
            }, 0);
            $scope.TablePeriod.Footer.SumDisAgreePLDebit += amount;

            amount = _.where(item.SubAdjustmentDisagree, { AdjustmentAgree: 'Disagree', AdjustmentModel: 'PL', AdjustmentType: 'Credit' }).reduce((s, f) => {
                return s + parseFloat(f.Credit);
            }, 0);
            $scope.TablePeriod.Footer.SumDisAgreePLCredit += amount;
        });

        $scope.TablePeriod.Footer.SumPreviousAgreeBSDebit = 0;
        $scope.TablePeriod.Footer.SumPreviousAgreeBSCredit = 0;
        $scope.TablePeriod.Footer.SumPreviousAgreePLDebit = 0;
        $scope.TablePeriod.Footer.SumPreviousAgreePLCredit = 0;
        $scope.TablePeriod.Footer.SumPreviousDisAgreeBSDebit = 0;
        $scope.TablePeriod.Footer.SumPreviousDisAgreeBSCredit = 0;
        $scope.TablePeriod.Footer.SumPreviousDisAgreePLDebit = 0;
        $scope.TablePeriod.Footer.SumPreviousDisAgreePLCredit = 0;

        Agree = _.where($scope.TablePeriod.PreviousTable, { IsAgree: 'Agree' });
        _.each(Agree, function (item) {
            let amount = _.where(item.SubAdjustment, { AdjustmentAgree: 'Agree', AdjustmentModel: 'BS', AdjustmentType: 'Debit' }).reduce((s, f) => {
                return s + parseFloat(f.Debit);
            }, 0);
            $scope.TablePeriod.Footer.SumPreviousAgreeBSDebit += amount;

            amount = _.where(item.SubAdjustment, { AdjustmentAgree: 'Agree', AdjustmentModel: 'BS', AdjustmentType: 'Credit' }).reduce((s, f) => {
                return s + parseFloat(f.Credit);
            }, 0);
            $scope.TablePeriod.Footer.SumPreviousAgreeBSCredit += amount;

            amount = _.where(item.SubAdjustment, { AdjustmentAgree: 'Agree', AdjustmentModel: 'PL', AdjustmentType: 'Debit' }).reduce((s, f) => {
                return s + parseFloat(f.Debit);
            }, 0);
            $scope.TablePeriod.Footer.SumPreviousAgreePLDebit += amount;

            amount = _.where(item.SubAdjustment, { AdjustmentAgree: 'Agree', AdjustmentModel: 'PL', AdjustmentType: 'Credit' }).reduce((s, f) => {
                return s + parseFloat(f.Credit);
            }, 0);
            $scope.TablePeriod.Footer.SumPreviousAgreePLCredit += amount;
        });

        DisAgree = _.where($scope.TablePeriod.PreviousTableDisAgree, { IsAgree: 'Disagree' });
        _.each(DisAgree, function (item) {
            let amount = _.where(item.SubAdjustment, { AdjustmentAgree: 'Disagree', AdjustmentModel: 'BS', AdjustmentType: 'Debit' }).reduce((s, f) => {
                return s + parseFloat(f.Debit);
            }, 0);
            $scope.TablePeriod.Footer.SumPreviousDisAgreeBSDebit += amount;

            amount = _.where(item.SubAdjustment, { AdjustmentAgree: 'Disagree', AdjustmentModel: 'BS', AdjustmentType: 'Credit' }).reduce((s, f) => {
                return s + parseFloat(f.Credit);
            }, 0);
            $scope.TablePeriod.Footer.SumPreviousDisAgreeBSCredit += amount;

            amount = _.where(item.SubAdjustment, { AdjustmentAgree: 'Disagree', AdjustmentModel: 'PL', AdjustmentType: 'Debit' }).reduce((s, f) => {
                return s + parseFloat(f.Debit);
            }, 0);
            $scope.TablePeriod.Footer.SumPreviousDisAgreePLDebit += amount;

            amount = _.where(item.SubAdjustment, { AdjustmentAgree: 'Disagree', AdjustmentModel: 'PL', AdjustmentType: 'Credit' }).reduce((s, f) => {
                return s + parseFloat(f.Credit);
            }, 0);
            $scope.TablePeriod.Footer.SumPreviousDisAgreePLCredit += amount;
        });

    }

    $scope.OnClickFilterAgree = function () {
        $scope.TablePeriod.Table = angular.copy($scope.TablePeriod.TableMain);

        $("#loading").fadeIn();

        if (($scope.Search.InputFilterAgree != undefined && $scope.Search.InputFilterAgree != "")) {

            $scope.TablePeriod.Table = _.filter($scope.TablePeriod.Table, function (item) {
                var c3 = false;
                item.SubAdjustmentAgree = _.filter(item.SubAdjustmentAgree, function (item1) {
                    var c1 = true, c2 = true;

                    if (($scope.Search.InputFilterAgree != undefined && $scope.Search.InputFilterAgree != "")) {

                        if ($scope.Search.InputFilterAgree != undefined && $scope.Search.InputFilterAgree != "" && item1.AccountCode != undefined && (item1.AccountCode).indexOf($scope.Search.InputFilterAgree) > -1)
                            c1 = true;
                        else if (item1.AccountCode == undefined || (item1.AccountCode).indexOf($scope.Search.InputFilterAgree) < 0)
                            c1 = false;

                        if ($scope.Search.InputFilterAgree != undefined && $scope.Search.InputFilterAgree != "" && item1.AccountName != undefined && (item1.AccountName).indexOf($scope.Search.InputFilterAgree) > -1)
                            c2 = true;
                        else if (item1.AccountName == undefined || (item1.AccountName).indexOf($scope.Search.InputFilterAgree) < 0)
                            c2 = false;
                    }

                    if (!c3) {
                        if ((c1 || c2)) {
                            c3 = true;
                            return item1;
                        }
                        else
                            c3 = false;
                    }
                });
                if (c3)
                    return item;
            });
        }

        $scope.OnSummary();
        $("#loading").fadeOut();
    }

    $scope.OnClickFilterDisAgree = function () {
        $scope.TablePeriod.TableDisAgree = angular.copy($scope.TablePeriod.TableDisAgreeMain);

        $("#loading").fadeIn();

        if (($scope.Search.InputFilterDisAgree != undefined && $scope.Search.InputFilterDisAgree != "")) {

            $scope.TablePeriod.TableDisAgree = _.filter($scope.TablePeriod.TableDisAgree, function (item) {
                var c3 = false;
                item.SubAdjustmentDisagree = _.filter(item.SubAdjustmentDisagree, function (item1) {
                    var c1 = true, c2 = true;

                    if (($scope.Search.InputFilterDisAgree != undefined && $scope.Search.InputFilterDisAgree != "")) {

                        if ($scope.Search.InputFilterDisAgree != undefined && $scope.Search.InputFilterDisAgree != "" && item1.AccountCode != undefined && (item1.AccountCode).indexOf($scope.Search.InputFilterDisAgree) > -1)
                            c1 = true;
                        else if (item1.AccountCode == undefined || (item1.AccountCode).indexOf($scope.Search.InputFilterDisAgree) < 0)
                            c1 = false;

                        if ($scope.Search.InputFilterDisAgree != undefined && $scope.Search.InputFilterDisAgree != "" && item1.AccountName != undefined && (item1.AccountName).indexOf($scope.Search.InputFilterDisAgree) > -1)
                            c2 = true;
                        else if (item1.AccountName == undefined || (item1.AccountName).indexOf($scope.Search.InputFilterDisAgree) < 0)
                            c2 = false;
                    }

                    if (!c3) {
                        if ((c1 || c2)) {
                            c3 = true;
                            return item1;
                        }
                        else
                            c3 = false;
                    }
                });
                if (c3)
                    return item;
            });
        }

        $scope.OnSummary();
        $("#loading").fadeOut();
    }

    /* Save Adjustmnet & Sub*/
    $scope.OnClickAdd = function (type, period) {
        if ($scope.Search.SelectPeriod != undefined) {
            var qq = $q.all([serviceParameter.getParameterTrialBalanceWithCustomerAndPeriod($scope.Search.SelectCustomer.CustomerId, $scope.Search.SelectPeriod.PeriodId)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                            $scope.Parameter.TrialBalance = data[0].data.responsedata;

                            $scope.TableAdd = {};
                            $scope.TableAdd.Action = 'เพิ่ม';
                            $scope.TableAdd.IsAgree = type;
                            $scope.TableAdd.IsPeriod = period;
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
                    AdjustmentPeriod: $scope.TableAdd.IsPeriod,
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
                $scope.TableAddSub.AdjustmentPeriod = $scope.TableAdd.IsPeriod;
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
                                var period = $scope.TableAdd.IsPeriod;
                                $scope.TableAdd = {};
                                $scope.TableAdd.Action = 'เพิ่ม';
                                $scope.TableAdd.IsAgree = type;
                                $scope.TableAdd.IsPeriod = period;
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

    $scope.OnClickConfirm = function () {
        try {
            var qq = $q.all([serviceAccount.deleteAccountAdjustment($scope.TableAdd.AdjustmentId)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            showSuccessText('ลบรายการเรียบร้อย');
                            $('#ModalConfirm').modal('hide');
                            $scope.TableAdd = {};
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

    $scope.OnClickTable = function (val) {
        if (val != undefined) {

            var qq = $q.all([serviceParameter.getParameterTrialBalanceWithCustomerAndPeriod($scope.Search.SelectCustomer.CustomerId, $scope.Search.SelectPeriod.PeriodId)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                            $scope.Parameter.TrialBalance = data[0].data.responsedata;

                            $scope.TableAdd = {};
                            $scope.TableAdd = angular.copy(val);
                            $scope.TableAdd.Action = 'แก้ไข';
                            $scope.OnClickSummarySub();
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
    }
});