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
    public class AuditprogramFsgroupRepository : IMauchlyCore.IMauchlyRepository<AuditprogramFsgroup, AuditDataContext>
    {
        public void SaveAdmin(AuditprogramFsgroup input, string UserId)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AuditprogramFsgroup>();
                        AuditprogramFsgroup val = otable.Where(a => a.Auditprogramid == input.Auditprogramid).FirstOrDefault();
                        if (val == null)
                        {
                            input.CreatedBy = UserId;
                            input.CreatedOn = DateTime.Now;
                            input.UpdateBy = UserId;
                            input.UpdatedOn = DateTime.Now;
                            context.Add(input);
                            context.SaveChanges();
                        }
                        else
                        {
                            val.FsgroupId = input.FsgroupId;
                            val.UpdatedOn = DateTime.Now;
                            val.UpdateBy = UserId;
                        }
                        context.SaveChanges();
                    }
                    scope.Complete();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void Save(AuditprogramFsgroup input, string UserId)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<AuditprogramFsgroup>();
                        AuditprogramFsgroup val = otable.Where(a => a.Auditprogramid == input.Auditprogramid).FirstOrDefault();
                        if (val == null)
                        {
                            input.CreatedBy = UserId;
                            input.CreatedOn = DateTime.Now;
                            input.UpdateBy = UserId;
                            input.UpdatedOn = DateTime.Now;
                            context.Add(input);
                            context.SaveChanges();
                        }
                        else
                        {
                            val.FsgroupId = input.FsgroupId;
                            val.UpdatedOn = DateTime.Now;
                            val.UpdateBy = UserId;
                        }
                        context.SaveChanges();
                    }
                    scope.Complete();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<AuditprogramFsgroup> Get(string OwnerId)
        {
            try
            {
                List<AuditprogramFsgroup> response = new List<AuditprogramFsgroup>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<Fsgroup>();
                    var audtable = context.Set<AuditprogramDetail>();
                    var dtable = context.Set<AuditprogramFsgroup>();
                    var autable = context.Set<Auditprogram>();
                    response = dtable.Where(a => (a.OwnerId.ToUpper() == OwnerId.ToUpper() || OwnerId.ToUpper() == string.Empty) && a.FsgroupId.HasValue)
                        .OrderByDescending(a => a.FsgroupId).ToList();

                    if (response != null && response.Count > 0)
                    {
                        foreach (AuditprogramFsgroup obj in response)
                        {
                            obj.AuditPrograms = new Auditprogram();
                            obj.AuditPrograms = autable.Where(a => a.Auditprogramid == obj.Auditprogramid ).FirstOrDefault();

                            if (obj.AuditPrograms != null)
                            {
                                obj.AuditPrograms.AuditDetail = new List<AuditprogramDetail>();
                                obj.AuditPrograms.AuditDetail = audtable.Where(a => a.Auditprogramid == obj.AuditPrograms.Auditprogramid && a.IsDelete == Common.NoDelete).ToList();
                            }
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

        public List<AuditprogramFsgroup> Get(string OwnerId, int FSGroupId)
        {
            try
            {
                List<AuditprogramFsgroup> response = new List<AuditprogramFsgroup>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<Fsgroup>();
                    var audtable = context.Set<AuditprogramDetail>();
                    var dtable = context.Set<AuditprogramFsgroup>();
                    var autable = context.Set<Auditprogram>();
                    response = dtable.Where(a => (a.OwnerId.ToUpper() == OwnerId.ToUpper() || OwnerId.ToUpper() == string.Empty) && a.FsgroupId == FSGroupId)
                        .OrderByDescending(a => a.FsgroupId).ToList();

                    if (response != null && response.Count > 0)
                    {
                        foreach (AuditprogramFsgroup obj in response)
                        {
                            obj.AuditPrograms = new Auditprogram();
                            obj.AuditPrograms = autable.Where(a => a.Auditprogramid == obj.Auditprogramid).FirstOrDefault();

                            if (obj.AuditPrograms != null)
                            {
                                obj.AuditPrograms.AuditDetail = new List<AuditprogramDetail>();
                                obj.AuditPrograms.AuditDetail = audtable.Where(a => a.Auditprogramid == obj.AuditPrograms.Auditprogramid && a.IsDelete == Common.NoDelete).ToList();
                            }
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

        //public AuditprogramFsgroup Delete(AuditprogramFsgroup input)
        //{
        //    try
        //    {
        //        using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
        //        {
        //            using (AuditDataContext context = new AuditDataContext())
        //            {
        //                var otable = context.Set<AuditprogramFsgroup>();
        //                AuditprogramFsgroup val = otable.Where(a => a.SystemId == input.SystemId).FirstOrDefault();
        //                if (val == null)
        //                    throw new Exception("ไม่พบข้อมูล ความสัมพันธ์ Audit Program ในระบบ");

        //                val.IsDelete = Common.IsDelete;
        //                val.UpdatedOn = input.UpdatedOn;
        //                val.UpdateBy = input.UpdateBy;
        //                input = val;
        //                context.SaveChanges();
        //            }
        //            scope.Complete();
        //        }

        //        return input;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //}
    }
}
