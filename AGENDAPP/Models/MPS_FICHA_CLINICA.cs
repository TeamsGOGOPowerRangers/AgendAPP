//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class MPS_FICHA_CLINICA
    {
        public long ID_FICHA_MEDICA { get; set; }
        public string MOTIVO_CONSULTA { get; set; }
        public string ANAMNESIS { get; set; }
        public string EVALUACION { get; set; }
        public string DIAGNOSTICO { get; set; }
        public string PATOLOGIA_GES { get; set; }
        public string EXAMENES { get; set; }
        public string SEGUIMIENTO { get; set; }
        public string TRATAMIENTO { get; set; }
        public string INDICACIONES { get; set; }
        public Nullable<long> COD_PACIENTE { get; set; }
        public Nullable<long> COD_EVENTO { get; set; }
        public Nullable<System.DateTime> FECHA_CREACION { get; set; }
        public Nullable<long> COD_ESPECIALISTA { get; set; }
    }
}