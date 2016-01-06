var GameOverScence = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameOverLayer();
        this.addChild(layer);
    }
});


