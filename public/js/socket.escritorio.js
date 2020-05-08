var socket = io();


var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario')
}


var escritorio = searchParams.get('escritorio');
var label = $('#sml1');

$('#h1').text('Escritorio ' + escritorio);

socket.on('nuevoTicket', function(nuevo) {
    //$('toast').toast({ delay: 2000 });
    $('#texto').text('Nuevo ticket: ' + nuevo);
});

$('#btn1').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay ticket') {
            alert(resp);
            label.text(resp);

            return;
        }

        label.text('Ticket ' + resp.numero);


    })
})