using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using AGENDAPP.Models;


namespace AGENDAPP.Models
{
    public class Agenda_Model
    {
        #region availability adjustment
        public static object List_of_availability_settings()
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    object Availability_Adjustments = (from a in db.MPS_AJUSTE_DISPONIBILIDAD
                                                       join ds in db.MPS_DIAS_SEMANA
                                                       on a.COD_DIA_SEMANA equals ds.ID_DIA_SEMANA
                                                       select new
                                                       {
                                                           a.ID_AJUSTE_DISPONIBILIDAD,
                                                           a.HORA_INICIO,
                                                           a.HORA_TERMINO,
                                                           ds.DIA_SEMANA
                                                       }).ToList();
                    return new { Respuesta = true, Availability_Adjustments };
                }
            }
            catch (Exception Error)
            {

                return new { Respuesta = false, Error.Message };
            }
        }
        public static object Save_Availability_Setting(MPS_AJUSTE_DISPONIBILIDAD[] availability_adjustment)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    List<MPS_AJUSTE_DISPONIBILIDAD> New_Adjustments_Availability = new List<MPS_AJUSTE_DISPONIBILIDAD>();
                    List<MPS_AJUSTE_DISPONIBILIDAD> Non_Existing_Availability_Adjustment = new List<MPS_AJUSTE_DISPONIBILIDAD>();

                    foreach (var item in availability_adjustment)
                    {
                        MPS_AJUSTE_DISPONIBILIDAD Existing_Availability_Adjustment = db.MPS_AJUSTE_DISPONIBILIDAD.Where(a => a.COD_DIA_SEMANA == item.COD_DIA_SEMANA).FirstOrDefault();

                        if (Existing_Availability_Adjustment == null)
                        {
                            MPS_AJUSTE_DISPONIBILIDAD New_Adjustment_Availability = new MPS_AJUSTE_DISPONIBILIDAD();
                            New_Adjustment_Availability.HORA_INICIO = item.HORA_INICIO;
                            New_Adjustment_Availability.HORA_TERMINO = item.HORA_TERMINO;
                            New_Adjustment_Availability.COD_DIA_SEMANA = item.COD_DIA_SEMANA;
                            New_Adjustment_Availability.COD_ESTADO = item.COD_ESTADO;

                            db.MPS_AJUSTE_DISPONIBILIDAD.Add(New_Adjustment_Availability);
                            db.SaveChanges();
                            New_Adjustments_Availability.Add(New_Adjustment_Availability);
                        }
                        else
                        {
                            Non_Existing_Availability_Adjustment.Add(Existing_Availability_Adjustment);
                        }

                    }

                    object Availability_Adjustments = (from a in New_Adjustments_Availability
                                                       join ds in db.MPS_DIAS_SEMANA
                                                       on a.COD_DIA_SEMANA equals ds.ID_DIA_SEMANA
                                                       select new
                                                       {
                                                           a.ID_AJUSTE_DISPONIBILIDAD,
                                                           a.HORA_INICIO,
                                                           a.HORA_TERMINO,
                                                           ds.DIA_SEMANA
                                                       }).ToList();

                    object Unavailable_Adjustment_Adjustments = (from a in Non_Existing_Availability_Adjustment
                                                                 join ds in db.MPS_DIAS_SEMANA
                                                                 on a.COD_DIA_SEMANA equals ds.ID_DIA_SEMANA
                                                                 select new
                                                                 {
                                                                     a.ID_AJUSTE_DISPONIBILIDAD,
                                                                     a.HORA_INICIO,
                                                                     a.HORA_TERMINO,
                                                                     ds.DIA_SEMANA
                                                                 }).ToList();


                    return new { Respuesta = true, Availability_Adjustments, Unavailable_Adjustment_Adjustments };

                }
            }
            catch (Exception Error)
            {

                return new { Respuesta = false, Error.Message };
            }

        }
        public static object Edit_Availability_Setting(int Code, DateTime Edit_time_from, DateTime Edit_hour_until, int Bloquear_Registros)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    MPS_AJUSTE_DISPONIBILIDAD Ajuste_Existente = db.MPS_AJUSTE_DISPONIBILIDAD.Where(a => a.ID_AJUSTE_DISPONIBILIDAD == Code).FirstOrDefault();

                    Ajuste_Existente.HORA_INICIO = Edit_time_from;
                    Ajuste_Existente.HORA_TERMINO = Edit_hour_until;
                    db.SaveChanges();

                    return new { Respuesta = true };
                }
            }
            catch (Exception Error)
            {

                return new { Respuesta = false, Error.Message };
            }
        }
        public static object Delete_Availability_Setting(int Code, int Bloquear_Registros)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    db.Database.ExecuteSqlCommand($"DELETE FROM MPS_AJUSTE_DISPONIBILIDAD WHERE ID_AJUSTE_DISPONIBILIDAD = {Code}");
                    return new { Respuesta = true };
                }
            }
            catch (Exception Error)
            {

                return new { Respuesta = false, Error.Message };
            }
        }

        #endregion

        #region Horario Profesional

        public static object Agregar_Horario_Profesional(MPS_HORARIO_PROFESIONAL Horario_Profesional, MPS_DIAS_SEMANA[] Detalle_dias)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    List<MPS_DIAS_SEMANA> Dias_Fuera_de_Atencion = new List<MPS_DIAS_SEMANA>();
                    List<object> Horario_Fuera_de_Atencion = new List<object>();

                    foreach (var item in Detalle_dias)
                    {
                        MPS_AJUSTE_DISPONIBILIDAD Ajuste = db.MPS_AJUSTE_DISPONIBILIDAD.Where(a => a.COD_DIA_SEMANA == item.ID_DIA_SEMANA).FirstOrDefault();

                        if (Ajuste != null)
                        {
                            DateTime Hora_Inicio = Convert.ToDateTime(Horario_Profesional.HORA_INICIO.Value.ToString("HH:mm"));
                            DateTime Hora_Termino = Convert.ToDateTime(Horario_Profesional.HORA_TERMINO.Value.ToString("HH:mm"));

                            DateTime Hora_Inicio_ = Convert.ToDateTime(Ajuste.HORA_INICIO.Value.ToString("HH:mm"));
                            DateTime Hora_Termino_ = Convert.ToDateTime(Ajuste.HORA_TERMINO.Value.ToString("HH:mm"));

                            if (Hora_Inicio < Hora_Inicio_ || Hora_Termino > Hora_Termino_)
                            {
                                object Hora_fuera_de_atencion = (from a in db.MPS_AJUSTE_DISPONIBILIDAD
                                                                 join ds in db.MPS_DIAS_SEMANA
                                                                 on a.COD_DIA_SEMANA equals ds.ID_DIA_SEMANA
                                                                 where a.ID_AJUSTE_DISPONIBILIDAD == Ajuste.ID_AJUSTE_DISPONIBILIDAD
                                                                 select new
                                                                 {
                                                                     a.HORA_INICIO,
                                                                     a.HORA_TERMINO,
                                                                     ds.DIA_SEMANA
                                                                 }).FirstOrDefault();

                                Horario_Fuera_de_Atencion.Add(Hora_fuera_de_atencion);
                            }
                        }
                        else
                        {
                            MPS_DIAS_SEMANA Dia = db.MPS_DIAS_SEMANA.Where(a => a.ID_DIA_SEMANA == item.ID_DIA_SEMANA).FirstOrDefault();
                            Dias_Fuera_de_Atencion.Add(Dia);
                        }
                    }

                    if (Dias_Fuera_de_Atencion.Count == 0 && Horario_Fuera_de_Atencion.Count == 0)
                    {
                        int ContCabeceras = 0;

                        //List<MPS_HORARIO_PROFESIONAL> Cabecera_existente = db.MPS_HORARIO_PROFESIONAL.Where(a => a.COD_PROFESIONAL == Horario_Profesional.COD_PROFESIONAL && a.COD_JORNADA == Horario_Profesional.COD_JORNADA
                        //                                            && a.COD_ESPECIALIDAD == Horario_Profesional.COD_ESPECIALIDAD && a.COD_SERVICIO == Horario_Profesional.COD_SERVICIO).ToList();

                        List<MPS_HORARIO_PROFESIONAL> Cabecera_existente = db.MPS_HORARIO_PROFESIONAL.Where(a => a.COD_PROFESIONAL == Horario_Profesional.COD_PROFESIONAL && a.COD_JORNADA == Horario_Profesional.COD_JORNADA
                                                                    && (Horario_Profesional.FECHA_DESDE >= a.FECHA_DESDE || Horario_Profesional.FECHA_HASTA >= a.FECHA_DESDE)
                                                                    && (Horario_Profesional.FECHA_DESDE <= a.FECHA_HASTA || Horario_Profesional.FECHA_HASTA <= a.FECHA_HASTA)).ToList();
                        if (Cabecera_existente.Count == 0)
                        {

                            MPS_HORARIO_PROFESIONAL Horario_Existente = new MPS_HORARIO_PROFESIONAL();

                            List<MPS_HORARIO_PROFESIONAL> d = db.MPS_HORARIO_PROFESIONAL.Where(a => a.COD_PROFESIONAL == Horario_Profesional.COD_PROFESIONAL
                                                                    && (Horario_Profesional.FECHA_DESDE >= a.FECHA_DESDE || Horario_Profesional.FECHA_HASTA >= a.FECHA_DESDE)
                                                                    && (Horario_Profesional.FECHA_DESDE <= a.FECHA_HASTA || Horario_Profesional.FECHA_HASTA <= a.FECHA_HASTA)).ToList();
                            foreach (var item in d)
                            {
                                Horario_Existente = db.MPS_HORARIO_PROFESIONAL.Where(a => a.ID_HORARIO_PROFESIONAL == item.ID_HORARIO_PROFESIONAL
                                                                 && ((Horario_Profesional.HORA_INICIO.Value.Hour >= a.HORA_INICIO.Value.Hour && Horario_Profesional.HORA_INICIO.Value.Minute >= a.HORA_INICIO.Value.Minute)
                                                                 || (Horario_Profesional.HORA_TERMINO.Value.Hour >= a.HORA_INICIO.Value.Hour && Horario_Profesional.HORA_TERMINO.Value.Minute >= a.HORA_INICIO.Value.Minute))
                                                                 && ((Horario_Profesional.HORA_INICIO.Value.Hour <= a.HORA_TERMINO.Value.Hour && Horario_Profesional.HORA_INICIO.Value.Minute <= a.HORA_TERMINO.Value.Minute)
                                                                 || (Horario_Profesional.HORA_TERMINO.Value.Hour <= a.HORA_TERMINO.Value.Hour && Horario_Profesional.HORA_TERMINO.Value.Minute <= a.HORA_TERMINO.Value.Minute))).FirstOrDefault();

                                if (Horario_Existente != null)
                                {
                                    ContCabeceras++;
                                }
                            }


                            if (ContCabeceras == 0)
                            {
                                db.MPS_HORARIO_PROFESIONAL.Add(Horario_Profesional);
                                db.SaveChanges();

                                object Data = Generar_Agenda_Profesional(Horario_Profesional, Detalle_dias);
                                return new { Respuesta = true, Data };
                            }
                            else
                            {
                                return new { Respuesta = false, Tipo = 2, d };
                            }
                        }
                        else
                        {
                            return new { Respuesta = false, Tipo = 3, Cabecera_existente };
                        }
                    }
                    else
                    {
                        return new { Respuesta = false, Tipo = 1, Dias_Fuera_de_Atencion, Horario_Fuera_de_Atencion };
                    }
                }
            }
            catch (Exception Error)
            {
                return new { Respuesta = false, Tipo = 0, Error.Message };
            }
        }

        public static object Generar_Agenda_Profesional(MPS_HORARIO_PROFESIONAL Horario_Profesional, MPS_DIAS_SEMANA[] Detalle_dias)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    int Agregado = 0;

                    foreach (var item in Detalle_dias)
                    {
                        MPS_DETALLE_DIAS_ATENCION Dia = db.MPS_DETALLE_DIAS_ATENCION.Where(dd => dd.COD_DIA_SEMANA == item.ID_DIA_SEMANA && dd.COD_HORARIO_PROFESIONAL == Horario_Profesional.ID_HORARIO_PROFESIONAL).FirstOrDefault();
                        if (Dia == null)
                        {
                            MPS_DETALLE_DIAS_ATENCION Horario_detalle_dia = new MPS_DETALLE_DIAS_ATENCION();
                            Horario_detalle_dia.COD_DIA_SEMANA = item.ID_DIA_SEMANA;
                            Horario_detalle_dia.COD_HORARIO_PROFESIONAL = Horario_Profesional.ID_HORARIO_PROFESIONAL;
                            db.MPS_DETALLE_DIAS_ATENCION.Add(Horario_detalle_dia);
                            db.SaveChanges();

                            Agregado++;
                        }
                    }

                    if (Agregado > 0)
                    {
                        DateTime Fecha_Inicio = Horario_Profesional.FECHA_DESDE.Value;

                        while (Fecha_Inicio <= Horario_Profesional.FECHA_HASTA)
                        {

                            DateTime Hora_Inicio = Horario_Profesional.HORA_INICIO.Value;

                            double CantidadHoras = Math.Abs((Horario_Profesional.HORA_TERMINO.Value - Horario_Profesional.HORA_INICIO.Value).TotalHours);
                            double CantMinutos = CantidadHoras * 60;
                            double TotalHorasAtencion = Math.Truncate(CantMinutos / (Horario_Profesional.DURACION_CITA.Value + Horario_Profesional.ESPACIO_ENTRE_CITA.Value));

                            double ContHoras = 1;

                            int Codigo_dia = (int)Convert.ToDateTime(Fecha_Inicio).DayOfWeek;
                            bool Dia_Semana_Existe = Detalle_dias.Any(a => a.ID_DIA_SEMANA == Codigo_dia);

                            if (Dia_Semana_Existe)
                            {
                                MPS_DETALLE_HORARIO_PROFESIONAL Deta_Horario = db.MPS_DETALLE_HORARIO_PROFESIONAL.Where(dh => dh.COD_HORARIO_PROFESIONAL == Horario_Profesional.ID_HORARIO_PROFESIONAL && dh.FECHA_ATENCION == DbFunctions.TruncateTime(Fecha_Inicio)).FirstOrDefault();
                                if (Deta_Horario == null)
                                {
                                    while (ContHoras <= TotalHorasAtencion)
                                    {
                                        MPS_DETALLE_HORARIO_PROFESIONAL Detalle_Horario = new MPS_DETALLE_HORARIO_PROFESIONAL();
                                        Detalle_Horario.FECHA_ATENCION = Fecha_Inicio;
                                        Detalle_Horario.HORA_ATENCION = Hora_Inicio;
                                        Detalle_Horario.COD_HORARIO_PROFESIONAL = Horario_Profesional.ID_HORARIO_PROFESIONAL;
                                        Detalle_Horario.COD_ESTADO = 1;

                                        db.MPS_DETALLE_HORARIO_PROFESIONAL.Add(Detalle_Horario);
                                        db.SaveChanges();

                                        int Minutos = Horario_Profesional.DURACION_CITA.Value + Horario_Profesional.ESPACIO_ENTRE_CITA.Value;
                                        Hora_Inicio = Convert.ToDateTime(Hora_Inicio).AddMinutes(Minutos);
                                        ContHoras++;
                                    }
                                }

                                Fecha_Inicio = Convert.ToDateTime(Fecha_Inicio).AddDays(1);
                            }
                            else
                            {
                                Fecha_Inicio = Convert.ToDateTime(Fecha_Inicio).AddDays(1);
                            }
                        }

                        return new { Respuesta = true, Tipo = 1 };
                    }
                    else
                    {
                        return new { Respuesta = false, Tipo = 2 };
                    }
                }
            }
            catch (Exception Error)
            {
                return new { Respuesta = false, Tipo = 3, Error.Message };
            }
        }
        #endregion
    }
}