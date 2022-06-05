import Enemy from "./Enemy";


class Inky extends Enemy {
    
    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key);
        this.setVelocityY(this.initialVelocity);
    }

   
}

export default Inky;