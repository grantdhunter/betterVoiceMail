var request = require('request');
var logger = require("tracer").colorConsole();

var domain = 'http://mail.tunnel.grant-hunter.ca';

request({
        method: 'POST',
        uri: domain + '/v1/user/create',
        json: true,
        body: {
            id: "1",
            email: "gr@nt-hunter",
            password: "qwe",
            name: "Grant Hunter"
        }
    },
    function (error, resp, body) {
        if (error) {
            logger.log(error);
        } else {
            //logger.log(resp);
            logger.log(body);
        }
    });

