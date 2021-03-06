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
    GetName(): string {
        this._getNameCallCounter +=1;
        return "";
    }
    GetAverageSpeed(): number {
        this._getAverageSpeedCallCounter +=1;
        return Math.random() * 1000;
    }
    GetTotalDistanceTravelled(): number {
        this._getTotalDistanceCallCounter += 1;
        return Math.random() * 1000;
    }
    RegisterTrip(start: Time, end: Time, distance: number): void {
        this._recentTripStart = start;
        this._recentTripEnd = end;
        this._recentTripDistance = distance;
        this._registerTripCallCounter += 1;
    }
    ToString(): string {
        this._toStringCallCounter +=1;
        return "";
    }
    
}