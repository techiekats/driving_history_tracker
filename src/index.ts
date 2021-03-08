main(process.argv);

//This does not need testing. It is simply parsing the input.
function main(argv: string[]) {
    console.log(argv.length);
    console.log(argv);
    let logger = new Logger();
    var tracker = new DrivingInsuranceTracker(
        new DriverFactory(),
        logger
    );
    tracker.GetInsuranceReport(argv).forEach(x=> console.log(x.ToString()));

}

