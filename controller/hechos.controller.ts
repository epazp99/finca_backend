import { Router, Request, Response } from 'express'
import moment = require('moment');
import { MoreThanOrEqual } from 'typeorm';
import { AppDataSource } from '../src/data-source'; 
import { HechosD } from '../src/entity/HechosD'; 
     
export class HechosDController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getCultivos = async (req: Request, res: Response) => {
               return res.status(200).send(await AppDataSource.manager.find(HechosD));
       
    }

    public addCultivos = async (req: Request, res: Response) => {
 
            console.log(req.body);
 
            const id = req.body.id; 
            const area = req.body.area;
            const idFinca = req.body.idFinca;
            const afectaciones = req.body.afectaciones;
            const nombre = req.body.nombre; 
            const fecha = req.body.fecha;  
        
            if (await (await AppDataSource.manager.find(HechosD, { where: { id: id} })).length == 0) {
 
                        const user = new HechosD(); 
                        user.id = id;  
                        user.fecha = fecha;  
                        user.nombre = nombre;    
                        user.afectaciones = afectaciones;    
                        user.idFinca = idFinca;     
                        user.area = area;      

                        await AppDataSource.manager.save(HechosD, user);
                        return res.status(200).send({ message: 'Usuario agregado correctamente' });
      
            } else
                return res.status(400).send({ message: 'El usuario ya esta siendo usado' }); 
    }

    public deleteCultivos = async (req: Request, res: Response) => {
 
            const delet = await AppDataSource.manager.find(HechosD, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(HechosD, delet) }); 
    }

    public updateCultivos= async (req: Request, res: Response) => { 

        const body = req.body; 
        const id = body.id; 
        const area = req.body.area;
        const idFinca = req.body.idFinca;
        const afectaciones = req.body.afectaciones;
        const nombre = req.body.nombre; 
        const fecha = req.body.fecha;  
 
            await AppDataSource.manager.update(HechosD, req.params.id, { 
                id: id, 
                area: area,
                idFinca : idFinca,  
                afectaciones : afectaciones,   
                nombre : nombre,  
                fecha: fecha,  
            });
            return res.status(200).send({ message: 'usuario actualizado correctamente' }); 
    }

     
    public routes() {
        this.router.get('/hechos', this.getCultivos);
        this.router.delete('/hechos/:id', this.deleteCultivos);
        this.router.post('/hechos', this.addCultivos);
        this.router.put('/hechos/:id', this.updateCultivos); 
    }
}
