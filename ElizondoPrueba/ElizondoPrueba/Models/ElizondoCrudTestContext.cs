using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using ElizondoPrueba.Models;

namespace ElizondoPrueba.Models;

public partial class ElizondoCrudTestContext : DbContext
{
    public ElizondoCrudTestContext()
    {
    }

    public ElizondoCrudTestContext(DbContextOptions<ElizondoCrudTestContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Tarea> Tareas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tarea>(entity =>
        {
            entity.HasKey(e => e.IdTarea).HasName("PK__Tareas__EADE9098E5395E9F");

            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Estado)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Titulo)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
