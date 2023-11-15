angular.module('FOCUSAPP').controller('AccountProposalController', function ($stateParams, $rootScope, $state, $scope, $http, $timeout, $q, GlobalVar, globalService,
    serviceAccount, serviceParameter, serviceOrganize) {
    var baseURL = $("base")[0].href;//$("base").attr("href");
    var config = GlobalVar.HeaderConfig;
    $scope.Search = [];
    $scope.Table = [];
    $scope.Parameter = [];
    $scope.TableMain = [];

    $scope.initComponent = function () {
        $('.dropdown2').select2();
        if ($("#inputstart-popup").length) {
            $('#inputstart-popup').datepicker({
                enableOnReadonly: true,
                todayHighlight: true,
                autoclose: true,
                format: "dd/mm/yyyy"
            });
        }

        if ($("#inputexpire-popup").length) {
            $('#inputexpire-popup').datepicker({
                enableOnReadonly: true,
                todayHighlight: true,
                autoclose: true,
                format: "dd/mm/yyyy"
            });
        }

        $('#section1').summernote({
            airMode: false, height: 300, shortcuts: false
        });
        $('#section2').summernote({
            airMode: false, height: 300, shortcuts: false
        });
        $('#section3').summernote({
            airMode: false, height: 300, shortcuts: false
        });
        $('#section4').summernote({
            airMode: false, height: 300, shortcuts: false
        });
    }

    $scope.init = function () {
        try {
            $scope.initComponent();
            $("#loading").fadeIn();
            var qq = $q.all([serviceAccount.getAccountProposal(), serviceParameter.getParameterCustomerWithOwner()]).then(function (data) {
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

    $scope.initAdd = function () {
        $scope.initComponent();
        $("#loading").fadeIn();

        var qq = $q.all([serviceOrganize.getHourRate(), serviceParameter.getParemeterProposal(), serviceParameter.getParameterCustomerWithOwner()]).then(function (data) {
            try {
                if (data[0] != undefined && data[0] != "") {
                    if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                        $scope.Parameter.HourRate = data[0].data.responsedata;
                    }
                    else if (data[0].data.responsecode == '400') { showErrorToast(data[0].data.errormessage); }
                }

                if (data[1] != undefined && data[1] != "") {
                    if (data[1].data.responsecode == '200' && data[1].data.responsedata != undefined && data[1].data.responsedata != "") {
                        $scope.Parameter.Proposal = data[1].data.responsedata;
                    }
                    else if (data[1].data.responsecode == '400') { showErrorToast(data[1].data.errormessage); }
                }

                if (data[2] != undefined && data[2] != "") {
                    if (data[2].data.responsecode == '200' && data[2].data.responsedata != undefined && data[2].data.responsedata != "") {
                        $scope.Parameter.Customer = data[2].data.responsedata;
                    }
                    else if (data[2].data.responsecode == '400') { showErrorToast(data[2].data.errormessage); }
                }

                if ($stateParams.ref_id != undefined && $stateParams.ref_id != '') {
                    var qq = $q.all([serviceAccount.getAccountProposalKey($stateParams.ref_id)]).then(function (data1) {
                        try {
                            if (data1[0] != undefined && data1[0] != "") {
                                if (data1[0].data.responsecode == 200) {
                                    $scope.TableAdd = data1[0].data.responsedata;
                                    $scope.OnBindingAdd();
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
                else {
                    $scope.OnInitAddNew();
                }

                $("#loading").fadeOut();
            }
            catch (err) {
                showErrorToast(err);
                $("#loading").fadeOut();
            }
        });

        //  $("#summernote").summernote("code", val.Detail);
        // var textareaValue = $('#summernote').summernote('code');
        // document.getElementById('areatext').innerHTML = textareaValue;
    }

    $scope.OnBinding = function () {

        $scope.itemsPerPage = "10";
        $scope.Search.SelectStatus = "All";
        globalService.SetupSequence($scope.TableMain);
        _.each($scope.TableMain, function (item) { item.StartDate = formatDate(item.StartDate); item.ExpireDate = formatDate(item.ExpireDate); })
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
            $state.go('office-proposaladd', { ref_id: val.ProposalId });
        }
    }

    $scope.OnClickAdd = function () {
        $state.go('office-proposaladd');
    }

    $scope.OnInitAddNew = function () {
        $scope.TableAdd = {};

        if ($scope.Parameter.HourRate != undefined) {
            $scope.TableAdd.AuditRate = $scope.Parameter.HourRate.AuditHour;
            $scope.TableAdd.PrepareRate = $scope.Parameter.HourRate.PrepareHour;
            $scope.TableAdd.ReviewRate = $scope.Parameter.HourRate.ReviewHour;
            $scope.TableAdd.ManagerRate = $scope.Parameter.HourRate.ManagerHour;
        }
        else
            $scope.TableAdd.AuditRate = $scope.TableAdd.PrepareRate = $scope.TableAdd.ReviewRate = $scope.TableAdd.ManagerRate = 0;

        $scope.TableAdd.GrandTotal = $scope.TableAdd.AuditAccountAmount = $scope.TableAdd.ProfitAccountAmount = $scope.TableAdd.TotalAmount =
            $scope.TableAdd.ManagerAmount = $scope.TableAdd.ReviewAmount = $scope.TableAdd.PrepareAmount = $scope.TableAdd.AuditAmount = 0;

        if ($scope.Parameter.Proposal != undefined) {
            $("#section1").summernote("code", $scope.Parameter.Proposal.Section1);
            $("#section2").summernote("code", $scope.Parameter.Proposal.Section2);
            $("#section3").summernote("code", $scope.Parameter.Proposal.Section3);
            $("#section4").summernote("code", $scope.Parameter.Proposal.Section4);
        }
    }

    $scope.OnBindingAdd = function () {

        var type = $scope.Parameter.Customer.filter(function (item) { return item.CustomerId == $scope.TableAdd.CustomerId; });
        if (type.length > 0)
            $scope.TableAdd.SelectCustomer = type[0];

        $scope.TableAdd.StartDate = formatDate($scope.TableAdd.StartDate);
        $scope.TableAdd.ExpireDate = formatDate($scope.TableAdd.ExpireDate);

        $scope.OnChangeRate("Profit");

        $("#section1").summernote("code", $scope.TableAdd.Section1);
        $("#section2").summernote("code", $scope.TableAdd.Section2);
        $("#section3").summernote("code", $scope.TableAdd.Section3);
        $("#section4").summernote("code", $scope.TableAdd.Section4);

        if ($scope.TableAdd.IsStatus != "Wait" && $scope.TableAdd.IsStatus != undefined) {
            $('#section1').summernote('disable');
            $('#section2').summernote('disable');
            $('#section3').summernote('disable');
            $('#section4').summernote('disable');
        }
    }

    $scope.OnChangeRate = function (type) {
        if (type == 'Audit') {
            if ($scope.TableAdd.AuditHour === '' || $scope.TableAdd.AuditHour == undefined)
                $scope.TableAdd.AuditAmount = 0;
            else
                $scope.TableAdd.AuditAmount = $scope.TableAdd.AuditRate * $scope.TableAdd.AuditHour;
        }
        else if (type == 'Prepare') {
            if ($scope.TableAdd.PrepareHour === '' || $scope.TableAdd.PrepareHour == undefined)
                $scope.TableAdd.PrepareAmount = 0;
            else
                $scope.TableAdd.PrepareAmount = $scope.TableAdd.PrepareRate * $scope.TableAdd.PrepareHour;
        }
        else if (type == 'Review') {
            if ($scope.TableAdd.ReviewHour === '' || $scope.TableAdd.ReviewHour == undefined)
                $scope.TableAdd.ReviewAmount = 0;
            else
                $scope.TableAdd.ReviewAmount = $scope.TableAdd.ReviewRate * $scope.TableAdd.ReviewHour;
        }
        else if (type == 'Manager') {
            if ($scope.TableAdd.ManagerHour === '' || $scope.TableAdd.ManagerHour == undefined)
                $scope.TableAdd.ManagerAmount = 0;
            else
                $scope.TableAdd.ManagerAmount = $scope.TableAdd.ManagerRate * $scope.TableAdd.ManagerHour;
        }

        $scope.TableAdd.TotalAmount = $scope.TableAdd.ManagerAmount + $scope.TableAdd.ReviewAmount
            + $scope.TableAdd.PrepareAmount + $scope.TableAdd.AuditAmount;
        $scope.TableAdd.GrandTotal = $scope.TableAdd.AuditAccountAmount;
        if (type == 'Profit') {
            if ($scope.TableAdd.ProfitPercent === '' || $scope.TableAdd.ProfitPercent == undefined)
                $scope.TableAdd.ProfitPercent = $scope.TableAdd.ProfitAccountAmount = 0;
            if ($scope.TableAdd.AuditPercent === '' || $scope.TableAdd.AuditPercent == undefined)
                $scope.TableAdd.AuditPercent = $scope.TableAdd.AuditAccountAmount = 0;

            var rate = parseFloat($scope.TableAdd.ProfitPercent) + parseFloat($scope.TableAdd.AuditPercent);
            console.log(rate);
            var verify = (100 - rate) / 100;
            console.log(verify);
            var total = $scope.TableAdd.TotalAmount / verify;
            console.log(total)
            var split = parseInt(total / 1000);
            console.log(split)
            var total1 = split * 1000;


            $scope.TableAdd.ProfitAccountAmount = total1 * $scope.TableAdd.ProfitPercent / 100;
            $scope.TableAdd.AuditAccountAmount = total1 * $scope.TableAdd.AuditPercent / 100;

            $scope.TableAdd.GrandTotal = $scope.TableAdd.TotalAmount + $scope.TableAdd.ProfitAccountAmount + $scope.TableAdd.AuditAccountAmount;
            var profit = parseInt($scope.TableAdd.GrandTotal / 1000);
            console.log(profit);
            $scope.TableAdd.GrandTotal = profit * 1000;

            if ($scope.Parameter.Proposal != undefined) {
                $("#section3").summernote("code", $scope.Parameter.Proposal.Section3.replace("{###}", AFormatNumber($scope.TableAdd.GrandTotal, 2)));
            }


        }
    }

    $scope.OnClickConfirm = function () {
        try {
            var qq = $q.all([serviceAccount.deleteAccountProposal($scope.TableAdd.ProposalId)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            var qq = $q.all([serviceAccount.getAccountProposal()]).then(function (data) {
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

    $scope.OnClickChangeStatus = function (stat, values) {
        try {
            var qq = $q.all([serviceAccount.setAccountProposal(values.ProposalId, stat)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            var qq = $q.all([serviceAccount.getAccountProposal()]).then(function (data) {
                                try {
                                    if (data[0] != undefined && data[0] != "") {
                                        if (data[0].data.responsecode == 200) {
                                            $scope.TableMain = data[0].data.responsedata;
                                            $scope.OnBinding();
                                            showSuccessText('ทำรายการเรียบร้อย');
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

    $scope.OnClickSave = function (after) {
        try {
            if ($scope.TableAdd.SelectCustomer == undefined)
                throw "กรุณาเลือกลูกค้า";
            else if ($scope.TableAdd.ProposalName == undefined || $scope.TableAdd.ProposalName == '')
                throw "กรุณาระบุรอบบัญชีชื่อ";
            else if ($scope.TableAdd.ProposalNameEn == undefined || $scope.TableAdd.ProposalNameEn == '')
                throw "กรุณาระบุรอบบัญชีชื่อ (ภาษาอังกฤษ)";
            else if ($scope.TableAdd.StartDate == undefined || $scope.TableAdd.StartDate == '')
                throw "กรุณาระบุวันที่เริ่มรอบบัญชี";
            else if ($scope.TableAdd.ExpireDate == undefined || $scope.TableAdd.ExpireDate == '')
                throw "กรุณาระบุวันที่สิ้นสุดรอบบัญชี";
            else if ($scope.TableAdd.AuditHour == undefined || $scope.TableAdd.AuditHour === '')
                throw "กรุณาระบุจำนวนชั่วโมง ผู้สอบบัญชี";
            else if ($scope.TableAdd.PrepareHour == undefined || $scope.TableAdd.PrepareHour === '')
                throw "กรุณาระบุจำนวนชั่วโมง ผู้ช่วยผู้สอบบัญชี Lv1";
            else if ($scope.TableAdd.ReviewHour == undefined || $scope.TableAdd.ReviewHour === '')
                throw "กรุณาระบุจำนวนชั่วโมง ผู้ช่วยผู้สอบบัญชี Lv2";
            else if ($scope.TableAdd.ManagerHour == undefined || $scope.TableAdd.ManagerHour === '')
                throw "กรุณาระบุจำนวนชั่วโมง ผู้จัดการ";
            else if ($scope.TableAdd.ProfitPercent == undefined || $scope.TableAdd.ProfitPercent === '')
                throw "กรุณาระบุกำไรสำนักงาน (%)";
            else if ($scope.TableAdd.AuditPercent == undefined || $scope.TableAdd.AuditPercent === '')
                throw "กรุณาระบุค่าสอบบัญชี (%)";
            else {
                $("#loading").fadeIn();
                var data = {
                    ProposalId: $scope.TableAdd.ProposalId,
                    ProposalCode: $scope.TableAdd.ProposalCode,
                    CustomerId: $scope.TableAdd.SelectCustomer.CustomerId,
                    ProposalName: $scope.TableAdd.ProposalName,
                    ProposalNameEn: $scope.TableAdd.ProposalNameEn,
                    StartDate: ToJsonDate2($scope.TableAdd.StartDate),
                    ExpireDate: ToJsonDate2($scope.TableAdd.ExpireDate),
                    AuditRate: $scope.TableAdd.AuditRate,
                    PrepareRate: $scope.TableAdd.PrepareRate,
                    PrepareRate: $scope.TableAdd.PrepareRate,
                    ReviewRate: $scope.TableAdd.ReviewRate,
                    ManagerRate: $scope.TableAdd.ManagerRate,
                    AuditHour: $scope.TableAdd.AuditHour,
                    PrepareHour: $scope.TableAdd.PrepareHour,
                    PrepareHour: $scope.TableAdd.PrepareHour,
                    ReviewHour: $scope.TableAdd.ReviewHour,
                    ManagerHour: $scope.TableAdd.ManagerHour,
                    ProfitPercent: $scope.TableAdd.ProfitPercent,
                    AuditPercent: $scope.TableAdd.AuditPercent,
                    AuditAmount: $scope.TableAdd.AuditAmount,
                    PrepareAmount: $scope.TableAdd.PrepareAmount,
                    ReviewAmount: $scope.TableAdd.ReviewAmount,
                    ManagerAmount: $scope.TableAdd.ManagerAmount,
                    TotalAmount: $scope.TableAdd.TotalAmount,
                    AuditAccountAmount: $scope.TableAdd.AuditAccountAmount,
                    ProfitAccountAmount: $scope.TableAdd.ProfitAccountAmount,
                    GrandTotal: $scope.TableAdd.GrandTotal,
                    Section1: $('#section1').summernote('code'),
                    Section2: $('#section2').summernote('code'),
                    Section3: $('#section3').summernote('code'),
                    Section4: $('#section4').summernote('code'),
                    Remark: $scope.TableAdd.Remark,
                };

                console.log(data);
                var qq = $q.all([serviceAccount.postAccountProposal(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                showSuccessText('บันทึกรายการเรียบร้อย');
                                $state.go('office-proposallist');
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

    $scope.OnClickCreatePeriod = function (val) {
        $state.go('office-periodaccountlist', { ref_id: val.ProposalId });
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
