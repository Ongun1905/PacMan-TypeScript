import Enemy from "./Enemy";


class Blinky extends Enemy {
    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key);
        this.setVelocityX(this.initialVelocity);
    }

    update(...args: any[]): void {
        this.patrol();
    }
}

export default Blinky;