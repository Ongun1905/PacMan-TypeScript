import Phaser, { Game, GameObjects, Physics, Scene } from "phaser";
import { animMixins } from "../mixins/animMixins";



class Pacman extends Phaser.Physics.Arcade.Sprite {
    private keyW: Phaser.Input.Keyboard.Key;
    private keyA: Phaser.Input.Keyboard.Key;
    private keyS: Phaser.Input.Keyboard.Key;
    private keyD: Phaser.Input.Keyboard.Key;
    private playerSpeed: number;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.getBody().setCollideWorldBounds(true);

        this.keyW = this.scene.input.keyboard.addKey('W');
        this.keyA = this.scene.input.keyboard.addKey('A');
        this.keyS = this.scene.input.keyboard.addKey('S');
        this.keyD = this.scene.input.keyboard.addKey('D');
        this.playerSpeed = 100;

        this.getBody().setSize(240, 250);
        this.getBody().setOffset(0, 0);
        this.initAnimations();
    }

    private initAnimations(): void {
        this.scene.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 2}),
            frameRate: 10,
            repeat: -1
        })
    }

    update(...args: any[]): void {
        //this.getBody().setVelocity(10);
        !this.anims.isPlaying && this.anims.play('move');
        if (this.keyW?.isDown) {
            this.body.velocity.y = -this.playerSpeed;            
        }
        if (this.keyA?.isDown) {
            this.body.velocity.x = -this.playerSpeed;
            this.setFlipX(true);
           
        }
        if (this.keyS?.isDown) {
            this.body.velocity.y = this.playerSpeed;
            
        }
        if (this.keyD?.isDown) {
            this.body.velocity.x = this.playerSpeed;
            this.setFlipX(false);
            
        }
    }

    protected getBody(): Physics.Arcade.Body {
        return this.body as Physics.Arcade.Body;
    }
}
export default Pacman;