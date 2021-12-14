import IDriver from "./IDriver";
import ILogger from "./ILogger";
import Time from "./Time";

export default class Driver implements IDriver {
    #_totalDistance: number = 0;
    #_totalTime: number = 0;
    readonly #_logger!: ILogger;
    readonly #_name!: string;
    #_speedLowerBound = 5;
    #_speedUpperBound = 100;
    constructor(name: string, logger: ILogger) {
        this.#_name = name; 
        this.#_logger = logger;        
    }
    getTotalDistanceTravelled(): number {
        return this.#_totalDistance;
    }
    getName () : string {
        return this.#_name;
    }
    getAverageSpeed(): number {
        if (this.#_totalTime > 0) {
            return this.#_totalDistance * 60/ this.#_totalTime;
        }
        else {
            this.#_logger.logWarning("Average speed of 0 records returned as 0");
            return 0;
        }
    }
    registerTrip(start: Time, end: Time, distance: number): void {
        const timeOfJourney = end.getDifferenceInMinutes(start);
        const speed = distance * 60 / timeOfJourney;
        if (speed >= this.#_speedLowerBound && speed <= this.#_speedUpperBound) {
            this.#_totalDistance += distance;
            this.#_totalTime += timeOfJourney;
        }
        else {
            this.#_logger.logWarning("Trip was discarded because it was an extreme point");
        }
    }
    toString(): string {
        if (this.#_totalDistance > 0) 
            return `${this.#_name}: ${this.#_totalDistance} miles @ ${this.getAverageSpeed()} mph`;
        else
            return `${this.#_name}: 0 miles`
    }    
}