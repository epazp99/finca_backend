import { Router, Request, Response } from 'express'
import moment = require('moment');
import { MoreThanOrEqual } from 'typeorm';
import { AppDataSource } from '../src/data-source'; 
import { ResultadosEconomicos } from '../src/entity/ResultadosEconomicos'; 
     
export class ResultadosEconomicosController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getCultivos = async (req: Request, res: Response) => {
               return res.status(200).send(await AppDataSource.manager.find(ResultadosEconomicos));
       
    }

    public addCultivos = async (req: Request, res: Response) => {
 
            console.log(req.body);
 
            const id = req.body.id; 
            const total = req.body.total;
            const idFinca = req.body.idFinca;
            const plan = req.body.plan;
            const real = req.body.real; 
            const fecha = req.body.fecha;  
            const incidencias = req.body.incidencias;
        
            if (await (await AppDataSource.manager.find(ResultadosEconomicos, { where: { id: id} })).length == 0) {
 
                        const user = new ResultadosEconomicos(); 
                        user.id = id;  
                        user.fecha = fecha;  
                        user.total = total;    
                        user.plan = plan;    
                        user.idFinca = idFinca;     
                        user.real = real;      
                        user.incidencias = incidencias;      

                        await AppDataSource.manager.save(ResultadosEconomicos, user);
                        return res.status(200).send({ message: 'Usuario agregado correctamente' });
      
            } else
                return res.status(400).send({ message: 'El usuario ya esta siendo usado' }); 
    }

    public deleteCultivos = async (req: Request, res: Response) => {
 
            const delet = await AppDataSource.manager.find(ResultadosEconomicos, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(ResultadosEconomicos, delet) }); 
    }

    public updateCultivos= async (req: Request, res: Response) => { 

        const body = req.body; 
        const id = req.body.id;
        const total = req.body.total;
        const idFinca = req.body.idFinca;
        const plan = req.body.plan;
        const real = req.body.real; 
        const fecha = req.body.fecha;  
        const incidencias = req.body.incidencias;
 
            await AppDataSource.manager.update(ResultadosEconomicos, req.params.id, { 
                id: id, 
                total: total,
                idFinca : idFinca,  
                plan : plan,   
                real : real,  
                fecha: fecha,
                incidencias: incidencias,  
            });
            return res.status(200).send({ message: 'usuario actualizado correctamente' }); 
    }

     
    public routes() {
        this.router.get('/resultados', this.getCultivos);
        this.router.delete('/resultados/:id', this.deleteCultivos);
        this.router.post('/resultados', this.addCultivos);
        this.router.put('/resultados/:id', this.updateCultivos); 
    }
}
