/// <reference path="../Util/util.js" />
/// <reference path="../GLOBAL_DATA.js" />
/// <reference path="../../cocos2d-js-v3.6.js" />
var GameOverLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
        return true;
    },

    init: function () {
        if (!cc.sys.isNative) {
            setTimeout(function () {
                window.showapp_ad();
                window.changeColorBg("res/mainBG_over_wx.jpg", 0);
            }, 1500);
            
        }
        
        var _this = this;

        var mainscene = ccs.load(res["res@GameOver.json"]);
        this.addChild(mainscene.node);
        
        var mainPanel = mainscene.node.getChildByName("Panel_BG");
        window.zzz = mainPanel;

        var buttonAgain = mainPanel.getChildByName("Button_Again");
        buttonAgain.setTitleText(Util.getText("reset_game"));
        buttonAgain.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                Util.playEffic("res/Audio/buttonMusic.mp3");
                cc.director.runScene(new GameScence());
            }
        }, this);

      

        var buttonLobby = mainPanel.getChildByName("Button_Lobby");
        buttonLobby.setTitleText(Util.getText("back_to_lobby"));
        buttonLobby.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                Util.playEffic("res/Audio/buttonMusic.mp3");
                cc.director.runScene(cc.TransitionCrossFade.create(1, new MainScence()));
                

            }
        }, this);

        var buttonShare = mainPanel.getChildByName("Button_Share");
        buttonShare.setTitleText(Util.getText("share"));
        buttonShare.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                Util.playEffic("res/Audio/buttonMusic.mp3");
                Util.goShare();


            }
        }, this);


        var textScore = mainPanel.getChildByName("Text_Score");
        textScore.setString($.formatNum(GLOBAL_DATA.UserScore));
        


        var textBest = mainPanel.getChildByName("Text_Best");
        textBest.setString($.formatNum(GLOBAL_DATA.getBest()));



        var textMode = mainPanel.getChildByName("Text_Mode");
        textMode.setString($.formatNum(GLOBAL_DATA.getDiffcultMode()));
        
        var __id;
        if (cc.sys.isNative) {
            if (cc.sys.language.toLowerCase() == "zh") {
                __id = "50";
            } else {
                __id = "50";
            }

        } else {
            __id = 38;
        }
        switch (GLOBAL_DATA.DIFFICULT_LEVEL) {
            case 0: $.device.gameCenter_ReportScore(GLOBAL_DATA.UserScore,"score_rank"); break;
            case 1: $.device.gameCenter_ReportScore(GLOBAL_DATA.UserScore, "score_rank1"); break;
            case 2: $.device.gameCenter_ReportScore(GLOBAL_DATA.UserScore, "score_rank2"); break;
        }
        
        $.dcUserDefault(__id, GLOBAL_DATA.UserScore, GLOBAL_DATA.DIFFICULT_LEVEL + "_" + GLOBAL_DATA.CURRENT_LEVEL);
 
    },
    onEnter: function () {
        this._super();
    },
    onExit: function () {
        this._super();
    }
});