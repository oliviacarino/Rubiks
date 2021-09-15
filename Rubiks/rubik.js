"use strict";

// THREEJS BOILERPLATE

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 3, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

///////////////////////////////////////////////////////////////

// CREATE CUBE

/**
 * A piece (of 16 - 6 center, 8 corner, 12 edge) of the
 * entire rubiks cube.
 * Contains the piece's face, row, and col locations.
 * There are 6 faces (made of 9 piece-faces) and 54 piece-faces
 * 
 * TODO make (child) classes for each type of cubie (?)
 */
class Piece {
    constructor(x_pos, y_pos, z_pos) {
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.z_pos = z_pos; 
        this.position = 0; // used to update x,y,z points   

        // colors of each piece 
        this.isGreen = true;
        this.isWhite = true;
        this.isBlue = true;
        this.isRed = true;
        this.isYellow = true;
        this.isOrange = true;

        // piece types
        this.isCorner = true; // 3 colors, 3 faces
        this.isEdge = true;   // 2 colors, 2 faces
        this.isCenter = true; // 1 color,  1 face
    } // constructor 
    
    /**
     * Creates a BoxGeometry with MeshPhongMaterial (helps with generating
     * shadows). The x_pos, y_pos and z_pos are used to place the 
     * geometry within the 3D graph (x,y,z).
     */ 
    createPiece(x_pos, y_pos, z_pos) {
        /*const cube = 
            new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1), // add toNonIndexed() for coloring faces ?? 
            new THREE.MeshPhongMaterial({color:0xff4444, wireframe:false}) 
        );
        */
        // TODO add proper shadowing -- current/above MeshPhongMaterial method too dark
        const piece = new THREE.BoxGeometry(1,1,1);
        const materials = [
            new THREE.MeshBasicMaterial({color: 'white'}),
            new THREE.MeshBasicMaterial({color: 'yellow'}),        
            new THREE.MeshBasicMaterial({color: 'blue'}),
            new THREE.MeshBasicMaterial({color: 'green'}),
            new THREE.MeshBasicMaterial({color: 'orange'}),
            new THREE.MeshBasicMaterial({color: 'red'})
        ];
        // apply colors to each side of cube using groups of faces 
        piece.groups[0].materialIndex = 0;
        piece.groups[1].materialIndex = 1;
        piece.groups[2].materialIndex = 2;
        piece.groups[3].materialIndex = 3;
        piece.groups[4].materialIndex = 4;
        piece.groups[5].materialIndex = 5;

        const cube = new THREE.Mesh(piece, materials);
        
        // positioning of cube, shadow generation, positioning of lines
        cube.position.x = x_pos;
        cube.position.y = y_pos;
        cube.position.z = z_pos;        
        cube.receiveShadow = true;
        const edges = new THREE.EdgesGeometry( cube.geometry, 1 );
        const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ));
        line.position.x = x_pos; 
        line.position.y = y_pos; // moves edge outlines in sync with cubes
        line.position.z = z_pos; 
        scene.add( line );
        scene.add( cube );

    } // createPiece

    setX(new_x_pos) {
        this.x_pos = new_x_pos;
    } // setX
    
    setY(new_y_pos) {
        this.y_pos = new_y_pos;
    } // setY

    setZ(new_z_pos) {
        this.z_pos = new_z_pos;
    } // setZ

    getX() {
        return this.x_pos;
    } // getX
    
    getY() {
        return this.y_pos;
    } // getY

    getZ() {
        return this.z_pos;
    } // getZ

} // Piece

/////////////////////////////////////////////////////////////////////////

// create the entire Rubiks cube (comprised of 27 Piece objects)
var cubes = []; // stores Pieces (small cube elements) objects
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
            var cube = new Piece(i,j,k);
            cube.createPiece(i,j,k);
            cubes.push(cube);
        } // for
    } // for
} // for

// TODO
// create consts for colors (blue, green, orange, red, white and yellow)
//const material_GREEN = new THREE.MeshPhongMaterial({color:0x00FF00, wireframe:false});


// IDEA: make array that stores cubes with their colors and piece type (corner, edge, center)
// assign cubes to type: corner, edge, center
// assign faces (F (front), B (back), R (right), L (left), D (down), U (up)) to rubiks cube



// fix camera position so we can see cube
camera.position.z = 5;

///////////////////////////////////////////////////////////////

// LIGHTS
var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

var light = new THREE.PointLight(0xffffff, 0.8, 18);
light.position.set(-3,6,-3);
light.castShadow = true;
// Will not light anything closer than 0.1 units or further than 25 units
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 25;
scene.add(light);

///////////////////////////////////////////////////////////////

// CONTROLS
const controls = new THREE.OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 100 );
controls.update();

///////////////////////////////////////////////////////////////

/**
 * Rendering scene - make the cube visible to us.
 */
function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}
animate();
