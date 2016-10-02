
var MarioLevel = {
    
    
    
    init:function(){
        console.log('In Init');  
        RUNNING_SPEED = 50;
        JUMPING_SPEED = 1000;
        //this.game.world.setBounds(0,0,100,GAME_H);
    },
    
    preload:function(){
        console.log('In Preload');
        this.load.image('background','images/background.jpg');
        this.load.image('ground','images/ground.png');
        this.load.image('mountain','images/mountain.png');
        this.load.image('tree','images/tree.png');
        this.load.image('platform','images/platform.png');
        this.load.image('gorilla','images/gorilla3.png');
        this.load.image('barrel','images/barrel.png');
        
            
    this.load.spritesheet('player', 'images/player_spritesheet.png', 28, 30, 5, 1, 1);    
    this.load.spritesheet('fire', 'images/fire_spritesheet.png', 20, 21, 2, 1, 1);      
    },
    create:function(){
        this.background = this.add.sprite(0,0,'background');
        this.game.backgroundColor = "#FF0";
        
        this.add.sprite(0,GAME_H-300,'mountain');
        this.tree = this.add.sprite(0,GAME_H-150,'tree');
        this.tree.scale.setTo(.25,.25);
        this.ground = this.add.sprite(0,GAME_H-40,'ground');
        this.player = this.add.sprite(500,10,'player',3);
        this.player.scale.setTo(2,2);
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;
        
        this.game.physics.arcade.enable(this.player);
        this.game.physics.arcade.enable(this.ground);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;
        
        this.player.body.collideWorldBounds = true;
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.camera.follow(this.player);
        
        this.platforms = this.add.group();
        this.platforms.create(100,100,'platform');
        this.platforms.create(200,250,'platform');
        this.platforms.create(400,250,'platform');
        
        
        this.game.physics.arcade.enable(this.platforms);
        this.platforms.enableBody = true;
        this.platforms.setAll('body.immovable',true);
        this.platforms.setAll('body.allowGravity',false);
        
        //Create a Group of Barrels
        this.barrels = this.add.group();
        this.barrels.enableBody = true;
        
        this.createBarrel();
     
        this.barrelCreator = this.game.time.events.loop(5000,this.createBarrel,this);
        
        
        
    },
    createBarrel:function(){
    var barrel = this.barrels.getFirstExists(false);

    if(!barrel) {
      barrel = this.barrels.create(0, 0, 'barrel');
    }

    barrel.body.collideWorldBounds = true;
    barrel.body.bounce.set(1, 0);

    barrel.reset(120,80);
    barrel.body.velocity.x = 100;
    },
    game_over:function(){
       alert('Game Over');
       MarioGame.state.start('Level1');
        
    },

    update:function(){
        console.log('In Update!'); 
        //this.game.physics.arcade.collide(this.player,this.ground);
        this.game.physics.arcade.collide(this.player, this.ground);
        this.game.physics.arcade.collide(this.player,this.platforms);
        this.game.physics.arcade.collide(this.platforms,this.barrels);
        this.game.physics.arcade.collide(this.ground,this.barrels);
        
        this.barrels.forEach(function(barrel){
                             if(barrel.x<=10){
                                 barrel.kill();
                             }
                             },this);
        
this.game.physics.arcade.overlap(this.player,this.barrels,this.game_over);
        
        
        
        //this.game.physics.arcade.collide(this.player, this.platforms);
        this.player.body.velocity.x = 0;
        if(this.cursors.right.isDown){
            this.player.body.velocity.x = 200;
        }
        else if(this.cursors.left.isDown){
            this.player.body.velocity.x = -200;
        }
        if(this.cursors.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -500;
        }
    },
    
    
    
    
};

GAME_H = 400;
GAME_W = 700;

var MarioGame = new Phaser.Game(700,400,Phaser.CANVAS);
MarioGame.state.add('Level1',MarioLevel);
MarioGame.state.start('Level1');