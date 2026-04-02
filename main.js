console.log("hello world");

import * as THREE from 'three';
import resize from './resize.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const canvas = document.querySelector(".webgl");

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Create a renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const orbit = new OrbitControls(camera, renderer.domElement);

//ajout des axis help
const axesHelper = new THREE.AxesHelper(5); 
scene.add(axesHelper); 

//ajout grille pour help
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// On recule un peu la caméra pour voir le cube (optionnel mais conseillé)
camera.position.z = 5;
camera.position.y= 0.5;

orbit.update();

const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
scene.add(light);

const loader = new GLTFLoader();
const models = [];

function loadModel({
    path,
    position = { x: 0, y: 0, z: 0 },
    rotation = { x: 0, y: 0, z: 0 },
    scale = { x: 1, y: 1, z: 1 },
    onLoad = null
}) {
    loader.load(
        path,
        (gltf) => {
            const model = gltf.scene;
            model.position.set(position.x, position.y, position.z);
            model.rotation.set(rotation.x, rotation.y, rotation.z);
            model.scale.set(scale.x, scale.y, scale.z);
            model.userData.baseRotationX = model.rotation.x;
            model.userData.baseRotationY = model.rotation.y;
            models.push(model);
            scene.add(model);

            if (onLoad) {
                onLoad(model, gltf);
            }
        },
        undefined,
        (error) => {
            console.error(`Erreur de chargement du modèle: ${path}`, error);
        }
    );
}

loadModel({
    path: '/models/bookshelf.glb',
    position: { x: 0, y: 0, z: 0 },
    scale : { x: 2.5, y: 2, z: 2 }
});

loadModel({
    path: '/models/bookshelf.glb',
    position: { x: 2.9, y: 0, z: 1 },
    rotation: { x: 0, y: -0.7, z: 0 },
    scale : { x: 2, y: 2, z: 2 }
});

loadModel({
    path: '/models/bookshelf.glb',
    position: { x: -2.9, y: 0, z: 1},
    rotation: { x: 0, y: 0.7, z: 0 },
    scale : { x: 2, y: 2, z: 2 }
});


loadModel({
    path: '/models/Zarbi.glb',
    position: { x: 0, y: 0.2, z: 0 },
    rotation: { x: 0, y: 0.0, z: 0 },
    scale: { x: 0.15, y: 0.15, z: 0.15 }
});

loadModel({
    path: '/models/Zarbi.glb',
    position: { x: 1, y: 0.2, z: 0 },
    rotation: { x: 0, y: 0.0, z: 0 },
    scale: { x: 0.15, y: 0.15, z: 0.15 }
});

loadModel({
    path: '/models/Zarbi.glb',
    position: { x: -1, y: 0.2, z: 0 },
    rotation: { x: 0, y: 0.0, z: 0 },
    scale: { x: 0.15, y: 0.15, z: 0.15 }
});

loadModel({
    path: '/models/piston_cup.glb',
    position: { x: 0, y: 0.65, z: 0.2 },
    rotation: { x: 0, y: -1.6, z: 0 },
    scale : { x: 0.35, y: 0.35, z: 0.35 }
});



/* function mouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    models.forEach((model) => {
        model.rotation.x = model.userData.baseRotationX + mouseY * Math.PI * 0.1;
        model.rotation.y = model.userData.baseRotationY + mouseX * Math.PI * 0.2;
    });
}

window.addEventListener("mousemove", mouseMove);
*/




resize(camera, renderer);
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();