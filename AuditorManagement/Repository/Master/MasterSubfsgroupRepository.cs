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
    public class MasterSubfsgroupRepository : IMauchlyCore.IMauchlyRepository<MasterSubfsgroup, AuditDataContext>
    {
        public List<MasterSubfsgroup> Get(string OwnerId)
        {
            try
            {
                List<MasterSubfsgroup> response = new List<MasterSubfsgroup>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<MasterSubfsgroup>();
                    response = otable.Where(a => (a.OwnerId.ToUpper() == OwnerId.ToUpper() || a.IsSystem == Common.IsSystem) && a.IsDelete == Common.NoDelete)
                        .OrderByDescending(a => a.UpdatedOn).ToList();
                }
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public MasterSubfsgroup SaveAdmin(MasterSubfsgroup input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<MasterSubfsgroup>();
                        if (!input.SubFsgroupId.HasValue)
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
                            MasterSubfsgroup val = otable.Where(a => a.SubFsgroupId == input.SubFsgroupId).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล Sub FS Group ในระบบ");

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

        public MasterSubfsgroup Save(MasterSubfsgroup input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<MasterSubfsgroup>();
                        if (!input.SubFsgroupId.HasValue)
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
                            MasterSubfsgroup val = otable.Where(a => a.SubFsgroupId == input.SubFsgroupId).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล Sub FS Group ในระบบ");

                            val.Sequence = input.Sequence;
                            val.Code = input.Code;
                            val.Name = input.Name;
                            val.NameEn = input.NameEn;
                            val.UpdatedOn = input.UpdatedOn;
                            val.UpdateBy = input.UpdateBy;
                            val.IsActive = input.IsActive;
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

        public MasterSubfsgroup Disabled(MasterSubfsgroup input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<MasterSubfsgroup>();
                        MasterSubfsgroup val = otable.Where(a => a.SubFsgroupId == input.SubFsgroupId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล Sub FS Group ในระบบ");

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

        public MasterSubfsgroup DeleteOwner(MasterSubfsgroup input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<MasterSubfsgroup>();
                        MasterSubfsgroup val = otable.Where(a => a.SubFsgroupId == input.SubFsgroupId && a.OwnerId.ToUpper() == input.OwnerId.ToUpper()).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล Sub FS Group ในระบบ");

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

        public MasterSubfsgroup Delete(MasterSubfsgroup input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<MasterSubfsgroup>();
                        MasterSubfsgroup val = otable.Where(a => a.SubFsgroupId == input.SubFsgroupId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล Sub FS Group ในระบบ");

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
