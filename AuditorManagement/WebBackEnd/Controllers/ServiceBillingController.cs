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

namespace WebBackEnd.Controllers
{
    public class ServiceBillingController : BaseController
    {
        public ServiceBillingController(IWebHostEnvironment hostingEnvironment, IHttpContextAccessor httpContextAccessor) : base(hostingEnvironment, httpContextAccessor) { }

        public IActionResult Pricing()
        {
            return View();
        }

        public IActionResult Billing()
        {
            return View();
        }

        public IActionResult UploadSlip()
        {
            return View();
        }

        public IActionResult RequestForm()
        {
            return View();
        }
     
        public IActionResult CapacityManage()
        {
            return View();
        }

        #region Request Form
        [HttpGet]
        public ActionResult GetRequestFormProcessAdmin(string ref_key)
        {
            try
            {
                List<VRequestform> response = new List<VRequestform>();
                using (VRequestformRepository VRequestformRepository = new VRequestformRepository())
                    response = VRequestformRepository.SelectDataWithCondition(a => a.Status == RequestformStatus.WaitingRequest || a.Status == RequestformStatus.WaitingProcess).OrderByDescending(a => a.RequestKey).ToList();

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
        public ActionResult GetRequestFormAllAdmin(string ref_key)
        {
            try
            {
                List<VRequestform> response = new List<VRequestform>();
                using (VRequestformRepository VRequestformRepository = new VRequestformRepository())
                    response = VRequestformRepository.GetDataAll().OrderByDescending(a => a.RequestKey).ToList();

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
        public ActionResult PostRequestForm([FromBody] Requestform input)
        {
            try
            {
                User user = GetProfileUser();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                VRequestform response = new VRequestform();
                using (RequestformRepository RequestformController = new RequestformRepository())
                    response = RequestformController.ChangeStatus(input);

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
        public ActionResult GetRequestFormAll(string ref_key)
        {
            try
            {
                User user = GetProfileUser();
                List<VRequestform> response = new List<VRequestform>();
                using (VRequestformRepository VRequestformRepository = new VRequestformRepository())
                    response = VRequestformRepository.SelectDataWithCondition(a => a.OwnerId == user.EmployeeData.OwnerId).OrderByDescending(a => a.RequestKey).ToList();

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
        public ActionResult PostNewRequestForm([FromBody] Requestform input)
        {
            try
            {
                User user = GetProfileUser();
                input.UserId = user.UserId;
                input.OwnerId = user.EmployeeData.OwnerId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                Requestform response = new Requestform();
                using (RequestformRepository RequestformController = new RequestformRepository())
                    response = RequestformController.Save(input);

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
    }
}
