

const socketController = ( socket ) => {
         
   socket.on( 'disconnect', ( ) => {
      console.log( "Socket: ", socket.id );
   } )

   socket.on( 'enviar-mensaje', ( payload, callback ) => {
      
      const id = '123456789'
      callback( {id, fecha: new Date().getTime() } )
      
      socket.broadcast.emit( 'Desde el server', payload )

   } );

}

module.exports = {
   socketController
}