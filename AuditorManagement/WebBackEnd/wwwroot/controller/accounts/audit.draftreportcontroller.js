angular.module('FOCUSAPP').controller('AuditDraftReportController', function ($stateParams, $rootScope, $state, $scope, $http, $timeout, $q, GlobalVar, globalService,
    serviceAccount, serviceParameter) {
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

            //$("#loading").fadeIn();
            //var qq = $q.all([serviceAccount.getAccountPeriods(), serviceParameter.getParameterCustomerWithOwner()]).then(function (data) {
            //    try {
            //        if (data[0] != undefined && data[0] != "") {
            //            if (data[0].data.responsecode == '200' && data[0].data.responsedata != undefined && data[0].data.responsedata != "") {
            //                $scope.TableMain = data[0].data.responsedata;
            //            }
            //            else if (data[0].data.responsecode == '400') { showErrorToast(data[0].data.errormessage); }

            //            $scope.OnBinding();
            //        }

            //        if (data[1] != undefined && data[1] != "") {
            //            if (data[1].data.responsecode == '200' && data[1].data.responsedata != undefined && data[1].data.responsedata != "") {
            //                $scope.Parameter.Customer = data[1].data.responsedata;
            //            }
            //            else if (data[1].data.responsecode == '400') { showErrorToast(data[1].data.errormessage); }
            //        }

            //        $scope.Parameter.Year = [];
            //        var today = new Date();
            //        var year = today.getFullYear();
            //        for (var i = 0; i >= -10; i--) {
            //            var j = year + i;
            //            $scope.Parameter.Year.push(j);
            //        }
            //    }
            //    catch (err) {
            //        showErrorToast(err);

            $("#loading").fadeOut();
            //    }
            //});

        }
        catch (err) {
            $("#loading").fadeOut();
            showErrorToast(err);
        }
    }

    //$scope.Test = function (selector,filename) {

    //   // let response = fetch("/Accountings/DownloadSpreadsheet?file=" + filename)
    //   // let blob = response.blob()
    //    //viewer.openFile(baseURL + "Accountings/DownloadSpreadsheet?file=" + filename, FileType.XLSX)

    //    var viewer = new GcDataViewer(selector)
    //    var xlsx_OpenOptions = {
    //        showHiddenSheets: false,
    //        showHiddenRows: false,
    //        showHiddenColumns: false,
    //        keepRowGroups: false,
    //    };
    //    fetch(baseURL + "Accountings/DownloadSpreadsheet?file=" + filename).then(response => {
    //        response.blob().then(res => {
    //            viewer.openFile(res, FileType.XLSX, xlsx_OpenOptions);
    //        });
    //    })

    //}

    //$scope.OnClickExport = function () {
    //    try {
    //        var data = {};
    //        $http.post(baseURL + "Accountings/DownloadDraftReport?ref_key=" + $stateParams.ref_id, data, config).then(
    //            function (response) {
    //                try {
    //                    console.log(response.data);
    //                    console.log(response.data.isSuccess);
    //                    console.log(response.data.msg);
    //                    if (response.data.isSuccess) {
    //                        $scope.Test('#root', response.data.msg);
    //                        //window.location = baseURL + "Accountings/DownloadSpreadsheet?file=" + ;
    //                    }
    //                    else
    //                        swal("คำเตือน!", "ไม่พบข้อมูล ที่ท่านเลือก", "warning");
    //                }
    //                catch (err) {
    //                    swal("คำเตือน!", err, "warning");
    //                }
    //            });
    //    }
    //    catch (err) {
    //        swal("คำเตือน!", err, "warning");
    //    }

    //}

    $scope.OnClickExport = function () {
        try {

            var qq = $q.all([serviceAccount.getdraftreport('43A937A5-D5C6-4F62-B095-D35903A2882B')]).then(function (data1) {
                try {
                    if (data1[0] != undefined && data1[0] != "") {
                        if (data1[0].data.responsecode == 200) {
                            $scope.TablePeriod = data1[0].data.responsedataperiod;
                            $scope.TableFSTop = data1[0].data.responsedatafstop;
                            $scope.TableFSTopParenet = data1[0].data.responsedatafstopparent;
                            $scope.FSGroupList = data1[0].data.responsedatafsgroup;
                            $scope.ProgramRule = data1[0].data.responsedatarule;
                            $scope.SubFsGroup = data1[0].data.responsedatasubfsgroup;

                            console.log($scope.TablePeriod.TrialBalance);

                            $scope.TablePeriod.Customer.TotalRegistered = ($scope.TablePeriod.Customer.RegisteredCapital == undefined ? 0
                                : $scope.TablePeriod.Customer.RegisteredCapital) * ($scope.TablePeriod.Customer.PriceStock == undefined ? 0 : $scope.TablePeriod.Customer.PriceStock);

                            $scope.TablePeriod.Footer = {};
                            $scope.OnBindingTab1();
                            $scope.OnBindingTab2();
                            $scope.OnBindingTab3();

                            var seq = 1;
                            var fsseq = 4;
                            console.log($scope.TablePeriod.FSGroups);
                            _.each($scope.TablePeriod.FSGroups, function (item) {

                                if (item.Policys != undefined && item.Policys.length > 0) {
                                    _.each(item.Policys, function (item1) {
                                        item1.Sequence = seq;
                                        seq++;
                                    });
                                }

                                item.IsLandScape = false;

                                if (item.NoteToFS != undefined && item.NoteToFS.length > 0) {
                                    item.SequenceNote = fsseq;
                                    fsseq++;

                                    _.each(item.NoteToFS, function (notefs) {
                                        notefs.IsLastPage = false;

                                        if (notefs.NoteFstype == 'Get') {

                                            notefs.SubGroups.SumYear = 0;
                                            notefs.SubGroups.SumMapYear = 0;

                                            _.each(notefs.SubGroups, function (subgroup) {
                                                subgroup.Year = 0;
                                                subgroup.After = 0;

                                                var subfs = _.where($scope.SubFsGroup, { SubFsgroupId: subgroup.SubFsgroupId })[0];
                                                if (subfs != undefined)
                                                    subgroup.Name = subfs.Name

                                                var trial = _.where($scope.TablePeriod.Accounts, { SubFsgroupId: subgroup.SubFsgroupId });

                                                _.each(trial, function (e) {
                                                    var year = _.where($scope.TablePeriod.TrialBalance, { TrialBalanceId: e.TrialBalanceId });
                                                    if (year != undefined && year.length > 0) {
                                                        let amount = year.reduce((s, f) => {
                                                            return s + parseFloat(f.Audit);
                                                        }, 0);

                                                        subgroup.Year += amount;

                                                        amount = year.reduce((s, f) => {
                                                            return s + parseFloat(f.PreviousYear);
                                                        }, 0);

                                                        subgroup.After += amount;
                                                    }
                                                });

                                                notefs.SubGroups.SumYear += subgroup.Year;
                                                notefs.SubGroups.SumMapYear += subgroup.After;
                                            });
                                        }
                                        else if (notefs.NoteFstype == 'Table') {
                                            notefs.HeaderJson = JSON.parse(notefs.Tables[0].Header);

                                            if (notefs.HeaderJson.length <= 7) {
                                                notefs.HeaderWidth = 10;
                                                notefs.FontSize = 15;
                                                notefs.Screen = 'portrait';
                                            }
                                            else {
                                                notefs.HeaderWidth = 8;
                                                notefs.FontSize = 13;
                                                notefs.Screen = 'landscape';
                                                notefs.IsLastPage = true;
                                                item.IsLandScape = true;
                                            }

                                            _.each(notefs.Tables, function (t) {
                                                t.DetailJson = JSON.parse(t.Column);
                                            });
                                        }
                                    });

                                }
                            });

                            // decimal sumyear = 0, year = 0;
                            // decimal sumafter = 0, after = 0;
                            //foreach(AccountAuditFsgroupNotefsGet get in notefs.SubGroups.OrderBy(a => a.AuditSubNoteFsid))
                            //{
                            //        MasterSubfsgroup subfs = new MasterSubfsgroup();
                            //    subfs = subfsgroup.Where(a => a.SubFsgroupId == get.SubFsgroupId).FirstOrDefault();
                            //    if (subfs != null)
                            //        XlsGenFromCustom("C" + row, subfs.Name);

                            //    sumyear += year = period.TrialBalance.Where(a => period.Accounts.Where(a => a.SubFsgroupId == get.SubFsgroupId).ToList().ConvertAll(a =>
                            //        a.TrialBalanceId).ToArray().Contains(a.TrialBalanceId)).Sum(a => a.Audit.Value);
                            //    sumafter += after = period.TrialBalance.Where(a => period.Accounts.Where(a => a.SubFsgroupId == get.SubFsgroupId).ToList().ConvertAll(a =>
                            //        a.TrialBalanceId).ToArray().Contains(a.TrialBalanceId)).Sum(a => a.PreviousYear.Value);

                            //    XlsStyleAligntRight("I" + row, "K" + row);

                            //    XlsGenFromCustom("I" + row, year.ToString("n2"));
                            //    XlsGenFromCustom("K" + row, after.ToString("n2"));
                            //    row++;
                            //}




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
        catch (err) {
            swal("คำเตือน!", err, "warning");
        }

    }

    $scope.OnClickPrint = function () {
        var printContents = document.getElementById("divPrint0").innerHTML;
        printContents = printContents + document.getElementById("divPrint").innerHTML;
        printContents = printContents + document.getElementById("divPrint1").innerHTML;
        printContents = printContents + document.getElementById("divPrint2").innerHTML;
        printContents = printContents + document.getElementById("divPrint3").innerHTML;
        printContents = printContents + document.getElementById("divPrint4").innerHTML;
        printContents = printContents + document.getElementById("divPrint5").innerHTML;

        var i = 0;
        _.each($scope.TablePeriod.FSGroups, function (fsgroup) {
            if (fsgroup.NoteToFS != undefined && fsgroup.NoteToFS.length > 0) {
                printContents = printContents + document.getElementById("divPrint6_" + fsgroup.Code).innerHTML;
                printContents = printContents + document.getElementById("divPrint7_" + fsgroup.Code).innerHTML;
            }
            i++;
        })
        //printContents = printContents + document.getElementById("divPrint7").innerHTML;

        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();
    }

    $scope.OnBindingTab1 = function () {
        $scope.TablePeriod.Asset = [];
        $scope.TablePeriod.NonAsset = [];

        //ดึงข้อมูล เฉพาะ FSTOP
        var assetlist = _.filter($scope.TableFSTopParenet, function (item) { if (item.FstopId == 1) return item; });
        var nonassetlist = _.filter($scope.TableFSTopParenet, function (item) { if (item.FstopId == 2) return item; });

        $scope.TablePeriod.Footer.Asset = {};
        $scope.Calculate(assetlist, $scope.TablePeriod.Asset, $scope.TablePeriod.Footer.Asset)
        $scope.TablePeriod.Asset = _.sortBy($scope.TablePeriod.Asset, 'Code');

        $scope.TablePeriod.Footer.NonAsset = {};
        $scope.Calculate(nonassetlist, $scope.TablePeriod.NonAsset, $scope.TablePeriod.Footer.NonAsset)
        $scope.TablePeriod.NonAsset = _.sortBy($scope.TablePeriod.NonAsset, 'Code');

        $scope.TablePeriod.Footer.SumAsset = {};
        $scope.TablePeriod.Footer.SumAsset.Current = $scope.TablePeriod.Footer.Asset.Current + $scope.TablePeriod.Footer.NonAsset.Current;
        $scope.TablePeriod.Footer.SumAsset.Debit = $scope.TablePeriod.Footer.Asset.Debit + $scope.TablePeriod.Footer.NonAsset.Debit;
        $scope.TablePeriod.Footer.SumAsset.Credit = $scope.TablePeriod.Footer.Asset.Credit + $scope.TablePeriod.Footer.NonAsset.Credit;
        $scope.TablePeriod.Footer.SumAsset.Audit = $scope.TablePeriod.Footer.Asset.Audit + $scope.TablePeriod.Footer.NonAsset.Audit;
        $scope.TablePeriod.Footer.SumAsset.Previous = $scope.TablePeriod.Footer.Asset.Previous + $scope.TablePeriod.Footer.NonAsset.Previous;
        $scope.TablePeriod.Footer.SumAsset.Move = $scope.TablePeriod.Footer.Asset.Move + $scope.TablePeriod.Footer.NonAsset.Move;
        $scope.TablePeriod.Footer.SumAsset.Percent = $scope.TablePeriod.Footer.SumAsset.Move != 0 && $scope.TablePeriod.Footer.SumAsset.Previous != 0 ? $scope.TablePeriod.Footer.SumAsset.Move / $scope.TablePeriod.Footer.SumAsset.Previous * 100 : 0;
    }

    $scope.OnBindingTab2 = function () {
        $scope.TablePeriod.Liabilities = [];
        $scope.TablePeriod.NonLiabilities = [];
        $scope.TablePeriod.Shareholder = [];

        //ดึงข้อมูล เฉพาะ FSTOP
        var liabilitieslist = _.filter($scope.TableFSTopParenet, function (item) { if (item.FstopId == 3) return item; });
        var nonliabilitieslist = _.filter($scope.TableFSTopParenet, function (item) { if (item.FstopId == 4) return item; });
        var sharelist = _.filter($scope.TableFSTopParenet, function (item) { if (item.FstopId == 5) return item; });

        $scope.TablePeriod.Footer.Liabilities = {};
        $scope.Calculate(liabilitieslist, $scope.TablePeriod.Liabilities, $scope.TablePeriod.Footer.Liabilities, true)
        $scope.TablePeriod.Liabilities = _.sortBy($scope.TablePeriod.Liabilities, 'Code');

        $scope.TablePeriod.Footer.NonLiabilities = {};
        $scope.Calculate(nonliabilitieslist, $scope.TablePeriod.NonLiabilities, $scope.TablePeriod.Footer.NonLiabilities, true)
        $scope.TablePeriod.NonLiabilities = _.sortBy($scope.TablePeriod.NonLiabilities, 'Code');

        $scope.TablePeriod.Footer.Shareholder = {};
        $scope.Calculate(sharelist, $scope.TablePeriod.Shareholder, $scope.TablePeriod.Footer.Shareholder, true)
        $scope.TablePeriod.Shareholder = _.sortBy($scope.TablePeriod.Shareholder, 'Code');

        $scope.TablePeriod.Footer.SumLiabilities = {};
        $scope.TablePeriod.Footer.SumLiabilities.Current = $scope.TablePeriod.Footer.Liabilities.Current + $scope.TablePeriod.Footer.NonLiabilities.Current;
        $scope.TablePeriod.Footer.SumLiabilities.Debit = $scope.TablePeriod.Footer.Liabilities.Debit + $scope.TablePeriod.Footer.NonLiabilities.Debit;
        $scope.TablePeriod.Footer.SumLiabilities.Credit = $scope.TablePeriod.Footer.Liabilities.Credit + $scope.TablePeriod.Footer.NonLiabilities.Credit;
        $scope.TablePeriod.Footer.SumLiabilities.Audit = $scope.TablePeriod.Footer.Liabilities.Audit + $scope.TablePeriod.Footer.NonLiabilities.Audit;
        $scope.TablePeriod.Footer.SumLiabilities.Previous = $scope.TablePeriod.Footer.Liabilities.Previous + $scope.TablePeriod.Footer.NonLiabilities.Previous;
        $scope.TablePeriod.Footer.SumLiabilities.Move = $scope.TablePeriod.Footer.Liabilities.Move + $scope.TablePeriod.Footer.NonLiabilities.Move;
        $scope.TablePeriod.Footer.SumLiabilities.Percent = $scope.TablePeriod.Footer.SumLiabilities.Move != 0 && $scope.TablePeriod.Footer.SumLiabilities.Previous != 0 ?
            $scope.TablePeriod.Footer.SumLiabilities.Move / $scope.TablePeriod.Footer.SumLiabilities.Previous * 100 : 0;

        //SumLiqShare
        $scope.TablePeriod.Footer.SumLiqShare = {};
        $scope.TablePeriod.Footer.SumLiqShare.Current = $scope.TablePeriod.Footer.SumLiabilities.Current + $scope.TablePeriod.Footer.Shareholder.Current;
        $scope.TablePeriod.Footer.SumLiqShare.Debit = $scope.TablePeriod.Footer.SumLiabilities.Debit + $scope.TablePeriod.Footer.Shareholder.Debit;
        $scope.TablePeriod.Footer.SumLiqShare.Credit = $scope.TablePeriod.Footer.SumLiabilities.Credit + $scope.TablePeriod.Footer.Shareholder.Credit;
        $scope.TablePeriod.Footer.SumLiqShare.Audit = $scope.TablePeriod.Footer.SumLiabilities.Audit + $scope.TablePeriod.Footer.Shareholder.Audit;
        $scope.TablePeriod.Footer.SumLiqShare.Previous = $scope.TablePeriod.Footer.SumLiabilities.Previous + $scope.TablePeriod.Footer.Shareholder.Previous;
        $scope.TablePeriod.Footer.SumLiqShare.Move = $scope.TablePeriod.Footer.SumLiabilities.Move + $scope.TablePeriod.Footer.Shareholder.Move;
        $scope.TablePeriod.Footer.SumLiqShare.Percent = $scope.TablePeriod.Footer.SumLiqShare.Move != 0 && $scope.TablePeriod.Footer.SumLiqShare.Previous != 0 ?
            $scope.TablePeriod.Footer.SumLiqShare.Move / $scope.TablePeriod.Footer.SumLiqShare.Previous * 100 : 0;
    }

    $scope.OnBindingTab3 = function () {
        $scope.TablePeriod.Revenues = [];
        $scope.TablePeriod.Expenses = [];
        $scope.TablePeriod.Financecosts = [];

        //ดึงข้อมูล เฉพาะ FSTOP
        var revenueslist = _.filter($scope.TableFSTopParenet, function (item) { if (item.FstopId == 6) return item; });
        var expenseslist = _.filter($scope.TableFSTopParenet, function (item) { if (item.FstopId == 7) return item; });
        var financecostslist = _.filter($scope.TableFSTopParenet, function (item) { if (item.FstopId == 8) return item; });

        $scope.TablePeriod.Footer.Revenues = {};
        $scope.Calculate(revenueslist, $scope.TablePeriod.Revenues, $scope.TablePeriod.Footer.Revenues, true)
        $scope.TablePeriod.Revenues = _.sortBy($scope.TablePeriod.Revenues, 'Code');

        $scope.TablePeriod.Footer.Expenses = {};
        $scope.Calculate(expenseslist, $scope.TablePeriod.Expenses, $scope.TablePeriod.Footer.Expenses)
        $scope.TablePeriod.Expenses = _.sortBy($scope.TablePeriod.Expenses, 'Code');

        $scope.TablePeriod.Footer.Financecosts = {};
        $scope.Calculate(financecostslist, $scope.TablePeriod.Financecosts, $scope.TablePeriod.Footer.Financecosts)
        $scope.TablePeriod.Financecosts = _.sortBy($scope.TablePeriod.Financecosts, 'Code');

        $scope.TablePeriod.Footer.SumEarnings = {};
        $scope.TablePeriod.Footer.SumEarnings.Current = $scope.TablePeriod.Footer.Revenues.Current - $scope.TablePeriod.Footer.Expenses.Current;
        $scope.TablePeriod.Footer.SumEarnings.Debit = $scope.TablePeriod.Footer.Revenues.Debit + $scope.TablePeriod.Footer.Expenses.Debit;
        $scope.TablePeriod.Footer.SumEarnings.Credit = $scope.TablePeriod.Footer.Revenues.Credit + $scope.TablePeriod.Footer.Expenses.Credit;
        $scope.TablePeriod.Footer.SumEarnings.Audit = $scope.TablePeriod.Footer.Revenues.Audit - $scope.TablePeriod.Footer.Expenses.Audit;
        $scope.TablePeriod.Footer.SumEarnings.Previous = $scope.TablePeriod.Footer.Revenues.Previous - $scope.TablePeriod.Footer.Expenses.Previous;
        $scope.TablePeriod.Footer.SumEarnings.Move = $scope.TablePeriod.Footer.Revenues.Move - $scope.TablePeriod.Footer.Expenses.Move;
        $scope.TablePeriod.Footer.SumEarnings.Percent = $scope.TablePeriod.Footer.Revenues.Move != 0 && $scope.TablePeriod.Footer.Expenses.Previous != 0 ?
            $scope.TablePeriod.Footer.SumEarnings.Move / $scope.TablePeriod.Footer.SumEarnings.Previous * 100 : 0;

        //SumLiqShare
        $scope.TablePeriod.Footer.NetProfit = {};
        $scope.TablePeriod.Footer.NetProfit.Current = $scope.TablePeriod.Footer.SumEarnings.Current - $scope.TablePeriod.Footer.Financecosts.Current;
        $scope.TablePeriod.Footer.NetProfit.Debit = $scope.TablePeriod.Footer.SumEarnings.Debit + $scope.TablePeriod.Footer.Financecosts.Debit;
        $scope.TablePeriod.Footer.NetProfit.Credit = $scope.TablePeriod.Footer.SumEarnings.Credit + $scope.TablePeriod.Footer.Financecosts.Credit;
        $scope.TablePeriod.Footer.NetProfit.Audit = $scope.TablePeriod.Footer.SumEarnings.Audit - $scope.TablePeriod.Footer.Financecosts.Audit;
        $scope.TablePeriod.Footer.NetProfit.Previous = $scope.TablePeriod.Footer.SumEarnings.Previous - $scope.TablePeriod.Footer.Financecosts.Previous;
        $scope.TablePeriod.Footer.NetProfit.Move = $scope.TablePeriod.Footer.SumEarnings.Move - $scope.TablePeriod.Footer.Financecosts.Move;
        $scope.TablePeriod.Footer.NetProfit.Percent = $scope.TablePeriod.Footer.NetProfit.Move != 0 && $scope.TablePeriod.Footer.NetProfit.Previous != 0 ?
            $scope.TablePeriod.Footer.NetProfit.Move / $scope.TablePeriod.Footer.NetProfit.Previous * 100 : 0;
    }

    $scope.Calculate = function (table, keep, footer, convert = false) {

        var current = 0; var dr = 0; var cr = 0; var audit = 0; var last = 0; var move = 0; var smove = 0; var per = 0;

        _.each(table, function (item) {
            var fsgroup = _.where($scope.FSGroupList, { FsgroupId: item.FsgroupId })[0];
            if (fsgroup != undefined) {
                var trialinfs = _.where($scope.TablePeriod.TrialBalance, { FsgroupId: item.FsgroupId });
                var datas = {};
                datas.FsgroupId = fsgroup.FsgroupId;
                datas.Code = fsgroup.Code;
                datas.Name = fsgroup.Name;
                //Current
                let amount = trialinfs.reduce((s, f) => {
                    return s + parseFloat(f.Amount);
                }, 0);
                datas.Current = convert ? amount * (-1) : amount;
                current += convert ? amount * (-1) : amount;
                //Debit
                amount = trialinfs.reduce((s, f) => {
                    return s + parseFloat(f.Debit == undefined ? 0 : f.Debit);
                }, 0);
                datas.Debit = amount;
                dr += amount;
                //Credit
                amount = trialinfs.reduce((s, f) => {
                    return s + parseFloat(f.Credit == undefined ? 0 : f.Credit);
                }, 0);
                datas.Credit = amount;
                cr += amount;
                //Audit
                amount = trialinfs.reduce((s, f) => {
                    return s + parseFloat(f.Audit == undefined ? 0 : f.Audit);
                }, 0);
                datas.Audit = convert ? amount * (-1) : amount;;
                audit += convert ? amount * (-1) : amount;
                //Previous
                amount = trialinfs.reduce((s, f) => {
                    return s + parseFloat(f.PreviousYear == undefined ? 0 : f.PreviousYear);
                }, 0);
                datas.Previous = convert ? amount * (-1) : amount;
                last += convert ? amount * (-1) : amount;
                //Move
                move = datas.Audit - datas.Previous;
                datas.Move = move;
                smove += move;
                //Percent
                per = move != 0 && datas.Previous != 0 ? move / datas.Previous : 0;
                datas.Percent = per * 100;
                keep.push(datas);
            }
        });
        footer.Current = current;
        footer.Debit = dr;
        footer.Credit = cr;
        footer.Audit = audit;
        footer.Previous = last;
        footer.Move = smove;
        footer.Percent = smove != 0 ? smove / last * 100 : 0;


        globalService.SetupSequence(keep);
    }
});
