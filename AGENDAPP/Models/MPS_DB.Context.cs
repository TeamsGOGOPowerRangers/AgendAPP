﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AGENDAPP.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class MPS_DB : DbContext
    {
        public MPS_DB()
            : base("name=MPS_DB")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<MPS_AJUSTE_DISPONIBILIDAD> MPS_AJUSTE_DISPONIBILIDAD { get; set; }
        public virtual DbSet<MPS_COMUNA> MPS_COMUNA { get; set; }
        public virtual DbSet<MPS_CONTRATO> MPS_CONTRATO { get; set; }
        public virtual DbSet<MPS_CONTRATO_ORGANIZACION> MPS_CONTRATO_ORGANIZACION { get; set; }
        public virtual DbSet<MPS_CONVENIO> MPS_CONVENIO { get; set; }
        public virtual DbSet<MPS_DETALLE_DIAS_ATENCION> MPS_DETALLE_DIAS_ATENCION { get; set; }
        public virtual DbSet<MPS_DETALLE_HORARIO_PROFESIONAL> MPS_DETALLE_HORARIO_PROFESIONAL { get; set; }
        public virtual DbSet<MPS_DIAS_SEMANA> MPS_DIAS_SEMANA { get; set; }
        public virtual DbSet<MPS_ETIQUETAS> MPS_ETIQUETAS { get; set; }
        public virtual DbSet<MPS_EVENTO_CLINICO> MPS_EVENTO_CLINICO { get; set; }
        public virtual DbSet<MPS_FICHA> MPS_FICHA { get; set; }
        public virtual DbSet<MPS_FICHA_CLINICA> MPS_FICHA_CLINICA { get; set; }
        public virtual DbSet<MPS_HORARIO_PROFESIONAL> MPS_HORARIO_PROFESIONAL { get; set; }
        public virtual DbSet<MPS_MODO_LLEGADA> MPS_MODO_LLEGADA { get; set; }
        public virtual DbSet<MPS_OCUPACIONES> MPS_OCUPACIONES { get; set; }
        public virtual DbSet<MPS_ORGANIZACION> MPS_ORGANIZACION { get; set; }
        public virtual DbSet<MPS_PRESTACION_PREVISION> MPS_PRESTACION_PREVISION { get; set; }
        public virtual DbSet<MPS_PRESTACION_PROFESIONALES> MPS_PRESTACION_PROFESIONALES { get; set; }
        public virtual DbSet<MPS_PREVISION> MPS_PREVISION { get; set; }
        public virtual DbSet<MPS_REGION> MPS_REGION { get; set; }
        public virtual DbSet<MPS_TIPO_ORGANIZACION> MPS_TIPO_ORGANIZACION { get; set; }
        public virtual DbSet<MSP_PRESTACION> MSP_PRESTACION { get; set; }
        public virtual DbSet<MPS_SECCION> MPS_SECCION { get; set; }
    }
}
