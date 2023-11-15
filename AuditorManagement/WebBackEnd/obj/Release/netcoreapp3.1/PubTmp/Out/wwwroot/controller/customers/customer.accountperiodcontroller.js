angular.module('FOCUSAPP').controller('CustomerAccountperiodController', function ($stateParams, $rootScope, $state, $scope, $http, $timeout, $q, GlobalVar, globalService,
    serviceAccount, serviceParameter, serviceCustomer) {
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
            var qq = $q.all([serviceAccount.getAccountPeriods(), serviceCustomer.getCustomerWithKey($scope.UserProfiles.CustomerIdActive)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                            $scope.TableMain = data[0].data.responsedata;
                            $scope.TableYear = data[0].data.responsegroup;
                        }
                        else if (data[0].data.responsecode == '400') { showErrorToast(data[0].data.errormessage); }

                        if (data[1].data.responsecode == '200' && data[1].data.responsedata != undefined && data[1].data.responsedata != "") {
                            $scope.CustomerData = data[1].data.responsedata;
                        }
                        else if (data[1].data.responsecode == '400') { showErrorToast(data[1].data.errormessage); }

                        console.log($scope.TableMain);
                        $scope.Table = [];
                        _.each($scope.TableYear, function (item) {
                            var value = {};
                            value.Year = item;
                            value.Detail = [];
                            value.Detail = _.where($scope.TableMain, { Year: item });
                            _.each(value.Detail, function (val) { val.StartDate = formatDate(val.StartDate); val.EndDate = formatDate(val.EndDate); })
                            globalService.SetupSequence(value.Detail);
                            $scope.Table.push(value);
                        });

                        console.log($scope.Table);
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

    $scope.OnClickPeriod = function (val) {
        if (val != undefined) {
            $("#loading").fadeIn();
            var qq = $q.all([serviceAccount.getAccountPeriodsWithKey(val.PeriodId),
            serviceCustomer.getDocumentPeriodWithKey(val.PeriodId),
            globalService.getConfigSystem(),
            serviceCustomer.getAuditIssePeriodWithKey(val.PeriodId)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                            $scope.TablePeriod = data[0].data.responsedata;
                            $scope.DocumentList = data[1].data.responsedata.DocumentList;
                            $scope.ConfigSystem = data[2].data.responsedata;
                            $scope.AuditIssue = data[3].data.responsedata.AuditIssue;

                            $scope.TablePeriod.Type = $scope.TablePeriod.PeriodType == 'Year' ? 'ปี' : 'ไตรมาส';
                            $scope.TablePeriod.Quater = $scope.TablePeriod.PeriodType == 'Year' ? '' : '- ' + $scope.TablePeriod.Quater;
                            $scope.TablePeriod.Date = formatDate($scope.TablePeriod.StartDate) + ' - ' + formatDate($scope.TablePeriod.EndDate);
                            $scope.TablePeriod.UpdatedOn = formatDateFull($scope.TablePeriod.UpdatedOn);
                            $scope.TablePeriod.Mapping = $scope.TablePeriod.IsMapPeriod == 'Y' ? 'เปรียบเทียบข้อมูล' : 'ไม่เปรียบเทียบข้อมูล';
                            $scope.TablePeriod.MappingYear = $scope.TablePeriod.MapYear;

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

                            globalService.SetupSequence($scope.TablePeriod.TrialBalance);
                            $scope.TablePeriod.Footer = {};
                            let amount = $scope.TablePeriod.TrialBalance.reduce((s, f) => {
                                return s + f.Amount;
                            }, 0);
                            $scope.TablePeriod.Footer.Amount = amount;

                            $scope.itemsPerPage = "10";
                            $scope.Search.SelectStatus = "All";
                            $scope.retpage = [];
                            $scope.range();

                            globalService.SetupSequence($scope.DocumentList);
                            $scope.itemsPerPage_1 = "10";
                            $scope.Search.SelectStatus_1 = "All";
                            $scope.retpage_1 = [];
                            $scope.range_1();
                            console.log($scope.DocumentList);

                            globalService.SetupSequence($scope.AuditIssue);
                            $scope.itemsPerPage_2 = "10";
                            $scope.Search.SelectStatus_2 = "All";
                            $scope.retpage_2 = [];
                            $scope.range_2();
                            console.log($scope.AuditIssue);
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

    $scope.OnClickTableIssue = function (val) {
        if (val != undefined) {
            $scope.TableAdd = {};
            $scope.TableAdd = angular.copy(val);
            $('#ModalIssue').modal('show');
        }
    }

    $scope.OnClickSaveIssue = function () {
        try {
            if ($scope.TableAdd.Issue == undefined)
                throw "กรุณาระบุรายละเอียด";
            else if (($scope.TableAdd.Solution == undefined || $scope.TableAdd.Solution == '') && $scope.TableAdd.Issue.IsStatus == 'Wait')
                throw "กรุณาระบุวิธีแก้ไข";
            else {
                $("#loading").fadeIn();
                var data = {
                    AuditIssueId: $scope.TableAdd.AuditIssueId,
                    AuditAccountId: $scope.TableAdd.AuditAccountId,
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
                                $('#ModalIssue').modal('hide');

                                $q.all([serviceCustomer.getAuditIssePeriodWithKey($scope.TablePeriod.PeriodId)]).then(function (data) {
                                    try {
                                        if (data[0] != undefined && data[0] != "") {
                                            if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                                                $scope.AuditIssue = data[0].data.responsedata.AuditIssue;

                                                $scope.itemsPerPage_2 = "10";
                                                $scope.Search.SelectStatus_2 = "All";
                                                $scope.retpage_2 = [];
                                                $scope.range_2();
                                                console.log($scope.AuditIssue);
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

    /* Document */
    $scope.OnClickAddDocument = function () {
        $("#loading").fadeIn();
        var qq = $q.all([serviceParameter.getParameterDocumentStyle(), serviceCustomer.getParameterDocumentTypeOwner($scope.TablePeriod.OwnerId)]).then(function (data) {
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

    $scope.OnClickView = function (val) {
        if (val.DocumentStyleId == 'DS002')
            window.open(val.LinkPath, "_blank");
        else if (val.DocumentStyleId == 'DS001')
            window.open($scope.ConfigSystem.ImagePath + val.OwnerId + $scope.ConfigSystem.FilePath + val.PathFile, "_blank");
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
                    DocumentListId: $scope.TableAdd.DocumentListId,
                    DocumentListCode: $scope.TableAdd.DocumentListCode,
                    BranchId: $scope.TablePeriod.BranchId,
                    OwnerId: $scope.TablePeriod.OwnerId,
                    CustomerId: $scope.TablePeriod.CustomerId,
                    DocumentStyleId: $scope.TableAdd.SelectDocumentStyle != undefined ? $scope.TableAdd.SelectDocumentStyle.Code : undefined,
                    DocumentTypeId: $scope.TableAdd.SelectDocumentType != undefined ? $scope.TableAdd.SelectDocumentType.Documentid : undefined,
                    LinkPath: $scope.TableAdd.LinkPath,
                    Remark: $scope.TableAdd.Remark,
                };

                console.log(data);
                var qq = $q.all([serviceCustomer.postDocumentList(data)]).then(function (data) {
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
                                                url: baseURL + "Customers/UploadFileDocument?DocumentId=" + data[0].data.responsedata.DocumentListId + "&OwnerId=" + data[0].data.responsedata.OwnerId,
                                                data: formData,
                                                processData: false,
                                                contentType: false,
                                                type: "POST",
                                                success: function (data) {
                                                    $scope.OnClickPeriod($scope.TablePeriod);
                                                    $scope.$apply();
                                                    showSuccessText('บันทึกรายการเรียบร้อย');
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
                                    $scope.OnClickPeriod($scope.TablePeriod);
                                    $scope.$apply();
                                    showSuccessText('บันทึกรายการเรียบร้อย');
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

    //#0 
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
        return $scope.TablePeriod != undefined ? Math.ceil($scope.TablePeriod.TrialBalance.length / parseInt($scope.itemsPerPage)) - 1 : 1;
    };

    $scope.range = function () {
        $scope.itemsCount = $scope.TablePeriod != undefined ? $scope.TablePeriod.TrialBalance.length : 0;
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
        return $scope.DocumentList != undefined ? Math.ceil($scope.DocumentList.length / parseInt($scope.itemsPerPage_1)) - 1 : 1;
    };

    $scope.range_1 = function () {
        $scope.itemsCount_1 = $scope.DocumentList != undefined ? $scope.DocumentList.length : 0;
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

    // #2

    $scope.currentPage_2 = 0;

    $scope.OnClickChangePageTotal_2 = function () {
        $scope.retpage_2 = [];
        $scope.range_2();
    }

    $scope.pageCount_2 = function () {
        return $scope.AuditIssue != undefined ? Math.ceil($scope.AuditIssue.length / parseInt($scope.itemsPerPage_2)) - 1 : 0;
    };

    $scope.range_2 = function () {
        $scope.itemsCount_2 = $scope.AuditIssue != undefined ? $scope.AuditIssue.length : 0;
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

            var type = $scope.retpage_2.filter(function (item) { return item.code == $scope.currentPage_2; });
            if (type.length > 0) {
                $scope.currentPage_2 = type[0];
            }
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

            var type = $scope.retpage_2.filter(function (item) { return item.code == $scope.currentPage_2; });
            if (type.length > 0) {
                $scope.currentPage_2 = type[0];
            }
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

});
