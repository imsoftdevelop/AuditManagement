using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WebBackEnd.Config
{
    public static class ApiConfigureServices
    {
        public static IConfiguration ConfigureAppSetting()
        {
            var configurationbuilder = new ConfigurationBuilder();
            var path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            configurationbuilder.AddJsonFile(path, false);
            return configurationbuilder.Build();
            

        }
    }
}
