import IDriver from "./IDriver";
import ILogger from "./ILogger";
import Time from "./Time";

export default class Driver implements IDriver {
    _totalDistance: number = 0;
    _totalTime: number = 0;
    _logger!: ILogger;
    _name!: string;
    _speedLowerBound = 5;
    _speedUpperBound = 100;
    constructor(name: string, logger: ILogger) {
        this._name = name; 
        this._logger = logger;        
    }
    GetTotalDistanceTravelled(): number {
        return this._totalDistance;
    }
    GetName () : string {
        return this._name;
    }
    GetAverageSpeed(): number {
        if (this._totalTime > 0) {
            return this._totalDistance / this._totalTime;
        }
        else {
            this._logger.LogWarning("Average speed of 0 records returned as 0");
            return 0;
        }
    }
    RegisterTrip(start: Time, end: Time, distance: number): void {
        const timeOfJourney = end.GetDifferenceInMinutes(start);
        const speed = distance * 60 / timeOfJourney;
        if (speed > this._speedLowerBound && speed < this._speedUpperBound) {
            this._totalDistance += distance;
            this._totalTime += this._totalTime;
        }
        else {
            this._logger.LogWarning("Trip was discarded because it was an extreme point");
        }
    }
    ToString(): string {
        if (this._totalDistance > 0) 
            return `${this._name}: ${this._totalDistance} miles @ ${this.GetAverageSpeed()} mph`;
        else
            return `${this._name}: 0 miles`
    }
    
}