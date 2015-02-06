/**
 * Created by johnrunning on 14/12/16.
 */

var Page00Layer = cc.Layer.extend({
    bgLayer:null,
    man:null,
    woman:null,
    animationDone:false,
    playingAnimation:false,
    photo:null,
    photo1:null,
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

        var label = cc.LabelTTF.create("样片", "Microsoft STSong", 200);
        label.setColor(cc.color(255,255,255,80));
        label.setOpacity(150);
        label.setPosition(cc.p(size.width/2,size.height/2));
        this.addChild(label);

        this.man = new cc.Sprite(res.p01_flower_png);
        this.man.attr({
            x: size.width/2,
            y: size.height/2+100
        });
        this.bgLayer.addChild(this.man, 0);
        this.man.setAnchorPoint(cc.p(0.5,0.5));
        this.man.setVisible(false);

        this.photo = new cc.Sprite(res.p01_text_png);
        this.photo.setAnchorPoint(cc.p(0.5,0.5));
        this.photo.attr({
            x: size.width/2,
            y: size.height/2-100
        });
        this.addChild(this.photo, 100);
        this.photo.setVisible(false);

        this.woman = new cc.Sprite(res.p01_flowers_png);
        this.woman.setAnchorPoint(cc.p(0.5,0.5));
        this.woman.attr({
            x: size.width/2-300,
            y: size.height/2
        });
        this.bgLayer.addChild(this.woman, 0);
        this.woman.setVisible(false);
        //woman.runAction(
        //    cc.moveBy(2.5, cc.p(40, 40))
        //);


        this.photo1 = new cc.Sprite(res.p2_netx_png);
        this.photo1.setAnchorPoint(cc.p(0.5,0));
        this.photo1.attr({
            x: size.width/2,
            y: -200
        });
        this.addChild(this.photo1, 101);
        this.photo1.setVisible(false);

        var asprite = new cc.Sprite(res.arrow_png);
        this.photo1.addChild(asprite,0);
        asprite.setPosition(size.width/2,45);
        asprite.runAction(cc.repeatForever(cc.sequence(cc.moveBy(1.5,cc.p(0,20)),cc.moveBy(1.5,cc.p(0,-20)))));
        return true;
    },
    onEnter:function () {
        this._super();
    },

    playAnimation:function () {
        if(this.playingAnimation) return;
        this.playingAnimation = true;
        var size = cc.winSize;

        var action1 = cc.delayTime(0.5);
        this.man.setOpacity(0);
        this.man.setVisible(true);
        this.man.runAction(cc.sequence(action1,cc.spawn(cc.moveTo(1.0,cc.p(size.width/2,size.height/2)),cc.fadeIn(1.0))));

        var action2 = cc.delayTime(1.5);
        this.photo.setOpacity(0);
        this.photo.setVisible(true);
        this.photo.runAction(cc.sequence(action2,cc.spawn(cc.moveTo(1.0,cc.p(size.width/2,size.height/2)),cc.fadeIn(1.0))));

        var action3= cc.delayTime(2.5);
        this.woman.setOpacity(0);
        this.woman.setVisible(true);
        this.woman.runAction(cc.sequence(action3,cc.spawn(cc.moveTo(1.0,cc.p(size.width/2,size.height/2)),cc.fadeIn(1.0))));

        var action5 = cc.delayTime(3.5);
        var photoSize = this.photo1.getContentSize();
        this.photo1.setOpacity(0);
        this.photo1.setVisible(true);
        var action6 = cc.spawn(cc.moveTo(1.5,cc.p(size.width/2,0)),cc.fadeIn(1.5));
        var callFunc = new cc.callFunc(this.playAnimationDone);
        this.photo1.runAction(cc.sequence(action5,action6,callFunc));
    },
    stopAnimation:function(){
        cc.director.getActionManager().pauseTarget(this.bgLayer);
        cc.director.getActionManager().pauseTarget(this.man);
        cc.director.getActionManager().pauseTarget(this.woman);
        cc.director.getActionManager().pauseTarget(this.photo);
        cc.director.getActionManager().pauseTarget(this.photo1);
    },
    resumeAnimation:function(){
        cc.director.getActionManager().resumeTarget(this.bgLayer);
        cc.director.getActionManager().resumeTarget(this.man);
        cc.director.getActionManager().resumeTarget(this.woman);
        cc.director.getActionManager().resumeTarget(this.photo);
        cc.director.getActionManager().resumeTarget(this.photo1);
    },

    playAnimationDone:function(){
        this.animationDone = true;
        this.playingAnimation = false;
    }
});