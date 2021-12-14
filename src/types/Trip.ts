import Time from "./Time";

export default class Trip {
    readonly #start!: Time;
    readonly #end!: Time; 
    readonly #distance!: number;
    readonly #speed!: number;
    constructor(start: Time, end:Time, distance: number) {
       this.#start = start;
       this.#end = end;
       this.#distance = distance;
       this.#speed = this.#distance * 60 / (this.#end.getDifferenceInMinutes(this.#start));
    }
    getDistance(): number {
        return this.#distance;
    }
    getDuration(): number {
        return this.#end.getDifferenceInMinutes(this.#start);
    }
    getSpeed():number {
        return this.#speed;
    };
}