class Driver implements IDriver {
    _logs: number[] = [];
    _name!: string;
    constructor(name: string) {
        this._name = name;           
    }
    GetAverageSpeed(): number {
        throw new Error("Method not implemented.");
    }
    RegisterTrip(start: Date, end: Date, distance: number): void {
        throw new Error("Method not implemented.");
    }
    ToString(): string {
        throw new Error("Method not implemented.");
    }
    
}