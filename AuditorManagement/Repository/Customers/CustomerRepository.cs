using Models;
using Models.Master;
using Models.Models;
using Repository.Systems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace Repository
{
    public class CustomerRepository : IMauchlyCore.IMauchlyRepository<Customer, AuditDataContext>
    {
        public List<Customer> Get(string OwnerId)
        {
            try
            {
                List<Customer> response = new List<Customer>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<Customer>();
                    response = otable.Where(a => a.OwnerId.ToUpper() == OwnerId.ToUpper() && a.IsDelete == Common.NoDelete)
                        .OrderByDescending(a => a.UpdatedOn).ToList();

                    if (response != null && response.Count > 0)
                    {
                        var dtable = context.Set<Parametermodel>();
                        var btable = context.Set<Branch>();
                        var atable = context.Set<CustomerAssign>();
                        var ctable = context.Set<CustomerContract>();
                        foreach (Customer obj in response)
                        {
                            obj.ParamModel = new Parametermodel();
                            obj.ParamModel = dtable.Where(a => a.Code == obj.Model).FirstOrDefault();

                            obj.Branch = new Branch();
                            obj.Branch = btable.Where(a => a.BranchId == obj.BranchId).FirstOrDefault();

                            obj.Assigns = new List<CustomerAssign>();
                            obj.Assigns = atable.Where(a => a.CustomerId.ToUpper() == obj.CustomerId.ToUpper()).ToList();

                            obj.Contracts = new List<CustomerContract>(0);
                            obj.Contracts = ctable.Where(a => a.CustomerId.ToUpper() == obj.CustomerId.ToUpper()).ToList();
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

        public List<Customer> Get(string OwnerId, string BranchId)
        {
            try
            {
                List<Customer> response = new List<Customer>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<Customer>();
                    response = otable.Where(a => a.OwnerId.ToUpper() == OwnerId.ToUpper() && a.BranchId.ToUpper() == BranchId.ToUpper() && a.IsDelete == Common.NoDelete)
                        .OrderByDescending(a => a.UpdatedOn).ToList();

                    if (response != null && response.Count > 0)
                    {
                        var dtable = context.Set<Parametermodel>();
                        var btable = context.Set<Branch>();
                        var atable = context.Set<CustomerAssign>();
                        var ctable = context.Set<CustomerContract>();
                        foreach (Customer obj in response)
                        {
                            obj.ParamModel = new Parametermodel();
                            obj.ParamModel = dtable.Where(a => a.Code == obj.Model).FirstOrDefault();

                            obj.Branch = new Branch();
                            obj.Branch = btable.Where(a => a.BranchId == obj.BranchId).FirstOrDefault();

                            obj.Assigns = new List<CustomerAssign>();
                            obj.Assigns = atable.Where(a => a.CustomerId.ToUpper() == obj.CustomerId.ToUpper()).ToList();

                            obj.Contracts = new List<CustomerContract>(0);
                            obj.Contracts = ctable.Where(a => a.CustomerId.ToUpper() == obj.CustomerId.ToUpper()).ToList();
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

        public List<Customer> Get(string OwnerId, string BranchId,string EmpId)
        {
            try
            {
                List<Customer> response = new List<Customer>();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var astable = context.Set<CustomerAssign>();
                    List<CustomerAssign> assign = new List<CustomerAssign>();
                    assign = astable.Where(a => a.EmpId == EmpId && a.IsDelete == Common.NoDelete).ToList();
                    string[] assignarry = assign.ConvertAll(a => a.CustomerId).ToArray();

                    var otable = context.Set<Customer>();
                    response = otable.Where(a => assignarry.Contains(a.CustomerId) &&
                    a.OwnerId.ToUpper() == OwnerId.ToUpper() && a.BranchId.ToUpper() == BranchId.ToUpper() && a.IsDelete == Common.NoDelete)
                        .OrderByDescending(a => a.UpdatedOn).ToList();

                    if (response != null && response.Count > 0)
                    {
                        var dtable = context.Set<Parametermodel>();
                        var btable = context.Set<Branch>();
                        var atable = context.Set<CustomerAssign>();
                        var ctable = context.Set<CustomerContract>();
                        foreach (Customer obj in response)
                        {
                            obj.ParamModel = new Parametermodel();
                            obj.ParamModel = dtable.Where(a => a.Code == obj.Model).FirstOrDefault();

                            obj.Branch = new Branch();
                            obj.Branch = btable.Where(a => a.BranchId == obj.BranchId).FirstOrDefault();

                            obj.Assigns = new List<CustomerAssign>();
                            obj.Assigns = atable.Where(a => a.CustomerId.ToUpper() == obj.CustomerId.ToUpper()).ToList();

                            obj.Contracts = new List<CustomerContract>(0);
                            obj.Contracts = ctable.Where(a => a.CustomerId.ToUpper() == obj.CustomerId.ToUpper()).ToList();
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

        public Customer GetWithKey(string OwnerId, string BranchId, string CustomerId)
        {
            try
            {
                Customer response = new Customer();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<Customer>();
                    response = otable.Where(a => a.OwnerId.ToUpper() == OwnerId.ToUpper() && a.BranchId.ToUpper() == BranchId.ToUpper()
                    && a.CustomerId.ToUpper() == CustomerId.ToUpper() && a.IsDelete == Common.NoDelete).FirstOrDefault();

                    if (response != null)
                    {
                        var dtable = context.Set<Parametermodel>();
                        var btable = context.Set<Branch>();
                        var atable = context.Set<CustomerAssign>();
                        var ctable = context.Set<CustomerContract>();
                        var etable = context.Set<Employee>();
                        var utable = context.Set<User>();
                        var ptable = context.Set<VUserspermission>();
                        response.ParamModel = new Parametermodel();
                        response.ParamModel = dtable.Where(a => a.Code == response.Model).FirstOrDefault();

                        response.Branch = new Branch();
                        response.Branch = btable.Where(a => a.BranchId == response.BranchId).FirstOrDefault();

                        response.Assigns = new List<CustomerAssign>();
                        response.Assigns = atable.Where(a => a.CustomerId.ToUpper() == response.CustomerId.ToUpper() && a.IsDelete == Common.NoDelete).ToList();

                        foreach (CustomerAssign obj in response.Assigns)
                        {
                            obj.EmployeeData = new Employee();
                            obj.EmployeeData = etable.Where(a => a.EmpId.ToUpper() == obj.EmpId.ToUpper()).FirstOrDefault();

                            User UserData = new User();
                            UserData = utable.Where(a => a.EmpId.ToUpper() == obj.EmpId.ToUpper()).FirstOrDefault();

                            VUserspermission PermissionData = new VUserspermission();
                            PermissionData = ptable.Where(a => a.UserId.ToUpper() == UserData.UserId.ToUpper()).FirstOrDefault();

                            if (PermissionData != null)
                            {
                                obj.PermissionCode = PermissionData.Code;
                                obj.PermissionName = PermissionData.Name;
                            }
                        }

                        response.Contracts = new List<CustomerContract>(0);
                        response.Contracts = ctable.Where(a => a.CustomerId.ToUpper() == response.CustomerId.ToUpper() && a.IsDelete == Common.NoDelete).ToList();
                    }
                }
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Customer GetWithKey( string CustomerId)
        {
            try
            {
                Customer response = new Customer();
                using (AuditDataContext context = new AuditDataContext())
                {
                    var otable = context.Set<Customer>();
                    response = otable.Where(a => a.CustomerId.ToUpper() == CustomerId.ToUpper() && a.IsDelete == Common.NoDelete).FirstOrDefault();

                    if (response != null)
                    {
                        var dtable = context.Set<Parametermodel>();
                        var btable = context.Set<Branch>();
                        var atable = context.Set<CustomerAssign>();
                        var ctable = context.Set<CustomerContract>();
                        var etable = context.Set<Employee>();
                        var utable = context.Set<User>();
                        var ptable = context.Set<VUserspermission>();
                        response.ParamModel = new Parametermodel();
                        response.ParamModel = dtable.Where(a => a.Code == response.Model).FirstOrDefault();

                        response.Branch = new Branch();
                        response.Branch = btable.Where(a => a.BranchId == response.BranchId).FirstOrDefault();

                        response.Assigns = new List<CustomerAssign>();
                        response.Assigns = atable.Where(a => a.CustomerId.ToUpper() == response.CustomerId.ToUpper() && a.IsDelete == Common.NoDelete).ToList();

                        foreach (CustomerAssign obj in response.Assigns)
                        {
                            obj.EmployeeData = new Employee();
                            obj.EmployeeData = etable.Where(a => a.EmpId.ToUpper() == obj.EmpId.ToUpper()).FirstOrDefault();

                            User UserData = new User();
                            UserData = utable.Where(a => a.EmpId.ToUpper() == obj.EmpId.ToUpper()).FirstOrDefault();

                            VUserspermission PermissionData = new VUserspermission();
                            PermissionData = ptable.Where(a => a.UserId.ToUpper() == UserData.UserId.ToUpper()).FirstOrDefault();

                            if (PermissionData != null)
                            {
                                obj.PermissionCode = PermissionData.Code;
                                obj.PermissionName = PermissionData.Name;
                            }
                        }

                        response.Contracts = new List<CustomerContract>(0);
                        response.Contracts = ctable.Where(a => a.CustomerId.ToUpper() == response.CustomerId.ToUpper() && a.IsDelete == Common.NoDelete).ToList();
                    }
                }
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public Customer Save(Customer input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Customer>();
                        if (string.IsNullOrEmpty(input.CustomerId))
                        {
                            PrefixRepository PrefixRepository = new PrefixRepository();
                            input.CustomerId = Guid.NewGuid().ToString().ToUpper();
                            input.CustomerCode = PrefixRepository.GetCustumerCode(context, input.UpdateBy);
                            input.IsActive = input.IsActive;
                            input.IsDelete = Common.NoDelete;
                            input.CreatedBy = input.UpdateBy;
                            input.CreatedOn = input.UpdatedOn;
                            context.Add(input);
                            context.SaveChanges();
                        }
                        else
                        {
                            Customer val = otable.Where(a => a.CustomerId == input.CustomerId).FirstOrDefault();
                            if (val == null)
                                throw new Exception("ไม่พบข้อมูล ลูกค้า ในระบบ");

                            val.CustomerCode = input.CustomerCode;
                            val.Name = input.Name;
                            val.NameEn = input.NameEn;
                            val.Type = input.Type;
                            val.Model = input.Model;
                            val.TaxId = input.TaxId;
                            val.NumberOfShare = input.NumberOfShare;
                            val.RegisteredCapital = input.RegisteredCapital;
                            val.RegisterDate = input.RegisterDate;
                            val.DirectorName = input.DirectorName;
                            val.Address = input.Address;
                            val.AddressEn = input.AddressEn;
                            val.Amphur = input.Amphur;
                            val.AmphurEn = input.AmphurEn;
                            val.Tambol = input.Tambol;
                            val.TambolEn = input.TambolEn;
                            val.Province = input.Province;
                            val.ProvinceEn = input.ProvinceEn;
                            val.PostCode = input.PostCode;
                            val.PostCodeEn = input.PostCodeEn;
                            val.ContractName = input.ContractName;
                            val.ContractPosition = input.ContractPosition;
                            val.ContractMobile = input.ContractMobile;
                            val.ContractMobile1 = input.ContractMobile1;
                            val.ContractEmail = input.ContractEmail;
                            val.Telephone = input.Telephone;
                            val.MobilePhone = input.MobilePhone;
                            val.FaxPhone = input.FaxPhone;
                            val.WebSite = input.WebSite;
                            val.Email = input.Email;
                            val.Description = input.Description;
                            val.Remark = input.Remark;
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

        public Customer Delete(Customer input)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted }))
                {
                    using (AuditDataContext context = new AuditDataContext())
                    {
                        var otable = context.Set<Customer>();
                        Customer val = otable.Where(a => a.CustomerId == input.CustomerId).FirstOrDefault();
                        if (val == null)
                            throw new Exception("ไม่พบข้อมูล สำนักงาน ในระบบ");

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
