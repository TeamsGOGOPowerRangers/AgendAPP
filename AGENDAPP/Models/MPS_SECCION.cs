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
    
    public partial class MPS_SECCION
    {
        public int ID_SECCION { get; set; }
        public string NOMBRE_SECCION { get; set; }
        public string DESCRIPCION { get; set; }
        public Nullable<int> IMPUESTO { get; set; }
        public Nullable<int> ESTADO { get; set; }
        public Nullable<System.DateTime> FECHA_CREACION { get; set; }
        public Nullable<System.DateTime> FECHA_EDICION { get; set; }
    }
}
