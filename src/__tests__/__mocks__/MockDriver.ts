import IDriver from "../../types/IDriver";
import Time from "../../types/Time";

export default class MockDriver implements IDriver {
    _getNameCallCounter = 0;
    _getAverageSpeedCallCounter = 0;
    _getTotalDistanceCallCounter = 0;
    _registerTripCallCounter = 0;
    _toStringCallCounter = 0;
    _recentTripStart: Time | undefined;
    _recentTripEnd: Time | undefined;
    _recentTripDistance: number | undefined;
    getName(): string {
        this._getNameCallCounter +=1;
        return "";
    }
    getAverageSpeed(): number {
        this._getAverageSpeedCallCounter +=1;
        return Math.random() * 1000;
    }
    getTotalDistanceTravelled(): number {
        this._getTotalDistanceCallCounter += 1;
        return Math.random() * 1000;
    }
    registerTrip(start: Time, end: Time, distance: number): void {
        this._recentTripStart = start;
        this._recentTripEnd = end;
        this._recentTripDistance = distance;
        this._registerTripCallCounter += 1;
    }
    toString(): string {
        this._toStringCallCounter +=1;
        return "";
    }
    
}