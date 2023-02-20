angular.module('FOCUSAPP').controller('AccountFstoplistController', function ($stateParams, $rootScope, $state, $scope, $http, $timeout, $q, GlobalVar, globalService,
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
                        //if (data[0].data.responsecode == '200') {
                        //    $('#ModalCustomer').modal('show');
                        //    $("#selectcustomer").select2({
                        //        dropdownParent: $("#ModalCustomer")
                        //    });
                        //    $("#selectperiod").select2({
                        //        dropdownParent: $("#ModalCustomer")
                        //    });
                        //}
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

                var qq = $q.all([serviceAccount.getAccountPeriodsWithKey($scope.Search.SelectPeriod.PeriodId), serviceParameter.getParameterFSTopParentFSgroup()
                    , serviceParameter.getParameterFSGroupWithOwnerIsActiveForTrialBalance()]).then(function (data) {
                        try {
                            if (data[0] != undefined && data[0] != "") {
                                if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                                    $scope.TablePeriod = data[0].data.responsedata;
                                    $scope.FSTopList = data[1].data.responsedata;
                                    $scope.FSGroupList = data[2].data.responsedata;

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
                                    $scope.TablePeriod.MappingYear = $scope.TablePeriod.IsMapPeriod == 'Y' ? $scope.TablePeriod.MapYear : '-';
                                    $scope.TablePeriod.TableMain = $scope.TablePeriod.TrialBalance;

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
                                        // รวมยอด adjustment
                                        if ($scope.TablePeriod.SubAdjustments != undefined && $scope.TablePeriod.SubAdjustments.length > 0) {
                                            var agreeadjustment = _.where($scope.TablePeriod.SubAdjustments, { AdjustmentAgree: 'Agree', AdjustmentPeriod: 'Current' });
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

                                        // รวมยอด audit
                                        _.each($scope.TablePeriod.TableMain, function (item) {
                                            item.Audit = 0;
                                            item.Audit = parseFloat(item.Amount != undefined ? item.Amount : 0) + parseFloat(item.Debit != undefined ? item.Debit : 0);
                                            item.Audit = parseFloat(item.Audit != undefined ? item.Audit : 0) - parseFloat(item.Credit != undefined ? item.Credit : 0);
                                        });

                                        $scope.TablePeriod.Footer = {};
                                        $scope.OnBindingTab1();
                                        $scope.OnBindingTab2();
                                        $scope.OnBindingTab3();
                                        $scope.OnSummary();
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

    $scope.OnBindingTab1 = function () {
        $scope.TablePeriod.Asset = [];
        $scope.TablePeriod.NonAsset = [];

        //ดึงข้อมูล เฉพาะ FSTOP
        var assetlist = _.filter($scope.FSTopList, function (item) { if (item.FstopId == 1) return item; });
        var nonassetlist = _.filter($scope.FSTopList, function (item) { if (item.FstopId == 2) return item; });

        $scope.TablePeriod.Footer.Asset = {};
        $scope.Calculate(assetlist, $scope.TablePeriod.Asset, $scope.TablePeriod.Footer.Asset)
        $scope.TablePeriod.Asset= _.sortBy($scope.TablePeriod.Asset, 'Code');

        $scope.TablePeriod.Footer.NonAsset = {};
        $scope.Calculate(nonassetlist, $scope.TablePeriod.NonAsset, $scope.TablePeriod.Footer.NonAsset)
        $scope.TablePeriod.NonAsset = _.sortBy($scope.TablePeriod.NonAsset, 'Code');

        $scope.TablePeriod.Footer.SumAsset = {};
        $scope.TablePeriod.Footer.SumAsset.Current = $scope.TablePeriod.Footer.Asset.Current + $scope.TablePeriod.Footer.NonAsset.Current;
        $scope.TablePeriod.Footer.SumAsset.Debit = $scope.TablePeriod.Footer.Asset.Debit + $scope.TablePeriod.Footer.NonAsset.Debit;
        $scope.TablePeriod.Footer.SumAsset.Credit = $scope.TablePeriod.Footer.Asset.Credit + $scope.TablePeriod.Footer.NonAsset.Credit;
        $scope.TablePeriod.Footer.SumAsset.Audit = $scope.TablePeriod.Footer.Asset.Audit + $scope.TablePeriod.Footer.NonAsset.Audit;
        $scope.TablePeriod.Footer.SumAsset.Previous = $scope.TablePeriod.Footer.Asset.Previous + $scope.TablePeriod.Footer.NonAsset.Previous;
        $scope.TablePeriod.Footer.SumAsset.Move = $scope.TablePeriod.Footer.Asset.Move + $scope.TablePeriod.Footer.NonAsset.Move;
        $scope.TablePeriod.Footer.SumAsset.Percent = $scope.TablePeriod.Footer.SumAsset.Move != 0 && $scope.TablePeriod.Footer.SumAsset.Previous != 0 ? $scope.TablePeriod.Footer.SumAsset.Move / $scope.TablePeriod.Footer.SumAsset.Previous * 100 : 0;
    }

    $scope.OnBindingTab2 = function () {
        $scope.TablePeriod.Liabilities = [];
        $scope.TablePeriod.NonLiabilities = [];
        $scope.TablePeriod.Shareholder = [];

        //ดึงข้อมูล เฉพาะ FSTOP
        var liabilitieslist = _.filter($scope.FSTopList, function (item) { if (item.FstopId == 3) return item; });
        var nonliabilitieslist = _.filter($scope.FSTopList, function (item) { if (item.FstopId == 4) return item; });
        var sharelist = _.filter($scope.FSTopList, function (item) { if (item.FstopId == 5) return item; });

        $scope.TablePeriod.Footer.Liabilities = {};
        $scope.Calculate(liabilitieslist, $scope.TablePeriod.Liabilities, $scope.TablePeriod.Footer.Liabilities, true)
        $scope.TablePeriod.Liabilities = _.sortBy($scope.TablePeriod.Liabilities, 'Code');

        $scope.TablePeriod.Footer.NonLiabilities = {};
        $scope.Calculate(nonliabilitieslist, $scope.TablePeriod.NonLiabilities, $scope.TablePeriod.Footer.NonLiabilities, true)
        $scope.TablePeriod.NonLiabilities = _.sortBy($scope.TablePeriod.NonLiabilities, 'Code');

        $scope.TablePeriod.Footer.Shareholder = {};
        $scope.Calculate(sharelist, $scope.TablePeriod.Shareholder, $scope.TablePeriod.Footer.Shareholder, true)
        $scope.TablePeriod.Shareholder = _.sortBy($scope.TablePeriod.Shareholder, 'Code');

        $scope.TablePeriod.Footer.SumLiabilities = {};
        $scope.TablePeriod.Footer.SumLiabilities.Current = $scope.TablePeriod.Footer.Liabilities.Current + $scope.TablePeriod.Footer.NonLiabilities.Current;
        $scope.TablePeriod.Footer.SumLiabilities.Debit = $scope.TablePeriod.Footer.Liabilities.Debit + $scope.TablePeriod.Footer.NonLiabilities.Debit;
        $scope.TablePeriod.Footer.SumLiabilities.Credit = $scope.TablePeriod.Footer.Liabilities.Credit + $scope.TablePeriod.Footer.NonLiabilities.Credit;
        $scope.TablePeriod.Footer.SumLiabilities.Audit = $scope.TablePeriod.Footer.Liabilities.Audit + $scope.TablePeriod.Footer.NonLiabilities.Audit;
        $scope.TablePeriod.Footer.SumLiabilities.Previous = $scope.TablePeriod.Footer.Liabilities.Previous + $scope.TablePeriod.Footer.NonLiabilities.Previous;
        $scope.TablePeriod.Footer.SumLiabilities.Move = $scope.TablePeriod.Footer.Liabilities.Move + $scope.TablePeriod.Footer.NonLiabilities.Move;
        $scope.TablePeriod.Footer.SumLiabilities.Percent = $scope.TablePeriod.Footer.SumLiabilities.Move != 0 && $scope.TablePeriod.Footer.SumLiabilities.Previous != 0 ?
            $scope.TablePeriod.Footer.SumLiabilities.Move / $scope.TablePeriod.Footer.SumLiabilities.Previous * 100 : 0;

        //SumLiqShare
        $scope.TablePeriod.Footer.SumLiqShare = {};
        $scope.TablePeriod.Footer.SumLiqShare.Current = $scope.TablePeriod.Footer.SumLiabilities.Current + $scope.TablePeriod.Footer.Shareholder.Current;
        $scope.TablePeriod.Footer.SumLiqShare.Debit = $scope.TablePeriod.Footer.SumLiabilities.Debit + $scope.TablePeriod.Footer.Shareholder.Debit;
        $scope.TablePeriod.Footer.SumLiqShare.Credit = $scope.TablePeriod.Footer.SumLiabilities.Credit + $scope.TablePeriod.Footer.Shareholder.Credit;
        $scope.TablePeriod.Footer.SumLiqShare.Audit = $scope.TablePeriod.Footer.SumLiabilities.Audit + $scope.TablePeriod.Footer.Shareholder.Audit;
        $scope.TablePeriod.Footer.SumLiqShare.Previous = $scope.TablePeriod.Footer.SumLiabilities.Previous + $scope.TablePeriod.Footer.Shareholder.Previous;
        $scope.TablePeriod.Footer.SumLiqShare.Move = $scope.TablePeriod.Footer.SumLiabilities.Move + $scope.TablePeriod.Footer.Shareholder.Move;
        $scope.TablePeriod.Footer.SumLiqShare.Percent = $scope.TablePeriod.Footer.SumLiqShare.Move != 0 && $scope.TablePeriod.Footer.SumLiqShare.Previous != 0 ?
            $scope.TablePeriod.Footer.SumLiqShare.Move / $scope.TablePeriod.Footer.SumLiqShare.Previous * 100 : 0;
    }

    $scope.OnBindingTab3 = function () {
        $scope.TablePeriod.Revenues = [];
        $scope.TablePeriod.Expenses = [];
        $scope.TablePeriod.Financecosts = [];

        //ดึงข้อมูล เฉพาะ FSTOP
        var revenueslist = _.filter($scope.FSTopList, function (item) { if (item.FstopId == 6) return item; });
        var expenseslist = _.filter($scope.FSTopList, function (item) { if (item.FstopId == 7) return item; });
        var financecostslist = _.filter($scope.FSTopList, function (item) { if (item.FstopId == 8) return item; });

        $scope.TablePeriod.Footer.Revenues = {};
        $scope.Calculate(revenueslist, $scope.TablePeriod.Revenues, $scope.TablePeriod.Footer.Revenues, true)
        $scope.TablePeriod.Revenues = _.sortBy($scope.TablePeriod.Revenues, 'Code');

        $scope.TablePeriod.Footer.Expenses = {};
        $scope.Calculate(expenseslist, $scope.TablePeriod.Expenses, $scope.TablePeriod.Footer.Expenses)
        $scope.TablePeriod.Expenses = _.sortBy($scope.TablePeriod.Expenses, 'Code');

        $scope.TablePeriod.Footer.Financecosts = {};
        $scope.Calculate(financecostslist, $scope.TablePeriod.Financecosts, $scope.TablePeriod.Footer.Financecosts)
        $scope.TablePeriod.Financecosts = _.sortBy($scope.TablePeriod.Financecosts, 'Code');

        $scope.TablePeriod.Footer.SumEarnings = {};
        $scope.TablePeriod.Footer.SumEarnings.Current = $scope.TablePeriod.Footer.Revenues.Current - $scope.TablePeriod.Footer.Expenses.Current;
        $scope.TablePeriod.Footer.SumEarnings.Debit = $scope.TablePeriod.Footer.Revenues.Debit + $scope.TablePeriod.Footer.Expenses.Debit;
        $scope.TablePeriod.Footer.SumEarnings.Credit = $scope.TablePeriod.Footer.Revenues.Credit + $scope.TablePeriod.Footer.Expenses.Credit;
        $scope.TablePeriod.Footer.SumEarnings.Audit = $scope.TablePeriod.Footer.Revenues.Audit - $scope.TablePeriod.Footer.Expenses.Audit;
        $scope.TablePeriod.Footer.SumEarnings.Previous = $scope.TablePeriod.Footer.Revenues.Previous - $scope.TablePeriod.Footer.Expenses.Previous;
        $scope.TablePeriod.Footer.SumEarnings.Move = $scope.TablePeriod.Footer.Revenues.Move - $scope.TablePeriod.Footer.Expenses.Move;
        $scope.TablePeriod.Footer.SumEarnings.Percent = $scope.TablePeriod.Footer.Revenues.Move != 0 && $scope.TablePeriod.Footer.Expenses.Previous != 0 ?
            $scope.TablePeriod.Footer.SumEarnings.Move / $scope.TablePeriod.Footer.SumEarnings.Previous * 100 : 0;

        //SumLiqShare
        $scope.TablePeriod.Footer.NetProfit = {};
        $scope.TablePeriod.Footer.NetProfit.Current = $scope.TablePeriod.Footer.SumEarnings.Current - $scope.TablePeriod.Footer.Financecosts.Current;
        $scope.TablePeriod.Footer.NetProfit.Debit = $scope.TablePeriod.Footer.SumEarnings.Debit + $scope.TablePeriod.Footer.Financecosts.Debit;
        $scope.TablePeriod.Footer.NetProfit.Credit = $scope.TablePeriod.Footer.SumEarnings.Credit + $scope.TablePeriod.Footer.Financecosts.Credit;
        $scope.TablePeriod.Footer.NetProfit.Audit = $scope.TablePeriod.Footer.SumEarnings.Audit - $scope.TablePeriod.Footer.Financecosts.Audit;
        $scope.TablePeriod.Footer.NetProfit.Previous = $scope.TablePeriod.Footer.SumEarnings.Previous - $scope.TablePeriod.Footer.Financecosts.Previous;
        $scope.TablePeriod.Footer.NetProfit.Move = $scope.TablePeriod.Footer.SumEarnings.Move - $scope.TablePeriod.Footer.Financecosts.Move;
        $scope.TablePeriod.Footer.NetProfit.Percent = $scope.TablePeriod.Footer.NetProfit.Move != 0 && $scope.TablePeriod.Footer.NetProfit.Previous != 0 ?
            $scope.TablePeriod.Footer.NetProfit.Move / $scope.TablePeriod.Footer.NetProfit.Previous * 100 : 0;
    }

    $scope.Calculate = function (table, keep, footer, convert = false) {

        var current = 0; var dr = 0; var cr = 0; var audit = 0; var last = 0; var move = 0; var smove = 0; var per = 0;

        _.each(table, function (item) {
            var fsgroup = _.where($scope.FSGroupList, { FsgroupId: item.FsgroupId })[0];
            if (fsgroup != undefined) {
                var trialinfs = _.where($scope.TablePeriod.TableMain, { FsgroupId: item.FsgroupId });
                var datas = {};
                datas.FsgroupId = fsgroup.FsgroupId;
                datas.Code = fsgroup.Code;
                datas.Name = fsgroup.Name;
                //Current
                let amount = trialinfs.reduce((s, f) => {
                    return s + parseFloat(f.Amount);
                }, 0);
                datas.Current = convert ? amount * (-1) : amount;
                current += convert ? amount * (-1) : amount;
                //Debit
                amount = trialinfs.reduce((s, f) => {
                    return s + parseFloat(f.Debit == undefined ? 0 : f.Debit);
                }, 0);
                datas.Debit = amount;
                dr += amount;
                //Credit
                amount = trialinfs.reduce((s, f) => {
                    return s + parseFloat(f.Credit == undefined ? 0 : f.Credit);
                }, 0);
                datas.Credit = amount;
                cr += amount;
                //Audit
                amount = trialinfs.reduce((s, f) => {
                    return s + parseFloat(f.Audit == undefined ? 0 : f.Audit);
                }, 0);
                datas.Audit = convert ? amount * (-1) : amount;;
                audit += convert ? amount * (-1) : amount;
                //Previous
                amount = trialinfs.reduce((s, f) => {
                    return s + parseFloat(f.PreviousYear == undefined ? 0 : f.PreviousYear);
                }, 0);
                datas.Previous = convert ? amount * (-1) : amount;
                last += convert ? amount * (-1) : amount;
                //Move
                move = datas.Audit - datas.Previous;
                datas.Move = move;
                smove += move;
                //Percent
                per = move != 0 && datas.Previous != 0 ? move / datas.Previous : 0;
                datas.Percent = per * 100;
                keep.push(datas);
            }
        });
        footer.Current = current;
        footer.Debit = dr;
        footer.Credit = cr;
        footer.Audit = audit;
        footer.Previous = last;
        footer.Move = smove;
        footer.Percent = smove != 0 ? smove / last * 100 : 0;

       
        globalService.SetupSequence(keep);
    }

    $scope.OnSummary = function () {
        $scope.TablePeriod.Footer.Shareholder.Current = $scope.TablePeriod.Footer.Shareholder.Current + $scope.TablePeriod.Footer.NetProfit.Current;
        $scope.TablePeriod.Footer.Shareholder.Debit = $scope.TablePeriod.Footer.Shareholder.Debit + $scope.TablePeriod.Footer.NetProfit.Debit;
        $scope.TablePeriod.Footer.Shareholder.Credit = $scope.TablePeriod.Footer.Shareholder.Credit + $scope.TablePeriod.Footer.NetProfit.Credit;
        $scope.TablePeriod.Footer.Shareholder.Audit = $scope.TablePeriod.Footer.Shareholder.Audit + $scope.TablePeriod.Footer.NetProfit.Audit;
        $scope.TablePeriod.Footer.Shareholder.Previous = $scope.TablePeriod.Footer.Shareholder.Previous + $scope.TablePeriod.Footer.NetProfit.Previous;
        $scope.TablePeriod.Footer.Shareholder.Move = $scope.TablePeriod.Footer.Shareholder.Move + $scope.TablePeriod.Footer.NetProfit.Move;
        $scope.TablePeriod.Footer.Shareholder.Percent = $scope.TablePeriod.Footer.Shareholder.Move != 0 && $scope.TablePeriod.Footer.Shareholder.Previous != 0 ?
            $scope.TablePeriod.Footer.Shareholder.Move / $scope.TablePeriod.Footer.Shareholder.Previous * 100 : 0;

        $scope.TablePeriod.Footer.SumLiqShare = {};
        $scope.TablePeriod.Footer.SumLiqShare.Current = $scope.TablePeriod.Footer.SumLiabilities.Current + $scope.TablePeriod.Footer.Shareholder.Current;
        $scope.TablePeriod.Footer.SumLiqShare.Debit = $scope.TablePeriod.Footer.SumLiabilities.Debit + $scope.TablePeriod.Footer.Shareholder.Debit;
        $scope.TablePeriod.Footer.SumLiqShare.Credit = $scope.TablePeriod.Footer.SumLiabilities.Credit + $scope.TablePeriod.Footer.Shareholder.Credit;
        $scope.TablePeriod.Footer.SumLiqShare.Audit = $scope.TablePeriod.Footer.SumLiabilities.Audit + $scope.TablePeriod.Footer.Shareholder.Audit;
        $scope.TablePeriod.Footer.SumLiqShare.Previous = $scope.TablePeriod.Footer.SumLiabilities.Previous + $scope.TablePeriod.Footer.Shareholder.Previous;
        $scope.TablePeriod.Footer.SumLiqShare.Move = $scope.TablePeriod.Footer.SumLiabilities.Move + $scope.TablePeriod.Footer.Shareholder.Move;
        $scope.TablePeriod.Footer.SumLiqShare.Percent = $scope.TablePeriod.Footer.SumLiqShare.Move != 0 && $scope.TablePeriod.Footer.SumLiqShare.Previous != 0 ?
            $scope.TablePeriod.Footer.SumLiqShare.Move / $scope.TablePeriod.Footer.SumLiqShare.Previous * 100 : 0;
    }

    $scope.OnClickAuditFSGroup = function (val) {
        if ($scope.TablePeriod.IsAudit == 'No')
            $('#ModalConfirm').modal('show');
        else
            $state.go('account-fsleadlist', { ref_id: val.Code });
    }

    $scope.OnClickBeforeAudit = function () {
        try {
            $("#loading").fadeIn();
            var data = {};
            data.PeriodId = $scope.TablePeriod.PeriodId;
            console.log(data);
            var qq = $q.all([serviceAccount.postConfirmBeForeAudit(data)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            showSuccessText('ดำเนินรายการเรียบร้อย');
                            $scope.OnClickChangePeriod();
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

});