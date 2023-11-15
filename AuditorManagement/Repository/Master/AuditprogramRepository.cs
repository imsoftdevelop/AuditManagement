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
    public class AuditprogramRepository : IMauchlyCore.IMauchlyRepository<Auditprogram, AuditDataContext>
    {
        public List<Auditprogram> GetAdmin()
        {
            try
            {
                List<Auditprogram> response = new List<Auditprogram>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<Auditprogram>();
                    response = otable.Where(a => a.IsDelete == Common.NoDelete && a.IsSystem == Common.IsSystem).OrderBy(a => a.Sequence).ToList();
                    if (response != null && response.Count > 0)
                    {
                        var dtable = context.Set<AuditprogramDetail>();
                        foreach (Auditprogram obj in response)
                        {
                            obj.AuditDetail = new List<AuditprogramDetail>();
                            obj.AuditDetail = dtable.Where(a => a.Auditprogramid == obj.Auditprogramid && a.IsDelete == Common.NoDelete).ToList();
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

        public List<Auditprogram> Get(string OwnerId)
        {
            try
            {
                List<Auditprogram> response = new List<Auditprogram>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<Auditprogram>();
                    response = otable.Where(a => (a.OwnerId.ToUpper() == OwnerId.ToUpper() || a.IsSystem == Common.IsSystem) && a.IsDelete == Common.NoDelete)
                     .OrderByDescending(a => a.UpdatedOn).ToList();
                    if (response != null && response.Count > 0)
                    {
                        var dtable = context.Set<AuditprogramDetail>();
                        var utable = context.Set<AuditprogramDetailUse>();
                        var ptable = context.Set<AccountPeriod>();
                        var ustable = context.Set<User>();
                        var etable = context.Set<Employee>();
                        foreach (Auditprogram obj in response)
                        {
                            obj.AuditDetail = new List<AuditprogramDetail>();
                            obj.AuditDetail = dtable.Where(a => a.Auditprogramid == obj.Auditprogramid && a.IsDelete == Common.NoDelete).ToList();

                            foreach (AuditprogramDetail detail in obj.AuditDetail)
                            {
                                detail.DetailUse = new List<AuditprogramDetailUse>();
                                detail.DetailUse = utable.Where(a => a.Auditprogramid == obj.Auditprogramid && a.AuditprogramDetailid == detail.AuditprogramDetailid).ToList();

                                foreach (AuditprogramDetailUse sub in detail.DetailUse)
                                {
                                    sub.PeriodName = ptable.Where(a => a.PeriodId == sub.PeriodId).FirstOrDefault().Name;
                                    User user = new User();
                                    user = ustable.Where(a => a.UserId == sub.CreatedBy).FirstOrDefault();

                                    sub.CreatedData = new Employee();
                                    sub.CreatedData = etable.Where(a => a.EmpId == user.EmpId).FirstOrDefault();
                                }
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

        public Auditprogram SaveAdmin(Auditprogram input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Auditprogram>();
                        if (!input.Auditprogramid.HasValue)
                        {
                            var seq = otable.OrderByDescending(a => a.Sequence).FirstOrDefault().Sequence;
                            input.Sequence = seq + 1;
                            input.IsActive = input.IsActive;
                            input.IsDelete = Common.NoDelete;
                            input.IsSystem = Common.IsSystem;
                            input.CreatedBy = input.UpdateBy;
                            input.CreatedOn = input.UpdatedOn;
                            context.Add(input);
                            context.SaveChanges();

                            if (input.AuditDetail != null && input.AuditDetail.Count > 0)
                            {
                                int i = 1;
                                var dtable = context.Set<AuditprogramDetail>();
                                foreach (AuditprogramDetail obj in input.AuditDetail)
                                {
                                    obj.Auditprogramid = input.Auditprogramid;
                                    obj.Sequence = i;
                                    obj.IsDelete = Common.NoDelete;
                                    obj.CreatedBy = input.CreatedBy;
                                    obj.CreatedOn = input.CreatedOn;
                                    dtable.Add(obj);
                                    context.SaveChanges();
                                    i++;
                                }
                            }
                        }
                        else
                        {
                            Auditprogram val = otable.Where(a => a.Auditprogramid == input.Auditprogramid).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล Audit Program ในระบบ");

                            val.Code = input.Code;
                            val.Name = input.Name;
                            val.NameEn = input.NameEn;
                            val.IsActive = input.IsActive;
                            val.UpdatedOn = input.UpdatedOn;
                            val.UpdateBy = input.UpdateBy;

                            if (input.AuditDetail != null && input.AuditDetail.Count > 0)
                            {
                                var dtable = context.Set<AuditprogramDetail>();
                                foreach (AuditprogramDetail obj in input.AuditDetail)
                                {
                                    AuditprogramDetail lastseq = dtable.Where(a => a.Auditprogramid == input.Auditprogramid).OrderByDescending(a => a.Sequence).FirstOrDefault();
                                    if (!obj.AuditprogramDetailid.HasValue)
                                    {
                                        obj.Auditprogramid = input.Auditprogramid;
                                        obj.Sequence = lastseq != null ? lastseq.Sequence + 1 : 1;
                                        obj.IsDelete = Common.NoDelete;
                                        obj.CreatedBy = input.UpdateBy;
                                        obj.CreatedOn = input.UpdatedOn;
                                        obj.UpdatedOn = input.UpdatedOn;
                                        obj.UpdateBy = input.UpdateBy;
                                        dtable.Add(obj);
                                      
                                    }
                                    else
                                    {
                                        AuditprogramDetail detail = dtable.Where(a => a.Auditprogramid == input.Auditprogramid && a.AuditprogramDetailid == obj.AuditprogramDetailid).FirstOrDefault();
                                        if (detail != null)
                                        {
                                            detail.Name = obj.Name;
                                            detail.NameEn = obj.NameEn;
                                            detail.UpdatedOn = input.UpdatedOn;
                                            detail.UpdateBy = input.UpdateBy;
                                            detail.IsDelete = obj.IsDelete;
                                        }
                                    }
                                    context.SaveChanges();
                                }
                            }

                            input = val;
                        }
                        context.SaveChanges();
                    }
                    scope.Complete();
                }

                return input;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Auditprogram Save(Auditprogram input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Auditprogram>();
                        if (!input.Auditprogramid.HasValue)
                        {
                            var seq = otable.OrderByDescending(a => a.Sequence).FirstOrDefault();
                            input.Sequence = seq != null ? seq.Sequence.HasValue ? seq.Sequence.Value + 1 : 1 : 1;
                            input.IsActive = input.IsActive;
                            input.IsDelete = Common.NoDelete;
                            input.IsSystem = Common.NoSystem;
                            input.CreatedBy = input.UpdateBy;
                            input.CreatedOn = input.UpdatedOn;
                            context.Add(input);
                            context.SaveChanges();

                            if (input.AuditDetail != null && input.AuditDetail.Count > 0)
                            {
                                int i = 1;
                                var dtable = context.Set<AuditprogramDetail>();
                                foreach (AuditprogramDetail obj in input.AuditDetail)
                                {
                                    obj.Auditprogramid = input.Auditprogramid;
                                    obj.Sequence = i;
                                    obj.IsDelete = Common.NoDelete;
                                    obj.CreatedBy = input.CreatedBy;
                                    obj.CreatedOn = input.CreatedOn;
                                    dtable.Add(obj);
                                    context.SaveChanges();
                                    i++;
                                }
                            }
                        }
                        else
                        {
                            Auditprogram val = otable.Where(a => a.Auditprogramid == input.Auditprogramid && a.OwnerId == input.OwnerId).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล Audit Program ในระบบ");

                            val.Code = input.Code;
                            val.Name = input.Name;
                            val.NameEn = input.NameEn;
                            val.IsActive = input.IsActive;
                            val.UpdatedOn = input.UpdatedOn;
                            val.UpdateBy = input.UpdateBy;

                            if (input.AuditDetail != null && input.AuditDetail.Count > 0)
                            {
                                var dtable = context.Set<AuditprogramDetail>();
                                foreach (AuditprogramDetail obj in input.AuditDetail)
                                {
                                    AuditprogramDetail lastseq = dtable.Where(a => a.Auditprogramid == input.Auditprogramid).OrderByDescending(a => a.Sequence).FirstOrDefault();
                                    if (!obj.AuditprogramDetailid.HasValue)
                                    {
                                        obj.Auditprogramid = input.Auditprogramid;
                                        obj.Sequence = lastseq != null ? lastseq.Sequence + 1 : 1;
                                        obj.IsDelete = Common.NoDelete;
                                        obj.CreatedBy = input.UpdateBy;
                                        obj.CreatedOn = input.UpdatedOn;
                                        obj.UpdatedOn = input.UpdatedOn;
                                        obj.UpdateBy = input.UpdateBy;
                                        dtable.Add(obj);

                                    }
                                    else
                                    {
                                        AuditprogramDetail detail = dtable.Where(a => a.Auditprogramid == input.Auditprogramid && a.AuditprogramDetailid == obj.AuditprogramDetailid).FirstOrDefault();
                                        if (detail != null)
                                        {
                                            detail.Name = obj.Name;
                                            detail.NameEn = obj.NameEn;
                                            detail.UpdatedOn = input.UpdatedOn;
                                            detail.UpdateBy = input.UpdateBy;
                                            detail.IsDelete = obj.IsDelete;
                                        }
                                    }
                                    context.SaveChanges();
                                }
                            }

                            input = val;
                        }
                        context.SaveChanges();
                    }
                    scope.Complete();
                }

                return input;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public Auditprogram DeleteOwner(Auditprogram input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Auditprogram>();
                        Auditprogram val = otable.Where(a => a.Auditprogramid == input.Auditprogramid && a.OwnerId.ToUpper() == input.OwnerId.ToUpper()).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล Audit Program ในระบบ");

                        val.IsDelete = Common.IsDelete;
                        val.UpdatedOn = input.UpdatedOn;
                        val.UpdateBy = input.UpdateBy;
                        input = val;
                        context.SaveChanges();
                    }
                    scope.Complete();
                }

                return input;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Auditprogram Delete(Auditprogram input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Auditprogram>();
                        Auditprogram val = otable.Where(a => a.Auditprogramid == input.Auditprogramid).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล Audit Program ในระบบ");

                        val.IsDelete = Common.IsDelete;
                        val.UpdatedOn = input.UpdatedOn;
                        val.UpdateBy = input.UpdateBy;
                        input = val;
                        context.SaveChanges();
                    }
                    scope.Complete();
                }

                return input;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
