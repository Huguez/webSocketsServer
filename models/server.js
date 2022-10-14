const express = require( 'express' )
const cors = require( 'cors' )
const { socketController } = require('../sockets/controller')

// const { dbConnect } = require( '../databases/config' )

class Server {

   constructor(){
      this.app    = express()
      this.port   = process.env.PORT
      this.server = require( 'http' ).createServer( this.app )
      this.io     = require( 'socket.io' )( this.server )


      // this.base = '/api'
      // this.paths = {
      //    userPath:     `${ this.base }/usuarios`,
      //    authPath:     `${ this.base }/auth`,
      //    categoryPath: `${ this.base }/categorias`,
      //    productPath:  `${ this.base }/productos`,
      //    searchtPath:  `${ this.base }/search`,
      //    uploadPath:   `${ this.base }/uploads`
      // }

      // this.conectarDB()

      this.middlewares()

      // this.routes()
      this.sockets()

   }

   // async conectarDB(){
   //    await dbConnect()
   // }

   middlewares() {
      // directorio publico
      this.app.use( express.static( 'public' ) )

      // CORS
      this.app.use( cors() )

      // parseo del body
      // this.app.use( express.json() );

      // // file manage
      // this.app.use( fileUpload({
      //    useTempFiles : true,
      //    tempFileDir : '/tmp/',
      //    createParentPath: true,
      // }) )
   }


   routes() {
      // this.app.use( this.paths["userPath"],     require( '../routes/user' ) )
      // this.app.use( this.paths["authPath"],     require( '../routes/auth' ) )
      // this.app.use( this.paths["categoryPath"], require( '../routes/category' ) )
      // this.app.use( this.paths["productPath"],  require( '../routes/producto' ) )
      // this.app.use( this.paths["searchtPath"],  require( '../routes/buscar' ) )
      // this.app.use( this.paths["uploadPath"],   require( '../routes/upload' ) )
   }

   sockets(){
      this.io.on( 'connection', socketController );
   }

   start(){
      this.server.listen( this.port, () => {
         console.log(`Server running in ${ this.port }`);
         console.log(`Go to http://localhost:${ this.port }/` );
      } );
   }
}

module.exports = Server