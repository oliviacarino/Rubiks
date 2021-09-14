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
    constructor(face, row, col) {
        this.face = face;
        this.row = row;
        this.col = col;
    } // constructor

    setFace(new_face) {
        this.face = new_face;
    } // setFace

    setRow(new_row) {
        this.row = new_row;
    } // setRow

    setCol(new_col) {
        this.col = new_col;
    } // setCol

    getFace() {
        return this.face;
    } // getFace

    getRow() {
        return this.row;
    } // getRow

    getCol() {
        return this.col;
    } // getCol

} // Piece

// use 3 nested for loops: create a new Piece(i = row, j = col, k = face)

let position = 1;
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
