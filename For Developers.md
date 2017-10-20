### For Developers

## Technologies
DlearnHelsinki uses REACT Javascript for its frontend. Basic knowledge of css and HTML is also required.
The backend (DLearhHelsinki-backend, in separate project) uses Java for models, PostgreSQL for database calls, and has a RESTful architecture. The backend is a Maven project, so consult the guide for your IDE of choice on how to import it.

In order to get started on frontend development, you will need to first install NodeJS. Once installation is complete, pull the project off of GitHub, use the command prompt/terminal to go to the project folder and type "npm install" to install dependences. To run the project locally, type "npm start".

## Unit testing
Testing is done using mocha and code coverage is tested with coveralls.
http://mochajs.org/
Tests are implemented in the branch "unit_testing". At the moment all existing tests are commented out because they became unable to run when the redux store was implemented.
To run tests on a local machine, go to terminal/command prompt and type "npm test".
Make sure that tests are clean and manually close connections or might get [confusing error messages](https://github.com/mochajs/mocha/issues/2879).
