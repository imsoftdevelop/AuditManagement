using Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Repository.Systems
{
    public class PrefixRepository : IMauchlyCore.IMauchlyRepository<Employee, AuditDataContext>
    {
        public enum Code
        {
            E,  //Employee
            BRH, //Branch
            CUS, //ISWC
            REQF,
            DOC,
            PAC,
            AJM,
            POLICY,
            REFDOC,
            REFISS,
            REFCON,
            REFNOTEFS
        }
        public string GetEmployeeCode(AuditDataContext context, string UserID)
        {
            try
            {
                int pid;
                string res = string.Empty;
                string key = Code.E.ToString();

                var ptable = context.Set<Prefix>();
                Prefix prefix = ptable.Where(a => a.Prefixs == key && a.Year == DateTime.Now.Year).FirstOrDefault();

                if (prefix != null)
                {
                    prefix.Sequence = pid = prefix.Sequence.Value + 1;
                    prefix.UpdatedOn = DateTime.Now;
                    prefix.UpdateBy = UserID;
                    context.SaveChanges();
                }
                else
                {
                    prefix = new Prefix()
                    {
                        Prefixs = key,
                        Year = DateTime.Now.Year,
                        Sequence = pid = 1,
                        CreatedBy = UserID,
                        CreatedOn = DateTime.Now,
                        UpdateBy = UserID,
                        UpdatedOn = DateTime.Now
                    };
                    ptable.Add(prefix);
                    context.SaveChanges();
                }

                res = RandomID(key, pid);
                return res;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string GetBranchCode(AuditDataContext context, string UserID)
        {
            try
            {
                int pid;
                string res = string.Empty;
                string key = Code.BRH.ToString();

                var ptable = context.Set<Prefix>();
                Prefix prefix = ptable.Where(a => a.Prefixs == key && a.Year == DateTime.Now.Year).FirstOrDefault();

                if (prefix != null)
                {
                    prefix.Sequence = pid = prefix.Sequence.Value + 1;
                    prefix.UpdatedOn = DateTime.Now;
                    prefix.UpdateBy = UserID;
                    context.SaveChanges();
                }
                else
                {
                    prefix = new Prefix()
                    {
                        Prefixs = key,
                        Year = DateTime.Now.Year,
                        Sequence = pid = 1,
                        CreatedBy = UserID,
                        CreatedOn = DateTime.Now,
                        UpdateBy = UserID,
                        UpdatedOn = DateTime.Now
                    };
                    ptable.Add(prefix);
                    context.SaveChanges();
                }

                res = RandomID(key, pid);
                return res;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string GetCustumerCode(AuditDataContext context, string UserID)
        {
            try
            {
                int pid;
                string res = string.Empty;
                string key = Code.CUS.ToString();

                var ptable = context.Set<Prefix>();
                Prefix prefix = ptable.Where(a => a.Prefixs == key && a.Year == DateTime.Now.Year).FirstOrDefault();

                if (prefix != null)
                {
                    prefix.Sequence = pid = prefix.Sequence.Value + 1;
                    prefix.UpdatedOn = DateTime.Now;
                    prefix.UpdateBy = UserID;
                    context.SaveChanges();
                }
                else
                {
                    prefix = new Prefix()
                    {
                        Prefixs = key,
                        Year = DateTime.Now.Year,
                        Sequence = pid = 1,
                        CreatedBy = UserID,
                        CreatedOn = DateTime.Now,
                        UpdateBy = UserID,
                        UpdatedOn = DateTime.Now
                    };
                    ptable.Add(prefix);
                    context.SaveChanges();
                }

                res = RandomID(key, pid);
                return res;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string GetReqeustCode(AuditDataContext context, string UserID)
        {
            try
            {
                int pid;
                string res = string.Empty;
                string key = Code.REQF.ToString();

                var ptable = context.Set<Prefix>();
                Prefix prefix = ptable.Where(a => a.Prefixs == key && a.Year == DateTime.Now.Year).FirstOrDefault();

                if (prefix != null)
                {
                    prefix.Sequence = pid = prefix.Sequence.Value + 1;
                    prefix.UpdatedOn = DateTime.Now;
                    prefix.UpdateBy = UserID;
                    context.SaveChanges();
                }
                else
                {
                    prefix = new Prefix()
                    {
                        Prefixs = key,
                        Year = DateTime.Now.Year,
                        Sequence = pid = 1,
                        CreatedBy = UserID,
                        CreatedOn = DateTime.Now,
                        UpdateBy = UserID,
                        UpdatedOn = DateTime.Now
                    };
                    ptable.Add(prefix);
                    context.SaveChanges();
                }

                res = RandomID(key, pid);
                return res;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string GetDocumentCode(AuditDataContext context, string UserID)
        {
            try
            {
                int pid;
                string res = string.Empty;
                string key = Code.DOC.ToString();

                var ptable = context.Set<Prefix>();
                Prefix prefix = ptable.Where(a => a.Prefixs == key && a.Year == DateTime.Now.Year).FirstOrDefault();

                if (prefix != null)
                {
                    prefix.Sequence = pid = prefix.Sequence.Value + 1;
                    prefix.UpdatedOn = DateTime.Now;
                    prefix.UpdateBy = UserID;
                    context.SaveChanges();
                }
                else
                {
                    prefix = new Prefix()
                    {
                        Prefixs = key,
                        Year = DateTime.Now.Year,
                        Sequence = pid = 1,
                        CreatedBy = UserID,
                        CreatedOn = DateTime.Now,
                        UpdateBy = UserID,
                        UpdatedOn = DateTime.Now
                    };
                    ptable.Add(prefix);
                    context.SaveChanges();
                }

                res = RandomID(key, pid);
                return res;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string GetAccountPeriodCode(AuditDataContext context, string UserID)
        {
            try
            {
                int pid;
                string res = string.Empty;
                string key = Code.PAC.ToString();

                var ptable = context.Set<Prefix>();
                Prefix prefix = ptable.Where(a => a.Prefixs == key && a.Year == DateTime.Now.Year).FirstOrDefault();

                if (prefix != null)
                {
                    prefix.Sequence = pid = prefix.Sequence.Value + 1;
                    prefix.UpdatedOn = DateTime.Now;
                    prefix.UpdateBy = UserID;
                    context.SaveChanges();
                }
                else
                {
                    prefix = new Prefix()
                    {
                        Prefixs = key,
                        Year = DateTime.Now.Year,
                        Sequence = pid = 1,
                        CreatedBy = UserID,
                        CreatedOn = DateTime.Now,
                        UpdateBy = UserID,
                        UpdatedOn = DateTime.Now
                    };
                    ptable.Add(prefix);
                    context.SaveChanges();
                }

                res = RandomID(key, pid);
                return res;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string GetAccountAdjustment(AuditDataContext context, string UserID)
        {
            try
            {
                int pid;
                string res = string.Empty;
                string key = Code.AJM.ToString();

                var ptable = context.Set<Prefix>();
                Prefix prefix = ptable.Where(a => a.Prefixs == key && a.Year == DateTime.Now.Year).FirstOrDefault();

                if (prefix != null)
                {
                    prefix.Sequence = pid = prefix.Sequence.Value + 1;
                    prefix.UpdatedOn = DateTime.Now;
                    prefix.UpdateBy = UserID;
                    context.SaveChanges();
                }
                else
                {
                    prefix = new Prefix()
                    {
                        Prefixs = key,
                        Year = DateTime.Now.Year,
                        Sequence = pid = 1,
                        CreatedBy = UserID,
                        CreatedOn = DateTime.Now,
                        UpdateBy = UserID,
                        UpdatedOn = DateTime.Now
                    };
                    ptable.Add(prefix);
                    context.SaveChanges();
                }

                res = RandomID(key, pid);
                return res;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public string GetAccountPolicy(AuditDataContext context, string UserID)
        {
            try
            {
                int pid;
                string res = string.Empty;
                string key = Code.POLICY.ToString();

                var ptable = context.Set<Prefix>();
                Prefix prefix = ptable.Where(a => a.Prefixs == key && a.Year == DateTime.Now.Year).FirstOrDefault();

                if (prefix != null)
                {
                    prefix.Sequence = pid = prefix.Sequence.Value + 1;
                    prefix.UpdatedOn = DateTime.Now;
                    prefix.UpdateBy = UserID;
                    context.SaveChanges();
                }
                else
                {
                    prefix = new Prefix()
                    {
                        Prefixs = key,
                        Year = DateTime.Now.Year,
                        Sequence = pid = 1,
                        CreatedBy = UserID,
                        CreatedOn = DateTime.Now,
                        UpdateBy = UserID,
                        UpdatedOn = DateTime.Now
                    };
                    ptable.Add(prefix);
                    context.SaveChanges();
                }

                res = RandomID(key, pid);
                return res;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public string GetDocumentRefAudit(AuditDataContext context, string UserID)
        {
            try
            {
                int pid;
                string res = string.Empty;
                string key = Code.REFDOC.ToString();

                var ptable = context.Set<Prefix>();
                Prefix prefix = ptable.Where(a => a.Prefixs == key && a.Year == DateTime.Now.Year).FirstOrDefault();

                if (prefix != null)
                {
                    prefix.Sequence = pid = prefix.Sequence.Value + 1;
                    prefix.UpdatedOn = DateTime.Now;
                    prefix.UpdateBy = UserID;
                    context.SaveChanges();
                }
                else
                {
                    prefix = new Prefix()
                    {
                        Prefixs = key,
                        Year = DateTime.Now.Year,
                        Sequence = pid = 1,
                        CreatedBy = UserID,
                        CreatedOn = DateTime.Now,
                        UpdateBy = UserID,
                        UpdatedOn = DateTime.Now
                    };
                    ptable.Add(prefix);
                    context.SaveChanges();
                }

                res = RandomID(key, pid);
                return res;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public string GetDocumentRefIssue(AuditDataContext context, string UserID)
        {
            try
            {
                int pid;
                string res = string.Empty;
                string key = Code.REFISS.ToString();

                var ptable = context.Set<Prefix>();
                Prefix prefix = ptable.Where(a => a.Prefixs == key && a.Year == DateTime.Now.Year).FirstOrDefault();

                if (prefix != null)
                {
                    prefix.Sequence = pid = prefix.Sequence.Value + 1;
                    prefix.UpdatedOn = DateTime.Now;
                    prefix.UpdateBy = UserID;
                    context.SaveChanges();
                }
                else
                {
                    prefix = new Prefix()
                    {
                        Prefixs = key,
                        Year = DateTime.Now.Year,
                        Sequence = pid = 1,
                        CreatedBy = UserID,
                        CreatedOn = DateTime.Now,
                        UpdateBy = UserID,
                        UpdatedOn = DateTime.Now
                    };
                    ptable.Add(prefix);
                    context.SaveChanges();
                }

                res = RandomID(key, pid);
                return res;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string GetAllRefcode(string Prefix,AuditDataContext context, string UserID)
        {
            try
            {
                int pid;
                string res = string.Empty;
                string key = Prefix;

                var ptable = context.Set<Prefix>();
                Prefix prefix = ptable.Where(a => a.Prefixs == key && a.Year == DateTime.Now.Year).FirstOrDefault();

                if (prefix != null)
                {
                    prefix.Sequence = pid = prefix.Sequence.Value + 1;
                    prefix.UpdatedOn = DateTime.Now;
                    prefix.UpdateBy = UserID;
                    context.SaveChanges();
                }
                else
                {
                    prefix = new Prefix()
                    {
                        Prefixs = key,
                        Year = DateTime.Now.Year,
                        Sequence = pid = 1,
                        CreatedBy = UserID,
                        CreatedOn = DateTime.Now,
                        UpdateBy = UserID,
                        UpdatedOn = DateTime.Now
                    };
                    ptable.Add(prefix);
                    context.SaveChanges();
                }

                res = RandomID(key, pid);
                return res;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        private static Random random = new Random();
        public string RandomID(string PID, int sequence)
        {
            string alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            string randomtxt = new string(Enumerable.Repeat(alpha, 6).Select(s => s[random.Next(s.Length)]).ToArray());
            string id = string.Format("{0}{1}{2}{3}-{4}", PID, DateTime.Now.Year, DateTime.Now.Month.ToString().PadLeft(2, '0'), DateTime.Now.Day.ToString().PadLeft(2, '0'),
               sequence.ToString().PadLeft(5, '0'));
            return id;

        }
    }
}
