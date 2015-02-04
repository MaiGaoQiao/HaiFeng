/**
 * Created by johnrunning on 14/12/16.
 */

var Page6Layer = cc.Layer.extend({
    bgLayer:null,
    animationDone:null,
    flowerPhoto:null,
    textPhoto:null,
    flowersPhoto:null,
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
        return true;
    },

    onEnter:function () {
        cc.log("SceneTestLayer1#onEnter");
        this._super();
    },

    playAnimation:function () {

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
        director.getActionManager().pauseTarget(this.bgLayer);
        director.getActionManager().pauseTarget(this.flowerPhoto);
        director.getActionManager().pauseTarget(this.textPhoto);
        director.getActionManager().pauseTarget(this.flowersPhoto);
        director.getActionManager().pauseTarget(this.photo1);

    },
    resumeAnimation:function(){
        director.getActionManager().resumeTarget(this.bgLayer);
        director.getActionManager().pauseTarget(this.flowerPhoto);
        director.getActionManager().pauseTarget(this.textPhoto);
        director.getActionManager().pauseTarget(this.flowersPhoto);
        director.getActionManager().resumeTarget(this.photo1);
    },
    playAnimationDone:function(){
        this.animationDone = true;
    }
});

