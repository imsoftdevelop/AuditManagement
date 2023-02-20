using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebBackEnd
{
    public class AppSettings
    {
        public ConnectionStrings ConnectionStrings { get; set; }
        public string AllowedHosts { get; set; }
        public ConfigSystems ConfigSystem { get; set; }
        public RDService RDService { get; set; }
    }

    public class ConnectionStrings
    {
        public string SQLAPIDatabase { get; set; }
        public string MariaVersion { get; set; }
    }
    public class ConfigSystems
    {
        public string ImagePath { get; set; }
        public string UploadsPath { get; set; }
        public string SignaturePath { get; set; }
        public string BranchPath { get; set; }
        public string FilePath { get; set; }
        public string TempPath { get; set; }
        public string TemplatePath { get; set; }
        public string TrialTemplate { get; set; }
        public string TrialPreviousTemplate { get; set; }
    }

    public class RDService
    {
        public string vatPath { get; set; }
    }
}
