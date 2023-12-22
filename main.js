// import * as THREE from 'three';
import * as THREE from '/node_modules/three/build/three.module.js';
//import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Load the texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./texture1.jpg'); 

const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
const greenMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });

// Create a sphere geometry
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
// Create a material with the texture
const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// Add the sphere to the scene
scene.add(sphere);



// Animation function
function animate() {
    requestAnimationFrame(animate);
    // Rotate the sphere
    sphere.rotation.x += 0.001;
    sphere.rotation.y += 0.001;
    renderer.render(scene, camera);
}

animate();


let isMouseDown = false;
let previousMouseX = 0;
let previousMouseY = 0;
let onSphere = false;

document.addEventListener('mousedown', (event) => {
    isMouseDown = true;
    previousMouseX = event.clientX;
    previousMouseY = event.clientY;
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
});



document.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        const deltaX = event.clientX - previousMouseX;
        const deltaY = event.clientY - previousMouseY;

        sphere.rotation.x += deltaY * 0.0035;
        sphere.rotation.y += deltaX * 0.0035;

        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
    }
});

// Prevent right-click menu on the canvas
renderer.domElement.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});


function onDocumentMouseWheel(event) {
    // Adjust the camera's position along the Z-axis
    camera.position.z += event.deltaY * 0.001;
    if (camera.position.z < 1.1){
        camera.position.z = 1.1;
    }
}
// Add a mouse wheel (scroll) event listener
document.addEventListener('wheel', onDocumentMouseWheel);


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Add a mousemove event listener to handle hover
document.addEventListener('mousemove', (event) => {
    // Calculate normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate intersections
    const intersects = raycaster.intersectObject(sphere);

    if (intersects.length > 0) {
        // Change the color of the intersected area to the highlightMaterial
        intersects[0].object.material = highlightMaterial;
        onSphere = true;
    }
    else {
        sphere.material = sphereMaterial;
        onSphere = false;
    }

});

//redirect to a link if the sphere is clicked
document.addEventListener('click', () => {
    if(onSphere){
        console.log("clicked");
        window.location.href = 'https://www.example.com';
    }
});