using System;
using System.Collections.Generic;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Text;
using System.Web;

namespace AGENDAPP.Models
{
    public class Pacientes_Model
    {

        public static object Pacientes()
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {

                    object Pacientes = (from a in db.MPS_FICHA.AsEnumerable()
                                        select new
                                        {

                                                           ID = EncriptarBase64(a.ID_FICHA.ToString()),
                                                           a.NUMERO_FICHA,
                                                           a.NOMBRES,
                                                           a.APELLIDO_PATERNO,
                                                           a.APELLIDO_MATERNO,
                                                           a.IDENTIFICACION,
                                                           a.FECHA_NACIMIENTO,
                                                           a.EMAIL
                                                       }).ToList();

                    return new { Respuesta = true, Pacientes};
                }
            }
            catch (Exception Error)
            {

                return new { Respuesta = false, Error.Message };
            }
        }


        public static object RegistrarPacientes(MPS_FICHA Nuevo_Paciente)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    bool Registro = db.MPS_FICHA.Any(a => a.IDENTIFICACION == Nuevo_Paciente.IDENTIFICACION);

                    if (!Registro)
                    {
                        bool Pacientes = db.MPS_FICHA.Any();
                        var N_Ficha = 0;
                        if (!Pacientes)
                        {
                            N_Ficha = 1;
                        }
                        else
                        {
                            N_Ficha = Convert.ToInt32(db.MPS_FICHA.Select(a => a.ID_FICHA).Max()) + 1;
                        }

                        Nuevo_Paciente.NUMERO_FICHA = N_Ficha.ToString();

                        db.MPS_FICHA.Add(Nuevo_Paciente);
                        db.SaveChanges();

                        object PacienteNuevo = (from a in db.MPS_FICHA.AsEnumerable() where a.ID_FICHA == Nuevo_Paciente.ID_FICHA
                                            select new
                                            {
                                                ID = EncriptarBase64(a.ID_FICHA.ToString()),
                                                a.NUMERO_FICHA,
                                                a.NOMBRES,
                                                a.APELLIDO_PATERNO,
                                                a.APELLIDO_MATERNO,
                                                a.IDENTIFICACION,
                                                a.FECHA_NACIMIENTO,
                                                a.EMAIL
                                            }).FirstOrDefault();
                       

                        return new { Respuesta = true, PacienteNuevo, Tipo = 1 };
                    }
                    else
                    {
                        return new { Respuesta = true, Tipo = 2 };
                    }

                    
                }
            }
            catch (Exception Error)
            {

                return new { Respuesta = false, Error.Message };
            }
        }


        public static object NFichaPacientes()
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    bool Pacientes = db.MPS_FICHA.Any();
                    var N_Ficha = 0;
                    if (!Pacientes)
                    {
                        N_Ficha = 1;
                    }
                    else
                    {
                        N_Ficha = Convert.ToInt32(db.MPS_FICHA.Select(a => a.ID_FICHA).Max()) + 1;
                    }

                    

                    return new { Respuesta = true, N_Ficha = N_Ficha.ToString() };
                }
            }
            catch (Exception Error)
            {

                return new { Respuesta = false, Error.Message };
            }
        }

        public static object DatosPaciente(string IdPaciente)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {

                    int IDPacienteD = Int32.Parse(DesencriptarBase64(IdPaciente));

                    object Paciente = (from a in db.MPS_FICHA.AsEnumerable()
                                            where a.ID_FICHA == IDPacienteD
                                            select new
                                            {
                                                ID = EncriptarBase64(a.ID_FICHA.ToString()),
                                                a.NUMERO_FICHA,
                                                a.NOMBRES,
                                                a.APELLIDO_PATERNO,
                                                a.APELLIDO_MATERNO,
                                                a.IDENTIFICACION,
                                                a.FECHA_NACIMIENTO,
                                                a.NACIONALIDAD,
                                                a.EMAIL,
                                                a.TELEFONO_FIJO,
                                                a.TELEFONO_MOVIL,
                                                a.COD_CONVENIO,
                                                a.COD_PREVISION,
                                                a.COD_MODO_LLEGADA,
                                                a.COD_REGION,
                                                a.COD_COMUNA,
                                                a.CALLE,
                                                a.NUMERO,
                                                a.PISO,
                                                a.OFICINA,
                                                a.COMENTARIO,
                                                a.ALERTA_EN_FICHA,
                                                a.ALERTA_EN_TOMA_HORA,
                                                a.COD_ORGANIZACION,
                                                a.SEXO,
                                                a.COD_ETIQUETA
                                            }).FirstOrDefault();

                    return new { Respuesta = true, Paciente};
                }
            }
            catch (Exception Error)
            {

                return new { Respuesta = false, Error.Message };
            }
        }

        public static object ActualizarPaciente(MPS_FICHA Actualizar_Paciente, string ID_FICHA)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    int IDPacienteD = Int32.Parse(DesencriptarBase64(ID_FICHA));

                    bool Registro = db.MPS_FICHA.Any(a => a.IDENTIFICACION == Actualizar_Paciente.IDENTIFICACION && a.ID_FICHA != IDPacienteD);

                    if (!Registro)
                    {

                        MPS_FICHA Paciente = db.MPS_FICHA.Where(a => a.ID_FICHA == IDPacienteD).FirstOrDefault();

                        Paciente.NOMBRES = Actualizar_Paciente.NOMBRES;
                        Paciente.APELLIDO_PATERNO = Actualizar_Paciente.APELLIDO_PATERNO;
                        Paciente.APELLIDO_MATERNO = Actualizar_Paciente.APELLIDO_MATERNO;
                        Paciente.NACIONALIDAD = Actualizar_Paciente.NACIONALIDAD;
                        Paciente.IDENTIFICACION = Actualizar_Paciente.IDENTIFICACION;
                        Paciente.FECHA_NACIMIENTO = Actualizar_Paciente.FECHA_NACIMIENTO;
                        Paciente.EMAIL = Actualizar_Paciente.EMAIL;
                        Paciente.TELEFONO_FIJO = Actualizar_Paciente.TELEFONO_FIJO;
                        Paciente.TELEFONO_MOVIL = Actualizar_Paciente.TELEFONO_MOVIL;
                        Paciente.COD_CONVENIO = Actualizar_Paciente.COD_CONVENIO;
                        Paciente.COD_PREVISION = Actualizar_Paciente.COD_PREVISION;
                        Paciente.COD_MODO_LLEGADA = Actualizar_Paciente.COD_MODO_LLEGADA;
                        Paciente.COD_REGION = Actualizar_Paciente.COD_REGION;
                        Paciente.COD_COMUNA = Actualizar_Paciente.COD_COMUNA;
                        Paciente.CALLE = Actualizar_Paciente.CALLE;
                        Paciente.NUMERO = Actualizar_Paciente.NUMERO;
                        Paciente.PISO = Actualizar_Paciente.PISO;
                        Paciente.OFICINA = Actualizar_Paciente.OFICINA;
                        Paciente.COMENTARIO = Actualizar_Paciente.COMENTARIO;
                        Paciente.ALERTA_EN_FICHA = Actualizar_Paciente.ALERTA_EN_FICHA;
                        Paciente.ALERTA_EN_TOMA_HORA = Actualizar_Paciente.ALERTA_EN_TOMA_HORA;
                        Paciente.SEXO = Actualizar_Paciente.SEXO;
                        Paciente.COD_ETIQUETA = Actualizar_Paciente.COD_ETIQUETA;
                        db.SaveChanges();

                        object PacienteActualizado = (from a in db.MPS_FICHA.AsEnumerable() where a.ID_FICHA == IDPacienteD
                                            select new 
                                            {
                                                ID = EncriptarBase64(a.ID_FICHA.ToString()),
                                                a.NUMERO_FICHA,
                                                a.NOMBRES,
                                                a.APELLIDO_PATERNO,
                                                a.APELLIDO_MATERNO,
                                                a.IDENTIFICACION,
                                                a.FECHA_NACIMIENTO,
                                                a.EMAIL
                                            }).FirstOrDefault();

                        return new { Respuesta = true, PacienteActualizado, Tipo = 1 };
                    }
                    else
                    {
                        return new { Respuesta = true, Tipo = 2 };
                    }


                }
            }
            catch (Exception Error)
            {

                return new { Respuesta = false, Error.Message };
            }
        }

        #region Encriptar y Desencriptar
        public static string EncriptarBase64(string Encriptar)
        {
            string Datos = Convert.ToBase64String(new ASCIIEncoding().GetBytes(Encriptar));
            return Datos;

        }
        public static string DesencriptarBase64(string Encriptar)
        {

            string Datos = Encoding.UTF8.GetString(Convert.FromBase64String(Encriptar));

            return Datos;
        }
        #endregion

    }
}