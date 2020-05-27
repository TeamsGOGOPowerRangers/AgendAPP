using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AGENDAPP.Models
{
    public class Mantenedor_Model
    {
        public static string Formato = "yyyy/MM/dd";

        #region Etiqueta
        public static object Etiqueta()
        {
            using (MPS_DB db = new MPS_DB())
            {
                object[] datos = (from c in db.MPS_ETIQUETAS
                                  select new
                                  {
                                      c.ID_ETIQUETA,
                                      c.NOMBRE_COLORR,
                                      c.COLOR,
                                      c.FECHA_CREACION,
                                      c.FECHA_EDICION,
                                      c.ESTADO
                                  }).ToArray();



                return new { RESPUESTA = true, TIPO = 0, datos };

            }
        }

        public static object GuardarEtiqueta(string NombreColor, string Color)
        {
            try
            {
                MPS_ETIQUETAS Mps_COLORES = new MPS_ETIQUETAS();
                Mps_COLORES.NOMBRE_COLORR = NombreColor;
                Mps_COLORES.COLOR = Color;
                Mps_COLORES.FECHA_CREACION = DateTime.Now;
                Mps_COLORES.ESTADO = 1;
                using (MPS_DB db = new MPS_DB())
                {
                    db.MPS_ETIQUETAS.Add(Mps_COLORES);
                    db.SaveChanges();

                    object datos = (from c in db.MPS_ETIQUETAS
                                    where c.ID_ETIQUETA == Mps_COLORES.ID_ETIQUETA
                                    select new
                                    {
                                        c.ID_ETIQUETA,
                                        c.NOMBRE_COLORR,
                                        c.COLOR,
                                        c.FECHA_CREACION,
                                        c.FECHA_EDICION,
                                        c.ESTADO
                                    }).FirstOrDefault();

                    return new { RESPUESTA = true, TIPO = 0, data = datos };
                }

            }
            catch (Exception e)
            {
                return new { RESPUESTA = false, TIPO = 1, e.Message };
            }

        }

        public static object ListaEtiquetasId(int id)
        {
            using (MPS_DB db = new MPS_DB())
            {



                object[] datos = (from c in db.MPS_ETIQUETAS

                                  where c.ID_ETIQUETA == id
                                  select new
                                  {
                                      c.ID_ETIQUETA,
                                      c.NOMBRE_COLORR,
                                      c.COLOR,
                                      c.FECHA_CREACION,
                                      c.FECHA_EDICION,
                                      c.ESTADO

                                  }).ToArray();




                return new { RESPUESTA = true, TIPO = 0, datos };
            }
        }

        public static object ModificarEtiqueta(int ID_COLOR, string NOMBRE, string COLOR, int COD_ESTADO)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    DateTime Fecha = DateTime.Now;
                    string subQuery = $@"UPDATE MPS_ETIQUETAS SET NOMBRE_COLORR = '{ NOMBRE }' , COLOR = '{COLOR}' ,FECHA_EDICION='{ Fecha.ToString(Formato) }',
                                       ESTADO = {COD_ESTADO} where ID_ETIQUETA = { ID_COLOR } ";
                    db.Database.ExecuteSqlCommand(subQuery);

                    object datos = (from c in db.MPS_ETIQUETAS
                                    where c.ID_ETIQUETA == ID_COLOR
                                    select new
                                    {
                                        c.ID_ETIQUETA,
                                        c.NOMBRE_COLORR,
                                        c.COLOR,
                                        c.FECHA_CREACION,
                                        c.FECHA_EDICION,
                                        c.ESTADO
                                    }).FirstOrDefault();



                    return new { RESPUESTA = true, TIPO = 0, data = datos };
                }

            }
            catch (Exception e)
            {
                return new { RESPUESTA = false, TIPO = 1, e.Message };
            }

        }
        #endregion

        #region Ocupacion
        public static object OcupacionesLitas()
        {
            using (MPS_DB db = new MPS_DB())
            {
                object[] datos = (from c in db.MPS_OCUPACIONES
                                  select new
                                  {
                                      c.ID_OCUPACION,
                                      c.NOMBRE_OCUPACION,
                                      c.DESCRIPCION,
                                      c.FECHA_CREACION,
                                      c.FECHA_EDICION,
                                      c.ESTADO
                             
                                  }).ToArray();



                return new { RESPUESTA = true, TIPO = 0, datos };

            }
        }

        public static object GuardarOcupaciones(string NombreOcupacion, string Descripcion)
        {
            try
            {
                MPS_OCUPACIONES Mps_OCUPACIONES = new MPS_OCUPACIONES();
                Mps_OCUPACIONES.NOMBRE_OCUPACION = NombreOcupacion;
                Mps_OCUPACIONES.DESCRIPCION = Descripcion;
                Mps_OCUPACIONES.FECHA_CREACION = DateTime.Now;
                Mps_OCUPACIONES.ESTADO = 1;
                using (MPS_DB db = new MPS_DB())
                {
                    db.MPS_OCUPACIONES.Add(Mps_OCUPACIONES);
                    db.SaveChanges();

                    object datos = (from c in db.MPS_OCUPACIONES
                                    where c.ID_OCUPACION == Mps_OCUPACIONES.ID_OCUPACION
                                    select new
                                    {
                                        c.ID_OCUPACION,
                                        c.NOMBRE_OCUPACION,
                                        c.DESCRIPCION,
                                        c.FECHA_CREACION,
                                        c.FECHA_EDICION,
                                        c.ESTADO
                                    }).FirstOrDefault();

                    return new { RESPUESTA = true, TIPO = 0, data = datos };
                }

            }
            catch (Exception e)
            {
                return new { RESPUESTA = false, TIPO = 1, e.Message };
            }

        }

        public static object ListaOcupacionesId(int id)
        {
            using (MPS_DB db = new MPS_DB())
            {



                object[] datos = (from c in db.MPS_OCUPACIONES

                                  where c.ID_OCUPACION == id
                                  select new
                                  {
                                      c.ID_OCUPACION,
                                      c.NOMBRE_OCUPACION,
                                      c.DESCRIPCION,
                                      c.FECHA_CREACION,
                                      c.FECHA_EDICION,
                                      c.ESTADO

                                  }).ToArray();




                return new { RESPUESTA = true, TIPO = 0, datos };
            }
        }

        public static object ModificarOcupaciones(int ID_OCUPACION, string NOMBRE, string DESCRIPCION, int COD_ESTADO)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    DateTime Fecha = DateTime.Now;
                    string subQuery = $@"UPDATE MPS_OCUPACIONES SET NOMBRE_OCUPACION = '{ NOMBRE }' , DESCRIPCION = '{DESCRIPCION}' ,FECHA_EDICION='{ Fecha.ToString(Formato) }',
                                       ESTADO = {COD_ESTADO} where ID_OCUPACION = { ID_OCUPACION } ";
                    db.Database.ExecuteSqlCommand(subQuery);

                    object datos = (from c in db.MPS_OCUPACIONES
                                    where c.ID_OCUPACION == ID_OCUPACION
                                    select new
                                    {
                                        c.ID_OCUPACION,
                                        c.NOMBRE_OCUPACION,
                                        c.DESCRIPCION,
                                        c.FECHA_CREACION,
                                        c.FECHA_EDICION,
                                        c.ESTADO
                                    }).FirstOrDefault();



                    return new { RESPUESTA = true, TIPO = 0, data = datos };
                }

            }
            catch (Exception e)
            {
                return new { RESPUESTA = false, TIPO = 1, e.Message };
            }

        }
        #endregion

        #region Prevision
        public static object PrevisionLitas()
        {
            using (MPS_DB db = new MPS_DB())
            {
                object[] datos = (from c in db.MPS_PREVISION
                                  select new
                                  {
                                      c.ID_PREVISION,
                                      c.NOMBRE_PREVISION,
                                      c.DESCRIPCION,
                                      c.FECHA_CREACION,
                                      c.FECHA_EDICION,
                                      c.ESTADO

                                  }).ToArray();



                return new { RESPUESTA = true, TIPO = 0, datos };

            }
        }

        public static object GuardarPrevision(string NombrePrevision, string Descripcion)
        {
            try
            {
                MPS_PREVISION Mps_PREVISION = new MPS_PREVISION();
                Mps_PREVISION.NOMBRE_PREVISION = NombrePrevision;
                Mps_PREVISION.DESCRIPCION = Descripcion;
                Mps_PREVISION.FECHA_CREACION = DateTime.Now;
                Mps_PREVISION.ESTADO = 1;
                using (MPS_DB db = new MPS_DB())
                {
                    db.MPS_PREVISION.Add(Mps_PREVISION);
                    db.SaveChanges();

                    object datos = (from c in db.MPS_PREVISION
                                    where c.ID_PREVISION == Mps_PREVISION.ID_PREVISION
                                    select new
                                    {
                                        c.ID_PREVISION,
                                        c.NOMBRE_PREVISION,
                                        c.DESCRIPCION,
                                        c.FECHA_CREACION,
                                        c.FECHA_EDICION,
                                        c.ESTADO
                                    }).FirstOrDefault();

                    return new { RESPUESTA = true, TIPO = 0, data = datos };
                }

            }
            catch (Exception e)
            {
                return new { RESPUESTA = false, TIPO = 1, e.Message };
            }

        }

        public static object ListaPrevisionId(int id)
        {
            using (MPS_DB db = new MPS_DB())
            {



                object[] datos = (from c in db.MPS_PREVISION

                                  where c.ID_PREVISION == id
                                  select new
                                  {
                                      c.ID_PREVISION,
                                      c.NOMBRE_PREVISION,
                                      c.DESCRIPCION,
                                      c.FECHA_CREACION,
                                      c.FECHA_EDICION,
                                      c.ESTADO

                                  }).ToArray();




                return new { RESPUESTA = true, TIPO = 0, datos };
            }
        }

        public static object ModificarPrevision(int ID_PREVISION, string NOMBRE, string DESCRIPCION, int COD_ESTADO)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    DateTime Fecha = DateTime.Now;
                    string subQuery = $@"UPDATE MPS_PREVISION SET NOMBRE_PREVISION = '{ NOMBRE }' , DESCRIPCION = '{DESCRIPCION}' ,FECHA_EDICION='{ Fecha.ToString(Formato) }',
                                       ESTADO = {COD_ESTADO} where ID_PREVISION = { ID_PREVISION } ";
                    db.Database.ExecuteSqlCommand(subQuery);

                    object datos = (from c in db.MPS_PREVISION
                                    where c.ID_PREVISION == ID_PREVISION
                                    select new
                                    {
                                        c.ID_PREVISION,
                                        c.NOMBRE_PREVISION,
                                        c.DESCRIPCION,
                                        c.FECHA_CREACION,
                                        c.FECHA_EDICION,
                                        c.ESTADO
                                    }).FirstOrDefault();



                    return new { RESPUESTA = true, TIPO = 0, data = datos };
                }

            }
            catch (Exception e)
            {
                return new { RESPUESTA = false, TIPO = 1, e.Message };
            }

        }
        #endregion

        #region Seccion
        public static object SeccionLitas()
        {
            using (MPS_DB db = new MPS_DB())
            {
                object[] datos = (from c in db.MPS_SECCION
                                  select new
                                  {
                                   c.ID_SECCION,
                                   c.NOMBRE_SECCION,
                                   c.DESCRIPCION,
                                   c.IMPUESTO,
                                   c.FECHA_CREACION,
                                   c.FECHA_EDICION,
                                   c.ESTADO

                                  }).ToArray();



                return new { RESPUESTA = true, TIPO = 0, datos };

            }
        }

        public static object GuardarSeccion(string NombreSeccion, string Descripcion, int Impuesto)
        {
            try
            {
                MPS_SECCION Mps_Seccion = new MPS_SECCION();
                Mps_Seccion.NOMBRE_SECCION = NombreSeccion;
                Mps_Seccion.DESCRIPCION = Descripcion;
                Mps_Seccion.IMPUESTO = Impuesto;
                Mps_Seccion.FECHA_CREACION = DateTime.Now;
                Mps_Seccion.ESTADO = 1;
                using (MPS_DB db = new MPS_DB())
                {
                    db.MPS_SECCION.Add(Mps_Seccion);
                    db.SaveChanges();

                    object datos = (from c in db.MPS_SECCION
                                    where c.ID_SECCION == Mps_Seccion.ID_SECCION
                                    select new
                                    {
                                        c.ID_SECCION,
                                        c.NOMBRE_SECCION,
                                        c.DESCRIPCION,
                                        c.IMPUESTO,
                                        c.FECHA_CREACION,
                                        c.FECHA_EDICION,
                                        c.ESTADO
                                    }).FirstOrDefault();

                    return new { RESPUESTA = true, TIPO = 0, data = datos };
                }

            }
            catch (Exception e)
            {
                return new { RESPUESTA = false, TIPO = 1, e.Message };
            }

        }

        public static object ListaSeccionId(int id)
        {
            using (MPS_DB db = new MPS_DB())
            {



                object[] datos = (from c in db.MPS_SECCION

                                  where c.ID_SECCION == id
                                  select new
                                  {
                                      c.ID_SECCION,
                                      c.NOMBRE_SECCION,
                                      c.DESCRIPCION,
                                      c.IMPUESTO,
                                      c.FECHA_CREACION,
                                      c.FECHA_EDICION,
                                      c.ESTADO

                                  }).ToArray();




                return new { RESPUESTA = true, TIPO = 0, datos };
            }
        }

        public static object ModificarSeccion(int ID_SECCION, string NOMBRE, string DESCRIPCION, int IMPUESTO, int COD_ESTADO)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    DateTime Fecha = DateTime.Now;
                    string subQuery = $@"UPDATE MPS_SECCION SET NOMBRE_SECCION = '{ NOMBRE }' , DESCRIPCION = '{DESCRIPCION}' ,FECHA_EDICION='{ Fecha.ToString(Formato) }',IMPUESTO = {IMPUESTO},
                                       ESTADO = {COD_ESTADO} where ID_SECCION = { ID_SECCION } ";
                    db.Database.ExecuteSqlCommand(subQuery);

                    object datos = (from c in db.MPS_SECCION
                                    where c.ID_SECCION == ID_SECCION
                                    select new
                                    {
                                        c.ID_SECCION,
                                        c.NOMBRE_SECCION,
                                        c.DESCRIPCION,
                                        c.IMPUESTO,
                                        c.FECHA_CREACION,
                                        c.FECHA_EDICION,
                                        c.ESTADO
                                    }).FirstOrDefault();



                    return new { RESPUESTA = true, TIPO = 0, data = datos };
                }

            }
            catch (Exception e)
            {
                return new { RESPUESTA = false, TIPO = 1, e.Message };
            }

        }
        #endregion

        #region Telefono
        public static object TelefonoLista()
        {
            using (MPS_DB db = new MPS_DB())
            {
                object[] datos = (from c in db.MPS_TELEFONO
                                  select new
                                  {
                                   c.ID_TELEFONO,
                                   c.TIPO,
                                   c.CODIGO_TELEFONO,
                                   c.NUMERO,
                                   c.COMENTARIO,
                                   c.FECHA_CREACION,
                                   c.FECHA_EDICION,
                                   c.PRINCIPAL,
                                   c.ESTADO

                                  }).ToArray();



                return new { RESPUESTA = true, TIPO = 0, datos };

            }
        }

        public static object GuardarTelefono(string SelectTipo, string Codigo, string Numero,string Comentario,int Principal)
        {
            try
            {
                MPS_TELEFONO Mps_Telefono = new MPS_TELEFONO();
                Mps_Telefono.TIPO = SelectTipo;
                Mps_Telefono.CODIGO_TELEFONO = Codigo;
                Mps_Telefono.NUMERO = Numero;
                Mps_Telefono.COMENTARIO = Comentario;
                Mps_Telefono.FECHA_CREACION = DateTime.Now;
                Mps_Telefono.PRINCIPAL = Principal;
                Mps_Telefono.ESTADO = 1;
                using (MPS_DB db = new MPS_DB())
                {
                    db.MPS_TELEFONO.Add(Mps_Telefono);
                    db.SaveChanges();

                    object datos = (from c in db.MPS_TELEFONO
                                    where c.ID_TELEFONO == Mps_Telefono.ID_TELEFONO
                                    select new
                                    {
                                        c.ID_TELEFONO,
                                        c.TIPO,
                                        c.CODIGO_TELEFONO,
                                        c.NUMERO,
                                        c.COMENTARIO,
                                        c.FECHA_CREACION,
                                        c.FECHA_EDICION,
                                        c.PRINCIPAL,
                                        c.ESTADO
                                    }).FirstOrDefault();

                    return new { RESPUESTA = true, TIPO = 0, data = datos };
                }

            }
            catch (Exception e)
            {
                return new { RESPUESTA = false, TIPO = 1, e.Message };
            }

        }

        public static object ListaTelefonoId(int id)
        {
            using (MPS_DB db = new MPS_DB())
            {



                object[] datos = (from c in db.MPS_TELEFONO

                                  where c.ID_TELEFONO == id
                                  select new
                                  {
                                      c.ID_TELEFONO,
                                      c.TIPO,
                                      c.CODIGO_TELEFONO,
                                      c.NUMERO,
                                      c.COMENTARIO,
                                      c.FECHA_CREACION,
                                      c.FECHA_EDICION,
                                      c.PRINCIPAL,
                                      c.ESTADO

                                  }).ToArray();




                return new { RESPUESTA = true, TIPO = 0, datos };
            }
        }

        public static object ModificarTelefono(int ID_TELEFONO, string Tipo, string Codigo, string Numero, string Comentario, int Principal, int CodEstado)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    DateTime Fecha = DateTime.Now;
                    string subQuery = $@"UPDATE MPS_TELEFONO SET TIPO = '{ Tipo }' , CODIGO_TELEFONO = '{Codigo}' ,NUMERO = '{Numero}',COMENTARIO = '{Comentario}',FECHA_EDICION='{ Fecha.ToString(Formato) }',PRINCIPAL = {Principal},
                                       ESTADO = {CodEstado} where ID_TELEFONO = { ID_TELEFONO } ";
                    db.Database.ExecuteSqlCommand(subQuery);

                    object datos = (from c in db.MPS_TELEFONO
                                    where c.ID_TELEFONO == ID_TELEFONO
                                    select new
                                    {
                                        c.ID_TELEFONO,
                                        c.TIPO,
                                        c.CODIGO_TELEFONO,
                                        c.NUMERO,
                                        c.COMENTARIO,
                                        c.FECHA_CREACION,
                                        c.FECHA_EDICION,
                                        c.PRINCIPAL,
                                        c.ESTADO
                                    }).FirstOrDefault();



                    return new { RESPUESTA = true, TIPO = 0, data = datos };
                }

            }
            catch (Exception e)
            {
                return new { RESPUESTA = false, TIPO = 1, e.Message };
            }

        }
        #endregion
    }
}