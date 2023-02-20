using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WebBackEnd.Models;

namespace WebBackEnd.Controllers
{
    public class SuperAdminController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public SuperAdminController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult MemberList()
        {
            return View();
        }

        public IActionResult MemberAdd()
        {
            return View();
        }

        public IActionResult OrganizationList()
        {
            return View();
        }

        public IActionResult VerifyList()
        {
            return View();
        }

        public IActionResult PaymentList()
        {
            return View();
        }

        public IActionResult HistoryPaymentList()
        {
            return View();
        }

        public IActionResult PaymentDetail()
        {
            return View();
        }

        public IActionResult PackageList()
        {
            return View();
        }

        public IActionResult RequestForm()
        {
            return View();
        }

        public IActionResult HistoryRequestForm()
        {
            return View();
        }
        public IActionResult FSGroup()
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
        


    }
    
}
