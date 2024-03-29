﻿angular.module('FOCUSAPP').controller('AccountCustomerlistController', function ($stateParams, $rootScope, $state, $scope, $http, $timeout, $q, GlobalVar, globalService,
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
            var qq = $q.all([serviceOrganize.getCustomerWithBranchFromAssign(), serviceParameter.getParameterModel('all')]).then(function (data) {
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
            , serviceParameter.getParameterModel('all'), serviceParameter.getParameterBranchWithOwner(), serviceParameter.getParameterPermission()]).then(function (data) {
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

                    if (data[4] != undefined && data[4] != "") {
                        if (data[4].data.responsecode == '200' && data[4].data.responsedata != undefined && data[4].data.responsedata != "") {
                            $scope.Parameter.Permission = data[4].data.responsedata;
                            $scope.Parameter.Permission = _.filter($scope.Parameter.Permission, function (item) { if (item.Code != 'SUPER001' && item.Code != 'ADMIN001' && item.Code != 'CUS001') return true; });
                        }
                        else if (data[4].data.responsecode == '400') { showErrorToast(data[4].data.errormessage); }
                    }


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
                                showErrorToast(err);
                            }
                        });
                    }
                    else {
                        $scope.OnInitAddNew();
                    }

                    $scope.Action = $stateParams.ref_action == '' ? 'เพิ่มข้อมูล' : $stateParams.ref_action;
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


        $scope.itemsPerPage_1 = "10";
        $scope.Search.SelectStatus = "All";
        if ($scope.TableAdd.Contracts == undefined)
            $scope.TableAdd.Contracts = [];
        globalService.SetupSequence($scope.TableAdd.Contracts);
        _.each($scope.TableAdd.Contracts, function (item) { item.CreatedOn = formatDateFull(item.CreatedOn); item.UpdatedOn = formatDateFull(item.UpdatedOn); })
        $scope.TableAdd.ContractsMain = $scope.TableAdd.Contracts;
        $scope.retpage_1 = [];
        $scope.range_1();

        $scope.itemsPerPage_2 = "10";
        $scope.Search.SelectStatusAssign = "All";
        if ($scope.TableAdd.Assigns == undefined)
            $scope.TableAdd.Assigns = [];
        globalService.SetupSequence($scope.TableAdd.Assigns);
        _.each($scope.TableGroupMain, function (item) { item.CreatedOn = formatDateFull(item.CreatedOn); item.UpdatedOn = formatDateFull(item.UpdatedOn); })
        $scope.TableAdd.AssignsMain = $scope.TableAdd.Assigns;
        $scope.retpage_2 = [];
        $scope.range_2();
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
        $state.go('office-customerdetailmanage', { ref_id: val.CustomerId, ref_action: 'แก้ไขข้อมูล' });
    }

    $scope.OnClickAdd = function () {
        $state.go('office-customerdetailmanage', { ref_action: 'เพิ่มข้อมูล' });
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
            if ($scope.TableAdd.SelectModel == undefined)
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
                var qq = $q.all([serviceOrganize.postCustomerWithBranch(data)]).then(function (data) {
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

    $scope.OnClickAddContract = function () {
        $scope.TableAddContract = {};
        $scope.TableAddContract.Action = 'เพิ่ม';
        $scope.TableAddContract.IsActive = true;
        $('#ModalContact').modal('show');
    }

    $scope.OnClickSaveContract = function (after) {
        try {
            if ($scope.TableAddContract.FirstName == undefined || $scope.TableAddContract.FirstName == '')
                throw "กรุณาระบุชื่อ";
            if ($scope.TableAddContract.LastName == undefined || $scope.TableAddContract.LastName == '')
                throw "กรุณาระบุนามสกุล";
            if ($scope.TableAddContract.MobilePhone == undefined || $scope.TableAddContract.MobilePhone == '')
                throw "กรุณาระบุเบอร์โทรศัพท์";
            if ($scope.TableAddContract.Email == undefined || $scope.TableAddContract.Email == '')
                throw "กรุณาระบุอีเมล";
            else if ($scope.TableAddContract.Email != undefined && $scope.TableAddContract.Email != '' && !ValidateEmail($scope.TableAddContract.Email))
                throw "กรุณาระบุอีเมลให้ถูกต้อง";
            else {
                $("#loading").fadeIn();
                var data = {
                    ContractId: $scope.TableAddContract.ContractId,
                    CustomerId: $scope.TableAdd.CustomerId,
                    FirstName: $scope.TableAddContract.FirstName,
                    LastName: $scope.TableAddContract.LastName,
                    Email: $scope.TableAddContract.Email,
                    MobilePhone: $scope.TableAddContract.MobilePhone,
                    IsActive: $scope.TableAddContract.IsActive ? 'Yes' : 'No',
                };

                console.log(data);
                var qq = $q.all([serviceOrganize.postCustomerContractWithBranch(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                var qq = $q.all([serviceOrganize.getCustomerContractWithKey($scope.TableAdd.CustomerId)]).then(function (data) {
                                    try {
                                        if (data[0] != undefined && data[0] != "") {
                                            if (data[0].data.responsecode == 200) {
                                                $scope.TableAdd.Contracts = data[0].data.responsedata;

                                                if (after == 'back') {
                                                    $('#ModalContact').modal('hide');
                                                }
                                                else if (after == 'new') {
                                                    $scope.OnClickAddContract();
                                                }

                                                showSuccessText('บันทึกรายการเรียบร้อย');
                                                $scope.itemsPerPage_1 = "10";
                                                if ($scope.TableAdd.Contracts == undefined)
                                                    $scope.TableAdd.Contracts = [];
                                                globalService.SetupSequence($scope.TableAdd.Contracts);
                                                _.each($scope.TableAdd.Contracts, function (item) { item.CreatedOn = formatDateFull(item.CreatedOn); item.UpdatedOn = formatDateFull(item.UpdatedOn); })
                                                $scope.TableAdd.ContractsMain = $scope.TableAdd.Contracts;
                                                $scope.retpage_1 = [];
                                                $scope.range_1();

                                                $scope.$apply();
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

    $scope.OnClickInviteContract = function (val) {
        try {
            $("#loading").fadeIn();
            var data = {
                ContractId: val.ContractId,
                CustomerId: $scope.TableAdd.CustomerId,
            };

            var qq = $q.all([serviceOrganize.postCustomerContractInviteWithBranch(data)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            var qq = $q.all([serviceOrganize.getCustomerContractWithKey($scope.TableAdd.CustomerId)]).then(function (data) {
                                try {
                                    if (data[0] != undefined && data[0] != "") {
                                        if (data[0].data.responsecode == 200) {
                                            $scope.TableAdd.Contracts = data[0].data.responsedata;
                                            showSuccessText('ส่งคำเชิญเรียบร้อย');
                                            $scope.itemsPerPage_1 = "10";
                                            if ($scope.TableAdd.Contracts == undefined)
                                                $scope.TableAdd.Contracts = [];
                                            globalService.SetupSequence($scope.TableAdd.Contracts);
                                            _.each($scope.TableAdd.Contracts, function (item) { item.CreatedOn = formatDateFull(item.CreatedOn); item.UpdatedOn = formatDateFull(item.UpdatedOn); })
                                            $scope.TableAdd.ContractsMain = $scope.TableAdd.Contracts;
                                            $scope.retpage_1 = [];
                                            $scope.range_1();

                                            $scope.$apply();
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
        catch (err) {
            showWariningToast(err);
            $("#loading").fadeOut();
        }
        finally {
            $("#loading").fadeOut();
        }
    }

    $scope.OnClickTableContract = function (val) {
        $scope.TableAddContract = {};
        $scope.TableAddContract = angular.copy(val);
        $scope.TableAddContract.Action = 'แก้ไข';
        $scope.TableAddContract.IsActive = $scope.TableAddContract.IsActive == 'Yes' ? true : false;
        $('#ModalContact').modal('show');
    }

    $scope.OnClickFilterContract = function () {
        $scope.TableAdd.Contracts = $scope.TableAdd.ContractsMain;

        $("#loading").fadeIn();
        if ($scope.Search.SelectStatus == "All")
            $scope.TableAdd.Contracts = $scope.TableAdd.ContractsMain;
        else
            $scope.TableAdd.Contracts = _.where($scope.TableAdd.ContractsMain, { IsActive: $scope.Search.SelectStatus });

        $scope.TableAdd.Contracts = _.filter($scope.TableAdd.Contracts, function (item) {

            var c1 = true, c2 = true, c3 = true, c4 = true, c5 = true, c6 = true;

            if (($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "")) {

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.FirstName != undefined && (item.FirstName).indexOf($scope.Search.InputFilter) > -1)
                    c1 = true;
                else if (item.FirstName == undefined || (item.FirstName).indexOf($scope.Search.InputFilter) < 0)
                    c1 = false;

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.Email != undefined && (item.Email).indexOf($scope.Search.InputFilter) > -1)
                    c2 = true;
                else if (item.Email == undefined || (item.Email).indexOf($scope.Search.InputFilter) < 0)
                    c2 = false;

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.MobilePhone != undefined && (item.MobilePhone).indexOf($scope.Search.InputFilter) > -1)
                    c3 = true;
                else if (item.MobilePhone == undefined || (item.MobilePhone).indexOf($scope.Search.InputFilter) < 0)
                    c3 = false;

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.LastName != undefined && (item.LastName).indexOf($scope.Search.InputFilter) > -1)
                    c4 = true;
                else if (item.LastName == undefined || (item.LastName).indexOf($scope.Search.InputFilter) < 0)
                    c4 = false;
            }

            if ((c1 || c2 || c3 || c4)) {
                return item;
            }
        });

        $scope.retpage_1 = [];
        $scope.range_1();

        $("#loading").fadeOut();
    }

    $scope.OnClickDeleteAdd = function (values, method) {
        if (values != undefined) {
            $scope.TableDelete = {};
            $scope.TableDelete = angular.copy(values);
            $scope.TableDelete.Method = method;
            if (method == 'contract')
                $scope.TableDelete.Action = 'ลบ'
            else if (method == 'assign')
                $scope.TableDelete.Action = 'ลบ'
            else if (method == 'dassign')
                $scope.TableDelete.Action = 'ปิดการใช้งาน'
            else if (method == 'oassign')
                $scope.TableDelete.Action = 'เปิดการใช้งาน'

            $('#ModalConfirm').modal('show');
        }
    }

    $scope.OnClickConfirmDelete = function () {
        try {
            var gDelete;
            if ($scope.TableDelete.Method == 'contract')
                gDelete = serviceOrganize.deleteCustomerContract($scope.TableDelete.ContractId);
            else if ($scope.TableDelete.Method == 'assign')
                gDelete = serviceOrganize.deleteCustomerAssign($scope.TableDelete.AssignId);
            else if ($scope.TableDelete.Method == 'dassign')
                gDelete = serviceOrganize.disabledCustomerAssign($scope.TableDelete.AssignId);
            else if ($scope.TableDelete.Method == 'oassign')
                gDelete = serviceOrganize.onDisabledCustomerAssign($scope.TableDelete.AssignId);

            var qq = $q.all([gDelete]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            var qq = $q.all([serviceOrganize.getCustomerContractWithKey($scope.TableAdd.CustomerId), serviceOrganize.getCustomerAssignWithKey($scope.TableAdd.CustomerId)]).then(function (data) {
                                try {
                                    if (data[0] != undefined && data[0] != "") {
                                        if (data[0].data.responsecode == 200) {
                                            $scope.TableAdd.Contracts = data[0].data.responsedata;
                                            $scope.itemsPerPage_1 = "10";
                                            if ($scope.TableAdd.Contracts == undefined)
                                                $scope.TableAdd.Contracts = [];
                                            globalService.SetupSequence($scope.TableAdd.Contracts);
                                            _.each($scope.TableAdd.Contracts, function (item) { item.CreatedOn = formatDateFull(item.CreatedOn); item.UpdatedOn = formatDateFull(item.UpdatedOn); })
                                            $scope.TableAdd.ContractsMain = $scope.TableAdd.Contracts;
                                            $scope.retpage_1 = [];
                                            $scope.range_1();

                                            showSuccessText('ลบรายการเรียบร้อย');
                                            $scope.TableDelete = {};
                                        }
                                    }
                                    else
                                        showErrorToast(data[0].data.errormessage);

                                    if (data[1] != undefined && data[1] != "") {
                                        if (data[1].data.responsecode == 200) {
                                            $scope.TableAdd.Assigns = data[1].data.responsedata;

                                            $scope.itemsPerPage_2 = "10";
                                            if ($scope.TableAdd.Assigns == undefined)
                                                $scope.TableAdd.Assigns = [];
                                            globalService.SetupSequence($scope.TableAdd.Assigns);
                                            _.each($scope.TableGroupMain, function (item) { item.CreatedOn = formatDateFull(item.CreatedOn); item.UpdatedOn = formatDateFull(item.UpdatedOn); })
                                            $scope.TableAdd.AssignsMain = $scope.TableAdd.Assigns;
                                            $scope.retpage_2 = [];
                                            $scope.range_2();
                                        }
                                    }
                                    else
                                        showErrorToast(data[1].data.errormessage);

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

    $scope.OnClickAddAssign = function () {
        try {
            $("#loading").fadeIn();
            $scope.TableAddAssign = {};
            var qq = $q.all([serviceParameter.getParameterEmployeeNotAssignWithOwner($scope.TableAdd.CustomerId)]).then(function (data1) {
                try {
                    if (data1[0] != undefined && data1[0] != "") {
                        if (data1[0].data.responsecode == 200) {
                            $scope.itemsPerPage_3 = "10";
                            if (data1[0].data.responsedata == undefined)
                                $scope.Parameter.Employees = [];

                            $scope.Parameter.Employees = _.filter(data1[0].data.responsedata, function (item) {
                                if (item.PermissionCode == 'ASSIS001' || item.PermissionCode == 'ASSIS002' || item.PermissionCode == 'AUDIT001'
                                    || item.PermissionCode == 'MAG001')
                                    return item;
                            });
                            console.log($scope.Parameter.Employees)

                            globalService.SetupSequence($scope.Parameter.Employees);
                            $scope.Parameter.EmployeesMain = $scope.Parameter.Employees;
                            $scope.retpage_3 = [];
                            $scope.range_3();
                            $('#ModalEmployee').modal('show');
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
                    showErrorToast(err);
                }
            });
        }
        catch (err) { showErrorToast(err); } finally { $("#loading").fadeOut(); }
    }

    $scope.OnClickFilterEmployees = function () {
        $scope.Parameter.Employees = $scope.Parameter.EmployeesMain;

        $("#loading").fadeIn();

        $scope.Parameter.Employees = _.filter($scope.Parameter.Employees, function (item) {

            var c1 = true, c2 = true, c3 = true, c4 = true, c5 = true, c6 = true;

            if (($scope.Search.InputFilterEmployees != undefined && $scope.Search.InputFilterEmployees != "")) {

                if ($scope.Search.InputFilterEmployees != undefined && $scope.Search.InputFilterEmployees != "" && item.FullName != undefined && (item.FullName).indexOf($scope.Search.InputFilterEmployees) > -1)
                    c1 = true;
                else if (item.FullName == undefined || (item.FullName).indexOf($scope.Search.InputFilterEmployees) < 0)
                    c1 = false;

                if ($scope.Search.InputFilterEmployees != undefined && $scope.Search.InputFilterEmployees != "" && item.EmpCode != undefined && (item.EmpCode).indexOf($scope.Search.InputFilterEmployees) > -1)
                    c2 = true;
                else if (item.EmpCode == undefined || (item.EmpCode).indexOf($scope.Search.InputFilterEmployees) < 0)
                    c2 = false;

            }

            if (c1 || c2) {
                return item;
            }
        });

        $scope.retpage_3 = [];
        $scope.range_3();

        $("#loading").fadeOut();
    }

    $scope.OnClickSaveAssign = function (values) {
        try {
            $("#loading").fadeIn();
            var data = {
                EmpId: values.EmpId,
                CustomerId: $scope.TableAdd.CustomerId,
            };

            console.log(data);
            var qq = $q.all([serviceOrganize.postCustomerAssignWithBranch(data)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            var qq = $q.all([serviceOrganize.getCustomerAssignWithKey($scope.TableAdd.CustomerId)]).then(function (data) {
                                try {
                                    if (data[0] != undefined && data[0] != "") {
                                        if (data[0].data.responsecode == 200) {
                                            $scope.TableAdd.Assigns = data[0].data.responsedata;
                                            $('#ModalEmployee').modal('hide');
                                            showSuccessText('บันทึกรายการเรียบร้อย');
                                            $scope.itemsPerPage_2 = "10";
                                            if ($scope.TableAdd.Assigns == undefined)
                                                $scope.TableAdd.Assigns = [];
                                            globalService.SetupSequence($scope.TableAdd.Assigns);
                                            _.each($scope.TableGroupMain, function (item) { item.CreatedOn = formatDateFull(item.CreatedOn); item.UpdatedOn = formatDateFull(item.UpdatedOn); })
                                            $scope.TableAdd.AssignsMain = $scope.TableAdd.Assigns;
                                            $scope.retpage_2 = [];
                                            $scope.range_2();

                                            $scope.$apply();
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
        catch (err) {
            showWariningToast(err);
            $("#loading").fadeOut();
        }
        finally {
            $("#loading").fadeOut();
        }
    }

    $scope.OnClickFilterAssign = function () {
        $scope.TableAdd.Assigns = $scope.TableAdd.AssignsMain;

        $("#loading").fadeIn();
        if ($scope.Search.SelectStatusAssign == "All")
            $scope.TableAdd.Assigns = $scope.TableAdd.AssignsMain;
        else
            $scope.TableAdd.Assigns = _.where($scope.TableAdd.AssignsMain, { IsActive: $scope.Search.SelectStatusAssign });
      
        $scope.TableAdd.Assigns = _.filter($scope.TableAdd.Assigns, function (item) {

            var c1 = true, c2 = true, c3 = true, c4 = true, c5 = true, c6 = true;

            if (($scope.Search.InputFilterAssign != undefined && $scope.Search.InputFilterAssign != "")) {

                if ($scope.Search.InputFilterAssign != undefined && $scope.Search.InputFilterAssign != "" && item.EmployeeData.FullName != undefined && (item.EmployeeData.FullName).indexOf($scope.Search.InputFilterAssign) > -1)
                    c1 = true;
                else if (item.EmployeeData.FullName == undefined || (item.EmployeeData.FullName).indexOf($scope.Search.InputFilterAssign) < 0)
                    c1 = false;

                if ($scope.Search.InputFilterAssign != undefined && $scope.Search.InputFilterAssign != "" && item.EmployeeData.Email != undefined && (item.EmployeeData.Email).indexOf($scope.Search.InputFilterAssign) > -1)
                    c2 = true;
                else if (item.EmployeeData.Email == undefined || (item.EmployeeData.Email).indexOf($scope.Search.InputFilterAssign) < 0)
                    c2 = false;

                if ($scope.Search.InputFilterAssign != undefined && $scope.Search.InputFilterAssign != "" && item.EmployeeData.EmpCode != undefined && (item.EmployeeData.EmpCode).indexOf($scope.Search.InputFilterAssign) > -1)
                    c3 = true;
                else if (item.EmployeeData.EmpCode == undefined || (item.EmployeeData.EmpCode).indexOf($scope.Search.InputFilterAssign) < 0)
                    c3 = false;

                if ($scope.Search.InputFilterAssign != undefined && $scope.Search.InputFilterAssign != "" && item.EmployeeData.PermissionName != undefined && (item.EmployeeData.PermissionName).indexOf($scope.Search.InputFilterAssign) > -1)
                    c4 = true;
                else if (item.EmployeeData.PermissionName == undefined || (item.EmployeeData.PermissionName).indexOf($scope.Search.InputFilterAssign) < 0)
                    c4 = false;
            }

            if ($scope.Search.SelectPermission != undefined) {
                if (item.PermissionCode == $scope.Search.SelectPermission.Code)
                    c5 = true;
                else
                    c5 = false;
            }
            else
                c5 = true;

            if ((c1 || c2 || c3 || c4) && c5) {
                return item;
            }
        });
        
        $scope.retpage_2 = [];
        $scope.range_2();

        $("#loading").fadeOut(); 
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

    // #1

    $scope.currentPage_1 = 0;

    $scope.OnClickChangePageTotal_1 = function () {
        $scope.retpage_1 = [];
        $scope.range_1();
    }

    $scope.pageCount_1 = function () {
        return Math.ceil($scope.TableAdd.Contracts.length / parseInt($scope.itemsPerPage_1)) - 1;
    };

    $scope.range_1 = function () {
        $scope.itemsCount_1 = $scope.TableAdd.Contracts.length;
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
        return Math.ceil($scope.TableAdd.Assigns == undefined ? 0 : $scope.TableAdd.Assigns.length / parseInt($scope.itemsPerPage_2)) - 1;
    };

    $scope.range_2 = function () {

        $scope.itemsCount_2 = $scope.TableAdd.Assigns == undefined ? 0 : $scope.TableAdd.Assigns.length;

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

    // #3

    $scope.currentPage_3 = 0;

    $scope.OnClickChangePageTotal_3 = function () {
        $scope.retpage_3 = [];
        $scope.range_3();
    }

    $scope.pageCount_3 = function () {
        return Math.ceil($scope.Parameter.Employees == undefined ? 0 : $scope.Parameter.Employees.length / parseInt($scope.itemsPerPage_3)) - 1;
    };

    $scope.range_3 = function () {

        $scope.itemsCount_3 = $scope.Parameter.Employees == undefined ? 0 : $scope.Parameter.Employees.length;

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

            var type = $scope.retpage_3.filter(function (item) { return item.code == $scope.currentPage_3; });
            if (type.length > 0) {
                $scope.currentPage_3 = type[0];
            }
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

            var type = $scope.retpage_3.filter(function (item) { return item.code == $scope.currentPage_3; });
            if (type.length > 0) {
                $scope.currentPage_3 = type[0];
            }
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
});