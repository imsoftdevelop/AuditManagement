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
using Models.Master;

namespace WebBackEnd.Controllers
{
    public class ParameterController : BaseController
    {
        public ParameterController(IWebHostEnvironment hostingEnvironment, IHttpContextAccessor httpContextAccessor) : base(hostingEnvironment, httpContextAccessor) { }

        [HttpGet]
        public ActionResult GetConfigSystem(string ref_key)
        {
            try
            {
                ConfigSystem Config = new ConfigSystem();
                Config.ImagePath = _config["ConfigSystem:ImagePath"];
                Config.SignImage = _config["ConfigSystem:SignaturePath"];
                Config.BranchImage = _config["ConfigSystem:BranchPath"];
                Config.FilePath = _config["ConfigSystem:FilePath"];
                return WriteJson(new
                {
                    responsecode = ((int)Abstract.ResponseCode.SuccessTransaction).ToString(),
                    responsedata = Config
                });

            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }

        [HttpGet]
        public ActionResult GetParameterModel(string ref_key, string type)
        {
            try
            {
                List<Parametermodel> response = new List<Parametermodel>();
                if (type == "all")
                    using (ParametermodelRepository ParametermodelRepository = new ParametermodelRepository())
                        response = ParametermodelRepository.GetDataAll();
                else
                    using (ParametermodelRepository ParametermodelRepository = new ParametermodelRepository())
                        response = ParametermodelRepository.SelectDataWithCondition(a => a.Type == type);

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
        public ActionResult GetParameterProvince(string ref_key)
        {
            try
            {
                List<Parameterprovince> response = new List<Parameterprovince>();
                using (ParameterprovinceRepository ParameterprovinceRepository = new ParameterprovinceRepository())
                    response = ParameterprovinceRepository.GetDataAll();

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
        public ActionResult GetParameterAmphur(string ref_key)
        {
            try
            {
                List<Parameteramphur> response = new List<Parameteramphur>();
                using (ParameteramphurRepository ParameteramphurRepository = new ParameteramphurRepository())
                    response = ParameteramphurRepository.GetDataAll();

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
        public ActionResult GetParameterTitle(string ref_key)
        {
            try
            {
                List<Parametertitle> response = new List<Parametertitle>();
                using (ParametertitleRepository ParametertitleRepository = new ParametertitleRepository())
                    response = ParametertitleRepository.GetDataAll();

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
        public ActionResult GetParameterPermission(string ref_key)
        {
            try
            {
                List<Parameterpermission> response = new List<Parameterpermission>();
                using (ParameterpermissionRepository ParameterpermissionRepository = new ParameterpermissionRepository())
                    response = ParameterpermissionRepository.GetDataAll();

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
        public ActionResult GetParameterBranchWithOwner(string ref_key)
        {
            try
            {
                User users = GetProfileUser();

                List<Branch> response = new List<Branch>();
                using (BranchRepository BranchRepository = new BranchRepository())
                    response = BranchRepository.SelectDataWithCondition(a => a.OwnerId.ToUpper() == users.OwnerData.OwnerId.ToUpper()
                    && a.IsActive == Common.IsActive
                    && a.IsDelete == Common.NoDelete).OrderBy(a => a.Name).ToList();

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
        public ActionResult GetParameterFSGroupWithOwner(string ref_key)
        {
            try
            {
                User users = GetProfileUser();

                List<Fsgroup> response = new List<Fsgroup>();
                using (FsgroupRepository FsgroupRepository = new FsgroupRepository())
                    response = FsgroupRepository.SelectDataWithCondition(a => (a.OwnerId.ToUpper() == users.OwnerData.OwnerId.ToUpper() || a.IsSystem == Common.IsSystem)
                    && a.IsActive == Common.IsActive
                    && a.IsDelete == Common.NoDelete).OrderBy(a => a.Name).ToList();

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
        public ActionResult GetParameterRequestform(string ref_key)
        {
            try
            {
                User users = GetProfileUser();

                List<ParameterTitlerequestform> response = new List<ParameterTitlerequestform>();
                using (ParameterTitlerequestformRepository ParameterTitlerequestformRepository = new ParameterTitlerequestformRepository())
                    response = ParameterTitlerequestformRepository.GetDataAll();

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
        public ActionResult GetParameterDocumentStyle(string ref_key)
        {
            try
            {
                User users = GetProfileUser();

                List<Parameterdocumentstyle> response = new List<Parameterdocumentstyle>();
                using (ParameterdocumentstyleRepository ParameterdocumentstyleRepository = new ParameterdocumentstyleRepository())
                    response = ParameterdocumentstyleRepository.GetDataAll();

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
        public ActionResult GetParameterDocumentTypeWithOwner(string ref_key)
        {
            try
            {
                User users = GetProfileUser();

                List<Documenttype> response = new List<Documenttype>();
                using (DocumenttypeRepository DocumenttypeRepository = new DocumenttypeRepository())
                    response = DocumenttypeRepository.SelectDataWithCondition(a => (a.OwnerId.ToUpper() == users.OwnerData.OwnerId.ToUpper() || a.IsSystem == Common.IsSystem)
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

        [HttpGet]
        public ActionResult GetParameterCustomerWithOwner(string ref_key)
        {
            try
            {
                User users = GetProfileUser();

                List<Customer> response = new List<Customer>();
                if (GetCustomerAssign(users.PermissionCodeActive))
                {
                    using (CustomerRepository CustomerRepository = new CustomerRepository())
                        response = CustomerRepository.Get(users.OwnerData.OwnerId, users.BranchIdActive, users.EmpId);

                    if (!string.IsNullOrEmpty(users.CustomerIdActive))
                        response = response.Where(a => a.CustomerId == users.CustomerIdActive).ToList();
                }
                else
                    using (CustomerRepository CustomerRepository = new CustomerRepository())
                        response = CustomerRepository.SelectDataWithCondition(a => a.OwnerId.ToUpper() == users.OwnerData.OwnerId.ToUpper() && a.BranchId.ToUpper() == users.BranchIdActive.ToUpper()
                        && a.IsActive == Common.IsActive
                        && a.IsDelete == Common.NoDelete)
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

        [HttpGet]
        public ActionResult GetParameterEmployeeNotAssignWithOwner(string ref_key)
        {
            try
            {
                User users = GetProfileUser();

                List<Employee> response = new List<Employee>();
                using (EmployeeRepository EmployeeRepository = new EmployeeRepository())
                    response = EmployeeRepository.GetEmpPermissionAssign(users.OwnerData.OwnerId, ref_key);

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
        public ActionResult GetParameterPeriodAccountWithOwnerAndBranchAndCustomer(string ref_cus, string ref_acc)
        {
            try
            {
                User users = GetProfileUser();

                List<AccountPeriod> response = new List<AccountPeriod>();
                using (AccountPeriodRepository AccountPeriodRepository = new AccountPeriodRepository())
                    response = AccountPeriodRepository.SelectDataWithCondition(a => a.OwnerId == users.OwnerData.OwnerId && a.CustomerId.ToUpper() == ref_cus
                    && a.IsActive == Common.IsActive && a.IsDelete == Common.NoDelete).OrderByDescending(a => a.Year).ThenBy(a => a.Name).ToList();

                if (!string.IsNullOrEmpty(ref_acc))
                    response = response.Where(a => a.PeriodId != ref_acc).ToList();

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
        public ActionResult GetParameterFSGroupWithOwnerIsActiveForTrialBalance(string ref_key)
        {
            try
            {
                User users = GetProfileUser();

                List<Fsgroup> response = new List<Fsgroup>();
                using (FsgroupRepository FsgroupRepository = new FsgroupRepository())
                    response = FsgroupRepository.GetIsActive(users.OwnerData.OwnerId);

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
        public ActionResult GetParameterTrialBalanceWithCustomerAndPeriod(string ref_cus, string ref_acc)
        {
            try
            {
                User users = GetProfileUser();

                List<AccountTrialbalance> response = new List<AccountTrialbalance>();
                using (AccountTrialbalanceRepository AccountTrialbalanceRepository = new AccountTrialbalanceRepository())
                    response = AccountTrialbalanceRepository.SelectDataWithCondition(a => a.CustomerId.ToUpper() == ref_cus
                    && a.PeriodId.ToUpper() == ref_acc
                    && a.IsDelete == Common.NoDelete).OrderBy(a => a.TrialBalanceId).ToList();

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
        public ActionResult GetParameterFSTop(string ref_key)
        {
            try
            {
                User users = GetProfileUser();

                List<MasterFstop> response = new List<MasterFstop>();
                using (MasterFstopRepository MasterFstopRepository = new MasterFstopRepository())
                    response = MasterFstopRepository.SelectDataWithCondition(a => (a.OwnerId.ToUpper() == users.OwnerData.OwnerId.ToUpper() || a.IsSystem == Common.IsSystem)
                    && a.IsDelete == Common.NoDelete).OrderBy(a => a.FstopId).ToList();

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
        public ActionResult GetParameterFSTopParentFSgroup(string ref_key)
        {
            try
            {
                User users = GetProfileUser();

                List<FstopParentFsgroup> response = new List<FstopParentFsgroup>();
                using (FstopParentFsgroupRepository FstopParentFsgroupRepository = new FstopParentFsgroupRepository())
                    response = FstopParentFsgroupRepository.SelectDataWithCondition(a => (a.OwnerId.ToUpper() == users.OwnerData.OwnerId.ToUpper() || a.IsSystem == Common.IsSystem)
                    && a.IsDelete == Common.NoDelete).OrderBy(a => a.FstopId).ToList();

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
        public ActionResult GetParameterAuditFSGroup(string ref_key)
        {
            try
            {
                User users = GetProfileUser();

                List<AccountAuditFsgroup> response = new List<AccountAuditFsgroup>();
                using (AccountAuditFsgroupRepository AccountAuditFsgroupRepository = new AccountAuditFsgroupRepository())
                    response = AccountAuditFsgroupRepository.SelectDataWithCondition(a => a.PeriodId == ref_key).OrderBy(a => a.FsgroupId).ToList();

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
        public ActionResult GetParameterFSgroupParentSubFSGroup(string ref_key, int ref_id)
        {
            try
            {
                User users = GetProfileUser();

                List<FsgroupParentSubfsgroup> response = new List<FsgroupParentSubfsgroup>();
                using (FsgroupParentSubfsgroupRepository FsgroupParentSubfsgroupRepository = new FsgroupParentSubfsgroupRepository())
                    response = FsgroupParentSubfsgroupRepository.Get(users.OwnerData.OwnerId, ref_id).ToList();

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
        public ActionResult GetParameterSubFSGroup(string ref_key)
        {
            try
            {
                User users = GetProfileUser();

                List<MasterSubfsgroup> response = new List<MasterSubfsgroup>();
                using (MasterSubfsgroupRepository MasterSubfsgroupRepository = new MasterSubfsgroupRepository())
                    response = MasterSubfsgroupRepository.Get(users.OwnerData.OwnerId).ToList();

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
        public ActionResult GetParameterAuditProgram(string ref_key, int ref_id)
        {
            try
            {
                User users = GetProfileUser();

                List<AuditprogramFsgroup> response = new List<AuditprogramFsgroup>();
                using (AuditprogramFsgroupRepository AuditprogramFsgroupRepository = new AuditprogramFsgroupRepository())
                    response = AuditprogramFsgroupRepository.Get(users.OwnerData.OwnerId, ref_id).ToList();

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
        public ActionResult GetParameterAccountAuditAccountWithPeriod(string ref_acc)
        {
            try
            {
                User users = GetProfileUser();

                List<AccountAuditAccount> response = new List<AccountAuditAccount>();
                using (AccountAuditAccountRepository AccountAuditAccountRepository = new AccountAuditAccountRepository())
                    response = AccountAuditAccountRepository.GetParemeterPeriod(ref_acc).ToList();

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
        public ActionResult GetParemeterProposal(string ref_key)
        {
            try
            {
                Parameterproposal response = new Parameterproposal();
                    using (ParameterproposalRepository ParameterproposalRepository = new ParameterproposalRepository())
                        response = ParameterproposalRepository.GetDataAll().FirstOrDefault();

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
        public ActionResult GetParameterProposalWithOwner(string ref_key)
        {
            try
            {
                User users = GetProfileUser();

                List<AccountPeriodProposal> response = new List<AccountPeriodProposal>();
                    using (AccountPeriodProposalRepository AccountPeriodProposalRepository = new AccountPeriodProposalRepository())
                        response = AccountPeriodProposalRepository.SelectDataWithCondition(a => a.OwnerId.ToUpper() == users.OwnerData.OwnerId.ToUpper() 
                        && a.IsStatus == Common.IsProposalApprove
                        && a.IsDelete == Common.NoDelete)
                        .OrderBy(a => a.ProposalCode).ToList();


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
        public ActionResult GetParameterFSTopParentFSgroupWithOwnerId(string ref_key,string ref_owner)
        {
            try
            {
                User users = GetProfileUser();

                List<FstopParentFsgroup> response = new List<FstopParentFsgroup>();
                using (FstopParentFsgroupRepository FstopParentFsgroupRepository = new FstopParentFsgroupRepository())
                    response = FstopParentFsgroupRepository.SelectDataWithCondition(a => (a.OwnerId.ToUpper() == ref_owner.ToUpper() || a.IsSystem == Common.IsSystem)
                    && a.IsDelete == Common.NoDelete).OrderBy(a => a.FstopId).ToList();

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
        public ActionResult GetParameterFSGroupWithOwnerIsActiveForTrialBalanceWithOwnerId(string ref_key, string ref_owner)
        {
            try
            {
                User users = GetProfileUser();

                List<Fsgroup> response = new List<Fsgroup>();
                using (FsgroupRepository FsgroupRepository = new FsgroupRepository())
                    response = FsgroupRepository.GetIsActive(ref_owner);

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
    }
}
