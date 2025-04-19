let mapWidth = 20;
let mapHeight = 15;
let tileSize = 32;
let scale = 10;
let seed = Math.random();

const config = {
    type: Phaser.AUTO,
    width: mapWidth * tileSize,
    height: mapHeight * tileSize,
    scene: {
        preload,
        create
    }
};

let game = new Phaser.Game(config);

function preload() {
    this.load.image('terrain', 'assets/terrain.png');
}

function create() {
    generateAndDrawMap.call(this);

    this.input.keyboard.on('keydown-R', () => {
        seed = Math.random();
        generateAndDrawMap.call(this);
    });

    this.input.keyboard.on('keydown-COMMA', () => {
        scale = Math.max(1, scale - 1);
        generateAndDrawMap.call(this);
    });

    this.input.keyboard.on('keydown-PERIOD', () => {
        scale += 1;
        generateAndDrawMap.call(this);
    });
}

function generateAndDrawMap() {
    this.children.removeAll(); // Clear previous tiles
    noise.seed(seed);

    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            let value = noise.perlin2(x / scale, y / scale);
            let frame = 0; // default to water

            if (value < -0.2) frame = 0;         // water
            else if (value < 0.2) frame = 1;     // grass
            else frame = 2;                      // mountain

            this.add.image(x * tileSize, y * tileSize, 'terrain', frame).setOrigin(0);
        }
    }
}
