import Phaser from "phaser";

class Play extends Phaser.Scene {
    constructor(){
        super('PlayScene');
    }

    preload() {
        this.load.image('tiles-bg', 'assets/bg_spikes_tileset.png');
        this.load.image('tiles-walls', 'assets/wall.png');
        this.load.image('logo', 'assets/phaser3-logo.png');


        this.load.tilemapTiledJSON('map', 'assets/pacmanworldmap.json');
    }

    create(){
        const map = this.make.tilemap({key: 'map'});
        const tileset1 = map.addTilesetImage('background', 'tiles-bg');
        const tileset2 = map.addTilesetImage('walls', 'tiles-walls');

        map.createLayer(0, tileset1, -300, 0);
        map.createLayer(1, tileset2, -500, 0);
        


    }

   
}

export default Play;

    