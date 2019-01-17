const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/graphql', { target: 'http://47.98.186.3:4628' }));
    app.use(proxy('/getImg', { target: 'http://47.98.186.3:4628' }));
    app.use(proxy('/socket.io', { 
        target: 'http://47.98.186.3:4628',
        ws:true
    }));
};