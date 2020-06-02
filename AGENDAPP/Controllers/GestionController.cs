using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AGENDAPP.Controllers
{
    public class GestionController : Controller
    {
        // GET: Gestion
        public ActionResult Liquidaciones()
        {
            return View();
        }
        public ActionResult Presupuestos()
        {
            return View();
        }
        public ActionResult Programas()
        {
            return View();
        }
        public ActionResult Facturas()
        {
            return View();
        }
        public ActionResult Cheques()
        {
            return View();
        }
        public ActionResult Solex()
        {
            return View();
        }
    }
}