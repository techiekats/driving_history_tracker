import DriverFactory from "./types/DriverFactory";
import DrivingInsuranceTracker from "./types/DrivingInsuranceTracker";
import Logger from "./types/Logger";

main(process.argv);

function main(argv: string[]) {    
    let logger = new Logger();
    var tracker = new DrivingInsuranceTracker(
        new DriverFactory(),
        logger
    );
    tracker.PopulateEntries(argv);
    console.log('----------------------------------');
    tracker.GetDrivingSummary().forEach(x=> console.log(x.ToString()));
    console.log('----------------------------------');
}

