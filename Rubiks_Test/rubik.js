"use strict";

// THREEJS BOILERPLATE

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 3, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

///////////////////////////////////////////////////////////////

// CREATE CUBE

// TODO
// start by creating 3D array that contains rows, cols, faces of cube
/**
 * A piece (of 16 - 6 center, 8 corner, 12 edge) of the
 * entire rubiks cube.
 * Contains the piece's face, row, and col locations.
 * There are 6 faces (made of 9 piece-faces) and 54 piece-faces
 * 
 * TODO make (child) classes for each type of cubie
 */
class Piece {
    constructor(x_pos, y_pos, z_pos) {
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.z_pos = z_pos; 
        this.position = 0; // used to update x,y,z points       
    } // constructor 
    
    /**
     * Creates a BoxGeometry with MeshPhongMaterial (helps with generating
     * shadows). The x_pos, y_pos and z_pos are used to place the 
     * geometry within the 3D graph (x,y,z).
     * For now, all one solid color (light red) with the edges
     * outlined in white.
     */
    createPiece(x_pos, y_pos, z_pos) {
        const cube = 
            new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshPhongMaterial({color:0xff4444, wireframe:false})
        ); 
                
        cube.position.y = position;
        cube.receiveShadow = true;
        const edges = new THREE.EdgesGeometry( cube.geometry, 1 );
        const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ));
        line.position.y = position; // moves edge outlines in sync with cubes
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

// use 3 nested for loops: create a new Piece(i = row, j = col, k = face)

let position = 1;
var cubes = []; // stores Pieces objects
for (let i = 0; i < 3; i++) {
    const cube = 
        new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshPhongMaterial({color:0xff4444, wireframe:false})
    ); 
            
    cube.position.y = position;
    cube.receiveShadow = true;
    const edges = new THREE.EdgesGeometry( cube.geometry, 1 );
    const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ));
    line.position.y = position; // moves edge outlines in sync with cubes
    scene.add( line );
    scene.add( cube );

    console.log('x-position: ' + line.position.x);
    console.log('y-position: ' + line.position.y);
    console.log('z-position: ' + line.position.z);

    position++;
} // for


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
