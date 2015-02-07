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
    peopleIn:null,
    peopleOut:null,
    photoFrame:null,
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

        this.photoLayer = new cc.Layer();
        this.bgLayer.addChild(this.photoLayer);
        this.photoLayer.setPosition(0,0);


        this.peopleIn = new cc.Sprite(res.p7_people_in);
        this.peopleIn.attr({
            x: 320,
            y: 0
        });
        this.photoLayer.addChild(this.peopleIn, 2);
        this.peopleIn.setAnchorPoint(cc.p(0.5,0));
        //this.peopleIn.setVisible(false);

        this.peopleOut = new cc.Sprite(res.p7_people_out);
        this.peopleOut.attr({
            x: 320,
            y: 0
        });
        this.photoLayer.addChild(this.peopleOut, 2);
        this.peopleOut.setAnchorPoint(cc.p(0.5,0));
        //this.peopleOut.setVisible(false);

        this.photoFrame = new cc.Sprite(res.p7_kuang);
        this.photoFrame.attr({
            x: 320,
            y: 0
        });
        this.photoLayer.addChild(this.photoFrame, 0);
        this.photoFrame.setAnchorPoint(cc.p(0.5,0));
        this.photoFrame.setVisible(false);

        this.photo = new cc.Sprite(res.p7_text);
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
        var action2 = cc.delayTime(0.5);
        this.photoFrame.setOpacity(0);
        this.photoFrame.setVisible(true);
        this.photoFrame.runAction(cc.sequence(action2,cc.fadeTo(2.0,122),cc.tintTo(1.0,122,122,122)));//,cc.tintTo(1.5,122,122,122)

        var action3 = cc.delayTime(2.0);
        //this.people2.setOpacity(122);
        this.peopleOut.setVisible(true);
        this.peopleOut.runAction(cc.sequence(action3,cc.fadeTo(2.0,0)));//,cc.tintTo(1.5,177,177,177)

        var action3 = cc.delayTime(3.0);
        //this.people2.setOpacity(122);
        this.peopleIn.setVisible(true);
        this.peopleIn.runAction(cc.sequence(action3,cc.fadeTo(2.0,122),cc.tintTo(1.0,122,122,122)));//,cc.tintTo(1.5,177,177,177)


        //var action4 = cc.delayTime(2.5);
        //this.photoLayer.runAction(cc.sequence(action4,cc.tintTo(1.0,177,177,0)));

        var action5 = cc.delayTime(0.3+4.5+0.3);
        var photoSize = this.photo.getContentSize();
        this.photo.setOpacity(0);
        this.photo.setVisible(true);
        var action6 = cc.spawn(cc.moveTo(1.5,cc.p(size.width-photoSize.width/2,50)),cc.fadeIn(2.5));
        this.photo.runAction(cc.sequence(action5,action6));

        var action5 = cc.delayTime(0.3+2.5+0.3+2.5+1.0);
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
        this.playingAnimation = false;
    }
});

