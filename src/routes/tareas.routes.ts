import { Router } from 'express';
//importar controlador
import { tareasController } from '../controllers/tareas.controllers';

class TareasRoutes {

    router: Router = Router();

    constructor () {
        this.config();
    };

    config (): void {
        this.router.get( '/', tareasController.obtenerTareas );
        this.router.get( '/:id', tareasController.obtenerTarea );
        this.router.post( '/', tareasController.crearTareas );
        this.router.put( '/:id', tareasController.editarTareas );
        this.router.delete( '/:id', tareasController.eliminarTarea );
    };

};

export const tareasRoutes = new TareasRoutes();