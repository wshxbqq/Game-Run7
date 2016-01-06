/// <reference path="../../cocos2d-js-v3.6.js" />
/// <reference path="../CfgPanel/CfgPanel.js" />
/// <reference path="../Util/JQ.js" />
/// <reference path="Component/Cell.js" />
/// <reference path="../Util/util.js" />
/// <reference path="Component/Ball.js" />
/// <reference path="../Util/underscore.js" />
 

var GameGuideLayer = cc.Layer.extend({
    
    

    ctor: function () {
        this._super();
        this.init();
        return true;
    },

    updateVerniers: function (cb) {
        var _this = this;
        
        if (this.nextBall) {
            this.nextBall.removeFromParent();

            this.vernierBall = this.ballPool.shift();
            if (!this.vernierBall) {
                Util.showNextLevel();
                GLOBAL_DATA.CURRENT_LEVEL++;

                this.ballPool = Util.createBallPool1();
                this.vernierBall = this.ballPool.shift();
                Util.setLevel();
                this.updateBallQueue();

                if (this.gameOverHas7Column()) {
                    cc.director.runScene(cc.TransitionCrossFade.create(1, new GameOverScence()));
                } else {
                    //this.dropLevelUp();
                    this.__needDrop = 1;
                }
                
            }

           


            this.vernierBall.setPosition(cc.p(200, 900));
            this.addChild(this.vernierBall, 6);
            var a1 = cc.jumpTo(0.3, cc.p(320, 810), 50, 1);
            var cf = cc.callFunc(function () {
                if (cb) {
                    cb();
                };
                
            }, this.vernierBall);
            var seq = cc.sequence(a1, cf);
            this.vernierBall.runAction(seq);

            if (this.ballPool[0]) {
                this.nextBall = Util.createBall(this.ballPool[0].ballValue, this.ballPool[0].extValue);
                this.nextBall.retain();
                this.nextBall.setScale(0.5);
                var _a1 = cc.scaleTo(0.1, 1.2, 1.2);
                var _a2 = cc.scaleTo(0.1, 0.9, 0.9);
                var _a3 = cc.scaleTo(0.1, 1, 1);
                var _seq = cc.sequence(_a1, _a2, _a3);
                _seq.retain();
                this.nextBall.setPosition(cc.p(200, 900));

                setTimeout(function () {
                    _this.addChild(_this.nextBall, 5);
                    _this.nextBall.runAction(_seq);
                }, 200);
            }

        } else {
            this.vernierBall = this.ballPool.shift();
            if (!this.vernierBall) {
                Util.showNextLevel();
                GLOBAL_DATA.CURRENT_LEVEL++;
                
                this.ballPool = Util.createBallPool1();
                this.vernierBall = this.ballPool.shift();
                Util.setLevel();
                this.updateBallQueue();
                if (this.gameOverHas7Column()) {
                    cc.director.runScene(cc.TransitionCrossFade.create(1, new GameOverScence()));
                } else {
                    //this.dropLevelUp();
                    this.__needDrop = 1;
                }
            }
            this.vernierBall.setPosition(cc.p(320, 810));
            this.addChild(this.vernierBall, 6);

            this.nextBall = Util.createBall(this.ballPool[0].ballValue, this.ballPool[0].extValue);
            this.nextBall.setPosition(cc.p(200, 900));
            this.addChild(this.nextBall, 5);

        }
    },

    init: function () {
        GLOBAL_LAYER = this;
        var _this = this;
        _this.animating = 0;
        this.ballPool = Util.createBallPool1();
        this.updateVerniers();
       
        var _eventCfg = {};
        _eventCfg.event = cc.EventListener.TOUCH_ALL_AT_ONCE;
        if (this.onTouchesBegan) { _eventCfg.onTouchesBegan = this.onTouchesBegan; }
        if (this.onTouchesMoved) { _eventCfg.onTouchesMoved = this.onTouchesMoved; }
        if (this.onTouchesEnded) { _eventCfg.onTouchesEnded = this.onTouchesEnded; }
        cc.eventManager.addListener(cc.EventListener.create(_eventCfg), this);
        //this.scheduleUpdate();

        var gamescene = ccs.load(res["res@GameScene.json"]);
        this.addChild(gamescene.node);

        this.userScore = gamescene.node.getChildByName("Text_User_Score");
       
      
        this.userBest = gamescene.node.getChildByName("Text_Best");
        Util.setUserScore();
        Util.setUserBest();

        this.userLevel = gamescene.node.getChildByName("Text_Level");
        Util.setLevel();

        var pBG = gamescene.node.getChildByName("Panel_BG");
        this.pBG = pBG;
        var sbg = pBG.getChildByName("Sprite_BG");
        sbg.runAction(cc.tintTo(0,24, 105, 216).clone());

        this.colorPanel = gamescene.node.getChildByName("Panel_Color");
        this.currentBg = Util.createColorSprite();
        this.colorPanel.addChild(this.currentBg);

       
        pBG.addTouchEventListener(function (sender, type) {
            var gp ;
            var local_p;
            if (type == ccui.Widget.TOUCH_MOVED) {
                
                var gp = sender.getTouchMovePosition();
                var local_p = sender.convertToNodeSpace(gp);
               
                
            }

            if (type == ccui.Widget.TOUCH_BEGAN) {
                
                var gp = sender.getTouchBeganPosition();
                var local_p = sender.convertToNodeSpace(gp);
                


            }

            if (type == ccui.Widget.TOUCH_MOVED || type == ccui.Widget.TOUCH_BEGAN) {
                if (_this.animating==0) {  
                    if (cc.rectContainsPoint(sender.getBoundingBox(), gp)) {
                        var columnIdx = parseInt(local_p.x / 88.5);
                        if (columnIdx > 6) { columnIdx = 6;}
                        if (GLOBAL_DATA.HoverColumnIdx != columnIdx) {
                            GLOBAL_DATA.HoverColumnIdx = columnIdx;
                            Util.runColumnFlash(_this.ChessBoard, columnIdx);
                      
                            var vBall = _this.vernierBall;
                            if (vBall.__leftHoverAction) {
                                vBall.stopAction(vBall.__leftHoverAction);
                                vBall.__leftHoverAction = false;
                            }
                            var t = Math.abs((columnIdx * 88.5 + 50) - vBall.x) /  2100;
                            vBall.__leftHoverAction = cc.moveTo(t, cc.p(columnIdx * 88.5 + 45, vBall.y));
                            vBall.__leftHoverAction.retain();
                         
                            vBall.runAction(vBall.__leftHoverAction);
                        }
                    }
                }
            }
            if (type == ccui.Widget.TOUCH_ENDED) {
                if (_this.animating == 0) {
                    
                   

                }
            }





        }, this);
        
        

        
        var chessBoard = Util.createChessboard();
        Util.appendChessBoardToLayer(pBG, chessBoard);
        _this.ChessBoard = chessBoard;
       
   
    
        _this.initLevelBallQueue();
        _this.updateBallQueue();
        Util.setUserScore();
        Util.dropStartBall(Util.createGuideStartData());
        setTimeout(function () {
            Guide.showStep1();
        }, 500);

    },
    touchAt: function (columnIdx) {
        var _this = this;
        var column = _this.ChessBoard[columnIdx];
        _this.updateBallQueue();



        _this.animating = 1;
        var cell = undefined;
        for (var i = 0; i < column.length; i++) {
            if (!column[i].ballSprtie) {
                cell = column[i];
                _this.vernierBall.stopAllActions();
                cell.ballSprtie = _this.vernierBall;

                _this.vernierBall.runAction_Drop_And_Jump(_this.pBG.convertToWorldSpace(cell.bgSprite.getPosition()), function (node) {


                    _this.ansyLoop();
                    _this.updateVerniers();
                    if (_this.ballPool.length % 2 === 0) {
                        _this.changeBg();
                    }
                   

                });

                break;

            }

        }

        if (!cell) {
            _this.animating = 0
        }


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
        console.log(location);
        //event.stopPropagation();
        return false
    },
    onTouchesMoved: function (touches, event) {
        var touch = touches[0];
        var location = touch.getLocation();
        var target = event.getCurrentTarget();

        console.log(location);


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
    },
    initLevelBallQueue: function () {
        var _this = this;
        _this.levelBallQueue = [];
        var x = 50;
        var y = cc.director.getWinSize().height - 150;
        for (var i = 0; i < 25; i++) {
            var s = cc.Sprite.create("res/level_ball.png");
            s.__status1 = 1;
            s.setPosition(cc.p(x+i*23,y));
            s.setColor(cc.color(0, 0, 0));
            _this.levelBallQueue.push(s);
            _this.addChild(s,10);
        }
    },

    updateBallQueue: function () {
        var _this = this;
        for (var i = 0; i < _this.levelBallQueue.length; i++) {
            var cBall=_this.levelBallQueue[i];
            if (i >= _this.ballPool.length) {
                if (cBall.__status1==1) {
                    var a1 = cc.tintTo(0.4, 200, 200, 200);
                    var a2 = cc.scaleTo(0.2, 1.2, 1.2);
                    var a3 = cc.scaleTo(0.2, 0.5, 0.5);
                    var seq = cc.sequence(a2, a3);
                    var spa = cc.spawn(a1, seq);
                    cBall.runAction(spa);
                    cBall.__status1 = 0;
                }

                
                
            } else {
                cBall.setColor(cc.color(0, 0, 0));
                cBall.setScale(1);
                cBall.__status1 = 1;
            }
        }
    },
    gameOverFull7Column: function () {

        var _this = this;
        var result = true;
        for (var i = 0; i < _this.ChessBoard.length; i++) {
            var column = _this.ChessBoard[i];
            if (!column[6].ballSprtie) {
                result = false;
            }
        }
        return result;

    },

    gameOverHas7Column: function () {
        var _this = this;
        var result = false;
        for (var i = 0; i < _this.ChessBoard.length; i++) {
            var column = _this.ChessBoard[i];
            if (column[6].ballSprtie) {
                result = true;
            }
        }
        return result;
    },
    dropLevelUp: function (cb) {
        var _this = this;
        _this.animating = 1;

        function getFirstEmptyCell(arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].ballSprtie == undefined) {
                    return i;
                }
            }
        }


   

  
        for (var i = 0; i < 7; i++) {
            (function (_i) {
                setTimeout(function () {
                    var column = _this.ChessBoard[_i];
                    var emptyCell = column[getFirstEmptyCell(column)];
                    var targetPosition = cc.p(emptyCell.bgSprite.x, emptyCell.bgSprite.y);
                    var ball = new Ball();
                    ball.retain();
                    ball.initWithValue(_.random(1, 7), 2);
                    ball.setPosition(cc.p(column[6].bgSprite.x, 680));
                    _this.addChild(ball);

                    emptyCell.ballSprtie = ball;
                    ball.runAction_Drop_And_Jump(_this.pBG.convertToWorldSpace(emptyCell.bgSprite.getPosition()), function (node) { });
                  
                    if (_i == 6) {
                        if (cb) { cb(); }
                        //_this.animating = 0;
                        _this.ansyLoop();
                        

                    }
                }, 100+_i*100);

            })(i)
            

        }



    },

    ansyLoop: function () {
        var _this = this;
        _this.animating = 1;
        Util.analyzeChessBoard(_this.ChessBoard, function (explodeArr) {

            if (explodeArr.length==0) {
                //_this.animating = 0;
                GLOBAL_DATA.COMBO = 1;
                if (_this.__needDrop === 1) {
                    _this.__needDrop = 0;
                    _this.dropLevelUp();
                }
                return;
            }
           

            setTimeout(function () {
                if (Guide.currentIdx == 2) {
                    Guide.showStep3();
                }
                if (Guide.currentIdx == 4) {
                    Guide.showStep5();
                }
                if (Guide.currentIdx == 7) {
                    Guide.showStep8();
                }
               

                Util.failDown(GLOBAL_LAYER.ChessBoard, function (cargo) {
                    if (explodeArr.length > 0) {
                        setTimeout(function () {
                            GLOBAL_DATA.COMBO++;
                            _this.ansyLoop();
                            if (GLOBAL_DATA.COMBO > 1) {
                                var _COMBO = GLOBAL_DATA.COMBO;
                                setTimeout(function () {
                                    Util.showCombo(_COMBO);
                                });
                                
                            }
                            
                           
                        }, 500);
                        
                    } else {
                        
                        

                        if (_this.__needDrop === 1) {
                            
                            _this.dropLevelUp(function () {
                                _this.__needDrop = 0;
                                //_this.animating = 0;
                                GLOBAL_DATA.COMBO = 1;
                            });
                        } else {
                            //_this.animating = 0;
                            GLOBAL_DATA.COMBO = 1;

                        }
                        
                       
                    }
                });

            }, 800);
        });

    }
});