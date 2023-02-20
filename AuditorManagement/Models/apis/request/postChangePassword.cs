using System;
using System.Collections.Generic;
using System.Text;

namespace Models.apis.request
{
    public class postChangePassword
    {
        public string BeforePassword { get; set; }
        public string Password { get; set; }
    }
}
