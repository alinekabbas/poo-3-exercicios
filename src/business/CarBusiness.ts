import { CarDatabase } from "../database/CarDatabase"
import { Car } from "../models/Car"
import { CarDB } from "../types"

export class CarBusiness {
    public getCars = async () => {
        const carDatabase = new CarDatabase()
        const carsDB = await carDatabase.findCars()

        const cars: Car[] = carsDB.map((carDB) => new Car(
            carDB.id,
            carDB.make,
            carDB.model,
            carDB.color,
            carDB.year
        ))

        return ({ cars: cars })

    }

    public createCar = async (input: any) => {
        const { id, make, model, color, year } = input

        if (typeof id !== "string") {
            throw new Error("'id' deve ser string")
        }

        if (typeof make !== "string") {
            throw new Error("'make' deve ser string")
        }

        if (typeof model !== "string") {
            throw new Error("'model' deve ser string")
        }

        if (typeof color !== "string") {
            throw new Error("'color' deve ser string")
        }

        if (typeof year !== "number") {
            throw new Error("'year' deve ser number")
        }

        const carDatabase = new CarDatabase()
        const carDBExists = await carDatabase.findCarById(id)

        if (carDBExists) {
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

        const output = {
            message: "Carro cadastrado com sucesso",
            newCar: newCar
        }

        return output

    }

    public editCar = async (idToEdit: string, input: any) => {

        const { id, make, model, color, year } = input

        if (id !== undefined) {
            if (typeof id !== "string") {
                throw new Error("'id' deve ser string")
            }
        }

        if (make !== undefined) {
            if (typeof make !== "string") {
                throw new Error("'make' deve ser string")
            }
        }

        if (model !== undefined) {
            if (typeof model !== "string") {
                throw new Error("'model' deve ser string")
            }
        }

        if (color !== undefined) {
            if (typeof color !== "string") {
                throw new Error("'color' deve ser string")
            }
        }

        if (year !== undefined) {
            if (typeof year !== "number") {
                throw new Error("'color' deve ser string")
            }
        }

        const carDatabase = new CarDatabase()
        const carDB = await carDatabase.findCarById(idToEdit)

        if (!carDB) {
            throw new Error("'id' não encontrado")
        }

        const newCar = new Car(
            carDB.id,
            carDB.make,
            carDB.model,
            carDB.color,
            carDB.year
        )

        newCar.setId(id)
        newCar.setMake(make)
        newCar.setModel(model)
        newCar.setColor(color)
        newCar.setYear(year)

        await carDatabase.updateCar(idToEdit, newCar)

        const output = {
            message: "Atualização realizada com sucesso",
            id,
            newCar
        }

        return output
    }

    public deleteCar = async (idToDetele: string) => {
        const carDatabase = new CarDatabase()
        const carsDB = await carDatabase.findCarById(idToDetele)

        if (!carsDB) {
            throw new Error("'id' não encontrada")
        }

        await carDatabase.deleteCar(idToDetele)
        
        const output = ({
            message: "Item excluído com sucesso",
        })

        return output
    }
}