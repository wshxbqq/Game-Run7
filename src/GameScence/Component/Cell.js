/// <reference path="../../../cocos2d-js-v3.6.js" />

var Cell = function () {
    this.x = 0;
    this.y = 0;
    this.width = 86;
    this.height = 86;
    this.bgSprite = cc.Sprite.create(res["res@R@cell.png"]);
    this.ballSprtie = undefined;

    this.column = null;
    this.row = null;

}

Cell.prototype.init = function (p,column,row) {
    this.bgSprite.retain();
    this.bgSprite.setPosition(p);
    this.bgSprite.setOpacity(0);
    this.x = p.x;
    this.y = p.y;

    
    this.column = column;
    this.row = row;
}




Cell.prototype.runFlashBg = function () {

    var _this = this;
    _this.bgSprite.stopAllActions();
    var a1 = cc.fadeTo(0.3, 255);
    var a2 = cc.fadeTo(0.7, 0);
    var seq = cc.sequence(a1, a2);
    seq.retain();
    _this.bgSprite.runAction(seq);
}


Cell.prototype.ballExplode = function (score,cb) {
    var _this = this;
    _this.ballSprtie.stopAllActions();
    
    _this.ballSprtie.runAction_Explode(function () {
       
        var label1 = new cc.LabelBMFont("+" + score, "res/font/user_fnt.fnt", cc.LabelAutomaticWidth, cc.TEXT_ALIGNMENT_CENTER, cc.p(0, 0));
        label1.setPosition(_this.bgSprite.getPosition());
        _this.bgSprite.parent.addChild(label1, 2110);
        label1.setScale(1);

        var color=Util.randomColor();
        var tin = cc.tintTo(0, color.r, color.g, color.b);
        label1.runAction(tin);

        var a1 = cc.scaleTo(0.1,2, 2);
        var a2 = cc.scaleTo(0.1, 1, 1);
        var a3 = cc.moveBy(0.4, cc.p(0, 10));
        var a4 = cc.fadeOut(0.4);
        var fcall = cc.callFunc(function () {
            
            label1.removeFromParent();
        }, label1);
        var seq = cc.sequence(a1, a2, a3, a4, fcall);
        label1.runAction(seq);

        GLOBAL_DATA.UserScore += score;
        Util.setUserScore();
        if (cb) {
            cb();
        }

        if (cc.sys.isNative) {
            var _emitter = new cc.ParticleSystem("res/Ext/numExplode.plist");
            _emitter.setPosition(_this.bgSprite.getPosition());
            _emitter.retain();

            setTimeout(function () {
                _this.bgSprite.parent.addChild(_emitter, 9000);
                _emitter.texture = cc.textureCache.addImage("res/Ext/a1.png");
                _emitter.shapeType = cc.ParticleSystem.STAR_SHAPE;
                _emitter.setAutoRemoveOnFinish(true);
            }, 200);
        }
       

    });
    

    



    
     
     
    
     

     _this.ballSprtie = undefined;
 

}