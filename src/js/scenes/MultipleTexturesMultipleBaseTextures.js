

export default class MultipleTexturesMultipleBaseTextures {
    constructor(pixiApp, gui) {
        this._pixiApp = pixiApp;
        this._gui = gui;

        this.guiController = null;
        this.sprites = 100000;

        this.root = new PIXI.Container();

        const rows = Math.floor(Math.sqrt(this.sprites));
        const columns = rows;

        const spacingRows = this._pixiApp.screen.width / rows;
        const spacingColumns = this._pixiApp.screen.height / columns;

        let bunnyIndex = 1;

        // Try to space out sprites evenly across the screen
        for (let r = 0; r < rows; ++r) {
            for (let c = 0; c < columns; ++c) {
                const sprite = PIXI.Sprite.from(`images/bunny${bunnyIndex}.png`);
                sprite.anchor.set(0.5);
                sprite.position.set(spacingRows / 2 + spacingRows * r, spacingColumns / 2 + spacingColumns * c);
                this.root.addChild(sprite);
                bunnyIndex === 12 ? bunnyIndex = 1 : ++bunnyIndex;
            }
        }

        // Add any not evenly spaced out in the middle
        for (let i = this.root.children.length; i < this.sprites; ++i) {
            const sprite = PIXI.Sprite.from(`images/bunny${bunnyIndex}.png`);
            sprite.anchor.set(0.5);
            sprite.position.set(screen.width / 2, screen.height / 2);
            this.root.addChild(sprite);
            bunnyIndex === 12 ? bunnyIndex = 1 : ++bunnyIndex;
        }
    }

    update(delta) {
        for (let i = 0; i < this.root.children.length; ++i) {
            this.root.children[i].rotation += 0.1 * delta;
        }
    }

    start() {
        if (!this.guiController) {
            this.guiController = this._gui.add(this, 'sprites', 0, 100000, 1000);
            this.guiController.onChange((value) => {
                for (let i = 0; i < this.root.children.length; ++i) {
                    this.root.children[i].visible = i <= value;
                }
            });
        }
    }

    stop() {
        if (this.guiController) {
            this._gui.remove(this.guiController);
            this.guiController = null;
        }
    }
}
