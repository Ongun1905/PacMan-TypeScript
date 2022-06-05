import Phaser, { GameObjects, Tilemaps } from "phaser";
import Pacman from "../entities/Pacman";
import Blinky from "../entities/Blinky";
import Inky from "../entities/Inky";
import Pinky from "../entities/Pinky";
import Clyde from "../entities/Clyde";

class Play extends Phaser.Scene {
    private player!: Pacman;
    private blinky!: Blinky;
    private inky!: Inky;
    private pinky!: Pinky;
    private clyde!: Clyde;
    private coin!: Phaser.GameObjects.Image;
    private pickUp!: Phaser.Sound.BaseSound;
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
        this.pickUp = this.sound.add('eat-fruit', {volume: 0.2});
    }

    
    create(): void{
        
        this.initMap();
        this.createPlayer();
        this.createEnemies();
        this.spawnBonus();
        
    }

    createPlayer() {
        this.player = new Pacman(this, 375, 425, 'player');
        this.physics.world.enable(this.player, Phaser.Physics.Arcade.DYNAMIC_BODY);
        this.addPlayerColliders();
    }

    createEnemies() {
        this.blinky = new Blinky(this, 200, 60, 'blinky-right');
        this.inky = new Inky(this, 240, 60, 'inky-down');
        this.pinky = new Pinky(this, 240, 210, 'pinky');
        this.clyde = new Clyde(this, 490, 240, 'clyde-down');
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
        this.physics.add.overlap(this.player, this.pinky, () => {
            this.scene.restart();
        });
        this.physics.add.overlap(this.player, this.clyde, () => {
            this.scene.restart();
        });
        this.blinky.setWallColliders(this.wallsCollider); 
        this.inky.setWallColliders(this.wallsCollider);
        this.pinky.setWallColliders(this.wallsCollider);
        this.clyde.setWallColliders(this.wallsCollider);
    }

    initMap(): void {
        this.map = this.make.tilemap({key: 'map'});
        this.tilesetBG = this.map.addTilesetImage('Background', 'tiles-bg');
        this.tileset = this.map.addTilesetImage('walls', 'tiles-walls');
        this.colliderTileset = this.map.addTilesetImage('main_lev_build_1', 'main_lev_build_1');
        this.wallsCollider = this.map.createLayer('Walls_Colliders', this.colliderTileset, -500, 0).setDepth(-1);
        this.backgroundLayer = this.map.createLayer('Background', this.tilesetBG, -500, 0).setDepth(0);
        this.wallsLayer = this.map.createLayer('walls', this.tileset, -500, 0); 
        this.wallsCollider.setCollisionByProperty({collides: true});
        
    }

    spawnBonus(): void {
        this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.coin = this.add.sprite(375, 375, 'bonus').setScale(0.01, 0.01);
                this.physics.add.existing(this.coin);
            }
        })
        
    }

    collectBonus(): void {
        this.physics.add.overlap(this.player, this.coin, (player,coin) => {
            this.pickUp.play();
            coin.destroy();
            this.spawnBonus();
        })
    }

    
    update(time: number, delta: number): void {
        
        if(this.player && this.wallsCollider) {
            this.player.handleMovement(this.cursors, this.wallsCollider);
        }

        this.blinky.patrolHorizontal();
        this.inky.patrolVertical('inky-up', 'inky-down');
        this.pinky.patrolHorizontal();
        this.clyde.patrolVertical('clyde-up', 'clyde-down');
        this.collectBonus();
        
        
    }
}

export default Play;

    