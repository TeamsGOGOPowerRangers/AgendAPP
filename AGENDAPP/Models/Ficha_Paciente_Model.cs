using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace AGENDAPP.Models
{
    public class Ficha_Paciente_Model
    {

        public static object DatosPaciente(string I)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {

                    int IDPacienteD = Int32.Parse(DesencriptarBase64(I));

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
                                           NACIONALIDAD = "CHILENA",
                                           a.EMAIL,
                                           a.TELEFONO_FIJO,
                                           a.TELEFONO_MOVIL,
                                           COD_PREVISION = "FONASA",
                                           COD_MODO_LLEGADA = "FACEBOOK ADS",
                                           COD_REGION = "METROPOLITANA",
                                           COD_COMUNA = "ESTACION CENTRAL",
                                           a.CALLE,
                                           a.NUMERO,
                                       }).FirstOrDefault();

                    object EventoPaciente = (from a in db.MPS_EVENTO_CLINICO.AsEnumerable()
                                             where a.COD_PACIENTE == IDPacienteD && a.ESTADO == true
                                             select new
                                             {
                                                 ID = EncriptarBase64(a.ID_EVENTO.ToString()),
                                                 a.EVENTO
                                             }).ToArray();

                    return new { Respuesta = true, Paciente, EventoPaciente };
                }
            }
            catch (Exception Error)
            {

                return new { Respuesta = false, Error.Message };
            }
        }

        public static object NuevoEvento(MPS_EVENTO_CLINICO Nuevo_Evento, string I)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    int IDPACIENTE = Convert.ToInt32(DesencriptarBase64(I));
                    bool Registro = db.MPS_EVENTO_CLINICO.Any(a => a.EVENTO == Nuevo_Evento.EVENTO && a.COD_PACIENTE == IDPACIENTE);

                    if (!Registro)
                    {

                        Nuevo_Evento.COD_PACIENTE = IDPACIENTE;
                        Nuevo_Evento.ESTADO = true;

                        db.MPS_EVENTO_CLINICO.Add(Nuevo_Evento);
                        db.SaveChanges();

                        object EventoNuevo = (from a in db.MPS_EVENTO_CLINICO.AsEnumerable()
                                              where a.ID_EVENTO == Nuevo_Evento.ID_EVENTO
                                              select new
                                              {
                                                  ID = EncriptarBase64(a.ID_EVENTO.ToString()),
                                                  a.EVENTO
                                              }).FirstOrDefault();


                        return new { Respuesta = true, EventoNuevo, Tipo = 1 };
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

        public static object DatosEvento(string I)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    int IDEvento = Convert.ToInt32(DesencriptarBase64(I));

                    object DatosEvento = (from a in db.MPS_EVENTO_CLINICO.AsEnumerable()
                                          where a.ID_EVENTO == IDEvento
                                          select new
                                          {
                                              ID = EncriptarBase64(a.ID_EVENTO.ToString()),
                                              a.EVENTO
                                          }).FirstOrDefault();


                    return new { Respuesta = true, DatosEvento, Tipo = 1 };



                }
            }
            catch (Exception Error)
            {

                return new { Respuesta = false, Error.Message };
            }
        }

        public static object EventoEditado(string I, string E)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    int IDEvento = Convert.ToInt32(DesencriptarBase64(I));

                    MPS_EVENTO_CLINICO Evento = db.MPS_EVENTO_CLINICO.Where(a => a.ID_EVENTO == IDEvento).FirstOrDefault();
                    bool Registro = db.MPS_EVENTO_CLINICO.Any(a => a.EVENTO == E && a.COD_PACIENTE == Evento.COD_PACIENTE);

                    if (!Registro)
                    {

                        Evento.EVENTO = E;

                        db.SaveChanges();

                        object EventoEditado = (from a in db.MPS_EVENTO_CLINICO.AsEnumerable()
                                                where a.ID_EVENTO == IDEvento
                                                select new
                                                {
                                                    ID = EncriptarBase64(a.ID_EVENTO.ToString()),
                                                    a.EVENTO
                                                }).FirstOrDefault();


                        return new { Respuesta = true, EventoEditado, Tipo = 1 };
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

        public static object NuevaFichaMedica(MPS_FICHA_CLINICA Nueva_Ficha_Clinica, string Paciente, string EventoClinica)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    int IDPACIENTE = Convert.ToInt32(DesencriptarBase64(Paciente));
                    int IDEvento = Convert.ToInt32(DesencriptarBase64(EventoClinica));

                    Nueva_Ficha_Clinica.COD_PACIENTE = IDPACIENTE;
                    Nueva_Ficha_Clinica.COD_EVENTO = IDEvento;
                    Nueva_Ficha_Clinica.FECHA_CREACION = DateTime.Now;


                    db.MPS_FICHA_CLINICA.Add(Nueva_Ficha_Clinica);
                    db.SaveChanges();

                    object EventoNuevo = (from a in db.MPS_EVENTO_CLINICO.AsEnumerable()
                                          where a.ID_EVENTO == Nueva_Ficha_Clinica.ID_FICHA_MEDICA
                                          select new
                                          {
                                              ID = EncriptarBase64(a.ID_EVENTO.ToString()),
                                              a.EVENTO
                                          }).FirstOrDefault();


                    return new { Respuesta = true, EventoNuevo, Tipo = 1 };



                }
            }
            catch (Exception Error)
            {

                return new { Respuesta = false, Error.Message };
            }
        }

        public static object EventosPaciente(string I)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {

                    int IDPacienteD = Int32.Parse(DesencriptarBase64(I));

                    object EventoPaciente = (from a in db.MPS_EVENTO_CLINICO.AsEnumerable()
                                             where a.COD_PACIENTE == IDPacienteD && a.ESTADO == true
                                             select new
                                             {
                                                 ID = EncriptarBase64(a.ID_EVENTO.ToString()),
                                                 a.EVENTO
                                             }).ToArray();

                    return new { Respuesta = true, EventoPaciente };
                }
            }
            catch (Exception Error)
            {

                return new { Respuesta = false, Error.Message };
            }
        }

        public static object FichaClinicaEvento(string I, string E)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {

                    int IDPaciente= Int32.Parse(DesencriptarBase64(I));
                    int IDEvento= Int32.Parse(DesencriptarBase64(E));

                    object FichaClinicaEvento = (from a in db.MPS_FICHA_CLINICA.AsEnumerable()
                                                 join r in db.MPS_EVENTO_CLINICO on a.COD_EVENTO equals r.ID_EVENTO
                                                 where a.COD_PACIENTE == IDPaciente && a.COD_EVENTO == IDEvento
                                                 select new
                                                 {
                                                     ID = EncriptarBase64(a.ID_FICHA_MEDICA.ToString()),
                                                     a.FECHA_CREACION,
                                                     r.ESTADO,
                                                     ESPECIELISTA = "ESPECIALISTA1"
                                             }).ToArray();

                    return new { Respuesta = true, FichaClinicaEvento };
                }
            }
            catch (Exception Error)
            {

                return new { Respuesta = false, Error.Message };
            }
        }

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

    }
}