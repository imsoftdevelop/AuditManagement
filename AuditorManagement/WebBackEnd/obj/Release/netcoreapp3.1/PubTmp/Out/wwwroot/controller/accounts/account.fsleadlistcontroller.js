angular.module('FOCUSAPP').controller('AccountFsleadlistController', function ($stateParams, $rootScope, $state, $scope, $http, $timeout, $q, GlobalVar, globalService,
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
                        //    $("#selectfsgroup").select2({
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
        catch (err) {
            $scope.Search.SelectPeriod = undefined
            showWariningToast(err);
        }
        finally {
            $("#loading").fadeOut();
        }
    }

    $scope.OnClickAddRedirectPeriod = function () {
        $state.go('account-periodaccountlist');
        $('#ModalPeriod').modal('hide');
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
           
            if ($scope.Search.SelectCustomer != undefined && $scope.Search.SelectPeriod != undefined) {
                var qq = $q.all([serviceParameter.getParameterAuditFSGroup($scope.Search.SelectPeriod.PeriodId), globalService.getProfile()]).then(function (data) {
                    try {
                       
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                                $scope.Parameter.FSGroup = data[0].data.responsedata;
                                $scope.UserProfiles = data[1].data.responsedata;
                                if ($scope.TablePeriod.IsAudit == 'No')
                                    $('#ModalValidate').modal('show');
                                else {

                                    if ($stateParams.ref_id != undefined && $stateParams.ref_id != '') {
                                        var type = $scope.Parameter.FSGroup.filter(function (item) { return item.Code == $stateParams.ref_id; });
                                        if (type.length > 0)
                                            $scope.Search.SelectFsGroup = type[0];
                                        $scope.OnClickFSGroup();
                                    }
                                    else if ($scope.UserProfiles.FSGroupIdActive == undefined || $scope.UserProfiles.FSGroupIdActive == '') {
                                        $('#ModalFSGroup').modal('show');
                                        $("#selectfsgroup").select2({
                                            dropdownParent: $("#ModalFSGroup")
                                        });
                                    }
                                    else {
                                        var type = $scope.Parameter.FSGroup.filter(function (item) { return item.FsgroupId == $scope.UserProfiles.FSGroupIdActive; });
                                        if (type.length > 0)
                                            $scope.Search.SelectFsGroup = type[0];
                                        $scope.OnClickFSGroup();
                                    }
                                }
                            }
                            else if (data[0].data.responsecode == '200' )
                            { 
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
            else {
                $scope.Search.SelectFSGroup = undefined;
                $scope.Parameter.FSGroup = [];
            }
        }
        catch (err) {
            showWariningToast(err);
        }
        finally {
            $("#loading").fadeOut();
        }
    }

    $scope.OnClickDirectFSTop = function () {
        $state.go('account-fstoplist');
        $('#ModalValidate').modal('hide');
    }

    $scope.OnClickNewPeriod = function () {
        $('#ModalValidate').modal('hide');
        $('#ModalPeriod').modal('show');
    }

    $scope.OnClickModalFSGroup = function () {
        try {

            $http.get(baseURL + "Authen/SelectFSGroup?ref_key=" + makeid() + '&ref_id=' + $scope.Search.SelectFsGroup.FsgroupId)
                .then(function (response) {
                    if (response.data.responsecode == '200' && response.data.responsedata != undefined && response.data.responsedata != "") {
                        $scope.UserProfiles = response.data.responsedata; console.log($scope.UserProfiles);
                        $('#ModalFSGroup').modal('hide');
                        $scope.OnClickFSGroup();
                        
                        $("#loading").fadeOut();
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

    $scope.OnClickFSGroup = function () {
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
                                    
                                    
                                    $scope.TablePeriod.FsSelect = {};
                                    $scope.TablePeriod.FsSelect = _.where($scope.TablePeriod.FSGroups, { FsgroupId: $scope.Search.SelectFsGroup.FsgroupId })[0];

                                    $scope.TablePeriod.AccountSelect = {};
                                    $scope.TablePeriod.AccountSelect = _.where($scope.TablePeriod.Accounts, { FsgroupId: $scope.Search.SelectFsGroup.FsgroupId });
                                    _.each($scope.TablePeriod.AccountSelect, function (item) {
                                        var account = _.where($scope.TablePeriod.TableMain, { TrialBalanceId: item.TrialBalanceId })[0];
                                        if (account != undefined) {
                                            item.Code = account.AccountCode;
                                            item.Name = account.AccountName;
                                            item.Current = account.Amount;
                                            item.Debit = account.Debit != undefined ? account.Debit : 0;
                                            item.Credit = account.Credit != undefined ? account.Credit : 0;
                                            item.Audit = account.Audit;
                                            item.Previous = account.PreviousYear;
                                            item.Move = account.Audit - account.PreviousYear;
                                            item.Percent = item.Move == 0 || account.PreviousYear == 0 ? 0 : item.Move / account.PreviousYear * 100;
                                        }

                                        if ($scope.UserProfiles.PermissionCodeActive == 'ASSIS001') {
                                            if (item.PrepareStatus != undefined && item.PrepareStatus != '') {
                                                if (item.ReveiwedStatus != undefined && item.ReveiwedStatus != '' && item.ReveiwedStatus == 'Confirm')
                                                    item.Status = 'Lock';
                                                else
                                                    item.Status = item.PrepareStatus;
                                            }
                                        }
                                        else if ($scope.UserProfiles.PermissionCodeActive == 'ASSIS002') {
                                            if (item.ReveiwedStatus != undefined && item.ReveiwedStatus != '') {
                                                if (item.AuditorStatus != undefined && item.AuditorStatus != '' && item.AuditorStatus == 'Confirm')
                                                    item.Status = 'Lock';
                                                else
                                                    item.Status = item.ReveiwedStatus;
                                            }
                                        }
                                        else if ($scope.UserProfiles.PermissionCodeActive == 'AUDIT001') {
                                            if (item.AuditorStatus != undefined && item.AuditorStatus != '') {
                                                item.Status = item.AuditorStatus;
                                            }
                                        }

                                    });

                                    globalService.SetupSequence($scope.TablePeriod.AccountSelect);
                                    $scope.TablePeriod.Footer = {};
                                    let amount = $scope.TablePeriod.AccountSelect.reduce((s, f) => {
                                        return s + parseFloat(f.Current);
                                    }, 0);
                                    $scope.TablePeriod.Footer.Current = amount;

                                    amount = $scope.TablePeriod.AccountSelect.reduce((s, f) => {
                                        return s + parseFloat(f.Debit);
                                    }, 0);
                                    $scope.TablePeriod.Footer.Debit = amount;

                                    amount = $scope.TablePeriod.AccountSelect.reduce((s, f) => {
                                        return s + parseFloat(f.Credit);
                                    }, 0);
                                    $scope.TablePeriod.Footer.Credit = amount;

                                    amount = $scope.TablePeriod.AccountSelect.reduce((s, f) => {
                                        return s + parseFloat(f.Audit);
                                    }, 0);
                                    $scope.TablePeriod.Footer.Audit = amount;

                                    amount = $scope.TablePeriod.AccountSelect.reduce((s, f) => {
                                        return s + parseFloat(f.Previous);
                                    }, 0);
                                    $scope.TablePeriod.Footer.Previous = amount;

                                    $scope.TablePeriod.Footer.Move = $scope.TablePeriod.Footer.Audit - $scope.TablePeriod.Footer.Previous;
                                    $scope.TablePeriod.Footer.Percent = $scope.TablePeriod.Footer.Move != 0 && $scope.TablePeriod.Footer.Previous != 0 ? $scope.TablePeriod.Footer.Move / $scope.TablePeriod.Footer.Previous * 100 : 0;

                                    $scope.itemsPerPage = "10";
                                    $scope.Search.SelectStatus = "All";
                                    globalService.SetupSequence($scope.TablePeriod.FsSelect.Policys);
                                    $scope.retpage = [];
                                    $scope.range();


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

    $scope.OnClickAuditSubLead = function (val) {
        $state.go('account-subfsleadlist', { ref_id: val.AuditAccountId, ref_group: val.FsgroupId });
    }

    $scope.OnClickSaveFSLead = function () {
        try {
            $("#loading").fadeIn();
            var data = {
                AuditFSGroupId: $scope.TablePeriod.FsSelect.AuditFsgroupId,
                IsConclusion: $scope.TablePeriod.FsSelect.IsConclusion,
                ConclusionDesc: $scope.TablePeriod.FsSelect.ConclusionDesc,
                AuditComment: $scope.TablePeriod.FsSelect.AuditComment,
            };

            data.Policys = [];
            _.each($scope.TablePeriod.FsSelect.Policys, function (item) {
                var poli = {
                    AuditPolicyId: item.AuditPolicyId,
                    AuditFsgroupId: item.AuditFsgroupId,
                    AuditPolicyRefCode: item.AuditPolicyRefCode,
                    Subject: item.Subject,
                    Description: item.Description,
                    IsDelete: item.IsDelete
                };
                data.Policys.push(poli);
            });

            console.log(data);
            var qq = $q.all([serviceAccount.postAccountFSLead(data)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            showSuccessText('บันทึกรายการเรียบร้อย');
                            $scope.OnClickFSGroup();
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
        }
        finally {
            $("#loading").fadeOut();
        }
    }

    $scope.OnClickAddPolicy = function () {
        $scope.TableAdd = {};
        $('#ModalPolicy').modal('show');
    }

    $scope.OnClickSavePolicy = function (action) {
        try {
            if ($scope.TableAdd.Subject == undefined || $scope.TableAdd.Subject == '')
                throw "กรุณาระบุหัวข้อ";
            else if ($scope.TableAdd.Description == undefined || $scope.TableAdd.Description == '')
                throw "กรุณาระบุรายละเอียด";
            else {


                if ($scope.TablePeriod.FsSelect.Policys == undefined)
                    $scope.TablePeriod.FsSelect.Policys = [];

                if ($scope.TableAdd.index != undefined) {
                    var val = $scope.TablePeriod.FsSelect.Policys[$scope.TableAdd.index];
                    val.Subject = $scope.TableAdd.Subject;
                    val.Description = $scope.TableAdd.Description;
                    val.AuditPolicyRefCode = $scope.TableAdd.AuditPolicyRefCode;
                }
                else {
                    var data = {
                        AuditPolicyId: $scope.TableAdd.AuditPolicyId,
                        AuditFsgroupId: $scope.TablePeriod.FsSelect.AuditFsgroupId,
                        AuditPolicyRefCode: $scope.TableAdd.AuditPolicyRefCode,
                        Subject: $scope.TableAdd.Subject,
                        Description: $scope.TableAdd.Description,
                        IsDelete: 'No'
                    };
                    $scope.TablePeriod.FsSelect.Policys.push(data);
                }

                $scope.itemsPerPage = "10";
                $scope.Search.SelectStatus = "All";
                globalService.SetupSequence($scope.TablePeriod.FsSelect.Policys);
                $scope.retpage = [];
                $scope.range();

                if (action == 'close') {
                    $('#ModalPolicy').modal('hide');
                } $scope.TableAdd = {};
            }
        }
        catch (ex) {
            showWariningToast(ex);
        }
    }

    $scope.OnClickDeletePolicy = function (index, values) {
        try {
            if (values != undefined) {
                if (values.AuditPolicyId != undefined)
                    values.IsDelete = 'Yes';
                else
                    $scope.TablePeriod.FsSelect.Policys.splice(index, 1);

                globalService.SetupSequence($scope.TablePeriod.FsSelect.Policys);
            }
        }
        catch (ex) {
            showErrorToast(ex);
        }
    }

    $scope.OnClickUpdatePolicy = function (index, values) {
        $scope.TableAdd = {};
        $scope.TableAdd = angular.copy(values);
        $scope.TableAdd.index = index;
        $('#ModalPolicy').modal('show');
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
        return $scope.TablePeriod.FsSelect != undefined? Math.ceil($scope.TablePeriod.FsSelect.Policys.length / parseInt($scope.itemsPerPage)) - 1 : 0;
    };

    $scope.range = function () {
        $scope.itemsCount = $scope.TablePeriod.FsSelect !=undefined? $scope.TablePeriod.FsSelect.Policys.length : 0;
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