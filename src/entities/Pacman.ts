import Phaser, {Physics, Tilemaps } from "phaser";
import createPlayerAnims from "./anims/playerAnims";

enum Moves {
    None,
    Left,
    Right,
    Up,
    Down
}


class Pacman extends Phaser.Physics.Arcade.Sprite {
    private queuedMove = Moves.None;
    private lastKeyDown = Moves.None;
    private playerSpeed = 100;
    private moveSound!: Phaser.Sound.BaseSound;
    

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        

        createPlayerAnims(this.scene.anims);
        this.playerSpeed = 100;

        
        this.getBody().setOffset(5, 0);
        this.setScale(0.2, 0.2);
        this.getBody()
        .setCircle(100, 0, 0)
        .setFriction(0, 0);

        this.init();
    }

    init():void {
        this.moveSound = this.scene.sound.add('munch', {volume: 0.2});

        this.scene.time.addEvent({
            delay: 350,
            repeat: -1,
            callbackScope: this,
            callback: () => {
                if(this.anims.isPlaying && this.anims.getName() == 'player-move') {
                    this.moveSound.play();
                }
            }
        })
    }


    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);
        this.scene.physics.world.wrapObject(this, 88);
    }


    handleMovement(cursors: Phaser.Types.Input.Keyboard.CursorKeys, wallsLayer: Tilemaps.TilemapLayer) {
        const vel = this.getBody().velocity;

        if(vel.lengthSq() > 0.2) {
            this.play('player-move', true);
            
        } else {
            this.play('player-idle');
            this.lastKeyDown = Moves.None;
        }


        const keysDown = this.getKeysDownState(cursors);

        if(keysDown.left && vel.x >= 0) {
            if(!wallsLayer.getTileAtWorldXY(this.x - 88, this.y)) {  
            this.queuedMove = Moves.Left;
            }
        }
        else if (keysDown.right && vel.x >= 0) {
            if(!wallsLayer.getTileAtWorldXY(this.x + 88, this.y)) { 
            this.queuedMove = Moves.Right;      
            }
        }
        else if(keysDown.up && vel.y >= 0) {
            if(!wallsLayer.getTileAtWorldXY(this.x, this.y + 88)) {  
             this.queuedMove = Moves.Up; 
            }
        }
        else if(keysDown.down && vel.y >= 0) {
            if(!wallsLayer.getTileAtWorldXY(this.x, this.y - 88)) {
            this.queuedMove = Moves.Down; 
            }
        }

        
        switch(this.queuedMove) {
            case Moves.None:
                break;

            case Moves.Left: {
                this.lastKeyDown = this.queuedMove;
                this.queuedMove = Moves.None;
                break;
            }  
            
            case Moves.Right: {
                this.lastKeyDown = this.queuedMove;
                this.queuedMove = Moves.None;
                break;
            }

            case Moves.Up: {
                this.lastKeyDown = this.queuedMove;
                this.queuedMove = Moves.None;
                break;
            }

            case Moves.Down: {
                this.lastKeyDown = this.queuedMove;
                this.queuedMove = Moves.None;
                break;
            }
        }

        switch(this.lastKeyDown) {
            case Moves.Left: {
                this.setVelocity(-this.playerSpeed, 0)
                this.setAngle(180)
                break;
            }

            case Moves.Right: {
                this.setVelocity(this.playerSpeed, 0)
                this.setAngle(0)
                break;
            }

            case Moves.Up: {
                this.setVelocity(0, -this.playerSpeed)
                this.setAngle(-90)
                break;
            }

            case Moves.Down: {
                this.setVelocity(0, this.playerSpeed)
                this.setAngle(90)
                break;
            }

            default:
                break;
        }

    }

    private getKeysDownState(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        return {
            left: cursors.left?.isDown,
            right: cursors.right?.isDown,
            up: cursors.up?.isDown,
            down: cursors.down?.isDown
        }
    }



    protected getBody(): Physics.Arcade.Body {
        return this.body as Phaser.Physics.Arcade.Body;
    }
}
export default Pacman;