let React = require('react'),
    Router = require('react-router'),
    Routes = require('../elements/Routes.jsx');

Router.run(Routes, Router.HistoryLocation,  function (Handler) {
  React.render(React.createElement(Handler, null), document);
});

