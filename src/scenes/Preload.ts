import Phaser from "phaser";

class Preload extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {

        this.load.tilemapTiledJSON('map', 'assets/pacmanworldmap.json');

        this.load.image('tiles-bg', 'assets/bg_spikes_tileset.png');
        this.load.image('tiles-walls', 'assets/wall.png');
        this.load.image('main_lev_build_1', 'assets/main_lev_build_1.png');


        

        this.load.spritesheet('player', 'assets/pacman.png', {
            frameWidth: 220, frameHeight: 200
        })

    }

    update(time: number, delta: number): void {
        this.scene.start('PlayScene');
    }
}
export default Preload;