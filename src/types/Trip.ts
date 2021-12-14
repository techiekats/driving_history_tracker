import Time from "./Time";

export default class Trip {
    readonly #start!: Time;
    readonly #end!: Time; 
    readonly #distance!: number;
    #speed!: number;
    constructor(start: Time, end:Time, distance: number) {
       this.#start = start;
       this.#end = end;
       this.#distance = distance;
    }
    getDistance(): number {
        return this.#distance;
    }
    getDuration(): number {
        return this.#end.getDifferenceInMinutes(this.#start);
    }
    speed():number {
        //compute on demand and save it to variable. Because dependent variables are read-only, cached state can be used
        if (!this.#speed) {
            this.#speed = this.#distance * 60 / (this.#end.getDifferenceInMinutes(this.#start));
        }
        return this.#speed;
    };
}