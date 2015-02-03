var size;
var animationDone=false;
var HelloWorldLayer = cc.Layer.extend({
    pageContainer:null,
    currentPageIndex:0,
    pagesArray:null,
    currentPage:null,
    lastPage:null,
    pageHeight:0,
    beginY:0,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        this.pagesArray = new Array();
        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        size = cc.winSize;
        this.pageHeight = size.height;
        var bg = new cc.LayerColor();
        bg.init(cc.color(0xFF,0xFF,0xFF,0xff),size.width,size.height);
        this.addChild(bg);
        bg.setPosition(0,0);

        this.pageContainer = new Page0Layer();
        this.addChild(this.pageContainer);

        var page = new Page0Layer();
        this.pageContainer.addChild(page);
        this.pagesArray.push(page);

        page = new Page1Layer();
        this.pageContainer.addChild(page);
        this.pagesArray.push(page);
        page.setPosition(0,-this.pageHeight);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        cc.audioEngine.playMusic(res.bg_mp3, true);

        return true;
    },
    onEnter:function () {
        cc.log("SceneTestLayer1#onEnter");
        this._super();
    },

    onEnterTransitionDidFinish:function () {
        cc.log("SceneTestLayer1#onEnterTransitionDidFinish");
        this._super();

        this.currentPage = this.pagesArray[this.currentPageIndex];
        this.currentPage.playAnimation();
    },
    onTouchBegan:function (touch, event) {
        var target = event.getCurrentTarget();
        var position = touch.getLocation();
        target.beginY = position.y;
            cc.log("animationDone=true");
            var pl = touch.getPreviousLocation();
            //var dx = position.x - pl.x;
            var dy = position.y - pl.y;
            target.pageContainer.setPosition(target.pageContainer.x,target.pageContainer.y+dy);

        return true;
    },
    onTouchMoved:function (touch, event) {
        var target = event.getCurrentTarget();
        var position = touch.getLocation();


        var pl = touch.getPreviousLocation();
        //var dx = position.x - pl.x;
        var dy = position.y - pl.y;
        target.pageContainer.setPosition(target.pageContainer.x,target.pageContainer.y+dy);
    },
    onTouchEnded:function (touch, event) {
        var target = event.getCurrentTarget();
        var position = touch.getLocation();
        var dy = position.y - target.beginY;
        if(dy > 0 && target.currentPageIndex < target.pagesArray.length-1){
            target.gotoPage(target.currentPageIndex+1);
        }else if(dy < 0 && target.currentPageIndex > 0){
            target.gotoPage(target.currentPageIndex-1);
        }else{
            target.gotoPage(target.currentPageIndex);
        }

        //var pl = touch.getPreviousLocation();
        ////var dx = position.x - pl.x;
        //var dy = position.y - pl.y;
        //target.pageContainer.setPosition(target.pageContainer.x,target.pageContainer.y+dy);
    },

    gotoPage:function(pageIndex)
    {
        this.currentPageIndex = pageIndex;
        var moveTo = new cc.moveTo(0.5,cc.p(this.pageContainer.x,this.pageHeight*pageIndex));
        var callfunc = new cc.callFunc(this.moveDone,this);
        this.pageContainer.runAction(cc.sequence(moveTo,callfunc));
    },

    moveDone:function(sender,s){
        if(this.currentPageIndex>0)
            this.lastPage = this.pagesArray[this.currentPageIndex-1];
        //if(this.lastPage!=null)
        //    this.lastPage.stopAnimation();
        this.currentPage = this.pagesArray[this.currentPageIndex];
        this.currentPage.playAnimation();
    },

    testDealloc:function (dt) {
        //cc.log("SceneTestLayer1:testDealloc");
    },

    onPushScene:function (sender) {
        //var scene = new SceneTestScene();
        //var layer = new SceneTestLayer2();
        //scene.addChild(layer, 0);
        //director.pushScene(scene);
    },

    onPushSceneTran:function (sender) {
        //var scene = new SceneTestScene();
        //var layer = new SceneTestLayer2();
        //scene.addChild(layer, 0);
        //
        //director.pushScene(new cc.TransitionSlideInT(1, scene));
    },
    onQuit:function (sender) {
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

