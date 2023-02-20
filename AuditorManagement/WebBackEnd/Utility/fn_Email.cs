using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace WebBackEnd.Utility
{
    public class fn_Email
    {
        public string smtp { get; set; }
        public int port { get; set; }
        public string mailfrom { get; set; }
        public string mailname { get; set; }
        public string mailinfo { get; set; }
        public string password { get; set; }
        public string mailto { get; set; }
        public string mailcc { get; set; }
        public string path { get; set; }
        public string subject { get; set; }
        public string message { get; set; }


        public void SendMail()
        {

            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient(smtp);

                //Mail ผู้ส่ง
                mail.From = new MailAddress(mailinfo, mailname);
                mail.IsBodyHtml = true;

                if (!string.IsNullOrEmpty(mailto))
                {
                    string[] ToMuliIdAdd = mailto.Split(',');
                    foreach (string ToEMailId in ToMuliIdAdd)
                    {
                        mail.To.Add(new MailAddress(ToEMailId)); //adding multiple TO Email Id
                    }
                }

                if (!string.IsNullOrEmpty(mailcc))
                {
                    string[] CCId = mailcc.Split(',');

                    foreach (string CCEmail in CCId)
                    {
                        mail.CC.Add(new MailAddress(CCEmail)); //Adding Multiple CC email Id
                    }
                }


                mail.Subject = subject;
                mail.Body = message.Replace("\n", "<br>");
                mail.IsBodyHtml = true;

                SmtpServer.Port = port;
                SmtpServer.UseDefaultCredentials = true;
                SmtpServer.Credentials = new System.Net.NetworkCredential(mailinfo, password);
                SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                SmtpServer.EnableSsl = true;
                SmtpServer.Timeout = 30000;

                if (!string.IsNullOrEmpty(path))
                {
                    System.Net.Mail.Attachment attachment;
                    attachment = new System.Net.Mail.Attachment(path);
                    mail.Attachments.Add(attachment);
                }

                SmtpServer.Send(mail);
            }
            catch (Exception ex)
            {
                throw new Exception("เกิดข้อผิดพลาดไม่สามารถส่งอีเมลได้" + ex.Message);
            }
        }
    }
}
