angular.module('FOCUSAPP').controller('AccountSubFsleadlistController', function ($stateParams, $rootScope, $state, $scope, $http, $timeout, $q, GlobalVar, globalService,
    serviceAccount, serviceParameter, serviceOrganize) {
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

        $('#datetimepicker3').datetimepicker({
            pickDate: false,
        });

        $('#datetimepicker4').datetimepicker({
            pickDate: false,
        });
    }

    $scope.initModal = function () {
        $scope.initComponent();
        try {

            $scope.Error = undefined;

            var qq = $q.all([globalService.getProfile(), globalService.getConfigSystem()]).then(function (data) {
                $scope.UserProfiles = data[0].data.responsedata;
                $scope.ConfigSystem = data[1].data.responsedata;
                var qq = $q.all([serviceParameter.getParameterCustomerWithOwner(),
                serviceAccount.getAccountPeriodsWithKey($scope.UserProfiles.PeriodIdActive),
                serviceAccount.getSubFSLeadWithKey($stateParams.ref_id),
                serviceParameter.getParameterFSgroupParentSubFSGroup($stateParams.ref_group),
                serviceParameter.getParameterAuditProgram($stateParams.ref_group)
                ]).then(function (data) {
                    try {
                        $("#loading").fadeIn();
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                                $scope.Parameter.Customer = data[0].data.responsedata;
                                $scope.Parameter.SubFSGroup = data[3].data.responsedata;
                                $scope.Parameter.AuditProgram = data[4].data.responsedata;

                                var type = $scope.Parameter.Customer.filter(function (item) { return item.CustomerId == $scope.UserProfiles.CustomerIdActive; });
                                if (type.length > 0)
                                    $scope.Search.SelectCustomer = type[0];

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

                                $scope.TablePeriod = data[1].data.responsedata;
                                console.log($scope.TablePeriod);
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

                                //Sub Lead
                                $scope.TablePeriod.AccountSelect = {};
                                $scope.TablePeriod.AccountTable = [];
                                var accountdatas = data[2].data.responsedata;
                                var account = _.where($scope.TablePeriod.TableMain, { TrialBalanceId: accountdatas.TrialBalanceId })[0];
                                if (account != undefined) {
                                    accountdatas.Code = account.AccountCode;
                                    accountdatas.Name = account.AccountName;
                                    accountdatas.Current = account.Amount;
                                    accountdatas.Debit = account.Debit != undefined ? account.Debit : 0;
                                    accountdatas.Credit = account.Credit != undefined ? account.Credit : 0;
                                    accountdatas.Audit = account.Audit;
                                    accountdatas.Previous = account.PreviousYear;
                                    accountdatas.Move = account.Audit - account.PreviousYear;
                                    accountdatas.Percent = accountdatas.Move == 0 || account.PreviousYear == 0 ?
                                        0 : accountdatas.Move / account.PreviousYear * 100;
                                }

                                if (accountdatas.SubFsgroupId != undefined) {

                                    var type = $scope.Parameter.SubFSGroup.filter(function (item1) { return item1.SubFsgroupId == accountdatas.SubFsgroupId; });
                                    if (type.length > 0)
                                        accountdatas.SelectSubFSGroup = type[0];
                                }
                                else
                                    accountdatas.SelectSubFSGroup = undefined;

                                $scope.TablePeriod.AccountSelect = accountdatas;
                                $scope.TablePeriod.AccountTable.push(accountdatas);

                                //Reference
                                if ($scope.TablePeriod.AccountSelect.References != undefined && $scope.TablePeriod.AccountSelect.References.length > 0) {
                                    _.each($scope.TablePeriod.AccountSelect.References, function (item) {
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
                                            item.Percent = accountdatas.Move == 0 || account.PreviousYear == 0 ?
                                                0 : accountdatas.Move / account.PreviousYear * 100;
                                            $scope.TablePeriod.AccountTable.push(item);
                                        }
                                    });
                                }

                                globalService.SetupSequence($scope.TablePeriod.AccountTable);

                                $scope.TablePeriod.Footer = {};
                                $scope.TablePeriod.Footer.Current = 0;
                                $scope.TablePeriod.Footer.Debit = 0;
                                $scope.TablePeriod.Footer.Credit = 0;
                                $scope.TablePeriod.Footer.Audit = 0;
                                $scope.TablePeriod.Footer.Previous = 0;
                                $scope.TablePeriod.Footer.Move = 0;
                                $scope.TablePeriod.Footer.Percent = 0;

                                _.each($scope.TablePeriod.AccountTable, function (item) {
                                    $scope.TablePeriod.Footer.Current += item.Current;
                                    $scope.TablePeriod.Footer.Debit += item.Debit;
                                    $scope.TablePeriod.Footer.Credit += item.Credit;
                                    $scope.TablePeriod.Footer.Audit += item.Audit;
                                    $scope.TablePeriod.Footer.Previous += item.Previous;
                                    $scope.TablePeriod.Footer.Move = $scope.TablePeriod.Footer.Audit - $scope.TablePeriod.Footer.Previous;
                                    $scope.TablePeriod.Footer.Percent = $scope.TablePeriod.Footer.Move != 0 && $scope.TablePeriod.Footer.Previous != 0 ? $scope.TablePeriod.Footer.Move / $scope.TablePeriod.Footer.Previous * 100 : 0;
                                });

                                if ($scope.TablePeriod.AccountSelect.ReferenceVerify == undefined) {
                                    $scope.TablePeriod.AccountSelect.ReferenceVerify = {};
                                    $scope.TablePeriod.AccountSelect.ReferenceVerify.AuditAccount = {};
                                    $scope.TablePeriod.AccountSelect.ReferenceVerify.AuditAccount.AccountRefCode = '-';
                                }

                                //Adjustment
                                $scope.TabAdjustment = 'agree';
                                if ($scope.TablePeriod.AccountSelect.Adjustments != undefined && $scope.TablePeriod.AccountSelect.Adjustments.length) {

                                    $scope.TablePeriod.AccountSelect.AdjustmentsAgree = _.where($scope.TablePeriod.AccountSelect.Adjustments, { IsAgree: 'Agree' });
                                    $scope.TablePeriod.AccountSelect.AdjustmentsDisAgree = _.where($scope.TablePeriod.AccountSelect.Adjustments, { IsAgree: 'Disagree' });

                                    globalService.SetupSequence($scope.TablePeriod.AccountSelect.AdjustmentsAgree);
                                    globalService.SetupSequence($scope.TablePeriod.AccountSelect.AdjustmentsDisAgree);

                                    $scope.TablePeriod.Adjustments.Footer = {};
                                    $scope.TablePeriod.Adjustments.Footer.SumAgreeBSDebit = 0;
                                    $scope.TablePeriod.Adjustments.Footer.SumAgreeBSCredit = 0;
                                    $scope.TablePeriod.Adjustments.Footer.SumAgreePLDebit = 0;
                                    $scope.TablePeriod.Adjustments.Footer.SumAgreePLCredit = 0;

                                    $scope.TablePeriod.Adjustments.Footer.SumDisgreeBSDebit = 0;
                                    $scope.TablePeriod.Adjustments.Footer.SumDisgreeBSCredit = 0;
                                    $scope.TablePeriod.Adjustments.Footer.SumDisgreePLDebit = 0;
                                    $scope.TablePeriod.Adjustments.Footer.SumDisgreePLCredit = 0;
                                    console.log($scope.TablePeriod.AccountSelect.Adjustments);

                                    _.each($scope.TablePeriod.AccountSelect.AdjustmentsAgree, function (item) {
                                        let amount = _.where(item.SubAdjustment, { AdjustmentAgree: 'Agree', AdjustmentModel: 'BS', AdjustmentType: 'Debit' }).reduce((s, f) => {
                                            return s + parseFloat(f.Debit);
                                        }, 0);
                                        $scope.TablePeriod.Adjustments.Footer.SumAgreeBSDebit += amount;

                                        amount = _.where(item.SubAdjustment, { AdjustmentAgree: 'Agree', AdjustmentModel: 'BS', AdjustmentType: 'Credit' }).reduce((s, f) => {
                                            return s + parseFloat(f.Credit);
                                        }, 0);
                                        $scope.TablePeriod.Adjustments.Footer.SumAgreeBSCredit += amount;

                                        amount = _.where(item.SubAdjustment, { AdjustmentAgree: 'Agree', AdjustmentModel: 'PL', AdjustmentType: 'Debit' }).reduce((s, f) => {
                                            return s + parseFloat(f.Debit);
                                        }, 0);
                                        $scope.TablePeriod.Adjustments.Footer.SumAgreePLDebit += amount;

                                        amount = _.where(item.SubAdjustment, { AdjustmentAgree: 'Agree', AdjustmentModel: 'PL', AdjustmentType: 'Credit' }).reduce((s, f) => {
                                            return s + parseFloat(f.Credit);
                                        }, 0);
                                        $scope.TablePeriod.Adjustments.Footer.SumAgreePLCredit += amount;
                                    });

                                    console.log($scope.TablePeriod.AccountSelect.AdjustmentsDisAgree);
                                    _.each($scope.TablePeriod.AccountSelect.AdjustmentsDisAgree, function (item) {
                                        let amount = _.where(item.SubAdjustment, { AdjustmentAgree: 'Disagree', AdjustmentModel: 'BS', AdjustmentType: 'Debit' }).reduce((s, f) => {
                                            return s + parseFloat(f.Debit);
                                        }, 0);
                                        $scope.TablePeriod.Adjustments.Footer.SumDisgreeBSDebit += amount;

                                        amount = _.where(item.SubAdjustment, { AdjustmentAgree: 'Disagree', AdjustmentModel: 'BS', AdjustmentType: 'Credit' }).reduce((s, f) => {
                                            return s + parseFloat(f.Credit);
                                        }, 0);
                                        $scope.TablePeriod.Adjustments.Footer.SumDisgreeBSCredit += amount;

                                        amount = _.where(item.SubAdjustment, { AdjustmentAgree: 'Disagree', AdjustmentModel: 'PL', AdjustmentType: 'Debit' }).reduce((s, f) => {
                                            return s + parseFloat(f.Debit);
                                        }, 0);
                                        $scope.TablePeriod.Adjustments.Footer.SumDisgreePLDebit += amount;

                                        amount = _.where(item.SubAdjustment, { AdjustmentAgree: 'Disagree', AdjustmentModel: 'PL', AdjustmentType: 'Credit' }).reduce((s, f) => {
                                            return s + parseFloat(f.Credit);
                                        }, 0);
                                        $scope.TablePeriod.Adjustments.Footer.SumDisgreePLCredit += amount;
                                    });
                                }
                                //Documents
                                if ($scope.TablePeriod.AccountSelect.Documents != undefined && $scope.TablePeriod.AccountSelect.Documents.length > 0) {
                                    $scope.itemsPerPage = "10";
                                    globalService.SetupSequence($scope.TablePeriod.AccountSelect.Documents);
                                    _.each($scope.TablePeriod.AccountSelect.Documents, function (item) { item.CreatedOn = formatDateFull(item.CreatedOn); item.UpdatedOn = formatDateFull(item.UpdatedOn); })
                                    $scope.retpage = [];
                                    $scope.range();
                                }
                                //Conclusions
                                if ($scope.TablePeriod.AccountSelect.Conclusions != undefined && $scope.TablePeriod.AccountSelect.Conclusions.length > 0) {
                                    $scope.itemsPerPage_1 = "10";
                                    globalService.SetupSequence($scope.TablePeriod.AccountSelect.Conclusions);
                                    _.each($scope.TablePeriod.AccountSelect.Conclusions, function (item) { item.CreatedOn = formatDateFull(item.CreatedOn); item.UpdatedOn = formatDateFull(item.UpdatedOn); })
                                    $scope.retpage_1 = [];
                                    $scope.range_1();
                                }
                                //Issues
                                if ($scope.TablePeriod.AccountSelect.Issues != undefined && $scope.TablePeriod.AccountSelect.Issues.length > 0) {
                                    $scope.itemsPerPage_2 = "10";
                                    globalService.SetupSequence($scope.TablePeriod.AccountSelect.Issues);
                                    _.each($scope.TablePeriod.AccountSelect.Issues, function (item) {
                                        item.CreatedOn = formatDateFull(item.CreatedOn); item.UpdatedOn = formatDateFull(item.UpdatedOn);
                                        if (item.CompleteOn != undefined)
                                            item.CompleteOn = formatDateFull(item.CompleteOn);
                                    })
                                    $scope.retpage_2 = [];
                                    $scope.range_2();
                                }
                                //Events
                                if ($scope.TablePeriod.AccountSelect.Events != undefined && $scope.TablePeriod.AccountSelect.Events.length > 0) {
                                    globalService.SetupSequence($scope.TablePeriod.AccountSelect.Events);
                                    _.each($scope.TablePeriod.AccountSelect.Events, function (item) {
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

                                //Workflow
                                if ($scope.UserProfiles.PermissionCodeActive == 'ASSIS001') {
                                    if ($scope.TablePeriod.AccountSelect.PrepareStatus != undefined && $scope.TablePeriod.AccountSelect.PrepareStatus != '') {
                                        if ($scope.TablePeriod.AccountSelect.ReveiwedStatus != undefined && $scope.TablePeriod.AccountSelect.ReveiwedStatus != '' && $scope.TablePeriod.AccountSelect.ReveiwedStatus == 'Confirm')
                                            $scope.TablePeriod.AccountSelect.Status = 'Lock';
                                        else
                                            $scope.TablePeriod.AccountSelect.Status = $scope.TablePeriod.AccountSelect.PrepareStatus;
                                    }
                                }
                                else if ($scope.UserProfiles.PermissionCodeActive == 'ASSIS002') {
                                    if ($scope.TablePeriod.AccountSelect.ReveiwedStatus != undefined && $scope.TablePeriod.AccountSelect.ReveiwedStatus != '') {
                                        if ($scope.TablePeriod.AccountSelect.AuditorStatus != undefined && $scope.TablePeriod.AccountSelect.AuditorStatus != '' && $scope.TablePeriod.AccountSelect.AuditorStatus == 'Confirm')
                                            $scope.TablePeriod.AccountSelect.Status = 'Lock';
                                        else
                                            $scope.TablePeriod.AccountSelect.Status = $scope.TablePeriod.AccountSelect.ReveiwedStatus;
                                    }
                                }
                                else if ($scope.UserProfiles.PermissionCodeActive == 'AUDIT001') {
                                    if ($scope.TablePeriod.AccountSelect.AuditorStatus != undefined && $scope.TablePeriod.AccountSelect.AuditorStatus != '') {
                                        $scope.TablePeriod.AccountSelect.Status = $scope.TablePeriod.AccountSelect.AuditorStatus;
                                    }
                                }


                            }
                            else if (data[0].data.responsecode == '400') { showErrorToast(data[0].data.errormessage); }
                        }
                    }
                    catch (err) {
                        showErrorToast(err);
                    }
                    finally {
                        $("#loading").fadeOut();
                    }
                });
            });
        }
        catch (err) {
            showErrorToast(err);
        }
    }

    $scope.OnClickSave = function (action) {
        try {
            $("#loading").fadeIn();
            var data = {
                AuditAccountId: $scope.TablePeriod.AccountSelect.AuditAccountId,
                AuditComment: $scope.TablePeriod.AccountSelect.AuditComment,
                SubFSGroupId: $scope.TablePeriod.AccountTable[0].SelectSubFSGroup != undefined ? $scope.TablePeriod.AccountTable[0].SelectSubFSGroup.SubFsgroupId : undefined,
            };

            console.log(data);
            var qq = $q.all([serviceAccount.postAccountAuditAccount(data)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            showSuccessText('บันทึกรายการเรียบร้อย');

                            if (action == 'back')
                                $state.go('account-fsleadlist');

                            $scope.initModal();

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

    $scope.OnClickAddConfirm = function (status) {
        $scope.TableAdd = {};
        $scope.TableAdd.IsStatus = status;
        $('#ModalConfirmflow').modal('show');
    }

    $scope.OnClickConfirm = function (action) {
        try {
            if ($scope.TableAdd.IsStatus == 'Confirm' && ($scope.TableAdd.StartDate == undefined || $scope.TableAdd.StartDate == ''))
                throw "กรุณาระบุวันที่เริ่มต้น";
            else if ($scope.TableAdd.IsStatus == 'Confirm' && ($("#datetimepicker3").find("input").val() == undefined || $("#datetimepicker3").find("input").val() == ''))
                throw "กรุณาระบุเวลาที่เริ่มต้น";
            else if ($scope.TableAdd.IsStatus == 'Confirm' && ($scope.TableAdd.EndDate == undefined || $scope.TableAdd.EndDate == ''))
                throw "กรุณาระบุวันที่สิ้นสุด";
            else if ($scope.TableAdd.IsStatus == 'Confirm' && ($("#datetimepicker4").find("input").val() == undefined || $("#datetimepicker4").find("input").val() == ''))
                throw "กรุณาระบุเวลาที่สิ้นสุด";
            else {
                $("#loading").fadeIn();


                var data = {
                    AuditAccountId: $scope.TablePeriod.AccountSelect.AuditAccountId,
                    StartDate: $scope.TableAdd.IsStatus == 'Confirm' ? ToJsonDate3($scope.TableAdd.StartDate + ' ' + $("#datetimepicker3").find("input").val()) : undefined,
                    EndDate: $scope.TableAdd.IsStatus == 'Confirm' ? ToJsonDate3($scope.TableAdd.EndDate + ' ' + $("#datetimepicker4").find("input").val()) : undefined,
                    IsStatus: $scope.TableAdd.IsStatus,
                    Remark: $scope.TableAdd.Remark
                };

                console.log(data);
                var qq = $q.all([serviceAccount.postAccountAuditAccountChangeStatus(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                showSuccessText('บันทึกรายการเรียบร้อย');
                                $('#ModalConfirmflow').modal('hide');

                                if (action == 'back')
                                    $state.go('account-fsleadlist');

                                $scope.initModal();

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

    $scope.OnClickReference = function () {
        if ($scope.TablePeriod.AccountSelect.ReferenceVerify.AuditAccount.AccountRefCode != '-')
        $state.go('account-subfsleadlist', { ref_id: $scope.TablePeriod.AccountSelect.ReferenceVerify.AuditAccount.AuditAccountId, ref_group: $scope.TablePeriod.AccountSelect.ReferenceVerify.AuditAccount.FsgroupId });
    }

    /* Delete Confirm*/
    $scope.OnClickConfirmAll = function () {
        try {
            if ($scope.TableAdd.Action == "Adjustment") {
                var qq = $q.all([serviceAccount.deleteAccountAdjustment($scope.TableAdd.AdjustmentId)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                showSuccessText('ลบรายการเรียบร้อย');
                                $('#ModalConfirm').modal('hide');
                                $scope.TableAdd = {};
                                $scope.initModal();
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
            else if ($scope.TableAdd.Action == "Document") {
                var qq = $q.all([serviceAccount.deleteAuditDocument($scope.TableAdd.DocumentRefId)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                showSuccessText('ลบรายการเรียบร้อย');
                                $('#ModalConfirm').modal('hide');
                                $scope.TableAdd = {};
                                $scope.initModal();
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
            else if ($scope.TableAdd.Action == "Issue") {
                var qq = $q.all([serviceAccount.deleteAuditIssue($scope.TableAdd.AuditIssueId)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                showSuccessText('ลบรายการเรียบร้อย');
                                $('#ModalConfirm').modal('hide');
                                $scope.TableAdd = {};
                                $scope.initModal();
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
            else if ($scope.TableAdd.Action == "Conclusion") {
                var qq = $q.all([serviceAccount.deleteAuditConclusion($scope.TableAdd.ConclusionId)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                showSuccessText('ลบรายการเรียบร้อย');
                                $('#ModalConfirm').modal('hide');
                                $scope.TableAdd = {};
                                $scope.initModal();
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
        catch (ex) {
            showErrorToast(ex);
        }
    }

    /* Save Adjustmnet & Sub*/
    $scope.OnClickTabAdjustment = function (val) {
        $scope.TabAdjustment = val;
    }

    $scope.OnClickAddAdjustment = function () {
        var qq = $q.all([serviceParameter.getParameterTrialBalanceWithCustomerAndPeriod($scope.UserProfiles.CustomerIdActive
            , $scope.UserProfiles.PeriodIdActive)]).then(function (data) {
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

    $scope.OnClickSaveAdjustment = function (action) {
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
                                $scope.initModal();
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

    $scope.OnClickDeleteAdjustment = function (values) {
        if (values != undefined) {
            $scope.TableAdd = [];
            $scope.TableAdd = angular.copy(values);
            $scope.TableAdd.Action = "Adjustment";
            $('#ModalConfirm').modal('show');
        }
    }

    $scope.OnClickTableAdjustment = function (val) {
        if (val != undefined) {

            var qq = $q.all([serviceParameter.getParameterTrialBalanceWithCustomerAndPeriod($scope.UserProfiles.CustomerIdActive, $scope.UserProfiles.PeriodIdActive)]).then(function (data) {
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

    /* Document */
    $scope.OnClickAddDocument = function () {
        $("#loading").fadeIn();
        var qq = $q.all([serviceParameter.getParameterDocumentStyle(), serviceParameter.getParameterDocumentTypeOwner()]).then(function (data) {
            try {
                if (data[0] != undefined && data[0] != "") {
                    if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                        $scope.Parameter.DocumentStyle = data[0].data.responsedata;
                    }
                    else if (data[0].data.responsecode == '400') { showErrorToast(data[0].data.errormessage); }
                }

                if (data[1] != undefined && data[1] != "") {
                    if (data[1].data.responsecode == '200' && data[1].data.responsedata != undefined && data[1].data.responsedata != "") {
                        $scope.Parameter.DocumentType = data[1].data.responsedata;
                    }
                    else if (data[1].data.responsecode == '400') { showErrorToast(data[1].data.errormessage); }
                }

                $scope.TableAdd = {};
                $scope.TableAdd.SelectDocumentType = undefined;
                $scope.TableAdd.SelectDocumentStyle = undefined;
                $scope.TableAdd.SelectCustomer = undefined;

                $scope.SelectedFiles = undefined;
                $scope.Upload = undefined;
                initdropify('');

                $('#ModalDocument').modal('show');
            }
            catch (err) {
                showErrorToast(err);
            }
            finally {
                $("#loading").fadeOut();
            }
        });
    }

    $scope.OnClickViewDocument = function (val) {
        if (val.DocumentStyleId == 'DS002')
            window.open(val.LinkPath, "_blank");
        else if (val.DocumentStyleId == 'DS001')
            window.open($scope.ConfigSystem.ImagePath + $scope.UserProfiles.EmployeeData.OwnerId + $scope.ConfigSystem.FilePath + val.PathFile, "_blank");
    }

    $scope.OnClickDeleteDocument = function (values) {
        if (values != undefined) {
            $scope.TableAdd = [];
            $scope.TableAdd = angular.copy(values);
            $scope.TableAdd.Action = "Document";
            $('#ModalConfirm').modal('show');
        }
    }

    $scope.OnClickSaveDocument = function (after) {
        try {
            if ($scope.TableAdd.SelectDocumentStyle == undefined)
                throw "กรุณาเลือกรูปแบบเอกสาร";
            if ($scope.TableAdd.SelectDocumentType == undefined)
                throw "กรุณาเลือกประเภทเอกสาร";
            else if ($scope.TableAdd.SelectDocumentStyle != undefined && $scope.TableAdd.SelectDocumentStyle.Code == 'DS001' && $scope.SelectedFiles == undefined && $scope.TableAdd.DocumentListId == undefined)
                throw "กรุณาอัพโหลดไฟล์";
            else if ($scope.TableAdd.SelectDocumentStyle != undefined && $scope.TableAdd.SelectDocumentStyle.Code == 'DS002' &&
                ($scope.TableAdd.LinkPath == undefined || $scope.TableAdd.LinkPath == ''))
                throw "กรุณาระบุลิ๊ง";
            else {
                $("#loading").fadeIn();
                var data = {
                    CustomerId: $scope.TableAdd.SelectCustomer != undefined ? $scope.TableAdd.SelectCustomer.CustomerId : undefined,
                    DocumentStyleId: $scope.TableAdd.SelectDocumentStyle != undefined ? $scope.TableAdd.SelectDocumentStyle.Code : undefined,
                    DocumentTypeId: $scope.TableAdd.SelectDocumentType != undefined ? $scope.TableAdd.SelectDocumentType.Documentid : undefined,
                    LinkPath: $scope.TableAdd.LinkPath,
                    Remark: $scope.TableAdd.Remark,
                };

                console.log(data);
                var qq = $q.all([serviceOrganize.postDocumentList(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {

                                if ($scope.SelectedFiles != undefined && $scope.Upload == 1) {
                                    try {
                                        var input = document.getElementById("product_thumnail");
                                        var files = input.files;
                                        var formData = new FormData();

                                        for (var i = 0; i != files.length; i++) {
                                            formData.append("files", files[i]);
                                        }

                                        $.ajax(
                                            {
                                                url: baseURL + "Accountings/UploadFileDocumentAudit?DocumentId=" + data[0].data.responsedata.DocumentListId + "&RefId="
                                                    + $scope.TablePeriod.AccountSelect.AuditAccountId + "&RefCode=" + $scope.TableAdd.RefCode == undefined ? '' : $scope.TableAdd.RefCode,
                                                data: formData,
                                                processData: false,
                                                contentType: false,
                                                type: "POST",
                                                success: function (data) {
                                                    if (after == 'back') {
                                                        $('#ModalDocument').modal('hide');
                                                    }
                                                    else {
                                                        $scope.TableAdd = {};
                                                        $scope.TableAdd.SelectDocumentType = undefined;
                                                        $scope.TableAdd.SelectDocumentStyle = undefined;
                                                        $scope.TableAdd.SelectCustomer = undefined;

                                                        $scope.SelectedFiles = undefined;
                                                        $scope.Upload = undefined;
                                                        initdropify('');
                                                    }
                                                    $scope.$apply();
                                                    showSuccessText('บันทึกรายการเรียบร้อย');
                                                    $scope.initModal();
                                                },
                                                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                                    showErrorToast(textStatus);
                                                }
                                            }
                                        );
                                    }
                                    catch (ex) {
                                        showErrorToast(ex);
                                    }
                                }
                                else {
                                    var data = {
                                        AuditAccountId: $scope.TablePeriod.AccountSelect.AuditAccountId,
                                        DocumentListId: data[0].data.responsedata.DocumentListId,
                                        DocumentRefCode: $scope.TableAdd.RefCode
                                    }

                                    var qq = $q.all([serviceAccount.postAccountAuditDocument(data)]).then(function (data) {
                                        try {
                                            if (data[0] != undefined && data[0] != "") {
                                                if (data[0].data.responsecode == 200) {
                                                    if (after == 'back') {
                                                        $('#ModalDocument').modal('hide');
                                                    }
                                                    else {
                                                        $scope.TableAdd = {};
                                                        $scope.TableAdd.SelectDocumentType = undefined;
                                                        $scope.TableAdd.SelectDocumentStyle = undefined;
                                                        $scope.TableAdd.SelectCustomer = undefined;

                                                        $scope.SelectedFiles = undefined;
                                                        $scope.Upload = undefined;
                                                        initdropify('');
                                                    }
                                                    showSuccessText('บันทึกรายการเรียบร้อย');
                                                    $scope.initModal();
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
    };

    $scope.OnClickAddDocumentPool = function () {
        $("#loading").fadeIn();
        var qq = $q.all([serviceParameter.getParameterDocumentStyle(), serviceParameter.getParameterDocumentTypeOwner(), serviceOrganize.getDocumentList()]).then(function (data) {
            try {
                $scope.SearchDocument = {};
                if (data[0] != undefined && data[0] != "") {
                    if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                        $scope.Parameter.DocumentStyle = data[0].data.responsedata;
                    }
                    else if (data[0].data.responsecode == '400') { showErrorToast(data[0].data.errormessage); }
                }

                if (data[1] != undefined && data[1] != "") {
                    if (data[1].data.responsecode == '200' && data[1].data.responsedata != undefined && data[1].data.responsedata != "") {
                        $scope.Parameter.DocumentType = data[1].data.responsedata;
                    }
                    else if (data[1].data.responsecode == '400') { showErrorToast(data[1].data.errormessage); }
                }

                if (data[2] != undefined && data[2] != "") {
                    if (data[2].data.responsecode == '200' && data[2].data.responsedata != undefined && data[2].data.responsedata != "") {

                        $scope.Parameter.DocumentListMain = data[2].data.responsedata;
                        globalService.SetupSequence($scope.Parameter.DocumentListMain);
                        $scope.Parameter.DocumentList = $scope.Parameter.DocumentListMain
                        $scope.itemsPerPage_4 = "10";
                        $scope.retpage_4 = [];
                        $scope.range_4();
                    }
                    else if (data[2].data.responsecode == '400') { showErrorToast(data[2].data.errormessage); }
                }

                $scope.TableAdd = {};
                $('#ModalDocumentPool').modal('show');
            }
            catch (err) {
                showErrorToast(err);
            }
            finally {
                $("#loading").fadeOut();
            }
        });
    }

    $scope.OnclickSaveDocumentPool = function (val) {
        try {

            $("#loading").fadeIn();
            var data = {
                AuditAccountId: $scope.TablePeriod.AccountSelect.AuditAccountId,
                DocumentListId: val.DocumentListId,
                DocumentRefCode: $scope.TableAdd.RefCode
            };
            console.log(data);
            var qq = $q.all([serviceAccount.postAccountAuditDocument(data)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            $('#ModalDocumentPool').modal('hide');
                            $scope.TableAdd = {};
                            showSuccessText('บันทึกรายการเรียบร้อย');
                            $scope.initModal();
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
        catch (err) {
            showWariningToast(err);
        }
        finally {
            $("#loading").fadeOut();
        }
    }

    $scope.OnClickSearchDocumentPool = function () {
        $scope.Parameter.DocumentList = $scope.Parameter.DocumentListMain;
        $("#loading").fadeIn();

        $scope.Parameter.DocumentList = _.filter($scope.Parameter.DocumentList, function (item) {

            var c1 = true, c2 = true, c3 = true, c4 = true, c5 = true, c6 = true;

            if (($scope.SearchDocument.InputFilter != undefined && $scope.SearchDocument.InputFilter != "")) {

                if ($scope.SearchDocument.InputFilter != undefined && $scope.SearchDocument.InputFilter != "" && item.DocumentListCode != undefined && (item.DocumentListCode).indexOf($scope.SearchDocument.InputFilter) > -1)
                    c1 = true;
                else if (item.DocumentListCode == undefined || (item.DocumentListCode).indexOf($scope.SearchDocument.InputFilter) < 0)
                    c1 = false;

                if ($scope.SearchDocument.InputFilter != undefined && $scope.SearchDocument.InputFilter != "" && item.NameFile != undefined && (item.NameFile).indexOf($scope.SearchDocument.InputFilter) > -1)
                    c2 = true;
                else if (item.NameFile == undefined || (item.NameFile).indexOf($scope.SearchDocument.InputFilter) < 0)
                    c2 = false;

            }


            if ($scope.SearchDocument.SelectType != undefined) {
                if (item.DocumentTypeId == $scope.SearchDocument.SelectType.Documentid)
                    c3 = true;
                else
                    c3 = false;
            }
            else
                c3 = true;

            if ((c1 || c2) && c3) {
                return item;
            }
        });

        $scope.retpage_4 = [];
        $scope.range_4();

        $("#loading").fadeOut();
    }

    /* Issue */
    $scope.OnClickAddIssue = function () {
        $scope.TableAdd = {};
        $('#ModalIssue').modal('show');
    }

    $scope.OnClickTableIssue = function (val) {
        if (val != undefined) {
            $scope.TableAdd = {};
            $scope.TableAdd = angular.copy(val);
            $('#ModalIssue').modal('show');
        }
    }

    $scope.OnClickSaveIssue = function (action) {
        try {
            if ($scope.TableAdd.Issue == undefined)
                throw "กรุณาระบุรายละเอียด";
            else if (($scope.TableAdd.Solution == undefined || $scope.TableAdd.Solution == '') && $scope.TableAdd.Issue.IsStatus == 'Wait')
                throw "กรุณาระบุวิธีแก้ไข";
            else {
                $("#loading").fadeIn();
                var data = {
                    AuditIssueId: $scope.TableAdd.AuditIssueId,
                    AuditAccountId: $scope.TablePeriod.AccountSelect.AuditAccountId,
                    AuditIssueRefCode: $scope.TableAdd.AuditIssueRefCode,
                    Issue: $scope.TableAdd.Issue,
                    Solution: $scope.TableAdd.Solution,
                };
                console.log(data);

                var qq = $q.all([serviceAccount.postAccountAuditIssue(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                showSuccessText('บันทึกรายการเรียบร้อย');
                                $scope.TableAdd = {};
                                if (action == 'back') {
                                    $('#ModalIssue').modal('hide');
                                }
                                $scope.initModal();
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

    $scope.OnClickSaveChangeIssue = function (val, status) {
        try {
            if ((val.Solution == undefined || val.Solution == '') && status == 'Complete')
                throw "กรุณาระบุวิธีแก้ไข";
            else {
                $("#loading").fadeIn();
                var data = {
                    AuditIssueId: val.AuditIssueId,
                    IsStatus: status
                };
                console.log(data);

                var qq = $q.all([serviceAccount.postAccountAuditIssueChangeStatus(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                showSuccessText('เปลี่ยนสถานะรายการเรียบร้อย');
                                $scope.initModal();
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

    $scope.OnClickDeleteIssue = function (values) {
        if (values != undefined) {
            $scope.TableAdd = [];
            $scope.TableAdd = angular.copy(values);
            $scope.TableAdd.Action = "Issue";
            $('#ModalConfirm').modal('show');
        }
    }

    /* Conclusion */
    $scope.OnClickAddConclusion = function () {
        $scope.TableAdd = {};
        $scope.TableAdd.IsConclusion = 'Satisfied';
        $('#ModalConclusion').modal('show');
    }

    $scope.OnClickAuditProgram = function () {
        $scope.AuditProgram = {};
        $scope.AuditProgram = $scope.Parameter.AuditProgram[0];
        if ($scope.AuditProgram == undefined)
            showWariningToast('ไม่พบ Audit Program สำหรับ W/P No นี้');

        if ($scope.AuditProgram.AuditPrograms.AuditDetail != undefined && $scope.AuditProgram.AuditPrograms.AuditDetail.length > 0) {
            $scope.itemsPerPage_3 = "10";
            globalService.SetupSequence($scope.AuditProgram.AuditPrograms.AuditDetail);
            $scope.retpage_3 = [];
            $scope.range_3();
            $('#ModalConclusion').modal('hide');
            $('#ModalAuditProgram').modal('show');
        }
        else
            showWariningToast('ไม่พบ Audit Program สำหรับ W/P No นี้');
    }

    $scope.OnClickTableConclusion = function (val) {
        if (val != undefined) {
            $scope.TableAdd = {};
            $scope.TableAdd = angular.copy(val);
            $('#ModalConclusion').modal('show');
        }
    }

    $scope.OnClickSaveConclusion = function (action) {
        try {
            if ($scope.TableAdd.VerifyDesc == undefined || $scope.TableAdd.VerifyDesc == '')
                throw "กรุณาระบุวิธีการตรวจสอบ";
            else {
                $("#loading").fadeIn();
                var data = {
                    ConclusionId: $scope.TableAdd.ConclusionId,
                    AuditAccountId: $scope.TablePeriod.AccountSelect.AuditAccountId,
                    ConclusionRefCode: $scope.TableAdd.ConclusionRefCode,
                    VerifyDesc: $scope.TableAdd.VerifyDesc,
                    ConclusionDesc: $scope.TableAdd.ConclusionDesc,
                    IsConclusion: $scope.TableAdd.IsConclusion,
                    SequenceAuditProgram: $scope.TableAdd.SequenceAuditProgram
                };
                console.log(data);

                var qq = $q.all([serviceAccount.postAccountAuditConclusion(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                showSuccessText('บันทึกรายการเรียบร้อย');
                                $scope.TableAdd = {};
                                if (action == 'back') {
                                    $('#ModalConclusion').modal('hide');
                                }
                                $scope.initModal();
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

    $scope.OnClickDeleteConclusion = function (values) {
        if (values != undefined) {
            $scope.TableAdd = [];
            $scope.TableAdd = angular.copy(values);
            $scope.TableAdd.Action = "Conclusion";
            $('#ModalConfirm').modal('show');
        }
    }

    $scope.OnClickAuditProgramSelect = function (val) {
        $('#ModalAuditProgram').modal('hide');
        if (val != null) {
            $scope.TableAdd.VerifyDesc = val.Name;
            $scope.TableAdd.SequenceAuditProgram = val.Sequence;
        }
        $('#ModalConclusion').modal('show');
    }

    /* Reference */
    $scope.OnClickAddReference = function () {
        var qq = $q.all([serviceParameter.getParameterAccountAuditAccountWithPeriod($scope.UserProfiles.PeriodIdActive)]).then(function (data) {
            try {
                if (data[0] != undefined && data[0] != "") {
                    $scope.SearchTrial = {};
                    if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                        $scope.Parameter.TrialBalanceListMain = data[0].data.responsedata;

                        var main = _.where($scope.Parameter.TrialBalanceListMain, { AuditAccountId: $scope.TablePeriod.AccountSelect.AuditAccountId })[0];
                        if (main != undefined) {
                            var index = $scope.Parameter.TrialBalanceListMain.indexOf(main);
                            if (index !== -1) {
                                $scope.Parameter.TrialBalanceListMain.splice(index, 1);
                            }
                        }

                        globalService.SetupSequence($scope.Parameter.TrialBalanceListMain);

                        if ($scope.TablePeriod.AccountSelect.References != undefined && $scope.TablePeriod.AccountSelect.References.length > 0) {
                            _.each($scope.TablePeriod.AccountSelect.References, function (item) {
                                var select = _.where($scope.Parameter.TrialBalanceListMain, { AuditAccountId: item.AuditReferenceAuditAccountId })[0];
                                if (select != undefined)
                                    select.IsReference = true;
                                else
                                    select.IsReference = false;
                            })
                        };

                        $scope.Parameter.TrialBalanceList = $scope.Parameter.TrialBalanceListMain;
                        $scope.itemsPerPage_5 = "10";
                        $scope.retpage_5 = [];
                        $scope.range_5();
                        $('#ModalTrialReference').modal('show');
                    }
                    else if (data[0].data.responsecode == '400') { showErrorToast(data[0].data.errormessage); }
                }
            }
            catch (err) {
                showErrorToast(err);
            }
            finally {
                $("#loading").fadeOut();
            }
        });
    }

    $scope.OnClickSaveReference = function () {
        try {
            var data = [];
            _.each($scope.Parameter.TrialBalanceList, function (item) {
                if (item.IsReference) {
                    data.push({
                        AuditAccountId: $scope.TablePeriod.AccountSelect.AuditAccountId,
                        AuditReferenceAuditAccountId: item.AuditAccountId,
                        TrialBalanceId: item.TrialBalanceId
                    });
                }
            });
            console.log(data);

            var qq = $q.all([serviceAccount.postAccountAuditAccountReference($scope.TablePeriod.AccountSelect.AuditAccountId, data)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            showSuccessText('บันทึกรายการเรียบร้อย');
                            $('#ModalTrialReference').modal('hide');
                            $scope.initModal();
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
            showErrorToast(err);
        }
        finally {
            $("#loading").fadeOut();
        }
    }

    $scope.OnClickSearchReference = function () {
        $scope.Parameter.TrialBalanceList = $scope.Parameter.TrialBalanceListMain;
        $("#loading").fadeIn();

        $scope.Parameter.TrialBalanceList = _.filter($scope.Parameter.TrialBalanceList, function (item) {

            var c1 = true, c2 = true, c3 = true, c4 = true, c5 = true, c6 = true;

            if (($scope.SearchTrial.InputFilter != undefined && $scope.SearchTrial.InputFilter != "")) {

                if ($scope.SearchTrial.InputFilter != undefined && $scope.SearchTrial.InputFilter != "" && item.TrialBalance.AccountCode != undefined && (item.TrialBalance.AccountCode).indexOf($scope.SearchTrial.InputFilter) > -1)
                    c1 = true;
                else if (item.TrialBalance.AccountCode == undefined || (item.TrialBalance.AccountCode).indexOf($scope.SearchTrial.InputFilter) < 0)
                    c1 = false;

                if ($scope.SearchTrial.InputFilter != undefined && $scope.SearchTrial.InputFilter != "" && item.TrialBalance.AccountName != undefined && (item.TrialBalance.AccountName).indexOf($scope.SearchTrial.InputFilter) > -1)
                    c2 = true;
                else if (item.TrialBalance.AccountName == undefined || (item.TrialBalance.AccountName).indexOf($scope.SearchTrial.InputFilter) < 0)
                    c2 = false;

            }

            if ((c1 || c2)) {
                return item;
            }
        });

        $scope.retpage_5 = [];
        $scope.range_5();

        $("#loading").fadeOut();
    }

    // #0

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
        return $scope.TablePeriod.AccountSelect != undefined ? Math.ceil($scope.TablePeriod.AccountSelect.Documents.length / parseInt($scope.itemsPerPage)) - 1 : 0;
    };

    $scope.range = function () {
        $scope.itemsCount = $scope.TablePeriod.AccountSelect != undefined ? $scope.TablePeriod.AccountSelect.Documents.length : 0;
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


    // #1

    $scope.currentPage_1 = 0;

    $scope.OnClickChangePageTotal_1 = function () {
        $scope.retpage_1 = [];
        $scope.range_1();
    }

    $scope.pageCount_1 = function () {
        return $scope.TablePeriod.AccountSelect != undefined ? Math.ceil($scope.TablePeriod.AccountSelect.Conclusions.length / parseInt($scope.itemsPerPage_1)) - 1 : 0;
    };

    $scope.range_1 = function () {
        $scope.itemsCount_1 = $scope.TablePeriod.AccountSelect != undefined ? $scope.TablePeriod.AccountSelect.Conclusions.length : 0;
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

    // #2

    $scope.currentPage_2 = 0;

    $scope.OnClickChangePageTotal_2 = function () {
        $scope.retpage_2 = [];
        $scope.range_2();
    }

    $scope.pageCount_2 = function () {
        return $scope.TablePeriod.AccountSelect != undefined ? Math.ceil($scope.TablePeriod.AccountSelect.Issues.length / parseInt($scope.itemsPerPage_2)) - 1 : 0;
    };

    $scope.range_2 = function () {
        $scope.itemsCount_2 = $scope.TablePeriod.AccountSelect != undefined ? $scope.TablePeriod.AccountSelect.Issues.length : 0;
        $scope.pageshow_2 = $scope.pageCount_2() > $scope.LimitPage && $scope.pageCount_2() > 0 ? 1 : 0;

        var rangeSize = 50;
        var ret_2 = [];
        var start = 1;

        for (var i = 0; i <= $scope.pageCount_2(); i++) {
            ret_2.push({ code: i, name: i + 1, show: i <= rangeSize ? 1 : 0 });
        }
        $scope.pageshowdata_2 = 1;
        $scope.retpage_2 = ret_2;

        $scope.changePages_2 = $scope.retpage_2[0];
        if ($scope.retpage_2 != undefined && $scope.retpage_2.length > 0)
            $scope.currentPage_2 = $scope.retpage_2[0].code;
    };

    $scope.showallpages_2 = function () {
        if ($scope.pageshowdata_2 == 1) {
            _.each($scope.retpage_2, function (e) {
                e.show = 1;
            });
            $scope.pageshowdata_2 = 0;
        }
        else {
            _.each($scope.retpage_2, function (e) {
                if (e.code >= $scope.LimitFirst && e.code <= $scope.LimitPage)
                    e.show = 1;
                else
                    e.show = 0;
            });
            $scope.pageshowdata_2 = 1;
        }
    };

    $scope.prevPage_2 = function () {
        if ($scope.currentPage_2 > 0) {
            $scope.currentPage_2--;
        }

        if ($scope.currentPage_2 < $scope.LimitFirst && $scope.currentPage_2 >= 1) {
            $scope.LimitFirst = $scope.LimitFirst - $scope.LimitPage;
            $scope.LimitPage = $scope.LimitPage - $scope.LimitPage;
            for (var i = 1; i <= $scope.retpage_2.length; i++) {
                if (i >= $scope.LimitFirst && i <= $scope.LimitPage) {
                    $scope.retpage_2[i - 1].show = 1;
                }
                else
                    $scope.retpage_2[i - 1].show = 0;
            }
        }
    };

    $scope.prevPageDisabled_2 = function () {
        return $scope.currentPage_2 === 0 ? "disabled" : "";
    };

    $scope.nextPage_2 = function () {
        if ($scope.currentPage_2 < $scope.pageCount_2()) {
            $scope.currentPage_2++;
        }

        if ($scope.currentPage_2 >= $scope.LimitPage && $scope.currentPage_2 <= $scope.pageCount_2()) {
            $scope.LimitFirst = $scope.LimitFirst + $scope.LimitPage;
            $scope.LimitPage = $scope.LimitPage + $scope.LimitPage;
            for (var i = 1; i <= $scope.retpage_2.length; i++) {
                if (i >= $scope.LimitFirst && i <= $scope.LimitPage) {
                    $scope.retpage_2[i - 1].show = 1;
                }
                else
                    $scope.retpage_2[i - 1].show = 0;
            }
        }

    };

    $scope.nextPageDisabled_2 = function () {
        return $scope.currentPage_2 === $scope.pageCount_2() ? "disabled" : "";
    };

    $scope.setPage_2 = function (n) {
        $scope.currentPage_2 = $scope.changePages_2.code;
    };

    // #3

    $scope.currentPage_3 = 0;

    $scope.OnClickChangePageTotal_3 = function () {
        $scope.retpage_3 = [];
        $scope.range_3();
    }

    $scope.pageCount_3 = function () {
        return $scope.AuditProgram != undefined ? Math.ceil($scope.AuditProgram.AuditPrograms.AuditDetail.length / parseInt($scope.itemsPerPage_3)) - 1 : 0;
    };

    $scope.range_3 = function () {
        $scope.itemsCount_3 = $scope.AuditProgram != undefined ? $scope.AuditProgram.AuditPrograms.AuditDetail.length : 0;
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

    // #4

    $scope.currentPage_4 = 0;

    $scope.OnClickChangePageTotal_4 = function () {
        $scope.retpage_4 = [];
        $scope.range_4();
    }

    $scope.pageCount_4 = function () {
        return $scope.Parameter.DocumentList != undefined ? Math.ceil($scope.Parameter.DocumentList.length / parseInt($scope.itemsPerPage_4)) - 1 : 0;
    };

    $scope.range_4 = function () {
        $scope.itemsCount_4 = $scope.Parameter.DocumentList != undefined ? $scope.Parameter.DocumentList.length : 0;
        $scope.pageshow_4 = $scope.pageCount_4() > $scope.LimitPage && $scope.pageCount_4() > 0 ? 1 : 0;

        var rangeSize = 50;
        var ret_4 = [];
        var start = 1;

        for (var i = 0; i <= $scope.pageCount_4(); i++) {
            ret_4.push({ code: i, name: i + 1, show: i <= rangeSize ? 1 : 0 });
        }
        $scope.pageshowdata_4 = 1;
        $scope.retpage_4 = ret_4;

        $scope.changePages_4 = $scope.retpage_4[0];
        if ($scope.retpage_4 != undefined && $scope.retpage_4.length > 0)
            $scope.currentPage_4 = $scope.retpage_4[0].code;
    };

    $scope.showallpages_4 = function () {
        if ($scope.pageshowdata_4 == 1) {
            _.each($scope.retpage_4, function (e) {
                e.show = 1;
            });
            $scope.pageshowdata_4 = 0;
        }
        else {
            _.each($scope.retpage_4, function (e) {
                if (e.code >= $scope.LimitFirst && e.code <= $scope.LimitPage)
                    e.show = 1;
                else
                    e.show = 0;
            });
            $scope.pageshowdata_4 = 1;
        }
    };

    $scope.prevPage_4 = function () {
        if ($scope.currentPage_4 > 0) {
            $scope.currentPage_4--;
        }

        if ($scope.currentPage_4 < $scope.LimitFirst && $scope.currentPage_4 >= 1) {
            $scope.LimitFirst = $scope.LimitFirst - $scope.LimitPage;
            $scope.LimitPage = $scope.LimitPage - $scope.LimitPage;
            for (var i = 1; i <= $scope.retpage_4.length; i++) {
                if (i >= $scope.LimitFirst && i <= $scope.LimitPage) {
                    $scope.retpage_4[i - 1].show = 1;
                }
                else
                    $scope.retpage_4[i - 1].show = 0;
            }
        }
    };

    $scope.prevPageDisabled_4 = function () {
        return $scope.currentPage_4 === 0 ? "disabled" : "";
    };

    $scope.nextPage_4 = function () {
        if ($scope.currentPage_4 < $scope.pageCount_4()) {
            $scope.currentPage_4++;
        }

        if ($scope.currentPage_4 >= $scope.LimitPage && $scope.currentPage_4 <= $scope.pageCount_4()) {
            $scope.LimitFirst = $scope.LimitFirst + $scope.LimitPage;
            $scope.LimitPage = $scope.LimitPage + $scope.LimitPage;
            for (var i = 1; i <= $scope.retpage_4.length; i++) {
                if (i >= $scope.LimitFirst && i <= $scope.LimitPage) {
                    $scope.retpage_4[i - 1].show = 1;
                }
                else
                    $scope.retpage_4[i - 1].show = 0;
            }
        }

    };

    $scope.nextPageDisabled_4 = function () {
        return $scope.currentPage_4 === $scope.pageCount_4() ? "disabled" : "";
    };

    $scope.setPage_4 = function (n) {
        $scope.currentPage_4 = $scope.changePages_4.code;
    };

    // #5

    $scope.currentPage_5 = 0;

    $scope.OnClickChangePageTotal_5 = function () {
        $scope.retpage_5 = [];
        $scope.range_5();
    }

    $scope.pageCount_5 = function () {
        return $scope.Parameter.TrialBalanceList != undefined ? Math.ceil($scope.Parameter.TrialBalanceList.length / parseInt($scope.itemsPerPage_5)) - 1 : 0;
    };

    $scope.range_5 = function () {
        $scope.itemsCount_5 = $scope.Parameter.TrialBalanceList != undefined ? $scope.Parameter.TrialBalanceList.length : 0;
        $scope.pageshow_5 = $scope.pageCount_5() > $scope.LimitPage && $scope.pageCount_5() > 0 ? 1 : 0;

        var rangeSize = 50;
        var ret_5 = [];
        var start = 1;

        for (var i = 0; i <= $scope.pageCount_5(); i++) {
            ret_5.push({ code: i, name: i + 1, show: i <= rangeSize ? 1 : 0 });
        }
        $scope.pageshowdata_5 = 1;
        $scope.retpage_5 = ret_5;

        $scope.changePages_5 = $scope.retpage_5[0];
        if ($scope.retpage_5 != undefined && $scope.retpage_5.length > 0)
            $scope.currentPage_5 = $scope.retpage_5[0].code;
    };

    $scope.showallpages_5 = function () {
        if ($scope.pageshowdata_5 == 1) {
            _.each($scope.retpage_5, function (e) {
                e.show = 1;
            });
            $scope.pageshowdata_5 = 0;
        }
        else {
            _.each($scope.retpage_5, function (e) {
                if (e.code >= $scope.LimitFirst && e.code <= $scope.LimitPage)
                    e.show = 1;
                else
                    e.show = 0;
            });
            $scope.pageshowdata_5 = 1;
        }
    };

    $scope.prevPage_5 = function () {
        if ($scope.currentPage_5 > 0) {
            $scope.currentPage_5--;
        }

        if ($scope.currentPage_5 < $scope.LimitFirst && $scope.currentPage_5 >= 1) {
            $scope.LimitFirst = $scope.LimitFirst - $scope.LimitPage;
            $scope.LimitPage = $scope.LimitPage - $scope.LimitPage;
            for (var i = 1; i <= $scope.retpage_5.length; i++) {
                if (i >= $scope.LimitFirst && i <= $scope.LimitPage) {
                    $scope.retpage_5[i - 1].show = 1;
                }
                else
                    $scope.retpage_5[i - 1].show = 0;
            }
        }
    };

    $scope.prevPageDisabled_5 = function () {
        return $scope.currentPage_5 === 0 ? "disabled" : "";
    };

    $scope.nextPage_5 = function () {
        if ($scope.currentPage_5 < $scope.pageCount_5()) {
            $scope.currentPage_5++;
        }

        if ($scope.currentPage_5 >= $scope.LimitPage && $scope.currentPage_5 <= $scope.pageCount_5()) {
            $scope.LimitFirst = $scope.LimitFirst + $scope.LimitPage;
            $scope.LimitPage = $scope.LimitPage + $scope.LimitPage;
            for (var i = 1; i <= $scope.retpage_5.length; i++) {
                if (i >= $scope.LimitFirst && i <= $scope.LimitPage) {
                    $scope.retpage_5[i - 1].show = 1;
                }
                else
                    $scope.retpage_5[i - 1].show = 0;
            }
        }

    };

    $scope.nextPageDisabled_5 = function () {
        return $scope.currentPage_5 === $scope.pageCount_5() ? "disabled" : "";
    };

    $scope.setPage_5 = function (n) {
        $scope.currentPage_5 = $scope.changePages_5.code;
    };
});