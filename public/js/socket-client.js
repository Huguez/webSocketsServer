const lblonline  = document.querySelector( "#online" )
const lbloffline = document.querySelector( "#offline" )

const cajaText  = document.querySelector( '#cajaText' )
const btnEnviar = document.querySelector( '#btnEnviar' )

const cliente = io();

cliente.on( 'connect', () => {
   console.log( "Conectado ", cliente.id );
   lbloffline.style.display = "none"
   lblonline.style.display = ""
} )


cliente.on( 'disconnect', () => {
   console.log( "DESonectado " );
   lblonline.style.display = "none"
   lbloffline.style.display = ""
} )


btnEnviar.addEventListener( 'click', () => {
   const mensaje = cajaText.value
   
   const payload = {
      mensaje, 
      id: "123456",
      fecha: new Date().getTime()
   }

   cliente.emit( 'enviar-mensaje', payload, ( id )=> {
      console.log( id );
   } )

} )

cliente.on( 'Desde el server', ( payload ) => {
   console.log( payload );
} )