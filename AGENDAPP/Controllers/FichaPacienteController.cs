using AGENDAPP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AGENDAPP.Controllers
{
    public class FichaPacienteController : Controller
    {
        // GET: FichaPaciente
        public ActionResult FichaPaciente()
        {
            return View();
        }

        public JsonResult DatosPaciente(string I)
        {
            return Json(Ficha_Paciente_Model.DatosPaciente(I), JsonRequestBehavior.AllowGet);
        }

        public JsonResult NuevoEvento(MPS_EVENTO_CLINICO Nuevo_Evento , string I)
        {
            return Json(Ficha_Paciente_Model.NuevoEvento(Nuevo_Evento, I), JsonRequestBehavior.AllowGet);
        }

        public JsonResult DatosEvento(string I)
        {
            return Json(Ficha_Paciente_Model.DatosEvento(I), JsonRequestBehavior.AllowGet);
        }

        public JsonResult EventoEditado(string I, string E)
        {
            return Json(Ficha_Paciente_Model.EventoEditado(I,E), JsonRequestBehavior.AllowGet);
        }

        public JsonResult NuevaFichaMedica(MPS_FICHA_CLINICA Nueva_Ficha_Clinica, string Paciente, string EventoClinica)
        {
            return Json(Ficha_Paciente_Model.NuevaFichaMedica(Nueva_Ficha_Clinica, Paciente, EventoClinica), JsonRequestBehavior.AllowGet);
        }

        public JsonResult EventosPaciente(string I)
        {
            return Json(Ficha_Paciente_Model.EventosPaciente(I), JsonRequestBehavior.AllowGet);
        }

        public JsonResult FichaClinicaEvento(string I, string E)
        {
            return Json(Ficha_Paciente_Model.FichaClinicaEvento(I,E), JsonRequestBehavior.AllowGet);
        }
    }
}