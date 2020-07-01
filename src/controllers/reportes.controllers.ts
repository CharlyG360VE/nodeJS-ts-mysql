import { Request, Response } from 'express';
//importar base de datos
import db from '../database';

class ReportesController {
    //obtener reporte de horas por id
    obtenerReporte ( req: Request, res: Response ): void {
        const { id } = req.params;
        db.query( 'select * from reportes where user_id = ?', [ id ], ( err, reporte ) => {
            if ( err ) {
                return res.status(500).json({
                    message: 'Error en base de datos',
                    error: err,
                })
            } else if ( reporte.length === 0 ) {
                return res.status(400).json({
                    message: 'No se ha encontrado ningun resultado'
                });
            } else {
                return res.status(200).json({
                    message: 'Se ha encontrado el siguiente resultado',
                    reporte,
                });
            };
        } )
    };
    //reporte horas de trabajo
    reporteHoras ( req: Request, res: Response ): void {
        const { user_id, hora } = req.body;
        const data = {
            user_id,
            fecha: new Date(),
            hora
        };

        const dataAct = {
            fecha: new Date(),
            hora
        };

        db.query( 'select * from reportes where user_id = ?', [ user_id ], ( err, reporte ) => {
            if ( err ) {
                return res.status(500).json({
                    message: 'Error en base de datos',
                    error: err.sqlMessage,
                });
            } else if ( reporte.length === 0 ) {
                db.query( 'insert into reportes set ?', [ data ], ( err ) => {
                    if ( err ) {
                        return res.status(400).json({
                            message: 'Error en base de datos',
                            error: err.sqlMessage,
                        });
                    } else {
                        return res.status(201).json({
                            message: 'Horas de trabajos reportadas correctamente',
                        });
                    };
                } )
            } else {
                db.query( 'update reportes set ? where user_id = ?', [ dataAct, user_id ], ( err ) => {
                    if (err) {
                        return res.status(400).json({
                            message: 'Error en base de datos',
                            error: err.sqlMessage,
                        });
                    } else {
                        return res.status(200).json({
                            message: 'Se ha realizado el reporte de horas trabajadas satisfactoriamente',
                        });
                    };
                } )
            }
        } )
    };

};

export const reportesController = new ReportesController();