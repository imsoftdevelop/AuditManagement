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
using Models.apis.request;
using WebBackEnd.Commons.RDService;
using Newtonsoft.Json;

namespace WebBackEnd.Controllers
{
    public class CustomersController : BaseController
    {
        private readonly ILogger<HomeController> _logger;

        public CustomersController(IWebHostEnvironment hostingEnvironment, IHttpContextAccessor httpContextAccessor) : base(hostingEnvironment, httpContextAccessor) { }

        public IActionResult PeriodAccountList()
        {
            return View();
        }

        public IActionResult DocumentList()
        {
            return View();
        }
        public IActionResult ConfirmAccountReport()
        {
            return View();
        }
        public IActionResult DocumentAdd()
        {
            return View();
        }
        public IActionResult ConfirmAccountList()
        {
            return View();
        }
        public IActionResult Profiles()
        {
            return View();
        }


        [HttpGet]
        public ActionResult GetCustomerWithKey(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                Customer response = new Customer();
                using (CustomerRepository CustomerRepository = new CustomerRepository())
                    response = CustomerRepository.GetWithKey(ref_key);

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
        public ActionResult GetDocumentPeriodWithKey(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                AccountPeriod response = new AccountPeriod();
                using (AccountPeriodRepository AccountPeriodRepository = new AccountPeriodRepository())
                    response = AccountPeriodRepository.GetDocument(ref_key);

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
        public ActionResult GetAuditIssePeriodWithKey(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                AccountPeriod response = new AccountPeriod();
                using (AccountPeriodRepository AccountPeriodRepository = new AccountPeriodRepository())
                    response = AccountPeriodRepository.GetAuditIssue(ref_key);

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
        public ActionResult PostProfiles([FromBody] CustomerInviteProfile input)
        {
            try
            {
                User user = GetProfileUser();

                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (CustomerInviteProfileRepository CustomerInviteProfileRepository = new CustomerInviteProfileRepository())
                    input = CustomerInviteProfileRepository.Save(input);

                user.ProfileData = new CustomerInviteProfile();
                user.ProfileData = input;

                var tmp = JsonConvert.SerializeObject(user);
                HttpContext.Session.SetString("UserLogin", tmp);

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

        [HttpGet]
        public ActionResult GetParameterDocumentTypeWithOwner(string ref_key)
        {
            try
            {
                User users = GetProfileUser();

                List<Documenttype> response = new List<Documenttype>();
                using (DocumenttypeRepository DocumenttypeRepository = new DocumenttypeRepository())
                    response = DocumenttypeRepository.SelectDataWithCondition(a => (a.OwnerId.ToUpper() == ref_key.ToUpper() || a.IsSystem == Common.IsSystem)
                    && a.IsDelete == Common.NoDelete
                    && a.IsActive == Common.IsActive)
                        .OrderBy(a => a.Name).ToList();

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
        public ActionResult PostDocumentList([FromBody] Documentlist input)
        {
            try
            {
                User user = GetProfileUser();
                input.UploadType = Common.UploadCustomer;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                Documentlist response = new Documentlist();
                using (DocumentlistRepository DocumentlistRepository = new DocumentlistRepository())
                    response = DocumentlistRepository.Save(input);

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

        [RequestFormLimits(MultipartBodyLengthLimit = 52428800)]
        [RequestSizeLimit(52428800)]
        [HttpPost]
        public IActionResult UploadFileDocument(List<IFormFile> files, string DocumentId, string OwnerId)
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
                string fullpathwithowner = Path.Combine(fullpath, OwnerId);

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
                input.NameFile = beforename;
                input.PathFile = filename;
                input.Extension = Path.GetExtension(beforename);
                input.Size = size / 1024;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (DocumentlistRepository DocumentlistRepository = new DocumentlistRepository())
                    input = DocumentlistRepository.SaveFileFromCustomer(input);

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

        [HttpGet]
        public ActionResult GetDocumentList(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<VDocumentlist> response = new List<VDocumentlist>();
                using (DocumentlistRepository DocumentlistRepository = new DocumentlistRepository())
                    response = DocumentlistRepository.GetCustomerDocument(user.CustomerIdActive);

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
        public ActionResult GetDocumentListWithKey(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                Documentlist response = new Documentlist();
                using (DocumentlistRepository DocumentlistRepository = new DocumentlistRepository())
                    response = DocumentlistRepository.SelectDataWithCondition(a => a.DocumentListId == ref_key).FirstOrDefault();

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
        public ActionResult DeleteDocumentList(string ref_key)
        {
            try
            {
                User user = GetProfileUser();
                Documentlist input = new Documentlist();
                input.DocumentListId = ref_key;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                Documentlist response = new Documentlist();
                using (DocumentlistRepository DocumentlistRepository = new DocumentlistRepository())
                    response = DocumentlistRepository.DeleteCustomer(input);

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
        public ActionResult ConfirmCustomerAccountPeriods(string ref_key, string ref_id)
        {
            try
            {
                User user = GetProfileUser();
                AccountPeriod input = new AccountPeriod();
                input.PeriodId = ref_id;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (AccountPeriodRepository AccountPeriodRepository = new AccountPeriodRepository())
                    AccountPeriodRepository.ConfirmAfterCustomer(input);

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
    }
}
