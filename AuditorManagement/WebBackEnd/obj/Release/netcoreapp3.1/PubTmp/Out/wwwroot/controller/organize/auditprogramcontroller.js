angular.module('FOCUSAPP').controller('AdminAuditprogramcontroller', function ($scope, $http, $timeout, GlobalVar, $q, globalService, serviceOrganize, serviceParameter) {
    var baseURL = $("base")[0].href;
    var config = GlobalVar.HeaderConfig;

    $scope.TableMain = [];
    $scope.Table = [];
    $scope.Parameter = [];
    $scope.Search = {};

    var gConfig = globalService.getConfigSystem();

    $scope.initComponent = function () {
        $('.dropdown2').select2();
    }

    $scope.init = function () {
        try {
            $scope.initComponent();

            $("#loading").fadeIn();
            var qq = $q.all([serviceOrganize.getAuditprogram(), gConfig, serviceOrganize.getAuditProgramFSGroup()
                , serviceParameter.getParameterFSGroupWithOwner()]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
                                $scope.TableMain = data[0].data.responsedata;
                            }
                            else if (data[0].data.responsecode == '400') { showErrorToast(data[0].data.errormessage); }

                            if (data[1].data.responsecode == '200' && data[1].data.responsedata != undefined && data[1].data.responsedata != "") {
                                $scope.ConfigSystem = data[1].data.responsedata;
                            }
                            else if (data[1].data.responsecode == '400') { showErrorToast(data[1].data.errormessage); }

                            if (data[2].data.responsecode == '200' && data[2].data.responsedata != undefined && data[2].data.responsedata != "") {
                                $scope.TableGroupMain = data[2].data.responsedata;
                                $scope.TableGroupByMain = data[2].data.responsegroup;
                            }
                            else if (data[2].data.responsecode == '400') { showErrorToast(data[2].data.errormessage); }

                            if (data[3].data.responsecode == '200' && data[3].data.responsedata != undefined && data[3].data.responsedata != "") {
                                $scope.Parameter.FSGroup = data[3].data.responsedata;
                            }
                            else if (data[3].data.responsecode == '400') { showErrorToast(data[3].data.errormessage); }

                            $scope.OnBinding();
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

    $scope.OnBinding = function () {
        $scope.itemsPerPage = "10";
        $scope.Search.SelectStatus = "All";
        globalService.SetupSequence($scope.TableMain);
        _.each($scope.TableMain, function (item) { item.CreatedOn = formatDateFull(item.CreatedOn); item.UpdatedOn = formatDateFull(item.UpdatedOn); })
        $scope.Table = $scope.TableMain;
        $scope.retpage = [];
        $scope.range();

        $scope.itemsPerPage_2 = "10";
        globalService.SetupSequence($scope.TableGroupMain);
        _.each($scope.TableGroupMain, function (item) { item.CreatedOn = formatDateFull(item.CreatedOn); item.UpdatedOn = formatDateFull(item.UpdatedOn); })
        $scope.TableGroup = $scope.TableGroupMain;
        $scope.retpage_2 = [];
        $scope.range_2();

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

            var c1 = true, c2 = true, c3 = true, c4 = true;

            if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "") {
                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.Code != undefined && (item.Code).indexOf($scope.Search.InputFilter) > -1)
                    c1 = true;
                else if (item.Code == undefined || (item.Code).indexOf($scope.Search.InputFilter) < 0)
                    c1 = false;

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.Name != undefined && (item.Name).indexOf($scope.Search.InputFilter) > -1)
                    c2 = true;
                else if (item.Name == undefined || (item.Name).indexOf($scope.Search.InputFilter) < 0)
                    c2 = false;

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.NameEn != undefined && (item.NameEn).indexOf($scope.Search.InputFilter) > -1)
                    c3 = true;
                else if (item.NameEn == undefined || (item.NameEn).indexOf($scope.Search.InputFilter) < 0)
                    c3 = false;
            }

            if ((c1 || c2 || c3)) {
                return item;
            }
        });

        $scope.retpage = [];
        $scope.range();

        $("#loading").fadeOut();
    }

    $scope.OnClickTable = function (val) {
        if (val != undefined) {
            $scope.TableAdd = {};
            $scope.TableAdd = angular.copy(val);
            $scope.TableAdd.Action = 'แก้ไข';
            $scope.TableAdd.IsActive = $scope.TableAdd.IsActive == 'Yes' ? true : false;
            //Detail
            $scope.itemsPerPage_1 = "10";
            globalService.SetupSequence($scope.TableAdd.AuditDetail);
            $scope.TableAdd.AuditDetailMain = angular.copy($scope.TableAdd.AuditDetail);
            $scope.retpage_1 = [];
            $scope.range_1();

            //Count Use
            if ($scope.TableAdd.AuditDetail != undefined && $scope.TableAdd.AuditDetail.length > 0) {
                _.each($scope.TableAdd.AuditDetail, function (item) {
                    item.SumHour = 0;
                    if (item.DetailUse != undefined && item.DetailUse.length > 0) {
                        amount = item.DetailUse.reduce((s, f) => {
                            return s + parseFloat(f.Hours);
                        }, 0);
                        item.SumHour = amount;
                    }
                });
            }

            $('#ModalAdd').modal('show');
        }
    }

    $scope.OnClickConfirm = function () {
        try {
            var qq = $q.all([serviceOrganize.deleteAuditprogram($scope.TableAdd.Auditprogramid)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            var qq = $q.all([serviceOrganize.getAuditprogram(), serviceOrganize.getAuditProgramFSGroup()]).then(function (data) {
                                try {
                                    if (data[0] != undefined && data[0] != "") {
                                        if (data[0].data.responsecode == 200) {
                                            $scope.TableMain = data[0].data.responsedata;
                                            $scope.OnBinding();
                                            showSuccessText('ลบรายการเรียบร้อย');
                                            $('#ModalConfirm').modal('hide');
                                            $scope.TableAdd = {};
                                        }
                                    }
                                    else
                                        showErrorToast(data[0].data.errormessage);

                                    if (data[1] != undefined && data[1] != "") {
                                        if (data[1].data.responsecode == 200) {
                                            $scope.TableGroupMain = data[1].data.responsedata;
                                            $scope.OnBinding();
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

    $scope.OnClickAdd = function () {
        $scope.TableAdd = {};
        $scope.TableAdd.Action = 'เพิ่ม';
        $scope.TableAdd.IsActive = true;
        $scope.TableAdd.IsSystem = 'No';
        $scope.TableAdd.AuditDetail = [];
        $('#ModalAdd').modal('show');
    }

    $scope.OnClickSave = function (after) {
        try {
            if ($scope.TableAdd.Code == undefined || $scope.TableAdd.Code == '')
                throw "กรุณาระบุรหัส";
            else if ($scope.TableAdd.Name == undefined || $scope.TableAdd.Name == '')
                throw "กรุณาระบุชื่อ";
            else if ($scope.TableAdd.NameEn == undefined || $scope.TableAdd.NameEn == '')
                throw "กรุณาระบุชื่อ (En)";
            else {
                var data = {
                    Auditprogramid: $scope.TableAdd.Auditprogramid,
                    Code: $scope.TableAdd.Code,
                    Name: $scope.TableAdd.Name,
                    NameEn: $scope.TableAdd.NameEn,
                    IsActive: $scope.TableAdd.IsActive ? 'Yes' : 'No',
                };

                data.AuditDetail = [];
                console.log($scope.TableAdd.AuditDetail);
                _.each($scope.TableAdd.AuditDetail, function (item) {
                    console.log(item);
                    data.AuditDetail.push({
                        AuditprogramDetailid: item.AuditprogramDetailid,
                        Name: item.Name,
                        NameEn: item.NameEn,
                        IsDelete: item.IsDelete
                    });
                });
                // data.AuditDetail = $scope.TableAdd.AuditDetail

                console.log(data);
                var qq = $q.all([serviceOrganize.postAuditprogram(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                var qq = $q.all([serviceOrganize.getAuditprogram(), serviceOrganize.getAuditProgramFSGroup()]).then(function (data) {
                                    try {
                                        if (data[0] != undefined && data[0] != "") {
                                            if (data[0].data.responsecode == 200) {
                                                $scope.TableMain = data[0].data.responsedata;
                                                $scope.OnBinding();
                                                showSuccessText('บันทึกรายการเรียบร้อย');
                                                if (after == 'close') {
                                                    $('#ModalAdd').modal('hide');
                                                    $scope.TableAdd = {};
                                                } else if (after == 'new') {
                                                    $scope.OnClickAdd();
                                                }

                                            }
                                        }
                                        else
                                            showErrorToast(data[0].data.errormessage);

                                        if (data[1] != undefined && data[1] != "") {
                                            if (data[1].data.responsecode == 200) {
                                                $scope.TableGroupMain = data[1].data.responsedata;
                                                $scope.OnBinding();
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
            showWariningToast(ex);
        }

    }

    $scope.OnClickAddDetail = function () {
        $scope.TableAddDetail = {};
        $scope.TableAddDetail.Action = 'เพิ่ม';
        $scope.TableAddDetail.IsDelete = 'No';
        $('#ModalAdd').modal('hide');
        $('#ModalAddDetail').modal('show');
    }

    $scope.OnClickCloseDetail = function () {
        $scope.TableAddDetail = {};
        $('#ModalAdd').modal('show');
        $('#ModalAddDetail').modal('hide');
    }

    $scope.OnClickSaveDetail = function (after) {
        try {
            if ($scope.TableAddDetail.Name == undefined || $scope.TableAddDetail.Name == '')
                throw "กรุณาระบุรายละเอียด";
            else if ($scope.TableAddDetail.NameEn == undefined || $scope.TableAddDetail.NameEn == '')
                throw "กรุณาระบุรายละเอียด (EN)";
            else {
                if ($scope.TableAddDetail.Index != undefined) {
                    var val = $scope.TableAdd.AuditDetail[$scope.TableAddDetail.Index];
                    val.Name = $scope.TableAddDetail.Name;
                    val.NameEn = $scope.TableAddDetail.NameEn;
                } else {
                    if ($scope.TableAdd.AuditDetail == undefined)
                        $scope.TableAdd.AuditDetail = [];
                    $scope.TableAdd.AuditDetail.push($scope.TableAddDetail);
                    globalService.SetupSequence($scope.TableAdd.AuditDetail);
                    $scope.TableAdd.AuditDetailMain = angular.copy($scope.TableAdd.AuditDetail);
                    $scope.retpage_1 = [];
                    $scope.range_1();
                }

                if (after == 'new') {
                    $scope.TableAddDetail = {};
                    $scope.TableAddDetail.Action = 'เพิ่ม';
                    $scope.TableAddDetail.IsDelete = 'No';
                }
                else {
                    $('#ModalAdd').modal('show');
                    $('#ModalAddDetail').modal('hide');
                }
            }
        }
        catch (ex) {
            showWariningToast(ex);
        }
    }

    $scope.OnClickUpdateDetail = function (index, values) {
        try {
            if (values != undefined) {
                $scope.TableAddDetail = {};
                $scope.TableAddDetail = angular.copy(values);
                $scope.TableAddDetail.Index = index;
                $scope.TableAddDetail.Action = 'แก้ไข';
                $('#ModalAdd').modal('hide');
                $('#ModalAddDetail').modal('show');
            }
        }
        catch (ex) {
            showErrorToast(ex);
        }
    }

    $scope.OnClickDeleteDetail = function (index, values) {
        try {
            if (values != undefined) {
                if (values.AuditprogramDetailid != undefined)
                    values.IsDelete = 'Yes';
                else
                    $scope.TableAdd.AuditDetail.splice(index, 1);

                globalService.SetupSequence($scope.TableAdd.AuditDetail);
                $scope.TableAdd.AuditDetailMain = angular.copy($scope.TableAdd.AuditDetail);
                $scope.retpage_1 = [];
                $scope.range_1();
            }
        }
        catch (ex) {
            showErrorToast(ex);
        }
    }

    $scope.OnClickDetailReference = function (index,values) {
        try {
            if (values != undefined) {
               
                $scope.TableAddDetail = {};
                $scope.TableAddDetail = angular.copy(values);

                if ($scope.TableAddDetail.DetailUse != undefined && $scope.TableAddDetail.DetailUse.length > 0) {
                    _.each($scope.TableAddDetail.DetailUse, function (item) {
                        item.CreatedOn = formatDateFull(item.CreatedOn);
                    });
                }

                $scope.itemsPerPage_3 = "10";
                globalService.SetupSequence($scope.TableAddDetail.DetailUse);
                $scope.retpage_3 = [];
                $scope.range_3();

                $('#ModalAdd').modal('hide');
                $('#ModalRefernce').modal('show');
            }
        }
        catch (ex) {
            showErrorToast(ex);
        }
    }

    $scope.OnClickCloseReference = function()
    {
        $scope.TableAddDetail = {};
        $('#ModalRefernce').modal('hide');
        $('#ModalAdd').modal('show');
    }

    $scope.OnClickFilterDetail = function () {
        $scope.TableAdd.AuditDetail = $scope.TableAdd.AuditDetailMain;
        $("#loading").fadeIn();
        $scope.TableAdd.AuditDetail = _.filter($scope.TableAdd.AuditDetail, function (item) {

            var c1 = true;

            if ($scope.Search.InputFilterDetail != undefined && $scope.Search.InputFilterDetail != "") {
                if ($scope.Search.InputFilterDetail != undefined && $scope.Search.InputFilterDetail != "" && item.Name != undefined && (item.Name).indexOf($scope.Search.InputFilterDetail) > -1)
                    c1 = true;
                else if (item.Name == undefined || (item.Name).indexOf($scope.Search.InputFilterDetail) < 0)
                    c1 = false;
            }

            if (c1) {
                return item;
            }
        });

        $scope.retpage_1 = [];
        $scope.range_1();

        $("#loading").fadeOut();
    }

    $scope.OnClickTableRelation = function (values) {
        if (values != undefined) {
            $scope.TableAddRelation = {};
            $scope.TableAddRelation = angular.copy(values);
            if ($scope.TableAddRelation.FsgroupCode != undefined) {
                var type = $scope.Parameter.FSGroup.filter(function (item) { return item.Code == $scope.TableAddRelation.FsgroupCode; });
                if (type.length > 0)
                    $scope.TableAddRelation.SelectFSGroup = type[0];
            }
            else {
                $scope.TableAddRelation.SelectFSGroup = undefined;
            }

            $('#ModalAuditRelation').modal('show');
        }
    }

    $scope.OnClickSaveRelation = function () {
        try {
            var data = {
                FsgroupId: $scope.TableAddRelation.SelectFSGroup == undefined ? undefined : $scope.TableAddRelation.SelectFSGroup.FsgroupId,
                Auditprogramid: $scope.TableAddRelation.AuditProgramId,
            };

            console.log(data);
            var qq = $q.all([serviceOrganize.postAuditProgramFSGroup(data)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            var qq = $q.all([serviceOrganize.getAuditProgramFSGroup()]).then(function (data) {
                                try {
                                    if (data[0] != undefined && data[0] != "") {
                                        if (data[0].data.responsecode == 200) {
                                            $scope.TableGroupMain = data[0].data.responsedata;
                                            $scope.OnBinding();
                                            showSuccessText('บันทึกรายการเรียบร้อย');
                                            $('#ModalAuditRelation').modal('hide');
                                            //$scope.TableAddRelation = {};
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
                catch (err) {
                    showErrorToast(response.data.errormessage);
                }
            });
        }
        catch (ex) {
            showErrorToast(ex);
        }
    }

    $scope.OnClickFilterRelation = function () {

        $scope.TableGroup = $scope.TableGroupMain;
        $("#loading").fadeIn();
        $scope.TableGroup = _.filter($scope.TableGroup, function (item) {

            var c1 = true, c2 = true, c3 = true, c4 = true;

            if ($scope.Search.InputFilterRelation != undefined && $scope.Search.InputFilterRelation != "") {
                if ($scope.Search.InputFilterRelation != undefined && $scope.Search.InputFilterRelation != "" && item.AuditProgramCode != undefined && (item.AuditProgramCode).indexOf($scope.Search.InputFilterRelation) > -1)
                    c1 = true;
                else if (item.AuditProgramCode == undefined || (item.AuditProgramCode).indexOf($scope.Search.InputFilterRelation) < 0)
                    c1 = false;
            }

            if ($scope.Search.InputFilterRelation != undefined && $scope.Search.InputFilterRelation != "") {
                if ($scope.Search.InputFilterRelation != undefined && $scope.Search.InputFilterRelation != "" && item.AuditProgramAuditProgramName != undefined && (item.AuditProgramName).indexOf($scope.Search.InputFilterRelation) > -1)
                    c2 = true;
                else if (item.AuditProgramName == undefined || (item.AuditProgramName).indexOf($scope.Search.InputFilterRelation) < 0)
                    c2 = false;
            }

            if ($scope.Search.InputFilterRelation != undefined && $scope.Search.InputFilterRelation != "") {
                if ($scope.Search.InputFilterRelation != undefined && $scope.Search.InputFilterRelation != "" && item.FsgroupCode != undefined && (item.FsgroupCode).indexOf($scope.Search.InputFilterRelation) > -1)
                    c3 = true;
                else if (item.FsgroupCode == undefined || (item.FsgroupCode).indexOf($scope.Search.InputFilterRelation) < 0)
                    c3 = false;
            }

            if ($scope.Search.InputFilterRelation != undefined && $scope.Search.InputFilterRelation != "") {
                if ($scope.Search.InputFilterRelation != undefined && $scope.Search.InputFilterRelation != "" && item.FsgroupFsgroupName != undefined && (item.FsgroupName).indexOf($scope.Search.InputFilterRelation) > -1)
                    c4 = true;
                else if (item.FsgroupName == undefined || (item.FsgroupName).indexOf($scope.Search.InputFilterRelation) < 0)
                    c4 = false;
            }

            if (c1 || c2 || c3 || c4) {
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

    $scope.orderByField = 'Sequence';
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
        return $scope.TableAdd != undefined ? Math.ceil(    $scope.TableAdd.AuditDetail.length / parseInt($scope.itemsPerPage_1)) - 1 : 1;
    };

    $scope.range_1 = function () {
        $scope.itemsCount_1 = $scope.TableAdd != undefined ?   $scope.TableAdd.AuditDetail.length : 0;
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
        return $scope.TableGroup != undefined ?  Math.ceil($scope.TableGroup.length / parseInt($scope.itemsPerPage_2)) - 1 : 1;
    };

    $scope.range_2 = function () {
        $scope.itemsCount_2 = $scope.TableGroup != undefined ? $scope.TableGroup.length : 0;
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
        return Math.ceil($scope.TableAddDetail == undefined ? 0 : $scope.TableAddDetail.DetailUse.length / parseInt($scope.itemsPerPage_3)) - 1;
    };

    $scope.range_3 = function () {

        $scope.itemsCount_3 = $scope.TableAddDetail == undefined ? 0 : $scope.TableAddDetail.DetailUse.length;

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
