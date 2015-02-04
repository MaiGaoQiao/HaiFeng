/**
 * Created by johnrunning on 14/12/16.
 */

var Page0Layer = cc.Layer.extend({
    bgLayer:null,
    man:null,
    woman:null,
    animationDone:false,
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
        var background = new cc.Sprite(res.p2_bak_jpg);
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
        // add "HelloWorld" splash screen"
        var people = new cc.Sprite(res.people_png);
        people.attr({
            x: 50,
            y: 0
        });
        this.bgLayer.addChild(people, 0);
        people.setAnchorPoint(cc.p(0,0));
        //people.runAction(
        //    cc.moveBy(2.5, cc.p(40, 40))
        //);

        this.man = new cc.Sprite(res.man_png);
        this.man.attr({
            x: 400,
            y: 0
        });
        this.bgLayer.addChild(this.man, 0);
        this.man.setAnchorPoint(cc.p(0.5,0));
        this.man.setVisible(false);
        //man.runAction(
        //    cc.moveBy(2.5, cc.p(40, 40))
        //);

        this.woman = new cc.Sprite(res.woman_png);
        this.woman.setAnchorPoint(cc.p(0.5,0));
        this.woman.attr({
            x: 850,
            y: 0
        });
        this.bgLayer.addChild(this.woman, 0);
        this.woman.setVisible(false);
        //woman.runAction(
        //    cc.moveBy(2.5, cc.p(40, 40))
        //);

        this.photo = new cc.Sprite(res.p2_text01_png);
        this.photo.setAnchorPoint(cc.p(0.5,0));
        this.photo.attr({
            x: size.width+200,
            y: 200
        });
        this.addChild(this.photo, 100);
        this.photo.setVisible(false);

        this.photo1 = new cc.Sprite(res.p2_netx_png);
        this.photo1.setAnchorPoint(cc.p(0.5,0));
        this.photo1.attr({
            x: size.width/2,
            y: -200
        });
        this.addChild(this.photo1, 101);
        this.photo1.setVisible(false);
        return true;
    },
    onEnter:function () {
        cc.log("SceneTestLayer1#onEnter");
        this._super();
    },

    playAnimation:function () {
        var action1 = cc.moveTo(2.5, cc.p(-55, 0));
        var action3 = cc.delayTime(0.3+2.0);
        var action4 = cc.moveTo(2.5, cc.p(-550, 0));
        var action5 = cc.delayTime(0.3+2.5+2.0);
        var action6 = cc.spawn(cc.moveTo(2.0,cc.p(-250,0)),cc.scaleTo(2.0,0.8,0.8));
        this.bgLayer.runAction( cc.sequence(action1,action3,action4,action5,action6));


        var action2 = cc.delayTime(0.3+2.0);
        this.man.setOpacity(0);
        this.man.setVisible(true);
        this.man.runAction(cc.sequence(action2,cc.fadeIn(1.0)));

        var action5 = cc.delayTime(0.3+2.5+0.3+2.5+1.0+0.5+2.0);
        this.woman.setOpacity(0);
        this.woman.setVisible(true);
        this.woman.runAction(cc.sequence(action5,cc.fadeIn(1.0)));

        var action5 = cc.delayTime(0.3+2.5+0.3+2.5+1.0+0.5+2.0+3.5);
        var photoSize = this.photo.getContentSize();
        this.photo.setOpacity(0);
        this.photo.setVisible(true);
        var action6 = cc.spawn(cc.moveTo(1.5,cc.p(size.width-photoSize.width/2,200)),cc.fadeIn(1.5));
        this.photo.runAction(cc.sequence(action5,action6));

        var action5 = cc.delayTime(0.3+2.5+0.3+2.5+1.0+0.5+2.0+5.5);
        var photoSize = this.photo1.getContentSize();
        this.photo1.setOpacity(0);
        this.photo1.setVisible(true);
        var action6 = cc.spawn(cc.moveTo(1.5,cc.p(size.width/2,0)),cc.fadeIn(1.5));
        var callFunc = new cc.callFunc(this.playAnimationDone);
        this.photo1.runAction(cc.sequence(action5,action6,callFunc));

    },
    stopAnimation:function(){
        director.getActionManager().pauseTarget(this.bgLayer);
        director.getActionManager().pauseTarget(this.man);
        director.getActionManager().pauseTarget(this.woman);
        director.getActionManager().pauseTarget(this.photo);
        director.getActionManager().pauseTarget(this.photo1);
    },
    resumeAnimation:function(){
        director.getActionManager().resumeTarget(this.bgLayer);
        director.getActionManager().resumeTarget(this.man);
        director.getActionManager().resumeTarget(this.woman);
        director.getActionManager().resumeTarget(this.photo);
        director.getActionManager().resumeTarget(this.photo1);
    },

    playAnimationDone:function(){
        this.animationDone = true;
    }
});