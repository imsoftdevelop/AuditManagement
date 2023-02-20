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
    public class CustomersController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public CustomersController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult PeriodAccountList()
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
        public IActionResult ConfirmAccountList()
        {
            return View();
        }

    }
    
}
