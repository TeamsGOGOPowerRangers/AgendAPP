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
//Colorpicker
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




$('#Color1').colorpicker({ format: 'hex' }).on('change', function (e) {

    const color = document.getElementById('Color1').value;
    //document.getElementById('btn_color1').style.backgroundColor = color;

});


$('#Mcolor').colorpicker({ format: 'hex' }).on('change', function (e) {

    const color = document.getElementById('Mcolor').value;
    //document.getElementById('btn_color1').style.backgroundColor = color;

});
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

window.addEventListener("load", function () {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', '../Mantenedores/Etiqueta', true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var resultado = JSON.parse(xhr.responseText);

            if (resultado.RESPUESTA) {

                Celda = document.createElement('td');


                console.log(resultado);
                console.log(resultado.datos);
                var table = document.getElementById('tabla_Etiqueta');
                var tbody = table.getElementsByTagName('tbody')[0];
                for (var i = 0; i < resultado.datos.length; i++) {
                    var cuerpo = '<tr>' +
                        '<td>' + resultado.datos[i].NOMBRE_COLORR + '</td>' +
                        '<td> <span class="label radius-circle" style="background-color: '+resultado.datos[i].COLOR+'; color: rgb(255, 255, 255);">' + resultado.datos[i].COLOR + '</span></td>' + 
              
                        '<td>' + moment(resultado.datos[i].FECHA_CREACION).format("DD/MM/YYYY") + '</td>'+
                        '<td>' + moment(resultado.datos[i].FECHA_EDICION).format("DD/MM/YYYY") + '</td>';

                    if (resultado.datos[i].ESTADO === 1) {
                        cuerpo += '<td>Activo</td>';
                    } else if (resultado.datos[i].ESTADO === 2) {
                        cuerpo += '<td>Inactivo</td>';
                    }
        
                    cuerpo += '<td>';
                    cuerpo += '<button class="btn btn-outline-primary btn-sm" id="ModificarColor" value=' + resultado.datos[i].ID_ETIQUETA + ' data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="Modificar Color"><i class="fa fa-edit"></i></button>';
                    cuerpo += '</td>' +
                       

                        '</tr>';
                    tbody.innerHTML += cuerpo;

                    $('[data-toggle="popover"]').popover();
                }

                $('#tabla_Etiqueta').DataTable({
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

    $("#AddColores").click(function () {
        $("#mdlCrear").modal("show");
    });
});


$("#BtnGuardarColor").click(function (e) {
    e.preventDefault();
    var Errores = 0;
    $("#tabla_Etiqueta").dataTable().fnDestroy();
    var datos = new FormData();

    var NombreColor = $("#Nombre_Color1").val();
    var Color = $("#Color1").val();
    datos.append("NombreColor", NombreColor);
    datos.append("Color", Color);

    if (NombreColor === "") {
        Errores += 1;
        new Noty({
            text: '<strong>Información</strong><br /> Debe ingresar el nombre del color.',
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

    if (Color === "") {
        Errores += 1;
        new Noty({
            text: '<strong>Información</strong><br /> Debe seleccionar el color.',
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
            url: '../Mantenedores/GuardarEtiqueta',
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

                    var table = document.getElementById('tabla_Etiqueta');
                    var tbody = table.getElementsByTagName('tbody')[0];

                    const fila = document.createElement('tr');
                    let Celda = document.createElement('td');
                    const Boton = document.createElement('button');
                    const icon = document.createElement('i');


                    Boton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
                    Boton.value = d.data.ID_ETIQUETA;
                    Boton.id = 'ModificarColor';
                    Boton.setAttribute('data-container', 'body');
                    Boton.setAttribute('data-toggle', 'popover');
                    Boton.setAttribute('data-trigger', 'hover');
                    Boton.setAttribute('data-data-placement', 'top');
                    Boton.setAttribute('data-content', 'Modificar');
                    Boton.setAttribute('data-original-title', 'title');




                    icon.classList.add('fa', 'fa-edit');
                    Boton.appendChild(icon);

                    Celda.innerText = d.data.NOMBRE_COLORR;
                    fila.appendChild(Celda);

                    Celda = document.createElement('td');
                    span = document.createElement('span');
                    span.classList.add('label', 'radius-circle');
                    span.setAttribute('style', 'background-color:' + d.data.COLOR + ';' + 'color:' + 'rgb(255, 255, 255); ');

                    span.innerText = d.data.COLOR;
                    Celda.appendChild(span);
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

                    $('#tabla_Etiqueta').DataTable({
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

$(document).on('click', '#ModificarColor', function (e) {
    e.preventDefault();
    var ID = $(this).val();
    $.ajax({
        type: 'POST',
        url: '../Mantenedores/ListaEtiquetasId',
        data: { 'id': ID },
        success: function (d) {
            if (d.RESPUESTA) {

                var datos = d.datos;
                console.log(datos);

                $("#BtnModificarColoresss").val(datos[0].ID_ETIQUETA);
                $("#MNombre_Color").val(datos[0].NOMBRE_COLORR);
                $("#Mcolor").val(datos[0].COLOR);
                $("#MEstado").val(Number(datos[0].ESTADO));


                $("#mdlEditar").modal("show");
 

            }
        },
        failure: function (response) {
            alert("Fallo");
        }
    });



});

$(document).on('click', '#BtnModificarColoresss', function (e) {
    e.preventDefault();
    var Errores = 0;
    var datos = new FormData();

    var ID_COLOR = $(this).val();
    var NOMBRE = $("#MNombre_Color").val();
    var COLOR = $("#Mcolor").val();
    var COD_ESTADO = $("#MEstado").val();

    datos.append("ID_COLOR", ID_COLOR);
    datos.append("NOMBRE", NOMBRE);
    datos.append("COLOR", COLOR);
    datos.append("COD_ESTADO", COD_ESTADO);

    if (NOMBRE === "") {
        Errores += 1;
        new Noty({
            text: '<strong>Información</strong><br /> Debe ingresar el nombre del color.',
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

    if (COLOR === "0") {
        Errores += 1;
        new Noty({
            text: '<strong>Información</strong><br /> Debe seleccionar el color.',
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
            url: '../Mantenedores/ModificarEtiqueta',
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

                    var table = document.getElementById('tabla_Etiqueta');
                    var tbody = table.getElementsByTagName('tbody')[0];
                    for (var i = 0; i < tbody.getElementsByTagName('tr').length; i++) {

                        var fila = tbody.getElementsByTagName('tr')[i];
                        var Celda = fila.getElementsByTagName('td')[5];
                        var btun = Celda.getElementsByTagName('button')[0];
                       
                        if (Number(btun.value) === d.data.ID_ETIQUETA) {
                            fila.getElementsByTagName('td')[1].innerText = '';
                            fila.getElementsByTagName('td')[0].innerText = d.data.NOMBRE_COLORR;
                        
                            span = document.createElement('span');
                            span.classList.add('label', 'radius-circle');
                            span.setAttribute('style', 'background-color:' + d.data.COLOR + ';' + 'color:' + 'rgb(255, 255, 255); ');
                            span.innerText = d.data.COLOR;
                            fila.getElementsByTagName('td')[1].appendChild(span);
                            fila.getElementsByTagName('td')[2].innerText = moment(d.data.FECHA_CREACION).format("DD/MM/YYYY");
                            fila.getElementsByTagName('td')[3].innerText = moment(d.data.FECHA_EDICION).format("DD/MM/YYYY");

                            if (d.data.ESTADO === 1) {
                                fila.getElementsByTagName('td')[4].innerText = 'Activo';
                            } else if (d.data.ESTADO === 2) {
                                fila.getElementsByTagName('td')[4].innerText = 'Inactivo';
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