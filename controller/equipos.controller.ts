import { Router, Request, Response } from 'express'
import moment = require('moment');
import { MoreThanOrEqual } from 'typeorm';
import { AppDataSource } from '../src/data-source'; 
import { EquiposYmedios } from '../src/entity/EquiposYmedios'; 
    
 
export class EquiposController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getEquipos = async (req: Request, res: Response) => {
 
            return res.status(200).send(await AppDataSource.manager.find(EquiposYmedios));
 
    }

    public addEquipos = async (req: Request, res: Response) => {
 
            console.log(req.body);
 
            const nombre = req.body.name;
            const finca = req.body.finca;
            const provincia = req.body.provincia;
            const parque = req.body.parque;
            const mes = req.body.mes;
            const anno = req.body.anno;
            const activos = req.body.activos;
            const incidencias = req.body.incidencias;
             

         
            if (await (await AppDataSource.manager.find(EquiposYmedios, { where: { name: nombre} })).length == 0) {
   
                        const user = new EquiposYmedios(); 
                        user.name = nombre; 
                        user.finca = finca; 
                        user.provincia = provincia; 
                        user.parque = parque; 
                        user.mes = mes; 
                        user.anno = anno; 
                        user.activos = activos;   
                        user.incidencias = incidencias;

                        await AppDataSource.manager.save(EquiposYmedios, user);
                        return res.status(200).send({ message: 'Equipo agregado correctamente' });
   
            } else
                return res.status(400).send({ message: 'El usuario ya esta siendo usado' });
 
    }

    public deleteEquipos = async (req: Request, res: Response) => {
 
            const delet = await AppDataSource.manager.find(EquiposYmedios, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(EquiposYmedios, delet) });
 
    }

    public updateEquipos = async (req: Request, res: Response) => {
 
        const body = req.body; 
        const nombre = body.name; 
        const finca = req.body.finca;
        const provincia = req.body.provincia;
        const parque = req.body.parque;
        const mes = req.body.mes;
        const anno = req.body.anno;
        const activos = req.body.activos;
        const incidencias = req.body.incidencias;

 
            await AppDataSource.manager.update(EquiposYmedios, req.params.id, { 
                name: nombre, 
                finca: finca,
                provincia: provincia, 
                parque: parque, 
                mes: mes,
                anno: anno, 
                activos: activos,   
                incidencias: incidencias
            });
            return res.status(200).send({ message: 'usuario actualizado correctamente' });
 
    }
 

    public routes() {
        this.router.get('/equipos', this.getEquipos);
        this.router.delete('/equipos/:id', this.deleteEquipos);
        this.router.post('/equipos', this.addEquipos);
        this.router.put('/equipos/:id', this.updateEquipos); 
    }
}
