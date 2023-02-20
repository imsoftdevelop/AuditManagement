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

namespace WebBackEnd.Controllers
{
    public class EmployeesController : BaseController
    {

        public EmployeesController(IWebHostEnvironment hostingEnvironment, IHttpContextAccessor httpContextAccessor) : base(hostingEnvironment, httpContextAccessor) { }

        public IActionResult EmployeeList()
        {
            return View();
        }

        public IActionResult EmployeeAdd()
        {
            return View();
        }

        #region Employees
       
        [HttpGet]
        public ActionResult GetEmployees(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                List<Employee> response = new List<Employee>();
                using (EmployeeRepository EmployeeRepository = new EmployeeRepository())
                    response = EmployeeRepository.Get(user.OwnerData.OwnerId);

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
        public ActionResult GetEmployeesWithKey(string ref_key)
        {
            try
            {
                User user = GetProfileUser();

                Employee response = new Employee();
                using (EmployeeRepository EmployeeRepository = new EmployeeRepository())
                    response = EmployeeRepository.GetWithKey(ref_key);

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
        public ActionResult PostEmployees([FromBody] Employee input)
        {
            try
            {
                User user = GetProfileUser();
                input.OwnerId = user.OwnerData.OwnerId.ToUpper();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                if (string.IsNullOrEmpty(input.EmpId))
                {
                    string passencry = Encryption.MD5Hash(input.UserData.Password);
                    input.UserData.Username = input.Email;
                    input.UserData.Password = passencry;
                }

                Employee response = new Employee();
                using (EmployeeRepository EmployeeRepository = new EmployeeRepository())
                    response = EmployeeRepository.Save(input);

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
        public ActionResult DeleteEmployees(string ref_key)
        {
            try
            {
                User user = GetProfileUser();
                Employee input = new Employee();
                input.EmpId = ref_key;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                using (EmployeeRepository EmployeeRepository = new EmployeeRepository())
                    EmployeeRepository.Delete(input);

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
        
        #endregion

    }
}
