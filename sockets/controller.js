const Ticket = require( '../models/ticket' )

const tc = new Ticket()

const socketController = ( socket ) => {
   
   socket.emit( 'ultimo-ticket', tc.ultimo )
   socket.emit( 'last4', tc.lasts4 )
   socket.emit( 'pendientes', tc.getPendientes )
   socket.on('siguiente-ticket', ( payload, callback ) => {
      
      const next = tc.siguiente()
      callback( next )
   })

   socket.on( 'atender-ticket', ( { escritorio }, callback ) => {
      
      if( !escritorio ){
         return callback( {
            ok: false,
            msg: "El escritorio es obligatorio"
         } )
      }

      const ticket = tc.atenderTicket( escritorio )
      
      socket.broadcast.emit( 'last4', tc.lasts4 )
      socket.broadcast.emit( 'pendientes', ticket )

      if( !ticket ) {
         return callback( {
            ok: false,
            msg: "ya no hay tickets"
         } )
      } else {
         return callback( { ok: true, ticket } )
      }
      
   } )

}

module.exports = {
   socketController
}