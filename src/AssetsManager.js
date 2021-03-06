var __failCount = 0;

var AssetsManagerLoaderScene = cc.Scene.extend({
    _am: null,
    _progress: null,
    _percent: 0,
    _percentByFile: 0,
    run: function() {

        if (!cc.sys.isNative) {
            this.loadGame();
            return;
        }

        var layer = new cc.Layer();
        this.addChild(layer);
        this._progress = new cc.LabelTTF.create("0%", "Arial", 12);
        this._progress.x = cc.winSize.width / 2;
        this._progress.y = cc.winSize.height / 2 + 50;
        layer.addChild(this._progress);

        // android: /data/data/com.huanle.magic/files/
        var storagePath = jsb.fileUtils.getWritablePath();

        this._am = new jsb.AssetsManager("res/project.manifest", storagePath);
        this._am.retain();

        if (!this._am.getLocalManifest().isLoaded()) {
            cc.log("Fail to update assets, step skipped.");
            //this.loadGame();
        } else {

            var that = this;

            var listener = new jsb.EventListenerAssetsManager(this._am, function(event) {
                switch (event.getEventCode()) {
                    case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                        cc.log("No local manifest file found, skip assets update.");
                        break;
                    case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                        that._percent = event.getPercent();
                        that._percentByFile = event.getPercentByFile();
                        cc.log(that._percent + "%");

                        var msg = event.getMessage();
                        if (msg) {
                            cc.log(msg);
                        }
                        break;
                    case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                    case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                        cc.log("Fail to download manifest file, update skipped.");
                        //that.loadGame();
                        break;
                    case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                    case jsb.EventAssetsManager.UPDATE_FINISHED:
                        console.log("Update finished.");
                        //that.loadGame();
                        break;
                    case jsb.EventAssetsManager.UPDATE_FAILED:
                        cc.log("Update failed. " + event.getMessage());

                        __failCount++;
                        if (__failCount < 5) {
                            that._am.downloadFailedAssets();
                        } else {
                            cc.log("Reach maximum fail count, exit update process");
                            __failCount = 0;
                            //that.loadGame();
                        }
                        break;
                    case jsb.EventAssetsManager.ERROR_UPDATING:
                        cc.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
                        //that.loadGame();
                        break;
                    case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                        cc.log(event.getMessage());
                        //that.loadGame();
                        break;
                    default:
                        break;
                }
            });



            cc.eventManager.addListener(listener, 1);
            this._am.update();
            this.loadGame();
            //cc.director.runScene(this);
        }

        this.schedule(this.updateProgress, 0.5);
    },

    loadGame: function() {
        
        cc.loader.loadJs(["src/files.js"], function(err) {
            cc.loader.loadJs(jsFiles, function(err) {
                cc.LoaderScene.preload(g_resources, function() {
                    cc.audioEngine.setMusicVolume(0.6);
                    var __id;
                    var uuid = cc.sys.localStorage.getItem("uuid");
                    if (cc.sys.isNative) {
                        if (cc.sys.language.toLowerCase() == "zh") {
                            __id = "49";
                        } else {
                            __id = "39";
                        }
                        $.device.gameCenter_AuthenticateLocalUser();


                    } else {
                        __id = 37;
                    }
                    if (!uuid) {
                        uuid = $.createUUID();
                        cc.sys.localStorage.setItem("uuid", uuid);
                        $.dcUserDefault(__id, 1, 1);
                    }
                    GLOBAL_DATA.load();

                    Util.playMusic("res/Audio/bg.mp3", true);
                    if (cc.sys.localStorage.getItem("Guide")) {
                        cc.director.runScene(new MainScence());
                    } else {
                        cc.director.runScene(new GameGuideScence());
                    }



                }, this);
            });
        });
    },
    updateProgress: function(dt) {
        this._progress.string = "" + this._percent;
    },
    onExit: function() {
        cc.log("AssetsManager::onExit");

        this._am.release();
        this._super();
    }
});