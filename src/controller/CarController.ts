import { Request, Response } from "express";
import { CarDatabase } from "../database/CarDatabase";
import { Car } from "../models/Car";
import { CarDB } from "../types";

export class CarController {
    public getCars = async (req: Request, res: Response)=>{
        try {
            const carDatabase = new CarDatabase()
            const carsDB = await carDatabase.findCars()

            const cars: Car[] = carsDB.map((carDB)=> new Car(
                    carDB.id,
                    carDB.make,
                    carDB.model,
                    carDB.color,
                    carDB.year
                )
            )
            
            res.status(200).send(cars)

        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public createCar = async (req: Request, res: Response)=>{
        try {
            const {id, make, model, color, year} = req.body

            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }

            if (typeof make !== "string") {
                res.status(400)
                throw new Error("'make' deve ser string")
            }

            if (typeof model !== "string") {
                res.status(400)
                throw new Error("'model' deve ser string")
            }

            if (typeof color !== "string") {
                res.status(400)
                throw new Error("'color' deve ser string")
            }

            if (typeof year !== "number") {
                res.status(400)
                throw new Error("'year' deve ser number")
            }

            const carDatabase = new CarDatabase()
            const carDBExists = await carDatabase.findCarById(id)

            if(carDBExists){
                res.status(400)
                throw new Error("'id' já existe")                
            }

            const newCar = new Car(
                id,
                make,
                model,
                color,
                year
            )

            const newCarDB: CarDB = {
                id: newCar.getId(),
                make: newCar.getMake(),
                model: newCar.getModel(),
                color: newCar.getColor(),
                year: newCar.getYear()
            }

            await carDatabase.insertCar(newCarDB)

            res.status(201).send({
                message: "Carro registrado com sucesso",
                newCar: newCarDB
            })
            
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public editCar =async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            
            const carDatabase = new CarDatabase()
            const carDB = await carDatabase.findCarById(id)

            if(!carDB){
                res.status(400)
                throw new Error("'id' não encontrado")
            }
            
            const newId = req.body.id
            const newMake = req.body.make
            const newModel = req.body.model
            const newColor = req.body.color
            const newYear = req.body.year

            const newCar = new Car(
                carDB.id,
                carDB.make,
                carDB.model,
                carDB.color,
                carDB.year
            )

            if(newId !== undefined){
                if(typeof newId !== "string"){
                    res.status(400)
                    throw new Error("'id' deve ser string")
                }  
            }

            if(newMake !== undefined){
                if(typeof newMake !== "string"){
                    res.status(400)
                    throw new Error("'make' deve ser string")
                }                
            }

            if(newModel !== undefined){
                if(typeof newModel !== "string"){
                    res.status(400)
                    throw new Error("'model' deve ser string")
                }                
            }

            if(newColor !== undefined){
                if(typeof newColor !== "string"){
                    res.status(400)
                    throw new Error("'color' deve ser string")
                }                
            }

            if(newYear !== undefined){
                if(typeof newYear !== "number"){
                    res.status(400)
                    throw new Error("'color' deve ser string")
                }                
            }
            
            newCar.setId(newId)
            newCar.setMake(newMake)
            newCar.setModel(newModel)
            newCar.setColor(newColor)
            newCar.setYear(newYear)
        
            await carDatabase.updateCar(id, newCar)

            res.status(200).send({
                message: "Atualização realizada com sucesso",
                id,
                newCar
            })
            
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public deleteCar = async (req: Request, res: Response) =>{
        try {
            const id = req.params.id

            const carDatabase = new CarDatabase()
            const carsDB = await carDatabase.findCarById(id)

            if(!carsDB){
                res.status(404)
                throw new Error("'id' não encontrada")
            }

            await carDatabase.deleteCar(id)

            res.status(200).send("Item excluído com sucesso")

        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
        
    }
}