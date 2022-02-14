"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trabajador = void 0;
class Trabajador {
    constructor(DNI, nombre, apellidos, fechaNac, salHora, cargo) {
        this._DNI = DNI;
        this._nombre = nombre;
        this._apellidos = apellidos;
        this._fechaNac = fechaNac;
        this._salHora = salHora;
        this._cargo = cargo;
    }
    get DNI() {
        return this._DNI;
    }
    get nombre() {
        return this._nombre;
    }
    get apellidos() {
        return this._apellidos;
    }
    get fechaNac() {
        return this._fechaNac;
    }
    get salHora() {
        return this._salHora;
    }
    get cargo() {
        return this._cargo;
    }
    sueldoTrabajador() {
        let sueldoMes = this._salHora * 40 * 4;
        console.log("Sueldo:" + sueldoMes);
        return sueldoMes;
    }
}
exports.Trabajador = Trabajador;
