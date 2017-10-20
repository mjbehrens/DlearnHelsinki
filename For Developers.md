### For Developers

## Technologies
DlearnHelsinki uses REACT Javascript for its frontend. Basic knowledge of css and HTML is also required.
The backend (DLearhHelsinki-backend, in separate project) uses Java for models, PostgreSQL for database calls, and has a RESTful architecture. The backend is a Maven project, so consult the guide for your IDE of choice on how to import it.

In order to get started on frontend development, you will need to first install NodeJS. Once installation is complete, pull the project off of GitHub, use the command prompt/terminal to go to the project folder and type "npm install" to install dependences. To run the project locally, type "npm start".

## Unit testing
Testing is done using mocha and code coverage is tested with coveralls.
Tests are implemented in the branch "unit_testing" and that branch **must not** be merged with master as Travis will not pass due to the tests hanging after they have finished running. This will change once there's a way to terminate testing on Travis after all tests have run.
To run tests on a local machine, go to terminal/command prompt and type "npm test".