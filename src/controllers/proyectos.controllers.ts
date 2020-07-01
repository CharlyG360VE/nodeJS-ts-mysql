import { Request, Response } from 'express';
//importar base de datos
import db from '../database';

class ProyectosController {
    //obtener proyectos
    obtenerProyectos ( req: Request, res: Response ): void {
        db.query( 'select * from proyectos', ( err, proyectos ) => {
            if ( err ) {
                return res.status(500).json({
                    message: 'Error en la base de datos',
                    error: err.sqlMessage,
                })
            } else if ( proyectos.length === 0 ) {
                return res.status(400).json({
                    message: 'No se han encontrado proyectos',
                })
            } else {
                return res.status(200).json({
                    message: 'Se han encontrado proyectos',
                    proyectos,
                });
            };
        } );
    };
    //obtener proyectos por id
    obtenerProyecto ( req: Request, res: Response ): void {
        const { id } = req.params;
        db.query( 'select proyectos.name as "Proyectos", usuarios.name as "usuario" from proyectos inner join usuarios on usuarios.user_id = proyectos.user_id where proyectos.user_id = ?', 
        [ id ], 
        ( err, proyecto ) => {
            if ( err ) {
                return res.status(500).json({
                    message: 'Error en base de datos',
                    error: err.sqlMessage,
                })
            } else if ( proyecto.length === 0 ) {
                return res.status(400).json({
                    message: 'No se ha encontrado ningun proyecto'
                });
            } else {
                return res.status(200).json({
                    message: 'Se ha encontrado el siguiente proyecto',
                    proyecto,
                });
            };
        } )
    };
    //crear proyectos
    crearProyectos ( req: Request, res: Response ): void {
        db.query( 'insert into proyectos set ?', [ req.body ], ( err ) => {
            if ( err ) {
                return res.status(400).json({
                    message: 'Error en la base de datos',
                    error: err.sqlMessage,
                });
            } else {
                return res.status(201).json({
                    message: `${ req.body.name } creado satisfactoriamente`,
                });
            };
        } );
    };
    //editar proyectos
    editarProyectos ( req: Request, res: Response ): void {
        const { id } = req.params;
        db.query( 'update proyectos set ? where proyecto_id = ?', [ req.body, id ], ( err ) => {
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
        } )
    };
    //eliminar proyectos
    eliminarProyecto ( req: Request, res: Response ): any {
        const { id } = req.params;
        db.query( 'delete from proyectos where proyecto_id = ?', [ id ], ( err ) => {
            if (err) {
                return res.status(400).json({
                    message: 'Error en base de datos',
                    error: err.sqlMessage,
                });
            } else {
                return res.status(200).json({
                    message: 'Se ha eliminado correctamente el proyecto',
                });
            };
        } );
    };

};

export const proyectosController = new ProyectosController();