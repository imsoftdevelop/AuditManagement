using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WebBackEnd.Models;
using Repository;
using Models.Models;
using Microsoft.AspNetCore.Hosting;
using WebBackEnd.Utility;
using Newtonsoft.Json;
using Models.apis.request;
using System.IO;

namespace WebBackEnd.Controllers
{
    public class AuthenController : BaseController
    {
        public AuthenController(IWebHostEnvironment hostingEnvironment, IHttpContextAccessor httpContextAccessor) : base(hostingEnvironment, httpContextAccessor) { }

        [HttpPost]
        public ActionResult Login([FromBody] PostLogin input)
        {
            try
            {
                if (string.IsNullOrEmpty(input.Email))
                    throw new Exception("กรุณากรอกอีเมล");
                else if (string.IsNullOrEmpty(input.Password))
                    throw new Exception("กรุณากรอกรหัสผ่าน");
                else
                {
                    string passencry = Encryption.MD5Hash(input.Password);

                    User val = new User();
                    using (UsersRepository UsersRepository = new UsersRepository())
                        val = UsersRepository.Authen(input.Email, passencry);

                    VUserspermission permis = new VUserspermission();
                    permis = val.PermissionData.FirstOrDefault();
                    if (permis != null)
                    {
                        val.PermissionCodeActive = permis.Code;
                        val.PermissionNameActive = permis.Name;
                    }

                    Branch branch = new Branch();
                    branch = val.BranchData.FirstOrDefault();
                    if (branch != null)
                    {
                        val.BranchIdActive = branch.BranchId;
                        val.BranchCodeActive = branch.BranchCode;
                        val.BranchNameActive = branch.Name;
                    }

                    var tmp = JsonConvert.SerializeObject(val);
                    HttpContext.Session.SetString("UserLogin", tmp);

                    return WriteJson(new
                    {
                        responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                        responsedata = val
                    });
                }
            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpGet]
        public ActionResult GetProfiles(string ref_key)
        {
            try
            {
                User user = GetProfileUser();
                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = user
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult PostProfiles([FromBody] Employee input)
        {
            try
            {
                User user = GetProfileUser();

                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (EmployeeRepository EmployeeRepository = new EmployeeRepository())
                    input = EmployeeRepository.Save(input);

                user.EmployeeData = new Employee();
                user.EmployeeData = input;

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

        [HttpPost]
        public ActionResult PostChangePassword([FromBody] postChangePassword input)
        {
            try
            {
                User user = GetProfileUser();

                if (Encryption.MD5Hash(input.BeforePassword) != user.Password)
                    throw new Exception("รหัสผ่านปัจจุบันไม่ถูกต้อง");

                user.Password = Encryption.MD5Hash(input.Password);
                user.UpdatedOn = DateTime.Now;
                user.UpdateBy = user.UserId;

                using (UsersRepository UsersRepository = new UsersRepository())
                    UsersRepository.ChangePassword(user);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = "เปลี่ยนรหัสผ่านเรียบร้อย"
                });
            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult PostRegister([FromBody] User input)
        {
            try
            {
                input.Password = Encryption.MD5Hash(input.Password);

                User val = new User();

                using (UsersRepository UsersRepository = new UsersRepository())
                    UsersRepository.Register(input);

                using (UsersRepository UsersRepository = new UsersRepository())
                    val = UsersRepository.Authen(input.Username, input.Password);

                VUserspermission permis = new VUserspermission();
                permis = val.PermissionData.FirstOrDefault();
                if (permis != null)
                {
                    val.PermissionCodeActive = permis.Code;
                    val.PermissionNameActive = permis.Name;
                }

                var tmp = JsonConvert.SerializeObject(val);
                HttpContext.Session.SetString("UserLogin", tmp);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = "สมัครสมาชิกเรียบร้อย"
                });
            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult PostForgetPassword([FromBody] User input)
        {
            try
            {
                Random random = new Random();
                string alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                string randomtxt = new string(Enumerable.Repeat(alpha, 6).Select(s => s[random.Next(s.Length)]).ToArray());
                input.Password = Encryption.MD5Hash(randomtxt);

                User val = new User();

                using (UsersRepository UsersRepository = new UsersRepository())
                    UsersRepository.ForgetPassword(input);

                //Email

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = "ระบบดำเนินการส่งรหัสผ่านใหม่ไปยังอีเมลเรียบร้อยแล้ว"
                });
            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult PostBranch([FromBody] Branch input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdateBy = user.UserId;
                input.UpdatedOn = DateTime.Now;

                user.BranchData = new List<Branch>();

                using (BranchRepository BranchRepository = new BranchRepository())
                    user.BranchData = BranchRepository.SaveFirst(input);

                var tmp = JsonConvert.SerializeObject(user);
                HttpContext.Session.SetString("UserLogin", tmp);

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = "สร้างกิจการรียบร้อย"
                });
            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        // เลือก สิทธิ
        [HttpGet]
        public ActionResult SelectPermission(string ref_key, string Permission)
        {
            try
            {
                User user = GetProfileUser();

                VUserspermission val = new VUserspermission();
                val = user.PermissionData.Where(a => a.Code == Permission).FirstOrDefault();
                if (val != null)
                {
                    user.PermissionCodeActive = val.Code;
                    user.PermissionNameActive = val.Name;

                    var tmp = JsonConvert.SerializeObject(user);
                    HttpContext.Session.SetString("UserLogin", tmp);

                }
                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = user
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        // เลือก สาขา
        [HttpGet]
        public ActionResult SelectBranch(string ref_key, string ref_id)
        {
            try
            {
                User user = GetProfileUser();

                Branch val = new Branch();
                val = user.BranchData.Where(a => a.BranchId == ref_id).FirstOrDefault();
                if (val != null)
                {
                    user.BranchIdActive = val.BranchId;
                    user.BranchCodeActive = val.BranchCode;
                    user.BranchNameActive = val.Name;

                    var tmp = JsonConvert.SerializeObject(user);
                    HttpContext.Session.SetString("UserLogin", tmp);

                }
                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = user
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpGet]
        public ActionResult SelectCustomer(string ref_key, string ref_id)
        {
            try
            {
                User user = GetProfileUser();


                user.CustomerData = new List<Customer>();
                using (CustomerRepository CustomerRepository = new CustomerRepository())
                    user.CustomerData = CustomerRepository.Get(user.OwnerData.OwnerId, user.BranchIdActive, user.EmpId);

                if (user.CustomerData != null && user.CustomerData.Count > 0)
                {
                    Customer val = new Customer();
                    val = user.CustomerData.Where(a => a.CustomerId.ToUpper() == ref_id.ToUpper()).FirstOrDefault();
                    if (val != null)
                    {
                        user.CustomerIdActive = val.CustomerId;
                        user.CustomerCodeActive = val.CustomerCode;
                        user.CustomerNameActive = val.Name;

                        user.PeriodIdActive = user.PeriodCodeActive =  user.PeriodNameActive = string.Empty;

                        user.PeriodIdActive = "43A937A5-D5C6-4F62-B095-D35903A2882B";
                        user.FSGroupIdActive = 10;

                        var tmp = JsonConvert.SerializeObject(user);
                        HttpContext.Session.SetString("UserLogin", tmp);
                    }
                }
                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = user
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpGet]
        public ActionResult SelectPeriod(string ref_key, string ref_id)
        {
            try
            {
                User user = GetProfileUser();

                AccountPeriod period = new AccountPeriod();
                using (AccountPeriodRepository AccountPeriodRepository = new AccountPeriodRepository())
                    period = AccountPeriodRepository.SelectDataWithCondition(a => a.PeriodId.ToUpper() == ref_id).FirstOrDefault();

                if (period != null)
                {
                    user.PeriodIdActive = period.PeriodId;
                    user.PeriodCodeActive = period.PeriodCode;
                    user.PeriodNameActive = period.Name;

                    var tmp = JsonConvert.SerializeObject(user);
                    HttpContext.Session.SetString("UserLogin", tmp);
                }
                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = user
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpGet]
        public ActionResult SelectFSGroup(string ref_key, string ref_id)
        {
            try
            {
                User user = GetProfileUser();

                Fsgroup fsgroup = new Fsgroup();
                using (FsgroupRepository FsgroupRepository = new FsgroupRepository())
                    fsgroup = FsgroupRepository.GetIsActive(user.OwnerData.OwnerId).Where(a => a.FsgroupId == Convert.ToInt32(ref_id)).FirstOrDefault();

                if (fsgroup != null)
                {
                    user.FSGroupIdActive = fsgroup.FsgroupId;
                    user.FSGroupCodeActive = fsgroup.Code;
                    user.FSGroupNameActive = fsgroup.Name;

                    var tmp = JsonConvert.SerializeObject(user);
                    HttpContext.Session.SetString("UserLogin", tmp);
                }
                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = user
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
        public IActionResult UploadPictureSignature(List<IFormFile> files)
        {
            try
            {
                User user = GetProfileUser();
                long size = files.Sum(f => f.Length);

                // full path to file in temp location

                string webRootPath = _hostingEnvironment.WebRootPath;
                string pathuploads = _config["ConfigSystem:UploadsPath"];
                string pathsignature = _config["ConfigSystem:SignaturePath"];
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

                Employee input = new Employee();
                input.EmpId = user.EmpId;
                input.OwnerId = user.EmployeeData.OwnerId;
                input.SignImagePath = filename;

                using (EmployeeRepository EmployeeRepository = new EmployeeRepository())
                    input = EmployeeRepository.SaveSignature(input);

                user.EmployeeData = new Employee();
                user.EmployeeData = input;
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

    }
}
