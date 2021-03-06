﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AGENDAPP.Models;
namespace AGENDAPP.Controllers
{
    public class MantenedoresController : Controller
    {
        // GET: Mantenedores

        #region vistas
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Empresa()
        {
            return View();
        }

        public ActionResult AdministraciondeUsuarios()
        {
            return View();
        } 
        public ActionResult Etiquetas()
        {
            return View();
        }

        public ActionResult Ocupaciones()
        {
            return View();
        }

        public ActionResult ModosLlegada()
        {
            return View();
        }
        public ActionResult Recursos()
        {
            return View();
        }
        public ActionResult Convenios()
        {
            return View();
        }

        public ActionResult Prestaciones()
        {
            return View();
        }
        public ActionResult Previsiones()
        {
            return View();
        }

        public ActionResult Articulos()
        {
            return View();
        }

        public ActionResult ArtFamilias()
        {
            return View();
        }

        public ActionResult ArtSecciones()
        {
            return View();
        }
        public ActionResult Almacenes()
        {
            return View();
        }
        public ActionResult TelefonosEmpresa()
        {
            return View();
        }

        #endregion

        #region Etiqueta
        public JsonResult Etiqueta()
        {
            return Json(Mantenedor_Model.Etiqueta(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GuardarEtiqueta(string NombreColor, string Color)
        {
            return Json(Mantenedor_Model.GuardarEtiqueta(NombreColor,Color), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListaEtiquetasId(int id)
        {
            return Json(Mantenedor_Model.ListaEtiquetasId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ModificarEtiqueta(int ID_COLOR, string NOMBRE, string COLOR, int COD_ESTADO)
        {
            return Json(Mantenedor_Model.ModificarEtiqueta(ID_COLOR, NOMBRE, COLOR, COD_ESTADO), JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Ocupacion
        public JsonResult OcupacionesLitas()
        {
            return Json(Mantenedor_Model.OcupacionesLitas(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GuardarOcupaciones(string NombreOcupacion, string Descripcion)
        {
            return Json(Mantenedor_Model.GuardarOcupaciones(NombreOcupacion, Descripcion), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListaOcupacionesId(int id)
        {
            return Json(Mantenedor_Model.ListaOcupacionesId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ModificarOcupaciones(int ID_OCUPACION, string NOMBRE, string DESCRIPCION, int COD_ESTADO)
        {
            return Json(Mantenedor_Model.ModificarOcupaciones(ID_OCUPACION, NOMBRE, DESCRIPCION, COD_ESTADO), JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Prevision
        public JsonResult PrevisionLitas()
        {
            return Json(Mantenedor_Model.PrevisionLitas(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GuardarPrevision(string NombrePrevision, string Descripcion)
        {
            return Json(Mantenedor_Model.GuardarPrevision(NombrePrevision, Descripcion), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListaPrevisionId(int id)
        {
            return Json(Mantenedor_Model.ListaPrevisionId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ModificarPrevision(int ID_PREVISION, string NOMBRE, string DESCRIPCION, int COD_ESTADO)
        {
            return Json(Mantenedor_Model.ModificarPrevision(ID_PREVISION, NOMBRE, DESCRIPCION, COD_ESTADO), JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Seccion
        public JsonResult SeccionLitas()
        {
            return Json(Mantenedor_Model.SeccionLitas(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GuardarSeccion(string NombreSeccion, string Descripcion,int Impuesto)
        {
            return Json(Mantenedor_Model.GuardarSeccion(NombreSeccion, Descripcion, Impuesto), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListaSeccionId(int id)
        {
            return Json(Mantenedor_Model.ListaSeccionId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ModificarSeccion(int ID_SECCION, string NOMBRE, string DESCRIPCION,int IMPUESTO, int COD_ESTADO)
        {
            return Json(Mantenedor_Model.ModificarSeccion(ID_SECCION, NOMBRE, DESCRIPCION, IMPUESTO, COD_ESTADO), JsonRequestBehavior.AllowGet);
        }
        #endregion


        #region Telefono
        public JsonResult TelefonoLista()
        {
            return Json(Mantenedor_Model.TelefonoLista(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GuardarTelefono(string SelectTipo, string Codigo, string Numero,string Comentario,int Principal)
        {
            return Json(Mantenedor_Model.GuardarTelefono(SelectTipo, Codigo, Numero, Comentario, Principal), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListaTelefonoId(int id)
        {
            return Json(Mantenedor_Model.ListaTelefonoId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ModificarTelefono(int ID_TELEFONO,string Tipo , string Codigo, string Numero, string Comentario, int Principal,int CodEstado)
        {
            return Json(Mantenedor_Model.ModificarTelefono(ID_TELEFONO,Tipo, Codigo, Numero, Comentario, Principal, CodEstado), JsonRequestBehavior.AllowGet);
        }
        #endregion


    }
}