import { Car } from "../models/Car"
import { CarDB } from "../types"
import { BaseDatabase } from "./BaseDatabase"

export class CarDatabase extends BaseDatabase {
    public static TABLE_CARS = "cars"

    public async findCars(){
        const result: CarDB[] = await BaseDatabase.connection(CarDatabase.TABLE_CARS) 
        return result
    }

    public async findCarById(id: string){
        const [ carDB ]: CarDB[] | undefined[] = await BaseDatabase
        .connection(CarDatabase.TABLE_CARS)
        .where({id})

        return carDB
    }

    public async insertCar(newCarDB: CarDB){
        await BaseDatabase
        .connection(CarDatabase.TABLE_CARS)
        .insert(newCarDB)
    }

    public async updateCar(id: string, newCar: Car){
        await BaseDatabase
            .connection(CarDatabase.TABLE_CARS)
            .update(newCar)
            .where({id})
    }

    public async deleteCar(id: string){
        await BaseDatabase
            .connection(CarDatabase.TABLE_CARS)
            .del()
            .where({id})
    }
}
