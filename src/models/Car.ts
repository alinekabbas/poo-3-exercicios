export class Car {
    constructor(
        private id: string,
        private make: string,
        private model: string,
        private color: string,
        private year: number
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getMake(): string {
        return this.make
    }

    public setMake(value: string): void {
        this.make = value
    }

    public getModel(): string {
        return this.model
    }

    public setModel(value: string): void {
        this.model = value
    }

    public getColor(): string {
        return this.color
    }

    public setColor(value: string): void {
        this.color = value
    }

    public getYear(): number {
        return this.year
    }

    public setYear(value: number): void {
        this.year = value
    }
}

