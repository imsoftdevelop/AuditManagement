using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebBackEnd.Utility
{
    public class Abstract
    {
        public enum ResponseCode : int
        {
            SuccessTransaction = 200,
            NotFoundTransaction = 202,
            ErrorTransaction = 400,
            TimeoutTransaction = 501,
            InternalServerError = 500
        }

        public enum Permision : int
        {
            Owner = 1,
            Account = 2,
            Manager = 3,
            Employee = 4
        }
    }
}
