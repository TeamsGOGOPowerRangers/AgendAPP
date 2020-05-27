var bouncejsShow = function (promise) {
    var n = this;
    new Bounce()
        .translate({
            from: { x: 450, y: 0 }, to: { x: 0, y: 0 },
            easing: 'bounce',
            duration: 1000,
            bounces: 4,
            stiffness: 3
        })
        .scale({
            from: { x: 1.2, y: 1 }, to: { x: 1, y: 1 },
            easing: 'bounce',
            duration: 1000,
            delay: 100,
            bounces: 4,
            stiffness: 1
        })
        .scale({
            from: { x: 1, y: 1.2 }, to: { x: 1, y: 1 },
            easing: 'bounce',
            duration: 1000,
            delay: 100,
            bounces: 6,
            stiffness: 1
        })
        .applyTo(n.barDom, {
            onComplete: function () {
                promise(function (resolve) {
                    resolve();
                });
            }
        });
};
var bouncejsClose = function (promise) {
    var n = this;
    new Bounce()
        .translate({
            from: { x: 0, y: 0 }, to: { x: 450, y: 0 },
            easing: 'bounce',
            duration: 500,
            bounces: 4,
            stiffness: 1
        })
        .applyTo(n.barDom, {
            onComplete: function () {
                promise(function (resolve) {
                    resolve();
                });
            }
        });
};
const Espanol = {
    "sProcessing": "Procesando...",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
};


window.addEventListener("load", function () {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', '../Mantenedores/TelefonoLista', true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var resultado = JSON.parse(xhr.responseText);

            if (resultado.RESPUESTA) {

                Celda = document.createElement('td');


                console.log(resultado);
                console.log(resultado.datos);
                var table = document.getElementById('tabla_Telefono');
                var tbody = table.getElementsByTagName('tbody')[0];
                for (var i = 0; i < resultado.datos.length; i++) {
                    var cuerpo = '<tr>';
                    if (resultado.datos[i].TIPO === 'Casa') {
                        cuerpo += '<td>Casa</td>';
                    } else if (resultado.datos[i].IMPUESTO === 'Trabajo') {
                        cuerpo += '<td>Trabajo</td>';
                    } else if (resultado.datos[i].IMPUESTO === 'Movil') {
                        cuerpo += '<td>Movil</td>';
                    }
                    cuerpo += '<td>' + resultado.datos[i].NUMERO + '</td>';
                    if (resultado.datos[i].PRINCIPAL === 1) {
                        cuerpo += '<td >Activo</td>';
                    } else if (resultado.datos[i].PRINCIPAL === 2) {
                        cuerpo += '<td>Inactivo</td>';
                    }
                   
                    cuerpo += '<td>' + resultado.datos[i].COMENTARIO + '</td>';
                    cuerpo += '<td>' + moment(resultado.datos[i].FECHA_CREACION).format("DD/MM/YYYY") + '</td>';
                    cuerpo += '<td>' + moment(resultado.datos[i].FECHA_EDICION).format("DD/MM/YYYY") + '</td>';

                    if (resultado.datos[i].ESTADO === 1) {
                        cuerpo += '<td>Activo</td>';
                    } else if (resultado.datos[i].ESTADO === 2) {
                        cuerpo += '<td>Inactivo</td>';
                    }

                    cuerpo += '<td>';
                    cuerpo += '<button class="btn btn-outline-primary btn-sm" id="ModificarTelefono" value=' + resultado.datos[i].ID_TELEFONO + ' data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="Modificar Telefono"><i class="fa fa-edit"></i></button>';
                    cuerpo += '</td>' +


                        '</tr>';
                    tbody.innerHTML += cuerpo;

                    $('[data-toggle="popover"]').popover();
                }

                $('#tabla_Telefono').DataTable({
                    "language": Espanol,
                    destroy: true,
                    scrollX: true,
                    "aaSorting": [],
                    fixedHeader: {
                        header: true,
                        footer: true
                    },
                    "lengthMenu": true,
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'copyHtml5',
                            text: 'Copiar'
                        }, {
                            extend: 'excelHtml5',
                            text: 'Excel'
                        }

                    ]
                });
            }

        }
    };
    xhr.send();

    $("#AddTelefono").click(function () {
        $("#mdlCrear").modal("show");
    });
});

$("#BtnGuardarTelefono").click(function (e) {
    e.preventDefault();
    var Errores = 0;
    $("#tabla_Telefono").dataTable().fnDestroy();
    var datos = new FormData();

    var SelectTipo = $("#txtTelefono").val();
    var Codigo = $("#txtCodigo").val();
    var Numero = $("#txtNumero").val();
    var Comentario = $("#txtComentario").val();
    var Principal = Number($("#txtPrincipal").val());
    datos.append("SelectTipo", SelectTipo);
    datos.append("Codigo", Codigo);
    datos.append("Numero", Numero);
    datos.append("Comentario", Comentario);
    datos.append("Principal", Principal);

    if (SelectTipo === "") {
        Errores += 1;
        new Noty({
            text: '<strong>Información</strong><br /> Debe seleccionar el Tipo .',
            type: 'error',
            theme: 'sunset',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
    }

    if (Codigo === "") {
        Errores += 1;
        new Noty({
            text: '<strong>Información</strong><br /> Debe ingresar Codigo.',
            type: 'error',
            theme: 'sunset',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
    }
    if (Numero === "") {
        Errores += 1;
        new Noty({
            text: '<strong>Información</strong><br /> Debe ingresar Numero.',
            type: 'error',
            theme: 'sunset',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
    }
    if (Comentario === "") {
        Errores += 1;
        new Noty({
            text: '<strong>Información</strong><br /> Debe ingresar Comentario.',
            type: 'error',
            theme: 'sunset',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
    }
    if (Errores === 0) {
        $.ajax({
            data: datos,
            processData: false,
            contentType: false,
            //contentType: 'application/json; charset=utf-8',
            //dataType: 'json',
            type: 'POST',
            url: '../Mantenedores/GuardarTelefono',
            success: function (d) {
                if (d.RESPUESTA) {

                    new Noty({
                        text: '<strong>Información</strong><br /> Guardado!.',
                        type: 'success',
                        theme: 'sunset',
                        layout: 'topRight',
                        timeout: 4000,
                        animation: {
                            open: bouncejsShow,
                            close: bouncejsClose
                        }
                    }).show();

                    $("#mdlCrear").modal("hide");

                    var table = document.getElementById('tabla_Telefono');
                    var tbody = table.getElementsByTagName('tbody')[0];

                    const fila = document.createElement('tr');
                    let Celda = document.createElement('td');
                    const Boton = document.createElement('button');
                    const icon = document.createElement('i');


                    Boton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
                    Boton.value = d.data.ID_TELEFONO;
                    Boton.id = 'ModificarTelefono';
                    Boton.setAttribute('data-container', 'body');
                    Boton.setAttribute('data-toggle', 'popover');
                    Boton.setAttribute('data-trigger', 'hover');
                    Boton.setAttribute('data-data-placement', 'top');
                    Boton.setAttribute('data-content', 'Modificar Telefono');
                    Boton.setAttribute('data-original-title', 'title');




                    icon.classList.add('fa', 'fa-edit');
                    Boton.appendChild(icon);

                    Celda.innerText = d.data.TIPO;
                    fila.appendChild(Celda);

                    Celda = document.createElement('td');
                    Celda.innerText = d.data.NUMERO;
                    fila.appendChild(Celda);

                    Celda = document.createElement('td');
                    Celda.innerText = d.data.PRINCIPAL;
                    fila.appendChild(Celda);

                    Celda = document.createElement('td');
                    Celda.innerText = d.data.COMENTARIO;
                    fila.appendChild(Celda);


                    Celda = document.createElement('td');
                    Celda.innerText = moment(d.data.FECHA_CREACION).format("DD/MM/YYYY");
                    fila.appendChild(Celda);

                    Celda = document.createElement('td');
                    Celda.innerText = moment(d.data.FECHA_EDICION).format("DD/MM/YYYY");
                    fila.appendChild(Celda);

                    Celda = document.createElement('td');
                    if (d.data.ESTADO === 1) {
                        Celda.innerText = 'Activo';
                        fila.appendChild(Celda);
                    } else if (d.data.ESTADO === 2) {
                        Celda.innerText = 'Inactivo';
                        fila.appendChild(Celda);
                    }

                    Celda = document.createElement('td');
                    Celda.appendChild(Boton);
                    fila.appendChild(Celda);
                    tbody.appendChild(fila);

                    $('#tabla_Telefono').DataTable({
                        "language": Espanol,
                        destroy: true,
                        scrollX: true,
                        "aaSorting": [],
                        fixedHeader: {
                            header: true,
                            footer: true
                        },
                        "lengthMenu": true,
                        dom: 'Bfrtip',
                        buttons: [
                            {
                                extend: 'copyHtml5',
                                text: 'Copiar'
                            }, {
                                extend: 'excelHtml5',
                                text: 'Excel'
                            }

                        ]
                    });

                }

            },
            failure: function (response) {
                alert("Fallo");
            }
        });
    }
    else {
        new Noty({
            text: '<strong>Información</strong><br /> Debe seleccionar todos los campos.',
            type: 'error',
            theme: 'sunset',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
    }
});

$(document).on('click', '#ModificarTelefono', function (e) {
    e.preventDefault();
    var ID = $(this).val();
    $.ajax({
        type: 'POST',
        url: '../Mantenedores/ListaTelefonoId',
        data: { 'id': ID },
        success: function (d) {
            if (d.RESPUESTA) {

                var datos = d.datos;
                console.log(datos);

                $("#BtnModificarTelefono").val(datos[0].ID_TELEFONO);
                $("#txtMTelefono").val(datos[0].TIPO);
                $("#txtMCodigo").val(datos[0].CODIGO_TELEFONO);
                $("#txtMNumero").val(datos[0].NUMERO);
                $("#txtMComentario").val(datos[0].COMENTARIO);
                $("#txtMPrincipal").val(Number(datos[0].PRINCIPAL));
                $("#Mestado").val(Number(datos[0].ESTADO));


                $("#mdlEditar").modal("show");


            }
        },
        failure: function (response) {
            alert("Fallo");
        }
    });



});


$(document).on('click', '#BtnModificarTelefono', function (e) {
    e.preventDefault();
    var Errores = 0;
    var datos = new FormData();

    var ID_TELEFONO = $(this).val();
    var Tipo = $("#txtMTelefono").val();
    var Codigo = $("#txtMCodigo").val();
    var Numero = $("#txtMNumero").val();
    var Comentario = Number($("#txtMComentario").val());
    var Principal = Number($("#txtMPrincipal").val());
    var CodEstado = Number($("#Mestado").val());

    datos.append("ID_TELEFONO", ID_TELEFONO);
    datos.append("Tipo", Tipo);
    datos.append("Codigo", Codigo);
    datos.append("Numero", Numero);
    datos.append("Comentario", Comentario);
    datos.append("Principal", Principal);
    datos.append("CodEstado", CodEstado);

    if (Tipo === "") {
        Errores += 1;
        new Noty({
            text: '<strong>Información</strong><br /> Debe seleccionar un Tipo.',
            type: 'error',
            theme: 'sunset',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
    }

    if (Principal === "") {
        Errores += 1;
        new Noty({
            text: '<strong>Información</strong><br /> Debe Seleccionar Principal.',
            type: 'error',
            theme: 'sunset',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
    }
    if (CodEstado === "") {
        Errores += 1;
        new Noty({
            text: '<strong>Información</strong><br /> Debe Seleccionar el Estado.',
            type: 'error',
            theme: 'sunset',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
    }



    if (Errores === 0) {


        $.ajax({
            data: datos,
            processData: false,
            contentType: false,
            type: 'POST',
            url: '../Mantenedores/ModificarTelefono',
            success: function (d) {
                if (d.RESPUESTA) {
                    new Noty({
                        text: '<strong>Información</strong><br /> Guardado!.',
                        type: 'success',
                        theme: 'sunset',
                        layout: 'topRight',
                        timeout: 4000,
                        animation: {
                            open: bouncejsShow,
                            close: bouncejsClose
                        }
                    }).show();

                    $("#mdlEditar").modal("hide");

                    var table = document.getElementById('tabla_Telefono');
                    var tbody = table.getElementsByTagName('tbody')[0];
                    for (var i = 0; i < tbody.getElementsByTagName('tr').length; i++) {

                        var fila = tbody.getElementsByTagName('tr')[i];
                        var Celda = fila.getElementsByTagName('td')[7];
                        var btun = Celda.getElementsByTagName('button')[0];

                        if (Number(btun.value) === d.data.ID_TELEFONO) {

                            if (d.data.TIPO === 'Casa') {
                                fila.getElementsByTagName('td')[0].innerText = 'Casa';
                            } else if (d.data.TIPO === 'Trabajo') {
                                fila.getElementsByTagName('td')[0].innerText = 'Trabajo';
                            } else if (d.data.TIPO === 'Movil') {
                                fila.getElementsByTagName('td')[0].innerText = 'Movil';
                            }
                            fila.getElementsByTagName('td')[1].innerText = d.data.NUMERO;
                            fila.getElementsByTagName('td')[2].innerText = d.data.PRINCIPAL;
                            fila.getElementsByTagName('td')[3].innerText = d.data.COMENTARIO;
                            fila.getElementsByTagName('td')[4].innerText = moment(d.data.FECHA_CREACION).format("DD/MM/YYYY");
                            fila.getElementsByTagName('td')[5].innerText = moment(d.data.FECHA_EDICION).format("DD/MM/YYYY");

                            if (d.data.ESTADO === 1) {
                                fila.getElementsByTagName('td')[6].innerText = 'Activo';
                            } else if (d.data.ESTADO === 2) {
                                fila.getElementsByTagName('td')[6].innerText = 'Inactivo';
                            }


                        }


                    }

                }
            },
            failure: function (response) {
                alert("Fallo");
            }
        });
    }
    else {
        new Noty({
            text: '<strong>Información</strong><br /> Debe seleccionar todos los campos.',
            type: 'error',
            theme: 'sunset',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
    }

});