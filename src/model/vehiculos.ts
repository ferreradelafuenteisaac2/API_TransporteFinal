import { Schema, model } from "mongoose";

const VehiculoSchema = new Schema({
    matricula: String,
    numPlazas: Number,
    fechaInicio: Date,
    pagoTarjeta: Boolean,
    trabajadores: Array,
    tipoT: String,
    tipoTren: String,
    estaciones: Array,
    bano: Boolean,
    numPlantas: Number
 },
 )

export type iAutobus = {
    matricula: String | null,
    numPlazas: Number | null,
    fechaInicio: Date | null,
    pagoTarjeta: Boolean | null,
    trabajadores: Array<string> | null,
    bano: Boolean | null,
    numPlantas: Number | null,
    tipoT: String | null,
}

export type iTren = {
    matricula: String | null,
    numPlazas: Number | null,
    fechaInicio: Date | null,
    pagoTarjeta: Boolean | null,
    trabajadores: Array<string> | null,
    tipoTren: String | null,
    estaciones: Array<string> | null,
    tipoT: String | null,
}

export const Vehiculos = model('vehiculos', VehiculoSchema  )