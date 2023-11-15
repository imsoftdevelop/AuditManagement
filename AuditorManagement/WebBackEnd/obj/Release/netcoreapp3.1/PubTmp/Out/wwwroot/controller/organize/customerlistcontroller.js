angular.module('FOCUSAPP').controller('CustomerListController', function ($stateParams, $rootScope, $state, $scope, $http, $timeout, $q, GlobalVar, globalService,
    serviceOrganize, serviceParameter) {
    var baseURL = $("base")[0].href;//$("base").attr("href");
    var config = GlobalVar.HeaderConfig;
    $scope.Search = [];
    $scope.Table = [];
    $scope.Parameter = [];
    $scope.TableMain = [];

    $scope.initComponent = function () {
        $('.dropdown2').select2();
        if ($("#inputreceivechaque-popup").length) {
            $('#inputreceivechaque-popup').datepicker({
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
            var qq = $q.all([serviceOrganize.getCustomer(), serviceParameter.getParameterModel('all'), serviceParameter.getParameterBranchWithOwner()]).then(function (data) {
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
                            $scope.Parameter.Model = data[1].data.responsedata;
                        }
                        else if (data[1].data.responsecode == '400') { showErrorToast(data[1].data.errormessage); }
                    }

                    if (data[2] != undefined && data[2] != "") {
                        if (data[2].data.responsecode == '200' && data[2].data.responsedata != undefined && data[2].data.responsedata != "") {
                            $scope.Parameter.Branch = data[2].data.responsedata;
                        }
                        else if (data[2].data.responsecode == '400') { showErrorToast(data[2].data.errormessage); }
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
        var qq = $q.all([serviceParameter.getParameterProvince(), serviceParameter.getParameterAmphur()
            , serviceParameter.getParameterModel('all'), serviceParameter.getParameterBranchWithOwner()]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                            $scope.Parameter.ProvinceMain = $scope.Parameter.Province = data[0].data.responsedata;
                        }
                        else if (data[0].data.responsecode == '400') { showErrorToast(data[0].data.errormessage); }
                    }

                    if (data[1] != undefined && data[1] != "") {
                        if (data[1].data.responsecode == '200' && data[1].data.responsedata != undefined && data[1].data.responsedata != "") {
                            $scope.Parameter.AmphurMain = $scope.Parameter.Amphur = data[1].data.responsedata;
                        }
                        else if (data[1].data.responsecode == '400') { showErrorToast(data[1].data.errormessage); }
                    }

                    if (data[2] != undefined && data[2] != "") {
                        if (data[2].data.responsecode == '200' && data[2].data.responsedata != undefined && data[2].data.responsedata != "") {
                            $scope.Parameter.Model = data[2].data.responsedata;
                        }
                        else if (data[2].data.responsecode == '400') { showErrorToast(data[2].data.errormessage); }
                    }

                    if (data[3].data.responsecode == '200' && data[3].data.responsedata != undefined && data[3].data.responsedata != "") {
                        $scope.Parameter.Branch = data[3].data.responsedata;
                    }
                    else if (data[3].data.responsecode == '400') { showErrorToast(data[3].data.errormessage); }


                    if ($stateParams.ref_id != undefined && $stateParams.ref_id != '') {
                        var qq = $q.all([serviceOrganize.getCustomerWithKey($stateParams.ref_id)]).then(function (data1) {
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
    }

    $scope.OnInitAddNew = function () {
        $scope.TableAdd = {};
        $scope.TableAdd.IsActive = true;
        $scope.TableAdd.SelectBranch = undefined;
        $scope.TableAdd.SelectType = undefined;
        $scope.TableAdd.SelectProvince = undefined;
        $scope.TableAdd.SelectAmphur = undefined;
        $scope.TableAdd.SelectProvinceEn = undefined;
        $scope.TableAdd.SelectAmphurEn = undefined;
        $scope.TableAdd.SelectModel = undefined;
    }

    $scope.OnBindingAdd = function () {
        $scope.TableAdd.IsActive = $scope.TableAdd.IsActive == 'Yes' ? true : false;
        $scope.TableAdd.SelectType = $scope.TableAdd.Type;
        $scope.TableAdd.RegisterDate = $scope.TableAdd.RegisterDate != undefined ? formatDate($scope.TableAdd.RegisterDate) : undefined;

        if ($scope.TableAdd.BranchId != undefined) {
            var type = $scope.Parameter.Branch.filter(function (item) { return item.BranchId == $scope.TableAdd.BranchId; });
            if (type.length > 0)
                $scope.TableAdd.SelectBranch = type[0];

            $scope.OnChangeBranch();
        }
        else {
            $scope.TableAdd.SelectBranch = undefined;
        }

        if ($scope.TableAdd.Model != undefined) {
            var type = $scope.Parameter.Model.filter(function (item) { return item.Code == $scope.TableAdd.Model; });
            if (type.length > 0)
                $scope.TableAdd.SelectModel = type[0];
        }
        else {
            $scope.TableAdd.SelectProvince = undefined;
        }

        if ($scope.TableAdd.Province != undefined) {
            var type = $scope.Parameter.Province.filter(function (item) { return item.Code == $scope.TableAdd.Province; });
            if (type.length > 0)
                $scope.TableAdd.SelectProvince = type[0];
        }
        else {
            $scope.TableAdd.SelectProvince = undefined;
        }

        if ($scope.TableAdd.Amphur != undefined) {
            var type = $scope.Parameter.Amphur.filter(function (item) { return item.Code == $scope.TableAdd.Amphur; });
            if (type.length > 0)
                $scope.TableAdd.SelectAmphur = type[0];
        }
        else {
            $scope.TableAdd.SelectAmphur = undefined;
        }

        if ($scope.TableAdd.ProvinceEn != undefined) {
            var type = $scope.Parameter.Province.filter(function (item) { return item.Code == $scope.TableAdd.ProvinceEn; });
            if (type.length > 0)
                $scope.TableAdd.SelectProvinceEn = type[0];
        }
        else {
            $scope.TableAdd.SelectProvinceEn = undefined;
        }

        if ($scope.TableAdd.AmphurEn != undefined) {
            var type = $scope.Parameter.Amphur.filter(function (item) { return item.Code == $scope.TableAdd.AmphurEn; });
            if (type.length > 0)
                $scope.TableAdd.SelectAmphurEn = type[0];
        }
        else {
            $scope.TableAdd.SelectAmphurEn = undefined;
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

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.CustomerCode != undefined && (item.CustomerCode).indexOf($scope.Search.InputFilter) > -1)
                    c1 = true;
                else if (item.CustomerCode == undefined || (item.CustomerCode).indexOf($scope.Search.InputFilter) < 0)
                    c1 = false;

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.Name != undefined && (item.Name).indexOf($scope.Search.InputFilter) > -1)
                    c2 = true;
                else if (item.Name == undefined || (item.Name).indexOf($scope.Search.InputFilter) < 0)
                    c2 = false;

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.TaxId != undefined && (item.TaxId).indexOf($scope.Search.InputFilter) > -1)
                    c3 = true;
                else if (item.TaxId == undefined || (item.TaxId).indexOf($scope.Search.InputFilter) < 0)
                    c3 = false;

            }

            if ($scope.Search.SelectModel != undefined) {
                if (item.Model == $scope.Search.SelectModel.Code)
                    c5 = true;
                else
                    c5 = false;
            }
            else
                c5 = true;

            if ($scope.Search.SelectBranch != undefined) {
                if (item.BranchId == $scope.Search.SelectBranch.BranchId)
                    c6 = true;
                else
                    c6 = false;
            }
            else
                c6 = true;

            if ((c1 || c2 || c3) && c5 && c6) {
                return item;
            }
        });

        $scope.retpage = [];
        $scope.range();

        $("#loading").fadeOut();
    }

    $scope.OnClickTable = function (val) {
        $state.go('owner-customer-add', { ref_id: val.CustomerId });
    }

    $scope.OnClickAdd = function () {
        $state.go('owner-customer-add');
    }

    $scope.OnChangeBranch = function () {
        if ($scope.TableAdd.SelectBranch != undefined) {
            $scope.TableAdd.BranchCode = $scope.TableAdd.SelectBranch.BranchCode;
        } else
            $scope.TableAdd.BranchCode = undefined;
    }

    $scope.OnClickOpenRevenue = function () {
        $scope.TableRevenue = [];
        $scope.FilterRevenue = {};
        $scope.FilterRevenue.Select = "Name";
        $('#ModalRevenue').modal('show');
    }

    $scope.OnClickRevenue = function () {
        $("#loading").fadeIn();
        var data = {
            NID: $scope.FilterRevenue.Select == 'NID' ? $scope.FilterRevenue.Text : '',
            Name: $scope.FilterRevenue.Select == 'Name' ? $scope.FilterRevenue.Text : undefined,
        };

        var qq = $q.all([serviceOrganize.getRevenurevalue(data)]).then(function (data) {
            try {
                if (data[0] != undefined && data[0] != "") {
                    if (data[0].data.responsecode == 200) {
                        $scope.TableRevenue = data[0].data.responsedata;
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
            finally {
                $("#loading").fadeOut();
            }
        });
    }

    $scope.OnClickChooseRevenue = function (values) {
        console.log(values);
        $scope.TableAdd.Name = values.CompanyName;
        $scope.TableAdd.TaxId = values.NID;
        $scope.TableAdd.Address = values.HouseNumber + ((values.MooNumber != '' || values.MooNumber != undefined) ? ' หมู่ ' + values.MooNumber : '') + ((values.StreetName != '' || values.StreetName != undefined) ? ' ถนน ' + values.StreetName : '');
        $scope.TableAdd.Tambol = values.ThumbolName;
        $scope.TableAdd.Type = values.BranchNumber == "0" ? 'สำนักงานใหญ่' : 'สาขา';
        $scope.TableAdd.IsRevenue = 'Yes';
        $('#ModalRevenue').modal('hide');
    }

    $scope.OnClickConfirm = function () {
        try {
            var qq = $q.all([serviceOrganize.deleteCustomer($scope.TableAdd.CustomerId)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            var qq = $q.all([serviceOrganize.getCustomer()]).then(function (data) {
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
            if ($scope.TableAdd.SelectBranch == undefined)
                throw "กรุณาเลือกกิจการ";
            else if ($scope.TableAdd.SelectModel == undefined)
                throw "กรุณาเลือกประเภทนิติบุคคล";
            else if ($scope.TableAdd.Name == undefined || $scope.TableAdd.Name == '')
                throw "กรุณาระบุชื่อกิจการ";
            else if ($scope.TableAdd.NameEn == undefined || $scope.TableAdd.NameEn == '')
                throw "กรุณาระบุชื่อกิจการ (En)";
            else if ($scope.TableAdd.TaxId == undefined || $scope.TableAdd.TaxId == '')
                throw "กรุณาระบุเลชเสียภาษี";
            else if ($scope.TableAdd.SelectType == undefined)
                throw "กรุณาระบุเลขที่ประเภทกิจการ";
            else if ($scope.TableAdd.RegisterDate == undefined || $scope.TableAdd.RegisterDate == '')
                throw "กรุณาระบุวันที่จดทะเบียน";
            else if ($scope.TableAdd.Email != undefined && $scope.TableAdd.Email != '' && !ValidateEmail($scope.TableAdd.Email))
                throw "กรุณาระบุอีเมลให้ถูกต้อง";
            else {
                $("#loading").fadeIn();
                var data = {
                    CustomerId: $scope.TableAdd.CustomerId,
                    CustomerCode: $scope.TableAdd.CustomerCode,
                    BranchId: $scope.TableAdd.SelectBranch.BranchId,
                    Name: $scope.TableAdd.Name,
                    NameEn: $scope.TableAdd.NameEn,
                    Type: $scope.TableAdd.SelectType,
                    TaxId: $scope.TableAdd.TaxId,
                    NumberOfShare: $scope.TableAdd.NumberOfShare,
                    RegisteredCapital: $scope.TableAdd.RegisteredCapital,
                    DirectorName: $scope.TableAdd.DirectorName,
                    Description: $scope.TableAdd.Description,
                    RegisterDate: ToJsonDate2($scope.TableAdd.RegisterDate),
                    Telephone: $scope.TableAdd.Telephone,
                    MobilePhone: $scope.TableAdd.MobilePhone,
                    FaxPhone: $scope.TableAdd.FaxPhone,
                    Email: $scope.TableAdd.Email,
                    WebSite: $scope.TableAdd.WebSite,
                    Address: $scope.TableAdd.Address,
                    AddressEn: $scope.TableAdd.AddressEn,
                    Amphur: $scope.TableAdd.SelectAmphur != undefined ? $scope.TableAdd.SelectAmphur.Code : undefined,
                    AmphurEn: $scope.TableAdd.SelectAmphurEn != undefined ? $scope.TableAdd.SelectAmphurEn.Code : undefined,
                    Tambol: $scope.TableAdd.Tambol,
                    TambolEn: $scope.TableAdd.TambolEn,
                    Province: $scope.TableAdd.SelectProvince != undefined ? $scope.TableAdd.SelectProvince.Code : undefined,
                    ProvinceEn: $scope.TableAdd.SelectProvinceEn != undefined ? $scope.TableAdd.SelectProvinceEn.Code : undefined,
                    Model: $scope.TableAdd.SelectModel != undefined ? $scope.TableAdd.SelectModel.Code : undefined,
                    PostCode: $scope.TableAdd.PostCode,
                    PostCodeEn: $scope.TableAdd.PostCodeEn,
                    ContractName: $scope.TableAdd.ContractName,
                    ContractPosition: $scope.TableAdd.ContractPosition,
                    ContractMobile: $scope.TableAdd.ContractMobile,
                    ContractMobile1: $scope.TableAdd.ContractMobile1,
                    ContractEmail: $scope.TableAdd.ContractEmail,
                    IsRevenue: $scope.TableAdd.IsRevenue,
                    Remark: $scope.TableAdd.Remark,
                    IsActive: $scope.TableAdd.IsActive ? 'Yes' : 'No',
                };

                console.log(data);
                var qq = $q.all([serviceOrganize.postCustomer(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {

                                if (after == 'back') {
                                    $state.go('owner-customer');
                                }
                                else if (after == 'new') {
                                    showSuccessText('บันทึกรายการเรียบร้อย');
                                    $scope.OnInitAddNew();
                                }
                                else {
                                    var qq = $q.all([serviceOrganize.getCustomerWithKey(data[0].data.responsedata.CustomerId)]).then(function (data) {
                                        try {
                                            if (data[0] != undefined && data[0] != "") {
                                                if (data[0].data.responsecode == 200) {
                                                    $scope.TableAdd = data[0].data.responsedata;
                                                    $scope.OnBindingAdd();
                                                    showSuccessText('บันทึกรายการเรียบร้อย');

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
            $("#loading").fadeOut();
        }
        finally {
            $("#loading").fadeOut();
        }
    }

    $scope.OnChangeProvince = function () {
        $scope.TableAdd.SelectAmphur = undefined;
        $scope.TableAdd.PostCode = undefined;

        if ($scope.TableAdd.SelectProvince != undefined) {
            $scope.Parameter.Amphur = _.where($scope.Parameter.AmphurMain, { Province: $scope.TableAdd.SelectProvince.Code });
        }
        else {
            $scope.Parameter.Amphur = $scope.Parameter.AmphurMain;
        }
    }

    $scope.OnChangeAmphur = function () {
        $scope.TableAdd.PostCode = undefined;

        if ($scope.TableAdd.SelectAmphur != undefined) {
            var val = _.where($scope.Parameter.AmphurMain, { Code: $scope.TableAdd.SelectAmphur.Code })[0];
            if (val != undefined)
                $scope.TableAdd.PostCode = val.PostCode;
        }
        else {
            $scope.Parameter.Amphur = $scope.Parameter.AmphurMain;
        }
    }

    $scope.OnChangeProvinceEn = function () {
        $scope.TableAdd.SelectAmphurEn = undefined;
        $scope.TableAdd.PostCodeEn = undefined;

        if ($scope.TableAdd.SelectProvinceEn != undefined) {
            $scope.Parameter.Amphur = _.where($scope.Parameter.AmphurMain, { Province: $scope.TableAdd.SelectProvinceEn.Code });
        }
        else {
            $scope.Parameter.Amphur = $scope.Parameter.AmphurMain;
        }
    }

    $scope.OnChangeAmphurEn = function () {
        $scope.TableAdd.PostCodeEn = undefined;

        if ($scope.TableAdd.SelectAmphurEn != undefined) {
            var val = _.where($scope.Parameter.AmphurMain, { Code: $scope.TableAdd.SelectAmphurEn.Code })[0];
            if (val != undefined)
                $scope.TableAdd.PostCodeEn = val.PostCode;
        }
        else {
            $scope.Parameter.Amphur = $scope.Parameter.AmphurMain;
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