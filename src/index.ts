import DriverReportGenerator from "./types/DriverReportGenerator";
import DrivingHistoryReader from "./types/DrivingHistoryReader";

main(process.argv);

function main(argv: string[]) {    
    var tracker = new DrivingHistoryReader();
    tracker.populateEntries(argv);
    console.log('----------------------------------');
    let reportGenerator = new DriverReportGenerator();
    reportGenerator.getDrivingSummary(tracker.entries).forEach(x=> console.log(x));    
    console.log('----------------------------------');
}

