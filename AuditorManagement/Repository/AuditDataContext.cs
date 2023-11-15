using Microsoft.EntityFrameworkCore;
using Models;
using Models.Master;
using Models.Models;
using System;

namespace Repository
{
    public class AuditDataContext : DbContext
    {
        public static string ConnectionString { get; set; }
        public static string ConnectionVersion { get; set; }

        public AuditDataContext()
        {
            Database.SetCommandTimeout(1500000);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(ConnectionString, Microsoft.EntityFrameworkCore.ServerVersion.Parse(ConnectionVersion));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasCharSet("utf8mb3");

            modelBuilder.Entity<AccountAdjustment>(entity =>
            {
                entity.HasKey(e => new { e.AdjustmentId, e.PeriodId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("account_adjustment");

                entity.Property(e => e.AdjustmentId).HasMaxLength(36);

                entity.Property(e => e.PeriodId).HasMaxLength(36);

                entity.Property(e => e.Code).HasMaxLength(20);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.Credit).HasPrecision(22, 2);

                entity.Property(e => e.Debit).HasPrecision(22, 2);

                entity.Property(e => e.Description).HasMaxLength(500);

                entity.Property(e => e.IsAgree).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsPeriod)
                    .HasMaxLength(20)
                    .HasComment("Current , Previous");

                entity.Property(e => e.Name).HasMaxLength(200);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<AccountAdjustmentPreviou>(entity =>
            {
                entity.HasKey(e => new { e.AdjustmentId, e.PeriodId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("account_adjustment_previous");

                entity.Property(e => e.AdjustmentId).HasMaxLength(36);

                entity.Property(e => e.PeriodId).HasMaxLength(36);

                entity.Property(e => e.Code).HasMaxLength(20);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.Credit).HasPrecision(22, 2);

                entity.Property(e => e.Debit).HasPrecision(22, 2);

                entity.Property(e => e.Description).HasMaxLength(500);

                entity.Property(e => e.IsAgree).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(200);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<AccountAdjustmentSub>(entity =>
            {
                entity.HasKey(e => new { e.SubAdjustmentId, e.AdjustmentId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("account_adjustment_sub");

                entity.Property(e => e.SubAdjustmentId)
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AdjustmentId).HasMaxLength(36);

                entity.Property(e => e.AccountCode).HasMaxLength(50);

                entity.Property(e => e.AccountName).HasMaxLength(200);

                entity.Property(e => e.AdjustmentAgree).HasMaxLength(10);

                entity.Property(e => e.AdjustmentModel).HasMaxLength(10);

                entity.Property(e => e.AdjustmentPeriod).HasMaxLength(20);

                entity.Property(e => e.AdjustmentType).HasMaxLength(10);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.Credit).HasPrecision(22, 2);

                entity.Property(e => e.Debit).HasPrecision(22, 2);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.PeriodId)
                    .IsRequired()
                    .HasMaxLength(36);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<AccountAdjustmentSubPreviou>(entity =>
            {
                entity.HasKey(e => new { e.SubAdjustmentId, e.AdjustmentId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("account_adjustment_sub_previous");

                entity.Property(e => e.SubAdjustmentId)
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AdjustmentId).HasMaxLength(36);

                entity.Property(e => e.AccountCode).HasMaxLength(50);

                entity.Property(e => e.AccountName).HasMaxLength(200);

                entity.Property(e => e.AdjustmentAgree).HasMaxLength(10);

                entity.Property(e => e.AdjustmentModel).HasMaxLength(10);

                entity.Property(e => e.AdjustmentType).HasMaxLength(10);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.Credit).HasPrecision(22, 2);

                entity.Property(e => e.Debit).HasPrecision(22, 2);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.PeriodId)
                    .IsRequired()
                    .HasMaxLength(36);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<AccountAuditAccount>(entity =>
            {
                entity.HasKey(e => new { e.AuditAccountId, e.FsgroupId, e.TrialBalanceId, e.PeriodId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0, 0 });

                entity.ToTable("account_audit_account");

                entity.Property(e => e.AuditAccountId)
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.FsgroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("FSGroupId");

                entity.Property(e => e.TrialBalanceId).HasColumnType("int(11)");

                entity.Property(e => e.PeriodId).HasMaxLength(36);

                entity.Property(e => e.AccountRefCode).HasMaxLength(200);

                entity.Property(e => e.AuditComment).HasMaxLength(2000);

                entity.Property(e => e.AuditorBy).HasMaxLength(36);

                entity.Property(e => e.AuditorDate).HasColumnType("datetime");

                entity.Property(e => e.AuditorDateEnd).HasColumnType("datetime");

                entity.Property(e => e.AuditorDateStart).HasColumnType("datetime");

                entity.Property(e => e.AuditorRemark).HasMaxLength(100);

                entity.Property(e => e.AuditorStatus).HasMaxLength(10);

                entity.Property(e => e.AuditorTimeUseHour).HasColumnType("int(11)");

                entity.Property(e => e.AuditorTimeUseMinute).HasColumnType("int(11)");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.PrepareDate).HasColumnType("datetime");

                entity.Property(e => e.PrepareDateEnd).HasColumnType("datetime");

                entity.Property(e => e.PrepareDateStart).HasColumnType("datetime");

                entity.Property(e => e.PrepareRemark).HasMaxLength(100);

                entity.Property(e => e.PrepareStatus).HasMaxLength(10);

                entity.Property(e => e.PrepareTimeUseHour).HasColumnType("int(11)");

                entity.Property(e => e.PrepareTimeUseMinute).HasColumnType("int(11)");

                entity.Property(e => e.PreparedBy).HasMaxLength(36);

                entity.Property(e => e.ReveiwedBy).HasMaxLength(36);

                entity.Property(e => e.ReveiwedDate).HasColumnType("datetime");

                entity.Property(e => e.ReveiwedStatus).HasMaxLength(10);

                entity.Property(e => e.ReviewedDateEnd).HasColumnType("datetime");

                entity.Property(e => e.ReviewedDateStart).HasColumnType("datetime");

                entity.Property(e => e.ReviewedRemark).HasMaxLength(100);

                entity.Property(e => e.ReviewedTimeUseHour).HasColumnType("int(11)");

                entity.Property(e => e.ReviewedTimeUseMinute).HasColumnType("int(11)");

                entity.Property(e => e.SubFsgroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("SubFSGroupId");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<AccountAuditAccountAuditissue>(entity =>
            {
                entity.HasKey(e => new { e.AuditIssueId, e.AuditAccountId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("account_audit_account_auditissue");

                entity.Property(e => e.AuditIssueId)
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AuditAccountId).HasColumnType("int(11)");

                entity.Property(e => e.AuditIssueRefCode).HasMaxLength(50);

                entity.Property(e => e.CompleteBy).HasMaxLength(50);

                entity.Property(e => e.CompleteOn).HasColumnType("datetime");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.IsDelete)
                    .HasMaxLength(10)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.IsStatus).HasMaxLength(10);

                entity.Property(e => e.Issue).HasMaxLength(1000);

                entity.Property(e => e.Solution).HasMaxLength(1000);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");
            });

            modelBuilder.Entity<AccountAuditAccountConclusion>(entity =>
            {
                entity.HasKey(e => new { e.ConclusionId, e.AuditAccountId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("account_audit_account_conclusion");

                entity.Property(e => e.ConclusionId)
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AuditAccountId).HasColumnType("int(11)");

                entity.Property(e => e.AuditprogramDetailid).HasColumnType("int(11)");

                entity.Property(e => e.Auditprogramid).HasColumnType("int(11)");

                entity.Property(e => e.ConclusionDesc).HasMaxLength(1000);

                entity.Property(e => e.ConclusionRefCode).HasMaxLength(50);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.IsConclusion).HasMaxLength(20);

                entity.Property(e => e.IsDelete)
                    .HasMaxLength(10)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.SequenceAuditProgram).HasMaxLength(10);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");

                entity.Property(e => e.VerifyDesc).HasMaxLength(1000);
            });

            modelBuilder.Entity<AccountAuditAccountDoucment>(entity =>
            {
                entity.HasKey(e => new { e.DocumentRefId, e.AuditAccountId, e.DocumentListId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0 });

                entity.ToTable("account_audit_account_doucment");

                entity.Property(e => e.DocumentRefId)
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AuditAccountId).HasColumnType("int(11)");

                entity.Property(e => e.DocumentListId).HasMaxLength(36);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.DocumentRefCode).HasMaxLength(50);

                entity.Property(e => e.IsDelete)
                    .HasMaxLength(10)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");
            });

            modelBuilder.Entity<AccountAuditAccountEvent>(entity =>
            {
                entity.HasKey(e => new { e.AuditEventId, e.AuditAccountId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("account_audit_account_event");

                entity.Property(e => e.AuditEventId)
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AuditAccountId).HasColumnType("int(11)");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.IsEvent).HasMaxLength(20);

                entity.Property(e => e.Remark).HasMaxLength(1000);

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.TimeUse).HasMaxLength(20);
            });

            modelBuilder.Entity<AccountAuditAccountReference>(entity =>
            {
                entity.HasKey(e => e.AuditReferenceId)
                    .HasName("PRIMARY");

                entity.ToTable("account_audit_account_reference");

                entity.Property(e => e.AuditReferenceId).HasColumnType("int(11)");

                entity.Property(e => e.AuditAccountId).HasColumnType("int(11)");

                entity.Property(e => e.AuditReferenceAuditAccountId).HasColumnType("int(11)");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.IsDelete)
                    .HasMaxLength(10)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.TrialBalanceId).HasColumnType("int(11)");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");
            });

            modelBuilder.Entity<AccountAuditFsgroup>(entity =>
            {
                entity.HasKey(e => new { e.AuditFsgroupId, e.FsgroupId, e.PeriodId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0 });

                entity.ToTable("account_audit_fsgroup");

                entity.Property(e => e.AuditFsgroupId)
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("AuditFSGroupId");

                entity.Property(e => e.FsgroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("FSGroupId");

                entity.Property(e => e.PeriodId).HasMaxLength(36);

                entity.Property(e => e.AuditComment).HasMaxLength(2000);

                entity.Property(e => e.AuditorBy).HasMaxLength(36);

                entity.Property(e => e.AuditorDate).HasColumnType("datetime");

                entity.Property(e => e.AuditorStatus).HasMaxLength(10);

                entity.Property(e => e.Code).HasMaxLength(20);

                entity.Property(e => e.ConclusionDesc).HasMaxLength(2000);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsConclusion).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(200);

                entity.Property(e => e.PrepareDate).HasColumnType("datetime");

                entity.Property(e => e.PrepareStatus).HasMaxLength(10);

                entity.Property(e => e.PreparedBy).HasMaxLength(36);

                entity.Property(e => e.ReveiwedBy).HasMaxLength(36);

                entity.Property(e => e.ReveiwedDate).HasColumnType("datetime");

                entity.Property(e => e.ReveiwedStatus).HasMaxLength(10);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<AccountAuditFsgroupAssign>(entity =>
            {
                entity.HasKey(e => e.AssignFsid)
                    .HasName("PRIMARY");

                entity.ToTable("account_audit_fsgroup_assign");

                entity.Property(e => e.AssignFsid)
                    .HasColumnType("int(11)")
                    .HasColumnName("AssignFSId");

                entity.Property(e => e.AuditFsgroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("AuditFSGroupId");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.EmpId).HasMaxLength(100);

                entity.Property(e => e.IsActive)
                    .HasMaxLength(10)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.IsDelete)
                    .HasMaxLength(10)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.PeriodId).HasMaxLength(36);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");
            });

            modelBuilder.Entity<AccountAuditFsgroupEvent>(entity =>
            {
                entity.HasKey(e => new { e.AuditEventId, e.AuditFsgroupId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("account_audit_fsgroup_event");

                entity.Property(e => e.AuditEventId)
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AuditFsgroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("AuditFSGroupId");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.IsEvent).HasMaxLength(20);

                entity.Property(e => e.Remark).HasMaxLength(1000);

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.TimeUse).HasMaxLength(20);
            });

            modelBuilder.Entity<AccountAuditFsgroupNotefs>(entity =>
            {
                entity.HasKey(e => new { e.AuditNoteFsid, e.AuditFsgroupId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("account_audit_fsgroup_notefs");

                entity.Property(e => e.AuditNoteFsid)
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("AuditNoteFSId");

                entity.Property(e => e.AuditFsgroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("AuditFSGroupId");

                entity.Property(e => e.AuditNoteFsrefCode)
                    .HasMaxLength(50)
                    .HasColumnName("AuditNoteFSRefCode");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.HeaderQty).HasColumnType("int(11)");

                entity.Property(e => e.IsDelete)
                    .HasMaxLength(10)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.IsPrint).HasMaxLength(10);

                entity.Property(e => e.NoteDetail).HasMaxLength(2000);

                entity.Property(e => e.NoteFstype)
                    .HasMaxLength(10)
                    .HasColumnName("NoteFSType");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");
            });

            modelBuilder.Entity<AccountAuditFsgroupNotefsGet>(entity =>
            {
                entity.HasKey(e => e.AuditSubNoteFsid)
                    .HasName("PRIMARY");

                entity.ToTable("account_audit_fsgroup_notefs_get");

                entity.Property(e => e.AuditSubNoteFsid)
                    .HasColumnType("int(11)")
                    .HasColumnName("AuditSubNoteFSId");

                entity.Property(e => e.AuditNoteFsid)
                    .HasColumnType("int(11)")
                    .HasColumnName("AuditNoteFSId");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.IsDelete)
                    .HasMaxLength(10)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.SubFsgroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("SubFSGroupId");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");
            });

            modelBuilder.Entity<AccountAuditFsgroupNotefsTable>(entity =>
            {
                entity.HasKey(e => e.AuditSubNoteFsid)
                    .HasName("PRIMARY");

                entity.ToTable("account_audit_fsgroup_notefs_table");

                entity.Property(e => e.AuditSubNoteFsid)
                    .HasColumnType("int(11)")
                    .HasColumnName("AuditSubNoteFSId");

                entity.Property(e => e.AuditNoteFsid)
                    .HasColumnType("int(11)")
                    .HasColumnName("AuditNoteFSId");

                entity.Property(e => e.Column).HasMaxLength(1000);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(1000);

                entity.Property(e => e.Header).HasMaxLength(1000);

                entity.Property(e => e.IsDelete)
                    .HasMaxLength(10)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");
            });

            modelBuilder.Entity<AccountAuditFsgroupPolicy>(entity =>
            {
                entity.HasKey(e => new { e.AuditPolicyId, e.AuditFsgroupId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("account_audit_fsgroup_policy");

                entity.Property(e => e.AuditPolicyId)
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AuditFsgroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("AuditFSGroupId");

                entity.Property(e => e.AuditPolicyRefCode).HasMaxLength(20);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(2000);

                entity.Property(e => e.IsDelete)
                    .HasMaxLength(10)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.IsPrint).HasMaxLength(10);

                entity.Property(e => e.Subject).HasMaxLength(200);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");
            });

            modelBuilder.Entity<AccountPeriod>(entity =>
            {
                entity.HasKey(e => new { e.PeriodId, e.OwnerId, e.CustomerId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0 });

                entity.ToTable("account_period");

                entity.Property(e => e.PeriodId).HasMaxLength(36);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.CustomerId).HasMaxLength(36);

                entity.Property(e => e.AuditConfirmBy).HasMaxLength(50);

                entity.Property(e => e.AuditConfirmDate).HasColumnType("datetime");

                entity.Property(e => e.BranchId)
                    .IsRequired()
                    .HasMaxLength(36);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.CustomerConfirmBy).HasMaxLength(50);

                entity.Property(e => e.CustomerConfirmDate).HasColumnType("datetime");

                entity.Property(e => e.CustomerReviewDate).HasColumnType("datetime");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsAudit).HasMaxLength(10);

                entity.Property(e => e.IsCompleteAudit).HasMaxLength(10);

                entity.Property(e => e.IsCompleteAuditBy).HasMaxLength(36);

                entity.Property(e => e.IsCompleteAuditDate).HasColumnType("datetime");

                entity.Property(e => e.IsCompleteCustomer).HasMaxLength(10);

                entity.Property(e => e.IsCompleteCustomerBy).HasMaxLength(36);

                entity.Property(e => e.IsCompleteCustomerDate).HasColumnType("datetime");

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsMapPeriod).HasMaxLength(10);

                entity.Property(e => e.IsRequestUpload).HasMaxLength(10);

                entity.Property(e => e.IsUploadTrial).HasMaxLength(10);

                entity.Property(e => e.MapPeriodId).HasMaxLength(36);

                entity.Property(e => e.MapYear).HasColumnType("int(11)");

                entity.Property(e => e.Name).HasMaxLength(200);

                entity.Property(e => e.PeriodCode).HasMaxLength(100);

                entity.Property(e => e.PeriodType).HasMaxLength(10);

                entity.Property(e => e.ProposalId).HasMaxLength(36);

                entity.Property(e => e.Quater).HasColumnType("int(11)");

                entity.Property(e => e.Remark).HasMaxLength(500);

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.UploadBy).HasMaxLength(100);

                entity.Property(e => e.UploadDate).HasColumnType("datetime");

                entity.Property(e => e.Year).HasColumnType("int(11)");
            });

            modelBuilder.Entity<AccountPeriodProposal>(entity =>
            {
                entity.HasKey(e => e.ProposalId)
                    .HasName("PRIMARY");

                entity.ToTable("account_period_proposal");

                entity.Property(e => e.ProposalId).HasMaxLength(36);

                entity.Property(e => e.AuditAccountAmount).HasPrecision(22, 2);

                entity.Property(e => e.AuditAmount).HasPrecision(22, 2);

                entity.Property(e => e.AuditHour).HasColumnType("int(11)");

                entity.Property(e => e.AuditPercent).HasPrecision(22, 2);

                entity.Property(e => e.AuditRate).HasPrecision(22, 2);

                entity.Property(e => e.CompleteBy).HasMaxLength(50);

                entity.Property(e => e.CompleteOn).HasColumnType("datetime");

                entity.Property(e => e.ConvertBy).HasMaxLength(50);

                entity.Property(e => e.ConvertOn).HasColumnType("datetime");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.CustomerId).HasMaxLength(36);

                entity.Property(e => e.ExpireDate).HasColumnType("datetime");

                entity.Property(e => e.GrandTotal).HasPrecision(22, 2);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsStatus).HasMaxLength(10);

                entity.Property(e => e.ManagerAmount).HasPrecision(22, 2);

                entity.Property(e => e.ManagerHour).HasColumnType("int(11)");

                entity.Property(e => e.ManagerRate).HasPrecision(22, 2);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.PrepareAmount).HasPrecision(22, 2);

                entity.Property(e => e.PrepareHour).HasColumnType("int(11)");

                entity.Property(e => e.PrepareRate).HasPrecision(22, 2);

                entity.Property(e => e.ProfitAccountAmount).HasPrecision(22, 2);

                entity.Property(e => e.ProfitPercent).HasPrecision(22, 2);

                entity.Property(e => e.ProposalCode).HasMaxLength(100);

                entity.Property(e => e.ProposalName).HasMaxLength(200);

                entity.Property(e => e.ProposalNameEn).HasMaxLength(200);

                entity.Property(e => e.Remark).HasMaxLength(500);

                entity.Property(e => e.ReviewAmount).HasPrecision(22, 2);

                entity.Property(e => e.ReviewHour).HasColumnType("int(11)");

                entity.Property(e => e.ReviewRate).HasPrecision(22, 2);

                entity.Property(e => e.Section1).HasMaxLength(3000);

                entity.Property(e => e.Section1En).HasMaxLength(2000);

                entity.Property(e => e.Section2).HasMaxLength(3000);

                entity.Property(e => e.Section2En).HasMaxLength(2000);

                entity.Property(e => e.Section3).HasMaxLength(3000);

                entity.Property(e => e.Section3En).HasMaxLength(2000);

                entity.Property(e => e.Section4).HasMaxLength(2000);

                entity.Property(e => e.Section4En).HasMaxLength(2000);

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.TotalAmount).HasPrecision(22, 2);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<AccountPeriodProposalSub>(entity =>
            {
                entity.HasKey(e => e.SubProposalId)
                    .HasName("PRIMARY");

                entity.ToTable("account_period_proposal_sub");

                entity.Property(e => e.SubProposalId).HasColumnType("int(11)");

                entity.Property(e => e.Amount).HasPrecision(22, 2);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.Description).HasMaxLength(500);

                entity.Property(e => e.DescriptionEn).HasMaxLength(500);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.ProposalId).HasMaxLength(36);

                entity.Property(e => e.Unit).HasMaxLength(100);

                entity.Property(e => e.UnitEn).HasMaxLength(100);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<AccountTrialbalance>(entity =>
            {
                entity.HasKey(e => new { e.TrialBalanceId, e.PeriodId, e.CustomerId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0 });

                entity.ToTable("account_trialbalance");

                entity.Property(e => e.TrialBalanceId)
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.PeriodId).HasMaxLength(36);

                entity.Property(e => e.CustomerId).HasMaxLength(36);

                entity.Property(e => e.AccountCode).HasMaxLength(30);

                entity.Property(e => e.AccountName).HasMaxLength(100);

                entity.Property(e => e.Amount).HasPrecision(22, 2);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.FsgroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("FSGroupId");

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsUpload).HasMaxLength(100);

                entity.Property(e => e.Noted).HasMaxLength(1000);

                entity.Property(e => e.PreviousYear).HasPrecision(22, 2);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<Auditprogram>(entity =>
            {
                entity.ToTable("auditprogram");

                entity.Property(e => e.Auditprogramid)
                    .HasColumnType("int(11)")
                    .HasColumnName("auditprogramid");

                entity.Property(e => e.Code).HasMaxLength(10);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsSystem).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.NameEn).HasMaxLength(250);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.Sequence).HasColumnType("int(11)");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<AuditprogramDetail>(entity =>
            {
                entity.ToTable("auditprogram_detail");

                entity.Property(e => e.AuditprogramDetailid)
                    .HasColumnType("int(11)")
                    .HasColumnName("auditprogram_detailid");

                entity.Property(e => e.Auditprogramid)
                    .HasColumnType("int(11)")
                    .HasColumnName("auditprogramid");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(2500);

                entity.Property(e => e.NameEn).HasMaxLength(2500);

                entity.Property(e => e.Sequence).HasColumnType("int(11)");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<AuditprogramDetailUse>(entity =>
            {
                entity.HasKey(e => e.Auditprogramuseid)
                    .HasName("PRIMARY");

                entity.ToTable("auditprogram_detail_use");

                entity.Property(e => e.Auditprogramuseid)
                    .HasColumnType("int(11)")
                    .HasColumnName("auditprogramuseid");

                entity.Property(e => e.AuditAccountId).HasColumnType("int(11)");

                entity.Property(e => e.AuditprogramDetailid).HasColumnType("int(11)");

                entity.Property(e => e.Auditprogramid)
                    .HasColumnType("int(11)")
                    .HasColumnName("auditprogramid");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.FsgroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("FSGroupId");

                entity.Property(e => e.Hours).HasPrecision(18, 2);

                entity.Property(e => e.PeriodId).HasMaxLength(36);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.UserId).HasMaxLength(100);
            });

            modelBuilder.Entity<AuditprogramFsgroup>(entity =>
            {
                entity.HasKey(e => e.SystemId)
                    .HasName("PRIMARY");

                entity.ToTable("auditprogram_fsgroup");

                entity.Property(e => e.SystemId).HasColumnType("int(11)");

                entity.Property(e => e.Auditprogramid)
                    .HasColumnType("int(11)")
                    .HasColumnName("auditprogramid");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.FsgroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("FSGroupId");

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<Branch>(entity =>
            {
                entity.HasKey(e => new { e.BranchId, e.OwnerId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("branch");

                entity.Property(e => e.BranchId).HasMaxLength(36);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.Address).HasMaxLength(100);

                entity.Property(e => e.AddressEn).HasMaxLength(100);

                entity.Property(e => e.Amphur).HasMaxLength(100);

                entity.Property(e => e.AmphurEn).HasMaxLength(100);

                entity.Property(e => e.BranchCode).HasMaxLength(50);

                entity.Property(e => e.ContractMobile).HasMaxLength(100);

                entity.Property(e => e.ContractMobile1).HasMaxLength(100);

                entity.Property(e => e.ContractName).HasMaxLength(100);

                entity.Property(e => e.ContractPosition).HasMaxLength(100);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(500);

                entity.Property(e => e.DueStartDate).HasColumnType("datetime");

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.FaxPhone).HasMaxLength(20);

                entity.Property(e => e.IsActive).HasMaxLength(100);

                entity.Property(e => e.IsDelete)
                    .HasMaxLength(10)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.LogoPath).HasMaxLength(500);

                entity.Property(e => e.MobilePhone).HasMaxLength(20);

                entity.Property(e => e.Model).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(150);

                entity.Property(e => e.NameEn).HasMaxLength(150);

                entity.Property(e => e.PostCode).HasMaxLength(5);

                entity.Property(e => e.PostCodeEn).HasMaxLength(5);

                entity.Property(e => e.Province).HasMaxLength(10);

                entity.Property(e => e.ProvinceEn).HasMaxLength(10);

                entity.Property(e => e.RegisterDate).HasColumnType("datetime");

                entity.Property(e => e.Remark).HasMaxLength(100);

                entity.Property(e => e.Tambol).HasMaxLength(10);

                entity.Property(e => e.TambolEn).HasMaxLength(10);

                entity.Property(e => e.TaxId).HasMaxLength(20);

                entity.Property(e => e.Telephone).HasMaxLength(20);

                entity.Property(e => e.Type).HasMaxLength(50);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");

                entity.Property(e => e.WebSite).HasMaxLength(100);
            });

            modelBuilder.Entity<Config>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("config");

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.Value).HasMaxLength(1000);
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(e => new { e.CustomerId, e.BranchId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("customer");

                entity.Property(e => e.CustomerId).HasMaxLength(36);

                entity.Property(e => e.BranchId).HasMaxLength(36);

                entity.Property(e => e.Address).HasMaxLength(100);

                entity.Property(e => e.AddressEn).HasMaxLength(100);

                entity.Property(e => e.Amphur).HasMaxLength(100);

                entity.Property(e => e.AmphurEn).HasMaxLength(100);

                entity.Property(e => e.ContractEmail).HasMaxLength(100);

                entity.Property(e => e.ContractMobile).HasMaxLength(100);

                entity.Property(e => e.ContractMobile1).HasMaxLength(100);

                entity.Property(e => e.ContractName).HasMaxLength(100);

                entity.Property(e => e.ContractPosition).HasMaxLength(100);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.CustomerCode).HasMaxLength(50);

                entity.Property(e => e.Description).HasMaxLength(500);

                entity.Property(e => e.DirectorName).HasMaxLength(100);

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.FaxPhone).HasMaxLength(20);

                entity.Property(e => e.IsActive).HasMaxLength(100);

                entity.Property(e => e.IsDelete)
                    .HasMaxLength(10)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.IsRevenue).HasMaxLength(100);

                entity.Property(e => e.MobilePhone).HasMaxLength(20);

                entity.Property(e => e.Model).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(200);

                entity.Property(e => e.NameEn).HasMaxLength(200);

                entity.Property(e => e.NumberOfShare).HasPrecision(18, 2);

                entity.Property(e => e.OwnerId)
                    .IsRequired()
                    .HasMaxLength(36);

                entity.Property(e => e.PostCode).HasMaxLength(5);

                entity.Property(e => e.PostCodeEn).HasMaxLength(5);

                entity.Property(e => e.Province).HasMaxLength(10);

                entity.Property(e => e.ProvinceEn).HasMaxLength(10);

                entity.Property(e => e.RegisterDate).HasColumnType("datetime");

                entity.Property(e => e.RegisteredCapital).HasPrecision(18, 2);

                entity.Property(e => e.Remark).HasMaxLength(100);

                entity.Property(e => e.Tambol).HasMaxLength(10);

                entity.Property(e => e.TambolEn).HasMaxLength(10);

                entity.Property(e => e.TaxId).HasMaxLength(50);

                entity.Property(e => e.Telephone).HasMaxLength(20);

                entity.Property(e => e.Type).HasMaxLength(30);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");

                entity.Property(e => e.WebSite).HasMaxLength(100);
            });

            modelBuilder.Entity<CustomerAssign>(entity =>
            {
                entity.HasKey(e => new { e.AssignId, e.CustomerId, e.OwnerId, e.BranchId, e.EmpId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0, 0, 0 });

                entity.ToTable("customer_assign");

                entity.Property(e => e.AssignId).HasMaxLength(36);

                entity.Property(e => e.CustomerId).HasMaxLength(36);

                entity.Property(e => e.OwnerId)
                    .HasMaxLength(36)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.BranchId).HasMaxLength(36);

                entity.Property(e => e.EmpId).HasMaxLength(100);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(10)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.IsDelete)
                    .HasMaxLength(10)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");
            });

            modelBuilder.Entity<CustomerContract>(entity =>
            {
                entity.HasKey(e => e.ContractId)
                    .HasName("PRIMARY");

                entity.ToTable("customer_contract");

                entity.Property(e => e.ContractId).HasMaxLength(100);

                entity.Property(e => e.AcceptDate).HasColumnType("datetime");

                entity.Property(e => e.BranchId)
                    .IsRequired()
                    .HasMaxLength(36);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.CustomerId)
                    .IsRequired()
                    .HasMaxLength(36);

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(100)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.InviteBy).HasMaxLength(36);

                entity.Property(e => e.InviteDate).HasColumnType("datetime");

                entity.Property(e => e.IsAccept).HasMaxLength(10);

                entity.Property(e => e.IsActive)
                    .HasMaxLength(10)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.IsDelete)
                    .HasMaxLength(10)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.IsInvite).HasMaxLength(10);

                entity.Property(e => e.LastName)
                    .HasMaxLength(100)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.MobilePhone).HasMaxLength(20);

                entity.Property(e => e.OwnerId)
                    .IsRequired()
                    .HasMaxLength(36)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<CustomerInvite>(entity =>
            {
                entity.HasKey(e => new { e.InviteId, e.CustomerId, e.ContractId, e.OwnerId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0, 0 });

                entity.ToTable("customer_invite");

                entity.Property(e => e.InviteId).HasMaxLength(36);

                entity.Property(e => e.CustomerId).HasMaxLength(36);

                entity.Property(e => e.ContractId).HasMaxLength(36);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.AcceptDate).HasColumnType("datetime");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.InviteCode).HasMaxLength(20);

                entity.Property(e => e.InviteDate).HasColumnType("datetime");

                entity.Property(e => e.IsAccept).HasMaxLength(10);

                entity.Property(e => e.ProfileId)
                    .HasMaxLength(36)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");
            });

            modelBuilder.Entity<CustomerInviteProfile>(entity =>
            {
                entity.HasKey(e => e.ProfileId)
                    .HasName("PRIMARY");

                entity.ToTable("customer_invite_profile");

                entity.HasCharSet("utf8mb4")
                    .UseCollation("utf8mb4_general_ci");

                entity.Property(e => e.ProfileId).HasMaxLength(36);

                entity.Property(e => e.Address).HasMaxLength(500);

                entity.Property(e => e.Amphur).HasMaxLength(50);

                entity.Property(e => e.CitizenId).HasMaxLength(13);

                entity.Property(e => e.CreatedBy).HasMaxLength(50);

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.FirstName).HasMaxLength(100);

                entity.Property(e => e.FirstNameEn).HasMaxLength(100);

                entity.Property(e => e.Gender).HasMaxLength(10);

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.LastName).HasMaxLength(100);

                entity.Property(e => e.LastNameEn).HasMaxLength(100);

                entity.Property(e => e.MobilePhone).HasMaxLength(20);

                entity.Property(e => e.MobilePhone1).HasMaxLength(20);

                entity.Property(e => e.PostCode).HasMaxLength(5);

                entity.Property(e => e.ProfileCode).HasMaxLength(50);

                entity.Property(e => e.Province).HasMaxLength(3);

                entity.Property(e => e.Tambol).HasMaxLength(100);

                entity.Property(e => e.TitleName).HasMaxLength(10);

                entity.Property(e => e.UpdateBy).HasMaxLength(50);

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<Documentlist>(entity =>
            {
                entity.HasKey(e => new { e.DocumentListId, e.BranchId, e.OwnerId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0 });

                entity.ToTable("documentlist");

                entity.Property(e => e.DocumentListId).HasMaxLength(36);

                entity.Property(e => e.BranchId).HasMaxLength(36);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.CustomerId).HasMaxLength(36);

                entity.Property(e => e.DocumentListCode).HasMaxLength(50);

                entity.Property(e => e.DocumentStyleId).HasMaxLength(10);

                entity.Property(e => e.DocumentTypeId).HasMaxLength(10);

                entity.Property(e => e.Extension).HasMaxLength(10);

                entity.Property(e => e.IsDelete)
                    .HasMaxLength(10)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.LinkPath).HasMaxLength(200);

                entity.Property(e => e.NameFile).HasMaxLength(200);

                entity.Property(e => e.PathFile).HasMaxLength(200);

                entity.Property(e => e.Remark).HasMaxLength(500);

                entity.Property(e => e.Size).HasPrecision(18, 2);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");

                entity.Property(e => e.UploadType).HasMaxLength(10);
            });

            modelBuilder.Entity<Documenttype>(entity =>
            {
                entity.HasKey(e => e.Documentid)
                    .HasName("PRIMARY");

                entity.ToTable("documenttype");

                entity.Property(e => e.Documentid)
                    .HasColumnType("int(11)")
                    .HasColumnName("documentid");

                entity.Property(e => e.Code).HasMaxLength(10);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsSystem).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.NameEn).HasMaxLength(250);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.Sequence).HasColumnType("int(11)");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => new { e.EmpId, e.OwnerId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("employee");

                entity.HasCharSet("utf8mb4")
                    .UseCollation("utf8mb4_general_ci");

                entity.Property(e => e.EmpId).HasMaxLength(36);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.Address).HasMaxLength(500);

                entity.Property(e => e.Amphur).HasMaxLength(50);

                entity.Property(e => e.CitizenId).HasMaxLength(13);

                entity.Property(e => e.CreatedBy).HasMaxLength(50);

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.EmpCode).HasMaxLength(50);

                entity.Property(e => e.FirstName).HasMaxLength(100);

                entity.Property(e => e.FirstNameEn).HasMaxLength(100);

                entity.Property(e => e.Gender).HasMaxLength(10);

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.LastName).HasMaxLength(100);

                entity.Property(e => e.LastNameEn).HasMaxLength(100);

                entity.Property(e => e.MobilePhone).HasMaxLength(20);

                entity.Property(e => e.MobilePhone1).HasMaxLength(20);

                entity.Property(e => e.PostCode).HasMaxLength(5);

                entity.Property(e => e.Province).HasMaxLength(3);

                entity.Property(e => e.RegisterDate).HasColumnType("datetime");

                entity.Property(e => e.SignImagePath).HasColumnType("text");

                entity.Property(e => e.Tambol).HasMaxLength(100);

                entity.Property(e => e.TitleName).HasMaxLength(10);

                entity.Property(e => e.UpdateBy).HasMaxLength(50);

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<Fsgroup>(entity =>
            {
                entity.ToTable("fsgroup");

                entity.Property(e => e.FsgroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("FSGroupId");

                entity.Property(e => e.Code).HasMaxLength(10);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsSystem).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.NameEn).HasMaxLength(250);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.Sequence).HasColumnType("int(11)");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<FsgroupInterface>(entity =>
            {
                entity.HasKey(e => e.InterfaceId)
                    .HasName("PRIMARY");

                entity.ToTable("fsgroup_interfaces");

                entity.Property(e => e.InterfaceId).HasColumnType("int(11)");

                entity.Property(e => e.Code).HasMaxLength(10);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.FsgroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("FSGroupId");

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.NameEn).HasMaxLength(250);

                entity.Property(e => e.OwnerId)
                    .IsRequired()
                    .HasMaxLength(36)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.Sequence).HasColumnType("int(11)");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<FsgroupParentSubfsgroup>(entity =>
            {
                entity.HasKey(e => new { e.FsgroupId, e.SubFsgroupId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("fsgroup_parent_subfsgroup");

                entity.Property(e => e.FsgroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("FSGroupId");

                entity.Property(e => e.SubFsgroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("SubFSGroupId");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsSystem).HasMaxLength(10);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<FstopParentFsgroup>(entity =>
            {
                entity.HasKey(e => new { e.FstopId, e.FsgroupId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("fstop_parent_fsgroup");

                entity.Property(e => e.FstopId)
                    .HasColumnType("int(11)")
                    .HasColumnName("FSTopId");

                entity.Property(e => e.FsgroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("FSGroupId");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsSystem).HasMaxLength(10);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<MasterAccountPolicy>(entity =>
            {
                entity.HasKey(e => e.PolicyId)
                    .HasName("PRIMARY");

                entity.ToTable("master_account_policy");

                entity.Property(e => e.PolicyId).HasColumnType("int(11)");

                entity.Property(e => e.Code).HasMaxLength(10);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.Description).HasMaxLength(500);

                entity.Property(e => e.FsgroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("FSGroupId");

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsSystem).HasMaxLength(10);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.Sequence).HasColumnType("int(11)");

                entity.Property(e => e.Subject).HasMaxLength(250);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<MasterAuditreport>(entity =>
            {
                entity.HasKey(e => e.AuditreportId)
                    .HasName("PRIMARY");

                entity.ToTable("master_auditreport");

                entity.Property(e => e.AuditreportId).HasColumnType("int(11)");

                entity.Property(e => e.Code).HasMaxLength(10);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsSystem).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.NameEn).HasMaxLength(250);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.Sequence).HasColumnType("int(11)");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<MasterCashflow>(entity =>
            {
                entity.HasKey(e => e.CashflowId)
                    .HasName("PRIMARY");

                entity.ToTable("master_cashflow");

                entity.Property(e => e.CashflowId).HasColumnType("int(11)");

                entity.Property(e => e.Code).HasMaxLength(10);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsSystem).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.NameEn).HasMaxLength(250);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.Sequence).HasColumnType("int(11)");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<MasterExpense>(entity =>
            {
                entity.HasKey(e => e.ExpensesId)
                    .HasName("PRIMARY");

                entity.ToTable("master_expenses");

                entity.Property(e => e.ExpensesId).HasColumnType("int(11)");

                entity.Property(e => e.Code).HasMaxLength(10);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsSystem).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.NameEn).HasMaxLength(250);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.Sequence).HasColumnType("int(11)");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<MasterFstop>(entity =>
            {
                entity.HasKey(e => e.FstopId)
                    .HasName("PRIMARY");

                entity.ToTable("master_fstop");

                entity.Property(e => e.FstopId)
                    .HasColumnType("int(11)")
                    .HasColumnName("FSTopId");

                entity.Property(e => e.Code).HasMaxLength(10);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.GroupHead).HasMaxLength(50);

                entity.Property(e => e.GroupTop).HasMaxLength(50);

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsSystem).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.NameEn).HasMaxLength(250);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.Sequence).HasColumnType("int(11)");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<MasterGrouptype>(entity =>
            {
                entity.HasKey(e => e.GroupTypeId)
                    .HasName("PRIMARY");

                entity.ToTable("master_grouptype");

                entity.Property(e => e.GroupTypeId).HasColumnType("int(11)");

                entity.Property(e => e.Code).HasMaxLength(10);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsSystem).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.NameEn).HasMaxLength(250);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.Sequence).HasColumnType("int(11)");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<MasterHourRate>(entity =>
            {
                entity.HasKey(e => e.HourId)
                    .HasName("PRIMARY");

                entity.ToTable("master_hour_rate");

                entity.Property(e => e.HourId).HasColumnType("int(11)");

                entity.Property(e => e.AuditHour).HasPrecision(22, 2);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.ManagerHour).HasPrecision(22, 2);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.PrepareHour).HasPrecision(22, 2);

                entity.Property(e => e.Remark).HasMaxLength(100);

                entity.Property(e => e.ReviewHour).HasPrecision(22, 2);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<MasterIagroup>(entity =>
            {
                entity.HasKey(e => e.IagroupId)
                    .HasName("PRIMARY");

                entity.ToTable("master_iagroup");

                entity.Property(e => e.IagroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("IAgroupId");

                entity.Property(e => e.Code).HasMaxLength(10);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsSystem).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.NameEn).HasMaxLength(250);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.Sequence).HasColumnType("int(11)");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<MasterNontax>(entity =>
            {
                entity.HasKey(e => e.NonTaxgroupId)
                    .HasName("PRIMARY");

                entity.ToTable("master_nontax");

                entity.Property(e => e.NonTaxgroupId).HasColumnType("int(11)");

                entity.Property(e => e.Code).HasMaxLength(10);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsSystem).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.NameEn).HasMaxLength(250);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.Sequence).HasColumnType("int(11)");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<MasterPpegroup>(entity =>
            {
                entity.HasKey(e => e.PpegroupId)
                    .HasName("PRIMARY");

                entity.ToTable("master_ppegroup");

                entity.Property(e => e.PpegroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("PPEgroupId");

                entity.Property(e => e.Code).HasMaxLength(10);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsSystem).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.NameEn).HasMaxLength(250);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.Sequence).HasColumnType("int(11)");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<MasterSubfsgroup>(entity =>
            {
                entity.HasKey(e => e.SubFsgroupId)
                    .HasName("PRIMARY");

                entity.ToTable("master_subfsgroup");

                entity.Property(e => e.SubFsgroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("SubFSGroupId");

                entity.Property(e => e.Code).HasMaxLength(10);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsSystem).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.NameEn).HasMaxLength(250);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.Sequence).HasColumnType("int(11)");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<MasterTaxgroup>(entity =>
            {
                entity.HasKey(e => e.TaxgroupId)
                    .HasName("PRIMARY");

                entity.ToTable("master_taxgroup");

                entity.Property(e => e.TaxgroupId).HasColumnType("int(11)");

                entity.Property(e => e.Code).HasMaxLength(10);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsSystem).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.NameEn).HasMaxLength(250);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.Sequence).HasColumnType("int(11)");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<Owner>(entity =>
            {
                entity.HasKey(e => new { e.OwnerId, e.EmpId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("owner");

                entity.HasCharSet("utf8mb4")
                    .UseCollation("utf8mb4_general_ci");

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.EmpId).HasMaxLength(36);

                entity.Property(e => e.CreatedBy).HasMaxLength(50);

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.ExpireDate).HasColumnType("datetime");

                entity.Property(e => e.ExpirePackage).HasColumnType("datetime");

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsStatusSpace).HasMaxLength(10);

                entity.Property(e => e.LastActivePackage).HasColumnType("datetime");

                entity.Property(e => e.PackageId).HasMaxLength(36);

                entity.Property(e => e.RegisterDate).HasColumnType("datetime");

                entity.Property(e => e.SpaceCurrent).HasPrecision(10);

                entity.Property(e => e.SpaceCurrentType).HasMaxLength(10);

                entity.Property(e => e.SpaceLimit).HasPrecision(10);

                entity.Property(e => e.SpaceLimitType).HasMaxLength(10);

                entity.Property(e => e.UpdateBy).HasMaxLength(50);

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");
            });

            modelBuilder.Entity<Package>(entity =>
            {
                entity.ToTable("package");

                entity.Property(e => e.PackageId).HasMaxLength(36);

                entity.Property(e => e.PackageCode).HasMaxLength(100);

                entity.Property(e => e.PackageLevel).HasColumnType("int(11)");

                entity.Property(e => e.PackageName).HasMaxLength(100);
            });

            modelBuilder.Entity<ParameterTitlerequestform>(entity =>
            {
                entity.HasKey(e => e.Code)
                    .HasName("PRIMARY");

                entity.ToTable("parameter_titlerequestform");

                entity.Property(e => e.Code).HasMaxLength(100);

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.NameEn).HasMaxLength(100);
            });

            modelBuilder.Entity<Parameteramphur>(entity =>
            {
                entity.HasKey(e => e.Code)
                    .HasName("PRIMARY");

                entity.ToTable("parameteramphur");

                entity.Property(e => e.Code).HasMaxLength(100);

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.NameEn).HasMaxLength(100);

                entity.Property(e => e.PostCode).HasMaxLength(100);

                entity.Property(e => e.Province).HasMaxLength(100);
            });

            modelBuilder.Entity<Parameterdocumentstyle>(entity =>
            {
                entity.HasKey(e => e.Code)
                    .HasName("PRIMARY");

                entity.ToTable("parameterdocumentstyle");

                entity.Property(e => e.Code).HasMaxLength(100);

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.NameEn).HasMaxLength(100);
            });

            modelBuilder.Entity<Parametermodel>(entity =>
            {
                entity.HasKey(e => e.Code)
                    .HasName("PRIMARY");

                entity.ToTable("parametermodel");

                entity.Property(e => e.Code).HasMaxLength(100);

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.NameEn).HasMaxLength(100);

                entity.Property(e => e.Type).HasMaxLength(10);
            });

            modelBuilder.Entity<Parameterpermission>(entity =>
            {
                entity.HasKey(e => e.Code)
                    .HasName("PRIMARY");

                entity.ToTable("parameterpermission");

                entity.HasCharSet("utf8mb4")
                    .UseCollation("utf8mb4_general_ci");

                entity.Property(e => e.Code).HasMaxLength(20);

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.NameEn).HasMaxLength(50);
            });

            modelBuilder.Entity<Parameterproposal>(entity =>
            {
                entity.HasKey(e => e.Code)
                    .HasName("PRIMARY");

                entity.ToTable("parameterproposal");

                entity.Property(e => e.Code).HasColumnType("int(11)");

                entity.Property(e => e.Section1).HasMaxLength(2000);

                entity.Property(e => e.Section1En).HasMaxLength(2000);

                entity.Property(e => e.Section2).HasMaxLength(2000);

                entity.Property(e => e.Section2En).HasMaxLength(2000);

                entity.Property(e => e.Section3).HasMaxLength(2000);

                entity.Property(e => e.Section3En).HasMaxLength(2000);

                entity.Property(e => e.Section4).HasMaxLength(2000);

                entity.Property(e => e.Section4En).HasMaxLength(2000);
            });

            modelBuilder.Entity<Parameterprovince>(entity =>
            {
                entity.HasKey(e => e.Code)
                    .HasName("PRIMARY");

                entity.ToTable("parameterprovince");

                entity.Property(e => e.Code).HasMaxLength(100);

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.NameEn).HasMaxLength(100);
            });

            modelBuilder.Entity<Parameterrequestform>(entity =>
            {
                entity.HasKey(e => e.Code)
                    .HasName("PRIMARY");

                entity.ToTable("parameterrequestform");

                entity.Property(e => e.Code).HasMaxLength(100);

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.NameEn).HasMaxLength(100);
            });

            modelBuilder.Entity<Parametertitle>(entity =>
            {
                entity.HasKey(e => e.Code)
                    .HasName("PRIMARY");

                entity.ToTable("parametertitle");

                entity.Property(e => e.Code).HasMaxLength(100);

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.NameEn).HasMaxLength(100);

                entity.Property(e => e.Parent).HasMaxLength(100);
            });

            modelBuilder.Entity<Prefix>(entity =>
            {
                entity.HasKey(e => e.Sid)
                    .HasName("PRIMARY");

                entity.ToTable("prefix");

                entity.Property(e => e.Sid)
                    .HasColumnType("int(11)")
                    .HasColumnName("SID");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.Prefixs).HasMaxLength(100);

                entity.Property(e => e.Sequence).HasColumnType("int(11)");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.Year).HasColumnType("int(11)");
            });

            modelBuilder.Entity<Requestform>(entity =>
            {
                entity.HasKey(e => new { e.RequestKey, e.RequestId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("requestform");

                entity.Property(e => e.RequestKey)
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.RequestId).HasMaxLength(100);

                entity.Property(e => e.ApproveBy).HasMaxLength(36);

                entity.Property(e => e.ApproveOn).HasColumnType("datetime");

                entity.Property(e => e.ContactEmail).HasMaxLength(50);

                entity.Property(e => e.ContactMobilePhone).HasMaxLength(20);

                entity.Property(e => e.ContactName).HasMaxLength(100);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(36)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.Detail).HasMaxLength(5000);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.RequestDate).HasColumnType("datetime");

                entity.Property(e => e.ResponseMessage).HasMaxLength(500);

                entity.Property(e => e.Status).HasMaxLength(10);

                entity.Property(e => e.Subject).HasMaxLength(100);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(36)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.UserId).HasMaxLength(36);
            });

            modelBuilder.Entity<Ruleprogram>(entity =>
            {
                entity.ToTable("ruleprogram");

                entity.Property(e => e.Ruleprogramid)
                    .HasColumnType("int(11)")
                    .HasColumnName("ruleprogramid");

                entity.Property(e => e.Code).HasMaxLength(10);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsSystem).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.NameEn).HasMaxLength(250);

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.Sequence).HasColumnType("int(11)");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<RuleprogramDetail>(entity =>
            {
                entity.ToTable("ruleprogram_detail");

                entity.Property(e => e.RuleprogramDetailid)
                    .HasColumnType("int(11)")
                    .HasColumnName("ruleprogram_detailid");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(2500);

                entity.Property(e => e.NameEn).HasMaxLength(2500);

                entity.Property(e => e.Ruleprogramid)
                    .HasColumnType("int(11)")
                    .HasColumnName("ruleprogramid");

                entity.Property(e => e.Sequence).HasColumnType("int(11)");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.HasCharSet("utf8mb4")
                    .UseCollation("utf8mb4_general_ci");

                entity.Property(e => e.UserId).HasMaxLength(36);

                entity.Property(e => e.ActiveDate).HasColumnType("datetime");

                entity.Property(e => e.CreatedBy).HasMaxLength(50);

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.EmpId).HasMaxLength(36);

                entity.Property(e => e.ExpireDate).HasColumnType("datetime");

                entity.Property(e => e.GoogleTokenId)
                    .HasMaxLength(100)
                    .HasColumnName("GoogleTokenID");

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsGoogle).HasMaxLength(10);

                entity.Property(e => e.IsReset).HasMaxLength(10);

                entity.Property(e => e.Password).HasMaxLength(50);

                entity.Property(e => e.UpdateBy).HasMaxLength(50);

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.Username).HasMaxLength(50);
            });

            modelBuilder.Entity<Usersbranch>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.BranchId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("usersbranch");

                entity.HasCharSet("utf8mb4")
                    .UseCollation("utf8mb4_general_ci");

                entity.Property(e => e.UserId).HasMaxLength(36);

                entity.Property(e => e.BranchId).HasMaxLength(36);

                entity.Property(e => e.CreatedBy).HasMaxLength(36);

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.UpdateBy).HasMaxLength(36);

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<Userscustomer>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.CustomerId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("userscustomer");

                entity.HasCharSet("utf8mb4")
                    .UseCollation("utf8mb4_general_ci");

                entity.Property(e => e.UserId).HasMaxLength(36);

                entity.Property(e => e.CustomerId).HasMaxLength(36);

                entity.Property(e => e.CreatedBy).HasMaxLength(50);

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.UpdateBy).HasMaxLength(50);

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<Userspermission>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PRIMARY");

                entity.ToTable("userspermission");

                entity.HasCharSet("utf8mb4")
                    .UseCollation("utf8mb4_general_ci");

                entity.Property(e => e.UserId).HasMaxLength(36);

                entity.Property(e => e.CreatedBy).HasMaxLength(36);

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.PermissionCode)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.UpdateBy).HasMaxLength(36);

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");
            });

            modelBuilder.Entity<VAuditprogramFsgroup>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_auditprogram_fsgroup");

                entity.Property(e => e.AuditProgramCode).HasMaxLength(10);

                entity.Property(e => e.AuditProgramEn).HasMaxLength(250);

                entity.Property(e => e.AuditProgramId).HasColumnType("int(11)");

                entity.Property(e => e.AuditProgramName).HasMaxLength(250);

                entity.Property(e => e.FsgroupCode)
                    .HasMaxLength(10)
                    .HasColumnName("FSGroupCode");

                entity.Property(e => e.FsgroupId)
                    .HasColumnType("int(11)")
                    .HasColumnName("FSGroupId");

                entity.Property(e => e.FsgroupName)
                    .HasMaxLength(250)
                    .HasColumnName("FSGroupName");

                entity.Property(e => e.FsgroupNameEn)
                    .HasMaxLength(250)
                    .HasColumnName("FSGroupNameEn");

                entity.Property(e => e.IsActive).HasMaxLength(10);

                entity.Property(e => e.IsDelete).HasMaxLength(10);

                entity.Property(e => e.IsSystem).HasMaxLength(10);

                entity.Property(e => e.OwnerId).HasMaxLength(36);
            });

            modelBuilder.Entity<VDocumentlist>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_documentlist");

                entity.Property(e => e.BranchCode).HasMaxLength(50);

                entity.Property(e => e.BranchId)
                    .IsRequired()
                    .HasMaxLength(36);

                entity.Property(e => e.BranchName).HasMaxLength(150);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.CustomerCode).HasMaxLength(50);

                entity.Property(e => e.CustomerId).HasMaxLength(36);

                entity.Property(e => e.CustomerName).HasMaxLength(200);

                entity.Property(e => e.DocumentListCode).HasMaxLength(50);

                entity.Property(e => e.DocumentListId)
                    .IsRequired()
                    .HasMaxLength(36);

                entity.Property(e => e.DocumentStyleId).HasMaxLength(10);

                entity.Property(e => e.DocumentStyleName).HasMaxLength(100);

                entity.Property(e => e.DocumentTypeId).HasMaxLength(10);

                entity.Property(e => e.DocumentTypeName).HasMaxLength(250);

                entity.Property(e => e.Extension).HasMaxLength(10);

                entity.Property(e => e.IsDelete)
                    .HasMaxLength(10)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.LinkPath).HasMaxLength(200);

                entity.Property(e => e.NameFile).HasMaxLength(200);

                entity.Property(e => e.OwnerId)
                    .IsRequired()
                    .HasMaxLength(36);

                entity.Property(e => e.PathFile).HasMaxLength(200);

                entity.Property(e => e.Remark).HasMaxLength(500);

                entity.Property(e => e.Size)
                    .HasPrecision(18, 2)
                    .HasColumnName("size");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");
            });

            modelBuilder.Entity<VRequestform>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_requestform");

                entity.Property(e => e.ApproveBy).HasMaxLength(36);

                entity.Property(e => e.ApproveFullName)
                    .HasMaxLength(201)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.ApproveOn).HasColumnType("datetime");

                entity.Property(e => e.ContactEmail).HasMaxLength(50);

                entity.Property(e => e.ContactMobilePhone).HasMaxLength(20);

                entity.Property(e => e.ContactName).HasMaxLength(100);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(36)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.Detail).HasMaxLength(5000);

                entity.Property(e => e.FullName)
                    .HasMaxLength(201)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.OwnerId).HasMaxLength(36);

                entity.Property(e => e.RequestDate).HasColumnType("datetime");

                entity.Property(e => e.RequestId)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.RequestKey).HasColumnType("int(11)");

                entity.Property(e => e.ResponseMessage).HasMaxLength(500);

                entity.Property(e => e.Status).HasMaxLength(10);

                entity.Property(e => e.StatusName).HasMaxLength(100);

                entity.Property(e => e.Subject).HasMaxLength(100);

                entity.Property(e => e.SubjectName).HasMaxLength(100);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(36)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.UserId).HasMaxLength(36);
            });

            modelBuilder.Entity<VUsersbranch>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_usersbranch");

                entity.Property(e => e.BranchCode).HasMaxLength(50);

                entity.Property(e => e.BranchId)
                    .IsRequired()
                    .HasMaxLength(36)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(36)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsDelete)
                    .HasMaxLength(10)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.Name).HasMaxLength(150);

                entity.Property(e => e.NameEn).HasMaxLength(150);

                entity.Property(e => e.OwnerId)
                    .IsRequired()
                    .HasMaxLength(36);

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(36)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(36)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");
            });

            modelBuilder.Entity<VUserspermission>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_userspermission");

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(36)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.IsDelete)
                    .HasMaxLength(10)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.NameEn)
                    .HasMaxLength(50)
                    .HasColumnName("NameEN")
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.PermissionCode)
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdateBy)
                    .HasMaxLength(36)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("current_timestamp()");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(36)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .HasComment("utf8mb4_general_ci")
                    .HasCharSet("utf8mb4");
            });

        }


    }
}
