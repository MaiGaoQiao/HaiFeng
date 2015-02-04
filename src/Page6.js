/**
 * Created by johnrunning on 14/12/16.
 */

var Page6Layer = cc.Layer.extend({
    bgLayer:null,
    animationDone:false,
    playingAnimation:false,
    flowerPhoto:null,
    textPhoto:null,
    flowersPhoto:null,
    photo:null,
    shareUI:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;

        //page 0 begin
        var page = new cc.Layer();
        this.addChild(page);

        this.bgLayer =new cc.Layer();
        page.addChild(this.bgLayer);
        this.bgLayer.setPosition(0,0);
        var background = new cc.Sprite(bgTexture2d);
        var bgSize = background.getContentSize();
        background.attr({
            x: 0,
            y: -(bgSize.height - size.height)
        });

        this.bgLayer.addChild(background, 0);
        background.setAnchorPoint(cc.p(0,0));

        this.bgLayer = new cc.Layer();
        this.addChild(this.bgLayer);
        this.bgLayer.setPosition(0,0);
        this.flowerPhoto = new cc.Sprite(res.p08_flower);
        this.flowerPhoto.attr({
            x: 320,
            y: 0
        });
        this.bgLayer.addChild(this.flowerPhoto, 0);
        this.flowerPhoto.setAnchorPoint(cc.p(0.5,0));
        this.flowerPhoto.setVisible(false);

        this.bgLayer = new cc.Layer();
        this.addChild(this.bgLayer);
        this.bgLayer.setPosition(0,0);
        this.textPhoto = new cc.Sprite(res.p08_text);
        this.textPhoto.attr({
            x: 345,
            y: 0
        });
        this.bgLayer.addChild(this.textPhoto, 0);
        this.textPhoto.setAnchorPoint(cc.p(0.5,0));
        this.textPhoto.setVisible(false);

        this.bgLayer = new cc.Layer();
        this.addChild(this.bgLayer);
        this.bgLayer.setPosition(0,0);
        this.flowersPhoto = new cc.Sprite(res.p08_flowers);
        this.flowersPhoto.attr({
            x: 415,
            y: 0
        });
        this.bgLayer.addChild(this.flowersPhoto, 0);
        this.flowersPhoto.setAnchorPoint(cc.p(0.5,0));
        this.flowersPhoto.setVisible(false);

        this.photo1 = new cc.Sprite(res.p2_netx_png);
        this.photo1.setAnchorPoint(cc.p(0.5,0));
        this.photo1.attr({
            x: size.width/2,
            y: -200
        });
        this.addChild(this.photo1, 100);
        this.photo1.setVisible(false);

        this.shareUI = new ShareUI();
        this.addChild(this.shareUI, 200);
        this.shareUI.visible =false;

        //cc.eventManager.addListener({
        //    event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //    swallowTouches: true,
        //    onTouchBegan: this.onTouchBegan,
        //    onTouchMoved: this.onTouchMoved,
        //    onTouchEnded: this.onTouchEnded
        //}, this);
        return true;
    },

    onTouchBegan:function (touch, event) {
        var target = event.getCurrentTarget();
        var position = touch.getLocation();
        //target.shareGame();

        return true;
    },
    onTouchMoved:function (touch, event) {
    },
    onTouchEnded:function (touch, event) {
    },

    onEnter:function () {
        this._super();
    },

    playAnimation:function () {
        if(this.playingAnimation) return;
        this.playingAnimation = true;
        var action1 = cc.moveTo(2.5, cc.p(-80, 0));
        //var action3 = cc.delayTime(0.3+2.0);
        //var action4 = cc.moveTo(2.5, cc.p(-550, 0));
        //var action5 = cc.delayTime(0.3+2.5+2.0);
        //var action6 = cc.spawn(cc.moveTo(2.0,cc.p(-250,0)),cc.scaleTo(2.0,0.8,0.8));
        this.bgLayer.runAction( cc.sequence(action1));

        var action2 = cc.delayTime(0.5);
        this.flowerPhoto.setOpacity(0);
        this.flowerPhoto.setVisible(true);
        this.flowerPhoto.runAction(cc.sequence(action2,cc.fadeIn(1.0)));

        var action3 = cc.delayTime(0.3+2.0+0.5);
        this.textPhoto.setOpacity(0);
        this.textPhoto.setVisible(true);
        this.textPhoto.runAction(cc.sequence(action3,cc.fadeIn(1.0)));

        var action4 = cc.delayTime(0.3+2.0+0.5+1.5);
        this.flowersPhoto.setOpacity(0);
        this.flowersPhoto.setVisible(true);
        this.flowersPhoto.runAction(cc.sequence(action4,cc.fadeIn(1.0)));

        var action5 = cc.delayTime(0.3+2.5+0.3+2.5+1.0);
        var photoSize = this.photo1.getContentSize();
        this.photo1.setOpacity(0);
        this.photo1.setVisible(true);
        var action6 = cc.spawn(cc.moveTo(1.5,cc.p(size.width/2,0)),cc.fadeIn(1.5));
        var callFunc = new cc.callFunc(this.playAnimationDone);
        this.photo1.runAction(cc.sequence(action5,action6,callFunc));

    },
    stopAnimation:function(){
        cc.director.getActionManager().pauseTarget(this.bgLayer);
        cc.director.getActionManager().pauseTarget(this.flowerPhoto);
        cc.director.getActionManager().pauseTarget(this.textPhoto);
        cc.director.getActionManager().pauseTarget(this.flowersPhoto);
        cc.director.getActionManager().pauseTarget(this.photo1);

    },
    resumeAnimation:function(){
        cc.director.getActionManager().resumeTarget(this.bgLayer);
        cc.director.getActionManager().pauseTarget(this.flowerPhoto);
        cc.director.getActionManager().pauseTarget(this.textPhoto);
        cc.director.getActionManager().pauseTarget(this.flowersPhoto);
        cc.director.getActionManager().resumeTarget(this.photo1);
    },
    playAnimationDone:function(){
        this.animationDone = true;
        this.playingAnimation = false;
    },

    shareGame:function(){
        //if(this.level < 5){
        //    wxData["desc"]= descrition = "我未能帮最强大脑主持人找到厕所，你来试试吧。";
        //}else if(this.level < 10){
        //    wxData["desc"]= descrition = "帮最强大脑主持人找厕所，怎么这么难！";
        //}else if(this.level < 15){
        //    wxData["desc"]= descrition = "你能帮最强大脑蒋昌建找到厕所吗？";
        //}else if(this.level < 20){
        //    wxData["desc"]= descrition = "好难啊，找厕所也需要最强大脑吗？";
        //}
        this.shareUI.visible =true;
    }
});


var ShareUI = cc.LayerColor.extend({
    ctor: function () {
        this._super(cc.color(0, 0, 0, 125), cc.winSize.width, cc.winSize.height);
        var bg = new cc.Sprite(res.p8arrow_png);
        bg.x = cc.winSize.width/2;
        bg.y = cc.winSize.height/2;
        this.addChild(bg);

        bg = new cc.Sprite(res.p8text_png);
        bg.x = cc.winSize.width/2;
        bg.y = cc.winSize.height/2;
        this.addChild(bg);
    },
    onEnter: function () {
        this._super();
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                //this.removeFromParent();
                target.visible =false;
            }
        }, this);
    }
});
