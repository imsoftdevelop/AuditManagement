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
using Newtonsoft.Json;
using WebBackEnd.Utility;
using Microsoft.Extensions.Options;

namespace WebBackEnd.Controllers
{
    public class HomeController : BaseController
    {
        private readonly IOptions<AppSettings> _settings;
        public HomeController(IWebHostEnvironment hostingEnvironment, IHttpContextAccessor httpContextAccessor, IOptions<AppSettings> settings) : base(hostingEnvironment, httpContextAccessor) {
            _settings = settings;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Login()
        {
           // HttpContext.Session.Clear();
            return View();
        }

        public IActionResult ForgetPassword()
        {
            return View();
        }
        public IActionResult Register()
        {
            return View();
        }

        public IActionResult ConfirmRegister()
        {
            return View();
        }

        public IActionResult IndexOffice()
        {
            return View();
        }

        public IActionResult IndexAccount()
        {
            return View();
        }

        public IActionResult IndexAudit()
        {
            return View();
        }

        public IActionResult BranchList()
        {
            return View();
        }

        public IActionResult BranchAdd()
        {
            return View();
        }

        public IActionResult IndexCustomer()
        {
            return View();
        }

        public IActionResult IndexAdmin()
        {
            return View();
        }

        public IActionResult CustomerList()
        {
            return View();
        }
        
        public IActionResult Loginindex()
        {
            string passencry = Encryption.MD5Hash("123456");
            User val = new User();
            using (UsersRepository UsersRepository = new UsersRepository())
                val = UsersRepository.Authen("account2@gmail.com", passencry);

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

            return View();
        }

        public IActionResult RoleList()
        {
            return View();
        }

        public IActionResult Default()
        {
            return View();
        }
        public IActionResult CustomerDashBoard()
        {
            return View();
        }
        

    }
}
