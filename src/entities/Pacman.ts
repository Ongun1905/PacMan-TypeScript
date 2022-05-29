import Phaser, { Game, GameObjects, Physics, Scene, Tilemaps } from "phaser";
import { animMixins } from "../mixins/animMixins";

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
    private queuedMoveAccumulator = 0;
    private playerSpeed = 100;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        

        
        this.playerSpeed = 100;

        
        this.getBody().setOffset(5, 0);
        this.setScale(0.2, 0.2);
        this.initAnimations();
        this.getBody().setCircle(100, 0, 0)
        .setFriction(0, 0);
    }

    private initAnimations(): void {
        this.scene.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 2}),
            frameRate: 10,
            repeat: -1
        })
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);
        this.scene.physics.world.wrapObject(this, 100);
    }

    update(...args: any[]): void {
        !this.anims.isPlaying && this.anims.play('move');
        
    }

    handleMovement(dt: number, cursors: Phaser.Types.Input.Keyboard.CursorKeys, wallsLayer: Tilemaps.TilemapLayer) {
        const vel = this.getBody().velocity;
        if(vel.lengthSq() > 0.2) {
            //
        } else {
            this.lastKeyDown = Moves.None;
        }

        const keysDown = this.getKeysDownState(cursors);

        if(keysDown.left && vel.x >= 0) {
            if(!wallsLayer.getTileAtWorldXY(this.x - 88, this.y)) {  
            this.queuedMove = Moves.Left;
            console.log("left");
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
            console.log("down");
                
            }
        }

        if(this.queuedMove !== Moves.None) {
            this.queuedMoveAccumulator += dt;
            if(this.queuedMoveAccumulator >= 200) {
                this.queuedMove = Moves.None;
                this.queuedMoveAccumulator = 0;
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