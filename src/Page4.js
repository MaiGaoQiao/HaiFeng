/**
 * Created by johnrunning on 14/12/16.
 */

var Page4Layer = cc.Layer.extend({
    bgLayer:null,
    animationDone:false,
    playingAnimation:false,
    photo:null,
    photo1:null,
    ffSprite:null,
    womanPeople:null,
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

        this.ffSprite = new cc.Sprite(res.p6_ff);
        this.ffSprite.attr({
            x: 320,
            y: 0
        });
        this.bgLayer.addChild(this.ffSprite, 0);
        this.ffSprite.setAnchorPoint(cc.p(0.5,0));
        this.ffSprite.setVisible(false);

        this.womanPeople = new cc.Sprite(res.p6_people);
        this.womanPeople.attr({
            x: 320,
            y: 0
        });
        this.bgLayer.addChild(this.womanPeople, 0);
        this.womanPeople.setAnchorPoint(cc.p(0.5,0));
        this.womanPeople.setVisible(false);

        this.photo = new cc.Sprite(res.p6_text);
        var photoSize = this.photo.getContentSize();
        this.photo.setAnchorPoint(cc.p(0.5,0));
        this.photo.attr({
            x: size.width-photoSize.width/2,
            y: 50
        });
        this.addChild(this.photo, 100);
        this.photo.setVisible(false);

        this.photo1 = new cc.Sprite(res.p2_netx_png);
        this.photo1.setAnchorPoint(cc.p(0.5,0));
        this.photo1.attr({
            x: size.width/2,
            y: 0
        });
        this.addChild(this.photo1, 100);
        //this.photo1.setVisible(false);
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

        var action1 = cc.delayTime(0.5);
        this.ffSprite.setOpacity(0);
        this.ffSprite.setVisible(true);
        this.ffSprite.runAction(cc.sequence(action1,cc.fadeIn(1.0)));

        var action2 = cc.delayTime(1.5);
        this.womanPeople.setOpacity(0);
        this.womanPeople.setVisible(true);
        this.womanPeople.runAction(cc.sequence(action2,cc.fadeIn(1.0)));

        var action5 = cc.delayTime(0.6+2.5+0.6);
        var photoSize = this.photo.getContentSize();
        this.photo.setOpacity(0);
        this.photo.setVisible(true);
        var action6 = cc.spawn(cc.moveTo(1.5,cc.p(size.width-photoSize.width/2,50)),cc.fadeIn(2.5));
        this.photo.runAction(cc.sequence(action5,action6));

        var action5 = cc.delayTime(0.6+2.5+0.6+2.5+1.0);
        var photoSize = this.photo1.getContentSize();
        //this.photo1.setOpacity(0);
        this.photo1.setVisible(true);
        var action6 = cc.spawn(cc.moveTo(1.5,cc.p(size.width/2,0)));//,cc.fadeIn(1.5)
        var callFunc = new cc.callFunc(this.playAnimationDone);
        this.photo1.runAction(cc.sequence(action5,action6,callFunc));

    },
    stopAnimation:function(){
        cc.director.getActionManager().pauseTarget(this.bgLayer);
        cc.director.getActionManager().pauseTarget(this.womanPeople);
        cc.director.getActionManager().pauseTarget(this.photo);
        cc.director.getActionManager().pauseTarget(this.photo1);
    },
    resumeAnimation:function(){
        cc.director.getActionManager().resumeTarget(this.bgLayer);
        cc.director.getActionManager().pauseTarget(this.womanPeople);
        cc.director.getActionManager().resumeTarget(this.photo);
        cc.director.getActionManager().resumeTarget(this.photo1);
    },
    playAnimationDone:function(){
        this.animationDone = true;
        //this.playingAnimation = false;
    }
});

