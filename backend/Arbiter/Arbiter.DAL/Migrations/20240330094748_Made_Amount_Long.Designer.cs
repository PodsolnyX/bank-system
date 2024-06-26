﻿// <auto-generated />
using System;
using Arbiter.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Arbiter.DAL.Migrations
{
    [DbContext(typeof(ArbiterDbContext))]
    [Migration("20240330094748_Made_Amount_Long")]
    partial class Made_Amount_Long
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Arbiter.DAL.Entities.ChargeLoanTransaction", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("AccountId")
                        .HasColumnType("uuid");

                    b.Property<int>("AccountLoanChargeRetries")
                        .HasColumnType("integer");

                    b.Property<int>("AccountLoanChargeStatus")
                        .HasColumnType("integer");

                    b.Property<long>("Amount")
                        .HasColumnType("bigint");

                    b.Property<int>("CheckAccountRetries")
                        .HasColumnType("integer");

                    b.Property<int>("CheckAccountStatus")
                        .HasColumnType("integer");

                    b.Property<int>("CurrencyType")
                        .HasColumnType("integer");

                    b.Property<int>("LoanChargeRetries")
                        .HasColumnType("integer");

                    b.Property<int>("LoanChargeStatus")
                        .HasColumnType("integer");

                    b.Property<Guid>("LoanId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("TariffId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.ToTable("ChargeLoanTransactions");
                });

            modelBuilder.Entity("Arbiter.DAL.Entities.RequestLoanTransaction", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("AccountId")
                        .HasColumnType("uuid");

                    b.Property<int>("AccountLoanIncomeRetries")
                        .HasColumnType("integer");

                    b.Property<int>("AccountLoanIncomeStatus")
                        .HasColumnType("integer");

                    b.Property<long>("Amount")
                        .HasColumnType("bigint");

                    b.Property<int>("CheckAccountRetries")
                        .HasColumnType("integer");

                    b.Property<int>("CheckAccountStatus")
                        .HasColumnType("integer");

                    b.Property<int>("CurrencyType")
                        .HasColumnType("integer");

                    b.Property<Guid>("LoanId")
                        .HasColumnType("uuid");

                    b.Property<int>("TakeLoanRetries")
                        .HasColumnType("integer");

                    b.Property<int>("TakeLoanStatus")
                        .HasColumnType("integer");

                    b.Property<Guid>("TariffId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.ToTable("RequestLoanTransactions");
                });
#pragma warning restore 612, 618
        }
    }
}
