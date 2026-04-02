console.log("hello world");

import * as THREE from 'three';
import resize from './resize.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { FirstPersonControls } from 'three/examples/jsm/Addons.js';

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

//Crée le sol
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x808080,
    side : THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane); 
plane.rotation.x = -Math.PI / 2;

// On recule un peu la caméra pour voir le cube (optionnel mais conseillé)
camera.position.z = 5;
camera.position.y= 0.5;

orbit.update();

const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
scene.add(light);

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/gltf/');
loader.setDRACOLoader(dracoLoader);
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

//load les etageres
loadModel({
    path: '/models/bookshelf3.glb',
    position: { x: 0, y: 0.75, z: 0 },
    scale : { x: 3, y: 2, z: 2 }
});

loadModel({
    path: '/models/bookshelf2.glb',
    position: { x: 2.4, y: 0.5, z: 0.8 },
    rotation: { x: 0, y: -0.7, z: 0 },
    scale : { x: 2, y: 2, z: 2 }
});

loadModel({
    path: '/models/bookshelf2.glb',
    position: { x: -2.4, y: 0.5, z: 0.8},
    rotation: { x: 0, y: 0.7, z: 0 },
    scale : { x: 2, y: 2, z: 2 }
});

//load les objets
loadModel({
    path: '/models/piston_cup.glb',
    position: { x: 0, y: 1.1, z: 0.0 },
    rotation: { x: 0, y: -1.6, z: 0 },
    scale : { x: 0.35, y: 0.35, z: 0.35 }
});

loadModel({
    path: '/models/bycicle_redsdream.glb',
    position: { x: 0, y: 0.59, z: 0 },
    rotation: { x: 0, y: 1, z: 0 },
    scale: { x: 0.45, y: 0.45, z: 0.45 }
});

loadModel({
    path: '/models/bingbongcar_viceversa.glb',
    position: { x: 0.85, y: 0.47, z: 0 },
    rotation: { x: 0, y: -1.2, z: 0 },
    scale: { x: 0.7, y: 0.7, z: 0.7 }
});

loadModel({
    path: '/models/badge_soul.glb',
    position: { x: -0.85, y: 0.47, z: 0 },
    rotation: { x: 1.8, y: 1, z: 0 },
    scale: { x: 0.2, y: 0.2, z: 0.2 }
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
    orbit.update();
    renderer.render(scene, camera);
}
animate();