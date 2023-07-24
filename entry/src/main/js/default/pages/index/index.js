import router from '@system.router';
import fetch from '@system.fetch';
import app from '@system.app';

export default {
    data: {
        // 接收登录信息
        userid: "",
        //
        user:{},
        teammate: {},
        competitor0: {},
        competitor1: {},
        swiperindex: 1, // swiper默认在第几页
        // 运动模式
        sportMode:[],
        selectedSportMode:{
            idx: 0,
            name: '',
            percent: 0,
            kcalperhour: [],
            src: ''
        },
        heartRateLowerBound: 100,
        heartRateUpperBound: 220,
        getNewMedalDialog: false,


        /**
         * 团队竞技页相关数据
         */
        todayDate: '',  // 将今天的时间转化为串的形式展现
        // 直接用空对象接收，初始化的时候没法渲染，所以要声明好对象的属性再来接收
        user_show:{
            name: '',
            calory: 0,
            sport_min: 0,
            sportModeImg: '',
        },
        teammate_show:{
            name: '',
            calory: 0,
            sport_min: 0,
            sportModeImg: '',
        },
        myTeamCalory: 0,
        myTeamSportMin: 0,
        competitor0_show:{
            name: '',
            calory: 0,
            sport_min: 0,
            sportModeImg: '',
        },
        competitor1_show:{
            name: '',
            calory: 0,
            sport_min: 0,
            sportModeImg: '',
        },
        coTeamCalory: 0,
        coTeamSportMin: 0,
        stockDater: false,
        dayWin: true,
        winDialog: false,
        loseDialog: false,
        showNewWeekDialog: false,
        percent: 33,
        secondarypercent: 66,
        percentColor: '#E5A35F',
        secondaryColor: '#F2CCA6',
        yesterday: false,
        yesterdayWin: false,
        // 昨日数据
        nameList: [],
        caloryList: [],
        sportMinList: [],
        stateList: [],


        /**
         *  活动页相关数据
         */
        swiperindex2: 1,
        barData:[
            {
                day: '周一',
                dataUser: 0, // 以50为100%的值
                dataCompetitor: 0,
                win: true, // 如果user赢了，那么会在user的bar上加一颗星
            },
            {
                day: '周二',
                dataUser: 0,
                dataCompetitor: 0,
                win: true,
            },
            {
                day: '周三',
                dataUser: 0,
                dataCompetitor: 0,
                win: true,
            },
            {
                day: '周四',
                dataUser: 0,
                dataCompetitor: 0,
                win: true,
            },
            {
                day: '周五',
                dataUser: 0,
                dataCompetitor: 0,
                win: true,
            },
            {
                day: '周六',
                dataUser: 0,
                dataCompetitor: 0,
                win: true,
            },
            {
                day: '周日',
                dataUser: 0,
                dataCompetitor: 0,
                win: true,
            },
        ],
        barData1:[
            {
                day: '周一',
                dataUser: 0, // 以50为100%的值
                dataCompetitor: 0,
                win: true, // 如果user赢了，那么会在user的bar上加一颗星
            },
            {
                day: '周二',
                dataUser: 0,
                dataCompetitor: 0,
                win: true,
            },
            {
                day: '周三',
                dataUser: 0,
                dataCompetitor: 0,
                win: true,
            },
            {
                day: '周四',
                dataUser: 0,
                dataCompetitor: 0,
                win: true,
            },
            {
                day: '周五',
                dataUser: 0,
                dataCompetitor: 0,
                win: true,
            },
            {
                day: '周六',
                dataUser: 0,
                dataCompetitor: 0,
                win: true,
            },
            {
                day: '周日',
                dataUser: 0,
                dataCompetitor: 0,
                win: true,
            },
        ], // 第一周的竞赛数据
        barData2:[
            {
                day: '周一',
                dataUser: 0, // 以50为100%的值
                dataCompetitor: 0,
                win: true, // 如果user赢了，那么会在user的bar上加一颗星
            },
            {
                day: '周二',
                dataUser: 0,
                dataCompetitor: 0,
                win: true,
            },
            {
                day: '周三',
                dataUser: 0,
                dataCompetitor: 0,
                win: true,
            },
            {
                day: '周四',
                dataUser: 0,
                dataCompetitor: 0,
                win: true,
            },
            {
                day: '周五',
                dataUser: 0,
                dataCompetitor: 0,
                win: true,
            },
            {
                day: '周六',
                dataUser: 0,
                dataCompetitor: 0,
                win: true,
            },
            {
                day: '周日',
                dataUser: 0,
                dataCompetitor: 0,
                win: true,
            },
        ], // 第二周的竞赛数据
        showWeek2: false, // 是否显示第二周的数据，显然，如果还没进行到第二周，这个值只能是false
        week2: false,  // 是否进行到了第二周
        weekWin: true,  // todo 要根据barData中true多还是false多
        medals:[
            {
                name:'团队精神',
                src:'/common/images/medal_teamwork.png',
                src_denied:'/common/images/medal_teamwork_denied.png',
                abtained: false,
                description:'进行一次小组竞争运动即可获得'
            },
            {
                name:'超越自我',
                src:'/common/images/medal_beyond.png',
                src_denied:'/common/images/medal_beyond_denied.png',
                abtained: false,
                description:'队伍的卡路里超过之前某次记录即可获得'
            },
            {
                name:'拔得头筹',
                src:'/common/images/medal_get_first.png',
                src_denied:'/common/images/medal_get_first_denied.png',
                abtained: false,
                description:'在第一周竞赛中获得胜利即可获得'
            },
            {
                name:'完美一周',
                src:'/common/images/medal_perfect.png',
                src_denied:'/common/images/medal_perfect_denied.png',
                abtained: false,
                description:'在第二周竞赛中获得胜利即可获得'
            },
        ],
        new_medals:[0,1,2,3],
        selectedMedal:{},
        showMedalDialog:false,
        sportRecords:[],

        temp: 0,
    },
    onInit() {
        console.log(this.userid);
        this.getUserInfo();
    },
    async getUserInfo(){
        let that = this;
        var fetch_url = getApp().data.local_url + "user/getInfo?userid=" + this.userid;
        console.log(fetch_url);
        fetch.fetch({
            url: fetch_url,
            method: 'GET',
            success: function (response) {
                console.info("getInfo fetch success" + JSON.stringify(response));
                let rawdata = JSON.parse(response.data) || {}; //原始JSON数据
                that.getInfoYesterday(rawdata);
                // 获取运动页数据
                that.getSportData(rawdata);
                // 团队竞技页数据
                that.getCompetitionInfo(rawdata);
                that.returnToday();
                // 活动页数据
                that.getBarData(rawdata);
                that.getRecords(rawdata.records);
                that.refreshMedals();
                that.getMedals(rawdata);
                // 开启弹窗
                that.openNewWeekDialog();

            },
            complete: function () {
                console.log("getInfo fetch complete");
            },
            fail: function (error) {
                console.info("getInfo fetch fail" + JSON.stringify(error));
            }
        });
    },
    getInfoYesterday(rawdata){
        this.nameList = rawdata.nameList;
        this.caloryList = rawdata.caloryList;
        this.sportMinList = rawdata.sportMinList;
        this.stateList = rawdata.stateList;

    },

    /*
     * 团队竞技页
     * */
    // 显示日期
    getDateToShow(){
        if(!this.yesterday){
            var temps = new Date().toString().split(' ')
            this.todayDate = temps[1] + ' ' + temps[2] + ' ' + temps[3];
        }else{
            var temps = new Date(new Date().setDate(new Date().getDate() - 1)).toString().split(' ')
            this.todayDate = temps[1] + ' ' + temps[2] + ' ' + temps[3];
        }
    },
    // 获取团队竞技页的信息
    getCompetitionInfo(rawdata){
        this.user = rawdata.user;
        this.user.records = rawdata.records;
        this.teammate = rawdata.teammate;
        this.competitor0 = rawdata.competitor0;
        this.competitor1 = rawdata.competitor1;

        console.log(this.user.username);
        console.log(this.teammate_show.name);
        console.log(this.competitor0_show.name);
        console.log(this.competitor1_show.name);
    },
    updateProgress(){
        // 旧的逻辑，圆环表示卡路里数据，上限是1500kcal
//        if(this.myTeamCalory<=this.coTeamCalory){
//            this.percent = this.myTeamCalory/15;
//            this.secondarypercent = this.coTeamCalory/15;
//            this.percentColor = '#E5A35F';
//            this.secondaryColor = '#F2CCA6';
//        }else{
//            this.percent = this.coTeamCalory/15;
//            this.secondarypercent = this.myTeamCalory/15;
//            this.percentColor = '#F2CCA6';
//            this.secondaryColor = '#E5A35F';
//        }
        // 新的逻辑，圆环表示运动时间数据，上限1000
        if(this.myTeamSportMin<=this.coTeamSportMin){
            this.percent = this.myTeamSportMin/10;
            this.secondarypercent = this.coTeamSportMin/10;
            this.percentColor = '#E5A35F';
            this.secondaryColor = '#F2CCA6';
        }else{
            this.percent = this.coTeamSportMin/10;
            this.secondarypercent = this.myTeamSportMin/10;
            this.percentColor = '#F2CCA6';
            this.secondaryColor = '#E5A35F';
        }
    },
    checkYesterday(){
        if(this.nameList.length > 0){
            this.user_show.name = this.nameList[0];
            this.user_show.calory = this.caloryList[0];
            this.user_show.sport_min = this.sportMinList[0];
            this.user_show.sportModeImg = this.sportMode[Number(this.stateList[0])].src;

            this.teammate_show.name = this.nameList[1];
            this.teammate_show.calory = this.caloryList[1];
            this.teammate_show.sport_min = this.sportMinList[1];
            this.teammate_show.sportModeImg = this.sportMode[Number(this.stateList[1])].src;

            this.competitor0_show.name = this.nameList[2];
            this.competitor0_show.calory = this.caloryList[2];
            this.competitor0_show.sport_min = this.sportMinList[2];
            this.competitor0_show.sportModeImg = this.sportMode[Number(this.stateList[2])].src;

            this.competitor1_show.name = this.nameList[3];
            this.competitor1_show.calory = this.caloryList[3];
            this.competitor1_show.sport_min = this.sportMinList[3];
            this.competitor1_show.sportModeImg = this.sportMode[Number(this.stateList[3])].src;

            this.myTeamCalory = this.user_show.calory + this.teammate_show.calory;
            this.myTeamSportMin = this.user_show.sport_min + this.teammate_show.sport_min;
            this.coTeamCalory = this.competitor0_show.calory + this.competitor1_show.calory;
            this.coTeamSportMin = this.competitor0_show.sport_min + this.competitor1_show.sport_min;

            // 旧的逻辑，用卡路里判断
//            if(this.myTeamCalory >= this.coTeamCalory){
//                this.yesterdayWin = true;
//            }
//            else{
//                this.yesterdayWin = false;
//            }
            // 新的逻辑，用运动时间判断
            if(this.myTeamSportMin >= this.coTeamSportMin){
                this.yesterdayWin = true;
            }
            else{
                this.yesterdayWin = false;
            }
            this.yesterday = true;
            this.updateProgress();
            this.getDateToShow();
        }else{
            this.$element('hintDialogYesterday1').show();
        }

    },
    returnToday(){
        this.myTeamCalory = this.user.today_kcal + this.teammate.today_kcal;
        this.myTeamSportMin = this.user.today_exmin + this.teammate.today_exmin;
        this.coTeamCalory = this.competitor0.today_kcal + this.competitor1.today_kcal;
        this.coTeamSportMin = this.competitor0.today_exmin + this.competitor1.today_exmin;

        this.user_show.name = this.user.username;
        this.user_show.calory = this.user.today_kcal;
        this.user_show.sport_min = this.user.today_exmin;
        this.user_show.sportModeImg = this.sportMode[Number(this.user.today_sportstate)].src;

        this.teammate_show.name = this.teammate.username;
        this.teammate_show.calory = this.teammate.today_kcal;
        this.teammate_show.sport_min = this.teammate.today_exmin;
        this.teammate_show.sportModeImg = this.sportMode[Number(this.teammate.today_sportstate)].src;

        this.competitor0_show.name = this.competitor0.username;
        this.competitor0_show.calory = this.competitor0.today_kcal;
        this.competitor0_show.sport_min = this.competitor0.today_exmin;
        this.competitor0_show.sportModeImg = this.sportMode[Number(this.competitor0.today_sportstate)].src;

        this.competitor1_show.name = this.competitor1.username;
        this.competitor1_show.calory = this.competitor1.today_kcal;
        this.competitor1_show.sport_min = this.competitor1.today_exmin;
        this.competitor1_show.sportModeImg = this.sportMode[Number(this.competitor1.today_sportstate)].src;

        this.yesterday = false;
        this.updateProgress();
        this.getDateToShow();
        console.log('return today done!');
    },
    closeDialog(){
        this.$element('hintDialogYesterday1').close();
        this.$element('hintDialogYesterday2').close();
    },

    /*
     * 首页运动页相关函数
     * */
    getSportData(rawdata){
        rawdata.sportMode.forEach((i)=>{
            this.sportMode.push(i);
        })
        if(this.selectedSportMode.src==''){
            this.selectedSportMode = this.sportMode[1];
        }
        this.heartRateLowerBound = rawdata.heartRateLowerBound;
        this.heartRateUpperBound = rawdata.heartRateUpperBound;
        console.log('心率阈值');
        console.log(this.heartRateLowerBound);
        console.log(this.heartRateUpperBound);
    },
    prevSportMode(){
        var len = this.sportMode.length;
        var prev_idx = (this.selectedSportMode.idx-1) % len;
        if(prev_idx == 0){
            prev_idx = len - 1 ;
        }
        this.selectedSportMode = this.sportMode[prev_idx];
    },
    nextSportMode(){
        var len = this.sportMode.length;
        var next_idx = (this.selectedSportMode.idx+1) % len;
        if(next_idx == 0){
            next_idx += 1;
        }
        this.selectedSportMode = this.sportMode[next_idx];
    },
    beginSport(){
        router.push({
            uri: 'pages/sport/sport',
            params: {
                "currentSportMode": this.selectedSportMode,
                "user": this.user,
                "heartRateLowerBound": this.heartRateLowerBound,
                "heartRateUpperBound": this.heartRateUpperBound,
            },
        });
    },

    /*
     * 活动页相关函数
     * */
    // 获取条形统计图数据
    getBarData(rawdata){
        var myTeamScores = rawdata.myTeamScores;
        var coTeamScores = rawdata.coTeamScores;
        var length = myTeamScores.length;
        this.barData1.forEach((i)=>{
            i.win = false;
        })
        this.barData2.forEach((i)=>{
            i.win = false;
        })
        if(length<=7){
            for(var i = 0; i < length; i++){
                this.barData1[i].dataUser = myTeamScores[i]/20;
                this.barData1[i].dataCompetitor = coTeamScores[i]/20;
                if(myTeamScores[i] >= coTeamScores[i]){
                    this.barData1[i].win = true;
                }
            }
            this.week2 = false;
        }else{
            for(var i = 0; i < 7; i++){
                this.barData1[i].dataUser = myTeamScores[i]/20;
                this.barData1[i].dataCompetitor = coTeamScores[i]/20;
                if(myTeamScores[i] >= coTeamScores[i]){
                    this.barData1[i].win = true;
                }
            }
            for(var i = 7; i < length; i++){
                this.barData2[i-7].dataUser = myTeamScores[i]/20;
                this.barData2[i-7].dataCompetitor = coTeamScores[i]/20;
                if(myTeamScores[i] >= coTeamScores[i]){
                    this.barData2[i-7].win = true;
                }
            }
            this.week2 = true;
            this.showWeek2 = true;
        }
        this.showWeekData();
        console.log('get bar data done!');
    },
    changeWeekData(){
        if(this.week2){
            if(this.showWeek2){
                this.showWeek2 = false;
            }else{
                this.showWeek2 = true;
            }
        }
        console.log(this.showWeek2);
        this.showWeekData();
    },
    showWeekData(){
        if(this.showWeek2){
            this.barData = this.barData2;
            var winCount = 0;
            this.barData.forEach((i)=>{
                if(i.win) winCount += 1;
            })
            this.weekWin = (winCount>=4)? true:false;
        }else{
            this.barData = this.barData1;
            var winCount = 0;
            this.barData.forEach((i)=>{
                if(i.win) winCount += 1;
            })
            this.weekWin = (winCount>=4)? true:false;
        }
    },
    // 获取勋章函数总入口
    getMedals(rawdata){
//        console.log("a new day?");
//        console.log(rawdata.user.newDay);
//        console.log("a new week?");
//        console.log(rawdata.user.newWeek);
        this.new_medals.length = 0;
        if(rawdata.user.newDay){
            this.getMedal0(rawdata.myTeamScores, rawdata.coTeamScores);
            this.getMedal1(rawdata.myTeamScores);
        }
        if(rawdata.user.newWeek){
            this.getMedal2();
            this.getMedal3();
        }
        if(this.new_medals.length > 0){
            this.updateMedals();
        }
    },
    // 获取“团队精神”徽章的触发条件
    // 每天第一次登录的时候，如果获得，则触发
    getMedal0(myTeamScores, coTeamScores){
        if(!this.user.medals[0]){
            console.log('记录长度：');
            console.log(myTeamScores.length);
            for(var i = 0; i < myTeamScores.length; i++){
                if(myTeamScores[i] > coTeamScores[i]){
                    this.user.medals[0] = true;
                    this.new_medals.push(0);
                    break;
                }
            }
        }
    },
    // 获取“超越自我”徽章的触发条件
    // 每天第一次登录的时候，如果获得，则触发
    getMedal1(myTeamScores){
        if(!this.user.medals[1]){
            for(var i = 1; i < myTeamScores.length; i++){
                if(myTeamScores[i]>myTeamScores[i-1]){
                    this.user.medals[1] = true;
                    this.new_medals.push(1);
                    break;
                }
            }
        }
    },
    // 获取“拔得头筹”徽章的触发条件
    // 第二周开始的第一天，第一次登录的时候，如果获得，则触发
    getMedal2(){
        if(!this.user.medals[2]){
            var winCount = 0;
            this.barData1.forEach((i)=>{
                if(i.win) winCount += 1;
            })
            if(winCount>=4){
                this.user.medals[2] = true;
                this.new_medals.push(2);
            }
        }
    },
    // 获取“完美一周”徽章的触发条件
    // 第二周结束后，第一次登录，如果获得，则触发
    getMedal3(){
        if(!this.user.medals[3]){
            var winCount = 0;
            this.barData2.forEach((i)=>{
                if(i.win) winCount += 1;
            })
            if(winCount>=4){
                this.user.medals[3] = true;
                this.new_medals.push(3);
            }
        }
    },
    // 将新获得的徽章写入后端数据库
    updateMedals(){
        let that = this;
        var medal_code = 0;
        if(this.user.medals[0]) medal_code = medal_code + 8;
        if(this.user.medals[1]) medal_code = medal_code + 4;
        if(this.user.medals[2]) medal_code = medal_code + 2;
        if(this.user.medals[3]) medal_code = medal_code + 1;
        var fetch_url = getApp().data.local_url + "user/updateMedals?username=" + this.user.username + "&medal=" + medal_code.toString();
        console.log(fetch_url);
        fetch.fetch({
            url: fetch_url,
            method: 'GET',
            success: function (response) {
                console.info("update medals success" + JSON.stringify(response));
                that.refreshMedals();
            },
            complete: function () {
                console.log("update medals complete");
            },
            fail: function (error) {
                console.info("update medals fail" + JSON.stringify(error));
            }
        });
    },
    // 刷新前端medals显示
    refreshMedals(){
        for(var i = 0; i<4; i++){
            if(this.user.medals[i]){
                this.medals[i].abtained = true;
            }
        }
    },
    // 获取用户个人运动纪录
    getRecords(records){
        console.log(records.length);
        records.forEach((r)=>{
            // 注意，这里r.createdAt经过json解析后变成了string类型
            var yyyy_mm_dd = r.createdAt.split('T')[0];
            var record = {
                calory: r.calory,
                sport_min: r.sport_min,
                month_date: yyyy_mm_dd.split('-')[1] + '-' + yyyy_mm_dd.split('-')[2],
            }
            this.sportRecords.push(record);
        })
    },

    /*
     * 一系列弹窗行为
     * */
    // 每周弹窗
    openNewWeekDialog(){
        if(this.user.newWeek){
            this.swiperindex = 2;
            this.showNewWeekDialog = true;
            console.log('新的一周！');
        }else{
            if(this.user.newDay){
                console.log('新的一天！');
                this.openWinOrLoseDialog();
            }
        }
    },
    closeNewWeekDialog(){
        this.showNewWeekDialog = false;
        if(this.user.newDay){
            console.log('新的一天！');
            this.openWinOrLoseDialog();
        }
    },
    // 每日弹窗
    openWinOrLoseDialog(){
        if(this.nameList.length == 0){
            this.$element('hintDialogYesterday1').show();
            // 如果是第一天登录，自然也就不用考虑勋章弹窗了。
        }else{
            this.swiperindex = 2;
            var myTeamSportMin = this.sportMinList[0] + this.sportMinList[1];
            var coTeamSportMin = this.sportMinList[2] + this.sportMinList[3];
            if(myTeamSportMin >= coTeamSportMin){
                this.winDialog = true;
                this.loseDialog = false;
            }
            else{
                this.winDialog = false;
                this.loseDialog = true;
            }
        }
    },
    closeWinDialog(){
        this.winDialog = false;
        this.openNewMedalDialog(); // 紧接着判断是否获得了新徽章
    },
    closeLoseDialog(){
        this.loseDialog = false;
        this.openNewMedalDialog(); // 紧接着判断是否获得了新徽章
    },
    // 获得新徽章的弹窗
    openNewMedalDialog(){
        if(this.new_medals.length > 0){
            this.getNewMedalDialog = true;
        }
    },
    checkNewMedalDialog(){
        this.getNewMedalDialog = false;
        this.selectedMedal={};
        this.openMedalDialogNew();
    },
    closeNewMedalDialog(){
        this.getNewMedalDialog = false;
        this.selectedMedal={};
        this.new_medals.length = 0;

    },
    openMedalDialogNew(){
        console.log(this.new_medals.length);
        if(this.new_medals.length > 0){
            var medal_idx = this.new_medals.shift();
            this.openMedalDialog(this.medals[medal_idx]);
        }
    },
    openMedalDialog(medal){
        console.log(medal.name);
        console.log(medal.description);
        this.selectedMedal = medal;
        this.showMedalDialog = true;
    },
    closeMedalDialog(){
        this.showMedalDialog = false;
        this.selectedMedal = {};
        if(this.new_medals.length > 0){
            this.openMedalDialogNew();
        }
    },

    /**
     * 退出登录
     */
    appExit(){
        app.terminate();
    },
}
