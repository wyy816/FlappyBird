function Game(ctx,bird,pipe,land,mountain,tit,index,gameover,bestscore){
    this.ctx = ctx;
    this.bird = bird;
    this.pipeArr = [pipe];
    this.land = land;
    this.mountain = mountain;
    this.timer= null;
    this.tit = tit;
    this.index = index;
    this.gameover = gameover;
    this.iframe = 0;
    this.click = 0;
    this.score = 0;
    this.bestscore = bestscore;
  

    this.init();
}
//读取标题
Game.prototype.readtitle = function (){
    var img = this.tit.img;
    
    this.ctx.drawImage(img,this.tit.x,this.tit.y,img.width/3,img.height/3);
    
}
//读取鸟(包括鸟的旋转)
Game.prototype.readbird = function(){
    var img = this.bird.img;
    this.ctx.save();
    this.ctx.translate(this.bird.x,this.bird.y);
    var deg = this.bird.state =="d" ?Math.PI/180 *this.bird.speed:-Math.PI/180 *this.bird.speed;
    this.ctx.rotate(deg);

    this.ctx.drawImage(img,-img.width/2,-img.height/2);
    this.ctx.restore();

}
//读取山
Game.prototype.readmountain = function(){
    var img = this.mountain.img;
    this.mountain.x -=this.mountain.step;
    if(this.mountain.x < -img.width){
        this.mountain.x = 0;
    }
    this.ctx.drawImage(img,this.mountain.x,0);
    this.ctx.drawImage(img,this.mountain.x + img.width,0);
    this.ctx.drawImage(img,this.mountain.x + img.width*2,0);
}
//读取地面
Game.prototype.readland = function (){
    var img = this.land.img;
    this.land.x -=this.land.step;
    if(this.land.x < -img.width){
        this.land.x = 0 ;
    }

    this.ctx.drawImage(img,this.land.x,this.land.y);
    this.ctx.drawImage(img,this.land.x + img.width,this.land.y);
    this.ctx.drawImage(img,this.land.x +img. width*2,this.land.y);
}
//读取管子
Game.prototype.readpipe = function(){
  var me = this;
  this.pipeArr.forEach(function(value,index){
      //上管子
      var img_up = value.pipe_up;
      var img_x = 0;
      var img_y = img_up.height - value.up_height;
      var img_w = img_up.width;
      var img_h = value.up_height;
      var c_x =me.ctx.canvas.width - value.step * value.count;
      var c_y = 0;
      var c_w = img_w;
      var c_h = img_h;
      me.ctx.drawImage(img_up,img_x,img_y,img_w, img_h,c_x,c_y,c_w,c_h);
      //下管子
      var img_down = value.pipe_down;
      var imgd_x = 0;
      var imgd_y = 0;
      var imgd_w = img_down.width;
      var imgd_h = value.down_height;
      var cd_x =me.ctx.canvas.width - value.step * value.count;
      var cd_y = 150 + value.up_height;
      var cd_w = imgd_w;
      var cd_h = imgd_h;
      me.ctx.drawImage(img_down,imgd_x,imgd_y,imgd_w, imgd_h,cd_x,cd_y,cd_w,cd_h);
      
  })
}
//多根管子
Game.prototype.creatpipes = function() {
    
	var pipe = this.pipeArr[0].creatpipes();
	this.pipeArr.push(pipe);
}
//清除管子
Game.prototype.clearpipe= function(){
    var pipe = this.pipeArr[0];
    if(pipe.x-pipe.step*pipe.count<-pipe.pipe_down.width){
        this.pipeArr.splice(0,1);
      }
    // console.log(this.pipeArr);
}
//管子移动
Game.prototype.movepipe = function() {
	var me = this;
	this.pipeArr.forEach(function(value) {
        value.count++;
      
	})
}
// 粗略碰撞检测
Game.prototype.check = function() {
    //A为小鸟的右上顶点 B为小鸟的右下定点 C为上管子的左下顶点 D为上管子的右下顶点 E为下管子的左上顶点 F为下管子的右上顶点
    var A = {
        x: -this.bird.img.width / 2 + 6 + this.bird.x + this.bird.img.width - 12,
        y: -this.bird.img.height / 2 + 6 + this.bird.y
    }
    var B = {
        x:-this.bird.img.width / 2 + 6 + this.bird.x + this.bird.img.width - 12,
        y: -this.bird.img.height / 2 + 6 + this.bird.y+this.bird.img.height - 12
    }
    // this.ctx.beginPath();
    // this.ctx.moveTo(A.x, A.y);
    // this.ctx.lineTo(B.x, B.y);
    // this.ctx.closePath();
    // this.ctx.strokeStyle = "blue";
    // this.ctx.stroke();
    for(var i = 0;i<this.pipeArr.length;i++){
        var pipe =this.pipeArr[i];
        var C = {
            x: pipe.x - pipe.step * pipe.count,
            y: pipe.up_height
        }
        var D = {
            x: C.x + pipe.pipe_up.width,
            y: pipe.up_height
        }
        var E = {
            x: C.x,
            y:400-pipe.down_height
        }
        var F = {
            x:C.x + pipe.pipe_down.width,
            y:E.y
        }
       
        // this.ctx.beginPath();
        // this.ctx.moveTo(C.x, C.y);
        // this.ctx.lineTo(D.x, D.y);
        // this.ctx.closePath();
        // this.ctx.strokeStyle = "red";
        // this.ctx.stroke();

        // this.ctx.beginPath();
        // this.ctx.moveTo(E.x, E.y);
        // this.ctx.lineTo(F.x, F.y);
        // this.ctx.closePath();
        // this.ctx.strokeStyle = "red";
        // this.ctx.stroke();

    }
    if (A.x >= C.x && A.y <= C.y && A.x <= D.x) {    
        this.readgameover();  
    }
    if (B.x >= E.x && B.y >= E.y && B.x <= F.x) {     
        this.readgameover(); 
    }
}

//游戏结束 并渲染结束页面
Game.prototype.readgameover = function(){
    this.ctx.clearRect(0,0,360,512);
    var img3 = this.index.img3;
    var bgimg = this.gameover.bgimg;
    var img = this.gameover.img; 
    
    this.ctx.drawImage(img3,0,0);
    this.ctx.drawImage(img3,288,0);
    this.readtitle();
    this.ctx.drawImage(bgimg,63,170);
    this.ctx.drawImage(img,82,104);
    var img2 = this.gameover.medalimg;

     //得到的奖牌
    if(this.score<6){
        // console.log(1);
        this.ctx.drawImage(img2[0],95,215);
    }else if(this.score<11){
        // console.log(2);
        this.ctx.drawImage(img2[1],95,215);
    }else{
        // console.log(3);
        this.ctx.drawImage(img2[2],95,215);
    }  

    //当前结束分数
    var arrimg = this.gameover.imgarr;
    if(this.score<10){
        this.ctx.drawImage(arrimg[this.score],243,205);
    }else{
        this.ctx.drawImage(arrimg[this.score%10],248,205);
        this.ctx.drawImage(arrimg[parseInt(this.score/10)],235,204);
    }   
    clearInterval(this.timer);
    clearInterval(this.timer2);
    clearInterval(this.timer3);
    //读取历史最好分数
    if(this.score>sessionStorage.getItem("aaa", this.score)){
        sessionStorage.setItem("aaa", this.score);
        this.bestscore = sessionStorage.getItem("aaa", this.score);
        if(this.bestscore<10){
            this.ctx.drawImage(arrimg[this.bestscore],243,244);
        }else{
            this.ctx.drawImage(arrimg[this.bestscore%10],248,245);
            this.ctx.drawImage(arrimg[parseInt(this.bestscore/10)],235,244);
        }   
    }else{
        this.bestscore = sessionStorage.getItem("aaa", this.score);
        if(this.bestscore<10){
            this.ctx.drawImage(arrimg[this.bestscore],243,245);
        }else{
            this.ctx.drawImage(arrimg[this.bestscore%10],248,245);
            this.ctx.drawImage(arrimg[parseInt(this.bestscore/10)],235,244);
        } 
    }
    
}
//读取分数
Game.prototype.readscore = function(){
    var arrimg = this.gameover.imgarr;     
    if(this.score<10){
        this.ctx.drawImage(arrimg[this.score],180,0);
    }else{
        this.ctx.drawImage(arrimg[this.score%10],190,0);
        this.ctx.drawImage(arrimg[parseInt(this.score/10)],170,0);
    }
}


//游戏初始化
Game.prototype.init = function(){
    this.readindex();
    this.readtitle();
    this.event();
}
//游戏开始
Game.prototype.start = function(){
 
    var me = this;
    function speed(){
        me.iframe++;
        me.readmountain();
        me.readland();
        me.readbird();
        me.readtitle();
        me.readscore();
        if(me.score<6){
            me.bird.fly1();

        }else if(me.score<11){
            me.bird.fly2();
        }else{
            me.bird.fly3();
        }
        me.bird.down();
        me.readpipe();
        me.check();
        me.movepipe();
        if(me.iframe%65==0){
            me.creatpipes();
            me.clearpipe();
            me.score++;
            // console.log(me.score);
        }
    }
    
  
    this.timer = setInterval(function(){
        speed();
        if(me.score>5){
            clearInterval(me.timer);
            var i = me;
            me.timer2 =  setInterval(function(){
               speed();
               if(i.score>10){
                   clearInterval(i.timer2);
                   me.timer3 = setInterval(function(){
                      speed();
                   },16);
               }
            },20);
        }
    },25)
}
//读取首页
Game.prototype.readindex = function (){
    var img1 = this.index.img1;
    var img2 = this.index.img2;
    var img3 = this.index.img3;
    this.ctx.drawImage(img3,0,0);
    this.ctx.drawImage(img3,288,0)
    this.ctx.drawImage(img1,82,174);
    this.ctx.drawImage(img2,122,234);

}
//绑定点击事件
Game.prototype.event = function (){
    var me = this;
    this.ctx.canvas.onclick = function(){
        me.click++;       
        if(me.click==1){
           me.start();                  
        }else{
            me.bird.up(); 
        }       
    }

}