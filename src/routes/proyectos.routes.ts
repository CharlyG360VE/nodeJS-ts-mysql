import { Router } from 'express';
//importar controlador
import { proyectosController } from '../controllers/proyectos.controllers';

class ProyectosRoutes {

    router: Router = Router();

    constructor () {
        this.config();
    };

    config (): void {
        this.router.get( '/', proyectosController.obtenerProyectos );
        this.router.get( '/:id', proyectosController.obtenerProyecto );
        this.router.post( '/', proyectosController.crearProyectos );
        this.router.put( '/:id', proyectosController.editarProyectos );
        this.router.delete( '/:id', proyectosController.eliminarProyecto );
    };

};

export const proyectosRoutes = new ProyectosRoutes();