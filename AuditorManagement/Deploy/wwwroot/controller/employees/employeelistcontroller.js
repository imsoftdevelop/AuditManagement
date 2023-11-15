angular.module('FOCUSAPP').controller('EmployeeListController', function ($stateParams, $rootScope, $state, $scope, $http, $timeout, $q, GlobalVar, globalService,
    serviceEmployee, serviceParameter) {
    var baseURL = $("base")[0].href;//$("base").attr("href");
    var config = GlobalVar.HeaderConfig;
    $scope.Search = [];
    $scope.Table = [];
    $scope.Parameter = [];
    $scope.TableMain = [];

    $scope.initComponent = function () {
        $('.dropdown2').select2();
    }

    $scope.init = function () {
        try {
            $scope.initComponent();

            $("#loading").fadeIn();
            var qq = $q.all([serviceEmployee.getEmployee(), serviceParameter.getParameterPermission()]).then(function (data) {
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
                            $scope.Parameter.Permission = data[1].data.responsedata;
                            $scope.Parameter.Permission = _.filter($scope.Parameter.Permission, function (item) { if (item.Code != 'SUPER001' && item.Code != 'ADMIN001' && item.Code != 'CUS001') return true; });
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
        var qq = $q.all([serviceParameter.getParameterProvince(), serviceParameter.getParameterAmphur(), serviceParameter.getParameterPermission()]).then(function (data) {
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
                        $scope.Parameter.Permission = data[2].data.responsedata;
                        $scope.Parameter.Permission = _.filter($scope.Parameter.Permission, function (item) { if (item.Code != 'SUPER001' && item.Code != 'ADMIN001' && item.Code != 'CUS001') return true; });
                    }
                    else if (data[2].data.responsecode == '400') { showErrorToast(data[2].data.errormessage); }
                }

                if ($stateParams.ref_id != undefined && $stateParams.ref_id != '') {
                    var qq = $q.all([serviceEmployee.getEmployeeWithKey($stateParams.ref_id)]).then(function (data1) {
                        try {
                            if (data1[0] != undefined && data1[0] != "") {
                                if (data1[0].data.responsecode == 200) {
                                    $scope.Employee = data1[0].data.responsedata;
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
                            showErrorToast(response.data.errormessage);
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
        $scope.Employee = {};
        $scope.Employee.IsActive = true;
        $scope.Employee.Gender = 'ชาย';
        $scope.Employee.SelectProvince = undefined;
        $scope.Employee.SelectAmphur = undefined;
        $scope.Employee.SelectPermission = undefined;
    }

    $scope.OnBindingAdd = function () {
        $scope.Employee.IsActive = $scope.Employee.IsActive == 'Yes' ? true : false;
        $scope.Employee.SelectTitle = $scope.Employee.TitleName;

        if ($scope.Employee.Province != undefined) {
            var type = $scope.Parameter.Province.filter(function (item) { return item.Code == $scope.Employee.Province; });
            if (type.length > 0)
                $scope.Employee.SelectProvince = type[0];
        }
        else {
            $scope.Employee.SelectProvince = undefined;
        }

        if ($scope.Employee.Amphur != undefined) {
            var type = $scope.Parameter.Amphur.filter(function (item) { return item.Code == $scope.Employee.Amphur; });
            if (type.length > 0)
                $scope.Employee.SelectAmphur = type[0];
        }
        else {
            $scope.Employee.SelectAmphur = undefined;
        }

        if ($scope.Employee.PermissionData != undefined && $scope.Employee.PermissionData.PermissionCode) {
            var type = $scope.Parameter.Permission.filter(function (item) { return item.Code == $scope.Employee.PermissionData.PermissionCode; });
            if (type.length > 0)
                $scope.Employee.SelectPermission = type[0];
        }
        else {
            $scope.Employee.SelectPermission = undefined;
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

            var c1 = true, c2 = true, c3 = true, c4 = true, c5 = true;

            if (($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "")) {

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.EmpCode != undefined && (item.EmpCode).indexOf($scope.Search.InputFilter) > -1)
                    c1 = true;
                else if (item.EmpCode == undefined || (item.EmpCode).indexOf($scope.Search.InputFilter) < 0)
                    c1 = false;

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.FirstName != undefined && (item.FirstName).indexOf($scope.Search.InputFilter) > -1)
                    c2 = true;
                else if (item.FirstName == undefined || (item.FirstName).indexOf($scope.Search.InputFilter) < 0)
                    c2 = false;

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.LastName != undefined && (item.LastName).indexOf($scope.Search.InputFilter) > -1)
                    c3 = true;
                else if (item.LastName == undefined || (item.LastName).indexOf($scope.Search.InputFilter) < 0)
                    c3 = false;

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.Email != undefined && (item.Email).indexOf($scope.Search.InputFilter) > -1)
                    c4 = true;
                else if (item.Email == undefined || (item.Email).indexOf($scope.Search.InputFilter) < 0)
                    c4 = false;

            }

            if ($scope.Search.SelectPermission != undefined) {
                if (item.PermissionData.Code == $scope.Search.SelectPermission.Code)
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

        $scope.retpage = [];
        $scope.range();

        $("#loading").fadeOut();
    }

    $scope.OnClickTable = function (val) {
        $state.go('owner-employee-add', { ref_id: val.EmpId });
    }

    $scope.OnClickAdd = function () {
        $state.go('owner-employee-add');
    }

    $scope.OnClickConfirm = function () {
        try {
            var qq = $q.all([serviceEmployee.deleteEmployee($scope.TableAdd.EmpId)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            var qq = $q.all([serviceEmployee.getEmployee()]).then(function (data) {
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
            if ($scope.Employee.SelectTitle == undefined || $scope.Employee.SelectTitle == '')
                throw "กรุณาเลือกคำนำหน้า";
            else if ($scope.Employee.FirstName == undefined || $scope.Employee.FirstName == '')
                throw "กรุณาระบุชื่อ";
            else if ($scope.Employee.LastName == undefined || $scope.Employee.LastName == '')
                throw "กรุณาระบุนามสกุล";
            else if ($scope.Employee.FirstNameEn == undefined || $scope.Employee.FirstNameEn == '')
                throw "กรุณาระบุชื่อ (En)";
            else if ($scope.Employee.LastNameEn == undefined || $scope.Employee.LastNameEn == '')
                throw "กรุณาระบุนามสกุล (En)";
            else if ($scope.Employee.CitizenId == undefined || $scope.Employee.CitizenId == '')
                throw "กรุณาระบุเลขที่บัตรประชาชน";
            else if ($scope.Employee.Email == undefined || $scope.Employee.Email == '')
                throw "กรุณาระบุอีเมล";
            else if ($scope.Employee.Email != undefined && $scope.Employee.Email != '' && !ValidateEmail($scope.Employee.Email))
                throw "กรุณาระบุอีเมลให้ถูกต้อง";
            else if ($scope.Employee.SelectPermission == undefined)
                throw "กรุณาเลือกสิทธิ";
            else if (($scope.Employee.Password == undefined || $scope.Employee.Password == '') && $scope.Employee.EmpId == undefined)
                throw "กรุณาระบุรหัสผ่าน";
            else if (($scope.Employee.Password != undefined && $scope.Employee.Password.length < 6) && $scope.Employee.EmpId == undefined)
                throw "กรุณาระบุรหัสผ่านอย่างน้อย 6 หลัก";
            else if (($scope.Employee.ConfirmPassword == undefined || $scope.Employee.ConfirmPassword == '') && $scope.Employee.EmpId == undefined)
                throw "กรุณาระบุยืนยันรหัสผ่าน";
            else if (($scope.Employee.ConfirmPassword != $scope.Employee.Password) && $scope.Employee.EmpId == undefined)
                throw "กรุณายืนยันรหัสผ่านให้ถูกต้อง";
            else {
                $("#loading").fadeIn();
                var data = {
                    EmpId: $scope.Employee.EmpId,
                    EmpCode: $scope.Employee.EmpCode,
                    TitleName: $scope.Employee.SelectTitle,
                    FirstName: $scope.Employee.FirstName,
                    LastName: $scope.Employee.LastName,
                    Gender: $scope.Employee.Gender,
                    CitizenId: $scope.Employee.CitizenId,
                    Email: $scope.Employee.Email,
                    Address: $scope.Employee.Address,
                    MobilePhone: $scope.Employee.MobilePhone,
                    FirstNameEn: $scope.Employee.FirstNameEn,
                    LastNameEn: $scope.Employee.LastNameEn,
                    Tambol: $scope.Employee.Tambol,
                    Province: $scope.Employee.SelectProvince != undefined ? $scope.Employee.SelectProvince.Code : undefined,
                    Amphur: $scope.Employee.SelectAmphur != undefined ? $scope.Employee.SelectAmphur.Code : undefined,
                    PostCode: $scope.Employee.PostCode,
                    MobilePhone1: $scope.Employee.MobilePhone1,
                    IsActive: $scope.Employee.IsActive ? 'Yes' : 'No',
                };

                data.PermissionData = {};
                data.PermissionData.PermissionCode = $scope.Employee.SelectPermission.Code;

                data.UserData = {};
                data.UserData.Username = $scope.Employee.Email;
                data.UserData.Password = $scope.Employee.Password;

                console.log(data);
                var qq = $q.all([serviceEmployee.postEmployee(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                if (after == 'back') {
                                    $state.go('owner-employee');
                                }
                                else if (after == 'new') {
                                    showSuccessText('บันทึกรายการเรียบร้อย');
                                    $scope.OnInitAddNew();
                                }
                                else {
                                    var qq = $q.all([serviceEmployee.getEmployeeWithKey(data[0].data.responsedata.EmpId)]).then(function (data) {
                                        try {
                                            if (data[0] != undefined && data[0] != "") {
                                                if (data[0].data.responsecode == 200) {
                                                    $scope.Employee = data[0].data.responsedata;
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
        finally  {
            $("#loading").fadeOut();
        }
    }

    $scope.OnChangeProvince = function () {
        $scope.Employee.SelectAmphur = undefined;
        $scope.Employee.PostCode = undefined;

        if ($scope.Employee.SelectProvince != undefined) {
            $scope.Parameter.Amphur = _.where($scope.Parameter.AmphurMain, { Province: $scope.Employee.SelectProvince.Code });
        }
        else {
            $scope.Parameter.Amphur = $scope.Parameter.AmphurMain;
        }
    }

    $scope.OnChangeAmphur = function () {
        $scope.Employee.PostCode = undefined;

        if ($scope.Employee.SelectAmphur != undefined) {
            var val = _.where($scope.Parameter.AmphurMain, { Code: $scope.Employee.SelectAmphur.Code })[0];
            if (val != undefined)
                $scope.Employee.PostCode = val.PostCode;
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