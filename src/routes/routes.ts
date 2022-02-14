import {Request, Response, Router } from 'express'
import { Vehiculos, iTren, iAutobus } from '../model/vehiculos'
import { Trabajadores, iConductor, iMecanico, iTrabajador } from '../model/trabajadores'
import { db } from '../database/database'


let dSchemaTren: iTren = {
    matricula: null,
    numPlazas: null,
    fechaInicio: null,
    pagoTarjeta: null,
    trabajadores: null,
    tipoT: null,
    tipoTren: null,
    estaciones: null

}

let dSchemaAutobus: iAutobus = {
    matricula: null,
    numPlazas: null,
    fechaInicio: null,
    pagoTarjeta: null,
    trabajadores: null,
    tipoT: null,
    bano: null,
    numPlantas: null

}

let dSchemaConductor: iConductor = {
    DNI: null,
    nombre: null,
    apellidos: null,
    fechaNac: null,
    salHora: null,
    cargo: null,
    tipoT: null,
    licencias: null,
    incidencias: null
}

let dSchemaMecanico: iMecanico = {
    DNI: null,
    nombre: null,
    apellidos: null,
    fechaNac: null,
    salHora: null,
    cargo: null,
    especialidad: null,
    ubicacion: null,
    tipoT: null
}

class Routes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }



    // POST----------------------------------------------------

    // Recibe un documento equipo en el body con los campos indicados aquí 
    private postConductor = async (req: Request, res: Response) => {
        const { DNI, nombre, apellidos, fechaNac, salHora, cargo, tipoT, licencias, incidencias } = req.body
        await db.conectarBD()
        dSchemaConductor = {
            DNI: DNI,
            nombre: nombre,
            apellidos: apellidos,
            fechaNac: fechaNac,
            salHora: salHora,
            cargo: cargo,
            licencias: licencias,
            incidencias: incidencias,
            tipoT: tipoT
        }
        const oSchema = new Trabajadores(dSchemaConductor)
        await oSchema.save()
            .then( (doc: any) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }

    private postMecanico = async (req: Request, res: Response) => {
        const { DNI, nombre, apellidos, fechaNac, salHora, cargo, tipoT, especialidad, ubicacion } = req.body
        await db.conectarBD()
        dSchemaMecanico = {
            DNI: DNI,
            nombre: nombre,
            apellidos: apellidos,
            fechaNac: fechaNac,
            salHora: salHora,
            cargo: cargo,
            especialidad: especialidad,
            ubicacion: ubicacion,
            tipoT: tipoT
        }
        const oSchema = new Trabajadores(dSchemaMecanico)
        await oSchema.save()
            .then( (doc: any) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }

    // Recibe un documento en el body con los campos indicados aquí
    private postTren = async (req: Request, res: Response) => {
        const { matricula, numPlazas, fechaInicio, pagoTarjeta, trabajadores, tipoT, tipoTren, estaciones} = req.body
        await db.conectarBD()
            dSchemaTren = {
            matricula: matricula,
            numPlazas: numPlazas,
            fechaInicio: fechaInicio,
            pagoTarjeta: pagoTarjeta,
            trabajadores: trabajadores,
            tipoTren: tipoTren,
            estaciones: estaciones,
            tipoT: tipoT,
        }
        const oSchema = new Vehiculos(dSchemaTren)
        await oSchema.save()
            .then( (doc: any) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }

    private postAutobus = async (req: Request, res: Response) => {
        const { matricula, numPlazas, fechaInicio, pagoTarjeta, trabajadores, tipoT, bano, numPlantas} = req.body
        await db.conectarBD()
            dSchemaAutobus={
            matricula: matricula,
            numPlazas: numPlazas,
            fechaInicio: fechaInicio,
            pagoTarjeta: pagoTarjeta,
            trabajadores: trabajadores,
            bano: bano,
            numPlantas: numPlantas,
            tipoT: tipoT
        }
        const oSchema = new Vehiculos(dSchemaAutobus)
        await oSchema.save()
            .then( (doc: any) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }
    
    

    // GET---------------------------------------------------

    private getTrabajadores = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const j = await Trabajadores.find({})
            res.json(j)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }
    
    
    private getTrabajador = async (req:Request, res: Response) => {
        const DNI = req.params.DNI
        await db.conectarBD()
        .then( async ()=> {
            const j = await Trabajadores.findOne({ DNI: DNI })
            res.json(j)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private getMecanicos = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const j = await Trabajadores.find({ tipoT: "M" })
            res.json(j)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private getConductores = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const j = await Trabajadores.find({ tipoT: "C" })
            res.json(j)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private getVehiculos = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const j = await Vehiculos.find({})
            res.json(j)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private getTrenes = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const j = await Vehiculos.find({ tipoT: "T" })
            res.json(j)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private getAutobuses = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const j = await Vehiculos.find({ tipoT: "A" })
            res.json(j)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private getVehiculo = async (req:Request, res: Response) => {
        const matricula = req.params.matricula
        await db.conectarBD()
        .then( async ()=> {
            const j = await Vehiculos.findOne({ matricula: matricula })
            res.json(j)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }


// ACTUALIZACIONES--------------------------------------------------------

    private updateVehiculo = async (req: Request, res: Response) => {
        const { matricula } = req.params
        const {  tipoTransp, numPlazas, fechaInicio, conductores, trayecto,
                combustible, pagoT } = req.body
        await db.conectarBD()
        await Vehiculos.findOneAndUpdate({
            matricula: matricula
        },{
            tipoTransp: tipoTransp,
            numPlazas: numPlazas,
            fechaInicio: fechaInicio,
            conductores: conductores,
            trayecto: trayecto,
            combustible: combustible,
            pagoT: pagoT
        },{
            new: true, // para retornar el documento después de que se haya aplicado la modificación
            runValidators:true
        }
        )
            .then( (doc: any) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }

    private updateTren = async (req: Request, res: Response) => {
        const { matricula } = req.params
        const {  numPlazas, fechaInicio, pagoTarjeta, trabajadores,
            tipoT, tipoTren, estaciones } = req.body
        await db.conectarBD()
        await Vehiculos.findOneAndUpdate({
            matricula: matricula
        },{
            matricula: matricula,
            numPlazas: numPlazas,
            fechaInicio: fechaInicio,
            pagoTarjeta: pagoTarjeta,
            trabajadores: trabajadores,
            tipoT: tipoT,
            tipoTren: tipoTren,
            estaciones: estaciones
        },{
            new: true, // para retornar el documento después de que se haya aplicado la modificación
            runValidators:true
        }
        )
            .then( (doc: any) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }

    private updateAutobus = async (req: Request, res: Response) => {
        const  matricula  = req.params.matricula
        const { numPlazas, fechaInicio, pagoTarjeta, trabajadores,
                tipoT, bano, numPlantas } = req.body
        await db.conectarBD()
        await Vehiculos.findOneAndUpdate({
            matricula: matricula
        },{
            matricula: matricula,
            numPlazas: numPlazas,
            fechaInicio: fechaInicio,
            pagoTarjeta: pagoTarjeta,
            trabajadores: trabajadores,
            tipoT: tipoT,
            bano: bano,
            numPlantas: numPlantas
        },{
            new: true, // para retornar el documento después de que se haya aplicado la modificación
            runValidators:true
        }
        )
            .then( (doc: any) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }

    private updateTrabajador = async (req: Request, res: Response) => {
        const {DNI} =req.params
        const {  tipoT, nombre, apellidos, fechaNac, horasSem, salHora, especialidad, vehiculo } = req.body
        await db.conectarBD()
        await Vehiculos.findOneAndUpdate({
            DNI: DNI
        },{
            tipoT: tipoT,
            nombre: nombre,
            apellidos: apellidos,
            fechaNac: fechaNac,
            horasSem: horasSem,
            salHora: salHora,
            especialidad: especialidad,
            vehiculo: vehiculo
        },{
            new:true,
            runValidators:true
        }
        )
            .then( (doc: any) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }

    private updateConductor = async (req: Request, res: Response) => {
        const DNI = req.params.DNI
        const {  tipoT, nombre, apellidos, fechaNac, salHora, cargo, licencias, incidencias } = req.body
        await db.conectarBD()
        await Trabajadores.findOneAndUpdate({
            DNI: DNI
        },{
            DNI: DNI,
            nombre: nombre,
            apellidos: apellidos,
            fechaNac: fechaNac,
            salHora: salHora,
            cargo: cargo,
            licencias: licencias,
            incidencias: incidencias,
            tipoT: tipoT
        },{
            new:true,
            runValidators:true
        }
        )
            .then( (doc: any) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }

    private updateMecanico = async (req: Request, res: Response) => {
        const  DNI  = req.params.DNI
        const { nombre, apellidos, fechaNac, salHora, cargo, especialidad, ubicacion, tipoT } = req.body
        await db.conectarBD()
        await Trabajadores.findOneAndUpdate({
            DNI: DNI
        },{
            DNI: DNI,
            nombre: nombre,
            apellidos: apellidos,
            fechaNac: fechaNac,
            salHora: salHora,
            cargo: cargo,
            especialidad: especialidad,
            ubicacion: ubicacion,
            tipoT: tipoT
        },{
            new: true,
            runValidators:true
        }
        )
            .then( (doc: any) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }

// BORRADOS-------------------------------------------------------------------

    private deleteTrabajador = async (req: Request, res: Response) => {
        const { DNI } = req.params
        await db.conectarBD()
        await Trabajadores.findOneAndDelete(
                { DNI: DNI}
            )
            .then( (doc: any) => {
                    if (doc == null) {
                        res.send(`No encontrado`)
                    }else {
                        res.send('Borrado correcto: '+ doc)
                    }
            })
            .catch( (err: any) => res.send('Error: '+ err)) 
        db.desconectarBD()
    }

    private deleteVehiculo = async (req: Request, res: Response) => {
        const { matricula } = req.params
        await db.conectarBD()
        await Vehiculos.findOneAndDelete(
                { matricula: matricula}
            )
            .then( (doc: any) => {
                    if (doc == null) {
                        res.send(`No encontrado`)
                    }else {
                        res.send('Borrado correcto: '+ doc)
                    }
            })
            .catch( (err: any) => res.send('Error: '+ err)) 
        db.desconectarBD()
    }


    misRutas(){
       // POST
        this._router.post('/conductor', this.postConductor), 
        this._router.post('/mecanico', this.postMecanico),
        this._router.post('/tren', this.postTren),
        this._router.post('/autobus', this.postAutobus),
        // GET
        this._router.get('/vehiculos', this.getVehiculos),
        this._router.get('/trenes', this.getTrenes),
        this._router.get('/autobuses', this.getAutobuses),
        this._router.get('/trabajadores', this.getTrabajadores),
        this._router.get('/conductores', this.getConductores),
        this._router.get('/mecanicos', this.getMecanicos),
        this._router.get('/trabajador/:DNI', this.getTrabajador),
        this._router.get('/vehiculo/:matricula', this.getVehiculo),
        // PUT
        this._router.put('/updateVehiculo/:matricula', this.updateVehiculo),
        this._router.put('/updateTren/:matricula', this.updateTren),
        this._router.put('/updateAutobus/:matricula', this.updateAutobus),
        this._router.put('/updateTrabajador/:DNI', this.updateTrabajador),
        this._router.put('/updateConductor/:DNI', this.updateConductor),
        this._router.put('/updateMecanico/:DNI', this.updateMecanico),
        // DELETE
        this._router.delete('/deleteTrabajador/:DNI', this.deleteTrabajador),
        this._router.delete('/deleteVehiculo/:matricula', this.deleteVehiculo)
    }
}

const obj = new Routes()
obj.misRutas()
export const routes = obj.router