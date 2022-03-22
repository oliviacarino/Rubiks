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
 * TODO make (child) classes for each Cubie (smaller cubes within the Rubiks cube)
 */
class Cubie { 
    //constructor(x_pos, y_pos, z_pos, face, color) {
    constructor(x_pos, y_pos, z_pos, colors) {
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.z_pos = z_pos; 
        this.position = 0; // used to update x,y,z points   

        // colors of a cubie (Piece) is an array of faces
        // set each face to corresponding Colors in colors

        // colors of each piece 
        /*this.isGreen = color;
        this.isWhite = color;
        this.isBlue = color;
        this.isRed = color;
        this.isYellow = color;
        this.isOrange = color;*/

        // Piece is a corner (3 colors), edge (2 colors), or center (1 color).
        //this.pieceType = this.pieceType; 

        // Piece color
        // White, Blue, Green, Orange, Yellow, Red
        //this.color = color;

    } // constructor 
    
    /**
     * Creates a BoxGeometry with MeshPhongMaterial (helps with generating
     * shadows). The x_pos, y_pos and z_pos are used to place the 
     * geometry within the 3D graph (x,y,z).
     */ 
    //createPiece(x_pos, y_pos, z_pos, color) {
    createPiece(x_pos, y_pos, z_pos, piece_type) {
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
        const colorBlue = new THREE.Color(0x0000FF);
        const colorGreen = new THREE.Color(0x00FF00);
        const colorOrange = new THREE.Color(0xFFA500);
        const colorYellow = new THREE.Color(0xFFFF00);
        const colorBlack = new THREE.Color(0x000000); // use for inner cubes that do not have colored face user sees

        const color = new THREE.Color();

        if (piece_type == 'corner') { // have 3 faces
            // check which of 8 corners
            // CORNER CUBES (x,y,z) -- use for setCorner() --- B=back, F=front, D=bottom, T=top, R=right, L=left,             
            // Front corners: DFL(0 0 2), DFR(2 0 2), TFL(0 2 2), TFR(2 2 2)

            // Back corners:  DBL(0 0 0), DBR(2 0 0), TBL(0 2 0), TBR(2 2 0)
            // DBL(0 0 0)
            if (x_pos == 0 && y_pos == 0 && z_pos == 0) { 
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 30) {                        
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                    } else if (i == 6) {
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                    } else if (i == 18) {
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            } 
            // DBR(2 0 0)
            else if (x_pos == 2 && y_pos == 0 && z_pos == 0) { 
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 18) {
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                    } else if (i == 30) {
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                    } else if (i == 0) {
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            }
            // TBL(0 2 0)
            if (x_pos == 0 && y_pos == 2 && z_pos == 0) {
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 6) {
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                    } else if (i == 12) {
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                    } else if (i == 30) {
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            }
            // TBR(2 2 0)
            else if (x_pos == 2 && y_pos == 2 && z_pos == 0) {
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 0) {
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                    } else if (i == 12) {
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                    } else if (i == 30) {
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            }

            // Front corners: DFL(0 0 2), DFR(2 0 2), TFL(0 2 2), TFR(2 2 2)
            // DFL(0 0 2)
            if (x_pos == 0 && y_pos == 0 && z_pos == 2) {
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 6) {
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                    } else if (i == 18) {
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                    } else if (i == 24) {
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            }
            // DFR(2 0 2)
            else if (x_pos == 2 && y_pos == 0 && z_pos == 2) {
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 24) {
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                    } else if (i == 18) {
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                    } else if (i == 0) {
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            }
            // TFL(0 2 2)
            else if (x_pos == 0 && y_pos == 2 && z_pos == 2) {
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 24) {
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                    } else if (i == 12) {
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                    } else if (i == 6) {
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            }
            // TFR(2 2 2)
            else if (x_pos == 2 && y_pos == 2 && z_pos == 2) {
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 24) {
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                    } else if (i == 12) {
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                    } else if (i == 0) {
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            }
        } 
        // EDGE PIECES
        // (0 1 0)
        else if (piece_type == 'edge') { // edges have 2 faces
            if (x_pos == 0 && y_pos == 1 && z_pos == 0) {
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 30) {
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                    } else if (i == 6) {
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            }
            // (0 0 1)
            else if (x_pos == 0 && y_pos == 0 && z_pos == 1) {
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 18) {
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                    } else if (i == 6) {
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            }
            // (1 0 0)
            else if (x_pos == 1 && y_pos == 0 && z_pos == 0) {
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 18) {
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                    } else if (i == 30) {
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            }
            // (1 1 0)
            else if (x_pos == 2 && y_pos == 2 && z_pos == 1) {
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 12) {
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b)
                    } else if (i == 0) {
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            }
            // (1 2 2)
            else if (x_pos == 1 && y_pos == 2 && z_pos == 2) {
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 12) {
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                    } else if (i == 24) {
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            } 
            // (2 0 1)
            else if (x_pos == 2 && y_pos == 0 && z_pos == 1) {
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 0) {
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                    } else if (i == 18) {
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            }
            // (1 0 2)
            else if (x_pos == 1 && y_pos == 0 && z_pos == 2) {
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 24) {
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                    } else if (i == 18) {
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                        colors.push(colorRed.r, colorRed.g, colorRed.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            } 
            // (1 2 0)
            else if (x_pos == 1 && y_pos == 2 && z_pos == 0) {
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 12) {
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                    } else if (i == 30) {
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            }   
            // (0 1 2)
            else if (x_pos == 0 && y_pos == 1 && z_pos == 2) {
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 24) {
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                    } else if (i == 6) {
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            }   
            // (2 1 0)                    
            else if (x_pos == 2 && y_pos == 1 && z_pos == 0) {
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 0) {
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                    } else if (i == 30) {
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                        colors.push(colorYellow.r, colorYellow.g, colorYellow.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            } 
            // (0 2 1)
            else if (x_pos == 0 && y_pos == 2 && z_pos == 1) {
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 12) {
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                        colors.push(colorOrange.r, colorOrange.g, colorOrange.b);
                    } else if (i == 6) {
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                        colors.push(colorGreen.r, colorGreen.g, colorGreen.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            } 
            // (2 1 2)            
            else if (x_pos == 2 && y_pos == 1 && z_pos == 2) {
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 0) {
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                    } else if (i == 24) {
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            } 
        } 
        // CENTER PIECES
        else if (piece_type == 'center') {
            // (1 1 2)
            if (x_pos == 1 && y_pos == 1 && z_pos == 2) {
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 24) {
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                        colors.push(colorWhite.r, colorWhite.g, colorWhite.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            }
            // (2 1 1)
            else if (x_pos == 2 && y_pos == 1 && z_pos == 1) {
                for (let i = 0; i < positionAttribute.count; i += 6) {
                    if (i == 0) {
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                        colors.push(colorBlue.r, colorBlue.g, colorBlue.b);
                    } else {
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                        colors.push(colorBlack.r, colorBlack.g, colorBlack.b);
                    }
                }
            }
        }

        piece.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        //const cube = new THREE.Mesh(piece, materials);
        const cube = new THREE.Mesh(piece, material);
        
        // positioning of cube in scene, shadow generation, positioning of lines/edges
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

// Attempt at coloring invididual faces via RubiksCube constructor
let cube = new Cubie();
// TODO wrap all cubie initialzations into an init() function to clean up
// CORNER CUBES
// back corners
let cube1 = cube.createPiece(0, 0, 0, 'corner'); // back, bottom, left
let cube2 = cube.createPiece(2, 0, 0, 'corner'); // back, bottom, right
let cube3 = cube.createPiece(0, 2, 0, 'corner'); // back, top, left
let cube4 = cube.createPiece(2, 2, 0, 'corner'); // back, top, right

// front corners
let cube5 = cube.createPiece(0, 0, 2, 'corner'); // front, bottom, left
let cube6 = cube.createPiece(2, 0, 2, 'corner'); // front, bottom, right
let cube7 = cube.createPiece(0, 2, 2, 'corner'); // front, top, left
let cube8 = cube.createPiece(2, 2, 2, 'corner'); // front, top, right

// EDGE CUBES (2 faces)
let cube9 = cube.createPiece(0, 1, 0, 'edge');
let cube10 = cube.createPiece(0, 0, 1, 'edge');
let cube11 = cube.createPiece(1, 0, 0, 'edge');
let cube12 = cube.createPiece(2, 2, 1, 'edge');
let cube13 = cube.createPiece(1, 2, 2, 'edge');
let cube14 = cube.createPiece(2, 0, 1, 'edge');
let cube15 = cube.createPiece(1, 0, 2, 'edge');
let cube16 = cube.createPiece(1, 2, 0, 'edge');
let cube17 = cube.createPiece(0, 1, 2, 'edge');
let cube18 = cube.createPiece(2, 1, 0, 'edge');
let cube19 = cube.createPiece(0, 2, 1, 'edge');
let cube22 = cube.createPiece(2, 1, 2, 'edge');

// CENTER CUBES (1 face)
let cube20 = cube.createPiece(1, 1, 2, 'center');
let cube21 = cube.createPiece(2, 1, 1, 'center');

// (1 1 1) is the center-most cube


// CENTER CUBES (1 face)
//


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
