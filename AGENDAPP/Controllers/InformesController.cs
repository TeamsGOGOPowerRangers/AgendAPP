using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AGENDAPP.Controllers
{
    public class InformesController : Controller
    {
        // GET: Informes
        public ActionResult Prestaciones()
        {
            return View();
        }
        public ActionResult Caja()
        {
            return View();
        }
        public ActionResult Facturacion()
        {
            return View();
        }
        public ActionResult FacturacionaIsapres()
        {
            return View();
        }
        public ActionResult Pacientes()
        {
            return View();
        }
        public ActionResult CajaPrestaciones()
        {
            return View();
        }
        public ActionResult Ingresos()
        {
            return View();
        }
        public ActionResult Citas()
        {
            return View();
        }
    }
}