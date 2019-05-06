function Bird(imgarr1,imgarr2,imgarr3,x,y){
    this.imgarr = imgarr1;
    this.imgarr2 = imgarr2;
    this.imgarr3 = imgarr3;
    this.x = x;
    this.y = y;
    this.index = parseInt(Math.random() *imgarr1.length);
    this.img = this.imgarr[this.index];
    this.iframe = 0;
    this.speed = 0;
    this.state = "d";

}
// 鸟1摆动翅膀
Bird.prototype.fly1 = function(){
    this.index++;
    this.iframe++;
    if(this.index>this.imgarr.length-1){
        this.index = 0
    }
    if(this.iframe % 10 == 0){

        this.img = this.imgarr[this.index];
    }
}
// 鸟2摆动翅膀
Bird.prototype.fly2 = function(){
    this.index++;
    this.iframe++;
    if(this.index>this.imgarr.length-1){
        this.index = 0
    }
    if(this.iframe % 10 == 0){

        this.img = this.imgarr2[this.index];
    }
}
// 鸟3摆动翅膀
Bird.prototype.fly3 = function(){
    this.index++;
    this.iframe++;
    if(this.index>this.imgarr.length-1){
        this.index = 0
    }
    if(this.iframe % 10 == 0){

        this.img = this.imgarr3[this.index];
    }
}
// 鸟下降上升
Bird.prototype.down = function (){
    if(this.state =="d"){
         this.speed ++; 
         this.y +=Math.sqrt(this.speed);
    }else{
        this.speed--;
        if(this.speed===0){
            this.state = "d";
            return;
        }
        this.y -=Math.sqrt(this.speed);
    } 
}
//鸟向上跳动20像素
Bird.prototype.up = function(){
    this.state = "u";
    this.speed = 20;
}