import Enemy from "./Enemy";


class Inky extends Enemy {
    
    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key);
        this.setVelocityY(this.initialVelocity);
    }

   
    patrolVertical() {
        this.checkIfCollided();
        if(this.hasCollided && this.lastVerticalDirection == Phaser.Physics.Arcade.FACING_DOWN) {
            this.setTexture('inky-up');
            this.setVelocityY(-this.initialVelocity);
            this.lastVerticalDirection = Phaser.Physics.Arcade.FACING_UP;
        } 
        else if(this.hasCollided && this.lastVerticalDirection == Phaser.Physics.Arcade.FACING_UP) {
            this.setTexture('inky-down')
            this.setVelocityY(this.initialVelocity);
            this.lastVerticalDirection = Phaser.Physics.Arcade.FACING_DOWN;
        } 
        this.hasCollided = false;
    }
}

export default Inky;