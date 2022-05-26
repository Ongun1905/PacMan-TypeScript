export class animMixins extends Phaser.Animations.AnimationState {
    isPlayingAnims(animsKey: string) {
        return this.isPlaying && this.getName() == animsKey;
    }
}