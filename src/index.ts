import DriverFactory from "./types/DriverFactory";
import DrivingInsuranceTracker from "./types/DrivingInsuranceTracker";
import Logger from "./types/Logger";

main(process.argv);

function main(argv: string[]) {
    console.log(argv.length);
    console.log(argv);
    let logger = new Logger();
    var tracker = new DrivingInsuranceTracker(
        new DriverFactory(),
        logger
    );
    tracker.PopulateEntries(argv);
    tracker.GetDrivingSummary().forEach(x=> console.log(x.ToString()));

}

