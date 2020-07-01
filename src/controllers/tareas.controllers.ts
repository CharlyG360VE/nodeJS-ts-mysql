import { Request, Response } from 'express';
//importar base de datos
import db from '../database';

class TareasController {
    //obtener tareas
    obtenerTareas ( req: Request, res: Response ): void {
        db.query( 'select * from tareas', ( err, tareas ) => {
            if ( err ) {
                return res.status(500).json({
                    message: 'Error en la base de datos',
                    error: err.sqlMessage,
                })
            } else if ( tareas.length === 0 ) {
                return res.status(400).json({
                    message: 'No se han encontrado tareas',
                })
            } else {
                return res.status(200).json({
                    message: 'Se han encontrado tareas',
                    tareas,
                });
            };
        } );
    };
    //obtener tareas por id
    obtenerTarea ( req: Request, res: Response ): void {
        const { id } = req.params;
        db.query( 'select tareas.name as "Tarea", usuarios.name as "usuario" from tareas inner join usuarios on usuarios.user_id = tareas.user_id where tareas.user_id = ?', 
        [ id ], ( err, tarea ) => {
            if ( err ) {
                return res.status(500).json({
                    message: 'Error en base de datos',
                    error: err.sqlMessage,
                })
            } else if ( tarea.length === 0 ) {
                return res.status(400).json({
                    message: 'No se ha encontrado ninguna tarea'
                });
            } else {
                return res.status(200).json({
                    message: 'Se han encontrado la siguientes tareas',
                    tarea,
                });
            };
        } )
    };
    //crear tareas
    crearTareas ( req: Request, res: Response ): void {
        db.query( 'insert into tareas set ?', [ req.body ], ( err ) => {
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
    //editar tareas
    editarTareas ( req: Request, res: Response ): void {
        const { id } = req.params;
        db.query( 'update tareas set ? where tarea_id = ?', [ req.body, id ], ( err ) => {
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
    //eliminar tareas
    eliminarTarea ( req: Request, res: Response ): any {
        const { id } = req.params;
        db.query( 'delete from tareas where tarea_id = ?', [ id ], ( err ) => {
            if (err) {
                return res.status(400).json({
                    message: 'Error en base de datos',
                    error: err.sqlMessage,
                });
            } else {
                return res.status(200).json({
                    message: 'Se ha eliminado correctamente la tarea',
                });
            };
        } );
    };

};

export const tareasController = new TareasController();