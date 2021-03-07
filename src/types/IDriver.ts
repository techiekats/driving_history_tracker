interface IDriver {
    GetAverageSpeed () : number;
    RegisterTrip (start:Date, end:Date, distance: number) : void;
    ToString(): string;
}