/**
 * Three requirements for every ThreeJs app: scene, camera, renderer.
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

/**
 * Creating the cube.
 */
const geometry = new THREE.BoxGeometry(); // shape
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); // color of cube
const cube = new THREE.Mesh( geometry, material ); // cube = shape and color
scene.add( cube );

camera.position.z = 5;

/**
 * Rendering scene - make the cube visible to us.
 */
function animate() {
	requestAnimationFrame( animate );
    // make cube rotate
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}
animate();
