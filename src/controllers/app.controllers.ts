import { Request, Response } from 'express';
//importar base de datos
import db from '../database';

class AppController {

    principal ( req: Request, res: Response ) {
        return res.status(200).json({
            message: 'Servidor iniciado correctamente',
        });
    };

};

export const appController = new AppController();