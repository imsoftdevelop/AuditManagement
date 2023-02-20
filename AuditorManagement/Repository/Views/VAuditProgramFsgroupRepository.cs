using Models;
using Models.Master;
using Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace Repository
{
    public class VAuditProgramFsgroupRepository : IMauchlyCore.IMauchlyRepository<VAuditprogramFsgroup, AuditDataContext>
    {
        public List<VAuditprogramFsgroup> GetAdmin()
        {
            try
            {
                List<VAuditprogramFsgroup> response = new List<VAuditprogramFsgroup>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<VAuditprogramFsgroup>();
                    response = otable.Where(a => a.IsDelete == Common.NoDelete && a.IsSystem == Common.IsSystem).ToList();
                }
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<VAuditprogramFsgroup> Get(string OwnerId)
        {
            try
            {
                List<VAuditprogramFsgroup> response = new List<VAuditprogramFsgroup>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<VAuditprogramFsgroup>();
                    response = otable.Where(a => (a.OwnerId.ToUpper() == OwnerId.ToUpper() || a.IsSystem == Common.IsSystem) && a.IsDelete == Common.NoDelete).ToList();
                }
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
