import Phaser, { GameObjects, Tilemaps } from "phaser";
import Pacman from "../entities/Pacman";


class Play extends Phaser.Scene {
    private player!: Pacman;
    private map!: Tilemaps.Tilemap;
    private tileset!: Tilemaps.Tileset;
    private tilesetBG!: Tilemaps.Tileset;
    private colliderTileset!: Tilemaps.Tileset;
    private wallsLayer!: Tilemaps.TilemapLayer;
    private wallsCollider!: Tilemaps.TilemapLayer;
    private backgroundLayer!: Tilemaps.TilemapLayer;

    constructor(){
        super('PlayScene');
    }

    
    create(): void{
        this.initMap();
        this.player = new Pacman(this, 100, 100, 'player');
        this.player.setScale(0.2, 0.2);
        this.physics.add.collider(this.player, this.wallsCollider);
        
        
    }

    private initMap(): void {
        this.map = this.make.tilemap({key: 'map'});
        this.tilesetBG = this.map.addTilesetImage('Background', 'tiles-bg');
        this.tileset = this.map.addTilesetImage('walls', 'tiles-walls');
        this.colliderTileset = this.map.addTilesetImage('main_lev_build_1', 'main_lev_build_1');
        this.wallsCollider = this.map.createLayer('Walls_Colliders', this.colliderTileset, -500, 0).setDepth(-1);
        this.backgroundLayer = this.map.createLayer('Background', this.tilesetBG, -500, 0).setDepth(0);
        this.wallsLayer = this.map.createLayer('walls', this.tileset, -500, 0); 
        this.wallsCollider.setCollisionByProperty({collides: true});
        this.showDebugWalls();
    }

    

    update(time: number, delta: number): void {
        this.player.update();
    }

    private showDebugWalls(): void {
        const debugGraphics = this.add.graphics().setAlpha(0.7);
        this.wallsLayer.renderDebug(debugGraphics, {
          tileColor: null,
          collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        });
      }


}

export default Play;

    