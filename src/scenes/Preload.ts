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
        this.load.image('bonus', 'assets/bonus.png');


        

        this.load.spritesheet('player', 'assets/pacman.png', {
            frameWidth: 220, frameHeight: 200
        })

       this.load.image('blinky-right', 'assets/blinky-right.png');
       this.load.image('inky-up', 'assets/inky-up.png');
       this.load.image('inky-down', 'assets/inky-down.png');
       this.load.image('pinky', 'assets/pinky.png');
       this.load.image('clyde-up', 'assets/clyde-up.png');
       this.load.image('clyde-down', 'assets/clyde-down.png');

       this.load.audio('eat-fruit', 'assets/pacman_eatfruit.wav');
       this.load.audio('munch', 'assets/pacman_chomp.wav');

    }

    update(time: number, delta: number): void {
        this.scene.start('PlayScene');
    }
}
export default Preload;