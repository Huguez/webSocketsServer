
const lblNuevoTicket = document.querySelector( "#lblNuevoTicket" )
const btnCrear       = document.querySelector( "button" )

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');

   //  lblOffline.style.display = 'none';
   //  lblOnline.style.display  = '';
   btnCrear.disabled = false


});

socket.on( 'ultimo-ticket', ( ultimo ) => {
   lblNuevoTicket.innerText = 'Ticket ' + ultimo
} )

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

   //  lblOnline.style.display  = 'none';
   //  lblOffline.style.display = '';
   btnCrear.disabled = true

});

btnCrear.addEventListener( 'click', () => {

   
    
   socket.emit( 'siguiente-ticket', null, ( ticket ) => {
      console.log('Desde el server', ticket );
      lblNuevoTicket.innerText = ticket
   });

});