import { Router, Request, Response } from 'express'
import moment = require('moment');
import { MoreThanOrEqual } from 'typeorm';
import { AppDataSource } from '../src/data-source'; 
import { Provincia } from '../src/entity/Provincia'; 
     
export class ProvinciaController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getProvincia = async (req: Request, res: Response) => {
 
            return res.status(200).send(await AppDataSource.manager.find(Provincia));
     
    }

    public addProvincia = async (req: Request, res: Response) => {
 
            console.log(req.body);
 
            const nombre = req.body.name; 
         
            if (await (await AppDataSource.manager.find(Provincia, { where: { name: nombre} })).length == 0) {
          
                        const provincia = new Provincia(); 
                        provincia.name = nombre;   
                        await AppDataSource.manager.save(Provincia, provincia);
                        return res.status(200).send({ message: 'Usuario agregado correctamente' });
 
            } else
                return res.status(400).send({ message: 'El usuario ya esta siendo usado' }); 
    }

    public deleteProvincia = async (req: Request, res: Response) => {
 
            const delet = await AppDataSource.manager.find(Provincia, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(Provincia, delet) }); 
    }

    public updateProvincia = async (req: Request, res: Response) => {
 
        const body = req.body; 
        const nombre = body.name;  
            await AppDataSource.manager.update(Provincia, req.params.id, { 
                name: nombre, 
            });
            return res.status(200).send({ message: 'usuario actualizado correctamente' }); 
    }

  
    public routes() {
        this.router.get('/provincia', this.getProvincia);
        this.router.delete('/provincia/:id', this.deleteProvincia);
        this.router.post('/provincia', this.addProvincia);
        this.router.put('/provincia/:id', this.updateProvincia); 
    }
}