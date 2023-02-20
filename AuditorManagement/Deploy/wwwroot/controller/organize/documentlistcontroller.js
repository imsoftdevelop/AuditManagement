angular.module('FOCUSAPP').controller('DocumentListController', function ($stateParams, $rootScope, $state, $scope, $http, $timeout, $q, GlobalVar, globalService,
    serviceOrganize, serviceParameter) {
    var baseURL = $("base")[0].href;//$("base").attr("href");
    var config = GlobalVar.HeaderConfig;
    $scope.Search = [];
    $scope.Table = [];
    $scope.Parameter = [];
    $scope.TableMain = [];

    $scope.initComponent = function () {
        $('.dropdown2').select2();

        if ($("#input-search-start").length) {
            $('#input-search-start').datepicker({
                enableOnReadonly: true,
                todayHighlight: true,
                autoclose: true,
                format: "dd/mm/yyyy"
            });
        }
        if ($("#input-search-end").length) {
            $('#input-search-end').datepicker({
                enableOnReadonly: true,
                todayHighlight: true,
                autoclose: true,
                format: "dd/mm/yyyy"
            });
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

    $scope.init = function () {
        try {
            $scope.initComponent();

            $("#loading").fadeIn();
            var qq = $q.all([serviceOrganize.getDocumentList(), serviceParameter.getParameterDocumentStyle(), serviceParameter.getParameterDocumentTypeOwner()
                , serviceParameter.getParameterCustomerWithOwner(), globalService.getConfigSystem()]).then(function (data) {
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
                                $scope.Parameter.DocumentStyle = data[1].data.responsedata;
                            }
                            else if (data[1].data.responsecode == '400') { showErrorToast(data[1].data.errormessage); }
                        }

                        if (data[2] != undefined && data[2] != "") {
                            if (data[2].data.responsecode == '200' && data[2].data.responsedata != undefined && data[2].data.responsedata != "") {
                                $scope.Parameter.DocumentType = data[2].data.responsedata;
                            }
                            else if (data[2].data.responsecode == '400') { showErrorToast(data[2].data.errormessage); }
                        }

                        if (data[3] != undefined && data[3] != "") {
                            if (data[3].data.responsecode == '200' && data[3].data.responsedata != undefined && data[3].data.responsedata != "") {
                                $scope.Parameter.Customer = data[3].data.responsedata;
                            }
                            else if (data[3].data.responsecode == '400') { showErrorToast(data[3].data.errormessage); }
                        }

                        if (data[4].data.responsecode == '200' && data[4].data.responsedata != undefined && data[4].data.responsedata != "") {
                            $scope.ConfigSystem = data[4].data.responsedata;
                        }
                        else if (data[4].data.responsecode == '400') { showErrorToast(data[4].data.errormessage); }


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
        var qq = $q.all([serviceParameter.getParameterDocumentStyle(), serviceParameter.getParameterDocumentTypeOwner()
            , serviceParameter.getParameterCustomerWithOwner(), globalService.getConfigSystem()]).then(function (data) {
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

                    if (data[2] != undefined && data[2] != "") {
                        if (data[2].data.responsecode == '200' && data[2].data.responsedata != undefined && data[2].data.responsedata != "") {
                            $scope.Parameter.Customer = data[2].data.responsedata;
                        }
                        else if (data[2].data.responsecode == '400') { showErrorToast(data[2].data.errormessage); }
                    }

                    if (data[3].data.responsecode == '200' && data[3].data.responsedata != undefined && data[3].data.responsedata != "") {
                        $scope.ConfigSystem = data[3].data.responsedata;
                    }
                    else if (data[3].data.responsecode == '400') { showErrorToast(data[3].data.errormessage); }


                    if ($stateParams.ref_id != undefined && $stateParams.ref_id != '') {
                        var qq = $q.all([serviceOrganize.getDocumentListWithKey($stateParams.ref_id)]).then(function (data1) {
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
        $scope.TableAdd = {};
        $scope.TableAdd.SelectDocumentType = undefined;
        $scope.TableAdd.SelectDocumentStyle = undefined;
        $scope.TableAdd.SelectCustomer = undefined;
        
        $scope.SelectedFiles = undefined;
        $scope.Upload = undefined;
        initdropify('');

        if ($scope.UserProfiles.CustomerIdActive != undefined && $scope.UserProfiles.CustomerIdActive != '') {
            var type = $scope.Parameter.Customer.filter(function (item) { return item.CustomerId == $scope.UserProfiles.CustomerIdActive; });
            if (type.length > 0)
                $scope.TableAdd.SelectCustomer = type[0];
        }
    }

    $scope.OnBindingAdd = function () {
        alert($scope.UserProfiles.CustomerIdActive)
        if ($scope.TableAdd.DocumentStyleId != undefined) {
            var type = $scope.Parameter.DocumentStyle.filter(function (item) { return item.Code == $scope.TableAdd.DocumentStyleId; });
            if (type.length > 0)
                $scope.TableAdd.SelectDocumentStyle = type[0];
        }
        else {
            $scope.TableAdd.SelectDocumentStyle = undefined;
        }

        if ($scope.TableAdd.DocumentTypeId != undefined) {
            var type = $scope.Parameter.DocumentType.filter(function (item) { return item.Documentid == $scope.TableAdd.DocumentTypeId; });
            if (type.length > 0)
                $scope.TableAdd.SelectDocumentType = type[0];
        }
        else {
            $scope.TableAdd.SelectDocumentType = undefined;
        }

        if ($scope.TableAdd.CustomerId != undefined) {
            var type = $scope.Parameter.Customer.filter(function (item) { return item.CustomerId == $scope.TableAdd.CustomerId; });
            if (type.length > 0)
                $scope.TableAdd.SelectCustomer = type[0];
        }
        else {
            $scope.TableAdd.SelectCustomer = undefined;
        }

        if ($scope.TableAdd.DocumentStyleId == 'DS001') {
            if ($scope.TableAdd.PathFile != undefined && $scope.TableAdd.PathFile != "") {
                initdropify($scope.ConfigSystem.ImagePath + $scope.TableAdd.OwnerId + $scope.ConfigSystem.FilePath + $scope.TableAdd.PathFile);
            }
            else
                initdropify('');
        }
    }

    $scope.OnBinding = function () {
        $scope.itemsPerPage = "10";
        globalService.SetupSequence($scope.TableMain);
        _.each($scope.TableMain, function (item) { item.CreatedOn = formatDateFull(item.CreatedOn); item.UpdatedOn = formatDateFull(item.UpdatedOn); })
        $scope.Table = $scope.TableMain;
        $scope.retpage = [];
        $scope.range();
        GlobalVar.waitForRenderAndDoSomething();
    }

    $scope.OnClickFilter = function () {
        $scope.Table = $scope.TableMain;
        $("#loading").fadeIn();

        $scope.Table = _.filter($scope.Table, function (item) {

            var c1 = true, c2 = true, c3 = true, c4 = true, c5 = true, c6 = true;

            if (($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "")) {

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.DocumentListCode != undefined && (item.DocumentListCode).indexOf($scope.Search.InputFilter) > -1)
                    c1 = true;
                else if (item.DocumentListCode == undefined || (item.DocumentListCode).indexOf($scope.Search.InputFilter) < 0)
                    c1 = false;

                if ($scope.Search.InputFilter != undefined && $scope.Search.InputFilter != "" && item.NameFile != undefined && (item.NameFile).indexOf($scope.Search.InputFilter) > -1)
                    c2 = true;
                else if (item.NameFile == undefined || (item.NameFile).indexOf($scope.Search.InputFilter) < 0)
                    c2 = false;

            }

            if ($scope.Search.SelectStyle != undefined) {
                if (item.DocumentStyleId == $scope.Search.SelectStyle.Code)
                    c3 = true;
                else
                    c3 = false;
            }
            else
                c3 = true;

            if ($scope.Search.SelectType != undefined) {
                if (item.DocumentTypeId == $scope.Search.SelectType.Documentid)
                    c4 = true;
                else
                    c4 = false;
            }
            else
                c4 = true;

            if ($scope.Search.SelectCustomer != undefined) {
                if (item.CustomerId == $scope.Search.SelectCustomer.CustomerId)
                    c5 = true;
                else
                    c5 = false;
            }
            else
                c5 = true;

            if ($scope.Search.InputDateStart != undefined && $scope.Search.InputDateStart != ""
                && $scope.Search.InputDateEnd != undefined && $scope.Search.InputDateEnd != "") {

                var fromarry = formatDateSameYear(item.CreatedOn).split('/');
                var from = new Date(fromarry[0], fromarry[1] - 1, fromarry[2]);

                var startarry = $scope.Search.InputDateStart.split('/');
                var start = new Date(startarry[0], startarry[1] - 1, startarry[2]);

                var endarry = $scope.Search.InputDateEnd.split('/');
                var to = new Date(endarry[0], endarry[1] - 1, endarry[2]);

                if (from >= start && from <= to)
                    c6 = true;
                else
                    c6 = false;
            }

            if ((c1 || c2) && c3 && c4 && c5 && c6) {
                return item;
            }
        });

        $scope.retpage = [];
        $scope.range();

        $("#loading").fadeOut();
    }

    $scope.OnClickTable = function (val) {
        if ($scope.UserProfiles.PermissionCodeActive == 'ASSIS001' || $scope.UserProfiles.PermissionCodeActive == 'ASSIS002' || $scope.UserProfiles.PermissionCodeActive == 'AUDIT001'
            || $scope.UserProfiles.PermissionCodeActive == 'MAG001')
            $state.go('account-documentadd', { ref_id: val.DocumentListId });
        else
            $state.go('office-documentadd', { ref_id: val.DocumentListId });
       
    }

    $scope.OnClickAdd = function () {
        if ($scope.UserProfiles.PermissionCodeActive == 'ASSIS001' || $scope.UserProfiles.PermissionCodeActive == 'ASSIS002' || $scope.UserProfiles.PermissionCodeActive == 'AUDIT001'
            || $scope.UserProfiles.PermissionCodeActive == 'MAG001')
            $state.go('account-documentadd');
        else
            $state.go('office-documentadd');
    }

    $scope.OnClickView = function (val) {
        if (val.DocumentStyleId == 'DS002')
            window.open(val.LinkPath, "_blank");
        else if (val.DocumentStyleId == 'DS001')
            window.open($scope.ConfigSystem.ImagePath + $scope.UserProfiles.EmployeeData.OwnerId + $scope.ConfigSystem.FilePath + val.PathFile, "_blank");
    }

    $scope.OnClickConfirm = function () {
        try {
            var qq = $q.all([serviceOrganize.deleteDocumentList($scope.TableAdd.DocumentListId)]).then(function (data) {
                try {
                    if (data[0] != undefined && data[0] != "") {
                        if (data[0].data.responsecode == 200) {
                            var qq = $q.all([serviceOrganize.getDocumentList()]).then(function (data) {
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
                                                url: baseURL + "Organizations/UploadFileDocument?DocumentId=" + data[0].data.responsedata.DocumentListId,
                                                data: formData,
                                                processData: false,
                                                contentType: false,
                                                type: "POST",
                                                success: function (data) {
                                                    if (after == 'back') {
                                                        $state.go('office-documentlist');
                                                    }
                                                    else {
                                                        $scope.OnInitAddNew();
                                                        $scope.$apply();
                                                        showSuccessText('บันทึกรายการเรียบร้อย');
                                                    }
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
                                    if (after == 'back') {
                                        $state.go('office-documentlist');
                                    }
                                    else {
                                        showSuccessText('บันทึกรายการเรียบร้อย');
                                        $scope.OnInitAddNew();
                                    }
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

    $scope.OnClickAddDocumentType = function () {
        $scope.TableAddType = {};
        $scope.TableAddType.Action = 'เพิ่ม';
        $scope.TableAddType.IsActive = true;
        $('#ModalAdd').modal('show');
    }

    $scope.OnClickSaveDocumentType = function (after) {
        try {
            if ($scope.TableAddType.Code == undefined || $scope.TableAddType.Code == '')
                throw "กรุณาระบุรหัส";
            else if ($scope.TableAddType.Name == undefined || $scope.TableAddType.Name == '')
                throw "กรุณาระบุชื่อ";
            else if ($scope.TableAddType.NameEn == undefined || $scope.TableAddType.NameEn == '')
                throw "กรุณาระบุชื่อ (En)";
            else {
                var data = {
                    Documentid: $scope.TableAddType.Documentid,
                    Code: $scope.TableAddType.Code,
                    Name: $scope.TableAddType.Name,
                    NameEn: $scope.TableAddType.NameEn,
                    IsActive: $scope.TableAddType.IsActive ? 'Yes' : 'No',
                };
                console.log(data);
                var qq = $q.all([serviceOrganize.postDocumenttype(data)]).then(function (data) {
                    try {
                        if (data[0] != undefined && data[0] != "") {
                            if (data[0].data.responsecode == 200) {
                                var qq = $q.all([serviceParameter.getParameterDocumentTypeOwner()]).then(function (data) {
                                    try {
                                        if (data[0] != undefined && data[0] != "") {
                                            if (data[0].data.responsecode == 200) {
                                                $scope.Parameter.DocumentType = data[0].data.responsedata;
                                                showSuccessText('บันทึกรายการเรียบร้อย');
                                                if (after == 'close') {
                                                    $('#ModalAdd').modal('hide');
                                                    $scope.TableAddType = {};
                                                } else {
                                                    $scope.OnClickAddDocumentType();
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