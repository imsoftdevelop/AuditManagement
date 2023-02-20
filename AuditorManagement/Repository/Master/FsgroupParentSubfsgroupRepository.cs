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
    public class FsgroupParentSubfsgroupRepository : IMauchlyCore.IMauchlyRepository<FsgroupParentSubfsgroup, AuditDataContext>
    {
        public List<FsgroupParentSubfsgroup> Get(string OwnerId)
        {
            try
            {
                List<FsgroupParentSubfsgroup> response = new List<FsgroupParentSubfsgroup>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<Fsgroup>();
                    var stable = context.Set<MasterSubfsgroup>();
                    var dtable = context.Set<FsgroupParentSubfsgroup>();
                    var itable = context.Set<FsgroupInterface>();
                    response = dtable.Where(a => (a.OwnerId.ToUpper() == OwnerId.ToUpper() || a.IsSystem == Common.IsSystem) && a.IsDelete == Common.NoDelete)
                        .OrderByDescending(a => a.FsgroupId).ToList();

                    if (response != null && response.Count > 0)
                    {
                        foreach (FsgroupParentSubfsgroup obj in response)
                        {
                            obj.SubFSGroup = new MasterSubfsgroup();
                            obj.SubFSGroup = stable.Where(a => a.SubFsgroupId == obj.SubFsgroupId).FirstOrDefault();

                            obj.FSGroup = new Fsgroup();
                            obj.FSGroup = otable.Where(a => a.FsgroupId == obj.FsgroupId).FirstOrDefault();

                            if (obj.FSGroup.IsSystem == Common.IsSystem)
                            {
                                obj.FSGroup.Interface = new FsgroupInterface();
                                obj.FSGroup.Interface = itable.Where(a => a.FsgroupId == obj.FSGroup.FsgroupId && a.OwnerId.ToUpper() == OwnerId.ToUpper()
                                && a.IsDelete == Common.NoDelete).FirstOrDefault();
                                obj.FSGroup.IsInterface = obj.FSGroup.Interface != null ? obj.FSGroup.Interface.IsActive == "Yes" ? "Yes" : "No" : "No";
                            }
                            else
                                obj.FSGroup.IsInterface = "No";
                        }
                    }
                }
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<FsgroupParentSubfsgroup> Get(string OwnerId, int FSGroupId)
        {
            try
            {
                List<FsgroupParentSubfsgroup> response = new List<FsgroupParentSubfsgroup>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<Fsgroup>();
                    var stable = context.Set<MasterSubfsgroup>();
                    var dtable = context.Set<FsgroupParentSubfsgroup>();
                    var itable = context.Set<FsgroupInterface>();
                    response = dtable.Where(a =>
                    a.FsgroupId == FSGroupId &&
                    (a.OwnerId.ToUpper() == OwnerId.ToUpper() || a.IsSystem == Common.IsSystem) && a.IsDelete == Common.NoDelete)
                        .OrderByDescending(a => a.FsgroupId).ToList();

                    if (response != null && response.Count > 0)
                    {
                        foreach (FsgroupParentSubfsgroup obj in response)
                        {
                            obj.SubFSGroup = new MasterSubfsgroup();
                            obj.SubFSGroup = stable.Where(a => a.SubFsgroupId == obj.SubFsgroupId).FirstOrDefault();

                            obj.FSGroup = new Fsgroup();
                            obj.FSGroup = otable.Where(a => a.FsgroupId == obj.FsgroupId).FirstOrDefault();

                            if (obj.FSGroup.IsSystem == Common.IsSystem)
                            {
                                obj.FSGroup.Interface = new FsgroupInterface();
                                obj.FSGroup.Interface = itable.Where(a => a.FsgroupId == obj.FSGroup.FsgroupId && a.OwnerId.ToUpper() == OwnerId.ToUpper()
                                && a.IsDelete == Common.NoDelete).FirstOrDefault();
                                obj.FSGroup.IsInterface = obj.FSGroup.Interface != null ? obj.FSGroup.Interface.IsActive == "Yes" ? "Yes" : "No" : "No";
                            }
                            else
                                obj.FSGroup.IsInterface = "No";
                        }
                    }
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
