var app = require('../index');
var lt = require('localtunnel');
var port = Math.floor((Math.random() * 5000) + 3000);;
var models = require('../models');

models.connect(function () {
    app.set('port', port);
    setTimeout(function () {
        lt(port, {
            subdomain: 'mail',
            host: 'http://tunnel.grant-hunter.ca'
        }, function (err, tunnel) {
            if (!err) {
                app.listen(app.get('port'));
                console.log("running on ", tunnel.url, ':', port);

                tunnel.on('error', function () {
                    console.log('tunnel error');
                     process.kill(process.pid, 'SIGUSR2');
                });

                tunnel.on('close', function () {
                    console.log('tunnel close');
                    setTimeout(function () {
                        process.kill(process.pid, 'SIGUSR2');
                    }, 3000);
                });
                process.once('SIGUSR2', function () {
                    console.log('sigusr2');
                    tunnel.close();
                });

            } else {
                console.log(err);
                console.log("exit");
                process.exit(0);
            }
        });
    }, 3000);
});