/// <reference path="../../../cocos2d-js-v3.6.js" />
/// <reference path="../../Util/underscore.js" />
/// <reference path="../../GLOBAL_DATA.js" />

var Ball = cc.Sprite.extend({
    ___sepped:2640,
    ctor: function () {
        this._super();
        this.init();

        this.ballValue = null;
        this.extValue = null;
        
        return true;

    },
    init: function () {

    },
    runAction_Explode: function (cb) {
        var _this = this;
        var a0 = cc.scaleTo(0.1, 1.3, 1.3);
        var delay = cc.delayTime(0.1);
        var a1 = cc.scaleTo(0.1, 0, 0);
        var a2 = cc.rotateBy(0.1, 90);
        var spawn = cc.spawn(a1, a2);
        var cf = cc.callFunc(function () {
            if (cb) {
                cb(_this);
            }
        }, _this);
        var seq = cc.sequence(a0, delay,spawn, cf);
        this.runAction(seq);
        setTimeout(function () {
            Util.playEffic("res/Audio/ball_explode.mp3");
        }, _.random(0, 300));
        

    },

    runAction_Drop_And_Jump: function (p,cb) {
        this.runAction_DropTo(p, function (node) {
            node.runAction_SmallJump(30,function (_node) {
                if (cb) {
                    cb(_node)
                }
            });
        });
        if(!GLOBAL_DATA.__startIn3){
            Util.playEffic("res/Audio/drop_to_ground.mp3");
        }
        

    },

    runAction_SmallJump: function (height,cb) {
        var _this = this;
        var a1 = cc.scaleTo(0.07, 1.1, 0.9);
        var a2 = cc.scaleTo(0.07, 0.9, 1.1);
        var a3 = cc.scaleTo(0.07, 1, 1);
        var seq1 = cc.sequence(a1, a2, a3, cc.callFunc(function () {
            if (cb) {
                cb(_this);
            }
        }, this));
        var a3 = cc.jumpBy(0.2, cc.p(0, 0), height, 1);
        var a4 = cc.jumpBy(0.1, cc.p(0, 0), 10, 1);
        var seq2 = cc.sequence(a3,a4);
        var spawn = cc.spawn(seq1, seq2);

        this.runAction(spawn);


    },

    runAction_DropTo: function (p, cb) {
        var _this = this;
        var seq;
        if (p.x == this.x) {
            var t = Math.abs(p.y - this.y) / this.___sepped;
            var a1 = cc.moveTo(t, cc.p(p.x, p.y));
            seq = cc.sequence(a1, cc.callFunc(function () {
                if (cb) {
                    cb(_this);
                }
            }, this));

          
        } else {
            var t = Math.abs(p.x - this.x) / this.___sepped;
            var a1 = cc.moveTo(t, cc.p(p.x, this.y));

            var t1 = Math.abs(p.y - this.y) / this.___sepped;
            var a2 = cc.moveTo(t1, cc.p(p.x, p.y));

            seq = cc.sequence(a1, a2, cc.callFunc(function () {
                _this.setPosition(p);
                if (cb) {
                    cb(_this);
                }
            }, this));
       


        }
        this.runAction(seq);
    },

    initWithValue: function (val,extVal) {
        this.ballValue = val;
        this.extValue = extVal;

        if (extVal == 0) {
            var filePath = "res@R@Balls@{0}.png";
            filePath = filePath.replace("{0}", val);
            this.initWithFile(res[filePath]);
        }

        if (extVal == 1) { //   sold ball hit 1
            this.initWithFile("res/R/Balls/bx1.png");
        }
        if (extVal == 2) { //   sold ball hit2
            this.initWithFile("res/R/Balls/bx2.png");
        }
        if (extVal == 3) { //   sold ball hit 3
            this.initWithFile("res/R/Balls/wenhao.png");
        }


    },
    changeExtTypeTo: function (extType,cb) {
        var _this = this;
        setTimeout(function () {
            if (extType == 0) {
                var filePath = "res@R@Balls@{0}.png";
                filePath = filePath.replace("{0}", _this.ballValue);
                _this.setTexture(res[filePath]);
                _this.extValue = extType;
                 
                var a1 = cc.scaleTo(0.2, 1.3, 1.3);
                var a2 = cc.scaleTo(0.2, 0.7, 0.7);
                var a3 = cc.scaleTo(0.1, 1, 1);
                var cCall = cc.callFunc(function () {
                    if (cb) {
                        cb(_this);
                    }
                }, _this);
                var seq = cc.sequence(a1, a2, a3, cCall);

                var a4 = cc.jumpBy(0.3, cc.p(0, 0), 10, 1);

                var spa = cc.spawn(seq,a4);
                _this.runAction(spa);
            }

            if (extType == 1) {
 
                _this.setTexture("res/R/Balls/bx1.png");
                _this.extValue = extType;

                var a1 = cc.scaleTo(0.2, 1.3, 1.3);
                var a2 = cc.scaleTo(0.2, 0.7, 0.7);
                var a3 = cc.scaleTo(0.1, 1, 1);
                var cCall = cc.callFunc(function () {
                    if (cb) {
                        cb(_this);
                    }
                }, _this);
                var seq = cc.sequence(a1, a2, a3, cCall);

                var a4 = cc.jumpBy(0.3, cc.p(0, 0), 10, 1);

                var spa = cc.spawn(seq, a4);
                _this.runAction(spa);
            }

        }, 300);
        



    }
});