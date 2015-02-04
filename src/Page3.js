/**
 * Created by johnrunning on 14/12/16.
 */

var Page3Layer = cc.Layer.extend({
    bgLayer:null,
    animationDone:false,
    playingAnimation:false,
    datePhoto:null,
    girlPhoto:null,
    marriagePhoto:null,
    photo:null,
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
        this.datePhoto = new cc.Sprite(res.p5_a);
        this.datePhoto.attr({
            x: 320,
            y: 0
        });
        this.bgLayer.addChild(this.datePhoto, 0);
        this.datePhoto.setAnchorPoint(cc.p(0.5,0));
        this.datePhoto.setVisible(false);

        this.bgLayer = new cc.Layer();
        this.addChild(this.bgLayer);
        this.bgLayer.setPosition(0,0);
        this.marriagePhoto = new cc.Sprite(res.p5_c);
        this.marriagePhoto.attr({
            x: 345,
            y: 0
        });
        this.bgLayer.addChild(this.marriagePhoto, 0);
        this.marriagePhoto.setAnchorPoint(cc.p(0.5,0));
        this.marriagePhoto.setVisible(false);

        this.bgLayer = new cc.Layer();
        this.addChild(this.bgLayer);
        this.bgLayer.setPosition(0,0);
        this.girlPhoto = new cc.Sprite(res.p5_b);
        this.girlPhoto.attr({
            x: 415,
            y: 0
        });
        this.bgLayer.addChild(this.girlPhoto, 0);
        this.girlPhoto.setAnchorPoint(cc.p(0.5,0));
        this.girlPhoto.setVisible(false);

        this.photo = new cc.Sprite(res.p5_text);
        this.photo.setAnchorPoint(cc.p(0.5,0));
        this.photo.attr({
            x: size.width-400,
            y: -400
        });
        this.addChild(this.photo, 100);
        this.photo.setVisible(false);

        this.photo1 = new cc.Sprite(res.p2_netx_png);
        this.photo1.setAnchorPoint(cc.p(0.5,0));
        this.photo1.attr({
            x: size.width/2,
            y: -200
        });
        this.addChild(this.photo1, 100);
        this.photo1.setVisible(false);
        return true;
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
        this.datePhoto.setOpacity(0);
        this.datePhoto.setVisible(true);
        this.datePhoto.runAction(cc.sequence(action2,cc.fadeIn(1.0)));

        var action3 = cc.delayTime(0.3+2.0+0.5);
        this.marriagePhoto.setOpacity(0);
        this.marriagePhoto.setVisible(true);
        this.marriagePhoto.runAction(cc.sequence(action3,cc.fadeIn(1.0)));

        var action4 = cc.delayTime(0.3+2.0+0.5+1.5);
        this.girlPhoto.setOpacity(0);
        this.girlPhoto.setVisible(true);
        this.girlPhoto.runAction(cc.sequence(action4,cc.fadeIn(1.0)));

        var action5 = cc.delayTime(0.3+2.5+0.3+1.0+0.5+2.0);
        var photoSize = this.photo.getContentSize();
        this.photo.setOpacity(0);
        this.photo.setVisible(true);
        var action6 = cc.spawn(cc.moveTo(1.5,cc.p(size.width-photoSize.width/2,0)),cc.fadeIn(1.5));
        this.photo.runAction(cc.sequence(action5,action6));

        var action5 = cc.delayTime(0.3+2.5+0.3+2.5+1.0+0.5+2.0);
        var photoSize = this.photo1.getContentSize();
        this.photo1.setOpacity(0);
        this.photo1.setVisible(true);
        var action6 = cc.spawn(cc.moveTo(1.5,cc.p(size.width/2,0)),cc.fadeIn(1.5));
        var callFunc = new cc.callFunc(this.playAnimationDone);
        this.photo1.runAction(cc.sequence(action5,action6,callFunc));

    },
    stopAnimation:function(){
        cc.director.getActionManager().pauseTarget(this.bgLayer);
        cc.director.getActionManager().pauseTarget(this.datePhoto);
        cc.director.getActionManager().pauseTarget(this.marriagePhoto);
        cc.director.getActionManager().pauseTarget(this.girlPhoto);
        cc.director.getActionManager().pauseTarget(this.photo);
        cc.director.getActionManager().pauseTarget(this.photo1);

    },
    resumeAnimation:function(){
        cc.director.getActionManager().resumeTarget(this.bgLayer);
        cc.director.getActionManager().pauseTarget(this.datePhoto);
        cc.director.getActionManager().pauseTarget(this.marriagePhoto);
        cc.director.getActionManager().pauseTarget(this.girlPhoto);
        cc.director.getActionManager().resumeTarget(this.photo);
        cc.director.getActionManager().resumeTarget(this.photo1);
    },
    playAnimationDone:function(){
        this.animationDone = true;
        this.playingAnimation = false;
    }
});

