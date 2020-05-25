using AGENDAPP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AGENDAPP.Controllers
{
    public class PacientesController : Controller
    {
        // GET: Pacientes
        public ActionResult Pacientes()
        {
            return View();
        }

        public JsonResult PacientesRegistrados()
        {
            return Json(Pacientes_Model.Pacientes(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult RegistrarPacientes(MPS_FICHA Nuevo_Paciente)
        {
            return Json(Pacientes_Model.RegistrarPacientes(Nuevo_Paciente), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ActualizarPaciente(MPS_FICHA Actualizar_Paciente, string ID_FICHA)
        {
            return Json(Pacientes_Model.ActualizarPaciente(Actualizar_Paciente, ID_FICHA), JsonRequestBehavior.AllowGet);
        }

        public JsonResult NFichaPacientes()
        {
            return Json(Pacientes_Model.NFichaPacientes(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult DatosPaciente(string IdPaciente)
        {
            return Json(Pacientes_Model.DatosPaciente(IdPaciente), JsonRequestBehavior.AllowGet);
        }
    }
}