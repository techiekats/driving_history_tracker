import Time from "./Time";

export default interface IDriver {
    getName () : string;
    getAverageSpeed() : number;
    getTotalDistanceTravelled () : number;
    registerTrip (start:Time, end:Time, distance: number) : void;
    toString(): string;
}