using Models.Master;
using Models.Models;
using Newtonsoft.Json;
using OfficeOpenXml;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Logical;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;
using OfficeOpenXml.Style;
using Renci.SshNet;
using Repository;
using System;
using System.Collections.Generic;
using System.Diagnostics.Tracing;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Accounting_Management.Report
{
    public class XlsDraftReport : IMauchlyCore.ClsCreateExcel
    {
        public AccountPeriod period { get; set; }
        public List<MasterFstop> mfstop { get; set; }
        public List<FstopParentFsgroup> pfstop { get; set; }
        public List<Fsgroup> mfsgroup { get; set; }

        public override void WritesTemplate(string PathFile, string PathGet)
        {
            try
            {
                base.WritesTemplate(PathFile, PathGet);

                #region Calculate TrailBalance + Adjust 

                if (period.SubAdjustments?.Any() ?? false)
                {
                    List<AccountAdjustmentSub> agreeadjustment = period.SubAdjustments.Where(a => a.AdjustmentAgree == "Agree" && a.AdjustmentPeriod == "Current").ToList();
                    foreach (AccountAdjustmentSub agree in agreeadjustment)
                    {
                        AccountTrialbalance trial = period.TrialBalance.Where(a => a.AccountCode == agree.AccountCode).FirstOrDefault();
                        trial.Debit = trial.Debit.HasValue ? trial.Debit : 0; trial.Credit = trial.Credit.HasValue ? trial.Credit : 0;
                        trial.Debit += agree.Debit.HasValue ? agree.Debit : 0;
                        trial.Credit = agree.Credit.HasValue ? agree.Credit : 0;
                    }

                    List<AccountAdjustmentSub> perioddjustment = period.SubAdjustments.Where(a => a.AdjustmentAgree == "Agree" && a.AdjustmentPeriod == "Previous").ToList();
                    foreach (AccountAdjustmentSub addperiod in perioddjustment)
                    {
                        AccountTrialbalance trial = period.TrialBalance.Where(a => a.AccountCode == addperiod.AccountCode).FirstOrDefault();
                        trial.PreviousYear = trial.PreviousYear.HasValue ? trial.PreviousYear : 0;
                        trial.PreviousYear += addperiod.Debit.HasValue ? addperiod.Debit : 0;
                        trial.PreviousYear -= addperiod.Credit.HasValue ? addperiod.Debit : 0;
                    }

                    foreach (AccountTrialbalance trial in period.TrialBalance)
                    {
                        trial.Audit = trial.Audit.HasValue ? trial.Audit : 0;
                        trial.Audit = trial.Amount + (trial.Debit.HasValue ? trial.Debit : 0);
                        trial.Audit = trial.Audit - (trial.Credit.HasValue ? trial.Credit : 0);
                    }
                }

                #endregion

                #region BS1
                base.ObjWorkSheet = base.ObjPackage.Workbook.Worksheets["A1"];

                XlsGenFromCustom("A1", period.Customer.Name);
                XlsGenFromCustom("A3", "ณ วันที่ " + period.EndDate.Value.ToString("dd MMMM yyyy", new CultureInfo("th-TH")));

                XlsGenFromCustom("F7", period.Year);
                XlsGenFromCustom("H7", period.MapYear);

                int row = 9;
                // Asset
                MasterFstop fstopasset = mfstop.Where(a => a.FstopId == 1).FirstOrDefault();
                List<FstopParentFsgroup> pfstopasset = pfstop.Where(a => a.FstopId == fstopasset.FstopId).ToList();
                XlsGenFromCustom("A" + row, fstopasset.Name); row++;
                decimal sumasset = 0, previossumasset = 0;
                foreach (FstopParentFsgroup parent in pfstopasset)
                {
                    Fsgroup fsgroup = mfsgroup.Where(a => a.FsgroupId == parent.FsgroupId).FirstOrDefault();
                    if (fsgroup != null)
                    {
                        List<AccountTrialbalance> trialinfs = period.TrialBalance.Where(a => a.FsgroupId == fsgroup.FsgroupId).ToList();
                        sumasset += trialinfs.Sum(a => a.Audit.Value);
                        previossumasset += trialinfs.Sum(a => a.PreviousYear.Value);

                        XlsGenFromCustom("B" + row, fsgroup.Name);
                        XlsGenFromCustom("F" + row, trialinfs.Sum(a => a.Audit.Value));
                        XlsGenFromCustom("H" + row, trialinfs.Sum(a => a.PreviousYear));
                        row++;
                    }
                }
                XlsGenFromCustom("A" + row, "รวม" + fstopasset.Name);
                XlsGenFromCustom("F" + row, sumasset);
                XlsGenFromCustom("H" + row, previossumasset);
                XlsStyleBorderBottom("F" + row, "F" + row);
                XlsStyleBorderBottom("H" + row, "H" + row);
                row++;

                // Non Asset
                MasterFstop fstopnonasset = mfstop.Where(a => a.FstopId == 2).FirstOrDefault();
                List<FstopParentFsgroup> pfstopnonasset = pfstop.Where(a => a.FstopId == fstopnonasset.FstopId).ToList();
                XlsGenFromCustom("A" + row, fstopnonasset.Name); row++;
                decimal nonsumasset = 0, nonpreviossumasset = 0;
                foreach (FstopParentFsgroup parent in pfstopnonasset)
                {
                    Fsgroup fsgroup = mfsgroup.Where(a => a.FsgroupId == parent.FsgroupId).FirstOrDefault();
                    if (fsgroup != null)
                    {
                        List<AccountTrialbalance> trialinfs = period.TrialBalance.Where(a => a.FsgroupId == fsgroup.FsgroupId).ToList();
                        nonsumasset += trialinfs.Sum(a => a.Audit.Value);
                        nonpreviossumasset += trialinfs.Sum(a => a.PreviousYear.Value);

                        XlsGenFromCustom("B" + row, fsgroup.Name);
                        XlsGenFromCustom("F" + row, trialinfs.Sum(a => a.Audit));
                        XlsGenFromCustom("H" + row, trialinfs.Sum(a => a.PreviousYear));
                        row++;
                    }
                }

                XlsGenFromCustom("A" + row, "รวม" + fstopnonasset.Name);
                XlsGenFromCustom("F" + row, nonsumasset);
                XlsStyleBorderBottom("F" + row, "F" + row);
                XlsGenFromCustom("H" + row, nonpreviossumasset);
                XlsStyleBorderBottom("H" + row, "H" + row);
                row++;

                XlsGenFromCustom("A" + row, "รวมสินทรัพย์");
                XlsGenFromCustom("F" + row, sumasset + nonsumasset);
                XlsGenFromCustom("H" + row, previossumasset + nonpreviossumasset);
                XlsStyleBorderBottom("F" + row, "F" + row);
                XlsStyleBorderBottom("H" + row, "H" + row);
                row = row + 2;
                XlsGenFromCustom("A" + row, "หมายเหตุประกอบงบการเงินเป็นส่วนหนึ่งของงบการเงินนี้");
                row++;
                XlsGenFromCustom("A" + row, "งบการเงินนี้ได้รับอนุมัติจากที่ประชุมใหญ่สามัญผู้ถือหุ้นครั้งที่ .........................เมื่อวันที่..................................");
                #endregion

                #region BS2
                base.ObjWorkSheet = base.ObjPackage.Workbook.Worksheets["A2"];

                XlsGenFromCustom("A1", period.Customer.Name);
                XlsGenFromCustom("A3", "ณ วันที่ " + period.EndDate.Value.ToString("dd MMMM yyyy", new CultureInfo("th-TH")));

                XlsGenFromCustom("F7", period.Year);
                XlsGenFromCustom("H7", period.MapYear);

                row = 9;
                // Debt
                MasterFstop fstopdebt = mfstop.Where(a => a.FstopId == 3).FirstOrDefault();
                List<FstopParentFsgroup> pfstopdebt = pfstop.Where(a => a.FstopId == fstopdebt.FstopId).ToList();
                XlsGenFromCustom("A" + row, fstopdebt.Name); row++;
                decimal sumdebt = 0, previossumdebt = 0;
                foreach (FstopParentFsgroup parent in pfstopdebt)
                {
                    Fsgroup fsgroup = mfsgroup.Where(a => a.FsgroupId == parent.FsgroupId).FirstOrDefault();
                    if (fsgroup != null)
                    {
                        List<AccountTrialbalance> trialinfs = period.TrialBalance.Where(a => a.FsgroupId == fsgroup.FsgroupId).ToList();
                        sumdebt += trialinfs.Sum(a => a.Audit.Value) * (-1);
                        previossumdebt += trialinfs.Sum(a => a.PreviousYear.Value) * (-1);

                        XlsGenFromCustom("B" + row, fsgroup.Name);
                        XlsGenFromCustom("F" + row, trialinfs.Sum(a => a.Audit.Value) * (-1));
                        XlsGenFromCustom("H" + row, trialinfs.Sum(a => a.PreviousYear) * (-1));
                        row++;
                    }
                }
                XlsGenFromCustom("A" + row, "รวม" + fstopdebt.Name);
                XlsGenFromCustom("F" + row, sumdebt);
                XlsGenFromCustom("H" + row, previossumdebt);
                XlsStyleBorderBottom("F" + row, "F" + row);
                XlsStyleBorderBottom("H" + row, "H" + row);
                row++;

                // Non Debt
                MasterFstop fstopnondebt = mfstop.Where(a => a.FstopId == 4).FirstOrDefault();
                List<FstopParentFsgroup> pfstopnondebt = pfstop.Where(a => a.FstopId == fstopnondebt.FstopId).ToList();
                XlsGenFromCustom("A" + row, fstopnondebt.Name); row++;
                decimal nonsumdebt = 0, nonpreviossumdebt = 0;
                foreach (FstopParentFsgroup parent in pfstopnondebt)
                {
                    Fsgroup fsgroup = mfsgroup.Where(a => a.FsgroupId == parent.FsgroupId).FirstOrDefault();
                    if (fsgroup != null)
                    {
                        List<AccountTrialbalance> trialinfs = period.TrialBalance.Where(a => a.FsgroupId == fsgroup.FsgroupId).ToList();
                        nonsumdebt += trialinfs.Sum(a => a.Audit.Value) * (-1);
                        nonpreviossumdebt += trialinfs.Sum(a => a.PreviousYear.Value) * (-1);

                        XlsGenFromCustom("B" + row, fsgroup.Name);
                        XlsGenFromCustom("F" + row, trialinfs.Sum(a => a.Audit) * (-1));
                        XlsGenFromCustom("H" + row, trialinfs.Sum(a => a.PreviousYear) * (-1));
                        row++;
                    }
                }

                XlsGenFromCustom("A" + row, "รวม" + fstopnondebt.Name);
                XlsGenFromCustom("F" + row, nonsumdebt);
                XlsGenFromCustom("H" + row, nonpreviossumdebt);
                XlsStyleBorderBottom("F" + row, "F" + row);
                XlsStyleBorderBottom("H" + row, "H" + row);
                row++;

                XlsGenFromCustom("A" + row, "รวมหนี้สิน");
                XlsGenFromCustom("F" + row, sumdebt + nonsumdebt);
                XlsGenFromCustom("H" + row, previossumdebt + nonpreviossumdebt);
                XlsStyleBorderBottom("F" + row, "F" + row);
                XlsStyleBorderBottom("H" + row, "H" + row);
                row++;

                // Fund
                MasterFstop fstopfund = mfstop.Where(a => a.FstopId == 5).FirstOrDefault();
                List<FstopParentFsgroup> pfstopfund = pfstop.Where(a => a.FstopId == fstopfund.FstopId).ToList();
                XlsGenFromCustom("A" + row, fstopfund.Name); row++;
                XlsGenFromCustom("B" + row, "ทุนจดทะเบียน"); row++;
                XlsGenFromCustom("C" + row, "หุ้นสามัญ xx หุ้น มูลค่าหุ้นละ xx บาท"); row++;
                decimal sumfund = 0, previossumfund = 0;
                foreach (FstopParentFsgroup parent in pfstopfund)
                {
                    Fsgroup fsgroup = mfsgroup.Where(a => a.FsgroupId == parent.FsgroupId).FirstOrDefault();
                    if (fsgroup != null)
                    {
                        List<AccountTrialbalance> trialinfs = period.TrialBalance.Where(a => a.FsgroupId == fsgroup.FsgroupId).ToList();
                        sumfund += trialinfs.Sum(a => a.Audit.Value) * (-1);
                        previossumfund += trialinfs.Sum(a => a.PreviousYear.Value) * (-1);

                        XlsGenFromCustom("B" + row, fsgroup.Name);
                        XlsGenFromCustom("F" + row, trialinfs.Sum(a => a.Audit) * (-1));
                        XlsGenFromCustom("H" + row, trialinfs.Sum(a => a.PreviousYear) * (-1));
                        row++;
                    }
                }

                XlsGenFromCustom("A" + row, "รวม" + fstopfund.Name);
                XlsGenFromCustom("F" + row, sumfund);
                XlsGenFromCustom("H" + row, previossumfund);
                XlsStyleBorderBottom("F" + row, "F" + row);
                XlsStyleBorderBottom("H" + row, "H" + row);
                row++;

                XlsGenFromCustom("A" + row, "รวมหนี้สินและส่วนของผู้ถือหุ้น");
                XlsGenFromCustom("F" + row, sumdebt + nonsumdebt + sumfund);
                XlsGenFromCustom("H" + row, previossumdebt + nonpreviossumdebt + previossumfund);
                XlsStyleBorderBottom("F" + row, "F" + row);
                XlsStyleBorderBottom("H" + row, "H" + row);

                row = row + 2;
                XlsGenFromCustom("A" + row, "หมายเหตุประกอบงบการเงินเป็นส่วนหนึ่งของงบการเงินนี้");
                row++;
                XlsGenFromCustom("A" + row, "งบการเงินนี้ได้รับอนุมัติจากที่ประชุมใหญ่สามัญผู้ถือหุ้นครั้งที่ .........................เมื่อวันที่..................................");
                #endregion

                #region PL-1
                base.ObjWorkSheet = base.ObjPackage.Workbook.Worksheets["A3"];

                XlsGenFromCustom("A1", period.Customer.Name);
                XlsGenFromCustom("A3", "ณ วันที่ " + period.EndDate.Value.ToString("dd MMMM yyyy", new CultureInfo("th-TH")));

                XlsGenFromCustom("F6", period.Year);
                XlsGenFromCustom("H6", period.MapYear);

                row = 9;
                // Income
                MasterFstop fstopincome = mfstop.Where(a => a.FstopId == 6).FirstOrDefault();
                List<FstopParentFsgroup> pfstopincome = pfstop.Where(a => a.FstopId == fstopincome.FstopId).ToList();
                XlsGenFromCustom("A" + row, fstopincome.Name); row++;
                decimal sumincome = 0, previossumincome = 0;
                foreach (FstopParentFsgroup parent in pfstopincome)
                {
                    Fsgroup fsgroup = mfsgroup.Where(a => a.FsgroupId == parent.FsgroupId).FirstOrDefault();
                    if (fsgroup != null)
                    {
                        List<AccountTrialbalance> trialinfs = period.TrialBalance.Where(a => a.FsgroupId == fsgroup.FsgroupId).ToList();
                        sumincome += trialinfs.Sum(a => a.Audit.Value) * (-1);
                        previossumincome += trialinfs.Sum(a => a.PreviousYear.Value) * (-1);

                        XlsGenFromCustom("B" + row, fsgroup.Name);
                        XlsGenFromCustom("F" + row, trialinfs.Sum(a => a.Audit.Value) * (-1));
                        XlsGenFromCustom("H" + row, trialinfs.Sum(a => a.PreviousYear) * (-1));
                        row++;
                    }
                }
                XlsGenFromCustom("A" + row, "รวม" + fstopincome.Name);
                XlsGenFromCustom("F" + row, sumincome);
                XlsGenFromCustom("H" + row, previossumincome);
                XlsStyleBorderBottom("F" + row, "F" + row);
                XlsStyleBorderBottom("H" + row, "H" + row);
                row++;

                // Expense
                MasterFstop fstopnonepx = mfstop.Where(a => a.FstopId == 7).FirstOrDefault();
                List<FstopParentFsgroup> pfstopnonepx = pfstop.Where(a => a.FstopId == fstopnonepx.FstopId).ToList();
                XlsGenFromCustom("A" + row, fstopnonepx.Name); row++;
                decimal nonsumepx = 0, nonpreviossumepx = 0;
                foreach (FstopParentFsgroup parent in pfstopnonepx)
                {
                    Fsgroup fsgroup = mfsgroup.Where(a => a.FsgroupId == parent.FsgroupId).FirstOrDefault();
                    if (fsgroup != null)
                    {
                        List<AccountTrialbalance> trialinfs = period.TrialBalance.Where(a => a.FsgroupId == fsgroup.FsgroupId).ToList();
                        nonsumepx += trialinfs.Sum(a => a.Audit.Value);
                        nonpreviossumepx += trialinfs.Sum(a => a.PreviousYear.Value);

                        XlsGenFromCustom("B" + row, fsgroup.Name);
                        XlsGenFromCustom("F" + row, trialinfs.Sum(a => a.Audit));
                        XlsGenFromCustom("H" + row, trialinfs.Sum(a => a.PreviousYear));
                        row++;
                    }
                }

                XlsGenFromCustom("A" + row, "รวม" + fstopnonepx.Name);
                XlsGenFromCustom("F" + row, nonsumepx);
                XlsGenFromCustom("H" + row, nonpreviossumepx);
                XlsStyleBorderBottom("F" + row, "F" + row);
                XlsStyleBorderBottom("H" + row, "H" + row);
                row++;

                XlsGenFromCustom("A" + row, "กำไร(ขาดทุน) ก่อนต้นทุนทางการเงินและค่าใช้จ่ายภาษีเงินได้");
                XlsGenFromCustom("F" + row, sumincome - nonsumepx);
                XlsGenFromCustom("H" + row, previossumincome - nonpreviossumepx);
                XlsStyleBorderBottom("F" + row, "F" + row);
                XlsStyleBorderBottom("H" + row, "H" + row);
                row++;

                // Profit
                MasterFstop fstopprofile = mfstop.Where(a => a.FstopId == 8).FirstOrDefault();
                List<FstopParentFsgroup> pfstopprofit = pfstop.Where(a => a.FstopId == fstopprofile.FstopId).ToList();
                decimal sumprofit = 0, previossumprofit = 0;
                foreach (FstopParentFsgroup parent in pfstopprofit)
                {
                    Fsgroup fsgroup = mfsgroup.Where(a => a.FsgroupId == parent.FsgroupId).FirstOrDefault();
                    if (fsgroup != null)
                    {
                        List<AccountTrialbalance> trialinfs = period.TrialBalance.Where(a => a.FsgroupId == fsgroup.FsgroupId).ToList();
                        sumprofit += trialinfs.Sum(a => a.Audit.Value);
                        previossumprofit += trialinfs.Sum(a => a.PreviousYear.Value);

                        XlsGenFromCustom("B" + row, fsgroup.Name);
                        XlsGenFromCustom("F" + row, trialinfs.Sum(a => a.Audit));
                        XlsGenFromCustom("H" + row, trialinfs.Sum(a => a.PreviousYear));
                        row++;
                    }
                }

                XlsGenFromCustom("A" + row, "กำไร(ขาดทุน) สุทธิ");
                XlsGenFromCustom("F" + row, sumincome - nonsumepx - sumprofit);
                XlsGenFromCustom("H" + row, previossumincome - nonpreviossumepx - previossumprofit);
                XlsStyleBorderBottom("F" + row, "F" + row);
                XlsStyleBorderBottom("H" + row, "H" + row);
                row++;

                row = row + 2;
                XlsGenFromCustom("A" + row, "หมายเหตุประกอบงบการเงินเป็นส่วนหนึ่งของงบการเงินนี้");
                #endregion

                #region Summary
                base.ObjWorkSheet = base.ObjPackage.Workbook.Worksheets["A4"];

                XlsGenFromCustom("A1", period.Customer.Name);
                XlsGenFromCustom("A3", "ณ วันที่ " + period.EndDate.Value.ToString("dd MMMM yyyy", new CultureInfo("th-TH")));

                XlsGenFromCustom("A10", "ยอดคงเหลือ ณ ต้นปี" + period.MapYear);
                XlsGenFromCustom("A11", "การเปลี่ยนแปลงในส่วนของผู้ถือหุ้นสำหรับปี " + period.MapYear);
                XlsGenFromCustom("B12", "การเพิ่มทุนหุ้นสามัญ");
                XlsGenFromCustom("B13", "กำไร(ขาดทุน)สุทธิสำหรับปี");
                XlsGenFromCustom("F13", previossumincome - nonpreviossumepx - previossumprofit);
                XlsGenFromCustom("H13", previossumincome - nonpreviossumepx - previossumprofit);
                XlsGenFromCustom("A14", "ยอดคงเหลือ ณ สิ้นปี" + period.MapYear);

                XlsGenFromCustom("A15", "การเปลี่ยนแปลงในส่วนของผู้ถือหุ้นสำหรับปี " + period.Year);
                XlsGenFromCustom("B16", "การเพิ่มทุนหุ้นสามัญ");
                XlsGenFromCustom("B17", "กำไร(ขาดทุน)สุทธิสำหรับปี");
                XlsGenFromCustom("F17", sumincome - nonsumepx - sumprofit);
                XlsGenFromCustom("H17", sumincome - nonsumepx - sumprofit);
                XlsGenFromCustom("A18", "ยอดคงเหลือ ณ สิ้นปี " + period.Year);

                XlsGenFromCustom("A20", "หมายเหตุประกอบงบการเงินเป็นส่วนหนึ่งของงบการเงินนี้");
                #endregion

                #region Remark 1-2
                base.ObjWorkSheet = base.ObjPackage.Workbook.Worksheets["R1"];
                XlsGenFromCustom("A1", period.Customer.Name);
                XlsGenFromCustom("A3", "ณ วันที่ " + period.EndDate.Value.ToString("dd MMMM yyyy", new CultureInfo("th-TH")));

                //สถานะของบริษัท
                XlsGenFromCustom("B7", "บริษัท  ตัวอย่าง  จำกัด  \" บริษัท \"  จัดตั้งขึ้นเป็นบริษัทจำกัดตามกฎหมายไทย จดทะเบียน");
                XlsGenFromCustom("B8", "จัดตั้งเมื่อวันที่ 1 มกราคม พ.ศ. 2543 เลขทะเบียน 010556666666");
                //สถานที่ตั้งบริษัท
                XlsGenFromCustom("B11", "เลขที่ 1 ถนนนนทรี  แขวงช่องนนทรี เขตยานนาวา  กรุงเทพมหานคร");
                //ลักษณะธุรกิจและการดำเนินงาน
                XlsGenFromCustom("B14", "บริษัทมีวัตถุประสงค์ในการประกอบกิจการนำเข้าและจำหน่ายส่ง-ปลีกเครื่องใช้ไฟฟ้า  เครื่องมือสื่อสารและ");
                XlsGenFromCustom("B15", "บริการซ่อมบำรุงอุปกรณ์");

                Ruleprogram rule = new Ruleprogram();
                using (RuleprogramRepository RuleprogramRepository = new RuleprogramRepository())
                    rule = RuleprogramRepository.GetByKey(1);

                row = 18;
                foreach (RuleprogramDetail detail in rule.RuleDetail)
                {
                    int numrecord = 92;
                    int sumtext = detail.Name.Length - 1;
                    decimal sumavg = Math.Round(Convert.ToDecimal(sumtext) / numrecord) + 1;

                    ObjWorkSheet.Cells["B" + row].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Top;
                    ObjWorkSheet.Cells["B" + row].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;
                    XlsMergeCell("B" + row, "J" + (row + sumavg));
                    ObjWorkSheet.Cells["B" + row].Style.WrapText = true;
                    XlsGenFromCustom("B" + row, detail.Name);
                    row = row + Convert.ToInt32(sumavg) + 1;
                }

                #endregion

                #region Remark 3 Policy

                int no = 1;
                row = 6;
                double hegiht = 7.5;
                double width = 20;
                double widthval = 14;
                int rowmax = 38;
                int landrowmax = 25;
                bool isnew = true;
                int sheet = 1;

                foreach (AccountAuditFsgroup fsgrop in period.FSGroups)
                {
                    if (fsgrop.Policys?.Any() ?? false)
                    {
                        foreach (AccountAuditFsgroupPolicy policy in fsgrop.Policys.Where(a => a.IsPrint == "Yes"))
                        {
                            if (isnew)
                            {
                                ExcelWorksheet worksheet0 = ObjPackage.Workbook.Worksheets["R2"];
                                ExcelWorksheet worksheet = ObjPackage.Workbook.Worksheets.Copy("R2", "R3" + sheet);
                                base.ObjWorkSheet = base.ObjPackage.Workbook.Worksheets["R3" + sheet];
                                sheet++;

                                XlsGenFromCustom("A5", "3");
                                XlsGenFromCustom("B5", "สรุปนโยบายการบัญชีที่สำคัญ");
                                isnew = false;
                            }

                            int numrecord = 92;
                            int sumtext = policy.Description.Length - 1;
                            decimal sumavg = Math.Round(Convert.ToDecimal(sumtext) / numrecord);

                            if (row + sumavg > rowmax)
                            {
                                ExcelWorksheet worksheet0 = ObjPackage.Workbook.Worksheets["R2"];
                                ExcelWorksheet worksheet = ObjPackage.Workbook.Worksheets.Copy("R2", "R3" + sheet);
                                base.ObjWorkSheet = base.ObjPackage.Workbook.Worksheets["R3" + sheet];
                                sheet++;

                                XlsGenFromCustom("A5", "3");
                                XlsGenFromCustom("B5", "สรุปนโยบายการบัญชีที่สำคัญ (ต่อ)");
                                row = 6;
                            }

                            XlsStyleFontBold("B" + row, "C" + row);
                            XlsGenFromCustom("B" + row, "3." + no);
                            XlsGenFromCustom("C" + row, policy.Subject);
                            row++;
                            ObjWorkSheet.Cells["C" + row].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Top;
                            ObjWorkSheet.Cells["C" + row].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;
                            ObjWorkSheet.Cells["C" + row].Style.WrapText = true;
                            XlsMergeCell("C" + row, "K" + (row + sumavg));
                            XlsGenFromCustom("C" + row, policy.Description);
                            row = row + Convert.ToInt32(sumavg) + 1;
                            ObjWorkSheet.Row(row).Height = hegiht;
                            row++;
                            no++;
                        }
                    }
                }

                #endregion

                #region Remark 4 Note FS
                int fsstart = 4;

                List<MasterSubfsgroup> subfsgroup = new List<MasterSubfsgroup>();
                using (MasterSubfsgroupRepository MasterSubfsgroupRepository = new MasterSubfsgroupRepository())
                    subfsgroup = MasterSubfsgroupRepository.Get(period.OwnerId);

                foreach (AccountAuditFsgroup fsgrop in period.FSGroups)
                {
                    bool isheader = true;
                    if (fsgrop.NoteToFS?.Any() ?? false)
                    {
                        foreach (AccountAuditFsgroupNotefs notefs in fsgrop.NoteToFS.Where(a => a.IsPrint == "Yes"))
                        {
                            int numrecord = 92;
                            int sumtext = 0;
                            decimal sumavg = 0;
                            int sumcol = 0;

                            if (notefs.NoteFstype == "Paragraph")
                            {
                                sumtext = notefs.NoteDetail.Length - 1;
                                sumavg = Math.Round(Convert.ToDecimal(sumtext) / numrecord);
                            }
                            else if (notefs.NoteFstype == "Table")
                            {
                                sumavg = notefs.Tables.Count();
                                List<string> header = JsonConvert.DeserializeObject<List<string>>(notefs.Tables.FirstOrDefault().Header);
                                sumcol = header.Count();
                            }
                            else if (notefs.NoteFstype == "Get")
                                sumavg = notefs.SubGroups.Count();


                            if (row + sumavg > rowmax && sumcol <= 4)
                            {
                                ExcelWorksheet worksheet0 = ObjPackage.Workbook.Worksheets["R2"];
                                ExcelWorksheet worksheet = ObjPackage.Workbook.Worksheets.Copy("R2", "R3" + sheet);
                                base.ObjWorkSheet = base.ObjPackage.Workbook.Worksheets["R3" + sheet];
                                sheet++;

                                row = 5;
                            }
                            else if (row + sumavg > landrowmax && sumcol > 4)
                            {
                                ExcelWorksheet worksheet = ObjPackage.Workbook.Worksheets.Copy("R2L", "R3" + sheet);
                                base.ObjWorkSheet = base.ObjPackage.Workbook.Worksheets["R3" + sheet];
                                sheet++;

                                row = 5;
                            }

                            if (isheader)
                            {
                                XlsStyleFontBold("A" + row, "B" + row);
                                XlsGenFromCustom("A" + row, fsstart);
                                XlsGenFromCustom("B" + row, fsgrop.Name);
                                row++;
                                isheader = false;
                            }

                            if (notefs.NoteFstype == "Paragraph")
                            {
                                ObjWorkSheet.Cells["B" + row].Style.Font.Bold = false;
                                ObjWorkSheet.Cells["B" + row].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Top;
                                ObjWorkSheet.Cells["B" + row].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;
                                ObjWorkSheet.Cells["B" + row].Style.WrapText = true;
                                XlsMergeCell("B" + row, "K" + (row + sumavg));
                                XlsGenFromCustom("B" + row, notefs.NoteDetail);
                                row = row + Convert.ToInt32(sumavg) + 1;
                                ObjWorkSheet.Row(row).Height = hegiht;
                                row++;
                            }
                            else if (notefs.NoteFstype == "Table")
                            {
                                XlsGenFromCustom("B" + row, "ประกอบด้วย");
                                ObjWorkSheet.Column(3).Width = width;
                                ObjWorkSheet.Column(4).Width = 1;
                                ObjWorkSheet.Column(6).Width = 1;
                                ObjWorkSheet.Column(8).Width = 1;
                                ObjWorkSheet.Column(10).Width = 1;
                                ObjWorkSheet.Column(5).Width = widthval;
                                ObjWorkSheet.Column(7).Width = widthval;
                                ObjWorkSheet.Column(9).Width = widthval;
                                ObjWorkSheet.Column(11).Width = widthval;

                                int column = 5;
                                List<string> header = JsonConvert.DeserializeObject<List<string>>(notefs.Tables.FirstOrDefault().Header);
                                XlsGenFromCustom(row, column, "ประกอบด้วย");
                                XlsStyleAligntCenter("E" + row, "U" + row);
                                if (header != null)
                                    foreach (string s in header)
                                    {
                                        
                                        XlsStyleBorderTop(row, column, row, column + 1);
                                        XlsStyleBorderBottom(row, column, row, column + 1);
                                        XlsGenFromCustom(row, column, s);
                                        XlsStyleFontBold(row, column, row, column);
                                        column = column + 2;
                                    }

                                row++;

                                foreach (AccountAuditFsgroupNotefsTable record in notefs.Tables.OrderBy(a => a.AuditNoteFsid))
                                {
                                    List<string> text = JsonConvert.DeserializeObject<List<string>>(record.Column);
                                    XlsGenFromCustom("B" + row, record.Description);
                                    column = 5;
                                    foreach (string s in text)
                                    {
                                        XlsGenFromCustom(row, column, s);
                                        column = column + 2;
                                    }
                                    XlsStyleAligntRight("E" + row, "U" + row);
                                    row++;
                                }

                                ObjWorkSheet.Row(row).Height = hegiht;
                                row++;
                            }
                            else if (notefs.NoteFstype == "Get")
                            {
                                XlsGenFromCustom("B" + row, "ประกอบด้วย");

                                ObjWorkSheet.Column(3).Width = width;
                                ObjWorkSheet.Column(4).Width = 1;
                                ObjWorkSheet.Column(6).Width = 1;
                                ObjWorkSheet.Column(8).Width = 1;
                                ObjWorkSheet.Column(10).Width = 1;
                                ObjWorkSheet.Column(12).Width = 1;
                                ObjWorkSheet.Column(9).Width = widthval;
                                ObjWorkSheet.Column(11).Width = widthval;

                                XlsStyleFontBold(row, 9, row, 11);
                                XlsGenFromCustom("I" + row, period.Year);
                                XlsGenFromCustom("K" + row, period.MapYear);
                                XlsStyleBorderTop(row, 9, row, 11);
                                XlsStyleBorderBottom(row, 9, row, 11);
                                row++;

                                decimal sumyear = 0, year = 0;
                                decimal sumafter = 0, after = 0;
                                foreach (AccountAuditFsgroupNotefsGet get in notefs.SubGroups.OrderBy(a => a.AuditSubNoteFsid))
                                {
                                    MasterSubfsgroup subfs = new MasterSubfsgroup();
                                    subfs = subfsgroup.Where(a => a.SubFsgroupId == get.SubFsgroupId).FirstOrDefault();
                                    if (subfs != null)
                                        XlsGenFromCustom("C" + row, subfs.Name);

                                    sumyear += year = period.TrialBalance.Where(a => period.Accounts.Where(a => a.SubFsgroupId == get.SubFsgroupId).ToList().ConvertAll(a =>
                                    a.TrialBalanceId).ToArray().Contains(a.TrialBalanceId)).Sum(a => a.Audit.Value);
                                    sumafter += after = period.TrialBalance.Where(a => period.Accounts.Where(a => a.SubFsgroupId == get.SubFsgroupId).ToList().ConvertAll(a =>
                                    a.TrialBalanceId).ToArray().Contains(a.TrialBalanceId)).Sum(a => a.PreviousYear.Value);

                                    XlsStyleAligntRight("I" + row, "K" + row);

                                    XlsGenFromCustom("I" + row, year.ToString("n2"));
                                    XlsGenFromCustom("K" + row, after.ToString("n2"));
                                    row++;
                                }

                                XlsGenFromCustom("C" + row, "รวม");
                                XlsGenFromCustom("I" + row, sumyear.ToString("n2"));
                                XlsGenFromCustom("K" + row, sumafter.ToString("n2"));
                                XlsStyleFontBold("C" + row, "K" + row);
                                XlsStyleAligntRight("I" + row, "K" + row);
                                XlsStyleBorderBottom(row - 1, 9, row - 1, 11);
                                ObjWorkSheet.Cells[row, 9, row, 11].Style.Border.Bottom.Style = ExcelBorderStyle.Double;

                                row++;
                                ObjWorkSheet.Row(row).Height = hegiht;
                                row++;
                            }

                        }
                        fsstart++;
                    }
                }

                #endregion

                //7.5 //37ROW
                base.SaveTemplateExcelFileNotMsg();
            }
            catch (Exception ex)
            { throw new Exception(ex.Message); }
        }

    }

}
