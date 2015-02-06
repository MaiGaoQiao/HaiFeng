/**
 * Created by johnrunning on 14/12/16.
 */

var Page5Layer = cc.Layer.extend({
    bgLayer:null,
    animationDone:false,
    playingAnimation:false,
    photoLayer:null,
    photo:null,
    photo1:null,
    people:null,
    people2:null,
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

        var label = cc.LabelTTF.create("样片", "Microsoft STSong", 200);
        label.setColor(cc.color(255,255,255,80));
        label.setOpacity(150);
        label.setPosition(cc.p(size.width/2,size.height/2));
        this.addChild(label);

        this.bgLayer = new cc.Layer();
        this.addChild(this.bgLayer);
        this.bgLayer.setPosition(0,0);

        this.photoLayer = new cc.Layer();
        this.bgLayer.addChild(this.photoLayer);
        this.photoLayer.setPosition(0,0);


        this.people = new cc.Sprite(res.p7_people1);
        this.people.attr({
            x: 320,
            y: 0
        });
        this.photoLayer.addChild(this.people, 2);
        this.people.setAnchorPoint(cc.p(0.5,0));
        this.people.setVisible(false);

        this.people2 = new cc.Sprite(res.p7_people2);
        this.people2.attr({
            x: 320,
            y: 0
        });
        this.photoLayer.addChild(this.people2, 0);
        this.people2.setAnchorPoint(cc.p(0.5,0));
        this.people2.setVisible(false);

        this.photo = new cc.Sprite(res.p7_text);
        this.photo.setAnchorPoint(cc.p(0.5,0));
        this.photo.attr({
            x: size.width- 400,
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
        var action2 = cc.delayTime(0.5);
        this.people.setOpacity(0);
        this.people.setVisible(true);
        this.people.runAction(cc.sequence(action2,cc.fadeIn(1.0),cc.tintTo(1.5,177,177,0)));

        var action3 = cc.delayTime(1.5);
        this.people2.setOpacity(0);
        this.people2.setVisible(true);
        this.people2.runAction(cc.sequence(action3,cc.fadeIn(1.0),cc.tintTo(1.5,177,177,177)));


        //var action4 = cc.delayTime(2.5);
        //this.photoLayer.runAction(cc.sequence(action4,cc.tintTo(1.0,177,177,0)));

        var action5 = cc.delayTime(0.3+2.5+0.3);
        var photoSize = this.photo.getContentSize();
        this.photo.setOpacity(0);
        this.photo.setVisible(true);
        var action6 = cc.spawn(cc.moveTo(1.5,cc.p(size.width-photoSize.width/2,50)),cc.fadeIn(2.5));
        this.photo.runAction(cc.sequence(action5,action6));

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
        this.playingAnimation = false;
    }
});

