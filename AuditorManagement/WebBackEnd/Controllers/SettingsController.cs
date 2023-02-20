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
    public class SettingsController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public SettingsController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Profiles()
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

    }
}
