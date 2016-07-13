var React    = require('react');
var ReactDOM = require('react-dom');

var ApplicationContainer = require('./components/ApplicationContainer.react');

require('../public/css/base.less');

ReactDOM.render(
  <ApplicationContainer />, document.getElementById('application')
);
