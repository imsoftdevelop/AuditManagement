using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBackEnd.Config;
using WebBackEnd.Utility;
using WebBackEnd.Models;
using Models.Models;

namespace WebBackEnd.Controllers
{
    public class BaseController : Controller
    {
        protected IConfiguration _config;
        protected IWebHostEnvironment _hostingEnvironment;
        protected IHttpContextAccessor _httpContextAccessor;
        private ISession _session => _httpContextAccessor.HttpContext.Session;

        public BaseController(IWebHostEnvironment hostingEnvironment, IHttpContextAccessor httpContextAccessor)
        {
           _config = ApiConfigureServices.ConfigureAppSetting();
            _hostingEnvironment = hostingEnvironment;
        }

        public User GetProfileUser()
        {
            User result = new User();
            var userString = HttpContext.Session.GetString("UserLogin");
            if (userString != null)
            {
                result = JsonConvert.DeserializeObject<User>(userString);
            }
            return result;
        }

        public void GetViewBag()
        {
            User user = GetProfileUser();
            if (user != null)
            {
                if (user.EmployeeData != null)
                {
                    ViewBag.FullName = user.EmployeeData.FirstName + " " + user.EmployeeData.LastName;
                    ViewBag.Email = user.EmployeeData.Email;
                }
                else if (user.ProfileData != null)
                {
                    ViewBag.FullName = user.ProfileData.FirstName + " " + user.ProfileData.LastName;
                    ViewBag.Email = user.ProfileData.Email;
                }

                ViewBag.Role = user.PermissionCodeActive;
            }
        }

        public bool GetCustomerAssign(string PermissionCode)
        {
            bool res = false;
            if (PermissionCode == "ASSIS001" || PermissionCode == "ASSIS002" || PermissionCode == "AUDIT001" || PermissionCode == "MAG001")
                res = true;

            return res;
        }

        public bool GetRoleAccountAssistLevel1(string PermissionCode)
        {
            bool res = false;
            if (PermissionCode == "ASSIS001")
                res = true;

            return res;
        }

        public bool GetRoleAccountAssistLevel2(string PermissionCode)
        {
            bool res = false;
            if (PermissionCode == "ASSIS002")
                res = true;

            return res;
        }

        public bool GetRoleAccountAuditor(string PermissionCode)
        {
            bool res = false;
            if (PermissionCode == "AUDIT001")
                res = true;

            return res;
        }

        public bool GetRoleAccountManager(string PermissionCode)
        {
            bool res = false;
            if (PermissionCode == "MAG001")
                res = true;

            return res;
        }

        public bool GetRoleCustomer(string PermissionCode)
        {
            bool res = false;
            if (PermissionCode == "CUS001")
                res = true;

            return res;
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            base.OnActionExecuted(context);
            if (((Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor)context.ActionDescriptor).ActionName != "Login" &&
                ((Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor)context.ActionDescriptor).ActionName != "Loginindex")
            {
                if (HttpContext.Session.GetString("UserLogin") == null)
                    context.Result = new RedirectToActionResult("Loginindex", "Home", null);
                else
                    GetViewBag();
            }
        }

        [NonAction]
        public virtual JsonResult WriteJson(object data)
        {
            try
            {
                JsonSerializerSettings sett = new JsonSerializerSettings();
                sett.Converters.Add(new UtcDateTimeConverter());
                return new JsonResult(data, sett);
            }
            catch (Exception ex)
            {
                return WriteJson(new { responsecode = ((int)Abstract.ResponseCode.ErrorTransaction).ToString(), errormessage = ex.Message });
            }
        }
    }
}
