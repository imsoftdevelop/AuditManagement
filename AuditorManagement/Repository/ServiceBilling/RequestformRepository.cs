using Models;
using Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using Repository.Systems;

namespace Repository
{
    public class RequestformRepository : IMauchlyCore.IMauchlyRepository<Requestform, AuditDataContext>
    {
        public Requestform Save(Requestform input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Requestform>();
                        if (!input.RequestKey.HasValue)
                        {
                            PrefixRepository PrefixRepository = new PrefixRepository();
                            input.RequestId = PrefixRepository.GetReqeustCode(context, input.UpdateBy);
                            input.Status = RequestformStatus.WaitingRequest;
                            input.RequestDate = DateTime.Now;
                            input.CreatedBy = input.UpdateBy;
                            input.CreatedOn = input.UpdatedOn;
                            context.Add(input);
                            context.SaveChanges();
                        }
                        else
                        {
                            Requestform val = otable.Where(a => a.RequestKey == input.RequestKey).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล คำร้องขอ ในระบบ");

                            val.Detail = input.Detail;
                            val.ContactName = input.ContactName;
                            val.ContactMobilePhone = input.ContactMobilePhone;
                            val.ContactEmail = input.ContactEmail;
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
        public VRequestform ChangeStatus(Requestform input)
        {
            try
            {
                VRequestform response = new VRequestform ();
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Requestform>();
                        Requestform val = otable.Where(a => a.RequestKey == input.RequestKey).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูลคำร้องในระบบ");

                        val.Status = input.Status;
                        val.ResponseMessage = input.ResponseMessage;
                        val.UpdatedOn = input.UpdatedOn;
                        val.UpdateBy = input.UpdateBy;

                        if ((val.Status == RequestformStatus.CompleteRequest || val.Status == RequestformStatus.CancelRequest) && string.IsNullOrEmpty(val.ApproveBy))
                        { 
                            val.ApproveOn  = input.UpdatedOn;
                            val.ApproveBy = input.UpdateBy;
                        }

                        context.SaveChanges();

                        var vtable = context.Set<VRequestform>();
                        response = vtable.Where(a => a.RequestKey == input.RequestKey).FirstOrDefault();
                    }
                    scope.Complete();
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
