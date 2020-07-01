import { Request, Response } from 'express';
//importar base de datos
import db from '../database';

class UsuariosController {
    //obtener usuarios
    obtenerUsuarios ( req: Request, res: Response ): void {
        db.query( 'select * from usuarios', ( err, usuarios ) => {
            if ( err ) {
                return res.status(500).json({
                    message: 'Error en base de datos',
                    error: err,
                })
            } else if ( usuarios.length === 0 ) {
                return res.status(400).json({
                    message: 'No se han encontrado usuarios'
                });
            } else {
                return res.status(200).json({
                    message: 'Se han encontrado los siguientes usuarios',
                    usuarios,
                });
            };
        } );
    };
    //obtener usuario por id
    obtenerUsuario ( req: Request, res: Response ): void {
        const { id } = req.params;
        db.query( 'select * from usuarios where user_id = ?', [ id ], ( err, usuario ) => {
            if ( err ) {
                return res.status(500).json({
                    message: 'Error en base de datos',
                    error: err,
                })
            } else if ( usuario.length === 0 ) {
                return res.status(400).json({
                    message: 'No se ha encontrado ningun usuario'
                });
            } else {
                return res.status(200).json({
                    message: 'Se ha encontrado el siguiente usuario',
                    usuario,
                });
            };
        } );
    };
    //crear usuarios
    crearUsuarios ( req: Request, res: Response ): void {
        db.query( 'insert into usuarios set ?', [ req.body ], ( err ) => {
            if ( err ) {
                return res.status(400).json({
                    message: 'Error en base de datos',
                    error: err.sqlMessage,
                });
            } else {
                return res.status(201).json({
                    message: `${req.body.name} se ha creado satisfactoriamente`,
                });
            };
        } );
    };
    //editar usuarios
    editarUsuario ( req: Request, res: Response ): any {
        const { id } = req.params;
        db.query( 'update usuarios set ? where user_id = ?', [ req.body, id ], ( err ) => {
            if (err) {
                return res.status(400).json({
                    message: 'Error en base de datos',
                    error: err.sqlMessage,
                });
            } else {
                return res.status(200).json({
                    message: `${req.body.name} se ha actualizado satisfactoriamente`,
                });
            };
        } );
    };
    //eliminar usuarios
    eliminarUsuario ( req: Request, res: Response ): any {
        const { id } = req.params;
        db.query( 'delete from usuarios where user_id = ?', [ id ], ( err ) => {
            if (err) {
                return res.status(400).json({
                    message: 'Error en base de datos',
                    error: err.sqlMessage,
                });
            } else {
                return res.status(200).json({
                    message: 'Se ha eliminado correctamente el usuario',
                });
            };
        } );
    };

};

export const usuariosController = new UsuariosController();