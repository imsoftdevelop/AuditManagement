using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WebBackEnd.Models;
using WebBackEnd.Utility;
using Repository;
using Models.Master;
using System.IO;
using WebBackEnd.Commons.Excel;
using Models.apis.request;
using Newtonsoft.Json;

namespace WebBackEnd.Controllers
{
    public class AccountingsController : BaseController
    {
        public AccountingsController(IWebHostEnvironment hostingEnvironment, IHttpContextAccessor httpContextAccessor) : base(hostingEnvironment, httpContextAccessor) { }

        public IActionResult PeriodAccountList()
        {
            return View();
        }

        public IActionResult TrialBalanceList()
        {
            return View();
        }

        public IActionResult AdjustmentList()
        {
            return View();
        }
        public IActionResult FSTopList()
        {
            return View();
        }

        public IActionResult FSLeadList()
        {
            return View();
        }

        public IActionResult SubFSLeadList()
        {
            return View();
        }

        public IActionResult Assignment()
        {
            return View();
        }

        public IActionResult ProcessTagging()
        {
            return View();
        }

        public IActionResult ConfirmAccountList()
        {
            return View();
        }

        #region Account Period & Trial Balance

        [HttpGet]
        public ActionResult GetAccountPeriods(string ref_key)
        {
            try
            {
                User user = GetProfileUser();
                List<AccountPeriod> response = new List<AccountPeriod>();
                if (GetCustomerAssign(user.PermissionCodeActive))
                {
                    using (AccountPeriodRepository AccountPeriodRepository = new AccountPeriodRepository())
                        response = AccountPeriodRepository.GetCustomerAssign(user.OwnerData.OwnerId, user.BranchIdActive, user.EmpId);

                    if (!string.IsNullOrEmpty(user.CustomerIdActive))
                        response = response.Where(a => a.CustomerId == user.CustomerIdActive).ToList();
                }
                else
                    using (AccountPeriodRepository AccountPeriodRepository = new AccountPeriodRepository())
                        response = AccountPeriodRepository.Get(user.OwnerData.OwnerId, user.BranchIdActive);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = response
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpGet]
        public ActionResult GetAccountPeriodsWithKey(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                AccountPeriod response = new AccountPeriod();
                using (AccountPeriodRepository AccountPeriodRepository = new AccountPeriodRepository())
                    response = AccountPeriodRepository.GetWithKey(ref_key);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = response
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult PostAccountPeriods([FromBody] AccountPeriod input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId.ToUpper();
                input.BranchId = user.BranchIdActive.ToUpper();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                AccountPeriod response = new AccountPeriod();
                using (AccountPeriodRepository AccountPeriodRepository = new AccountPeriodRepository())
                    response = AccountPeriodRepository.Save(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = response
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpDelete]
        public ActionResult DeleteAccountPeriods(string ref_key)
        {
            try
            {
                User user = GetProfileUser();
                AccountPeriod input = new AccountPeriod();
                input.PeriodId = ref_key;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (AccountPeriodRepository AccountPeriodRepository = new AccountPeriodRepository())
                    AccountPeriodRepository.Delete(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = "ลบข้อมูลเรียบร้อย"
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [RequestFormLimits(MultipartBodyLengthLimit = 52428800)]
        [RequestSizeLimit(52428800)]
        [HttpPost]
        public IActionResult UploadTrialBalance(List<IFormFile> files, string ref_period, string ref_cus)
        {
            try
            {
                User user = GetProfileUser();
                long size = files.Sum(f => f.Length);

                // full path to file in temp location

                string webRootPath = _hostingEnvironment.WebRootPath;
                string pathuploads = _config["ConfigSystem:UploadsPath"];
                string pathsignature = _config["ConfigSystem:TempPath"];
                pathuploads = pathuploads.Replace("/", "");
                pathsignature = pathsignature.Replace("/", "");
                string fullpath = Path.Combine(webRootPath, pathuploads);
                string fullpathwithowner = Path.Combine(fullpath, user.EmployeeData.OwnerId);

                if (!Directory.Exists(fullpathwithowner))
                {
                    Directory.CreateDirectory(fullpathwithowner);
                }

                string fullpathsignature = Path.Combine(fullpathwithowner, pathsignature);

                if (!Directory.Exists(fullpathsignature))
                {
                    Directory.CreateDirectory(fullpathsignature);
                }

                string filename = string.Empty;

                foreach (var formFile in files)
                {
                    filename = Guid.NewGuid().ToString() + Path.GetExtension(formFile.FileName);
                    fullpath = Path.Combine(fullpathsignature, filename);
                    if (formFile.Length > 0)
                    {
                        using (var stream = new FileStream(fullpath, FileMode.Create))
                        {
                            formFile.CopyTo(stream);
                        }
                    }
                }

                List<importtrialbalance> importfile = new List<importtrialbalance>();

                Commons.Excel.ClsImportExcelEPlus import = new Commons.Excel.ClsImportExcelEPlus();
                import.FileExcel = fullpath;
                import.ImportToList<importtrialbalance>(ref importfile);

                if (importfile == null || importfile.Count <= 0)
                    throw new Exception("ไม่พบข้อมูลที่ อัพโหลด");

                List<Fsgroup> FSGroup = new List<Fsgroup>();
                using (FsgroupRepository FsgroupRepository = new FsgroupRepository())
                    FSGroup = FsgroupRepository.GetIsActive(user.OwnerData.OwnerId);

                List<AccountTrialbalance> TrialBalance = new List<AccountTrialbalance>();
                titleimporttrialbalance result = new titleimporttrialbalance()
                {
                    total = importfile.Count,
                    success = 0,
                    error = 0
                };

                decimal d;
                foreach (importtrialbalance datas in importfile)
                {
                    AccountTrialbalance value = new AccountTrialbalance();
                    bool ispass = true;
                    if (!string.IsNullOrEmpty(datas.accountno) && !string.IsNullOrEmpty(datas.accountname))
                    {
                        value.AccountCode = datas.accountno;
                        value.AccountName = datas.accountname;
                        value.IsUpload = Common.IsUploadTrial;
                        value.PreviousYear = 0;

                        if (string.IsNullOrEmpty(datas.amount))
                            value.Amount = 0;
                        else if (datas.amount.Trim() == "-")
                            value.Amount = 0;
                        else if (!string.IsNullOrEmpty(datas.amount) && decimal.TryParse(datas.amount, out d))
                            value.Amount = Convert.ToDecimal(datas.amount);
                        else
                            ispass = false;

                        if (!string.IsNullOrEmpty(datas.fsgroupcode))
                        {
                            Fsgroup fsselect = new Fsgroup();
                            fsselect = FSGroup.Where(a => a.Code == datas.fsgroupcode).FirstOrDefault();
                            if (fsselect != null)
                                value.FsgroupId = fsselect.FsgroupId;
                            else
                            {
                                value.iserror = "Y";
                                value.error = "ไม่พบข้อมูล W/P No. : " + datas.fsgroupcode;
                            }
                        }

                    }

                    if (ispass)
                    {
                        TrialBalance.Add(value);
                        result.success = result.success + 1;
                    }
                    else
                        result.error = result.error + 1;
                }

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = TrialBalance,
                    responseresult = result
                });
            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult PostAccountTrialBalance([FromBody] List<AccountTrialbalance> input, string ref_cus, string ref_period)
        {
            try
            {
                User user = GetProfileUser();

                AccountTrialbalance response = new AccountTrialbalance();
                using (AccountTrialbalanceRepository AccountTrialbalanceRepository = new AccountTrialbalanceRepository())
                    AccountTrialbalanceRepository.Save(input, ref_cus, ref_period, user.UserId);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = response
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpDelete]
        public ActionResult DeleteUploadAccountTrialBalance(string ref_key)
        {
            try
            {
                User user = GetProfileUser();
                AccountPeriod input = new AccountPeriod();
                input.PeriodId = ref_key;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (AccountPeriodRepository AccountPeriodRepository = new AccountPeriodRepository())
                    AccountPeriodRepository.ResetUpload(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = "ลบข้อมูลเรียบร้อย"
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult PostAddAccountTrialBalance([FromBody] AccountTrialbalance input)
        {
            try
            {
                User user = GetProfileUser();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;


                AccountTrialbalance response = new AccountTrialbalance();
                using (AccountTrialbalanceRepository AccountTrialbalanceRepository = new AccountTrialbalanceRepository())
                    AccountTrialbalanceRepository.Save(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = response
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult PostAccountTrialBalanceNoted([FromBody] AccountTrialbalance input)
        {
            try
            {
                User user = GetProfileUser();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;


                AccountTrialbalance response = new AccountTrialbalance();
                using (AccountTrialbalanceRepository AccountTrialbalanceRepository = new AccountTrialbalanceRepository())
                    AccountTrialbalanceRepository.SaveNoted(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = response
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpGet]
        public ActionResult DownloadTrialBalanceTemplate()
        {
            string webRootPath = _hostingEnvironment.WebRootPath;
            string pathuploads = _config["ConfigSystem:UploadsPath"];
            string pathtemplate = _config["ConfigSystem:TemplatePath"];
            string fileimport = _config["ConfigSystem:TrialTemplate"];
            pathuploads = pathuploads.Replace("/", "");
            pathtemplate = pathtemplate.Replace("/", "");
            string webpath = Path.Combine(webRootPath, pathuploads, pathtemplate);
            string fullPath = Path.Combine(webpath, fileimport);

            var memory = new MemoryStream();
            using (var stream = new FileStream(fullPath, FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            memory.Position = 0;
            return File(memory, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileimport);
        }

        [HttpGet]
        public ActionResult DownloadPreviousTrialBalanceTemplate()
        {
            string webRootPath = _hostingEnvironment.WebRootPath;
            string pathuploads = _config["ConfigSystem:UploadsPath"];
            string pathtemplate = _config["ConfigSystem:TemplatePath"];
            string fileimport = _config["ConfigSystem:TrialPreviousTemplate"];
            pathuploads = pathuploads.Replace("/", "");
            pathtemplate = pathtemplate.Replace("/", "");
            string webpath = Path.Combine(webRootPath, pathuploads, pathtemplate);
            string fullPath = Path.Combine(webpath, fileimport);

            var memory = new MemoryStream();
            using (var stream = new FileStream(fullPath, FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            memory.Position = 0;
            return File(memory, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileimport);
        }

        [RequestFormLimits(MultipartBodyLengthLimit = 52428800)]
        [RequestSizeLimit(52428800)]
        [HttpPost]
        public IActionResult UploadPreviosTrialBalance(List<IFormFile> files, string ref_period, string ref_cus)
        {
            try
            {
                User user = GetProfileUser();
                long size = files.Sum(f => f.Length);

                // full path to file in temp location

                string webRootPath = _hostingEnvironment.WebRootPath;
                string pathuploads = _config["ConfigSystem:UploadsPath"];
                string pathsignature = _config["ConfigSystem:TempPath"];
                pathuploads = pathuploads.Replace("/", "");
                pathsignature = pathsignature.Replace("/", "");
                string fullpath = Path.Combine(webRootPath, pathuploads);
                string fullpathwithowner = Path.Combine(fullpath, user.EmployeeData.OwnerId);

                if (!Directory.Exists(fullpathwithowner))
                {
                    Directory.CreateDirectory(fullpathwithowner);
                }

                string fullpathsignature = Path.Combine(fullpathwithowner, pathsignature);

                if (!Directory.Exists(fullpathsignature))
                {
                    Directory.CreateDirectory(fullpathsignature);
                }

                string filename = string.Empty;

                foreach (var formFile in files)
                {
                    filename = Guid.NewGuid().ToString() + Path.GetExtension(formFile.FileName);
                    fullpath = Path.Combine(fullpathsignature, filename);
                    if (formFile.Length > 0)
                    {
                        using (var stream = new FileStream(fullpath, FileMode.Create))
                        {
                            formFile.CopyTo(stream);
                        }
                    }
                }

                List<importprevioustrialbalance> importfile = new List<importprevioustrialbalance>();

                Commons.Excel.ClsImportExcelEPlus import = new Commons.Excel.ClsImportExcelEPlus();
                import.FileExcel = fullpath;
                import.ImportToList<importprevioustrialbalance>(ref importfile);

                if (importfile == null || importfile.Count <= 0)
                    throw new Exception("ไม่พบข้อมูลที่ อัพโหลด");

                List<AccountTrialbalance> TrialBalance = new List<AccountTrialbalance>();
                List<AccountTrialbalance> TrialBalanceUpdate = new List<AccountTrialbalance>();
                using (AccountTrialbalanceRepository AccountTrialbalanceRepository = new AccountTrialbalanceRepository())
                    TrialBalance = AccountTrialbalanceRepository.SelectDataWithCondition(a => a.PeriodId.ToUpper() == ref_period.ToUpper()
                    && a.CustomerId.ToUpper() == ref_cus.ToUpper() && a.IsDelete == Common.NoDelete);

                titleimporttrialbalance result = new titleimporttrialbalance()
                {
                    total = importfile.Count,
                    success = 0,
                    error = 0
                };

                decimal d;
                foreach (importprevioustrialbalance datas in importfile)
                {
                    bool ispass = true;

                    if (!string.IsNullOrEmpty(datas.accountno))
                    {
                        AccountTrialbalance value = new AccountTrialbalance();
                        value = TrialBalance.Where(a => a.AccountCode == datas.accountno).FirstOrDefault();

                        if (value != null)
                        {
                            if (string.IsNullOrEmpty(datas.amount))
                                value.PreviousYear = 0;
                            else if (datas.amount.Trim() == "-")
                                value.Amount = 0;
                            else if (!string.IsNullOrEmpty(datas.amount) && decimal.TryParse(datas.amount, out d))
                                value.PreviousYear = Convert.ToDecimal(datas.amount);
                            else
                                ispass = false;

                            if (ispass)
                                TrialBalanceUpdate.Add(value);
                        }
                    }
                    else
                        ispass = false;


                    if (ispass)
                    {
                        result.success = result.success + 1;
                    }
                    else
                        result.error = result.error + 1;
                }

                TrialBalance = new List<AccountTrialbalance>();
                using (AccountTrialbalanceRepository AccountTrialbalanceRepository = new AccountTrialbalanceRepository())
                    TrialBalance = AccountTrialbalanceRepository.Save(TrialBalanceUpdate, ref_cus.ToUpper(), ref_period.ToUpper(), user.UserId);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = TrialBalance,
                    responseresult = result
                });
            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult PostConfirmBeForeAudit([FromBody] AccountPeriod input)
        {
            try
            {
                User user = GetProfileUser();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;


                AccountPeriod response = new AccountPeriod();
                using (AccountPeriodRepository AccountPeriodRepository = new AccountPeriodRepository())
                    AccountPeriodRepository.ConfirmBeforeAudit(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = response
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpGet]
        public ActionResult ConfirmAuditAccountPeriods(string ref_key, string ref_id)
        {
            try
            {
                User user = GetProfileUser();
                AccountPeriod input = new AccountPeriod();
                input.PeriodId = ref_id;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (AccountPeriodRepository AccountPeriodRepository = new AccountPeriodRepository())
                    AccountPeriodRepository.ConfirmAfterAudit(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = "ลบข้อมูลเรียบร้อย"
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        #endregion

        #region Adjustment

        [HttpGet]
        public ActionResult GetAccountAdjustment(string ref_key)
        {
            try
            {
                User user = GetProfileUser();
                List<AccountAdjustment> response = new List<AccountAdjustment>();
                using (AccountAdjustmentRepository AccountAdjustmentRepository = new AccountAdjustmentRepository())
                    response = AccountAdjustmentRepository.Get(ref_key);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = response
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpGet]
        public ActionResult GetAccountAdjustmentWithKey(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                AccountAdjustment response = new AccountAdjustment();
                using (AccountAdjustmentRepository AccountAdjustmentRepository = new AccountAdjustmentRepository())
                    response = AccountAdjustmentRepository.GetWithKey(ref_key);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = response
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult PostAccountAdjustment([FromBody] AccountAdjustment input)
        {
            try
            {
                User user = GetProfileUser();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                AccountAdjustment response = new AccountAdjustment();
                using (AccountAdjustmentRepository AccountAdjustmentRepository = new AccountAdjustmentRepository())
                    response = AccountAdjustmentRepository.Save(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = response
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpDelete]
        public ActionResult DeleteAccountAdjustment(string ref_key)
        {
            try
            {
                User user = GetProfileUser();
                AccountAdjustment input = new AccountAdjustment();
                input.AdjustmentId = ref_key;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (AccountAdjustmentRepository AccountAdjustmentRepository = new AccountAdjustmentRepository())
                    AccountAdjustmentRepository.Delete(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = "ลบข้อมูลเรียบร้อย"
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        #endregion

        #region FS Lead

        [HttpPost]
        public ActionResult PostAccountFSLead([FromBody] AccountAuditFsgroup input)
        {
            try
            {
                User user = GetProfileUser();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                AccountAuditFsgroup response = new AccountAuditFsgroup();
                using (AccountAuditFsgroupRepository AccountAuditFsgroupRepository = new AccountAuditFsgroupRepository())
                    response = AccountAuditFsgroupRepository.Save(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = response
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult PostAccountAuditFSGroupChangeStatus([FromBody] postEvent input)
        {
            try
            {
                User user = GetProfileUser();
                string Role = string.Empty;

                AccountAuditFsgroup account = new AccountAuditFsgroup();
                account.AuditFsgroupId = input.AuditFsgroupId;
                account.UpdatedOn = DateTime.Now;
                account.UpdateBy = user.UserId;

                if (GetRoleAccountAssistLevel1(user.PermissionCodeActive))
                {
                    Role = "Account1";
                    account.PrepareDate = account.UpdatedOn;
                    account.PreparedBy = user.UserId;
                    account.PrepareStatus = input.IsStatus;
                }
                else if (GetRoleAccountAssistLevel2(user.PermissionCodeActive))
                {
                    Role = "Account2";
                    account.ReveiwedDate = account.UpdatedOn;
                    account.ReveiwedBy = user.UserId;
                    account.ReveiwedStatus = input.IsStatus;
                }
                else if (GetRoleAccountAuditor(user.PermissionCodeActive))
                {
                    Role = "Audit";
                    account.AuditorDate = account.UpdatedOn;
                    account.AuditorBy = user.UserId;
                    account.AuditorStatus = input.IsStatus;
                }
                else if (GetRoleAccountManager(user.PermissionCodeActive))
                {
                    Role = "Manager";
                    account.PrepareDate = account.UpdatedOn;
                    account.PreparedBy = user.UserId;
                    account.PrepareStatus = input.IsStatus;
                }

                AccountAuditFsgroupEvent Event = new AccountAuditFsgroupEvent()
                {
                    AuditFsgroupId = input.AuditFsgroupId,
                    IsEvent = input.IsStatus,
                    CreatedOn = account.UpdatedOn,
                    CreatedBy = account.UpdateBy

                };

                using (AccountAuditFsgroupRepository AccountAuditFsgroupRepository = new AccountAuditFsgroupRepository())
                    AccountAuditFsgroupRepository.Save(account, Role, Event);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = "บันทึกเรียบร้อย"
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpGet]
        public ActionResult GetSubFSLeadWithKey(string ref_key, int ref_id)
        {
            try
            {
                User user = GetProfileUser();

                AccountAuditAccount response = new AccountAuditAccount();
                using (AccountAuditAccountRepository AccountAuditAccountRepository = new AccountAuditAccountRepository())
                    response = AccountAuditAccountRepository.GetWithKey(ref_id);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = response
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        #endregion

        #region Audit Document 

        [RequestFormLimits(MultipartBodyLengthLimit = 52428800)]
        [RequestSizeLimit(52428800)]
        [HttpPost]
        public IActionResult UploadFileDocumentAudit(List<IFormFile> files, string DocumentId, int RefId, string RefCode)
        {
            try
            {
                User user = GetProfileUser();
                long size = files.Sum(f => f.Length);

                // full path to file in temp location

                string webRootPath = _hostingEnvironment.WebRootPath;
                string pathuploads = _config["ConfigSystem:UploadsPath"];
                string pathsignature = _config["ConfigSystem:FilePath"];
                pathuploads = pathuploads.Replace("/", "");
                pathsignature = pathsignature.Replace("/", "");
                string fullpath = Path.Combine(webRootPath, pathuploads);
                string fullpathwithowner = Path.Combine(fullpath, user.EmployeeData.OwnerId);

                if (!Directory.Exists(fullpathwithowner))
                {
                    Directory.CreateDirectory(fullpathwithowner);
                }

                string fullpathsignature = Path.Combine(fullpathwithowner, pathsignature);

                if (!Directory.Exists(fullpathsignature))
                {
                    Directory.CreateDirectory(fullpathsignature);
                }

                string filename = string.Empty;
                string beforename = string.Empty;
                foreach (var formFile in files)
                {
                    beforename = formFile.FileName;
                    filename = Guid.NewGuid().ToString() + Path.GetExtension(formFile.FileName);
                    fullpath = Path.Combine(fullpathsignature, filename);
                    if (formFile.Length > 0)
                    {
                        using (var stream = new FileStream(fullpath, FileMode.Create))
                        {
                            formFile.CopyTo(stream);
                        }
                    }
                }

                Documentlist input = new Documentlist();
                input.DocumentListId = DocumentId;
                input.BranchId = user.BranchIdActive;
                input.OwnerId = user.OwnerData.OwnerId;
                input.NameFile = beforename;
                input.PathFile = filename;
                input.Extension = Path.GetExtension(beforename);
                input.Size = size / 1024;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (AccountAuditAccountDoucmentRepository AccountAuditAccountDoucmentRepository = new AccountAuditAccountDoucmentRepository())
                    AccountAuditAccountDoucmentRepository.Save(input, RefId, RefCode);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = "บันทึกข้อมูลเรียบร้อย"
                });
            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult PostAccountAuditDocument([FromBody] AccountAuditAccountDoucment input)
        {
            try
            {
                User user = GetProfileUser();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                AccountAuditAccountDoucment response = new AccountAuditAccountDoucment();
                using (AccountAuditAccountDoucmentRepository AccountAuditAccountDoucmentRepository = new AccountAuditAccountDoucmentRepository())
                    AccountAuditAccountDoucmentRepository.Save(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = "บันทึกเรียบร้อย"
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpDelete]
        public ActionResult DeleteAuditDocument(string ref_key, int ref_id)
        {
            try
            {
                User user = GetProfileUser();
                AccountAuditAccountDoucment input = new AccountAuditAccountDoucment();
                input.DocumentRefId = ref_id;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (AccountAuditAccountDoucmentRepository AccountAuditAccountDoucmentRepository = new AccountAuditAccountDoucmentRepository())
                    AccountAuditAccountDoucmentRepository.Delete(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = "ลบข้อมูลเรียบร้อย"
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        #endregion

        #region Audit Issue 

        [HttpPost]
        public ActionResult PostAccountAuditIssue([FromBody] AccountAuditAccountAuditissue input)
        {
            try
            {
                User user = GetProfileUser();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                AccountAuditAccountAuditissue response = new AccountAuditAccountAuditissue();
                using (AccountAuditAccountAuditissueRepository AccountAuditAccountAuditissueRepository = new AccountAuditAccountAuditissueRepository())
                    response = AccountAuditAccountAuditissueRepository.Save(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = response
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpDelete]
        public ActionResult DeleteAuditIssue(string ref_key, int ref_id)
        {
            try
            {
                User user = GetProfileUser();
                AccountAuditAccountAuditissue input = new AccountAuditAccountAuditissue();
                input.AuditIssueId = ref_id;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (AccountAuditAccountAuditissueRepository AccountAuditAccountAuditissueRepository = new AccountAuditAccountAuditissueRepository())
                    AccountAuditAccountAuditissueRepository.Delete(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = "ลบข้อมูลเรียบร้อย"
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult PostAccountAuditIssueChangeStatus([FromBody] AccountAuditAccountAuditissue input)
        {
            try
            {
                User user = GetProfileUser();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                AccountAuditAccountAuditissue response = new AccountAuditAccountAuditissue();
                using (AccountAuditAccountAuditissueRepository AccountAuditAccountAuditissueRepository = new AccountAuditAccountAuditissueRepository())
                    response = AccountAuditAccountAuditissueRepository.ChangeStatus(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = response
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        #endregion

        #region Audit Conclusion 

        [HttpPost]
        public ActionResult PostAccountAuditConclusion([FromBody] AccountAuditAccountConclusion input)
        {
            try
            {
                User user = GetProfileUser();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                AccountAuditAccountConclusion response = new AccountAuditAccountConclusion();
                using (AccountAuditAccountConclusionRepository AccountAuditAccountConclusionRepository = new AccountAuditAccountConclusionRepository())
                    response = AccountAuditAccountConclusionRepository.Save(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = response
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpDelete]
        public ActionResult DeleteAuditConclusion(string ref_key, int ref_id)
        {
            try
            {
                User user = GetProfileUser();
                AccountAuditAccountConclusion input = new AccountAuditAccountConclusion();
                input.ConclusionId = ref_id;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (AccountAuditAccountConclusionRepository AccountAuditAccountConclusionRepository = new AccountAuditAccountConclusionRepository())
                    AccountAuditAccountConclusionRepository.Delete(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = "ลบข้อมูลเรียบร้อย"
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        #endregion

        #region Audit Account

        [HttpPost]
        public ActionResult PostAccountAuditAccount([FromBody] AccountAuditAccount input)
        {
            try
            {
                User user = GetProfileUser();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                AccountAuditAccount response = new AccountAuditAccount();
                using (AccountAuditAccountRepository AccountAuditAccountRepository = new AccountAuditAccountRepository())
                    AccountAuditAccountRepository.Save(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = "บันทึกเรียบร้อย"
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult PostAccountAuditAccountChangeStatus([FromBody] postEvent input)
        {
            try
            {
                User user = GetProfileUser();
                string Role = string.Empty;

                AccountAuditAccount account = new AccountAuditAccount();
                account.AuditAccountId = input.AuditAccountId;
                account.UpdatedOn = DateTime.Now;
                account.UpdateBy = user.UserId;


                TimeSpan span;
                decimal time = 0;
                int hour = 0;
                int minute = 0;

                if (input.IsStatus == Common.IsStatusWorkflowComfirm)
                {
                    if (input.StartDate > input.EndDate)
                        throw new Exception("กรุณาตรวจสอบวันที่เริ่มต้น และ วันที่สิ้นสุด");

                    span = input.EndDate.Value.Subtract(input.StartDate.Value);
                    time = Convert.ToInt32(span.TotalMinutes);
                    if (time != 0)
                    {
                        decimal result = time / 60;
                        hour = Convert.ToInt32(result.ToString().Split('.')[0]);
                        minute = Convert.ToInt32(time - (hour * 60));
                    }
                }

                if (GetRoleAccountAssistLevel1(user.PermissionCodeActive))
                {
                    Role = "Account1";
                    account.PrepareDate = account.UpdatedOn;
                    account.PreparedBy = user.UserId;
                    account.PrepareStatus = input.IsStatus;
                    account.PrepareRemark = input.Remark;
                    if (input.IsStatus == Common.IsStatusWorkflowComfirm)
                    {
                        account.PrepareDateStart = input.StartDate;
                        account.PrepareDateEnd = input.EndDate;
                        account.PrepareTimeUseHour = hour;
                        account.PrepareTimeUseMinute = minute;
                    }
                }
                else if (GetRoleAccountAssistLevel2(user.PermissionCodeActive))
                {
                    Role = "Account2";
                    account.ReveiwedDate = account.UpdatedOn;
                    account.ReveiwedBy = user.UserId;
                    account.ReveiwedStatus = input.IsStatus;
                    account.ReviewedRemark = input.Remark;
                    if (input.IsStatus == Common.IsStatusWorkflowComfirm)
                    {
                        account.ReviewedDateStart = input.StartDate;
                        account.ReviewedDateEnd = input.EndDate;
                        account.ReviewedTimeUseHour = hour;
                        account.ReviewedTimeUseMinute = minute;
                    }
                }
                else if (GetRoleAccountAuditor(user.PermissionCodeActive))
                {
                    Role = "Audit";
                    account.AuditorDate = account.UpdatedOn;
                    account.AuditorBy = user.UserId;
                    account.AuditorStatus = input.IsStatus;
                    account.AuditorRemark = input.Remark;
                    if (input.IsStatus == Common.IsStatusWorkflowComfirm)
                    {
                        account.AuditorDateStart = input.StartDate;
                        account.AuditorDateEnd = input.EndDate;
                        account.AuditorTimeUseHour = hour;
                        account.AuditorTimeUseMinute = minute;
                    }
                }
                else if (GetRoleAccountManager(user.PermissionCodeActive))
                {
                    Role = "Manager";
                    account.PrepareDate = account.UpdatedOn;
                    account.PreparedBy = user.UserId;
                    account.PrepareStatus = input.IsStatus;
                }

                AccountAuditAccountEvent Event = new AccountAuditAccountEvent()
                {
                    AuditAccountId = input.AuditAccountId,
                    StartDate = input.StartDate,
                    EndDate = input.EndDate,
                    Remark = input.Remark,
                    TimeUse = hour + "." + minute,
                    IsEvent = input.IsStatus,
                    CreatedOn = account.UpdatedOn,
                    CreatedBy = account.UpdateBy

                };

                AccountAuditAccount response = new AccountAuditAccount();
                using (AccountAuditAccountRepository AccountAuditAccountRepository = new AccountAuditAccountRepository())
                    AccountAuditAccountRepository.Save(account, Role, Event);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = "บันทึกเรียบร้อย"
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        #endregion

        #region Audit Account

        [HttpPost]
        public ActionResult PostAccountAuditAccountReference(int ref_key, [FromBody] List<AccountAuditAccountReference> input)
        {
            try
            {
                User user = GetProfileUser();
                List<AccountAuditAccountReference> response = new List<AccountAuditAccountReference>();
                using (AccountAuditAccountReferenceRepository AccountAuditAccountReferenceRepository = new AccountAuditAccountReferenceRepository())
                    AccountAuditAccountReferenceRepository.Save(ref_key, user.UserId, input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = "บันทึกเรียบร้อย"
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        #endregion

        #region Audit Note FS 

        [HttpPost]
        public ActionResult PostAuditFSgroupNoteFS([FromBody] AccountAuditFsgroupNotefs input)
        {
            try
            {
                User user = GetProfileUser();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                if (input.Tables?.Any() ?? false)
                {
                    foreach (AccountAuditFsgroupNotefsTable obj in input.Tables)
                    {
                        obj.Header = JsonConvert.SerializeObject(obj.HeaderInput);
                        obj.Column = JsonConvert.SerializeObject(obj.ColumnInput);
                    }
                }

                AccountAuditFsgroupNotefs response = new AccountAuditFsgroupNotefs();
                using (AccountAuditFsgroupNotefsRepository AccountAuditFsgroupNotefsRepository = new AccountAuditFsgroupNotefsRepository())
                    response = AccountAuditFsgroupNotefsRepository.Save(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = response
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpDelete]
        public ActionResult DeleteAuditNoteFS(string ref_key, int ref_id)
        {
            try
            {
                User user = GetProfileUser();
                AccountAuditFsgroupNotefs input = new AccountAuditFsgroupNotefs();
                input.AuditNoteFsid = ref_id;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (AccountAuditFsgroupNotefsRepository AccountAuditFsgroupNotefsRepository = new AccountAuditFsgroupNotefsRepository())
                    AccountAuditFsgroupNotefsRepository.Delete(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = "ลบข้อมูลเรียบร้อย"
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        #endregion

        #region Audit Assign

        [HttpGet]
        public ActionResult GetAssignAuditFSGroup(string ref_key, int ref_id)
        {
            try
            {
                User user = GetProfileUser();

                List<AccountAuditFsgroupAssign> response = new List<AccountAuditFsgroupAssign>();
                using (AccountAuditFsgroupRepository AccountAuditFsgroupRepository = new AccountAuditFsgroupRepository())
                    response = AccountAuditFsgroupRepository.GetAssign(ref_id);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = response
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }


        [HttpPost]
        public ActionResult PostAssignAuditFSGroup([FromBody] AccountAuditFsgroupAssign input)
        {
            try
            {
                User user = GetProfileUser();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (AccountAuditFsgroupAssignRepository AccountAuditFsgroupAssignRepository = new AccountAuditFsgroupAssignRepository())
                    input = AccountAuditFsgroupAssignRepository.Save(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = input
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpDelete]
        public ActionResult DeleteAssignAuditFSGroup(int ref_key)
        {
            try
            {
                User user = GetProfileUser();
                AccountAuditFsgroupAssign input = new AccountAuditFsgroupAssign();
                input.AssignFsid = ref_key;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (AccountAuditFsgroupAssignRepository AccountAuditFsgroupAssignRepository = new AccountAuditFsgroupAssignRepository())
                    AccountAuditFsgroupAssignRepository.Delete(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = "ลบข้อมูลเรียบร้อย"
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpDelete]
        public ActionResult DisabledAssignAuditFSGroup(int ref_key)
        {
            try
            {
                User user = GetProfileUser();
                AccountAuditFsgroupAssign input = new AccountAuditFsgroupAssign();
                input.AssignFsid = ref_key;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (AccountAuditFsgroupAssignRepository AccountAuditFsgroupAssignRepository = new AccountAuditFsgroupAssignRepository())
                    input = AccountAuditFsgroupAssignRepository.Disabled(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = input
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpDelete]
        public ActionResult OnDisabledAssignAuditFSGroup(int ref_key)
        {
            try
            {
                User user = GetProfileUser();
                AccountAuditFsgroupAssign input = new AccountAuditFsgroupAssign();
                input.AssignFsid = ref_key;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (AccountAuditFsgroupAssignRepository AccountAuditFsgroupAssignRepository = new AccountAuditFsgroupAssignRepository())
                    input = AccountAuditFsgroupAssignRepository.OnDisabled(input);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = input
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        #endregion

    }

}
