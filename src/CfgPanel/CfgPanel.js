/// <reference path="../../cocos2d-js-v3.6.js" />

var CfgPanelControl = {};

CfgPanelControl.init = function (cfgLayer, parentLayer) {

    Util.playEffic("res/Audio/buttonMusic1.mp3");
    var a1 = cc.scaleTo(0.2, 1.1, 0.9);
    var a2 = cc.scaleTo(0.2, 0.9, 1.1);
    var a3 = cc.scaleTo(0.2, 1.0, 1.0);
    CfgPanelControl.que = cc.sequence(a1, a2, a3);
    CfgPanelControl.que.retain();

    CfgPanelControl.cfgLayer = cfgLayer;

    CfgPanelControl.parentLayer = parentLayer;

    CfgPanelControl.panelBg = cfgLayer.node.getChildByName("Panel_CFG_BG");

    CfgPanelControl.restartBtn = CfgPanelControl.panelBg.getChildByName("Button_Restart");
    CfgPanelControl.restartBtn.setTitleText(Util.getText("reset_game"));
     
 
    CfgPanelControl.lobbyBtn = CfgPanelControl.panelBg.getChildByName("Button_Lobby");
    CfgPanelControl.lobbyBtn.setTitleText(Util.getText("back_to_lobby"));

    CfgPanelControl.rankBtn = CfgPanelControl.panelBg.getChildByName("Button_Ranking");
    CfgPanelControl.rankBtn.setTitleText(Util.getText("rank"));

    CfgPanelControl.shareBtn = CfgPanelControl.panelBg.getChildByName("Button_Share");
    CfgPanelControl.shareBtn.setTitleText(Util.getText("share"));

    CfgPanelControl.sureBtn = CfgPanelControl.panelBg.getChildByName("Button_Sure");
    CfgPanelControl.sureBtn.setTitleText(Util.getText("ok"));

    CfgPanelControl.backBtn = CfgPanelControl.panelBg.getChildByName("Button_Back");
    CfgPanelControl.backBtn.setTitleText(Util.getText("cancel"));


    CfgPanelControl.musicCkb = cfgLayer.node.getChildByName("Panel_CFG_BG").getChildByName("CheckBox_Music");

    CfgPanelControl.soundCkb = cfgLayer.node.getChildByName("Panel_CFG_BG").getChildByName("CheckBox_Sound");
 

    CfgPanelControl.musicCkb.addEventListener(function (sender, type) {
        switch (type) {
            case ccui.CheckBox.EVENT_SELECTED:
                GLOBAL_DATA.Music = !GLOBAL_DATA.Music;
                CfgPanelControl.musicCkb.setSelected(!!GLOBAL_DATA.Music);
                GLOBAL_DATA.save();
                Util.playEffic("res/Audio/buttonMusic2.mp3");
                break;
            case ccui.CheckBox.EVENT_UNSELECTED:
                GLOBAL_DATA.Music = !GLOBAL_DATA.Music;
                CfgPanelControl.musicCkb.setSelected(!!GLOBAL_DATA.Music);
                GLOBAL_DATA.save();
                Util.playEffic("res/Audio/buttonMusic2.mp3");
                break;

            default:
                break;
        }
        if (!GLOBAL_DATA.Music) {
            Util.StopMusic();
        } else {
            if (!cc.audioEngine.isMusicPlaying()) {
                Util.playMusic("res/Audio/bg.mp3", 1);
            }
        }
    }, cfgLayer);

    CfgPanelControl.soundCkb.addEventListener(function (sender, type) {
        switch (type) {
            case ccui.CheckBox.EVENT_SELECTED:
                GLOBAL_DATA.Sound = !GLOBAL_DATA.Sound;
                CfgPanelControl.soundCkb.setSelected(!!GLOBAL_DATA.Sound);
                GLOBAL_DATA.save();
                Util.playEffic("res/Audio/buttonMusic2.mp3");
                break;
            case ccui.CheckBox.EVENT_UNSELECTED:
                GLOBAL_DATA.Sound = !GLOBAL_DATA.Sound;
                CfgPanelControl.soundCkb.setSelected(!!GLOBAL_DATA.Sound);
                GLOBAL_DATA.save();
                Util.playEffic("res/Audio/buttonMusic2.mp3");
                break;

            default:
                break;
        }
    }, cfgLayer);


 
 
    CfgPanelControl.musicCkb.setSelected(!!GLOBAL_DATA.Music);
    CfgPanelControl.soundCkb.setSelected(!!GLOBAL_DATA.Sound);


 

};
CfgPanelControl.runActions = function () {
    
  
    setTimeout(function () { CfgPanelControl.restartBtn.runAction(CfgPanelControl.que.clone()); }, 0);
    setTimeout(function () { CfgPanelControl.lobbyBtn.runAction(CfgPanelControl.que.clone()); }, 100);
    setTimeout(function () { CfgPanelControl.rankBtn.runAction(CfgPanelControl.que.clone()); }, 200);
    setTimeout(function () { CfgPanelControl.shareBtn.runAction(CfgPanelControl.que.clone()); }, 300);

}

CfgPanelControl.bind = function () {
    
    CfgPanelControl.restartBtn.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            Util.playEffic("res/Audio/buttonMusic.mp3");
            cc.director.runScene(new GameScence());
        }
    })

    CfgPanelControl.lobbyBtn.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            CfgPanelControl.panelBg.runAction(cc.moveTo(0.3, cc.p(-640, 0)));
            setTimeout(function () { CfgPanelControl.sureBtn.runAction(CfgPanelControl.que.clone()); }, 200);
            setTimeout(function () { CfgPanelControl.backBtn.runAction(CfgPanelControl.que.clone()); }, 300);
            Util.playEffic("res/Audio/buttonMusic.mp3");
        }
    })

    CfgPanelControl.rankBtn.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
       
            Util.playEffic("res/Audio/buttonMusic.mp3");
            if (cc.sys.isNative) {
                $.device.gameCenter_ShowLeaderboard();
            }
        }
    })

    CfgPanelControl.shareBtn.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
          
            Util.playEffic("res/Audio/buttonMusic.mp3");
            Util.goShare();
        }
    })



    CfgPanelControl.sureBtn.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            console.log("sureBtn");
            Util.playEffic("res/Audio/buttonMusic.mp3");
            cc.director.runScene(new MainScence());
        }
    })

    CfgPanelControl.backBtn.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            CfgPanelControl.panelBg.runAction(cc.moveTo(0.3, cc.p(0, 0)));
            setTimeout(function () { CfgPanelControl.restartBtn.runAction(CfgPanelControl.que.clone()); }, 0);
            setTimeout(function () { CfgPanelControl.lobbyBtn.runAction(CfgPanelControl.que.clone()); }, 100);
            setTimeout(function () { CfgPanelControl.rankBtn.runAction(CfgPanelControl.que.clone()); }, 200);
            setTimeout(function () { CfgPanelControl.shareBtn.runAction(CfgPanelControl.que.clone()); }, 300);
            Util.playEffic("res/Audio/buttonMusic.mp3");
        }
    })


}