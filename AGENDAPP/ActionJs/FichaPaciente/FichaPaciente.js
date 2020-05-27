import { Fetch, bouncejsShow, bouncejsClose, Espanol } from "../Globales/Global.js";

window.addEventListener('load', async function () {

    const url = new this.URLSearchParams(location.search);

    if (url.has('I')) {

        const Url = '../FichaPaciente/DatosPaciente';
        const Fetchs = Fetch(Url, { I: url.get('I') });
        const Resultado = await Fetchs.FetchWithData();

        if (Resultado.Respuesta) {

            document.getElementById('txtNombre').innerText = Resultado.Paciente.NOMBRES + " " + Resultado.Paciente.APELLIDO_PATERNO + " " + Resultado.Paciente.APELLIDO_MATERNO;
            document.getElementById('txtNroFicha').innerText = Resultado.Paciente.NUMERO_FICHA.padStart(10, 0);
            document.getElementById('txtIdent').innerText = Resultado.Paciente.IDENTIFICACION;
            document.getElementById('txtFecnac').innerText = moment(Resultado.Paciente.FECHA_NACIMIENTO).format('DD-MM-YYYY');
            document.getElementById('txtNacionalidad').innerText = Resultado.Paciente.NACIONALIDAD == 1 ? "CHILENA" : "EXTRANJERA";
            document.getElementById('txtEmail').innerText = Resultado.Paciente.EMAIL;
            document.getElementById('txtTelFijo').innerText = Resultado.Paciente.TELEFONO_FIJO;
            document.getElementById('txtTelMovil').innerText = Resultado.Paciente.TELEFONO_MOVIL;
            document.getElementById('txtPrevision').innerText = Resultado.Paciente.NOMBRE_PREVISION;
            document.getElementById('txtModoLlegada').innerText = Resultado.Paciente.NOMBRE_MODO_LLEGADA;
            document.getElementById('txtDireccion').innerText = Resultado.Paciente.CALLE + " " + Resultado.Paciente.NUMERO + "," + Resultado.Paciente.NOMBRE_COMUNA + "," + Resultado.Paciente.NOMBRE_REGION;
            document.getElementById('BtnGuardarNuevoEvento').value = Resultado.Paciente.ID;
            document.getElementById('BtnGuardarFichaClinica').value = Resultado.Paciente.ID;
            document.getElementById('BtnHistorialPaciente').value = Resultado.Paciente.ID;

            var select = document.getElementById('slcEvtCli');
            var option = document.createElement('option');
            option.text = 'Seleccione Evento Clínico...';
            option.value = 0;
            select.add(option);

            if (Object.entries(Resultado.EventoPaciente).length !== 0) {
                for (const Item of Resultado.EventoPaciente) {

                    var option = document.createElement('option');
                    option.text = Item.EVENTO;
                    option.value = Item.ID;
                    select.add(option);

                }
            }

        }

    }

});


window.ModalNuevoEvento = async function ModalNuevoEvento(Btn) {

    $("#ModalNuevoEvento").modal('show');

};


window.GuardarNuevoEvento = async function GuardarNuevoEvento(Btn) {
    var Errores = 0;

    if (document.getElementById('txtNombreEvento').value == '') {
        new Noty({
            text: '<strong>Advertencia</strong> Debe ingresar un nombre',
            type: 'alert',
            theme: 'metroui',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
        Errores++;
    }

    if (Errores == 0) {

        const Nuevo_Evento = new Object();

        Nuevo_Evento.EVENTO = document.getElementById('txtNombreEvento').value;

        const Url = '../FichaPaciente/NuevoEvento';
        const Fetchs = Fetch(Url, { Nuevo_Evento: Nuevo_Evento, I: Btn.value });
        const Resultado = await Fetchs.FetchWithData();

        if (Resultado.Respuesta) {

            var select = document.getElementById('slcEvtCli');
            var option = document.createElement('option');
            option.text = Resultado.EventoNuevo.EVENTO;
            option.value = Resultado.EventoNuevo.ID;
            select.add(option);

            new Noty({
                text: '<strong>Advertencia</strong> Evento clínico registrado correctamente',
                type: 'alert',
                theme: 'metroui',
                layout: 'topRight',
                timeout: 4000,
                animation: {
                    open: bouncejsShow,
                    close: bouncejsClose
                }
            }).show();

            $("#ModalNuevoEvento").modal('hide');
        }
    }
};

window.ModalEditarEvento = async function ModalEditarEvento(Btn) {

    if (document.getElementById('slcEvtCli').value != 0) {

        $("#ModalEditarEvento").modal('show');

    } else {

        new Noty({
            text: '<strong>Advertencia</strong> Seleccione un evento',
            type: 'alert',
            theme: 'metroui',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();

    }


};

window.CambiarEvento = async function CambiarEvento(Btn) {

    if (document.getElementById('slcEvtCli').value != 0) {

        var select = document.getElementById('slcEvtCli');

        const Url = '../FichaPaciente/DatosEvento';
        const Fetchs = Fetch(Url, { I: Btn.value });
        const Resultado = await Fetchs.FetchWithData();

        if (Resultado.Respuesta) {

            document.getElementById('BtnGuardarEventoEditado').value = Btn.value;
            document.getElementById('BtnGuardarEventoEditado').name = select.selectedIndex;
            document.getElementById('txtNombreEventoM').value = Resultado.DatosEvento.EVENTO;
        }

    }
};


window.GuardarEventoEditado = async function GuardarEventoEditado(Btn) {

    if (document.getElementById('txtNombreEventoM').value != '') {

        var Evento = document.getElementById('txtNombreEventoM').value;

        const Url = '../FichaPaciente/EventoEditado';
        const Fetchs = Fetch(Url, { I: Btn.value, E: Evento });
        const Resultado = await Fetchs.FetchWithData();

        if (Resultado.Respuesta) {

            if (Resultado.Tipo == 1) {
                var select = document.getElementById('slcEvtCli');

                select.options[Btn.name].text = Resultado.EventoEditado.EVENTO;

                new Noty({
                    text: '<strong>Advertencia</strong> Evento modificado correctamente',
                    type: 'alert',
                    theme: 'metroui',
                    layout: 'topRight',
                    timeout: 4000,
                    animation: {
                        open: bouncejsShow,
                        close: bouncejsClose
                    }
                }).show();

                $("#ModalEditarEvento").modal('hide');
            } else {

                new Noty({
                    text: '<strong>Advertencia</strong> El paciente ya tiene un evento con el mismo nombre',
                    type: 'alert',
                    theme: 'metroui',
                    layout: 'topRight',
                    timeout: 4000,
                    animation: {
                        open: bouncejsShow,
                        close: bouncejsClose
                    }
                }).show();

            }
        }

    }
};


window.GuardarFichaClinicaCheck = async function GuardarFichaClinicaCheck(Btn) {

    if (document.getElementById('slcEvtCli').value != '0') {

        var Check = document.getElementById("CheckTerminoEvento").checked;

        var Paciente = document.getElementById('BtnGuardarFichaClinica').value;
        var EventoClinica = document.getElementById('slcEvtCli').value;

        const Nueva_Ficha_Clinica = new Object();

        Nueva_Ficha_Clinica.MOTIVO_CONSULTA = document.getElementById('txtMotivoConsulta').value;
        Nueva_Ficha_Clinica.ANAMNESIS = document.getElementById('txtAnamnesis').value;
        Nueva_Ficha_Clinica.EVALUACION = document.getElementById('txtEvaluacion').value;
        Nueva_Ficha_Clinica.DIAGNOSTICO = document.getElementById('txtDiagnostico').value;
        Nueva_Ficha_Clinica.PATOLOGIA_GES = document.getElementById('txtGes').value;
        Nueva_Ficha_Clinica.EXAMENES = document.getElementById('txtExamenes').value;
        Nueva_Ficha_Clinica.SEGUIMIENTO = document.getElementById('txtSeguimiento').value;
        Nueva_Ficha_Clinica.TRATAMIENTO = document.getElementById('txtTratamiento').value;
        Nueva_Ficha_Clinica.INDICACIONES = document.getElementById('txtPrescripcion').value;

        const Url = '../FichaPaciente/NuevaFichaMedica';
        const Fetchs = Fetch(Url, { Nueva_Ficha_Clinica: Nueva_Ficha_Clinica, Paciente: Paciente, EventoClinica: EventoClinica, Check: Check});
        const Resultado = await Fetchs.FetchWithData();

        if (Resultado.Respuesta) {


            new Noty({
                text: '<strong>Advertencia</strong> Ficha Medica guardada correctamente',
                type: 'alert',
                theme: 'metroui',
                layout: 'topRight',
                timeout: 4000,
                animation: {
                    open: bouncejsShow,
                    close: bouncejsClose
                }
            }).show();

            if (Check) {

                var select = document.getElementById('slcEvtCli');
                select.innerText = '';
                var option = document.createElement('option');
                option.text = 'Seleccione Evento Clínico...';
                option.value = 0;
                select.add(option);

                if (Object.entries(Resultado.EventoPaciente).length !== 0) {
                    for (const Item of Resultado.EventoPaciente) {

                        var option = document.createElement('option');
                        option.text = Item.EVENTO;
                        option.value = Item.ID;
                        select.add(option);

                    }
                }
            }

            $("#ModalGuardarFichaCheck").modal('hide');

        }

    } else {

        new Noty({
            text: '<strong>Advertencia</strong> Seleccione un evento',
            type: 'alert',
            theme: 'metroui',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();

    }
};

window.HistorialPaciente = async function HistorialPaciente(Btn) {

    const Url = '../FichaPaciente/DatosPacienteH';
    const Fetchs = Fetch(Url, { I: Btn.value });
    const Resultado = await Fetchs.FetchWithData();

    console.log(Btn.value);

    if (Resultado.Respuesta) {

        var select2 = document.getElementById('slcEvtCliH');
        select2.innerText = '';
        select2.name = Btn.value;
        var option2 = document.createElement('option');
        option2.text = 'Seleccione Evento Clínico...';
        option2.value = 0;
        select2.add(option2);

        if (Object.entries(Resultado.EventoPaciente).length !== 0) {
            for (const Item of Resultado.EventoPaciente) {

                var option2 = document.createElement('option');
                option2.text = Item.EVENTO;
                option2.value = Item.ID;
                select2.add(option2);

            }
        }

    }

    $('#DatosFichaMedica').DataTable().destroy();
    const TbodyFichasEvento = document.getElementById('TbodyDatosFichaMedica');
    TbodyFichasEvento.innerHTML = '';

    $("#ModalHistorial").modal('show');

};


window.CambiarEventoH = async function CambiarEventoH(Btn) {

    const Url = '../FichaPaciente/FichaClinicaEvento';
    const Fetchs = Fetch(Url, { I: Btn.name, E: Btn.value });
    const Resultado = await Fetchs.FetchWithData();

    if (Resultado.Respuesta) {

        let Contenido = '';
        $('#DatosFichaMedica').DataTable().destroy();
        const TbodyFichasEvento = document.getElementById('TbodyDatosFichaMedica');
        TbodyFichasEvento.innerHTML = '';


        if (Object.entries(Resultado.FichaClinicaEvento).length !== 0) {
            for (const Item of Resultado.FichaClinicaEvento) {
                Contenido += `<tr>
                                <td>${moment(Item.FECHA_CREACION).format('DD-MM-YYYY hh:mm')}</td>                                
                                <td>${Item.ESPECIELISTA}</td>                                
                                <td>${Item.ESTADO == 1 ? "ACTIVO" : "INACTIVO"}</td>`;
                if (Item.ESTADO) {
                    Contenido += `<td><button type="button" class="btn mr-1 btn-light fa fa-edit" value="${Item.ID}" title="Editar Ficha Medica" onclick="EditarFichaMedica(this)"></button>`;
                } else {
                    Contenido += `<td><button type="button" class="btn mr-1 btn-light fa fa-edit" value="${Item.ID}" title="Ver Ficha Medica" onclick="VerFichaMedica(this)"></button>`;
                }

                Contenido += `<button type="button" class="btn btn-light fa fa-copy" value="${Item.ID}" title="Copiar Ficha Medica" onclick="CopiarFichaMedica(this)"></button>
                              <button type="button" class="btn btn-light fa fa-file-pdf" value="${Item.ID}" title="Imprimir Ficha Medica" onclick="ImprimirFichaMedica(this)"></button>
                                </td>                                
                             </tr>`;
            }
        }
        TbodyFichasEvento.innerHTML = Contenido;

        $('#DatosFichaMedica').DataTable({
            searching: false,
            "lengthChange": false,
            language: Espanol
        });

    }

};

window.CopiarFichaMedica = async function CopiarFichaMedica(Btn) {

    const Url = '../FichaPaciente/EditarFichaMedica';
    const Fetchs = Fetch(Url, { I: Btn.value });
    const Resultado = await Fetchs.FetchWithData();

    if (Resultado.Respuesta) {

        document.getElementById('txtMotivoConsulta').value = Resultado.FichaClinicaEditar.MOTIVO_CONSULTA;
        document.getElementById('txtAnamnesis').value = Resultado.FichaClinicaEditar.ANAMNESIS;
        document.getElementById('txtEvaluacion').value = Resultado.FichaClinicaEditar.EVALUACION;
        document.getElementById('txtDiagnostico').value = Resultado.FichaClinicaEditar.DIAGNOSTICO;
        document.getElementById('txtGes').value = Resultado.FichaClinicaEditar.PATOLOGIA_GES;
        document.getElementById('txtExamenes').value = Resultado.FichaClinicaEditar.EXAMENES;
        document.getElementById('txtSeguimiento').value = Resultado.FichaClinicaEditar.SEGUIMIENTO;
        document.getElementById('txtTratamiento').value = Resultado.FichaClinicaEditar.TRATAMIENTO;
        document.getElementById('txtPrescripcion').value = Resultado.FichaClinicaEditar.INDICACIONES;
        document.getElementById('slcEvtCli').value = 0;
        document.getElementById('BtnGuardarFichaClinicaModificada').value = Resultado.FichaClinicaEditar.ID;

        document.getElementById('txtMotivoConsulta').removeAttribute('disabled');
        document.getElementById('txtAnamnesis').removeAttribute('disabled');
        document.getElementById('txtEvaluacion').removeAttribute('disabled');
        document.getElementById('txtDiagnostico').removeAttribute('disabled');
        document.getElementById('txtGes').removeAttribute('disabled');
        document.getElementById('txtExamenes').removeAttribute('disabled');
        document.getElementById('txtSeguimiento').removeAttribute('disabled');
        document.getElementById('txtTratamiento').removeAttribute('disabled');
        document.getElementById('txtPrescripcion').removeAttribute('disabled');
        document.getElementById('slcEvtCli').removeAttribute('disabled');

        var elemento = document.getElementById('BtnGuardarFichaClinicaModificada');
        var elemento2 = document.getElementById('BtnGuardarFichaClinica');

        if (elemento.style.display == "block") {
            document.getElementById('BtnGuardarFichaClinicaModificada').style.display = "none";
        }

        if (elemento2.style.display == "none") {
            document.getElementById('BtnGuardarFichaClinica').style.display = "block";
        }

        document.getElementById('BtnEditarEvento').removeAttribute('disabled');
        document.getElementById('BtnNuevoEvento').removeAttribute('disabled');
        document.getElementById('slcEvtCli').removeAttribute('disabled');

        $("#ModalHistorial").modal('hide');
    }

};


window.VerFichaMedica = async function VerFichaMedica(Btn) {

    const Url = '../FichaPaciente/EditarFichaMedica';
    const Fetchs = Fetch(Url, { I: Btn.value });
    const Resultado = await Fetchs.FetchWithData();

    if (Resultado.Respuesta) {

        document.getElementById('txtMotivoConsulta').value = Resultado.FichaClinicaEditar.MOTIVO_CONSULTA;
        document.getElementById('txtAnamnesis').value = Resultado.FichaClinicaEditar.ANAMNESIS;
        document.getElementById('txtEvaluacion').value = Resultado.FichaClinicaEditar.EVALUACION;
        document.getElementById('txtDiagnostico').value = Resultado.FichaClinicaEditar.DIAGNOSTICO;
        document.getElementById('txtGes').value = Resultado.FichaClinicaEditar.PATOLOGIA_GES;
        document.getElementById('txtExamenes').value = Resultado.FichaClinicaEditar.EXAMENES;
        document.getElementById('txtSeguimiento').value = Resultado.FichaClinicaEditar.SEGUIMIENTO;
        document.getElementById('txtTratamiento').value = Resultado.FichaClinicaEditar.TRATAMIENTO;
        document.getElementById('txtPrescripcion').value = Resultado.FichaClinicaEditar.INDICACIONES;
        document.getElementById('slcEvtCli').value = 0;

        document.getElementById('txtMotivoConsulta').disabled = true;
        document.getElementById('txtAnamnesis').disabled = true;
        document.getElementById('txtEvaluacion').disabled = true;
        document.getElementById('txtDiagnostico').disabled = true;
        document.getElementById('txtGes').disabled = true;
        document.getElementById('txtExamenes').disabled = true;
        document.getElementById('txtSeguimiento').disabled = true;
        document.getElementById('txtTratamiento').disabled = true;
        document.getElementById('txtPrescripcion').disabled = true;
        document.getElementById('slcEvtCli').value = 0;
        document.getElementById('slcEvtCli').disabled = true;

        var elemento = document.getElementById('BtnGuardarFichaClinicaModificada');
        var elemento2 = document.getElementById('BtnGuardarFichaClinica');

        if (elemento.style.display == "block") {
            document.getElementById('BtnGuardarFichaClinicaModificada').style.display = "none";
        }

        if (elemento2.style.display == "block") {
            document.getElementById('BtnGuardarFichaClinica').style.display = "none";
        }

        document.getElementById('slcEvtCli').disabled = true;
        document.getElementById('BtnEditarEvento').disabled = true;
        document.getElementById('BtnNuevoEvento').disabled = true;

        $("#ModalHistorial").modal('hide');
    }

};


window.GuardarFichaClinicaModificadaCheck = async function GuardarFichaClinicaModificadaCheck(Btn) {

    var Check = document.getElementById("CheckTerminoEventoModificado").checked;

    var PacienteFichaMedica = document.getElementById('BtnGuardarFichaClinicaModificada').value;

    const Nueva_Ficha_Clinica = new Object();

    Nueva_Ficha_Clinica.MOTIVO_CONSULTA = document.getElementById('txtMotivoConsulta').value;
    Nueva_Ficha_Clinica.ANAMNESIS = document.getElementById('txtAnamnesis').value;
    Nueva_Ficha_Clinica.EVALUACION = document.getElementById('txtEvaluacion').value;
    Nueva_Ficha_Clinica.DIAGNOSTICO = document.getElementById('txtDiagnostico').value;
    Nueva_Ficha_Clinica.PATOLOGIA_GES = document.getElementById('txtGes').value;
    Nueva_Ficha_Clinica.EXAMENES = document.getElementById('txtExamenes').value;
    Nueva_Ficha_Clinica.SEGUIMIENTO = document.getElementById('txtSeguimiento').value;
    Nueva_Ficha_Clinica.TRATAMIENTO = document.getElementById('txtTratamiento').value;
    Nueva_Ficha_Clinica.INDICACIONES = document.getElementById('txtPrescripcion').value;

    const Url = '../FichaPaciente/ModificarFichaMedica';
    const Fetchs = Fetch(Url, { Nueva_Ficha_Clinica: Nueva_Ficha_Clinica, PacienteFichaMedica: PacienteFichaMedica, Check: Check });
    const Resultado = await Fetchs.FetchWithData();

    if (Resultado.Respuesta) {


        new Noty({
            text: '<strong>Advertencia</strong> Ficha Medica guardada correctamente',
            type: 'alert',
            theme: 'metroui',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();

        if (Check) {

            var select = document.getElementById('slcEvtCli');
            select.innerText = '';
            var option = document.createElement('option');
            option.text = 'Seleccione Evento Clínico...';
            option.value = 0;
            select.add(option);

            if (Object.entries(Resultado.EventoPaciente).length !== 0) {
                for (const Item of Resultado.EventoPaciente) {

                    var option = document.createElement('option');
                    option.text = Item.EVENTO;
                    option.value = Item.ID;
                    select.add(option);

                }
            }
        }

        var elemento = document.getElementById('BtnGuardarFichaClinicaModificada');
        var elemento2 = document.getElementById('BtnGuardarFichaClinica');

        if (elemento.style.display == "block") {
            document.getElementById('BtnGuardarFichaClinicaModificada').style.display = "none";
        }

        if (elemento2.style.display == "none") {
            document.getElementById('BtnGuardarFichaClinica').style.display = "block";
        }

        document.getElementById('txtMotivoConsulta').value = '';
        document.getElementById('txtAnamnesis').value = '';
        document.getElementById('txtEvaluacion').value = '';
        document.getElementById('txtDiagnostico').value = '';
        document.getElementById('txtGes').value = '';
        document.getElementById('txtExamenes').value = '';
        document.getElementById('txtSeguimiento').value = '';
        document.getElementById('txtTratamiento').value = '';
        document.getElementById('txtPrescripcion').value = '';
        document.getElementById('slcEvtCli').value = 0;

        document.getElementById('BtnEditarEvento').removeAttribute('disabled');
        document.getElementById('BtnNuevoEvento').removeAttribute('disabled');
        document.getElementById('slcEvtCli').removeAttribute('disabled');

        $("#ModalGuardarFichaModificadaCheck").modal('hide');

    }

};


window.NuevoRegistro = async function NuevoRegistro(Btn) {

    var elemento = document.getElementById('BtnGuardarFichaClinicaModificada');
    var elemento2 = document.getElementById('BtnGuardarFichaClinica');

    if (elemento.style.display == "block") {
        document.getElementById('BtnGuardarFichaClinicaModificada').style.display = "none";
    }

    if (elemento2.style.display == "none") {
        document.getElementById('BtnGuardarFichaClinica').style.display = "block";
    }

    document.getElementById('BtnEditarEvento').removeAttribute('disabled');
    document.getElementById('BtnNuevoEvento').removeAttribute('disabled');
    document.getElementById('slcEvtCli').removeAttribute('disabled');

    document.getElementById('txtMotivoConsulta').value = '';
    document.getElementById('txtAnamnesis').value = '';
    document.getElementById('txtEvaluacion').value = '';
    document.getElementById('txtDiagnostico').value = '';
    document.getElementById('txtGes').value = '';
    document.getElementById('txtExamenes').value = '';
    document.getElementById('txtSeguimiento').value = '';
    document.getElementById('txtTratamiento').value = '';
    document.getElementById('txtPrescripcion').value = '';
    document.getElementById('slcEvtCli').value = 0;
    document.getElementById('BtnGuardarFichaClinicaModificada').value = '';

    document.getElementById('txtMotivoConsulta').removeAttribute('disabled');
    document.getElementById('txtAnamnesis').removeAttribute('disabled');
    document.getElementById('txtEvaluacion').removeAttribute('disabled');
    document.getElementById('txtDiagnostico').removeAttribute('disabled');
    document.getElementById('txtGes').removeAttribute('disabled');
    document.getElementById('txtExamenes').removeAttribute('disabled');
    document.getElementById('txtSeguimiento').removeAttribute('disabled');
    document.getElementById('txtTratamiento').removeAttribute('disabled');
    document.getElementById('txtPrescripcion').removeAttribute('disabled');
    document.getElementById('slcEvtCli').removeAttribute('disabled');

};


window.EditarFichaMedica = async function EditarFichaMedica(Btn) {

    const Url = '../FichaPaciente/EditarFichaMedica';
    const Fetchs = Fetch(Url, { I: Btn.value });
    const Resultado = await Fetchs.FetchWithData();

    if (Resultado.Respuesta) {

        document.getElementById('txtMotivoConsulta').value = Resultado.FichaClinicaEditar.MOTIVO_CONSULTA;
        document.getElementById('txtAnamnesis').value = Resultado.FichaClinicaEditar.ANAMNESIS;
        document.getElementById('txtEvaluacion').value = Resultado.FichaClinicaEditar.EVALUACION;
        document.getElementById('txtDiagnostico').value = Resultado.FichaClinicaEditar.DIAGNOSTICO;
        document.getElementById('txtGes').value = Resultado.FichaClinicaEditar.PATOLOGIA_GES;
        document.getElementById('txtExamenes').value = Resultado.FichaClinicaEditar.EXAMENES;
        document.getElementById('txtSeguimiento').value = Resultado.FichaClinicaEditar.SEGUIMIENTO;
        document.getElementById('txtTratamiento').value = Resultado.FichaClinicaEditar.TRATAMIENTO;
        document.getElementById('txtPrescripcion').value = Resultado.FichaClinicaEditar.INDICACIONES;
        document.getElementById('slcEvtCli').value = Resultado.FichaClinicaEditar.COD_EVENTO;
        document.getElementById('BtnGuardarFichaClinicaModificada').value = Resultado.FichaClinicaEditar.ID;

        document.getElementById('txtMotivoConsulta').removeAttribute('disabled');
        document.getElementById('txtAnamnesis').removeAttribute('disabled');
        document.getElementById('txtEvaluacion').removeAttribute('disabled');
        document.getElementById('txtDiagnostico').removeAttribute('disabled');
        document.getElementById('txtGes').removeAttribute('disabled');
        document.getElementById('txtExamenes').removeAttribute('disabled');
        document.getElementById('txtSeguimiento').removeAttribute('disabled');
        document.getElementById('txtTratamiento').removeAttribute('disabled');
        document.getElementById('txtPrescripcion').removeAttribute('disabled');
        document.getElementById('slcEvtCli').removeAttribute('disabled');

        var elemento = document.getElementById('BtnGuardarFichaClinicaModificada');
        var elemento2 = document.getElementById('BtnGuardarFichaClinica');

        if (elemento.style.display == "none") {
            document.getElementById('BtnGuardarFichaClinicaModificada').style.display = "block";
        }

        if (elemento2.style.display == "block") {
            document.getElementById('BtnGuardarFichaClinica').style.display = "none";
        }

        document.getElementById('slcEvtCli').disabled = true;
        document.getElementById('BtnEditarEvento').disabled = true;
        document.getElementById('BtnNuevoEvento').disabled = true;

        $("#ModalHistorial").modal('hide');
    }

};


window.GuardarFichaClinica = async function GuardarFichaClinica(Btn) {

    $("#ModalGuardarFichaCheck").modal('show');

};


window.GuardarFichaClinicaModificada = async function GuardarFichaClinicaModificada(Btn) {

    $("#ModalGuardarFichaModificadaCheck").modal('show');

};