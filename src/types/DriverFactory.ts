class DriverFactory implements IDriverFactory {
    CreateDriver(name: string): IDriver {
        return new Driver(name);
    }    
}