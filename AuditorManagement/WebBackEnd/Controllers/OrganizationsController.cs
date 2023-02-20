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

namespace WebBackEnd.Controllers
{
    public class OrganizationsController : BaseController
    {
        public OrganizationsController(IWebHostEnvironment hostingEnvironment, IHttpContextAccessor httpContextAccessor) : base(hostingEnvironment, httpContextAccessor) { }

        #region View

        public IActionResult OrganizationList()
        {
            return View();
        }

        public IActionResult OrganizationAdd()
        {
            return View();
        }

        public IActionResult CustomerList()
        {
            return View();
        }

        public IActionResult DocumentList()
        {
            return View();
        }

        public IActionResult DocumentAdd()
        {
            return View();
        }

        public IActionResult CustomerManageList()
        {
            return View();
        }

        public IActionResult CustomerDetailManage()
        {
            return View();
        }

        public IActionResult CustomerAdd()
        {
            return View();
        }

        public IActionResult FSTop()
        {
            return View();
        }

        public IActionResult FSGroup()
        {
            return View();
        }

        public IActionResult SubFSGroup()
        {
            return View();
        }

        public IActionResult GroupType()
        {
            return View();
        }

        public IActionResult Cashflow()
        {
            return View();
        }

        public IActionResult CompanyDocument()
        {
            return View();
        }

        public IActionResult AuditProgram()
        {
            return View();
        }

        public IActionResult Expenses()
        {
            return View();
        }

        public IActionResult TaxGroup()
        {
            return View();
        }

        public IActionResult NonTaxbleExpense()
        {
            return View();
        }

        public IActionResult PPEGroup()
        {
            return View();
        }

        public IActionResult IAGroup()
        {
            return View();
        }
        #endregion

        #region Branch

        [HttpGet]
        public ActionResult GetBranch(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<Branch> response = new List<Branch>();
                using (BranchRepository BranchRepository = new BranchRepository())
                    response = BranchRepository.Get(user.EmployeeData.OwnerId);

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
        public ActionResult GetBranchWithKey(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                Branch response = new Branch();
                using (BranchRepository BranchRepository = new BranchRepository())
                    response = BranchRepository.SelectFirstDataWithCondition(a => a.BranchId == ref_key && a.IsDelete == Common.NoDelete);

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
        public ActionResult PostBranch([FromBody] Branch input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId.ToUpper();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (BranchRepository BranchRepository = new BranchRepository())
                    input = BranchRepository.Save(input);

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
        public ActionResult DeleteBranch(string ref_key)
        {
            try
            {
                User user = GetProfileUser();
                Branch input = new Branch();
                input.BranchId = ref_key;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (BranchRepository BranchRepository = new BranchRepository())
                    BranchRepository.Delete(input);

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
        public IActionResult UploadPictureLogo(List<IFormFile> files, string BranchId)
        {
            try
            {
                User user = GetProfileUser();
                long size = files.Sum(f => f.Length);

                // full path to file in temp location

                string webRootPath = _hostingEnvironment.WebRootPath;
                string pathuploads = _config["ConfigSystem:UploadsPath"];
                string pathsignature = _config["ConfigSystem:BranchPath"];
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

                Branch input = new Branch();
                input.BranchId = BranchId;
                input.OwnerId = user.EmployeeData.OwnerId;
                input.LogoPath = filename;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (BranchRepository BranchRepository = new BranchRepository())
                    input = BranchRepository.SaveLogo(input);

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

        #region Customer

        [HttpPost]
        public IActionResult GetRevenurevalue([FromBody] postrevenure request)
        {
            try
            {
                List<RDVatResult> response = new List<RDVatResult>();

                var isNumeric = decimal.TryParse(request.NID, out decimal n);
                if (request.NID.Length == 13 && isNumeric)
                {
                    response = RDVatResult.Get(request.NID, "");
                }
                else
                    response = RDVatResult.Get("", request.Name);

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
        public ActionResult GetCustomer(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<Customer> response = new List<Customer>();
                using (CustomerRepository CustomerRepository = new CustomerRepository())
                    response = CustomerRepository.Get(user.EmployeeData.OwnerId);

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
        public ActionResult GetCustomerWithBranch(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<Customer> response = new List<Customer>();
                using (CustomerRepository CustomerRepository = new CustomerRepository())
                    response = CustomerRepository.Get(user.EmployeeData.OwnerId, user.BranchIdActive);

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
        public ActionResult GetCustomerWithBranchFromAssign(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<Customer> response = new List<Customer>();
                using (CustomerRepository CustomerRepository = new CustomerRepository())
                    response = CustomerRepository.Get(user.EmployeeData.OwnerId, user.BranchIdActive, user.EmpId);

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
        public ActionResult GetCustomerWithKey(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                Customer response = new Customer();
                using (CustomerRepository CustomerRepository = new CustomerRepository())
                    response = CustomerRepository.GetWithKey(user.EmployeeData.OwnerId, user.BranchIdActive, ref_key);

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
        public ActionResult PostCustomer([FromBody] Customer input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId.ToUpper();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (CustomerRepository CustomerRepository = new CustomerRepository())
                    input = CustomerRepository.Save(input);

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
        public ActionResult PostCustomerWithBranch([FromBody] Customer input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId.ToUpper();
                input.BranchId = user.BranchIdActive.ToUpper();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (CustomerRepository CustomerRepository = new CustomerRepository())
                    input = CustomerRepository.Save(input);

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
        public ActionResult DeleteCustomer(string ref_key)
        {
            try
            {
                User user = GetProfileUser();
                Customer input = new Customer();
                input.CustomerId = ref_key;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (CustomerRepository CustomerRepository = new CustomerRepository())
                    CustomerRepository.Delete(input);

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

        [HttpGet]
        public ActionResult GetCustomerContractWithKey(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<CustomerContract> response = new List<CustomerContract>();
                using (CustomerContractRepository CustomerContractRepository = new CustomerContractRepository())
                    response = CustomerContractRepository.Get(user.OwnerData.OwnerId, user.BranchIdActive, ref_key);

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
        public ActionResult GetCustomerAssignWithKey(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<CustomerAssign> response = new List<CustomerAssign>();
                using (CustomerAssignRepository CustomerAssignRepository = new CustomerAssignRepository())
                    response = CustomerAssignRepository.Get(user.OwnerData.OwnerId, user.BranchIdActive, ref_key);

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
        public ActionResult PostCustomerContractWithBranch([FromBody] CustomerContract input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId.ToUpper();
                input.BranchId = user.BranchIdActive.ToUpper();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (CustomerContractRepository CustomerContractRepository = new CustomerContractRepository())
                    input = CustomerContractRepository.Save(input);

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
        public ActionResult PostCustomerContractInviteWithBranch([FromBody] CustomerContract input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId.ToUpper();
                input.BranchId = user.BranchIdActive.ToUpper();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (CustomerContractRepository CustomerContractRepository = new CustomerContractRepository())
                    input = CustomerContractRepository.Invite(input);

                // Email

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
        public ActionResult PostCustomerAssignWithBranch([FromBody] CustomerAssign input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId.ToUpper();
                input.BranchId = user.BranchIdActive.ToUpper();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (CustomerAssignRepository CustomerAssignRepository = new CustomerAssignRepository())
                    input = CustomerAssignRepository.Save(input);

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
        public ActionResult DeleteCustomerContract(string ref_key)
        {
            try
            {
                User user = GetProfileUser();
                CustomerContract input = new CustomerContract();
                input.ContractId = ref_key;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (CustomerContractRepository CustomerContractRepository = new CustomerContractRepository())
                    CustomerContractRepository.Delete(input);

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
        public ActionResult DeleteCustomerAssign(string ref_key)
        {
            try
            {
                User user = GetProfileUser();
                CustomerAssign input = new CustomerAssign();
                input.AssignId = ref_key;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (CustomerAssignRepository CustomerAssignRepository = new CustomerAssignRepository())
                    CustomerAssignRepository.Delete(input);

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
        public ActionResult DisabledCustomerAssign(string ref_key)
        {
            try
            {
                User user = GetProfileUser();
                CustomerAssign input = new CustomerAssign();
                input.AssignId = ref_key;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (CustomerAssignRepository CustomerAssignRepository = new CustomerAssignRepository())
                    input = CustomerAssignRepository.Disabled(input);

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
        public ActionResult OnDisabledCustomerAssign(string ref_key)
        {
            try
            {
                User user = GetProfileUser();
                CustomerAssign input = new CustomerAssign();
                input.AssignId = ref_key;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (CustomerAssignRepository CustomerAssignRepository = new CustomerAssignRepository())
                    input = CustomerAssignRepository.OnDisabled(input);

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

        #region FSGroup

        [HttpGet]
        public ActionResult GetFSGroup(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<Fsgroup> response = new List<Fsgroup>();
                using (FsgroupRepository FsgroupRepository = new FsgroupRepository())
                    response = FsgroupRepository.Get(user.EmployeeData.OwnerId);

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
        public ActionResult PostFSGroup([FromBody] Fsgroup input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                Fsgroup response = new Fsgroup();
                using (FsgroupRepository FsgroupRepository = new FsgroupRepository())
                    response = FsgroupRepository.Save(input);

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
        public ActionResult DeleteFSGroup(int ref_key)
        {
            try
            {
                User user = GetProfileUser();
                Fsgroup input = new Fsgroup();
                input.FsgroupId = ref_key;
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                Fsgroup response = new Fsgroup();
                using (FsgroupRepository FsgroupRepository = new FsgroupRepository())
                    response = FsgroupRepository.DeleteOwner(input);

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

        #region FSTop

        [HttpGet]
        public ActionResult GetFSTop(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<MasterFstop> response = new List<MasterFstop>();
                using (MasterFstopRepository MasterFstopRepository = new MasterFstopRepository())
                    response = MasterFstopRepository.Get(user.EmployeeData.OwnerId);

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
        public ActionResult PostFSTop([FromBody] MasterFstop input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                MasterFstop response = new MasterFstop();
                using (MasterFstopRepository MasterFstopRepository = new MasterFstopRepository())
                    response = MasterFstopRepository.Save(input);

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
        public ActionResult DeleteFSTop(int ref_key)
        {
            try
            {
                User user = GetProfileUser();
                MasterFstop input = new MasterFstop();
                input.FstopId = ref_key;
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                MasterFstop response = new MasterFstop();
                using (MasterFstopRepository MasterFstopRepository = new MasterFstopRepository())
                    response = MasterFstopRepository.DeleteOwner(input);

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

        #region SubFSGroup

        [HttpGet]
        public ActionResult GetSubFSGroup(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<MasterSubfsgroup> response = new List<MasterSubfsgroup>();
                using (MasterSubfsgroupRepository MasterSubfsgroupRepository = new MasterSubfsgroupRepository())
                    response = MasterSubfsgroupRepository.Get(user.EmployeeData.OwnerId);

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
        public ActionResult PostSubFSGroup([FromBody] MasterSubfsgroup input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                MasterSubfsgroup response = new MasterSubfsgroup();
                using (MasterSubfsgroupRepository MasterSubfsgroupRepository = new MasterSubfsgroupRepository())
                    response = MasterSubfsgroupRepository.Save(input);

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
        public ActionResult DeleteSubFSGroup(int ref_key)
        {
            try
            {
                User user = GetProfileUser();
                MasterSubfsgroup input = new MasterSubfsgroup();
                input.SubFsgroupId = ref_key;
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                MasterSubfsgroup response = new MasterSubfsgroup();
                using (MasterSubfsgroupRepository MasterSubfsgroupRepository = new MasterSubfsgroupRepository())
                    response = MasterSubfsgroupRepository.DeleteOwner(input);

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

        #region GroupType

        [HttpGet]
        public ActionResult GetGroupType(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<MasterGrouptype> response = new List<MasterGrouptype>();
                using (MasterGrouptypeRepository MasterGrouptypeRepository = new MasterGrouptypeRepository())
                    response = MasterGrouptypeRepository.Get(user.EmployeeData.OwnerId);

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
        public ActionResult PostGroupType([FromBody] MasterGrouptype input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                MasterGrouptype response = new MasterGrouptype();
                using (MasterGrouptypeRepository MasterGrouptypeRepository = new MasterGrouptypeRepository())
                    response = MasterGrouptypeRepository.Save(input);

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
        public ActionResult DeleteGroupType(int ref_key)
        {
            try
            {
                User user = GetProfileUser();
                MasterGrouptype input = new MasterGrouptype();
                input.GroupTypeId = ref_key;
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                MasterGrouptype response = new MasterGrouptype();
                using (MasterGrouptypeRepository MasterGrouptypeRepository = new MasterGrouptypeRepository())
                    response = MasterGrouptypeRepository.DeleteOwner(input);

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

        #region Company Document

        [HttpGet]
        public ActionResult GetDocumenttype(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<Documenttype> response = new List<Documenttype>();
                using (DocumenttypeRepository DocumenttypeRepository = new DocumenttypeRepository())
                    response = DocumenttypeRepository.Get(user.EmployeeData.OwnerId);

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
        public ActionResult PostDocumenttype([FromBody] Documenttype input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                Documenttype response = new Documenttype();
                using (DocumenttypeRepository DocumenttypeRepository = new DocumenttypeRepository())
                    response = DocumenttypeRepository.Save(input);

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
        public ActionResult DeleteDocumenttype(int ref_key)
        {
            try
            {
                User user = GetProfileUser();
                Documenttype input = new Documenttype();
                input.Documentid = ref_key;
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                Documenttype response = new Documenttype();
                using (DocumenttypeRepository DocumenttypeRepository = new DocumenttypeRepository())
                    response = DocumenttypeRepository.DeleteOwner(input);

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

        #region Audit Program

        [HttpGet]
        public ActionResult GetAuditprogram(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<Auditprogram> response = new List<Auditprogram>();
                using (AuditprogramRepository AuditprogramRepository = new AuditprogramRepository())
                    response = AuditprogramRepository.Get(user.EmployeeData.OwnerId);

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
        public ActionResult PostAuditprogram([FromBody] Auditprogram input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                Auditprogram response = new Auditprogram();
                using (AuditprogramRepository AuditprogramRepository = new AuditprogramRepository())
                    response = AuditprogramRepository.Save(input);

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
        public ActionResult DeleteAuditprogram(int ref_key)
        {
            try
            {
                User user = GetProfileUser();
                Auditprogram input = new Auditprogram();
                input.Auditprogramid = ref_key;
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                Auditprogram response = new Auditprogram();
                using (AuditprogramRepository AuditprogramRepository = new AuditprogramRepository())
                    response = AuditprogramRepository.DeleteOwner(input);

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
        public ActionResult GetAuditProgramFSGroup(string ref_key)
        {
            try
            {
                User user = GetProfileUser();
                List<VAuditprogramFsgroup> response = new List<VAuditprogramFsgroup>();
                using (VAuditProgramFsgroupRepository VAuditProgramFsgroupRepository = new VAuditProgramFsgroupRepository())
                    response = VAuditProgramFsgroupRepository.Get(user.EmployeeData.OwnerId);

                var groupresponse = response.GroupBy(a => new { a.FsgroupCode, a.FsgroupName, a.FsgroupNameEn })
                    .Select(b => new { b.Key.FsgroupCode, b.Key.FsgroupName, b.Key.FsgroupNameEn }).ToList();

                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = response,
                    responsegroup = groupresponse
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult PostAuditProgramFSGroup([FromBody] AuditprogramFsgroup input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId;

                using (AuditprogramFsgroupRepository AuditprogramFsgroupRepository = new AuditprogramFsgroupRepository())
                    AuditprogramFsgroupRepository.Save(input, user.UserId);

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

        #endregion

        #region Cash Flow

        [HttpGet]
        public ActionResult GetMasterCashflow(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<MasterCashflow> response = new List<MasterCashflow>();
                using (MasterCashflowRepository MasterCashflowRepository = new MasterCashflowRepository())
                    response = MasterCashflowRepository.Get(user.EmployeeData.OwnerId);

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
        public ActionResult PostMasterCashflow([FromBody] MasterCashflow input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                MasterCashflow response = new MasterCashflow();
                using (MasterCashflowRepository MasterCashflowRepository = new MasterCashflowRepository())
                    response = MasterCashflowRepository.Save(input);

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
        public ActionResult DeleteMasterCashflow(int ref_key)
        {
            try
            {
                User user = GetProfileUser();
                MasterCashflow input = new MasterCashflow();
                input.CashflowId = ref_key;
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                MasterCashflow response = new MasterCashflow();
                using (MasterCashflowRepository MasterCashflowRepository = new MasterCashflowRepository())
                    response = MasterCashflowRepository.DeleteOwner(input);

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

        #region Expenses

        [HttpGet]
        public ActionResult GetMasterExpense(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<MasterExpense> response = new List<MasterExpense>();
                using (MasterExpenseRepository MasterExpenseRepository = new MasterExpenseRepository())
                    response = MasterExpenseRepository.Get(user.EmployeeData.OwnerId);

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
        public ActionResult PostMasterExpense([FromBody] MasterExpense input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                MasterExpense response = new MasterExpense();
                using (MasterExpenseRepository MasterExpenseRepository = new MasterExpenseRepository())
                    response = MasterExpenseRepository.Save(input);

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
        public ActionResult DeleteMasterExpense(int ref_key)
        {
            try
            {
                User user = GetProfileUser();
                MasterExpense input = new MasterExpense();
                input.ExpensesId = ref_key;
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                MasterExpense response = new MasterExpense();
                using (MasterExpenseRepository MasterExpenseRepository = new MasterExpenseRepository())
                    response = MasterExpenseRepository.DeleteOwner(input);

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

        #region TaxGroup

        [HttpGet]
        public ActionResult GetMasterTaxgroup(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<MasterTaxgroup> response = new List<MasterTaxgroup>();
                using (MasterTaxgroupRepository MasterTaxgroupRepository = new MasterTaxgroupRepository())
                    response = MasterTaxgroupRepository.Get(user.EmployeeData.OwnerId);

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
        public ActionResult PostMasterTaxgroup([FromBody] MasterTaxgroup input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                MasterTaxgroup response = new MasterTaxgroup();
                using (MasterTaxgroupRepository MasterTaxgroupRepository = new MasterTaxgroupRepository())
                    response = MasterTaxgroupRepository.Save(input);

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
        public ActionResult DeleteMasterTaxgroup(int ref_key)
        {
            try
            {
                User user = GetProfileUser();
                MasterTaxgroup input = new MasterTaxgroup();
                input.TaxgroupId = ref_key;
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                MasterTaxgroup response = new MasterTaxgroup();
                using (MasterTaxgroupRepository MasterTaxgroupRepository = new MasterTaxgroupRepository())
                    response = MasterTaxgroupRepository.DeleteOwner(input);

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

        #region Non TaxGroup

        [HttpGet]
        public ActionResult GetMasterNontax(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<MasterNontax> response = new List<MasterNontax>();
                using (MasterNontaxRepository MasterNontaxRepository = new MasterNontaxRepository())
                    response = MasterNontaxRepository.Get(user.EmployeeData.OwnerId);

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
        public ActionResult PostMasterNontax([FromBody] MasterNontax input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                MasterNontax response = new MasterNontax();
                using (MasterNontaxRepository MasterNontaxRepository = new MasterNontaxRepository())
                    response = MasterNontaxRepository.Save(input);

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
        public ActionResult DeleteMasterNontax(int ref_key)
        {
            try
            {
                User user = GetProfileUser();
                MasterNontax input = new MasterNontax();
                input.NonTaxgroupId = ref_key;
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                MasterNontax response = new MasterNontax();
                using (MasterNontaxRepository MasterNontaxRepository = new MasterNontaxRepository())
                    response = MasterNontaxRepository.DeleteOwner(input);

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

        #region PPE Group

        [HttpGet]
        public ActionResult GetMasterPpegroup(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<MasterPpegroup> response = new List<MasterPpegroup>();
                using (MasterPpegroupRepository MasterPpegroupRepository = new MasterPpegroupRepository())
                    response = MasterPpegroupRepository.Get(user.EmployeeData.OwnerId);

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
        public ActionResult PostMasterPpegroup([FromBody] MasterPpegroup input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                MasterPpegroup response = new MasterPpegroup();
                using (MasterPpegroupRepository MasterPpegroupRepository = new MasterPpegroupRepository())
                    response = MasterPpegroupRepository.Save(input);

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
        public ActionResult DeleteMasterPpegroup(int ref_key)
        {
            try
            {
                User user = GetProfileUser();
                MasterPpegroup input = new MasterPpegroup();
                input.PpegroupId = ref_key;
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                MasterPpegroup response = new MasterPpegroup();
                using (MasterPpegroupRepository MasterPpegroupRepository = new MasterPpegroupRepository())
                    response = MasterPpegroupRepository.DeleteOwner(input);

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

        #region IA Group

        [HttpGet]
        public ActionResult GetMasterIagroup(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<MasterIagroup> response = new List<MasterIagroup>();
                using (MasterIagroupRepository MasterIagroupRepository = new MasterIagroupRepository())
                    response = MasterIagroupRepository.Get(user.EmployeeData.OwnerId);

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
        public ActionResult PostMasterIagroup([FromBody] MasterIagroup input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                MasterIagroup response = new MasterIagroup();
                using (MasterIagroupRepository MasterIagroupRepository = new MasterIagroupRepository())
                    response = MasterIagroupRepository.Save(input);

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
        public ActionResult DeleteMasterIagroup(int ref_key)
        {
            try
            {
                User user = GetProfileUser();
                MasterIagroup input = new MasterIagroup();
                input.IagroupId = ref_key;
                input.OwnerId = user.OwnerData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                MasterIagroup response = new MasterIagroup();
                using (MasterIagroupRepository MasterIagroupRepository = new MasterIagroupRepository())
                    response = MasterIagroupRepository.DeleteOwner(input);

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

        #region Document

        [HttpGet]
        public ActionResult GetDocumentList(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<VDocumentlist> response = new List<VDocumentlist>();
                if (GetCustomerAssign(user.PermissionCodeActive))
                {
                    using (DocumentlistRepository DocumentlistRepository = new DocumentlistRepository())
                        response = DocumentlistRepository.GetCustomerAssign(user.EmployeeData.OwnerId, user.BranchIdActive, user.EmpId);

                    if (!string.IsNullOrEmpty(user.CustomerIdActive))
                        response = response.Where(a => a.CustomerId == user.CustomerIdActive).ToList();
                }
                else
                    using (DocumentlistRepository DocumentlistRepository = new DocumentlistRepository())
                        response = DocumentlistRepository.Get(user.EmployeeData.OwnerId, user.BranchIdActive);

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
                    response = DocumentlistRepository.SelectDataWithCondition(a => a.DocumentListId == ref_key && a.OwnerId == user.OwnerData.OwnerId.ToUpper()).FirstOrDefault();

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
                input.OwnerId = user.OwnerData.OwnerId;
                input.BranchId = user.BranchIdActive;
                input.UploadType = Common.UploadEmployee;
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

        [HttpDelete]
        public ActionResult DeleteDocumentList(string ref_key)
        {
            try
            {
                User user = GetProfileUser();
                Documentlist input = new Documentlist();
                input.DocumentListId = ref_key;
                input.OwnerId = user.OwnerData.OwnerId;
                input.BranchId = user.BranchIdActive;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                Documentlist response = new Documentlist();
                using (DocumentlistRepository DocumentlistRepository = new DocumentlistRepository())
                    response = DocumentlistRepository.Delete(input);

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
        public IActionResult UploadFileDocument(List<IFormFile> files, string DocumentId)
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

                using (DocumentlistRepository DocumentlistRepository = new DocumentlistRepository())
                    input = DocumentlistRepository.SaveFile(input);

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
