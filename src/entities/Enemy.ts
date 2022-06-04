import Phaser, { Textures, Tilemaps } from "phaser";


class Enemy extends Phaser.Physics.Arcade.Sprite {

    protected initialVelocity = 0;
    protected lastHorizontalDirection!: number;
    protected lastVerticalDirection!: number;
    private wallCollidersLayer!: Tilemaps.TilemapLayer;
    protected hasCollided = false;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.init();
        
        
    }

    init(): void {
        this.initialVelocity = 100;
        this.setScale(0.3, 0.3);
        this.lastHorizontalDirection = Phaser.Physics.Arcade.FACING_RIGHT;
        this.lastVerticalDirection = Phaser.Physics.Arcade.FACING_DOWN;
        this.body.setSize(140, 150);
        this.body.setOffset(10, 0);
        
    }

    

    patrol(): void {
        this.checkIfCollided();
        
        if(this.hasCollided && this.lastHorizontalDirection == Phaser.Physics.Arcade.FACING_RIGHT) {
            this.setFlipX(true);
            this.setVelocityX(-this.initialVelocity);
            this.lastHorizontalDirection = Phaser.Physics.Arcade.FACING_LEFT;
        } 
        else if(this.hasCollided && this.lastHorizontalDirection == Phaser.Physics.Arcade.FACING_LEFT) {
            this.setFlipX(false);
            this.setVelocityX(this.initialVelocity);
            this.lastHorizontalDirection = Phaser.Physics.Arcade.FACING_RIGHT;
        } 
        this.hasCollided = false;
        
        
    }

    checkIfCollided(){
        this.scene.physics.collide(this, this.wallCollidersLayer, () => {
            this.hasCollided = true;
        })
    }

    setWallColliders(wallCollidersLayer: Tilemaps.TilemapLayer) {
        this.wallCollidersLayer = wallCollidersLayer;
    }

    

    
}

export default Enemy;