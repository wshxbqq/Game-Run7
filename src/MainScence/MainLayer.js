/// <reference path="../Util/util.js" />
/// <reference path="../GLOBAL_DATA.js" />
/// <reference path="../../cocos2d-js-v3.6.js" />


var MainLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.colorPanel;
        this.currentBg;
        this.init();
        return true;
    },

    init: function () {
 
        if (!cc.sys.isNative) {
            changeColorBg("res/mainBG_wx.jpg", 0);
            var canvas = document.querySelector("canvas");
            canvas.style.webkitTransform = "scale(1.01)";
          
        }
        var _this = this;
        GLOABL_WINDOW.MAIN = this;
        GLOBAL_DATA.load();
        var _eventCfg = {};
        _eventCfg.event = cc.EventListener.TOUCH_ALL_AT_ONCE;
        if (this.onTouchesBegan) { _eventCfg.onTouchesBegan = this.onTouchesBegan; }
        if (this.onTouchesMoved) { _eventCfg.onTouchesMoved = this.onTouchesMoved; }
        if (this.onTouchesEnded) { _eventCfg.onTouchesEnded = this.onTouchesEnded; }
        cc.eventManager.addListener(cc.EventListener.create(_eventCfg), this);
        //this.scheduleUpdate();

        var mainscene = ccs.load(res["res@MainScene.json"]);
        this.addChild(mainscene.node);
        
        var mainPanel = this.mainPanel = mainscene.node.getChildByName("Panel_BG");
        //this.colorPanel = mainscene.node.getChildByName("Panel_Color");
        //this.currentBg = Util.createColorSprite();
        //this.colorPanel.addChild(this.currentBg);

        if (!cc.sys.isNative) {
            var particle2 = mainPanel.getChildByName("Particle_2");
            particle2.removeFromParent();
        }


        var buttonCFG = mainPanel.getChildByName("Button_CFG");
 
        buttonCFG.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                var cfgLayer1 = ccs.load(res["res@LayerCfgPanel1.json"]);

                _this.addChild(cfgLayer1.node);
                cfgLayer1.node.setOpacity(0);
                cfgLayer1.node.runAction(cc.fadeIn(0.3));
                mainPanel.runAction(cc.fadeOut(0.3));
                

                var cfgBg = cfgLayer1.node.getChildByName("Panel_CFG_BG");
                cfgBg.addTouchEventListener(function (sender, type) {
                    if (type == ccui.Widget.TOUCH_ENDED) {
                        var a1 = cc.fadeOut(0.3);
                        var c1 = cc.callFunc(function () {
                            cfgLayer1.node.removeFromParent();
                        }, _this)
                        var queue = cc.sequence(a1, c1);
                        cfgLayer1.node.runAction(queue);
                        mainPanel.runAction(cc.fadeIn(0.3));
                        if (!cc.sys.isNative) {
                            window.hideBigMask();
                        }
                    }
                });

                CfgPanelControl1.init(cfgLayer1, _this);
                CfgPanelControl1.runActions();
                CfgPanelControl1.bind();
                if (!cc.sys.isNative) {
                    window.showBigMask();
                }
            }
        }, this);

        var a1 = cc.scaleTo(0.2, 1.1, 0.9);
        var a2 = cc.scaleTo(0.2, 0.9, 1.1);
        var a3 = cc.scaleTo(0.2, 1.0, 1.0);
        var que = cc.sequence(a1, a2, a3);
        que.retain();

        var buttonEasy = mainPanel.getChildByName("Button_Easy");
        buttonEasy.setTitleText(Util.getText("easy_mode"));
        buttonEasy.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                GLOBAL_DATA.DIFFICULT_LEVEL = 0;
                GLOBAL_DATA.BALL_POLL_MAX = 25;
                Util.playEffic("res/Audio/buttonMusic.mp3");
                cc.director.runScene(new GameScence());

            }
        }, this);
        setTimeout(function () { buttonEasy.runAction(que.clone()); }, 100);
        

        var buttonNormal = mainPanel.getChildByName("Button_Normal");
        buttonNormal.setTitleText(Util.getText("normal_mode"));
        buttonNormal.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                GLOBAL_DATA.DIFFICULT_LEVEL = 1;
                GLOBAL_DATA.BALL_POLL_MAX = 12;
                Util.playEffic("res/Audio/buttonMusic.mp3");
                cc.director.runScene(new GameScence());
            }
        }, this);
        setTimeout(function () { buttonNormal.runAction(que.clone()); }, 200);

        var buttonHard = mainPanel.getChildByName("Button_Hard");
        buttonHard.setTitleText(Util.getText("hard_mode"));
        buttonHard.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                GLOBAL_DATA.DIFFICULT_LEVEL = 2;
                GLOBAL_DATA.BALL_POLL_MAX = 6;
                Util.playEffic("res/Audio/buttonMusic.mp3");
                cc.director.runScene(new GameScence());
            }
        }, this);
        setTimeout(function () { buttonHard.runAction(que.clone()); }, 300);

        var howPlay = mainPanel.getChildByName("Button_How_Play");
        howPlay.setTitleText(Util.getText("how_to_play"));
        howPlay.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                Util.playEffic("res/Audio/buttonMusic.mp3");
                cc.director.runScene(new GameGuideScence());
            }
        }, this);

 
    },

    changeBg: function () {
        var newSpriteBg = Util.createColorSprite();
        newSpriteBg.setOpacity(0);
        this.colorPanel.addChild(newSpriteBg);
        var a1 = cc.fadeIn(2);
        var a2 = cc.fadeOut(2);
        this.currentBg.runAction(a2);
        newSpriteBg.runAction(a1);

    },


    update: function (dt) {

    },


    onTouchesBegan: function (touches, event) {
        var touch = touches[0];
        var location = touch.getLocation();
        var target = event.getCurrentTarget();


        console.log(111);
        //event.stopPropagation();
        return false
    },
    onTouchesMoved: function (touches, event) {
        var touch = touches[0];
        var location = touch.getLocation();
        var target = event.getCurrentTarget();

        //event.stopPropagation();
    },
    onTouchesEnded: function (touches, event) {
        var touch = touches[0];
        var location = touch.getLocation();
        var target = event.getCurrentTarget();
        //event.stopPropagation();
    },
    onEnter: function () {
        this._super();
    },
    onExit: function () {
        this._super();
    }
});