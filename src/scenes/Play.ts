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
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(){
        super('PlayScene');
    }

    init(): void {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    
    create(): void{
        this.initMap();
        this.player = new Pacman(this, 40, 50, 'player');
        this.physics.world.enable(this.player, Phaser.Physics.Arcade.DYNAMIC_BODY);
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
        
    }

    

    update(time: number, delta: number): void {
        
        if(this.player && this.wallsCollider) {
            this.player.update();
            this.player.handleMovement(delta, this.cursors, this.wallsCollider);
        }
    }
}

export default Play;

    