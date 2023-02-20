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
    public class FsgroupRepository : IMauchlyCore.IMauchlyRepository<Fsgroup, AuditDataContext>
    {
        public Fsgroup SaveAdmin(Fsgroup input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Fsgroup>();
                        if (!input.FsgroupId.HasValue)
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
                        }
                        else
                        {
                            Fsgroup val = otable.Where(a => a.FsgroupId == input.FsgroupId).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล FS Group ในระบบ");

                            val.Code = input.Code;
                            val.Name = input.Name;
                            val.NameEn = input.NameEn;
                            val.IsActive = input.IsActive;
                            val.UpdatedOn = input.UpdatedOn;
                            val.UpdateBy = input.UpdateBy;
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

        public Fsgroup Save(Fsgroup input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Fsgroup>();
                        var itable = context.Set<FsgroupInterface>();
                        if (!input.FsgroupId.HasValue)
                        {
                            var seq = otable.Where(a => a.OwnerId == input.OwnerId).OrderByDescending(a => a.Sequence).FirstOrDefault();
                            input.Sequence = seq != null ? seq.Sequence.HasValue ? seq.Sequence.Value + 1 : 1 : 1;
                            input.IsActive = Common.IsActive;
                            input.IsDelete = Common.NoDelete;
                            input.IsSystem = Common.NoSystem;
                            input.CreatedBy = input.UpdateBy;
                            input.CreatedOn = input.UpdatedOn;
                            context.Add(input);
                            context.SaveChanges();
                        }
                        else
                        {
                            Fsgroup val = otable.Where(a => a.FsgroupId == input.FsgroupId).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล FS Group ในระบบ");

                            if (input.IsSystem == "No")
                            {
                                val.Sequence = input.Sequence;
                                val.Code = input.Code;
                                val.Name = input.Name;
                                val.NameEn = input.NameEn;
                                val.IsActive = input.IsActive;
                                val.UpdatedOn = input.UpdatedOn;
                                val.UpdateBy = input.UpdateBy;
                            }
                            else if (input.IsSystem == "Yes")
                            {
                                if (input.Interface != null)
                                {
                                    FsgroupInterface interfaces = itable.Where(a => a.FsgroupId == input.FsgroupId && a.OwnerId == input.OwnerId).FirstOrDefault();
                                    if (interfaces != null)
                                    {
                                        interfaces.Code = input.Interface.Code;
                                        interfaces.Name = input.Interface.Name;
                                        interfaces.NameEn = input.Interface.NameEn;
                                        interfaces.IsActive = input.Interface.IsActive;
                                        context.SaveChanges();
                                    }
                                    else
                                    {
                                        var seq = itable.Where(a => a.OwnerId == input.OwnerId).OrderByDescending(a => a.Sequence).FirstOrDefault();
                                        interfaces = new FsgroupInterface()
                                        {
                                            Sequence = seq != null ? seq.Sequence + 1 : 1,
                                            OwnerId = input.OwnerId,
                                            IsActive = Common.IsActive,
                                            IsDelete = Common.NoDelete,
                                            UpdatedOn = input.UpdatedOn,
                                            CreatedOn = input.UpdatedOn,
                                            UpdateBy = input.UpdateBy,
                                            CreatedBy = input.UpdateBy,
                                            Code = input.Interface.Code,
                                            Name = input.Interface.Name,
                                            NameEn = input.Interface.NameEn,
                                            FsgroupId = input.Interface.FsgroupId
                                        };
                                        itable.Add(interfaces);
                                        context.SaveChanges();
                                    }
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

        public Fsgroup Disabled(Fsgroup input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Fsgroup>();
                        Fsgroup val = otable.Where(a => a.FsgroupId == input.FsgroupId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล FS Group ในระบบ");

                        val.IsActive = Common.NoActive;
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

        public Fsgroup Delete(Fsgroup input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Fsgroup>();
                        Fsgroup val = otable.Where(a => a.FsgroupId == input.FsgroupId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล FS Group ในระบบ");

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

        public Fsgroup DeleteOwner(Fsgroup input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Fsgroup>();
                        Fsgroup val = otable.Where(a => a.FsgroupId == input.FsgroupId && a.OwnerId.ToUpper() == input.OwnerId.ToUpper()).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล FS Group ในระบบ");

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

        public List<Fsgroup> Get(string OwnerId)
        {
            try
            {
                List<Fsgroup> response = new List<Fsgroup>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<Fsgroup>();
                    var dtable = context.Set<FsgroupInterface>();
                    response = otable.Where(a => (a.OwnerId.ToUpper() == OwnerId.ToUpper() || a.IsSystem == Common.IsSystem) && a.IsDelete == Common.NoDelete)
                        .OrderByDescending(a => a.UpdatedOn).ToList();

                    if (response != null && response.Count > 0)
                    {
                        foreach (Fsgroup obj in response)
                        {
                            if (obj.IsSystem == Common.IsSystem)
                            {
                                obj.Interface = new FsgroupInterface();
                                obj.Interface = dtable.Where(a => a.FsgroupId == obj.FsgroupId && a.OwnerId.ToUpper() == OwnerId.ToUpper() && a.IsDelete == Common.NoDelete).FirstOrDefault();
                                obj.IsInterface = obj.Interface != null ? obj.Interface.IsActive == "Yes" ? "Yes" : "No" : "No";
                            }
                            else
                                obj.IsInterface = "No";
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

        public List<Fsgroup> Get(string OwnerId, AuditDataContext context)
        {
            try
            {
                List<Fsgroup> response = new List<Fsgroup>();
                var otable = context.Set<Fsgroup>();
                var dtable = context.Set<FsgroupInterface>();
                response = otable.Where(a => (a.OwnerId.ToUpper() == OwnerId.ToUpper() || a.IsSystem == Common.IsSystem) && a.IsDelete == Common.NoDelete)
                    .OrderByDescending(a => a.UpdatedOn).ToList();

                if (response != null && response.Count > 0)
                {
                    foreach (Fsgroup obj in response)
                    {
                        if (obj.IsSystem == Common.IsSystem)
                        {
                            obj.Interface = new FsgroupInterface();
                            obj.Interface = dtable.Where(a => a.FsgroupId == obj.FsgroupId && a.OwnerId.ToUpper() == OwnerId.ToUpper() && a.IsDelete == Common.NoDelete).FirstOrDefault();
                            obj.IsInterface = obj.Interface != null ? obj.Interface.IsActive == "Yes" ? "Yes" : "No" : "No";
                        }
                        else
                            obj.IsInterface = "No";
                    }
                }

                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Fsgroup> GetIsActive(string OwnerId)
        {
            try
            {
                List<Fsgroup> response = new List<Fsgroup>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<Fsgroup>();
                    var dtable = context.Set<FsgroupInterface>();
                    response = otable.Where(a => (a.OwnerId.ToUpper() == OwnerId.ToUpper() || a.IsSystem == Common.IsSystem) && a.IsActive == Common.IsActive && a.IsDelete == Common.NoDelete)
                        .OrderByDescending(a => a.UpdatedOn).ToList();

                    if (response != null && response.Count > 0)
                    {
                        foreach (Fsgroup obj in response)
                        {
                            if (obj.IsSystem == Common.IsSystem)
                            {
                                obj.Interface = new FsgroupInterface();
                                obj.Interface = dtable.Where(a => a.FsgroupId == obj.FsgroupId && a.OwnerId.ToUpper() == OwnerId.ToUpper()
                                && a.IsActive == Common.IsActive
                                && a.IsDelete == Common.NoDelete).FirstOrDefault();
                                if (obj.Interface != null)
                                {
                                    obj.Code = obj.Interface.Code;
                                    obj.Name = obj.Interface.Name;
                                }
                            }
                            else
                                obj.IsInterface = "No";
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
