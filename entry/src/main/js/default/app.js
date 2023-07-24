export default {
    data: {
        test: 'by getAPP',
        url: 'http://fitness-2023.vip.cpolar.cn/',
        local_url: 'http://60.205.181.92:5000/',
    },
    onCreate() {
        console.info('AceApplication onCreate');
    },
    onDestroy() {
        console.info('AceApplication onDestroy');
    }
};
