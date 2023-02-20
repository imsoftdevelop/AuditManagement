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
    public class MasterController : BaseController
    {
        public MasterController(IWebHostEnvironment hostingEnvironment, IHttpContextAccessor httpContextAccessor) : base(hostingEnvironment, httpContextAccessor) { }

        #region FSGroup
        [HttpGet]
        public ActionResult GetFSGroupAdmin(string ref_key)
        {
            try
            {
                List<Fsgroup> response = new List<Fsgroup>();
                using (FsgroupRepository FsgroupRepository = new FsgroupRepository())
                    response = FsgroupRepository.SelectDataWithCondition(a => a.IsDelete == Common.NoDelete && a.IsSystem == Common.IsSystem).OrderBy(a => a.Sequence).ToList();

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
        public ActionResult PostFSGroupAdmin([FromBody] Fsgroup input)
        {
            try
            {
                User user = GetProfileUser();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                Fsgroup response = new Fsgroup();
                using (FsgroupRepository FsgroupRepository = new FsgroupRepository())
                    response = FsgroupRepository.SaveAdmin(input);

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
        public ActionResult DeleteFSGroupAdmin(int FsGroupId)
        {
            try
            {
                User user = GetProfileUser();
                Fsgroup input = new Fsgroup();
                input.FsgroupId = FsGroupId;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                Fsgroup response = new Fsgroup();
                using (FsgroupRepository FsgroupRepository = new FsgroupRepository())
                    response = FsgroupRepository.Delete(input);

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

        #region DocumentType
        [HttpGet]
        public ActionResult GetDocumentTypeAdmin(string ref_key)
        {
            try
            {
                List<Documenttype> response = new List<Documenttype>();
                using (DocumenttypeRepository DocumenttypeRepository = new DocumenttypeRepository())
                    response = DocumenttypeRepository.SelectDataWithCondition(a => a.IsDelete == Common.NoDelete && a.IsSystem == Common.IsSystem).OrderBy(a => a.Sequence).ToList();

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
        public ActionResult PostDocumentTypeAdmin([FromBody] Documenttype input)
        {
            try
            {
                User user = GetProfileUser();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                Documenttype response = new Documenttype();
                using (DocumenttypeRepository DocumenttypeRepository = new DocumenttypeRepository())
                    response = DocumenttypeRepository.SaveAdmin(input);

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
        public ActionResult DeleteDocumentTypeAdmin(int ref_key)
        {
            try
            {
                User user = GetProfileUser();
                Documenttype input = new Documenttype();
                input.Documentid = ref_key;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                Documenttype response = new Documenttype();
                using (DocumenttypeRepository DocumenttypeRepository = new DocumenttypeRepository())
                    response = DocumenttypeRepository.Delete(input);

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

        #region AuditProgram
        [HttpGet]
        public ActionResult GetAuditProgramAdmin(string ref_key)
        {
            try
            {
                List<Auditprogram> response = new List<Auditprogram>();
                using (AuditprogramRepository AuditprogramRepository = new AuditprogramRepository())
                    response = AuditprogramRepository.GetAdmin();

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
        public ActionResult PostAuditProgramAdmin([FromBody] Auditprogram input)
        {
            try
            {
                User user = GetProfileUser();
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                Auditprogram response = new Auditprogram();
                using (AuditprogramRepository AuditprogramRepository = new AuditprogramRepository())
                    response = AuditprogramRepository.SaveAdmin(input);

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
        public ActionResult DeleteAuditProgramAdmin(int ref_key)
        {
            try
            {
                User user = GetProfileUser();
                Auditprogram input = new Auditprogram();
                input.Auditprogramid = ref_key;
                input.UpdatedOn = DateTime.Now;
                input.UpdateBy = user.UserId;

                Auditprogram response = new Auditprogram();
                using (AuditprogramRepository AuditprogramRepository = new AuditprogramRepository())
                    response = AuditprogramRepository.Delete(input);

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
        public ActionResult GetAuditProgramFSGroupAdmin(string ref_key)
        {
            try
            {
                List<VAuditprogramFsgroup> response = new List<VAuditprogramFsgroup>();
                using (VAuditProgramFsgroupRepository VAuditProgramFsgroupRepository = new VAuditProgramFsgroupRepository())
                    response = VAuditProgramFsgroupRepository.GetAdmin();

                var groupresponse = response.GroupBy(a => new {  a.FsgroupCode , a.FsgroupName , a.FsgroupNameEn })
                    .Select(b => new {  b.Key.FsgroupCode,b.Key.FsgroupName, b.Key.FsgroupNameEn }).ToList();

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
        public ActionResult PostAuditProgramFSGroupAdmin([FromBody] AuditprogramFsgroup input)
        {
            try
            {
                User user = GetProfileUser();

                using (AuditprogramFsgroupRepository AuditprogramFsgroupRepository = new AuditprogramFsgroupRepository())
                    AuditprogramFsgroupRepository.SaveAdmin(input, user.UserId);

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
    }
}
