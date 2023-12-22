//import * as THREE from '/node_modules/three/build/three.module.js';
import * as THREE from 'three';
//import { OBJLoader } from '/node_modules/three/examples/jsm/loaders/OBJLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;//5

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);


// const greenMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
// const blueMaterial = new THREE.MeshBasicMaterial({ color: 0x006FFF });
const redMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 });

let sphere;
let moitieDroite, moitieGauche;
let textureDroite, textureGauche;

var ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

// const loader = new THREE.OBJLoader();
const mtlLoader = new MTLLoader();
const loader = new OBJLoader();
mtlLoader.load('sphereMaillage.mtl', function (materials) {
        materials.preload();
        loader.setMaterials(materials);
        loader.load('sphereMaillage.obj', (object) => {
            sphere = object;
            sphere.traverse((child) => {
                if (child.isMesh) {
                    if (child.name == 'moitieDroite') {
                        moitieDroite = child;
                        textureDroite = child.material;
                        //moitieDroite.material = blueMaterial;
                
                    } else{
                        moitieGauche = child;
                        textureGauche = child.material;
                        //moitieGauche.material = greenMaterial;
                    }
                }
            });                         
            scene.add(sphere);
        }, 
        (xhr) => {console.log(( xhr.loaded / xhr.total * 100 ) + '% loaded' );}, 
        (error) => {console.log('An error happened');}
        );
});



// Animation function
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();



let isMouseDown = false;
let previousMouseX = 0;
let previousMouseY = 0;
let onMoitieDroite = false;
let onMoitieGauche = false;
let startTime, clickDuration;


document.addEventListener('mousedown', (event) => {
    isMouseDown = true;
    previousMouseX = event.clientX;
    previousMouseY = event.clientY;
    startTime = new Date().getTime();
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;

    if (startTime) {
        const endTime = new Date().getTime();
        clickDuration = endTime - startTime;
        startTime = null;
    }
});

setInterval(function() {
    sphere.rotation.x += 0.001;
    sphere.rotation.y += 0.001;
}, 3);

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
    camera.position.z += event.deltaY * 0.1;
    if (camera.position.z < 17){
        camera.position.z = 17;
    }
}
// Add a scroll event listener
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
        intersects[0].object.material = redMaterial;
        if(intersects[0].object == moitieDroite){
            onMoitieDroite = true;
            onMoitieGauche = false;
            moitieGauche.material = textureGauche;
        }
        else if(intersects[0].object == moitieGauche){
            onMoitieGauche = true;
            onMoitieDroite = false;
            moitieDroite.material = textureDroite;
        }
    }
    else {
        moitieDroite.material = textureDroite;
        moitieGauche.material = textureGauche;
        onMoitieDroite = false;
        onMoitieGauche = false;
    }

});

//redirect to a link if the sphere is clicked
document.addEventListener('click', () => {
    if(onMoitieDroite && clickDuration < 200){
        console.log("clicked Droite");
        document.getElementById('overlay').classList.remove('close');
        document.getElementById('overlay').classList.add('open');
    }
    if(onMoitieGauche && clickDuration < 200){
        console.log("clicked Gauche");
        window.location.href = "/page2.html";
    }
});

window.addEventListener('resize', function () {
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});


