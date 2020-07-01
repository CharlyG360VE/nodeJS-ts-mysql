import express, { Application } from 'express';
import db from './database';
import morgan from 'morgan';

//import routes
import { usuariosRoutes } from './routes/usuarios.routes';
import { appRoutes } from './routes/app.routes';
import { proyectosRoutes } from './routes/proyectos.routes';
import { tareasRoutes } from './routes/tareas.routes';
import { reportesRoutes } from './routes/reportes.routes';

class Server {
    //variables;
    app: Application;
    db: any;

    constructor ( ) {
        this.app = express();
        this.config();
        this.routes();
        this.db = db.getConnection( ( err, connect ) => {
            if ( err ) console.log( err );
            if ( connect ) console.log( 'mySQL database connected' );
        } );
    };
    //server config
    config (): void {
        this.app.set( 'port', process.env.PORT || 3000 );
        this.app.use( morgan( 'dev' ) );
        this.app.use( express.json() );
        this.app.use( express.urlencoded( { extended: false } ) )
    };
    //server routes
    routes (): void {
        this.app.use( '/usuarios', usuariosRoutes.router );
        this.app.use( '/proyectos', proyectosRoutes.router );
        this.app.use( '/tareas', tareasRoutes.router );
        this.app.use( '/reportes', reportesRoutes.router );
        this.app.use( '/', appRoutes.router );
    };
    //server listening
    start (): void {
        this.app.listen( this.app.get( 'port' ), () => console.log( `Server listening on port: ${ this.app.get( 'port' ) }` ) )
    };

};

const server = new Server();

server.start();