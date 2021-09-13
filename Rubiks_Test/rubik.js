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
// try creating a cubie class and replicating what is done below but now
// with a cubie object

var cube = 
    new THREE.Mesh(
	new THREE.BoxGeometry(1,1,1),
	new THREE.MeshPhongMaterial({color:0xff4444, wireframe:false})
);
cube.position.y += 1;
cube.receiveShadow = true;
scene.add( cube );

var cube2 = 
    new THREE.Mesh(
	new THREE.BoxGeometry(1,1,1),
	new THREE.MeshPhongMaterial({color:0x00FF00, wireframe:false})
);
cube2.position.y += 2;
cube2.receiveShadow = true;
scene.add( cube2 );

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
