import { Request, Response } from "express";
import { CarBusiness } from "../business/CarBusiness";
import { CarDatabase } from "../database/CarDatabase";
import { Car } from "../models/Car";
import { CarDB } from "../types";

export class CarController {
    public getCars = async (req: Request, res: Response) => {
        try {
            const carBusiness = new CarBusiness()
            const output = await carBusiness.getCars()

            res.status(200).send(output)

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

    public createCar = async (req: Request, res: Response) => {
        try {
            const input = {
                id: req.body.id,
                make: req.body.make,
                model: req.body.model,
                color: req.body.color,
                year: req.body.year
            }

            const carBusiness = new CarBusiness()
            const output = await carBusiness.createCar(input)

            res.status(201).send(output)

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

    public editCar = async (req: Request, res: Response) => {
        try {
            const idToEdit = req.params.id

            const input = {
                id: req.body.id,
                make: req.body.make,
                model: req.body.model,
                color: req.body.color,
                year: req.body.year
            }
            
            const carBusiness = new CarBusiness()
            const output = await carBusiness.editCar(idToEdit, input)

            res.status(200).send(output)

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

    public deleteCar = async (req: Request, res: Response) => {
        try {
            const id = req.params.id

            const carBusiness = new CarBusiness()
            const output = await carBusiness.deleteCar(id)            

            res.status(200).send(output)

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