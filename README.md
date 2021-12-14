Driving History Tracker
=======================

Overall approach
----------------

(*Solution assumes data is accurate hence performs minimal data validations and exception handling)

* Type description
  * DrivingHistoryReader - Parses string input and creates structure to map a driver to corresponding trips
  * DriverReportGenerator - Generates the report of driver trips. 
    * The reader class and report generator classes are separate because each has a separate responsibility. It is very likely that based on the same data one may want to create a different report. Hence, the two must not be coupled.
    * The reader class returns an array of strings instead of any other data type. The caller (index.ts) should not have to understand any new type to display the report
  * Trip - Basic construct that represents a trip
  * Time - simple structure that represents time  

* State of object can be updated only via methods

* Design constructors such that the possibility of invalid object states is reduced
  * E.g. Type.ts and Time.ts have read only fields because they need to be initalized just once and are required in the constructor


* Technology choice
  * TypeScript - static typing for C# with flexibility of JavaScript
  * src/ is folder for all code, per TypeScript conventions
  * Jest - Popular unit testing framework

Instructions to run
-------------------

* Open root folder in VS Code and run following commands in Terminal

`npm install`

`npm run build`

* To execute tests

`npx jest`

* Sample runs

`node lib/index.js "Driver Dan" "Driver Lauren" "Driver Kumi" "Trip Dan 07:15 07:45 17.3" "Trip Dan 06:12 06:32 21.8" "Trip Lauren 12:01 13:16 42.0"`

`node lib/index.js "Driver Jimmy" "Driver Steven" "Driver Trevor" "Trip Jimmy 07:15 07:45 17.3" "Trip Steven 06:12 06:32 21.8" "Trip Trevor 12:01 13:16 42.0" "Trip Trevor 12:01 13:16 42.0" "Trip Steven 06:12 08:12 100"`
