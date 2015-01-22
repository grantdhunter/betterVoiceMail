angular.module('app.config', [])

.constant('Config', {
    //@if ENV == 'LOCAL'
    domain: 'http://mail.tunnel.grant-hunter.ca',
    stripKey: 'pk_test_iZE2zRGS1NHEFCraUz5RuvST'
    //@endif

    //@if ENV == 'DEV'
    domain: '',
    stripKey: ''
    //@endif

    //@if ENV == 'PROD'
    domain: '',
    stripKey: ''
    //@endif
})