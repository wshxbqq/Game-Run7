/// <reference path="../../cocos2d-js-v3.6.js" />
/// <reference path="../GameScence/Component/Cell.js" />
/// <reference path="../GLOBAL_DATA.js" />
/// <reference path="../GameScence/Component/Ball.js" />
 
 
/// <reference path="JQ.js" />
/// <reference path="underscore.js" />
/// <reference path="util.js" />


var Util = {};
Util.createBall = function (val,extVal) {
    var ball = new Ball();
    ball.initWithValue(val, extVal);
    ball.retain();
    return ball;
}


Util.createChessboard = function () {
    var columns = [];
    for (var i = 0; i < 7; i++) {
        var row = [];
        for (var j = 0; j < 7; j++) {
             
            var cell = new Cell();
            var x = 43 + i * (86 + 3);
            var y = 43 + j * (86 + 3);
            cell.init(cc.p(x, y), i, j);
            row.push(cell);
        }
 
        columns.push(row);
    }
    return columns;
}

Util.appendChessBoardToLayer = function (nodeLayer, chessboard) {
    for (var i = 0; i < 7; i++) {
        
        for (var j = 0; j < 7; j++) {
            nodeLayer.addChild(chessboard[i][j].bgSprite);
        }
      
    }

}

Util.runColumnFlash = function (chessboard,columnIdx) {
    Util.playEffic("res/Audio/ball_move.mp3");
    if (!cc.sys.isNative) {
        return;
    }
    
    for (var i = 6; i >= 0; i--) {
        var bg = chessboard[columnIdx][i].bgSprite;
        bg.stopAllActions();
        setTimeout(function (_bg) {
            var a1 = cc.fadeTo(0.0001, 255);
            var a2 = cc.fadeTo(0.9, 0);
            var seq = cc.sequence(a1, a2);
            seq.retain();
            _bg.runAction(seq);
           
        }, 10 * (7 - i), bg);

       
        
    }

}


Util.createBallPool = function () {
    var _pool = [];
    for (var i = 0; i < GLOBAL_DATA.BALL_POLL_MAX; i++) {
        var seed=_.random(0,10);
        if (seed >= 0) { // 特殊的球
            var bt=_.random(1, 7);
            while (_.last(_pool) == bt) {
                bt = _.random(1, 7);
            }
            _pool.push(bt);
        }
       
    }

    var pool = [];

    _.each(_pool, function (i, n) {
        var ball = new Ball();
        var extTp = 0;
        var _seed = _.random(0, GLOBAL_DATA.EXT_BALL_1_PERCENT);
         
        if (_seed == 0) {
            extTp = 1;
           
        }else if (_.random(0, GLOBAL_DATA.EXT_BALL_2_PERCENT) == 0) {
            extTp = 2;
        }

        else if (_.random(0, GLOBAL_DATA.EXT_BALL_3_PERCENT) == 0) {
            extTp = 3;
        }  

        ball.initWithValue(i, extTp);
        ball.retain();
        pool.push(ball);
        
    });

    return pool;
}



Util.analyzeChessBoard = function (chessBoard,cb) {
    var flashArr = [];
    var disappearArr = [];

    var result = [];
    function _check(cellArr) {
        var _disappearArr = [];
        for (var i = 0; i < cellArr.length;i++){
            var cell=cellArr[i];
            if (cell.ballSprtie.ballValue == cellArr.length && cell.ballSprtie.extValue==0) {
                _disappearArr.push(cell);
            }
        }
        return _disappearArr;
    }

    for (var i = 0; i < chessBoard.length; i++) {
        var column=chessBoard[i];
        var splitedColumn = $.splitArray(column, function (c) { return c.ballSprtie; }, undefined);
        for (var _i = 0; _i < splitedColumn.length; _i++) {
            var bArr = splitedColumn[_i];
            if (_check(bArr).length>0) {
                flashArr = _.union(flashArr,bArr);
                disappearArr = _.union(disappearArr, _check(bArr));
            }
        }
    }

    var _chessBoard = $.columnToRow(chessBoard);
    for (var i = 0; i < _chessBoard.length; i++) {
        var column = _chessBoard[i];
        var splitedColumn = $.splitArray(column, function (c) { return c.ballSprtie; }, undefined);
        for (var _i = 0; _i < splitedColumn.length; _i++) {
            var bArr = splitedColumn[_i];
            if (_check(bArr).length > 0) {
                flashArr = _.union(flashArr, bArr);
                disappearArr = _.union(disappearArr, _check(bArr));
            }
        }
    }

 




    _.each(flashArr,function (cellInner, n) {
        cellInner.runFlashBg();
    
    });


    var surrounding = [];
    _.each(disappearArr, function (cellInner, n) {
         
        surrounding=_.union(surrounding, Util.getSurround(chessBoard, cellInner));
        if (n == 0) {
            cellInner.ballExplode(GLOBAL_DATA.COMBO*16);
            if (cb) { cb(disappearArr) }
        } else {
            cellInner.ballExplode(GLOBAL_DATA.COMBO * 16);

        }
 
    });


    _.each(surrounding, function (i, n) {
        if (i.ballSprtie) {
            if (i.ballSprtie.extValue == 1) {
                i.ballSprtie.changeExtTypeTo(0);
            }
            if (i.ballSprtie.extValue == 2) {
                i.ballSprtie.changeExtTypeTo(1);
            }
        }
       

    });


    if (disappearArr.length==0) {
        if (cb) { cb(disappearArr) }
    }
}

Util.failDown = function (chessBoard, cb) {
    var __flag = 0;
    for (var i = 0; i < chessBoard.length; i++) {
        var column = chessBoard[i];

        var cargo = [];
        for (var _i = 0; _i < column.length; _i++) {
            var cell = column[_i];
            if (cell.ballSprtie) {
                cargo.push(cell.ballSprtie);
                cell.ballSprtie = undefined;
            }
        }


        for (var j = 0; j < cargo.length; j++) {
            column[j].ballSprtie = cargo[j];
            var p = column[j].bgSprite.getPosition();
           
            p = GLOBAL_LAYER.pBG.convertToWorldSpace(p);

           

            if (j == 0) {
                column[j].ballSprtie.___sepped = 1000;
                column[j].ballSprtie.runAction_DropTo(p, function () {
                    if (cb) {
                        if (__flag == 0) {
                            __flag = 1;
                            cb(cargo);
                        }
                        
                    }
                });
            } else {
                column[j].ballSprtie.___sepped = 1000;
                column[j].ballSprtie.runAction_DropTo(p);

            }

        }
        if (cargo.length == 0) {
            if (cb) {
                if (__flag == 0) {
                    __flag = 1;
                    cb(cargo);
                }
            }
        }


    }


}

Util.randomColor = function () {
    return GLOBAL_DATA.COLORS[_.random(0, GLOBAL_DATA.COLORS.length-1)]

   
};

Util.setUserScore = function () {
 
    GLOBAL_LAYER.userScore.setString($.formatNum(GLOBAL_DATA.UserScore));
    if (GLOBAL_DATA.UserScore > GLOBAL_DATA.getBest()) {
        GLOBAL_DATA.setBest(GLOBAL_DATA.UserScore);
        Util.setUserBest();
        GLOBAL_DATA.save();
    }
 
 
 
}

Util.setUserBest = function () {
    GLOBAL_LAYER.userBest.setString($.formatNum(GLOBAL_DATA.getBest()));

}

Util.setLevel = function () {

    GLOBAL_LAYER.userLevel.setString($.formatNum(GLOBAL_DATA.CURRENT_LEVEL));

}

Util.showNextLevel = function () {
    
    var nextLevelSprite = cc.Sprite.create("res/next_level.png");
    var WinSIZE = cc.director.getWinSize();
    nextLevelSprite.setPosition(cc.p(WinSIZE.width / 2, 600));
    GLOBAL_LAYER.addChild(nextLevelSprite, 20);

    var a1 = cc.moveBy(1.5, cc.p(0, 100));
 
    var a2 = cc.scaleTo(0.2, 1.2, 1.2);
    var a3 = cc.scaleTo(0.2, 1, 1);
    var a4 = cc.fadeOut(1.7);
    var seq = cc.sequence(a2, a3);
    var spa = cc.spawn(a1, seq);
    var seq1 = cc.sequence(spa,a4);
    nextLevelSprite.runAction(seq1);

    
}

Util.getSurround = function (chessBoard, cell) {
    function __test(dArr,x,y) {
        if (dArr[x]) {
            return dArr[x][y];
        } else {
            return undefined;
        }
    }

    var result = [];
    for (var i = 0; i < chessBoard.length; i++) {
        var column = chessBoard[i];
        for (var j = 0; j < column.length; j++) {
            var c=column[j];
            if (c == cell) {
                var a1 = __test(chessBoard, i, j + 1);
                var a2 = __test(chessBoard, i-1, j + 1);
                var a3 = __test(chessBoard, i-1,j);
                var a4 = __test(chessBoard, i-1, j - 1);
                var a5 = __test(chessBoard, i, j - 1);
                var a6 = __test(chessBoard, i+1, j - 1);
                var a7 = __test(chessBoard, i+1, j );
                var a8 = __test(chessBoard, i+1, j + 1);

                if (a1) { result.push(a1); }
                //if (a2) { result.push(a2); }
                if (a3) { result.push(a3); }
                //if (a4) { result.push(a4); }
                if (a5) { result.push(a5); }
                //if (a6) { result.push(a6); }
                if (a7) { result.push(a7); }
                //if (a8) { result.push(a8); }
 
            }
        }
    }
    return result;



}

Util.createColorSprite = function () {
    var WinSize = cc.director.getWinSize();
    var seed = _.random(0, 6);
    while (Util.__preBg == seed) {
        seed = _.random(0, 6);
    }
    Util.__preBg = seed;
    var sprite = cc.Sprite.create("res/Bg/bg_" + seed + ".jpg");
    sprite.setPosition(cc.p(WinSize.width / 2, WinSize.height/2));
    sprite.retain();
    if (!cc.sys.isNative) {
        changeColorBg("res/Bg/bg_" + seed + ".jpg", 1)
 
    }
    return sprite;

}
Util.showCombo = function (combo) {
    Util.playEffic("res/Audio/s" + combo + ".mp3");
    var comboSprite = cc.Sprite.create("res/combo.png");
    var WinSIZE = cc.director.getWinSize();
    comboSprite.setPosition(cc.p(WinSIZE.width / 2, 450));
    GLOBAL_LAYER.addChild(comboSprite, 20);

    


    var label1 = new cc.LabelBMFont(combo, "res/font/user_fnt.fnt", cc.LabelAutomaticWidth, cc.TEXT_ALIGNMENT_LEFT, cc.p(0, 0));
    label1.setPosition(cc.p(300,45));
 

    label1.setColor(Util.randomColor());
    comboSprite.addChild(label1);


    
    var a1 = cc.moveBy(1, cc.p(0, 100));
    var a2 = cc.scaleTo(0.2, 1.2, 1.2);
    var a3 = cc.scaleTo(0.2, 1, 1);
    var a4 = cc.fadeOut(1);
    var seq = cc.sequence(a2, a3);
    var spa = cc.spawn(a1, seq);

    a4.retain();
    seq.retain();
    spa.retain();
    var fun = cc.callFunc(function () {
        label1.runAction(a4.clone());
    }, comboSprite);
    var seq1 = cc.sequence(spa,fun, a4.clone());
    comboSprite.runAction(seq1);
    seq1.retain();
    

}


Util.dropStartBall = function (sd) {
    var startData =sd?sd: Util.createStartData();
    for (var i = 0; i < startData.length; i++) {
        var column = startData[i];
        for (var j = 0; j < column.length; j++) {
            var ball = column[j];
            GLOBAL_LAYER.ChessBoard[i][j].ballSprtie = ball;
            var targetPosition = GLOBAL_LAYER.ChessBoard[i][j].bgSprite.getPosition();
            targetPosition = GLOBAL_LAYER.pBG.convertToWorldSpace(targetPosition);
            ball.setPosition(cc.p(targetPosition.x, 810));
            GLOBAL_LAYER.addChild(ball, 6);
            ball.runAction_Drop_And_Jump(targetPosition, function (node) { });
        }
    }



   
    


}



Util.createStartData = function () {
    var a = Util.createStartBallScence(_.random(8, 15));
    while (Util.checkStartBallScence(a).length>0) {
        a = Util.createStartBallScence(_.random(8, 15));
    }

    var result = [];
    for (var i = 0; i < a.length; i++) {
        var column = [];
        for (var j = 0; j < a[i].length; j++) {
            if (a[i][j]) {
                column.push(a[i][j]);
            }

        }
        result.push(column);
    }
    return result;

};
 


Util.checkStartBallScence = function (arr) {
    var disappearArr = [];

 

    function _check(itemArr) {
        var _disappearArr = [];
        for (var i = 0; i < itemArr.length; i++) {
            var item = itemArr[i];
            if (item.ballValue == itemArr.length && item.extValue == 0) {
                _disappearArr.push(item);
            }
        }
        return _disappearArr;
    }

    for (var i = 0; i < arr.length; i++) {
        var column = arr[i];
        var splitedColumn = $.splitArray(column, function (c) { return c; }, undefined);
        for (var _i = 0; _i < splitedColumn.length; _i++) {
            var bArr = splitedColumn[_i];
            if (_check(bArr).length > 0) {
                disappearArr = _.union(disappearArr, _check(bArr));
            }
        }
    }

    var _arr = $.columnToRow(arr);
    for (var i = 0; i < _arr.length; i++) {
        var column = _arr[i];
        var splitedColumn = $.splitArray(column, function (c) { return c; }, undefined);
        for (var _i = 0; _i < splitedColumn.length; _i++) {
            var bArr = splitedColumn[_i];
            if (_check(bArr).length > 0) {
                disappearArr = _.union(disappearArr, _check(bArr));
            }
        }
    }

    return disappearArr;

}

Util.createStartBallScence = function (num) {
    var result = [[],[],[],[],[],[],[]];

    function getColumnIndxLit6() {
        var _res = _.random(0, 6);
        var __r=result[_res];
        while (__r.length > 4) {
            _res = _.random(0, 6);
            __r = result[_res];
        }
        return _res;
    }

    for (var i = 0; i < num; i++) {
        //var columnIdx = _.random(0, 6);
        //result[getColumnIndxLit6()].push(Util.createBall(_.random(1, 7), _.random(0, 2)));
        result[getColumnIndxLit6()].push(Util.createBall(_.random(1, 7),0));
    }


    for (var j = 0; j < 7; j++) {
        while (result[j].length<7) {
            result[j].push(undefined);
        
        }
    }



    return result;



}



Util.createBallPool1 = function () {
 
    var pool = [];

    pool.push(Util.createBall(3,0));
    pool.push(Util.createBall(2, 0));
    pool.push(Util.createBall(2, 0));
    pool.push(Util.createBall(7, 0));
    return pool;
}



Util.createGuideStartData = function () {
    var result = [[], [], [], [], [], [], []];

    result[0].push(Util.createBall(1, 1));
    result[0].push(Util.createBall(7, 0));
    result[0].push(Util.createBall(6, 0));
    result[0].push(Util.createBall(4, 0));
    result[0].push(Util.createBall(3, 0));


    result[1].push(Util.createBall(1, 1));
    result[1].push(Util.createBall(6, 0));

    result[2].push(Util.createBall(3, 1));

    result[3].push(Util.createBall(5, 2));
    result[3].push(Util.createBall(5, 0));

    result[4].push(Util.createBall(5, 1));
   
 
    result[5].push(Util.createBall(2, 0));
    result[5].push(Util.createBall(7, 0));
    result[5].push(Util.createBall(5, 1));
    result[5].push(Util.createBall(6, 1));

    result[6].push(Util.createBall(1, 1));
    result[6].push(Util.createBall(5, 1));
    result[6].push(Util.createBall(1, 0));


    return result;


}

 

Util.playMusic = function (src,isLoop) {
    if (GLOBAL_DATA.Music) {
        if (cc.sys.isNative) {
            cc.audioEngine.playMusic(src, isLoop);
        }else{
            cc.audioEngine.playMusic(src, isLoop);
        }
       
    }
    
}
Util.StopMusic = function () {
    cc.audioEngine.stopMusic();

}

Util.playEffic = function (src) {
    if (GLOBAL_DATA.Sound) {
        cc.audioEngine.playEffect(src);
    }

}

Util.getText = function (key) {
    var lang = cc.sys.language;
    var result;
    var objL = LANG[key];
    if (!objL) {
        result = "no_text_for:" + key
    } else {
        if (objL[lang]!==undefined) {
            result = objL[lang];
        } else {
            result = objL["en"];
        }
    }

    return result;

}
 
Util.goShare = function () {
    
    if (cc.sys.isNative) {
        if (cc.sys.language.toLowerCase() == "zh") {
            $.device.openShare("Magic7, 俄罗斯方块与数独的结合,新颖的游戏模式，不妨来试试。", "res/logo_200.png", "https://itunes.apple.com/us/app/magic7/id1003580152?l=zh&ls=1&mt=8");
        } else {
            $.device.openShare("Magic7, A Game with Tetris + Sudoku, Worth to try", "res/logo_200.png", "https://itunes.apple.com/us/app/magic7/id1003580152?l=us&ls=1&mt=8");
        }

    } else {
        var share_wx = document.querySelector(".share_wx");
        
        setTimeout(function () {
            share_wx.style.display = "block";
             

        }, 100);

    }


}