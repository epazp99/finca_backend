import { Router, Request, Response } from 'express'
import moment = require('moment');
import { MoreThanOrEqual } from 'typeorm';
import { AppDataSource } from '../src/data-source'; 
import { Cultivos } from '../src/entity/Cultivos'; 
     
export class CultivosController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getCultivos = async (req: Request, res: Response) => {
               return res.status(200).send(await AppDataSource.manager.find(Cultivos));
       
    }

    public addCultivos = async (req: Request, res: Response) => {
 
            console.log(req.body);
 
            const nombre = req.body.name; 
            const finca = req.body.finca;
            const plan = req.body.plan;
            const tipo = req.body.tipo;
            const mes = req.body.mes;
            const anno = req.body.anno;
            const um = req.body.um;
            const centroElaboracion = req.body.centroElaboracion;
            const toDate = req.body.toDate;
            const real = req.body.real;
            const porcent = req.body.porcent;
            const planCampanna = req.body.planCampanna;
            const acumulado = req.body.acumulado;
            const areaExistencia = req.body.areaExistencia;
            const tierraMov = req.body.tierraMov;
            const tierraLista = req.body.tierraLista;
        
            if (await (await AppDataSource.manager.find(Cultivos, { where: { name: nombre} })).length == 0) {
 
                        const user = new Cultivos(); 
                        user.name = nombre;  
                        user.finca = finca;  
                        user.tipo = tipo;  
                        user.mes = mes;  
                        user.anno = anno;  
                        user.um = um;  
                        user.centroElaboracion = centroElaboracion;  
                        user.toDate = toDate;  
                        user.real = real;  
                        user.porcent = porcent;  
                        user.planCampanna = planCampanna;  
                        user.acumulado = acumulado;  
                        user.areaExistencia = areaExistencia;   
                        user.tierraLista = tierraLista;   
                        user.tierraMov = tierraMov;   

                        await AppDataSource.manager.save(Cultivos, user);
                        return res.status(200).send({ message: 'Usuario agregado correctamente' });
      
            } else
                return res.status(400).send({ message: 'El usuario ya esta siendo usado' }); 
    }

    public deleteCultivos = async (req: Request, res: Response) => {
 
            const delet = await AppDataSource.manager.find(Cultivos, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(Cultivos, delet) }); 
    }

    public updateCultivos= async (req: Request, res: Response) => { 

        const body = req.body; 
        const nombre = body.name; 
        const finca = req.body.finca;
        const plan = req.body.plan;
        const tipo = req.body.tipo;
        const mes = req.body.mes;
        const anno = req.body.anno;
        const um = req.body.um;
        const centroElaboracion = req.body.centroElaboracion;
        const toDate = req.body.toDate;
        const real = req.body.real;
        const porcent = req.body.porcent;
        const planCampanna = req.body.planCampanna;
        const acumulado = req.body.acumulado;
        const areaExistencia = req.body.areaExistencia;
        const tierraMov = req.body.tierraMov;
        const tierraLista = req.body.tierraLista;
 
            await AppDataSource.manager.update(Cultivos, req.params.id, { 
                name: nombre, 
                finca: finca,
                tipo : tipo,
                mes : mes,  
                anno : anno,  
                um : um,  
                centroElaboracion :centroElaboracion,  
                toDate : toDate,  
                real : real,  
                porcent : porcent,  
                planCampanna: planCampanna, 
                acumulado: acumulado,  
                areaExistencia : areaExistencia,  
                tierraLista: tierraLista, 
                tierraMov : tierraMov  
            });
            return res.status(200).send({ message: 'usuario actualizado correctamente' }); 
    }

     
    public routes() {
        this.router.get('/cultivos', this.getCultivos);
        this.router.delete('/cultivos/:id', this.deleteCultivos);
        this.router.post('/cultivos', this.addCultivos);
        this.router.put('/cultivos/:id', this.updateCultivos); 
    }
}
