import { Router } from 'express';
//importar controlador
import { reportesController } from '../controllers/reportes.controllers';

class ReportesRoutes {

    router: Router = Router();

    constructor () {
        this.config();
    };

    config (): void {
        this.router.get( '/:id', reportesController.obtenerReporte );
        this.router.post( '/', reportesController.reporteHoras );
    };

};

export const reportesRoutes = new ReportesRoutes();