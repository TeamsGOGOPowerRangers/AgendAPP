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
                                       join r in db.MPS_PREVISION on a.COD_PREVISION equals r.ID_PREVISION
                                       join c in db.MPS_MODO_LLEGADA on a.COD_MODO_LLEGADA equals c.ID_MODO_LLEGADA
                                       join t in db.MPS_REGION on a.COD_REGION equals t.ID_REGION
                                       join m in db.MPS_COMUNA on a.COD_COMUNA equals m.ID_COMUNA
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
                                           r.NOMBRE_PREVISION,
                                           c.NOMBRE_MODO_LLEGADA,
                                           t.NOMBRE_REGION,
                                           m.NOMBRE_COMUNA,
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


        public static object DatosPacienteH(string I)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {

                    int IDPacienteD = Int32.Parse(DesencriptarBase64(I));

                    object EventoPaciente = (from a in db.MPS_EVENTO_CLINICO.AsEnumerable()
                                             where a.COD_PACIENTE == IDPacienteD
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

        public static object NuevaFichaMedica(MPS_FICHA_CLINICA Nueva_Ficha_Clinica, string Paciente, string EventoClinica, bool Check)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    int IDPACIENTE = Convert.ToInt32(DesencriptarBase64(Paciente));
                    int IDEvento = Convert.ToInt32(DesencriptarBase64(EventoClinica));

                    MPS_EVENTO_CLINICO Evento = db.MPS_EVENTO_CLINICO.Where(a => a.ID_EVENTO == IDEvento).FirstOrDefault();

                    if (Check)
                    {
                        Evento.ESTADO = false;
                        db.SaveChanges();
                    }
                    else
                    {
                        Evento.ESTADO = true;
                        db.SaveChanges();
                    }

                    Nueva_Ficha_Clinica.COD_PACIENTE = IDPACIENTE;
                    Nueva_Ficha_Clinica.COD_EVENTO = IDEvento;
                    Nueva_Ficha_Clinica.FECHA_CREACION = DateTime.Now;


                    db.MPS_FICHA_CLINICA.Add(Nueva_Ficha_Clinica);
                    db.SaveChanges();

                    object EventoPaciente = (from a in db.MPS_EVENTO_CLINICO.AsEnumerable()
                                             where a.COD_PACIENTE == IDPACIENTE && a.ESTADO == true
                                             select new
                                             {
                                                 ID = EncriptarBase64(a.ID_EVENTO.ToString()),
                                                 a.EVENTO
                                             }).ToArray();


                    return new { Respuesta = true, EventoPaciente, Tipo = 1 };



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

        public static object EditarFichaMedica(string I)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {

                    int ID = Int32.Parse(DesencriptarBase64(I));

                    object FichaClinicaEditar = (from a in db.MPS_FICHA_CLINICA.AsEnumerable()
                                                 where a.ID_FICHA_MEDICA == ID
                                                 select new
                                                 {
                                                     ID = EncriptarBase64(a.ID_FICHA_MEDICA.ToString()),
                                                     a.MOTIVO_CONSULTA,
                                                     a.ANAMNESIS,
                                                     a.EVALUACION,
                                                     a.DIAGNOSTICO,
                                                     a.PATOLOGIA_GES,
                                                     a.EXAMENES,
                                                     a.SEGUIMIENTO,
                                                     a.TRATAMIENTO,
                                                     a.INDICACIONES,
                                                     COD_EVENTO = EncriptarBase64(a.COD_EVENTO.ToString())
                                                 }).FirstOrDefault();

                    return new { Respuesta = true, FichaClinicaEditar };
                }
            }
            catch (Exception Error)
            {

                return new { Respuesta = false, Error.Message };
            }
        }


        public static object ModificarFichaMedica(MPS_FICHA_CLINICA Nueva_Ficha_Clinica, string PacienteFichaMedica, bool Check)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    int IDPACIENTEFICHAMEDICA = Convert.ToInt32(DesencriptarBase64(PacienteFichaMedica));

                    MPS_FICHA_CLINICA FICHA = db.MPS_FICHA_CLINICA.Where(a => a.ID_FICHA_MEDICA == IDPACIENTEFICHAMEDICA).FirstOrDefault();

                    FICHA.MOTIVO_CONSULTA = Nueva_Ficha_Clinica.MOTIVO_CONSULTA;
                    FICHA.ANAMNESIS = Nueva_Ficha_Clinica.ANAMNESIS;
                    FICHA.EVALUACION = Nueva_Ficha_Clinica.EVALUACION;
                    FICHA.DIAGNOSTICO = Nueva_Ficha_Clinica.DIAGNOSTICO;
                    FICHA.PATOLOGIA_GES = Nueva_Ficha_Clinica.PATOLOGIA_GES;
                    FICHA.EXAMENES = Nueva_Ficha_Clinica.EXAMENES;
                    FICHA.SEGUIMIENTO = Nueva_Ficha_Clinica.SEGUIMIENTO;
                    FICHA.TRATAMIENTO = Nueva_Ficha_Clinica.TRATAMIENTO;
                    FICHA.INDICACIONES = Nueva_Ficha_Clinica.INDICACIONES;
                    db.SaveChanges();

                    MPS_EVENTO_CLINICO Evento = db.MPS_EVENTO_CLINICO.Where(a => a.ID_EVENTO == FICHA.COD_EVENTO).FirstOrDefault();
                    if (Check)
                    {
                        Evento.ESTADO = false;
                        db.SaveChanges();
                    }
                    else
                    {
                        Evento.ESTADO = true;
                        db.SaveChanges();
                    }

                    object EventoPaciente = (from a in db.MPS_EVENTO_CLINICO.AsEnumerable()
                                             where a.COD_PACIENTE == FICHA.COD_PACIENTE && a.ESTADO == true
                                             select new
                                             {
                                                 ID = EncriptarBase64(a.ID_EVENTO.ToString()),
                                                 a.EVENTO
                                             }).ToArray();


                    return new { Respuesta = true, FICHA, EventoPaciente, Tipo = 1 };



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