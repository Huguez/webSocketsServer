
const lblEscritorio = document.querySelector( "h1" )
const lblticket = document.querySelector( "small" )
const btnAtender = document.querySelector( "#btnAtender" )
const alerta = document.querySelector( "#alerta" )
const lblPendientes = document.querySelector( "#lblPendientes" )

const searchParams = new URLSearchParams( window.location.search )

if( !searchParams.has( 'escritorio' ) ){
   window.location = 'index.html'
   throw new Error( "El escritorio es obligatorio" )
}

const escritorio = searchParams.get( 'escritorio' )


lblEscritorio.innerText = escritorio
lblPendientes.innerText = ""

alerta.style.display = "none"


const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');

   //  lblOffline.style.display = 'none';
   //  lblOnline.style.display  = '';
   btnAtender.disabled = false
});

socket.on( 'pendientes', ( pendientes ) => {
   lblPendientes.innerText = pendientes.length
} )


socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

   //  lblOnline.style.display  = 'none';
   //  lblOffline.style.display = '';
   btnAtender.disabled = true

});

btnAtender.addEventListener( 'click', () => {
   
   socket.emit( 'atender-ticket', { escritorio }, ( { ok, ticket, msg } ) => {

      if (!ok) {
         alerta.style.display = 'block'
         return
      }

      alerta.style.display = 'none'
      lblticket.innerText =  ticket.numero
   });


   
});
