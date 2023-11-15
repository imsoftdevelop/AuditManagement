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
        $('#ModalPeriod').modal('hide');
        $('#ModalFSGroup').modal('hide');

        $state.go('account-periodaccountlist');
    }

    $scope.OnClickChangePeriod = function () { //เปลี่ยนรอบบัญชี
        $('#ModalPeriod').modal('show');
        $("#selecrperiod").select2({
            dropdownParent: $("#ModalPeriod")
        });
    }

    $scope.OnClickModalPeriod = function () { //คลิกจาก popup รอบบัญชี
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
                        $scope.IsError = $scope.Error = undefined;
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
                            else if (data[0].data.responsecode == '200') {
                                $scope.Error = 'กรุณากดปุ่มยืนยัน ตรวจสอบบัญชี หน้าจอ FS Top';
                                $scope.IsError = 'Period';
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

    $scope.OnChangeFSGroup = function () {
        $('#ModalFSGroup').modal('show');
        $("#selectfsgroup").select2({
            dropdownParent: $("#ModalFSGroup")
        });
    }

    $scope.OnClickFSGroup = function () {
        try {
            $("#loading").fadeIn();
            $scope.Error = undefined;
            if ($scope.Search.SelectPeriod == undefined)
                throw "กรุณาเลือกรอบบัญชี";
            else if ($scope.Search.SelectCustomer != undefined && $scope.Search.SelectPeriod != undefined) {
                var qq = $q.all([serviceAccount.getAccountPeriodsWithKey($scope.Search.SelectPeriod.PeriodId)
                    , serviceParameter.getParameterFSTopParentFSgroup()
                    , serviceParameter.getParameterFSGroupWithOwnerIsActiveForTrialBalance()
                    , serviceParameter.getParameterSubFSGroup()]).then(function (data) {
                        try {
                            if (data[0] != undefined && data[0] != "") {
                                if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                                    $scope.TablePeriod = data[0].data.responsedata;
                                    $scope.FSTopList = data[1].data.responsedata;
                                    $scope.FSGroupList = data[2].data.responsedata;
                                    $scope.Parameter.SubFSGroupList = data[3].data.responsedata;

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
                                                if (item.ReveiwedStatus != undefined && item.ReveiwedStatus != '' && item.ReveiwedStatus == 'Confirm'
                                                    && $scope.TablePeriod.FsSelect.PrepareStatus == 'Confirm')
                                                    item.Status = 'Lock';
                                                else
                                                    item.Status = item.PrepareStatus;
                                            }
                                        }
                                        else if ($scope.UserProfiles.PermissionCodeActive == 'ASSIS002') {
                                            if (item.ReveiwedStatus != undefined && item.ReveiwedStatus != '') {
                                                if (item.AuditorStatus != undefined && item.AuditorStatus != '' && item.AuditorStatus == 'Confirm'
                                                    && $scope.TablePeriod.FsSelect.ReveiwedStatus == 'Confirm')
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
                                    if ($scope.TablePeriod.FsSelect.Policys != undefined && $scope.TablePeriod.FsSelect.Policys.length > 0) {
                                        globalService.SetupSequence($scope.TablePeriod.FsSelect.Policys);
                                        _.each($scope.TablePeriod.FsSelect.Policys, function (item) {
                                            item.IsPrint = item.IsPrint == 'Yes' ? true : false;
                                        })
                                        $scope.retpage = [];
                                        $scope.range();
                                    }


                                    $scope.itemsPerPage_1 = "10";
                                    if ($scope.TablePeriod.FsSelect.NoteToFS != undefined && $scope.TablePeriod.FsSelect.NoteToFS.length > 0) {
                                        globalService.SetupSequence($scope.TablePeriod.FsSelect.NoteToFS);
                                        _.each($scope.TablePeriod.FsSelect.NoteToFS, function (item) {
                                            item.IsPrint = item.IsPrint == 'Yes' ? true : false;
                                        })
                                        $scope.retpage_1 = [];
                                        $scope.range_1();
                                    }



                                    if ($scope.UserProfiles.PermissionCodeActive == 'ASSIS001') {
                                        if ($scope.TablePeriod.FsSelect.PrepareStatus != undefined && $scope.TablePeriod.FsSelect.PrepareStatus != '') {
                                            if ($scope.TablePeriod.FsSelect.ReveiwedStatus != undefined && $scope.TablePeriod.FsSelect.ReveiwedStatus != '' && $scope.TablePeriod.FsSelect.ReveiwedStatus == 'Confirm'
                                                && $scope.TablePeriod.FsSelect.PrepareStatus == 'Confirm')
                                                $scope.TablePeriod.FsSelect.Status = 'Lock';
                                            else
                                                $scope.TablePeriod.FsSelect.Status = $scope.TablePeriod.FsSelect.PrepareStatus;
                                        }
                                    }
                                    else if ($scope.UserProfiles.PermissionCodeActive == 'ASSIS002') {
                                        if ($scope.TablePeriod.FsSelect.ReveiwedStatus != undefined && $scope.TablePeriod.FsSelect.ReveiwedStatus != '') {
                                            if ($scope.TablePeriod.FsSelect.AuditorStatus != undefined && $scope.TablePeriod.FsSelect.AuditorStatus != '' && $scope.TablePeriod.FsSelect.AuditorStatus == 'Confirm'
                                                && $scope.TablePeriod.FsSelect.ReveiwedStatus == 'Confirm')
                                                $scope.TablePeriod.FsSelect.Status = 'Lock';
                                            else
                                                $scope.TablePeriod.FsSelect.Status = $scope.TablePeriod.FsSelect.ReveiwedStatus;
                                        }
                                    }
                                    else if ($scope.UserProfiles.PermissionCodeActive == 'AUDIT001') {
                                        if ($scope.TablePeriod.FsSelect.AuditorStatus != undefined && $scope.TablePeriod.FsSelect.AuditorStatus != '') {
                                            $scope.TablePeriod.FsSelect.Status = $scope.TablePeriod.FsSelect.AuditorStatus;
                                        }
                                    }

                                    if ($scope.TablePeriod.FsSelect.Events != undefined && $scope.TablePeriod.FsSelect.Events.length > 0) {
                                        globalService.SetupSequence($scope.TablePeriod.FsSelect.Events);
                                        _.each($scope.TablePeriod.FsSelect.Events, function (item) {
                                            item.CreatedOn = formatDateFull(item.CreatedOn);

                                            if (item.Seq % 2 == 0)
                                                item.Align = 'left';
                                            else
                                                item.Align = 'right';

                                            if (item.IsEvent == 'Confirm')
                                                item.IsStatusDesc = 'ยืนยันการตรวจสอบ'
                                            else
                                                item.IsStatusDesc = 'ย้อนตรวจสอบข้อมูลใหม่'
                                        })
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
                    IsDelete: item.IsDelete,
                    IsPrint: item.IsPrint ? 'Yes' : 'No'
                };
                data.Policys.push(poli);
            });

            data.NoteToFS = [];
            _.each($scope.TablePeriod.FsSelect.NoteToFS, function (item) {
                var poli = {
                    AuditNoteFsid: item.AuditNoteFsid,
                    AuditFsgroupId: item.AuditFsgroupId,
                    IsPrint: item.IsPrint ? 'Yes' : 'No'
                };
                data.NoteToFS.push(poli);
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
                        IsDelete: 'No',
                        IsPrint: 'Yes'
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

    $scope.OnClickConfirmWorkflow = function (status) {
        var check = true;
        //_.each($scope.TablePeriod.AccountSelect, function (item) {
        //    if (item.Status != 'Confirm') check = false;
        //});

        //if (!check) {
        //    $scope.Error = 'ไม่สามารถ Confirm ได้เนื่องจากตรวจรายการ Sub Lead ไม่สมบูรณ์';
        //    $scope.IsError = 'SubLead';
        //    $('#ModalValidate').modal('show');
        //}
        //else {
        $scope.TableAdd = {};
        $scope.TableAdd.Date = GetDatetimeNow();
        $scope.TableAdd.IsStatus = status;

        $('#ModalConfirm').modal('show');
        //}
    }

    $scope.OnClickModalConfirmWorkflow = function () {
        try {
            $("#loading").fadeIn();
            if ($scope.TablePeriod.FsSelect.ConclusionDesc == undefined || $scope.TablePeriod.FsSelect.ConclusionDesc == '')
                throw "กรุณาระบุ Audit Conclusion";
            else {
                var data = {
                    AuditFsgroupId: $scope.TablePeriod.FsSelect.AuditFsgroupId,
                    IsStatus: $scope.TableAdd.IsStatus,
                };

                console.log(data);
                var qq = $q.all([serviceAccount.postAccountAuditFSGroupChangeStatus(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                showSuccessText('บันทึกรายการเรียบร้อย');
                                $('#ModalConfirm').modal('hide');
                                $scope.OnClickFSGroup();
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

    $scope.OnClickAddNoteFS = function (type) {
        $scope.TableAdd = {};
        $scope.TableAdd.NoteFstype = type;
        if (type == 'Get')
            $('#ModalNoteFSGet').modal('show');
        else if (type == 'Table')
            $('#ModalNoteFSTable').modal('show');
        else if (type == 'Paragraph')
            $('#ModalNoteFSParagraph').modal('show');
        else if (type == 'Excel') {
            initdropify('');
            $('#ModalNoteFSUpload').modal('show');
        }
    }

    $scope.OnClickSaveNoteFSParaGraph = function (action) {
        try {
            if ($scope.TableAdd.NoteDetail == undefined || $scope.TableAdd.NoteDetail == '')
                throw "กรุณาระบุรายละเอียด";
            else {
                var data = {
                    AuditNoteFsid: $scope.TableAdd.AuditNoteFsid,
                    AuditFsgroupId: $scope.TablePeriod.FsSelect.AuditFsgroupId,
                    AuditNoteFsrefCode: $scope.TableAdd.AuditNoteFsrefCode,
                    NoteFstype: $scope.TableAdd.NoteFstype,
                    NoteDetail: $scope.TableAdd.NoteDetail,
                };
                if (data.NoteFstype == 'Get') {
                    data.SubGroups = [];
                    _.each($scope.TableAdd.SubGroups, function (item) {
                        data.SubGroups.push({
                            AuditNoteFsid: item.AuditNoteFsid,
                            AuditSubNoteFsid: item.AuditSubNoteFsid,
                            SubFsgroupId: item.SubFsgroupId,
                            IsDelete: item.IsDelete
                        });
                    });
                }

                var qq = $q.all([serviceAccount.postAuditFSgroupNoteFS(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                showSuccessText('บันทึกรายการเรียบร้อย');
                                $scope.TableAdd = {};
                                $scope.OnClickFSGroup();
                                if (action == 'close') {
                                    $('#ModalNoteFSParagraph').modal('hide');
                                }
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
        catch (ex) {
            showWariningToast(ex);
        }
    }

    $scope.OnClickTableNoteFSParagraph = function (val) {
        if (val != undefined) {
            $scope.TableAdd = {};
            $scope.TableAdd = angular.copy(val);
            if ($scope.TableAdd.NoteFstype == 'Get') {
                _.each($scope.TableAdd.SubGroups, function (item) {
                    var filter = _.where($scope.Parameter.SubFSGroupList, { SubFsgroupId: item.SubFsgroupId })[0];
                    if (filter != undefined) {
                        item.SubFsgroupCode = filter.Code;
                        item.SubFsgroupName = filter.Name;
                    }
                });
                $scope.OnCalculateSubGroup();
                $('#ModalNoteFSGet').modal('show');
            }
            else if ($scope.TableAdd.NoteFstype == 'Table') {

                $scope.TableAdd.HeaderArray = [];
                $scope.TableAdd.RecordArray = [];

                var headerdatas = JSON.parse($scope.TableAdd.Tables[0].Header);
                for (var i = 1; i <= $scope.TableAdd.HeaderQty; i++) {
                    var item = {};
                    item.Text = headerdatas[i - 1];
                    $scope.TableAdd.HeaderArray.push(item);
                }

                _.each($scope.TableAdd.Tables, function (item) {
                    var insert = {};
                    insert.Description = item.Description;
                    insert.DetailArray = [];
                    var datas = JSON.parse(item.Column);
                    for (var i = 1; i <= $scope.TableAdd.HeaderQty; i++) {
                        var subdetail = {};
                        subdetail.Text = datas[i - 1];
                        insert.DetailArray.push(subdetail);
                    }
                    $scope.TableAdd.RecordArray.push(insert);
                });

                console.log($scope.TableAdd);
                //var detail = [];
                //$scope.TableAdd.RecordArray.push({
                //    Description: '',
                //    DetailArray: detail
                //});

                $('#ModalNoteFSTable').modal('show');
            }
            else if ($scope.TableAdd.NoteFstype == 'Paragraph')
                $('#ModalNoteFSParagraph').modal('show');
        }
    }

    $scope.OnClickDeleteNoteFS = function (values) {
        if (values != undefined) {
            $scope.TableAdd = [];
            $scope.TableAdd = angular.copy(values);
            $('#ModalConfirmDelete').modal('show');
        }
    }

    $scope.OnClickConfirmDeleteNoteFS = function () {
        try {
            var qq = $q.all([serviceAccount.deleteAuditNoteFS($scope.TableAdd.AuditNoteFsid)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            showSuccessText('ลบรายการเรียบร้อย');
                            $('#ModalConfirmDelete').modal('hide');
                            $scope.TableAdd = {};
                            $scope.OnClickFSGroup();
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

    //Note FS GET

    $scope.OnClickSaveNoteFSGet = function (action) {
        try {
            if ($scope.TableAdd.SubGroups == undefined)
                throw "กรุณาเลือก Sub Group อย่างน้อย 1 รายการ";
            else if ($scope.TableAdd.SubGroups != undefined && $scope.TableAdd.SubGroups.length == 0)
                throw "กรุณาเลือก Sub Group อย่างน้อย 1 รายการ";
            else {
                var data = {
                    AuditNoteFsid: $scope.TableAdd.AuditNoteFsid,
                    AuditFsgroupId: $scope.TablePeriod.FsSelect.AuditFsgroupId,
                    AuditNoteFsrefCode: $scope.TableAdd.AuditNoteFsrefCode,
                    NoteFstype: $scope.TableAdd.NoteFstype,
                    NoteDetail: $scope.TableAdd.NoteDetail,
                };
                if (data.NoteFstype == 'Get') {
                    data.SubGroups = [];
                    _.each($scope.TableAdd.SubGroups, function (item) {
                        data.SubGroups.push({
                            AuditNoteFsid: item.AuditNoteFsid,
                            AuditSubNoteFsid: item.AuditSubNoteFsid,
                            SubFsgroupId: item.SubFsgroupId,
                            IsDelete: item.IsDelete
                        });
                    });
                }

                var qq = $q.all([serviceAccount.postAuditFSgroupNoteFS(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                showSuccessText('บันทึกรายการเรียบร้อย');
                                $scope.TableAdd = {};
                                $scope.OnClickFSGroup();
                                if (action == 'close') {
                                    $('#ModalNoteFSParagraph').modal('hide');
                                    $('#ModalNoteFSGet').modal('hide');
                                }
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
        catch (ex) {
            showWariningToast(ex);
        }
    }

    $scope.OnClickAddSubGroupNoteFS = function () {
        try {
            if ($scope.TableAdd.SelectSubFSGroup == undefined)
                throw "กรุณาเลือก SubFSGroup";
            else {
                if ($scope.TableAdd.SubGroups == undefined)
                    $scope.TableAdd.SubGroups = [];

                var check = _.where($scope.TableAdd.SubGroups, { SubFsgroupId: $scope.TableAdd.SelectSubFSGroup.SubFsgroupId, IsDelete: 'No' })[0];
                if (check != undefined)
                    throw "Sub Group นี้ซ้ำกรุณาเลือกใหม่อีกครั้ง";
                else {
                    $scope.TableAdd.SubGroups.push({ SubFsgroupId: $scope.TableAdd.SelectSubFSGroup.SubFsgroupId, SubFsgroupCode: $scope.TableAdd.SelectSubFSGroup.Code, SubFsgroupName: $scope.TableAdd.SelectSubFSGroup.Name, IsDelete: 'No' });
                    $scope.OnCalculateSubGroup();
                }
            }
        }
        catch (ex) {
            showWariningToast(ex);
        }
    }

    $scope.OnCalculateSubGroup = function () {
        if ($scope.TableAdd.SubGroups != undefined && $scope.TableAdd.SubGroups.length > 0) {

            _.each($scope.TableAdd.SubGroups, function (item) {
                if (item.IsDelete == 'No') {
                    var filter = _.where($scope.TablePeriod.Accounts, { SubFsgroupId: item.SubFsgroupId });
                    if (filter != undefined && filter.length > 0) {

                        item.SubFsGroupSummary = 0;
                        item.SubFsGroupSummaryPrev = 0;

                        _.each(filter, function (item1) {
                            var account = _.where($scope.TablePeriod.TableMain, { TrialBalanceId: item1.TrialBalanceId })[0];
                            console.log(account);
                            item.SubFsGroupSummary += account.Audit;
                            item.SubFsGroupSummaryPrev += account.PreviousYear;
                        });

                        item.SubFsGroupSummary = item.SubFsGroupSummary == undefined ? 0 : item.SubFsGroupSummary;
                        item.SubFsGroupSummaryPrev = item.SubFsGroupSummaryPrev == undefined ? 0 : item.SubFsGroupSummaryPrev;
                    }
                }
                else {
                    item.SubFsGroupSummary = 0;
                    item.SubFsGroupSummaryPrev = 0;
                }
            });

            $scope.TableAdd.Footer = {};
            $scope.TableAdd.Footer.SubFsGroupSummary = 0;
            $scope.TableAdd.Footer.SubFsGroupSummaryPrev = 0;

            amount = $scope.TableAdd.SubGroups.reduce((s, f) => {
                return s + parseFloat(f.SubFsGroupSummary);
            }, 0);
            $scope.TableAdd.Footer.SubFsGroupSummary = amount;

            amount = $scope.TableAdd.SubGroups.reduce((s, f) => {
                return s + parseFloat(f.SubFsGroupSummaryPrev);
            }, 0);
            $scope.TableAdd.Footer.SubFsGroupSummaryPrev = amount;
        }
    }

    $scope.OnClickDeleteSubGroupNoteFS = function (val) {
        if (val != undefined) {
            val.IsDelete = 'Yes';
            $scope.OnCalculateSubGroup();
        }
    }

    //Note FS Table
    $scope.OnClickSetHeaderNoteFS = function (val) {
        $scope.Header = '';
        $scope.IsAction = val;
        $scope.Header = $scope.TableAdd.HeaderQty;
        $('#ModalNoteFSTable').modal('hide');
        $('#ModalNoteFSSetHeadder').modal('show');
    }

    $scope.OnClickSaveSetHeaderNoteFS = function () {
        if ($scope.Header == undefined || $scope.Header == '')
            showWariningToast('กรุณาระบุจำนวน');
        else {
            $scope.TableAdd.HeaderQty = $scope.Header;

            if ($scope.IsAction == 'Edit') {
                $scope.TableAdd.HeaderArrayKeep = angular.copy($scope.TableAdd.HeaderArray);
                $scope.TableAdd.RecordArrayKeep = angular.copy($scope.TableAdd.RecordArray);
            }

            $scope.TableAdd.HeaderArray = [];
            $scope.TableAdd.RecordArray = [];

            console.log($scope.TableAdd.HeaderArrayKeep);
            var detail = [];
            for (var i = 1; i <= $scope.TableAdd.HeaderQty; i++) {
                var item = {};
                if ($scope.IsAction == 'Edit') {
                    if ($scope.TableAdd.HeaderArrayKeep[i - 1] != undefined)
                        item.Text = $scope.TableAdd.HeaderArrayKeep[i - 1].Text;
                }
                $scope.TableAdd.HeaderArray.push(item);
                var item1 = {};

                detail.push(item1);
            }
            $scope.TableAdd.RecordArray.push({
                Description: '',
                DetailArray: detail
            });

            if ($scope.IsAction == 'Edit') {
                $scope.TableAdd.RecordArray = [];
                _.each($scope.TableAdd.RecordArrayKeep, function (record) {
                    var detail = [];
                    console.log(record);
                    for (var i = 1; i <= $scope.TableAdd.HeaderQty; i++) {
                        var item1 = {};

                        if (record.DetailArray[i - 1] != undefined)
                            item1.Text = record.DetailArray[i - 1].Text;
                        detail.push(item1);
                    }

                    $scope.TableAdd.RecordArray.push({
                        Description: record.Description,
                        DetailArray: detail
                    });
                });
            }

            //if ($scope.IsAction == 'Edit') {

            //    _.each($scope.TableAdd.RecordArrayKeep, function (item) {
            //        var items = {};
            //        items.AuditNoteFsid = $scope.TableAdd.AuditNoteFsid;
            //        items.Description = item.Description;
            //        items.HeaderInput = [];
            //        _.each($scope.TableAdd.HeaderArray, function (head) { items.HeaderInput.push(head.Text); });

            //        items.ColumnInput = [];
            //        _.each(item.DetailArray, function (head) { items.ColumnInput.push(head.Text); });

            //        data.Tables.push(
            //            items
            //        );
            //    });

            //}

            $('#ModalNoteFSTable').modal('show');
            $('#ModalNoteFSSetHeadder').modal('hide');
        }
    }

    $scope.OnClickAddNewRecordNoteFS = function () {
        var detail = [];
        for (var i = 1; i <= $scope.TableAdd.HeaderQty; i++) {
            var item1 = {};
            detail.push(item1);
        }
        $scope.TableAdd.RecordArray.push({
            Description: '',
            DetailArray: detail
        });
        $('#ModalNoteFSTable').modal('show');
        $('#ModalNoteFSSetHeadder').modal('hide');
    }

    $scope.OnClickRemoveRecordNoteFS = function (index) {
        $scope.TableAdd.RecordArray.splice(index, 1);
    }

    $scope.OnClickCloseSetHeaderNoteFS = function () {
        $('#ModalNoteFSTable').modal('show');
        $('#ModalNoteFSSetHeadder').modal('hide');
    }

    $scope.OnClickSaveTableNoteFS = function (action) {
        try {
            if ($scope.TableAdd.HeaderQty == undefined || $scope.TableAdd.HeaderQty == '')
                throw "กรุณาเพิ่มตารางอย่างน้อย 1 รายการ";
            else if ($scope.TableAdd.RecordArray == undefined)
                throw "กรุณาเพิ่มตารางอย่างน้อย 1 รายการ";
            else if ($scope.TableAdd.RecordArray != undefined && $scope.TableAdd.RecordArray.length <= 0)
                throw "กรุณาเพิ่มตารางอย่างน้อย 1 รายการ";
            else {
                var data = {
                    AuditNoteFsid: $scope.TableAdd.AuditNoteFsid,
                    AuditFsgroupId: $scope.TablePeriod.FsSelect.AuditFsgroupId,
                    AuditNoteFsrefCode: $scope.TableAdd.AuditNoteFsrefCode,
                    HeaderQty: $scope.TableAdd.HeaderQty,
                    NoteFstype: $scope.TableAdd.NoteFstype,
                    NoteDetail: $scope.TableAdd.NoteDetail,
                };
                if (data.NoteFstype == 'Table') {
                    data.Tables = [];
                    _.each($scope.TableAdd.RecordArray, function (item) {
                        var items = {};
                        items.AuditNoteFsid = $scope.TableAdd.AuditNoteFsid;
                        items.Description = item.Description;
                        items.HeaderInput = [];
                        _.each($scope.TableAdd.HeaderArray, function (head) { items.HeaderInput.push(head.Text); });

                        items.ColumnInput = [];
                        _.each(item.DetailArray, function (head) { items.ColumnInput.push(head.Text); });

                        data.Tables.push(
                            items
                        );
                    });
                }

                var qq = $q.all([serviceAccount.postAuditFSgroupNoteFS(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                showSuccessText('บันทึกรายการเรียบร้อย');
                                $scope.TableAdd = {};
                                $scope.OnClickFSGroup();
                                if (action == 'close') {
                                    $('#ModalNoteFSParagraph').modal('hide');
                                    $('#ModalNoteFSGet').modal('hide');
                                    $('#ModalNoteFSTable').modal('hide');
                                }
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
        catch (ex) {
            showWariningToast(ex);
        }
    }

    //Note FS Excel

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

    $scope.UploadFiles = function (files) {
        $scope.Upload = 1;
        $scope.SelectedFiles = files;
        $scope.OnClickAfterUploadNoteFS();
    };

    $scope.OnClickAfterUploadNoteFS = function () {
        try {
            if ($scope.Header == undefined || $scope.Header == '')
                showWariningToast('กรุณาระบุจำนวน');
            else {
                $("#loading").fadeIn();
                var input = document.getElementById("product_thumnail");
                var files = input.files;
                var formData = new FormData();
                if (files != undefined) {
                    for (var i = 0; i != files.length; i++) {
                        formData.append("files", files[i]);
                    }

                    $.ajax(
                        {
                            url: baseURL + "Accountings/UploadNoteToFS",
                            data: formData,
                            processData: false,
                            contentType: false,
                            type: "POST",
                            success: function (data) {
                                if (data.responsecode == 200) {
                                    showSuccessText('อัพโหลดข้อมูลเรียบร้อย');
                                    console.log(data.responsedata);
                                    var values = data.responsedata;

                                    $scope.TableAdd.HeaderQty = $scope.Header;
                                    $scope.TableAdd.NoteFstype = 'Table'
                                    $scope.TableAdd.HeaderArray = [];
                                    $scope.TableAdd.RecordArray = [];

                                    var detail = [];
                                    for (var i = 1; i <= $scope.TableAdd.HeaderQty; i++) {
                                        var item = {};

                                        if (values.Header != undefined && values.Header.length > 0) {
                                            if (values.Header[i - 1] != undefined)
                                                item.Text = values.Header[i - 1];
                                        }

                                        $scope.TableAdd.HeaderArray.push(item);
                                        var item1 = {};

                                        detail.push(item1);
                                    }
                                    $scope.TableAdd.RecordArray.push({
                                        Description: '',
                                        DetailArray: detail
                                    });

                                    if (values.Detail != undefined && values.Detail.length > 0) {
                                        $scope.TableAdd.RecordArray = [];
                                        _.each(values.Detail, function (record) {
                                            var detail = [];
                                            console.log(record);
                                            for (var i = 1; i <= $scope.TableAdd.HeaderQty; i++) {
                                                var item1 = {};

                                                if (record[i - 1] != undefined)
                                                    item1.Text = record[i - 1];
                                                detail.push(item1);
                                            }

                                            $scope.TableAdd.RecordArray.push({
                                                Description: record.Description,
                                                DetailArray: detail
                                            });
                                        });
                                    }

                                    $('#ModalNoteFSTable').modal('show');
                                    $('#ModalNoteFSUpload').modal('hide');
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
        return $scope.TablePeriod.FsSelect != undefined ? Math.ceil($scope.TablePeriod.FsSelect.Policys.length / parseInt($scope.itemsPerPage)) - 1 : 0;
    };

    $scope.range = function () {
        $scope.itemsCount = $scope.TablePeriod.FsSelect != undefined ? $scope.TablePeriod.FsSelect.Policys.length : 0;
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

    // #1

    $scope.currentPage_1 = 0;

    $scope.OnClickChangePageTotal_1 = function () {
        $scope.retpage_1 = [];
        $scope.range_1();
    }

    $scope.pageCount_1 = function () {
        return $scope.TablePeriod.FsSelect != undefined ? Math.ceil($scope.TablePeriod.FsSelect.NoteToFS.length / parseInt($scope.itemsPerPage_1)) - 1 : 0;
    };

    $scope.range_1 = function () {
        $scope.itemsCount_1 = $scope.TablePeriod.FsSelect != undefined ? $scope.TablePeriod.FsSelect.NoteToFS.length : 0;
        $scope.pageshow_1 = $scope.pageCount_1() > $scope.LimitPage && $scope.pageCount_1() > 0 ? 1 : 0;

        var rangeSize = 50;
        var ret_1 = [];
        var start = 1;

        for (var i = 0; i <= $scope.pageCount_1(); i++) {
            ret_1.push({ code: i, name: i + 1, show: i <= rangeSize ? 1 : 0 });
        }
        $scope.pageshowdata_1 = 1;
        $scope.retpage_1 = ret_1;

        $scope.changePages_1 = $scope.retpage_1[0];
        if ($scope.retpage_1 != undefined && $scope.retpage_1.length > 0)
            $scope.currentPage_1 = $scope.retpage_1[0].code;
    };

    $scope.showallpages_1 = function () {
        if ($scope.pageshowdata_1 == 1) {
            _.each($scope.retpage_1, function (e) {
                e.show = 1;
            });
            $scope.pageshowdata_1 = 0;
        }
        else {
            _.each($scope.retpage_1, function (e) {
                if (e.code >= $scope.LimitFirst && e.code <= $scope.LimitPage)
                    e.show = 1;
                else
                    e.show = 0;
            });
            $scope.pageshowdata_1 = 1;
        }
    };

    $scope.prevPage_1 = function () {
        if ($scope.currentPage_1 > 0) {
            $scope.currentPage_1--;

            var type = $scope.retpage_1.filter(function (item) { return item.code == $scope.currentPage_1; });
            if (type.length > 0) {
                $scope.currentPage_1 = type[0];
            }
        }

        if ($scope.currentPage_1 < $scope.LimitFirst && $scope.currentPage_1 >= 1) {
            $scope.LimitFirst = $scope.LimitFirst - $scope.LimitPage;
            $scope.LimitPage = $scope.LimitPage - $scope.LimitPage;
            for (var i = 1; i <= $scope.retpage_1.length; i++) {
                if (i >= $scope.LimitFirst && i <= $scope.LimitPage) {
                    $scope.retpage_1[i - 1].show = 1;
                }
                else
                    $scope.retpage_1[i - 1].show = 0;
            }
        }
    };

    $scope.prevPageDisabled_1 = function () {
        return $scope.currentPage_1 === 0 ? "disabled" : "";
    };

    $scope.nextPage_1 = function () {
        if ($scope.currentPage_1 < $scope.pageCount_1()) {
            $scope.currentPage_1++;

            var type = $scope.retpage_1.filter(function (item) { return item.code == $scope.currentPage_1; });
            if (type.length > 0) {
                $scope.currentPage_1 = type[0];
            }
        }

        if ($scope.currentPage_1 >= $scope.LimitPage && $scope.currentPage_1 <= $scope.pageCount_1()) {
            $scope.LimitFirst = $scope.LimitFirst + $scope.LimitPage;
            $scope.LimitPage = $scope.LimitPage + $scope.LimitPage;
            for (var i = 1; i <= $scope.retpage_1.length; i++) {
                if (i >= $scope.LimitFirst && i <= $scope.LimitPage) {
                    $scope.retpage_1[i - 1].show = 1;
                }
                else
                    $scope.retpage_1[i - 1].show = 0;
            }
        }

    };

    $scope.nextPageDisabled_1 = function () {
        return $scope.currentPage_1 === $scope.pageCount_1() ? "disabled" : "";
    };

    $scope.setPage_1 = function (n) {
        $scope.currentPage_1 = $scope.changePages_1.code;
    };
});