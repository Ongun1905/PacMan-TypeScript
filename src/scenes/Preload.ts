import Phaser from 'phaser';

class Preload extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        this.load.image('tiles-bg', 'assets/bg_spikes_tileset.png');
        this.load.image('tiles-walls', 'assets/wall.png');
        this.load.image('logo', 'assets/phaser3-logo.png');


        this.load.tilemapTiledJSON('map', 'assets/pacmanworldmap.json');


        
    }
}

export default Preload;