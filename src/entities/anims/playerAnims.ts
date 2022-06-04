import Phaser from "phaser";

const createPlayerAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'player-move',
        frames: anims.generateFrameNumbers('player', {start: 0, end: 2}),
        frameRate: 10,
        repeat: -1
    })

    anims.create({
        key: 'player-idle',
        frames: anims.generateFrameNumbers('player', {start: 0}),
    })
}

export default createPlayerAnims;
