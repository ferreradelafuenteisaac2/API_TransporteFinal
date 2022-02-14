"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const vehiculos_1 = require("../model/vehiculos");
const trabajadores_1 = require("../model/trabajadores");
const database_1 = require("../database/database");
let dSchemaTren = {
    matricula: null,
    numPlazas: null,
    fechaInicio: null,
    pagoTarjeta: null,
    trabajadores: null,
    tipoT: null,
    tipoTren: null,
    estaciones: null
};
let dSchemaAutobus = {
    matricula: null,
    numPlazas: null,
    fechaInicio: null,
    pagoTarjeta: null,
    trabajadores: null,
    tipoT: null,
    bano: null,
    numPlantas: null
};
let dSchemaConductor = {
    DNI: null,
    nombre: null,
    apellidos: null,
    fechaNac: null,
    salHora: null,
    cargo: null,
    tipoT: null,
    licencias: null,
    incidencias: null
};
let dSchemaMecanico = {
    DNI: null,
    nombre: null,
    apellidos: null,
    fechaNac: null,
    salHora: null,
    cargo: null,
    especialidad: null,
    ubicacion: null,
    tipoT: null
};
class Routes {
    constructor() {
        // POST----------------------------------------------------
        // Recibe un documento equipo en el body con los campos indicados aquí 
        this.postConductor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { DNI, nombre, apellidos, fechaNac, salHora, cargo, tipoT, licencias, incidencias } = req.body;
            yield database_1.db.conectarBD();
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
            };
            const oSchema = new trabajadores_1.Trabajadores(dSchemaConductor);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.postMecanico = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { DNI, nombre, apellidos, fechaNac, salHora, cargo, tipoT, especialidad, ubicacion } = req.body;
            yield database_1.db.conectarBD();
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
            };
            const oSchema = new trabajadores_1.Trabajadores(dSchemaMecanico);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        // Recibe un documento en el body con los campos indicados aquí
        this.postTren = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { matricula, numPlazas, fechaInicio, pagoTarjeta, trabajadores, tipoT, tipoTren, estaciones } = req.body;
            yield database_1.db.conectarBD();
            dSchemaTren = {
                matricula: matricula,
                numPlazas: numPlazas,
                fechaInicio: fechaInicio,
                pagoTarjeta: pagoTarjeta,
                trabajadores: trabajadores,
                tipoTren: tipoTren,
                estaciones: estaciones,
                tipoT: tipoT,
            };
            const oSchema = new vehiculos_1.Vehiculos(dSchemaTren);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.postAutobus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { matricula, numPlazas, fechaInicio, pagoTarjeta, trabajadores, tipoT, bano, numPlantas } = req.body;
            yield database_1.db.conectarBD();
            dSchemaAutobus = {
                matricula: matricula,
                numPlazas: numPlazas,
                fechaInicio: fechaInicio,
                pagoTarjeta: pagoTarjeta,
                trabajadores: trabajadores,
                bano: bano,
                numPlantas: numPlantas,
                tipoT: tipoT
            };
            const oSchema = new vehiculos_1.Vehiculos(dSchemaAutobus);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        // GET---------------------------------------------------
        this.getTrabajadores = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const j = yield trabajadores_1.Trabajadores.find({});
                res.json(j);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getTrabajador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const DNI = req.params.DNI;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const j = yield trabajadores_1.Trabajadores.findOne({ DNI: DNI });
                res.json(j);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getMecanicos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const j = yield trabajadores_1.Trabajadores.find({ tipoT: "M" });
                res.json(j);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getConductores = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const j = yield trabajadores_1.Trabajadores.find({ tipoT: "C" });
                res.json(j);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getVehiculos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const j = yield vehiculos_1.Vehiculos.find({});
                res.json(j);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getTrenes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const j = yield vehiculos_1.Vehiculos.find({ tipoT: "T" });
                res.json(j);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getAutobuses = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const j = yield vehiculos_1.Vehiculos.find({ tipoT: "A" });
                res.json(j);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getVehiculo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const matricula = req.params.matricula;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const j = yield vehiculos_1.Vehiculos.findOne({ matricula: matricula });
                res.json(j);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        // ACTUALIZACIONES--------------------------------------------------------
        this.updateVehiculo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { matricula } = req.params;
            const { tipoTransp, numPlazas, fechaInicio, conductores, trayecto, combustible, pagoT } = req.body;
            yield database_1.db.conectarBD();
            yield vehiculos_1.Vehiculos.findOneAndUpdate({
                matricula: matricula
            }, {
                tipoTransp: tipoTransp,
                numPlazas: numPlazas,
                fechaInicio: fechaInicio,
                conductores: conductores,
                trayecto: trayecto,
                combustible: combustible,
                pagoT: pagoT
            }, {
                new: true,
                runValidators: true
            })
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.updateTren = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { matricula } = req.params;
            const { numPlazas, fechaInicio, pagoTarjeta, trabajadores, tipoT, tipoTren, estaciones } = req.body;
            yield database_1.db.conectarBD();
            yield vehiculos_1.Vehiculos.findOneAndUpdate({
                matricula: matricula
            }, {
                matricula: matricula,
                numPlazas: numPlazas,
                fechaInicio: fechaInicio,
                pagoTarjeta: pagoTarjeta,
                trabajadores: trabajadores,
                tipoT: tipoT,
                tipoTren: tipoTren,
                estaciones: estaciones
            }, {
                new: true,
                runValidators: true
            })
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.updateAutobus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const matricula = req.params.matricula;
            const { numPlazas, fechaInicio, pagoTarjeta, trabajadores, tipoT, bano, numPlantas } = req.body;
            yield database_1.db.conectarBD();
            yield vehiculos_1.Vehiculos.findOneAndUpdate({
                matricula: matricula
            }, {
                matricula: matricula,
                numPlazas: numPlazas,
                fechaInicio: fechaInicio,
                pagoTarjeta: pagoTarjeta,
                trabajadores: trabajadores,
                tipoT: tipoT,
                bano: bano,
                numPlantas: numPlantas
            }, {
                new: true,
                runValidators: true
            })
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.updateTrabajador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { DNI } = req.params;
            const { tipoT, nombre, apellidos, fechaNac, horasSem, salHora, especialidad, vehiculo } = req.body;
            yield database_1.db.conectarBD();
            yield vehiculos_1.Vehiculos.findOneAndUpdate({
                DNI: DNI
            }, {
                tipoT: tipoT,
                nombre: nombre,
                apellidos: apellidos,
                fechaNac: fechaNac,
                horasSem: horasSem,
                salHora: salHora,
                especialidad: especialidad,
                vehiculo: vehiculo
            }, {
                new: true,
                runValidators: true
            })
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.updateConductor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const DNI = req.params.DNI;
            const { tipoT, nombre, apellidos, fechaNac, salHora, cargo, licencias, incidencias } = req.body;
            yield database_1.db.conectarBD();
            yield trabajadores_1.Trabajadores.findOneAndUpdate({
                DNI: DNI
            }, {
                DNI: DNI,
                nombre: nombre,
                apellidos: apellidos,
                fechaNac: fechaNac,
                salHora: salHora,
                cargo: cargo,
                licencias: licencias,
                incidencias: incidencias,
                tipoT: tipoT
            }, {
                new: true,
                runValidators: true
            })
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.updateMecanico = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const DNI = req.params.DNI;
            const { nombre, apellidos, fechaNac, salHora, cargo, especialidad, ubicacion, tipoT } = req.body;
            yield database_1.db.conectarBD();
            yield trabajadores_1.Trabajadores.findOneAndUpdate({
                DNI: DNI
            }, {
                DNI: DNI,
                nombre: nombre,
                apellidos: apellidos,
                fechaNac: fechaNac,
                salHora: salHora,
                cargo: cargo,
                especialidad: especialidad,
                ubicacion: ubicacion,
                tipoT: tipoT
            }, {
                new: true,
                runValidators: true
            })
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        // BORRADOS-------------------------------------------------------------------
        this.deleteTrabajador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { DNI } = req.params;
            yield database_1.db.conectarBD();
            yield trabajadores_1.Trabajadores.findOneAndDelete({ DNI: DNI })
                .then((doc) => {
                if (doc == null) {
                    res.send(`No encontrado`);
                }
                else {
                    res.send('Borrado correcto: ' + doc);
                }
            })
                .catch((err) => res.send('Error: ' + err));
            database_1.db.desconectarBD();
        });
        this.deleteVehiculo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { matricula } = req.params;
            yield database_1.db.conectarBD();
            yield vehiculos_1.Vehiculos.findOneAndDelete({ matricula: matricula })
                .then((doc) => {
                if (doc == null) {
                    res.send(`No encontrado`);
                }
                else {
                    res.send('Borrado correcto: ' + doc);
                }
            })
                .catch((err) => res.send('Error: ' + err));
            database_1.db.desconectarBD();
        });
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    misRutas() {
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
            this._router.delete('/deleteVehiculo/:matricula', this.deleteVehiculo);
    }
}
const obj = new Routes();
obj.misRutas();
exports.routes = obj.router;
