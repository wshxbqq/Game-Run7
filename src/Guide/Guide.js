/// <reference path="../Util/underscore.js" />
/// <reference path="../Util/JQ.js" />
/// <reference path="../Util/util.js" />
/// <reference path="../GLOBAL_DATA.js" />
/// <reference path="../../cocos2d-js-v3.6.js" />


var Guide = {};
Guide.currentIdx = 1;
Guide.status = 0;
Guide.currentGuideLayer;

Guide.showStep1 = function () {
    Guide.status = 1;
    Guide.currentIdx = 1;
    var mainscene = ccs.load(res["res@LayerGuide1.json"]);
    GLOBAL_LAYER.addChild(mainscene.node,50);

    var mainPanel = mainscene.node.getChildByName("Panel_G1");

    var title = mainPanel.getChildByName("Image_G1_Title");

    title.getChildByName("guide_touch_to_go").setString(Util.getText("touch_to_continue"));
    title.getChildByName("guide_1_1").setString(Util.getText("guide_1_1"));
    title.getChildByName("guide_1_2").setString(Util.getText("guide_1_2"));
    title.getChildByName("guide_1_3").setString(Util.getText("guide_1_3"));

    var a1 = cc.scaleTo(0.2, 1, 1);
    title.runAction(a1);
    function goNext() {
        Guide.currentGuideLayer = undefined;
        mainscene.node.removeFromParent();
        Guide.showStep2();
        Util.playEffic("res/Audio/ball_move.mp3");
    }
    mainPanel.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            goNext();
        }
    });
    title.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            goNext();
        }
    });
    
    Guide.currentGuideLayer = mainscene.node;

}


Guide.showStep2 = function () {
    Guide.status = 1;
    Guide.currentIdx = 2;
    var mainscene = ccs.load(res["res@LayerGuide2.json"]);
    GLOBAL_LAYER.addChild(mainscene.node, 50);

    var mainPanel = mainscene.node.getChildByName("Panel_G2");

    var title = mainPanel.getChildByName("Image_G2_Title");


    title.getChildByName("guide_2_1").setString(Util.getText("guide_2_1"));
 


    var a1 = cc.scaleTo(0.2, 1, 1);
    title.runAction(a1);
    function goNext() {
        mainscene.node.removeFromParent();
        GLOBAL_LAYER.touchAt(3);
        Util.playEffic("res/Audio/ball_move.mp3");
       
    }

    var touchArea = mainPanel.getChildByName("Panel_Touch_Area_2");

    touchArea.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            goNext();
        }
    });


    Guide.currentGuideLayer = mainscene.node;

}

Guide.showStep3 = function () {
    Guide.status = 1;
    Guide.currentIdx = 3;
    var mainscene = ccs.load(res["res@LayerGuide3.json"]);
    GLOBAL_LAYER.addChild(mainscene.node, 50);

    var mainPanel = mainscene.node.getChildByName("Panel_G3");

    var title = mainPanel.getChildByName("Image_G3_Title");

    title.getChildByName("guide_touch_to_go").setString(Util.getText("touch_to_continue"));
    title.getChildByName("guide_3_1").setString(Util.getText("guide_3_1"));
    title.getChildByName("guide_3_2").setString(Util.getText("guide_3_2"));


    var a1 = cc.scaleTo(0.2, 1, 1);
    title.runAction(a1);
    function goNext() {
        Guide.currentGuideLayer = undefined;
        mainscene.node.removeFromParent();
        Guide.showStep4();
        Util.playEffic("res/Audio/ball_move.mp3");
    }
    mainPanel.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            goNext();
        }
    });
    title.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            goNext();
        }
    });

    Guide.currentGuideLayer = mainscene.node;

}


Guide.showStep4 = function () {
    Guide.status = 1;
    Guide.currentIdx = 4;
    var mainscene = ccs.load(res["res@LayerGuide4.json"]);
    GLOBAL_LAYER.addChild(mainscene.node, 50);

    var mainPanel = mainscene.node.getChildByName("Panel_G4");

    var title = mainPanel.getChildByName("Image_G4_Title");

    title.getChildByName("guide_4_1").setString(Util.getText("guide_4_1"));
 


    var a1 = cc.scaleTo(0.2, 1, 1);
    title.runAction(a1);
    function goNext() {
        GLOBAL_LAYER.touchAt(1);
        mainscene.node.removeFromParent();
        Util.playEffic("res/Audio/ball_move.mp3");

        
    }

    var touchArea = mainPanel.getChildByName("Panel_Touch_Area_4");

    touchArea.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            goNext();
        }
    });


    Guide.currentGuideLayer = mainscene.node;

}

Guide.showStep5 = function () {
    Guide.status = 1;
    Guide.currentIdx = 5;
    var mainscene = ccs.load(res["res@LayerGuide5.json"]);
    GLOBAL_LAYER.addChild(mainscene.node, 50);

    var mainPanel = mainscene.node.getChildByName("Panel_G5");

    var title = mainPanel.getChildByName("Image_G5_Title");

    title.getChildByName("guide_touch_to_go").setString(Util.getText("touch_to_continue"));
    title.getChildByName("guide_5_1").setString(Util.getText("guide_5_1"));
    title.getChildByName("guide_5_2").setString(Util.getText("guide_5_2"));


    var a1 = cc.scaleTo(0.2, 1, 1);
    title.runAction(a1);
    function goNext() {
        Guide.currentGuideLayer = undefined;
        mainscene.node.removeFromParent();
        Guide.showStep6();
        Util.playEffic("res/Audio/ball_move.mp3");
    }
    mainPanel.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            goNext();
        }
    });
    title.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            goNext();
        }
    });

    Guide.currentGuideLayer = mainscene.node;

}


Guide.showStep6 = function () {
    Guide.status = 1;
    Guide.currentIdx = 6;
    var mainscene = ccs.load(res["res@LayerGuide6.json"]);
    GLOBAL_LAYER.addChild(mainscene.node, 50);

    var mainPanel = mainscene.node.getChildByName("Panel_G6");

    var title = mainPanel.getChildByName("Image_G6_Title");

    title.getChildByName("guide_touch_to_go").setString(Util.getText("touch_to_continue"));
    title.getChildByName("guide_6_1").setString(Util.getText("guide_6_1"));
    title.getChildByName("guide_6_2").setString(Util.getText("guide_6_2"));


    var a1 = cc.scaleTo(0.2, 1, 1);
    title.runAction(a1);
    function goNext() {
        Guide.currentGuideLayer = undefined;
        mainscene.node.removeFromParent();
        Guide.showStep7();
        Util.playEffic("res/Audio/ball_move.mp3");
    }
    mainPanel.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            goNext();
        }
    });
    title.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            goNext();
        }
    });

    Guide.currentGuideLayer = mainscene.node;

}


Guide.showStep7 = function () {
    Guide.status = 1;
    Guide.currentIdx = 7;
    var mainscene = ccs.load(res["res@LayerGuide7.json"]);
    GLOBAL_LAYER.addChild(mainscene.node, 50);

    var mainPanel = mainscene.node.getChildByName("Panel_G7");

    var title = mainPanel.getChildByName("Image_G7_Title");

 
    title.getChildByName("guide_7_1").setString(Util.getText("guide_7_1"));
 


    var a1 = cc.scaleTo(0.2, 1, 1);
    title.runAction(a1);
    function goNext() {
        GLOBAL_LAYER.touchAt(4);
        mainscene.node.removeFromParent();
        Util.playEffic("res/Audio/ball_move.mp3");
        
    }

    var touchArea = mainPanel.getChildByName("Panel_Touch_Area_7");

    touchArea.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            goNext();
        }
    });


    Guide.currentGuideLayer = mainscene.node;

}

Guide.showStep8 = function () {
    Guide.status = 1;
    Guide.currentIdx = 8;
    var mainscene = ccs.load(res["res@LayerGuide8.json"]);
    GLOBAL_LAYER.addChild(mainscene.node, 50);

    var mainPanel = mainscene.node.getChildByName("Panel_G8");

    var title = mainPanel.getChildByName("Image_G8_Title");

    title.getChildByName("guide_touch_to_go").setString(Util.getText("touch_to_continue"));
    title.getChildByName("guide_8_1").setString(Util.getText("guide_8_1"));
    title.getChildByName("guide_8_2").setString(Util.getText("guide_8_2"));


    var a1 = cc.scaleTo(0.2, 1, 1);
    title.runAction(a1);
    function goNext() {
        Guide.currentGuideLayer = undefined;
        mainscene.node.removeFromParent();
        Guide.showStep9();
        Util.playEffic("res/Audio/ball_move.mp3");
    }
    mainPanel.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            goNext();
        }
    });
    title.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            goNext();
        }
    });

    Guide.currentGuideLayer = mainscene.node;

}

Guide.showStep9 = function () {
    Guide.status = 1;
    Guide.currentIdx = 9;
    var mainscene = ccs.load(res["res@LayerGuide9.json"]);
    GLOBAL_LAYER.addChild(mainscene.node, 50);

    var mainPanel = mainscene.node.getChildByName("Panel_G9");

    var title = mainPanel.getChildByName("Image_G9_Title");

    title.getChildByName("guide_touch_to_go").setString(Util.getText("touch_to_continue"));
    title.getChildByName("guide_9_1").setString(Util.getText("guide_9_1"));
    title.getChildByName("guide_9_2").setString(Util.getText("guide_9_2"));


    var a1 = cc.scaleTo(0.2, 1, 1);
    title.runAction(a1);
    function goNext() {
        Guide.currentGuideLayer = undefined;
        mainscene.node.removeFromParent();
        cc.director.runScene(new MainScence());
        Util.playEffic("res/Audio/ball_move.mp3");
    }
    mainPanel.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            goNext();
        }
    });
    title.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            goNext();
        }
    });

    Guide.currentGuideLayer = mainscene.node;
    cc.sys.localStorage.setItem("Guide","1")

}
