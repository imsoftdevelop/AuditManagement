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
    public class MasterHourRateRepository : IMauchlyCore.IMauchlyRepository<MasterHourRate, AuditDataContext>
    {
        public MasterHourRate Get(string OwnerId)
        {
            try
            {
                MasterHourRate response = new MasterHourRate();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<MasterHourRate>();
                    response = otable.Where(a => a.OwnerId.ToUpper() == OwnerId.ToUpper()).FirstOrDefault();
                }
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public MasterHourRate Save(MasterHourRate input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<MasterHourRate>();
                        if (!input.HourId.HasValue)
                        {
                            input.CreatedBy = input.UpdateBy;
                            input.CreatedOn = input.UpdatedOn;
                            context.Add(input);
                            context.SaveChanges();
                        }
                        else
                        {
                            MasterHourRate val = otable.Where(a => a.OwnerId == input.OwnerId).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล HourRate ในระบบ");

                            val.AuditHour = input.AuditHour;
                            val.PrepareHour = input.PrepareHour;
                            val.ReviewHour = input.ReviewHour;
                            val.ManagerHour = input.ManagerHour;
                            val.Remark = input.Remark;
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
    }
}
