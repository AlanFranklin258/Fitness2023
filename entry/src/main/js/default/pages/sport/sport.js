import router from '@system.router';
import sensor from '@system.sensor';
import geolocation from '@system.geolocation';
import fetch from '@system.fetch';
import app from'@system.app';

export default {
    data: {
        swiperindex: 0, // swiper默认在第几页

        user:{},
        currentSportMode:{},
        percent:33,
        secondarypercent: 66,
        percentColor: '#E5A35F',
        secondaryColor: '#F2CCA6',
        currentCalory: 0,
        currentCaloryToShow: '',
        currentTime: null,
        currentTimeToShow: '',
        onSport: true,
        isFinished: false,
        timer1: null,
        timer2: null,
        validCountSecond: 0, // 有效运动时间
        countSecond: 0,
        countMinute: 0,
        countHour: 0,
        myCalory: 0,
        competitorCalory: 0,
        myTeamSportMin: 0,
        coTeamSportMin: 0,
        heartRate: 100,
        heartRateLowerBound: 100,
        heartRateUpperBound: 220,
        kcalPerHour: 0,
        totalSportTime: 0,

        todayDate: '',

        startTimeList: [],
        endTimeList: [],
        startTime: 0,
        lastTime: 0,
        onTime: true,

        onSubmission: false,
    },
    onInit() {
        //this.currentTime = new Date();
        //this.showTimeInBeijing(this.currentTime);
        console.log(this.currentSportMode);
        console.log(this.user.username);
        console.log(this.heartRateLowerBound);
        var temps = new Date().toString().split(' ');
        this.todayDate = temps[1] + ' ' + temps[2] + ' ' + temps[3];

        this.startTime = new Date().getTime();
        this.getKcalPerHour();
        this.getHeartRate(); // 初始化启动后，自动每秒更新
        this.showCount();
        this.updateProgress();
    },
    onShow(){
        clearInterval(this.timer1);
        this.timer1 = null;
        this.timer1 = setInterval(this.run1, 500);
        clearInterval(this.timer2);
        this.timer2 = null;
        this.timer2 = setInterval(this.run2, 5000);
    },
    run1(){
        if(this.validSport()){
            if(this.onTime){
                this.validCountSecond = Math.floor((new Date().getTime() - this.startTime + this.lastTime)/1000);
                this.countHour = Math.floor(this.validCountSecond/3600);
                this.countMinute = Math.floor((this.validCountSecond%3600)/60);
                this.countSecond = Math.floor((this.validCountSecond%60));
                this.showCount();
                this.computeCalory();

            }else{
                this.startTime = new Date().getTime();
                this.onTime = true;
            }

        }else{
            if(this.onTime){
                this.lastTime += new Date().getTime() - this.startTime;
                this.onTime = false;
            }
        }

    },
    run2(){
        if(this.onSport){
            this.updateProgress();
        }
        if(this.isFinished){
            clearInterval(this.timer2);
            this.timer2 = null;
        }
    },
    getKcalPerHour(){
        if(this.user.gender=='male'){
            this.kcalPerHour = this.currentSportMode.kcalperhour[0];
        }
        else{
            this.kcalPerHour = this.currentSportMode.kcalperhour[1];
        }
    },
    getHeartRate(){
        var that = this;
        sensor.subscribeHeartRate({
            success: function (ret) {
                console.log('get heartrate value:' + ret.heartRate);
                that.heartRate = ret.heartRate;
            },
            fail: function (data, code) {
                console.log('Subscription failed. Code: ' + code + '; Data: ' + data);
            },
        });
    },
    validSport(){
        // 根据心率来判断当前有效运动状态
//        if(this.onSport){
//            return true;
//        }
        if(this.onSport && this.heartRate >= this.heartRateLowerBound && this.heartRate <= this.heartRateUpperBound){
            return true;
        }
        else{
            return false;
        }
    },
    showCount(){
        var showtime = '';
        if(this.countHour<10){
            showtime = showtime+'0';
        }
        showtime = showtime+this.countHour.toString()+':';
        if(this.countMinute<10){
            showtime = showtime+'0';
        }
        showtime = showtime+this.countMinute.toString()+':';
        if(this.countSecond<10){
            showtime = showtime+'0';
        }
        showtime = showtime+this.countSecond.toFixed(0);
        this.currentTimeToShow = showtime;
    },
    computeCalory(){
        var sportTime = this.validCountSecond/3600;
        console.log('运动时长：'+ sportTime.toString());
        this.currentCalory = this.kcalPerHour * sportTime;
    },
    showTimeInBeijing(time){
        // 由于系统时间得到的是格林尼治时间，需要转化成东八区
        var h = time.getHours(); // 去零的
        var min = time.getMinutes();
        var s = time.getSeconds();
        h = h+8;
        if(h>=24){
            h = h-24;
        }
        var showtime = ''
        if(h<10){
            showtime = showtime+'0';
        }
        showtime = showtime+h.toString()+':';
        if(min<10){
            showtime = showtime+'0';
        }
        showtime = showtime+min.toString()+':';
        if(s<10){
            showtime = showtime+'0';
        }
        showtime = showtime+s.toString();
        this.currentTimeToShow = showtime;
    },
    exitSport(){
        this.stopSport();
        this.isFinished = true;
        sensor.unsubscribeHeartRate();
        console.log('exit sport page!');
        router.push({
            uri: 'pages/index/index',
            params: {
                "selectedSportMode": this.currentSportMode,
                "userid": this.user._id,
            },
        });
    },
    stopSport(){
        this.onSport = false;
    },
    continueSport(){
        this.onSport = true;
    },
    openInterceptor(){
        this.$element('hintDialog').show();
    },
    closeInterceptor(){
        this.$element('hintDialog').close();
    },
    finishSport(){
        this.stopSport();
        this.isFinished = true;
        this.onSubmission = true;
        console.log(this.user._id);
        var sportTime = this.validCountSecond/60; // 按分钟计算
        let that = this;
        var fetch_url = getApp().data.local_url + "sportrecord/insert?userid=" + this.user._id
                        + "&calory=" + this.currentCalory + "&sport_min=" + sportTime
                        + "&sport_type=" + this.currentSportMode.idx;
        console.log(fetch_url);
        fetch.fetch({
            url: fetch_url,
            method: 'GET',
            success: function (response) {
                console.info("login fetch success" + JSON.stringify(response));
                let rawdata = JSON.parse(response.data) || {}; //原始JSON数据
                that.exitSport()
            },
            complete: function () {
                console.log("login fetch complete");
            },
            fail: function (error) {
                console.info("login fetch fail" + JSON.stringify(error));
                that.openInterceptor();
                that.onSubmission = false;
            }
        });
    },
    updateProgress(){
        let that = this;
        var fetch_url = getApp().data.local_url + "user/getCurrentCompetition?userid=" + this.user._id;
        console.log(fetch_url);
        fetch.fetch({
            url: fetch_url,
            method: 'GET',
            success: function (response) {
                console.info("getInfo fetch success" + JSON.stringify(response));
                let rawdata = JSON.parse(response.data) || {}; //原始JSON数据
                // 旧的逻辑，圆环表示卡路里数据，上限1500
//                that.myCalory = rawdata.myTeamCurrentData + that.currentCalory;
//                that.competitorCalory = rawdata.coTeamCurrentData;
//                if(that.myCalory<=that.competitorCalory){
//                    that.percent = that.myCalory/15;
//                    that.secondarypercent = that.competitorCalory/15;
//                    that.percentColor = '#E5A35F';
//                    that.secondaryColor = '#F2CCA6';
//                }else{
//                    that.percent = that.competitorCalory/15;
//                    that.secondarypercent = that.myCalory/15;
//                    that.percentColor = '#F2CCA6';
//                    that.secondaryColor = '#E5A35F';
//                }
                // 新的逻辑，圆环表示运动时间，上限暂定1000
                that.myTeamSportMin = rawdata.myTeamCurrentData + that.validCountSecond/60;
                that.coTeamSportMin = rawdata.coTeamCurrentData;
                if(that.myTeamSportMin <= that.coTeamSportMin){
                    that.percent = that.myTeamSportMin/10;
                    that.secondarypercent = that.coTeamSportMin/10;
                    that.percentColor = '#E5A35F';
                    that.secondaryColor = '#F2CCA6';
                }else{
                    that.percent = that.coTeamSportMin/10;
                    that.secondarypercent = that.myTeamSportMin/10;
                    that.percentColor = '#F2CCA6';
                    that.secondaryColor = '#E5A35F';
                }
            },
            complete: function () {
                console.log("getInfo fetch complete");
            },
            fail: function (error) {
                console.info("getInfo fetch fail" + JSON.stringify(error));
            }
        });
    },
}
