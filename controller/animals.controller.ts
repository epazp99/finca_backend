import { Router, Request, Response } from 'express'
import moment = require('moment');
import { MoreThanOrEqual } from 'typeorm';
import { AppDataSource } from '../src/data-source'; 
import { Animals } from '../src/entity/Animals'; 
    
 
export class AnimalsController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getAnimals = async (req: Request, res: Response) => {
 
            return res.status(200).send(await AppDataSource.manager.find(Animals)); 
    }

    public addAnimals = async (req: Request, res: Response) => {
 
            console.log(req.body);
 
            const nombre = req.body.name;  
            const especie = req.body.especie;
            const category = req.body.category;
            const mes = req.body.mes;
            const anno = req.body.anno; 
            const bajas = req.body.bajas;
            const altas = req.body.altas; 
 
         
            if (await (await AppDataSource.manager.find(Animals, { where: { name: nombre} })).length == 0) {
             
                        const user = new Animals(); 
                        user.especie = especie;     
                        user.category = category;   
                        user.mes = mes;   
                        user.anno = anno;    
                        user.bajas = bajas;   
                        user.altas = altas;     

                        await AppDataSource.manager.save(Animals, user);
                        return res.status(200).send({ message: 'Usuario agregado correctamente' });
          
            } else
                return res.status(400).send({ message: 'El usuario ya esta siendo usado' });
 
    }

    public deleteAnimals = async (req: Request, res: Response) => {
 
            const delet = await AppDataSource.manager.find(Animals, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(Animals, delet) });
 
    }

    public updateAnimals = async (req: Request, res: Response) => { 

        const body = req.body; 
        const nombre = body.name;  
        const especie = req.body.especie;
        const category = req.body.category;
        const mes = req.body.mes;
        const anno = req.body.anno; 
        const bajas = req.body.bajas;
        const altas = req.body.altas; 

            await AppDataSource.manager.update(Animals, req.params.id, { 
                name: nombre, 
                especie: especie, 
                category:category,   
                mes: mes,   
                anno : anno,    
                bajas :bajas,   
                altas: altas  
            });
            return res.status(200).send({ message: 'usuario actualizado correctamente' }); 
    }
 
    public routes() {
        this.router.get('/animals', this.getAnimals);
        this.router.delete('/animals/:id', this.deleteAnimals);
        this.router.post('/animals', this.addAnimals);
        this.router.put('/animals/:id', this.updateAnimals); 
    }
}
