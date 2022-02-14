"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conductor = void 0;
const trabajador_1 = require("./trabajador");
class Conductor extends trabajador_1.Trabajador {
    constructor(DNI, nombre, apellidos, fechaNac, salHora, cargo, licencias, incidencias) {
        super(DNI, nombre, apellidos, fechaNac, salHora, cargo);
        this._licencias = licencias;
        this._incidencias = incidencias;
    }
    get licencias() {
        return this._licencias;
    }
    set licencias(licencias) {
        this._licencias = licencias;
    }
    get incidencias() {
        return this._incidencias;
    }
    set incidencias(incidencias) {
        this._incidencias = incidencias;
    }
    sueldoTrabajador() {
        let sueldoMes = this._salHora * 40 * 4 + 300;
        console.log("Sueldo:" + sueldoMes);
        return sueldoMes;
    }
}
exports.Conductor = Conductor;
