const path = require( 'path' )
const fs = require( 'fs' )

class Ticket {
   
   constructor( numero, escritorio ){
      this.numero = numero
      this.escritorio = escritorio
   }

}

class TicketControl {

   constructor(){
      this.ultimo  = 0;
      this.hoy     = new Date().getDate()
      this.tickets = []
      this.lasts4  = []

      this.init()

   }

   get toJson() {
      return {
         ultimo: this.ultimo,
         hoy: this.hoy,
         tickets: this.tickets,
         lasts4: this.lasts4
      }
   }

   get getPendientes() {
      return this.tickets
   }

   init(){
      const { ultimo, hoy, tickets, lasts4 } = require( '../db/data.json' )
      if( hoy === this.hoy ){
         this.tickets = tickets
         this.ultimo = ultimo
         this.lasts4 = lasts4
      } else {
         this.guardarDB()
      }
   }

   guardarDB(){
      const dbPath = path.join( __dirname, '../db/data.json' )
      fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) )
   }

   siguiente(){
      this.ultimo += 1
      const ticket = new Ticket( this.ultimo, null )
      this.tickets.push( ticket )
      
      this.guardarDB()
      return 'Ticket '+ ticket.numero
   }

   atenderTicket( escritorio ){
      if( this.tickets.length === 0 ) {
         return null
      }

      const ticket = this.tickets.shift()
      
      ticket.escritorio = escritorio;

      this.lasts4.unshift( ticket )

      if( this.lasts4.length > 4 ){
         this.lasts4.splice( -1, 1 )
      }

      this.guardarDB()

      return ticket
   }

}

module.exports = TicketControl