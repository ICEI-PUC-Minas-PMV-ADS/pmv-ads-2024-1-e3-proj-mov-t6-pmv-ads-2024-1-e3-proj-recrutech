﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Recrutech_api.Model;

#nullable disable

namespace Recrutech_api.Migrations
{
    [DbContext(typeof(recrutechDbContext))]
    [Migration("20240413040229_new-t4")]
    partial class newt4
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.28")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("CurriculumVacancy", b =>
                {
                    b.Property<int>("CvsId")
                        .HasColumnType("integer");

                    b.Property<int>("VacanciesId")
                        .HasColumnType("integer");

                    b.HasKey("CvsId", "VacanciesId");

                    b.HasIndex("VacanciesId");

                    b.ToTable("CurriculumVacancy");
                });

            modelBuilder.Entity("Recrutech_api.Model.Address", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Bairro")
                        .HasColumnType("text");

                    b.Property<string>("Cep")
                        .HasColumnType("text");

                    b.Property<string>("Complemento")
                        .HasColumnType("text");

                    b.Property<string>("Gia")
                        .HasColumnType("text");

                    b.Property<string>("Ibge")
                        .HasColumnType("text");

                    b.Property<string>("Localidade")
                        .HasColumnType("text");

                    b.Property<string>("Logradouro")
                        .HasColumnType("text");

                    b.Property<string>("Siafi")
                        .HasColumnType("text");

                    b.Property<string>("UF")
                        .HasColumnType("text");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("Recrutech_api.Model.Course", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("CurriculumId")
                        .HasColumnType("integer");

                    b.Property<DateTimeOffset?>("EndDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Institution")
                        .HasColumnType("text");

                    b.Property<string>("MyCourse")
                        .HasColumnType("text");

                    b.Property<DateTimeOffset?>("StartDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("CurriculumId");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("Recrutech_api.Model.Curriculum", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("About")
                        .HasColumnType("text");

                    b.Property<string>("Github")
                        .HasColumnType("text");

                    b.Property<string>("Linkedin")
                        .HasColumnType("text");

                    b.Property<string[]>("Tecnologies")
                        .HasColumnType("text[]");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Cvs");
                });

            modelBuilder.Entity("Recrutech_api.Model.Experience", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("CurriculumId")
                        .HasColumnType("integer");

                    b.Property<DateTimeOffset?>("EndDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Enterprise")
                        .HasColumnType("text");

                    b.Property<string>("Function")
                        .HasColumnType("text");

                    b.Property<DateTimeOffset?>("StartDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("CurriculumId");

                    b.ToTable("Experiences");
                });

            modelBuilder.Entity("Recrutech_api.Model.Recommendation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Recomendations");
                });

            modelBuilder.Entity("Recrutech_api.Model.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<long?>("CurriculumId")
                        .HasColumnType("bigint");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<bool?>("IsRecruiter")
                        .HasColumnType("boolean");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<string>("UserName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Recrutech_api.Model.UserRecommendation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool?>("IsProvider")
                        .HasColumnType("boolean");

                    b.Property<int?>("RecommendationId")
                        .HasColumnType("integer");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("RecommendationId");

                    b.HasIndex("UserId");

                    b.ToTable("UserRecomendations");
                });

            modelBuilder.Entity("Recrutech_api.Model.Vacancy", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string[]>("Benefits")
                        .HasColumnType("text[]");

                    b.Property<string>("Content")
                        .HasColumnType("text");

                    b.Property<int?>("Contract")
                        .HasColumnType("integer");

                    b.Property<string>("Enterprise")
                        .HasColumnType("text");

                    b.Property<string>("Link")
                        .HasColumnType("text");

                    b.Property<string>("Location")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Remuneration")
                        .HasColumnType("text");

                    b.Property<string[]>("Requirements")
                        .HasColumnType("text[]");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Vacancies");
                });

            modelBuilder.Entity("CurriculumVacancy", b =>
                {
                    b.HasOne("Recrutech_api.Model.Curriculum", null)
                        .WithMany()
                        .HasForeignKey("CvsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Recrutech_api.Model.Vacancy", null)
                        .WithMany()
                        .HasForeignKey("VacanciesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Recrutech_api.Model.Address", b =>
                {
                    b.HasOne("Recrutech_api.Model.User", "User")
                        .WithOne("Address")
                        .HasForeignKey("Recrutech_api.Model.Address", "UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Recrutech_api.Model.Course", b =>
                {
                    b.HasOne("Recrutech_api.Model.Curriculum", null)
                        .WithMany("Course")
                        .HasForeignKey("CurriculumId");
                });

            modelBuilder.Entity("Recrutech_api.Model.Curriculum", b =>
                {
                    b.HasOne("Recrutech_api.Model.User", "User")
                        .WithOne("Curriculum")
                        .HasForeignKey("Recrutech_api.Model.Curriculum", "UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Recrutech_api.Model.Experience", b =>
                {
                    b.HasOne("Recrutech_api.Model.Curriculum", null)
                        .WithMany("Experience")
                        .HasForeignKey("CurriculumId");
                });

            modelBuilder.Entity("Recrutech_api.Model.UserRecommendation", b =>
                {
                    b.HasOne("Recrutech_api.Model.Recommendation", "Recommendation")
                        .WithMany("UserRecommendations")
                        .HasForeignKey("RecommendationId");

                    b.HasOne("Recrutech_api.Model.User", "User")
                        .WithMany("UserRecommendations")
                        .HasForeignKey("UserId");

                    b.Navigation("Recommendation");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Recrutech_api.Model.Vacancy", b =>
                {
                    b.HasOne("Recrutech_api.Model.User", "User")
                        .WithMany("VacanciesOwner")
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Recrutech_api.Model.Curriculum", b =>
                {
                    b.Navigation("Course");

                    b.Navigation("Experience");
                });

            modelBuilder.Entity("Recrutech_api.Model.Recommendation", b =>
                {
                    b.Navigation("UserRecommendations");
                });

            modelBuilder.Entity("Recrutech_api.Model.User", b =>
                {
                    b.Navigation("Address");

                    b.Navigation("Curriculum");

                    b.Navigation("UserRecommendations");

                    b.Navigation("VacanciesOwner");
                });
#pragma warning restore 612, 618
        }
    }
}
