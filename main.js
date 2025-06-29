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
    this.load.spritesheet('terrain', 'assets/terrain.png', {
  frameWidth: 32,
  frameHeight: 32
});
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
            let frame;

            if (value < -0.2) frame = 0;       // Water at frame 0
            else if (value < 0.2) frame = 33;  // Grass at frame 33
            else frame = 56;                   // Mountain at frame 56

            this.add.image(x * tileSize, y * tileSize, 'terrain', frame).setOrigin(0);
        }
    }
}