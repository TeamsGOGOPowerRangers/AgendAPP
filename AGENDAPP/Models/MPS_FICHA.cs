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
    
    public partial class MPS_FICHA
    {
        public long ID_FICHA { get; set; }
        public string NUMERO_FICHA { get; set; }
        public string NOMBRES { get; set; }
        public string APELLIDO_PATERNO { get; set; }
        public string APELLIDO_MATERNO { get; set; }
        public string NACIONALIDAD { get; set; }
        public string IDENTIFICACION { get; set; }
        public Nullable<System.DateTime> FECHA_NACIMIENTO { get; set; }
        public string EMAIL { get; set; }
        public string TELEFONO_FIJO { get; set; }
        public string TELEFONO_MOVIL { get; set; }
        public Nullable<int> COD_CONVENIO { get; set; }
        public Nullable<int> COD_PREVISION { get; set; }
        public Nullable<int> COD_MODO_LLEGADA { get; set; }
        public Nullable<int> COD_REGION { get; set; }
        public Nullable<int> COD_COMUNA { get; set; }
        public string CALLE { get; set; }
        public string NUMERO { get; set; }
        public string PISO { get; set; }
        public string OFICINA { get; set; }
        public string COMENTARIO { get; set; }
        public string ALERTA_EN_FICHA { get; set; }
        public string ALERTA_EN_TOMA_HORA { get; set; }
        public Nullable<int> COD_ORGANIZACION { get; set; }
        public Nullable<int> SEXO { get; set; }
        public Nullable<int> COD_ETIQUETA { get; set; }
    }
}
