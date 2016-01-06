/// <reference path="../cocos2d-js-v3.6.js" />

var GLOBAL_DATA = {};
GLOBAL_DATA.__startIn3 = true;
GLOBAL_DATA.Music = true;
GLOBAL_DATA.Sound = true;

GLOBAL_DATA.BALL_POLL_MAX = 25;
GLOBAL_DATA.CURRENT_LEVEL = 1;
GLOBAL_DATA.DIFFICULT_LEVEL = 0;


GLOBAL_DATA.COMBO = 1;
GLOBAL_DATA.UserScore = 0;
GLOBAL_DATA.UserBest0 = 0;
GLOBAL_DATA.UserBest1 = 0;
GLOBAL_DATA.UserBest2 = 0;
GLOBAL_DATA.COLORS = [
     cc.color(255,100,41),
     cc.color(180,255,0),
     cc.color(0,255,255),
     cc.color(0,162,255),
     cc.color(255,0,255),
     cc.color(255,222,0),
     cc.color(255,255,255)

];


GLOBAL_DATA.EXT_BALL_1_PERCENT = 5;
GLOBAL_DATA.EXT_BALL_2_PERCENT = 5;
GLOBAL_DATA.EXT_BALL_3_PERCENT = 3;
GLOABL_WINDOW = {};


GLOBAL_DATA.resetNum = function () {
    GLOBAL_DATA.COMBO = 1;
    GLOBAL_DATA.UserScore = 0;
    GLOBAL_DATA.CURRENT_LEVEL = 1;
}


GLOBAL_DATA.save = function () {
    cc.sys.localStorage.setItem("UserBest0", GLOBAL_DATA.UserBest0+"");
    cc.sys.localStorage.setItem("UserBest1", GLOBAL_DATA.UserBest1+"");
    cc.sys.localStorage.setItem("UserBest2", GLOBAL_DATA.UserBest2+"");

    cc.sys.localStorage.setItem("Music", GLOBAL_DATA.Music+"");

    cc.sys.localStorage.setItem("Sound", GLOBAL_DATA.Sound+"");
  
}

GLOBAL_DATA.load = function () {
    var userBest0 = cc.sys.localStorage.getItem("UserBest0");
    GLOBAL_DATA.UserBest0 = userBest0 ? parseInt(userBest0) : 0;
    GLOBAL_DATA.UserBest0 = parseInt(GLOBAL_DATA.UserBest0);

    var userBest1 = cc.sys.localStorage.getItem("UserBest1");
    GLOBAL_DATA.UserBest1 = userBest1 ? parseInt(userBest1) : 0;
    GLOBAL_DATA.UserBest1 = parseInt(GLOBAL_DATA.UserBest1);

    var userBest2 = cc.sys.localStorage.getItem("UserBest2");
    GLOBAL_DATA.UserBest2 = userBest2 ? parseInt(userBest2) : 0;
    GLOBAL_DATA.UserBest2 = parseInt(GLOBAL_DATA.UserBest2);

  
    GLOBAL_DATA.Music = cc.sys.localStorage.getItem("Music") == "false" ? false : true;
    GLOBAL_DATA.Sound = cc.sys.localStorage.getItem("Sound") == "false" ? false : true;


}

GLOBAL_DATA.getBest = function () {
    return GLOBAL_DATA["UserBest" + GLOBAL_DATA.DIFFICULT_LEVEL];

}

GLOBAL_DATA.setBest = function (val) {
    GLOBAL_DATA["UserBest" + GLOBAL_DATA.DIFFICULT_LEVEL] = val;

}

GLOBAL_DATA.getDiffcultMode = function () {
    switch (GLOBAL_DATA.DIFFICULT_LEVEL) {
        case 0: return "Easy"; break;
        case 1: return "Normal"; break;
        case 2: return "Hard"; break;
    }
    return "Easy";
}



 