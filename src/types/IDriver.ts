import Time from "./Time";

export default interface IDriver {
    GetName () : string;
    GetAverageSpeed() : number;
    GetTotalDistanceTravelled () : number;
    RegisterTrip (start:Time, end:Time, distance: number) : void;
    ToString(): string;
}