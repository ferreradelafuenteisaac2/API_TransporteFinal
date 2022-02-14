"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mecanico = void 0;
const trabajador_1 = require("./trabajador");
class Mecanico extends trabajador_1.Trabajador {
    constructor(DNI, nombre, apellidos, fechaNac, salHora, cargo, especialidad, ubicacion) {
        super(DNI, nombre, apellidos, fechaNac, salHora, cargo);
        this._especialidad = especialidad;
        this._ubicacion = ubicacion;
    }
    get especialidad() {
        return this._especialidad;
    }
    set especialidad(especialidad) {
        this._especialidad = especialidad;
    }
    get ubicacion() {
        return this._ubicacion;
    }
    set ubicacion(ubicacion) {
        this._ubicacion = ubicacion;
    }
    sueldoTrabajador() {
        let sueldoMes = this._salHora * 40 * 4 + 100;
        console.log("Sueldo:" + sueldoMes);
        return sueldoMes;
    }
}
exports.Mecanico = Mecanico;
