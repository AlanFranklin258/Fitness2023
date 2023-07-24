import router from '@system.router';
import fetch from '@system.fetch';
import app from '@system.app';
import http from '@ohos.net.http';

export default {
    data: {
        valid: true,
        username: "",
        password: "",
        fetch_url: '',
    },
    onInit() {
    },
    appExit(){
        app.terminate();
    },

    onSubmit(result) {
        console.log("userinfo用户名是:" + result.value.username); // text input value
        console.log("userinfo密码是:" + result.value.password); // radio1 or radio2
        this.username = result.value.username;
        this.password = result.value.password;
        // 由于preview无法键盘输入，测试
        this.loginByFetch('Alan','Alan1999');
         // this.loginByFetch('lufi', 'lufi123');
        // this.loginByFetch(result.value.username, result.value.password);
    },
    loginByFetch(username, password){
        let that = this;
        console.log(username);
        console.log(password);
        var fetch_url = getApp().data.local_url + "user/login?username=" + username + "&password=" + password;
        this.fetch_url = fetch_url;
        console.log(fetch_url);
        fetch.fetch({
            url: fetch_url,
            method: 'GET',
            success: function (response) {
                console.info("login fetch success" + JSON.stringify(response));
                let rawdata = JSON.parse(response.data) || {}; //原始JSON数据
                console.log("get from server:"+rawdata.token);
                console.log("get from server:"+rawdata.userid);
                if(rawdata.token){
                    router.push({
                        uri: 'pages/index/index',
                        params: {
                            "userid": rawdata.userid,
                        },
                    });
                }
            },
            complete: function () {
                console.log("login fetch complete");
            },
            fail: function (error) {
                console.info("login fetch fail" + JSON.stringify(error));
                // that.fetch_url = "login fetch fail" + JSON.stringify(error);
                that.$element('hintDialog').show();
            }
        });
    },
    // 想用http替代fetch，因为API6之后，fetch不再维护，指不定哪天就停用了。
    // http无法在previewer模式下调试。
    loginByHttp(username, password){
        let that = this;
        let httpRequest = http.createHttp();
        var url = getApp().data.local_url + "user/login?username=" + username + "&password=" + password;
        httpRequest.request(
            // 填写HTTP请求的URL地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            url,
            {
                method: http.RequestMethod.GET, // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
//                extraData: {
//                    "data": "data to send",
//                },
//                expectDataType: http.HttpDataType.STRING, // 可选，指定返回数据的类型
                usingCache: true, // 可选，默认为true
                priority: 1, // 可选，默认为1
                connectTimeout: 60000, // 可选，默认为60000ms
                readTimeout: 60000, // 可选，默认为60000ms
//                usingProtocol: http.HttpProtocol.HTTP1_1, // 可选，协议类型默认值由系统自动指定
            }, (err, data) => {
            if (!err) {
                // data.result为HTTP响应内容，可根据业务需要进行解析
                let rawdata = JSON.parse(data.result);
                console.log("get token from server:"+rawdata.token);
                console.log("get userid from server:"+rawdata.userid);
                if(rawdata.token){
                    router.push({
                        uri: 'pages/index/index',
                        params: {
                            "userid": rawdata.userid,
                        },
                    });
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                // 取消订阅HTTP响应头事件
                httpRequest.off('headersReceive');
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
            }
        }
        );
    },
    closeDialog(){
        this.$element('hintDialog').close();
    },
    testRegister(){
        let that = this;
        var test_username = "test_username";
        var test_password = "test_password";
        var fetch_url = getApp().data.local_url + "user/register?username=" + test_username + "&password=" + test_password;
        console.log(fetch_url);
        fetch.fetch({
            url: fetch_url,
            method: 'GET',
            success: function (response) {
                console.info("register test success" + JSON.stringify(response));
                let rawdata = JSON.parse(response.data) || {}; //原始JSON数据
                console.log("get from server:"+rawdata.username);
                console.log("get from server:"+rawdata.password);
            },
            complete: function () {
                console.log("register test complete");
            },
            fail: function (error) {
                console.info("register test fail" + JSON.stringify(error));
            }
        });
        // 测试一波位置
//        geolocation.getLocation({
//            success: function(ret){
//                console.log('经度:'+ret.longitude);
//                console.log('纬度:'+ret.latitude);
//                console.log('海拔:'+ret.altitude);
//                console.log('精度:'+ret.accuracy);
//            },
//            fail: function(data, code){
//                console.log('error code:'+code+',data:'+data);
//            },
//        });
    },
}
