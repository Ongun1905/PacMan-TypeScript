import Phaser, { GameObjects, Tilemaps } from "phaser";
import Pacman from "../entities/Pacman";
import Blinky from "../entities/Blinky";
import Inky from "../entities/Inky";

class Play extends Phaser.Scene {
    private player!: Pacman;
    private blinky!: Blinky;
    private inky!: Inky;
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
        this.createPlayer();
        this.createEnemies();
        
        
              
    }

    createPlayer() {
        this.player = new Pacman(this, 375, 400, 'player');
        this.physics.world.enable(this.player, Phaser.Physics.Arcade.DYNAMIC_BODY);
        this.addPlayerColliders();
    }

    createEnemies() {
        this.blinky = new Blinky(this, 200, 60, 'blinky-right');
        this.inky = new Inky(this, 240, 60, 'inky-down');
        this.addEnemyColliders(); 
    }

    addPlayerColliders() {
        this.physics.add.collider(this.player, this.wallsCollider);
    }

    addEnemyColliders(): void {
        this.physics.add.overlap(this.player, this.blinky, () => {
            this.scene.restart();
        });
        this.physics.add.overlap(this.player, this.inky, () => {
            this.scene.restart();
        });
        this.blinky.setWallColliders(this.wallsCollider); 
        this.inky.setWallColliders(this.wallsCollider);
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

        this.blinky.update();
        this.inky.patrolVertical();
        
    }
}

export default Play;

    