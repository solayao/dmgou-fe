const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/graphql', { target: 'http://localhost:4628' }));
  app.use(proxy('/getImg', { target: 'http://localhost:4628' }));
  app.use(proxy('/socket.io', { 
    target: 'http://localhost:4627',
    ws:true
  }));
};