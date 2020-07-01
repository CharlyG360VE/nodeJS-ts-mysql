import { Router } from 'express';
//importar controlador
import { usuariosController } from '../controllers/usuarios.controllers';

class UsuariosRoutes {

    router: Router = Router();

    constructor () {
        this.config();
    };

    config (): void {
        this.router.get( '/', usuariosController.obtenerUsuarios );
        this.router.get( '/:id', usuariosController.obtenerUsuario );
        this.router.post( '/', usuariosController.crearUsuarios );
        this.router.put( '/:id', usuariosController.editarUsuario );
        this.router.delete( '/:id', usuariosController.eliminarUsuario );
    };

};

export const usuariosRoutes = new UsuariosRoutes();