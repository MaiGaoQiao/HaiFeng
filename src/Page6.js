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
    shareItem:null,
    restartItem:null,
    packagePhoto:null,
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

        //var label = cc.LabelTTF.create("样片", "Microsoft STSong", 200);
        //label.setColor(cc.color(255,255,255,80));
        //label.setOpacity(150);
        //label.setPosition(cc.p(size.width/2,size.height/2));
        //this.addChild(label);

        this.bgLayer = new cc.Layer();
        this.addChild(this.bgLayer);
        this.bgLayer.setPosition(0,0);
        this.flowerPhoto = new cc.Sprite(res.p08_flower);
        this.flowerPhoto.attr({
            x: 320,
            y: 70
        });
        this.bgLayer.addChild(this.flowerPhoto, 0);
        this.flowerPhoto.setAnchorPoint(cc.p(0.5,0));
        this.flowerPhoto.setVisible(false);

        this.bgLayer = new cc.Layer();
        this.addChild(this.bgLayer);
        this.bgLayer.setPosition(0,0);
        this.textPhoto = new cc.Sprite(res.p08_text);
        var photoSize = this.textPhoto.getContentSize();
        this.textPhoto.attr({
            x: size.width/2+5,
            y: 70
        });
        this.bgLayer.addChild(this.textPhoto, 0);
        this.textPhoto.setAnchorPoint(cc.p(0.5,0));
        this.textPhoto.setVisible(false);

        this.bgLayer = new cc.Layer();
        this.addChild(this.bgLayer);
        this.bgLayer.setPosition(0,0);
        this.flowersPhoto = new cc.Sprite(res.p08_flowers);
        this.flowersPhoto.attr({
            x: 400,
            y: 0
        });
        this.bgLayer.addChild(this.flowersPhoto, 0);
        this.flowersPhoto.setAnchorPoint(cc.p(0.5,0));
        this.flowersPhoto.setVisible(false);



        this.packagePhoto = new cc.Sprite(res.p08_flowersbag_png);
        this.packagePhoto.attr({
            x: 400,
            y: -100
        });
        this.bgLayer.addChild(this.packagePhoto, 0);
        this.packagePhoto.setAnchorPoint(cc.p(0.5,0));
        this.packagePhoto.setVisible(false);

        //this.photo1 = new cc.Sprite(res.p2_netx_png);
        //this.photo1.setAnchorPoint(cc.p(0.5,0));
        //this.photo1.attr({
        //    x: size.width/2,
        //    y: -200
        //});
        //this.addChild(this.photo1, 100);
        //this.photo1.setVisible(false);

        var sprite = new cc.Sprite(res.shareButton_png);
        var sprite1 = new cc.Sprite(res.shareButton_png);
        sprite1.setScale(1.1);
        var spriteSize = sprite.getContentSize();
        sprite1.setPosition(cc.p(-spriteSize.width*0.1/2,-spriteSize.height*0.1/2));

        this.shareItem = new cc.MenuItemSprite(sprite,sprite1,function () {
            //cc.audioEngine.playEffect(res.button_press_wav, false);
            this.shareGame();
        }, this);
        this.shareItem.x = size.width/2+120;
        this.shareItem.y = size.height/2+50;
        this.shareItem.setOpacity(0);

        var sprite = new cc.Sprite(res.buyButton_png);
        var sprite1 = new cc.Sprite(res.buyButton_png);
        sprite1.setScale(1.1);
        var spriteSize = sprite.getContentSize();
        sprite1.setPosition(cc.p(-spriteSize.width*0.1/2,-spriteSize.height*0.1/2));

        this.restartItem = new cc.MenuItemSprite(sprite,sprite1,function () {
            //cc.audioEngine.playEffect(res.button_press_wav, false);
            this.jumpPage();
        }, this);
        this.restartItem.x = size.width/2-120;
        this.restartItem.y = size.height/2+50;
        this.restartItem.setOpacity(0);

        var menu = new cc.Menu(this.restartItem,this.shareItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu);

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
        //var asprite = new cc.Sprite(res.arrow_png);
        //this.photo1.addChild(asprite,0);
        //asprite.setPosition(size.width/2,45);
        //asprite.runAction(cc.repeatForever(cc.sequence(cc.moveBy(1.5,cc.p(0,20)),cc.moveBy(1.5,cc.p(0,-20)))));
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
        this.textPhoto.runAction(cc.sequence(action3,cc.fadeIn(2.5)));


        var callFunc = new cc.callFunc(this.playAnimationDone);
        var action4 = cc.delayTime(0.3+2.0+0.5+1.5);
        this.flowersPhoto.setOpacity(0);
        this.flowersPhoto.setVisible(true);
        var callFuncFlowerFadeDone = new cc.callFunc(this.flowerFadeDone,this,this);
        this.flowersPhoto.runAction(cc.sequence(action4,cc.fadeIn(2.0),cc.fadeOut(2.0),callFuncFlowerFadeDone));

        //var action5 = cc.delayTime(0.3+2.5+0.3+2.5+1.0);
        //var photoSize = this.photo1.getContentSize();
        //this.photo1.setOpacity(0);
        //this.photo1.setVisible(true);
        //var action6 = cc.spawn(cc.moveTo(1.5,cc.p(size.width/2,0)),cc.fadeIn(1.5));
        //var callFunc = new cc.callFunc(this.playAnimationDone);
        //this.photo1.runAction(cc.sequence(action5,action6,callFunc));

        var action8 = cc.delayTime(0.3+2.5+0.3+3.0);
        var action9 = cc.delayTime(0.3+2.5+0.3+3.0);

        this.restartItem.runAction(cc.sequence(action8,cc.spawn(cc.fadeIn(1.0))));//cc.moveTo(1.0,cc.p(size.width/2,350))
        this.shareItem.runAction(cc.sequence(action9,cc.spawn(cc.fadeIn(1.0)),callFunc));//cc.moveTo(1.0,cc.p(size.width/2,250))

    },
    flowerFadeDone:function(sender ,s) {
        var action4 = cc.delayTime(0.1);
        this.packagePhoto.setOpacity(0);
        this.packagePhoto.setVisible(true);
        var callFuncFlowerFadeDone = new cc.callFunc(this.packageFadeDone,this,this);
        this.packagePhoto.runAction(cc.sequence(action4,cc.fadeIn(2.0),cc.fadeOut(2.0),callFuncFlowerFadeDone));
    },

    packageFadeDone:function(sender ,s) {
        var action4 = cc.delayTime(0.1);
        this.flowersPhoto.setOpacity(0);
        this.flowersPhoto.setVisible(true);
        var callFuncFlowerFadeDone = new cc.callFunc(this.flowerFadeDone,this,this);
        this.flowersPhoto.runAction(cc.sequence(action4,cc.fadeIn(2.0),cc.fadeOut(2.0),callFuncFlowerFadeDone));
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
        share_btClicked();
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
    },

    jumpPage:function(){
        window.location.href="http://m.mcake.com/hd/2015/valentine.html?key1=ad&key2=kolwapbluefocus";
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
