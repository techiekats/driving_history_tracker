interface IDriver {
    GetAverageSpeed () : number;
    RegisterTrip (start:Time, end:Time, distance: number) : void;
    ToString(): string;
}