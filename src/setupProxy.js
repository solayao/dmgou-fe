const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/graphql', { target: 'http://localhost:4627' }));
  app.use(proxy('/getImg', { target: 'http://localhost:4627' }));
};