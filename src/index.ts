import DriverFactory from "./types/DriverFactory";
import DrivingHistoryTracker from "./types/DrivingHistoryTracker";
import Logger from "./types/Logger";

main(process.argv);

function main(argv: string[]) {    
    let logger = new Logger();
    var tracker = new DrivingHistoryTracker(
        new DriverFactory(),
        logger
    );
    tracker.populateEntries(argv);
    console.log('----------------------------------');
    tracker.getDrivingSummary().forEach(x=> console.log(x.toString()));
    console.log('----------------------------------');
}

