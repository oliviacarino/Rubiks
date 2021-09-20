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
    constructor(x_pos, y_pos, z_pos, face, color) {
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

        // Piece is a corner (3 colors), edge (2 colors), or center (1 color).
        this.pieceType = this.pieceType; 

        // Piece color
        // White, Blue, Green, Orange, Yellow, Red
        this.color = color;

    } // constructor 
    
    /**
     * Creates a BoxGeometry with MeshPhongMaterial (helps with generating
     * shadows). The x_pos, y_pos and z_pos are used to place the 
     * geometry within the 3D graph (x,y,z).
     */ 
    createPiece(x_pos, y_pos, z_pos, color) {
        /*const cube = 
            new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1), // add toNonIndexed() for coloring faces ?? 
            new THREE.MeshPhongMaterial({color:0xff4444, wireframe:false}) 
        );
        */
        // TODO add proper shadowing -- current/above MeshPhongMaterial method too dark
        const piece = new THREE.BoxGeometry(1,1,1).toNonIndexed();
        /*const materials = [
            new THREE.MeshBasicMaterial({color: 'white'}),
            new THREE.MeshBasicMaterial({color: 'yellow'}),        
            new THREE.MeshBasicMaterial({color: 'blue'}),
            new THREE.MeshBasicMaterial({color: 'green'}),
            new THREE.MeshBasicMaterial({color: 'orange'}),
            new THREE.MeshBasicMaterial({color: 'red'})
        ];
        */
        const material = new THREE.MeshBasicMaterial( { vertexColors: true } );

        // generate color data for each vertex
        const positionAttribute = piece.getAttribute( 'position' );
        
        const colors = []; // what dis do?
		const colorRed = new THREE.Color(0xff0000);
        const colorWhite = new THREE.Color(0xffffff);
        const colorBlue = new THREE.Color();
        const colorGreen = new THREE.Color();
        const colorOrange = new THREE.Color();
        const colorYellow = new THREE.Color();

        if (color == 'red') {
            // set all sides of one cube red
            // TODO set color depending on face type
            for ( let i = 0; i < positionAttribute.count; i += 3) {
                // define the same color for each vertex of a triangle
                colors.push( colorRed.r, colorRed.g, colorRed.b );
                colors.push( colorRed.r, colorRed.g, colorRed.b );
                colors.push( colorRed.r, colorRed.g, colorRed.b );
            } // for

            // define the new attribute
            piece.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
        } // if

        if (color == 'white') {
            // set all sides white of one cube white
            // TODO set color depending on face type
            for ( let i = 0; i < positionAttribute.count; i += 3) {
                // define the same color for each vertex of a triangle
                colors.push( colorWhite.r, colorWhite.g, colorWhite.b );
                colors.push( colorWhite.r, colorWhite.g, colorWhite.b );
                colors.push( colorWhite.r, colorWhite.g, colorWhite.b );
            } // for

            // define the new attribute
            piece.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
        } // if

        // apply colors to each side of cube using groups of faces 
        /*piece.groups[0].materialIndex = 0;
        piece.groups[1].materialIndex = 1;
        piece.groups[2].materialIndex = 2;
        piece.groups[3].materialIndex = 3;
        piece.groups[4].materialIndex = 4;
        piece.groups[5].materialIndex = 5;
        */

        //const cube = new THREE.Mesh(piece, materials);
        const cube = new THREE.Mesh(piece, material);
        
        // positioning of cube, shadow generation, positioning of lines/edges
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

    /**
     * Sets the Piece's type (corner, edge, or center).
     * Helps with setting color of side(s) for each
     * Piece (e.g., corner piece has 3 colors, edge
     * has 2 colors, center has 1 color).
     */
    setPieceType(type) {
        pieceType = type;
        let corner = false;
        let edge = false;
        let center = false;

        if (this.pieceType === 'corner') {
            corner = true;
        } else if (this.pieceType === 'edge') {
            edge = true;
        } else if (this.pieceType === 'center') {
            center = true;
        } // if

    } // setPieceType

    getPieceType() {
        return this.pieceType;
    } // getPieceType

} // Piece

/////////////////////////////////////////////////////////////////////////

// create the entire Rubiks cube (comprised of 27 Piece objects)
// ALL CUBES ARE RED FOR NOW
var cubes = []; // stores Pieces (small cube elements) objects
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
            var cube = new Piece(i,j,k);
            cube.createPiece(i,j,k,'red');// change to color per side
            cubes.push(cube);
        } // for
    } // for
} // for

// sets one cube one entire color
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
            if (i == 0 && j == 0 && k == 0) {
                cube.createPiece(i,j,k,'white');
            } // if
        } // for
    } // for
} // for

// CORNER CUBES (x,y,z) -- use for setCorner()
// 0 0 0

// EDGE CUBES (x,y,z) -- use for setEdge()
//

// CENTER CUBES (x,y,z) -- use for setCenter()
//

// TODO 
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
