/// <reference path="../../cocos2d-js-v3.6.js" />
/// <reference path="../Util/util.js" />
/// <reference path="../GLOBAL_DATA.js" />


var CfgPanelControl1 = {};

CfgPanelControl1.init = function (cfgLayer, parentLayer) {
    Util.playEffic("res/Audio/buttonMusic1.mp3");
    CfgPanelControl1.cfgLayer = cfgLayer;

    CfgPanelControl1.parentLayer = parentLayer;

 
 

    CfgPanelControl1.rankBtn = cfgLayer.node.getChildByName("Panel_CFG_BG").getChildByName("Button_Ranking");
    CfgPanelControl1.rankBtn.setTitleText(Util.getText("rank"));

    CfgPanelControl1.shareBtn = cfgLayer.node.getChildByName("Panel_CFG_BG").getChildByName("Button_Share");
    CfgPanelControl1.shareBtn.setTitleText(Util.getText("share"));

    CfgPanelControl1.musicCkb = cfgLayer.node.getChildByName("Panel_CFG_BG").getChildByName("CheckBox_Music");
 
    CfgPanelControl1.soundCkb = cfgLayer.node.getChildByName("Panel_CFG_BG").getChildByName("CheckBox_Sound");


    CfgPanelControl1.musicCkb.addEventListener(function (sender, type) {
        switch (type) {
            case ccui.CheckBox.EVENT_SELECTED:
                GLOBAL_DATA.Music = !GLOBAL_DATA.Music;
                CfgPanelControl1.musicCkb.setSelected(!!GLOBAL_DATA.Music);
                GLOBAL_DATA.save();
                Util.playEffic("res/Audio/buttonMusic2.mp3");
                break;
            case ccui.CheckBox.EVENT_UNSELECTED:
                GLOBAL_DATA.Music = !GLOBAL_DATA.Music;
                CfgPanelControl1.musicCkb.setSelected(!!GLOBAL_DATA.Music);
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

    CfgPanelControl1.soundCkb.addEventListener(function (sender, type) {
        switch (type) {
            case ccui.CheckBox.EVENT_SELECTED:
                GLOBAL_DATA.Sound = !GLOBAL_DATA.Sound;
                CfgPanelControl1.soundCkb.setSelected(!!GLOBAL_DATA.Sound);
                GLOBAL_DATA.save();
                Util.playEffic("res/Audio/buttonMusic2.mp3");
                break;
            case ccui.CheckBox.EVENT_UNSELECTED:
                GLOBAL_DATA.Sound = !GLOBAL_DATA.Sound;
                CfgPanelControl1.soundCkb.setSelected(!!GLOBAL_DATA.Sound);
                GLOBAL_DATA.save();
                Util.playEffic("res/Audio/buttonMusic2.mp3");
                break;

            default:
                break;
        }
    }, cfgLayer);


    CfgPanelControl1.musicCkb.setSelected(!!GLOBAL_DATA.Music);
    CfgPanelControl1.soundCkb.setSelected(!!GLOBAL_DATA.Sound);
 

};
CfgPanelControl1.runActions = function () {
    var a1 = cc.scaleTo(0.2, 1.1, 0.9);
    var a2 = cc.scaleTo(0.2, 0.9, 1.1);
    var a3 = cc.scaleTo(0.2, 1.0, 1.0);
    var que = cc.sequence(a1, a2, a3);
    que.retain();
 
    setTimeout(function () { CfgPanelControl1.rankBtn.runAction(que.clone()); }, 200);
    setTimeout(function () { CfgPanelControl1.shareBtn.runAction(que); }, 300);

}

CfgPanelControl1.bind = function () {
 

    CfgPanelControl1.rankBtn.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
 
            Util.playEffic("res/Audio/buttonMusic.mp3");
            if (cc.sys.isNative) {

                $.device.gameCenter_ShowLeaderboard();
               
            }
        }
    })

    CfgPanelControl1.shareBtn.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
             
            Util.playEffic("res/Audio/buttonMusic.mp3");
            Util.goShare();
        }
    })


}