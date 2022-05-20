import Phaser from 'phaser';
import config from './config';
import Play from './scenes/Play';
import Preload from './scenes/Preload';

new Phaser.Game(
  Object.assign(config, {
    scene: [Play]
  })
);
