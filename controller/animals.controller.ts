import { Router, Request, Response } from 'express'
import moment = require('moment');
import { MoreThanOrEqual } from 'typeorm';
import { AppDataSource } from '../src/data-source'; 
import { Animals } from '../src/entity/Animals'; 
    

const bcrypt = require("bcrypt");

export class AnimalsController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getAnimals = async (req: Request, res: Response) => {
        // const token = req.query.token;
        // const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
        // if (valid.length > 0) {
            return res.status(200).send(await AppDataSource.manager.find(Animals));
       // }
     //   return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public addAnimals = async (req: Request, res: Response) => {
    //    const token = req.query.token;

     //   const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
     //   if (valid.length > 0) {
            console.log(req.body);
 
            const nombre = req.body.nombre; 
         
            if (await (await AppDataSource.manager.find(Animals, { where: { name: nombre} })).length == 0) {
              //  bcrypt.hash(password, 10, async (err, encrypted) => {
                 //   if (err) {
                //        return res.status(500).send({ message: 'En estos momentos no se puede por favor intentelo mas tarde' });
                 //   } else {
                        const user = new Animals(); 
                        user.name = nombre;   
                        await AppDataSource.manager.save(Animals, user);
                        return res.status(200).send({ message: 'Usuario agregado correctamente' });
                //    }
           //     });
            } else
                return res.status(400).send({ message: 'El usuario ya esta siendo usado' });
    //    } else
   //         return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public deleteAnimals = async (req: Request, res: Response) => {
  //      const token = req.query.token;
   //     const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
   //     if (valid.length > 0) {
            const delet = await AppDataSource.manager.find(Animals, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(Animals, delet) });
    //    }
   //     return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public updateAnimals = async (req: Request, res: Response) => {
     //   const token = req.query.token;

        const body = req.body;
        const usuario = body.usuario;
        const nombre = body.nombre; 
      //  const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
      //  if (valid.length > 0) {
            await AppDataSource.manager.update(Animals, req.params.id, { 
                name: nombre, 
            });
            return res.status(200).send({ message: 'usuario actualizado correctamente' });
    //    }
      //  return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    // public cambiarPass = async (req: Request, res: Response) => {
    //     console.log('dasd');

    //     const token = req.query.token;

    //     const body = req.body;
    //     const id = body.id;
    //     const password = body.password;

    //     const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
    //     if (valid.length > 0) {
    //         bcrypt.hash(password, 10, async (err, encrypted) => {
    //             if (err) {
    //                 return res.status(500).send({ message: 'En estos momentos no se puede por favor intentelo mas tarde' });
    //             } else {
    //                 await AppDataSource.manager.update(Usuario, id, {
    //                     password: encrypted
    //                 });
    //                 return res.status(200).send({ message: 'contraseña cambiada correctamente' });

    //             }
    //         });
    //     } else
    //         return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    // }

    // public notificaciones = async (req: Request, res: Response) => {
    //     const token = req.query.token;
    //     const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
    //     if (valid.length > 0) {
    //         const id = req.query.id;
    //         const notificaciones = await AppDataSource.manager.find(VideoConferencia,
    //             {
    //                 relations: ["encargado", "tecnico_respaldo", "citado_por", "sindicato"],
    //                 where: {fecha: MoreThanOrEqual(new Date()), estado: 1}
    //             });
    //             // console.log('id=>',id);
                
    //             // console.log(notificaciones.filter(e=>e.encargado.id == id || e.tecnico_respaldo.id==id || e.citado_por.id == id));
                
    //         return res.status(200).send(notificaciones.filter(e=>e.encargado.id == id || e.tecnico_respaldo.id==id || e.citado_por.id == id));
    //     } else
    //         return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    // }

    public routes() {
        this.router.get('/animals', this.getAnimals);
        this.router.delete('/animals/:id', this.deleteAnimals);
        this.router.post('/animals', this.addAnimals);
        this.router.put('/animals/:id', this.updateAnimals); 
    }
}
