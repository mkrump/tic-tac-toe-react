# React Sample App

This repository is an example to-do list app built using React and ReactDOM.

### Requirements

This application requires `node` and `npm` to be present in order to build. After cloning the repository, run `npm install` in the application's root directory.

### Running

To try out the application in a browser, run `npm run server` and navigate to `http://localhost:3000/`. STDOUT should include a log of all requests made to the express development server defined in `server.js`.

### Tests

The test suite can be run in two ways. The first is via the testem UI: run `npm run test-watch` and go to the provided url in your browser. Testem will continue to run the tests upon file changes via the page open in your browser.

The second method of running the tests is via `npm test`. This requires that `xvfb-run` be installed, and it will only run the suite once in your shell.
