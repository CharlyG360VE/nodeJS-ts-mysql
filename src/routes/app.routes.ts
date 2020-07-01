import { Router } from 'express';
//importar controlador
import { appController } from '../controllers/app.controllers';

class AppRoutes {

    router: Router = Router();

    constructor () {
        this.config();
    };

    config (): void {
        this.router.get( '/', appController.principal );
    };

};

export const appRoutes = new AppRoutes();