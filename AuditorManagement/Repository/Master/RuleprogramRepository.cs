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
    public class RuleprogramRepository : IMauchlyCore.IMauchlyRepository<Ruleprogram, AuditDataContext>
    {
        public List<Ruleprogram> GetAdmin()
        {
            try
            {
                List<Ruleprogram> response = new List<Ruleprogram>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<Ruleprogram>();
                    response = otable.Where(a => a.IsDelete == Common.NoDelete && a.IsSystem == Common.IsSystem).OrderBy(a => a.Sequence).ToList();
                    if (response != null && response.Count > 0)
                    {
                        var dtable = context.Set<RuleprogramDetail>();
                        foreach (Ruleprogram obj in response)
                        {
                            obj.RuleDetail = new List<RuleprogramDetail>();
                            obj.RuleDetail = dtable.Where(a => a.Ruleprogramid == obj.Ruleprogramid && a.IsDelete == Common.NoDelete).ToList();
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

        public List<Ruleprogram> Get(string OwnerId)
        {
            try
            {
                List<Ruleprogram> response = new List<Ruleprogram>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<Ruleprogram>();
                    response = otable.Where(a => (a.OwnerId.ToUpper() == OwnerId.ToUpper() || a.IsSystem == Common.IsSystem) && a.IsDelete == Common.NoDelete)
                     .OrderByDescending(a => a.UpdatedOn).ToList();
                    if (response != null && response.Count > 0)
                    {
                        var dtable = context.Set<RuleprogramDetail>();
                        foreach (Ruleprogram obj in response)
                        {
                            obj.RuleDetail = new List<RuleprogramDetail>();
                            obj.RuleDetail = dtable.Where(a => a.Ruleprogramid == obj.Ruleprogramid && a.IsDelete == Common.NoDelete).ToList();

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

        public Ruleprogram GetByKey(int val)
        {
            try
            {
                Ruleprogram response = new Ruleprogram();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<Ruleprogram>();
                    response = otable.Where(a => a.Ruleprogramid == val).FirstOrDefault();
                    if (response != null)
                    {
                        var dtable = context.Set<RuleprogramDetail>();
                        response.RuleDetail = new List<RuleprogramDetail>();
                        response.RuleDetail = dtable.Where(a => a.Ruleprogramid == response.Ruleprogramid && a.IsDelete == Common.NoDelete).OrderBy(a => a.Sequence).ToList();
                    }
                }
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Ruleprogram SaveAdmin(Ruleprogram input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Ruleprogram>();
                        if (!input.Ruleprogramid.HasValue)
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

                            if (input.RuleDetail != null && input.RuleDetail.Count > 0)
                            {
                                int i = 1;
                                var dtable = context.Set<RuleprogramDetail>();
                                foreach (RuleprogramDetail obj in input.RuleDetail)
                                {
                                    obj.Ruleprogramid = input.Ruleprogramid.Value;
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
                            Ruleprogram val = otable.Where(a => a.Ruleprogramid == input.Ruleprogramid).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล Rule Program ในระบบ");

                            val.Code = input.Code;
                            val.Name = input.Name;
                            val.NameEn = input.NameEn;
                            val.IsActive = input.IsActive;
                            val.UpdatedOn = input.UpdatedOn;
                            val.UpdateBy = input.UpdateBy;

                            if (input.RuleDetail != null && input.RuleDetail.Count > 0)
                            {
                                var dtable = context.Set<RuleprogramDetail>();
                                foreach (RuleprogramDetail obj in input.RuleDetail)
                                {
                                    RuleprogramDetail lastseq = dtable.Where(a => a.Ruleprogramid == input.Ruleprogramid).OrderByDescending(a => a.Sequence).FirstOrDefault();
                                    if (!obj.RuleprogramDetailid.HasValue)
                                    {
                                        obj.Ruleprogramid = input.Ruleprogramid;
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
                                        RuleprogramDetail detail = dtable.Where(a => a.Ruleprogramid == input.Ruleprogramid && a.RuleprogramDetailid == obj.RuleprogramDetailid).FirstOrDefault();
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

        public Ruleprogram Save(Ruleprogram input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Ruleprogram>();
                        if (!input.Ruleprogramid.HasValue)
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

                            if (input.RuleDetail != null && input.RuleDetail.Count > 0)
                            {
                                int i = 1;
                                var dtable = context.Set<RuleprogramDetail>();
                                foreach (RuleprogramDetail obj in input.RuleDetail)
                                {
                                    obj.Ruleprogramid = input.Ruleprogramid;
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
                            Ruleprogram val = otable.Where(a => a.Ruleprogramid == input.Ruleprogramid && a.OwnerId == input.OwnerId).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล Rule Program ในระบบ");

                            val.Code = input.Code;
                            val.Name = input.Name;
                            val.NameEn = input.NameEn;
                            val.IsActive = input.IsActive;
                            val.UpdatedOn = input.UpdatedOn;
                            val.UpdateBy = input.UpdateBy;

                            if (input.RuleDetail != null && input.RuleDetail.Count > 0)
                            {
                                var dtable = context.Set<RuleprogramDetail>();
                                foreach (RuleprogramDetail obj in input.RuleDetail)
                                {
                                    RuleprogramDetail lastseq = dtable.Where(a => a.Ruleprogramid == input.Ruleprogramid).OrderByDescending(a => a.Sequence).FirstOrDefault();
                                    if (!obj.RuleprogramDetailid.HasValue)
                                    {
                                        obj.Ruleprogramid = input.Ruleprogramid;
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
                                        RuleprogramDetail detail = dtable.Where(a => a.Ruleprogramid == input.Ruleprogramid && a.RuleprogramDetailid == obj.RuleprogramDetailid).FirstOrDefault();
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

        public Ruleprogram DeleteOwner(Ruleprogram input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Ruleprogram>();
                        Ruleprogram val = otable.Where(a => a.Ruleprogramid == input.Ruleprogramid && a.OwnerId.ToUpper() == input.OwnerId.ToUpper()).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล Rule Program ในระบบ");

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

        public Ruleprogram Delete(Ruleprogram input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Ruleprogram>();
                        Ruleprogram val = otable.Where(a => a.Ruleprogramid == input.Ruleprogramid).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล Rule Program ในระบบ");

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
