import { Fetch, bouncejsShow, bouncejsClose, Espanol } from "../Globales/Global.js";

$(document).ready( async function () {

    const Fetchs = Fetch('../Pacientes/PacientesRegistrados', null);
    const Resultado = await Fetchs.FetchWithOutData();

    if (Resultado.Respuesta) {
        let Contenido = '';
        const TbodyPacientes = document.getElementById('TbodyPacientes');
        TbodyPacientes.innerHTML = '';

        if (Object.entries(Resultado.Pacientes).length !== 0) {
            for (const Item of Resultado.Pacientes) {
                Contenido += `<tr>
                                <td>${Item.NUMERO_FICHA.padStart(10, 0)}</td>                                
                                <td>${Item.NOMBRES}</td>                                
                                <td>${Item.APELLIDO_PATERNO}</td>                                
                                <td>${Item.APELLIDO_MATERNO}</td>                                
                                <td>${Item.IDENTIFICACION}</td>                                
                                <td>${moment(Item.FECHA_NACIMIENTO).format('DD-MM-YYYY')}</td>                                
                                <td>${Item.EMAIL}</td>                                
                                <td><button class="btn btn-light fa fa-edit" id="${Item.ID}"  value="${Item.ID}" title="Editar Datos" onclick="EditarPaciente(this)"></button>
                                    <button class="btn btn-light fa fa-user" value="${Item.ID}" title="Ficha Paciente" onclick="FichaPaciente(this)"></button>
                                </td>                                
                             </tr>`;
            }
        }
        TbodyPacientes.innerHTML = Contenido;

        $('#tblPacientes').DataTable({
            language: Espanol
        });
    }

    document.getElementById('BtnModalAgregarPaciente').addEventListener('click', async function () {

        const Fetchs = Fetch('../Pacientes/NFichaPacientes', null);
        const Resultado = await Fetchs.FetchWithOutData();

        if (Resultado.Respuesta) {

            document.getElementById('txtNFicha').value = Resultado.N_Ficha.padStart(10, 0);

        }

        $("#ModalCrearPaciente").modal('show');

    });

    document.getElementById('BtnGuardaPaciente').addEventListener('click', async function () {

        var Errores = 0;

        if (document.getElementById('txtNombres').value == '') {
            new Noty({
                text: '<strong>Advertencia</strong> Debe ingesar nombres',
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

        if (document.getElementById('txtApellidoPaterno').value == '') {
            new Noty({
                text: '<strong>Advertencia</strong> Debe ingesar apellido paterno',
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

        if (document.getElementById('txtApellidoMaterno').value == '') {
            new Noty({
                text: '<strong>Advertencia</strong> Debe ingesar apellido materno',
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

        if (document.getElementById('slcNacionalidad').value == 0) {
            new Noty({
                text: '<strong>Advertencia</strong> Debe seleccionar nacionalidad',
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

        if (document.getElementById('txtIdentificacion').value == '') {
            new Noty({
                text: '<strong>Advertencia</strong> Debe ingresar identificacion',
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

        if (document.getElementById('FNacimiento').value == '') {
            new Noty({
                text: '<strong>Advertencia</strong> Debe ingresar fecha de nacimiento',
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

        if (document.getElementById('txtEmail').value == '') {
            new Noty({
                text: '<strong>Advertencia</strong> Debe ingresar un correo electronico',
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

        if (document.getElementById('txtTelefonoFijo').value == '') {
            new Noty({
                text: '<strong>Advertencia</strong> Debe ingresar un telefono fijo',
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


        if (document.getElementById('txtTelefonoMovil').value == '') {
            new Noty({
                text: '<strong>Advertencia</strong> Debe ingresar un telefono movil',
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

        if (document.getElementById('slcConvenio').value == 0) {
            new Noty({
                text: '<strong>Advertencia</strong> Debe seleccionar un convenio',
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

        if (document.getElementById('slcPrevicion').value == 0) {
            new Noty({
                text: '<strong>Advertencia</strong> Debe seleccionar una previcion',
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

        if (document.getElementById('slcMLlegada').value == 0) {
            new Noty({
                text: '<strong>Advertencia</strong> Debe seleccionar una forma de llegada',
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

        if (document.getElementById('slcRegion').value == 0) {
            new Noty({
                text: '<strong>Advertencia</strong> Debe seleccionar una region',
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

        if (document.getElementById('slcComuna').value == 0) {
            new Noty({
                text: '<strong>Advertencia</strong> Debe seleccionar una comuna',
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


        if (document.getElementById('txtCalle').value == '') {
            new Noty({
                text: '<strong>Advertencia</strong> Debe ingresar una direccion',
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

        if (document.getElementById('txtNumero').value == '') {
            new Noty({
                text: '<strong>Advertencia</strong> Debe ingresar un numero',
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

        if (document.getElementById('txtPiso').value == '') {
            new Noty({
                text: '<strong>Advertencia</strong> Debe ingresar un piso',
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

        if (document.getElementById('txtOficina').value == '') {
            new Noty({
                text: '<strong>Advertencia</strong> Debe ingresar una oficina',
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

        if (document.getElementById('slcSexo').value == 0) {
            new Noty({
                text: '<strong>Advertencia</strong> Debe seleccionar un sexo',
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

        if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(document.getElementById('txtEmail').value)) {

            new Noty({
                text: '<strong>Advertencia</strong> Ingrese un correo valido',
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

            const Nuevo_Paciente = new Object();
            Nuevo_Paciente.NOMBRES = document.getElementById('txtNombres').value;
            Nuevo_Paciente.APELLIDO_PATERNO = document.getElementById('txtApellidoPaterno').value;
            Nuevo_Paciente.APELLIDO_MATERNO = document.getElementById('txtApellidoMaterno').value;
            Nuevo_Paciente.NACIONALIDAD = document.getElementById('slcNacionalidad').value;
            Nuevo_Paciente.IDENTIFICACION = document.getElementById('txtIdentificacion').value;
            Nuevo_Paciente.FECHA_NACIMIENTO = document.getElementById('FNacimiento').value;
            Nuevo_Paciente.EMAIL = document.getElementById('txtEmail').value;
            Nuevo_Paciente.TELEFONO_FIJO = document.getElementById('txtTelefonoFijo').value;
            Nuevo_Paciente.TELEFONO_MOVIL = document.getElementById('txtTelefonoMovil').value;
            Nuevo_Paciente.COD_CONVENIO = document.getElementById('slcConvenio').value;
            Nuevo_Paciente.COD_PREVISION = document.getElementById('slcPrevicion').value;
            Nuevo_Paciente.COD_MODO_LLEGADA = document.getElementById('slcMLlegada').value;
            Nuevo_Paciente.COD_REGION = document.getElementById('slcRegion').value;
            Nuevo_Paciente.COD_COMUNA = document.getElementById('slcComuna').value;
            Nuevo_Paciente.CALLE = document.getElementById('txtCalle').value;
            Nuevo_Paciente.NUMERO = document.getElementById('txtNumero').value;
            Nuevo_Paciente.PISO = document.getElementById('txtPiso').value;
            Nuevo_Paciente.OFICINA = document.getElementById('txtOficina').value;
            Nuevo_Paciente.COMENTARIO = document.getElementById('txtComentario').value;
            Nuevo_Paciente.ALERTA_EN_FICHA = document.getElementById('txtAlertaFicha').value;
            Nuevo_Paciente.ALERTA_EN_TOMA_HORA = document.getElementById('txtAlertaAgenda').value;
            Nuevo_Paciente.SEXO = document.getElementById('slcSexo').value;
            Nuevo_Paciente.COD_ETIQUETA = document.getElementById('slcEtiqueta').value != 0 ? document.getElementById('slcEtiqueta').value : null;

            console.log(Nuevo_Paciente);

            const Fetchs = Fetch('../Pacientes/RegistrarPacientes', Nuevo_Paciente);
            const Resultado = await Fetchs.FetchWithData();

            if (Resultado.Respuesta) {

                if (Resultado.Tipo == 2) {

                    new Noty({
                        text: '<strong>Advertencia</strong> Paciente ya registrado',
                        type: 'alert',
                        theme: 'metroui',
                        layout: 'topRight',
                        timeout: 4000,
                        animation: {
                            open: bouncejsShow,
                            close: bouncejsClose
                        }
                    }).show();

                } else {

                    $('#tblPacientes').DataTable().destroy();
                    const TbodyPacientes = document.getElementById('TbodyPacientes');
                    var Contenido = TbodyPacientes.innerHTML;

                    Contenido += `<tr>
                                <td>${Resultado.PacienteNuevo.NUMERO_FICHA.padStart(10, 0)}</td>                                
                                <td>${Resultado.PacienteNuevo.NOMBRES}</td>                                
                                <td>${Resultado.PacienteNuevo.APELLIDO_PATERNO}</td>                                
                                <td>${Resultado.PacienteNuevo.APELLIDO_MATERNO}</td>                                
                                <td>${Resultado.PacienteNuevo.IDENTIFICACION}</td>                                
                                <td>${moment(Resultado.PacienteNuevo.FECHA_NACIMIENTO).format('DD-MM-YYYY')}</td>                                
                                <td>${Resultado.PacienteNuevo.EMAIL}</td>                                
                                <td><button class="btn btn-light fa fa-edit" id="${Resultado.PacienteNuevo.ID}"  value="${Resultado.PacienteNuevo.ID}" title="Editar Datos" onclick="EditarPaciente(this)"></button>
                                    <button class="btn btn-light fa fa-user" value="${Resultado.PacienteNuevo.ID}" title="Ficha Paciente" onclick="FichaPaciente(this)"></button>
                                </td>                                
                             </tr>`;

                    TbodyPacientes.innerHTML = Contenido;

                    $('#tblPacientes').DataTable({
                        language: Espanol
                    });

                    new Noty({
                        text: '<strong>Advertencia</strong> Paciente registrado',
                        type: 'alert',
                        theme: 'metroui',
                        layout: 'topRight',
                        timeout: 4000,
                        animation: {
                            open: bouncejsShow,
                            close: bouncejsClose
                        }
                    }).show();

                    $("#ModalCrearPaciente").modal('hide');

                }
            }

        }

    });

});

window.GuardarPacienteModificado = async function GuardarPacienteModificado(Btn) {

    var Errores = 0;

    if (document.getElementById('txtNombresM').value == '') {
        new Noty({
            text: '<strong>Advertencia</strong> Debe ingesar nombres',
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

    if (document.getElementById('txtApellidoPaternoM').value == '') {
        new Noty({
            text: '<strong>Advertencia</strong> Debe ingesar apellido paterno',
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

    if (document.getElementById('txtApellidoMaternoM').value == '') {
        new Noty({
            text: '<strong>Advertencia</strong> Debe ingesar apellido materno',
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

    if (document.getElementById('slcNacionalidadM').value == 0) {
        new Noty({
            text: '<strong>Advertencia</strong> Debe seleccionar nacionalidad',
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

    if (document.getElementById('txtIdentificacionM').value == '') {
        new Noty({
            text: '<strong>Advertencia</strong> Debe ingresar identificacion',
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

    if (document.getElementById('FNacimientoM').value == '') {
        new Noty({
            text: '<strong>Advertencia</strong> Debe ingresar fecha de nacimiento',
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

    if (document.getElementById('txtEmailM').value == '') {
        new Noty({
            text: '<strong>Advertencia</strong> Debe ingresar un correo electronico',
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

    if (document.getElementById('txtTelefonoFijoM').value == '') {
        new Noty({
            text: '<strong>Advertencia</strong> Debe ingresar un telefono fijo',
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


    if (document.getElementById('txtTelefonoMovilM').value == '') {
        new Noty({
            text: '<strong>Advertencia</strong> Debe ingresar un telefono movil',
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

    if (document.getElementById('slcConvenioM').value == 0) {
        new Noty({
            text: '<strong>Advertencia</strong> Debe seleccionar un convenio',
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

    if (document.getElementById('slcPrevicionM').value == 0) {
        new Noty({
            text: '<strong>Advertencia</strong> Debe seleccionar una previcion',
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

    if (document.getElementById('slcMLlegadaM').value == 0) {
        new Noty({
            text: '<strong>Advertencia</strong> Debe seleccionar una forma de llegada',
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

    if (document.getElementById('slcRegionM').value == 0) {
        new Noty({
            text: '<strong>Advertencia</strong> Debe seleccionar una region',
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

    if (document.getElementById('slcComunaM').value == 0) {
        new Noty({
            text: '<strong>Advertencia</strong> Debe seleccionar una comuna',
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


    if (document.getElementById('txtCalleM').value == '') {
        new Noty({
            text: '<strong>Advertencia</strong> Debe ingresar una direccion',
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

    if (document.getElementById('txtNumeroM').value == '') {
        new Noty({
            text: '<strong>Advertencia</strong> Debe ingresar un numero',
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

    if (document.getElementById('txtPisoM').value == '') {
        new Noty({
            text: '<strong>Advertencia</strong> Debe ingresar un piso',
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

    if (document.getElementById('txtOficinaM').value == '') {
        new Noty({
            text: '<strong>Advertencia</strong> Debe ingresar una oficina',
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

    if (document.getElementById('slcSexoM').value == 0) {
        new Noty({
            text: '<strong>Advertencia</strong> Debe seleccionar un sexo',
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

    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(document.getElementById('txtEmailM').value)) {

        new Noty({
            text: '<strong>Advertencia</strong> Ingrese un correo valido',
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

        const Actualizar_Paciente = new Object();
        var ID_FICHA = document.getElementById('BtnGuardaPacienteM').value;
        Actualizar_Paciente.NOMBRES = document.getElementById('txtNombresM').value;
        Actualizar_Paciente.APELLIDO_PATERNO = document.getElementById('txtApellidoPaternoM').value;
        Actualizar_Paciente.APELLIDO_MATERNO = document.getElementById('txtApellidoMaternoM').value;
        Actualizar_Paciente.NACIONALIDAD = document.getElementById('slcNacionalidadM').value;
        Actualizar_Paciente.IDENTIFICACION = document.getElementById('txtIdentificacionM').value;
        Actualizar_Paciente.FECHA_NACIMIENTO = document.getElementById('FNacimientoM').value;
        Actualizar_Paciente.EMAIL = document.getElementById('txtEmailM').value;
        Actualizar_Paciente.TELEFONO_FIJO = document.getElementById('txtTelefonoFijoM').value;
        Actualizar_Paciente.TELEFONO_MOVIL = document.getElementById('txtTelefonoMovilM').value;
        Actualizar_Paciente.COD_CONVENIO = document.getElementById('slcConvenioM').value;
        Actualizar_Paciente.COD_PREVISION = document.getElementById('slcPrevicionM').value;
        Actualizar_Paciente.COD_MODO_LLEGADA = document.getElementById('slcMLlegadaM').value;
        Actualizar_Paciente.COD_REGION = document.getElementById('slcRegionM').value;
        Actualizar_Paciente.COD_COMUNA = document.getElementById('slcComunaM').value;
        Actualizar_Paciente.CALLE = document.getElementById('txtCalleM').value;
        Actualizar_Paciente.NUMERO = document.getElementById('txtNumeroM').value;
        Actualizar_Paciente.PISO = document.getElementById('txtPisoM').value;
        Actualizar_Paciente.OFICINA = document.getElementById('txtOficinaM').value;
        Actualizar_Paciente.COMENTARIO = document.getElementById('txtComentarioM').value;
        Actualizar_Paciente.ALERTA_EN_FICHA = document.getElementById('txtAlertaFichaM').value;
        Actualizar_Paciente.ALERTA_EN_TOMA_HORA = document.getElementById('txtAlertaAgendaM').value;
        Actualizar_Paciente.SEXO = document.getElementById('slcSexoM').value;
        Actualizar_Paciente.COD_ETIQUETA = document.getElementById('slcEtiquetaM').value != 0 ? document.getElementById('slcEtiqueta').value : null;

        console.log(Actualizar_Paciente);

        const Fetchs = Fetch('../Pacientes/ActualizarPaciente', { Actualizar_Paciente: Actualizar_Paciente, ID_FICHA: ID_FICHA });
        const Resultado = await Fetchs.FetchWithData();

        if (Resultado.Respuesta) {

            if (Resultado.Tipo == 2) {

                new Noty({
                    text: '<strong>Advertencia</strong> Paciente ya registrado',
                    type: 'alert',
                    theme: 'metroui',
                    layout: 'topRight',
                    timeout: 4000,
                    animation: {
                        open: bouncejsShow,
                        close: bouncejsClose
                    }
                }).show();

            } else {

                document.getElementById(document.getElementById('BtnGuardaPacienteM').value).parentNode.parentNode.getElementsByTagName('td')[1].innerText = Resultado.PacienteActualizado.NOMBRES;
                document.getElementById(document.getElementById('BtnGuardaPacienteM').value).parentNode.parentNode.getElementsByTagName('td')[2].innerText = Resultado.PacienteActualizado.APELLIDO_PATERNO;
                document.getElementById(document.getElementById('BtnGuardaPacienteM').value).parentNode.parentNode.getElementsByTagName('td')[3].innerText = Resultado.PacienteActualizado.APELLIDO_MATERNO;
                document.getElementById(document.getElementById('BtnGuardaPacienteM').value).parentNode.parentNode.getElementsByTagName('td')[4].innerText = Resultado.PacienteActualizado.IDENTIFICACION;
                document.getElementById(document.getElementById('BtnGuardaPacienteM').value).parentNode.parentNode.getElementsByTagName('td')[5].innerText = moment(Resultado.PacienteActualizado.FECHA_NACIMIENTO).format('DD-MM-YYYY');
                document.getElementById(document.getElementById('BtnGuardaPacienteM').value).parentNode.parentNode.getElementsByTagName('td')[6].innerText = Resultado.PacienteActualizado.EMAIL;

                new Noty({
                    text: '<strong>Advertencia</strong> Paciente Actualizado',
                    type: 'alert',
                    theme: 'metroui',
                    layout: 'topRight',
                    timeout: 4000,
                    animation: {
                        open: bouncejsShow,
                        close: bouncejsClose
                    }
                }).show();

                $("#ModalModificarPaciente").modal('hide');

            }
        }

    }
};

window.EditarPaciente = async function EditarPaciente(Btn) {

    const Fetchs = Fetch('../Pacientes/DatosPaciente', { IdPaciente: Btn.value });
    const Resultado = await Fetchs.FetchWithData();

    if (Resultado.Respuesta) {

        document.getElementById('BtnGuardaPacienteM').value = Btn.value;
        document.getElementById('txtNFichaM').value = Resultado.Paciente.NUMERO_FICHA.padStart(10, 0);
        document.getElementById('txtNombresM').value = Resultado.Paciente.NOMBRES;
        document.getElementById('txtApellidoPaternoM').value = Resultado.Paciente.APELLIDO_PATERNO;
        document.getElementById('txtApellidoMaternoM').value = Resultado.Paciente.APELLIDO_MATERNO;
        document.getElementById('slcNacionalidadM').value = Resultado.Paciente.NACIONALIDAD;
        document.getElementById('txtIdentificacionM').value = Resultado.Paciente.IDENTIFICACION;
        document.getElementById('FNacimientoM').value = moment(Resultado.Paciente.FECHA_NACIMIENTO).format('YYYY-MM-DD');
        document.getElementById('txtEmailM').value = Resultado.Paciente.EMAIL;
        document.getElementById('txtTelefonoFijoM').value = Resultado.Paciente.TELEFONO_FIJO;
        document.getElementById('txtTelefonoMovilM').value = Resultado.Paciente.TELEFONO_MOVIL;
        document.getElementById('slcConvenioM').value = Resultado.Paciente.COD_CONVENIO;
        document.getElementById('slcPrevicionM').value = Resultado.Paciente.COD_PREVISION;
        document.getElementById('slcMLlegadaM').value = Resultado.Paciente.COD_MODO_LLEGADA;
        document.getElementById('slcRegionM').value = Resultado.Paciente.COD_REGION;
        document.getElementById('slcComunaM').value = Resultado.Paciente.COD_COMUNA;
        document.getElementById('txtCalleM').value = Resultado.Paciente.CALLE;
        document.getElementById('txtNumeroM').value = Resultado.Paciente.NUMERO;
        document.getElementById('txtPisoM').value = Resultado.Paciente.PISO;
        document.getElementById('txtOficinaM').value = Resultado.Paciente.OFICINA;
        document.getElementById('txtComentarioM').value = Resultado.Paciente.COMENTARIO;
        document.getElementById('txtAlertaFichaM').value = Resultado.Paciente.ALERTA_EN_FICHA;
        document.getElementById('txtAlertaAgendaM').value = Resultado.Paciente.ALERTA_EN_TOMA_HORA;
        document.getElementById('slcSexoM').value = Resultado.Paciente.SEXO;
        document.getElementById('slcEtiquetaM').value = Resultado.Paciente.COD_ETIQUETA == null ? 0 : Resultado.Paciente.COD_ETIQUETA;

        $("#ModalModificarPaciente").modal('show');
    }
};


window.FichaPaciente = async function FichaPaciente(Btn) {

    window.location.href = `../FichaPaciente/FichaPaciente?I=${Btn.value}`;
};
