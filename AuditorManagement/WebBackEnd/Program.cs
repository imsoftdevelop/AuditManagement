using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebBackEnd
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var connectionstring = Config.ApiConfigureServices.ConfigureAppSetting().GetConnectionString("SQLAPIDatabase");
            var Version = Config.ApiConfigureServices.ConfigureAppSetting().GetConnectionString("MariaVersion");
            AuditDataContext.ConnectionString = connectionstring;
            AuditDataContext.ConnectionVersion = Version;
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
