var GameGuideScence = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameGuideLayer();
        this.addChild(layer);
    }
});


