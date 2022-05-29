import Phaser from 'phaser';
import Play from './scenes/Play';
import Preload from './scenes/Preload';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  width: 775,
  height: 650,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [Preload, Play],
  input: {
    keyboard: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  }
};
