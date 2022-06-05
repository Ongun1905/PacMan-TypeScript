import Enemy from "./Enemy";


class Clyde extends Enemy {
    
    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key);
        this.setVelocityY(this.initialVelocity);
    }

   
}

export default Clyde;