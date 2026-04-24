console.log("hello world");

import * as THREE from 'three';
import resize from './resize.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';


const canvas = document.querySelector(".webgl");

/
const ecranChargement = document.querySelector('#ui-chargement');
const ecranAccueil = document.querySelector('#ui-accueil');
const ecranDifficulte = document.querySelector('#ui-difficulte');
const btnCommencer = document.querySelector('#btn-commencer');
const boutonsDifficulte = document.querySelectorAll('.btn-diff');

let gameStats = { vies: 0 }; // Variable pour la suite du jeu

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

// textures floor
const textureLoader = new THREE.TextureLoader();
const colortexture = textureLoader.load('/textures/oak.jpg');
const normaltexture = textureLoader.load('/textures/oak_normal.jpg');
const roughtexture = textureLoader.load('/textures/oak_rough.jpg');
const aotexture = textureLoader.load('/textures/oak_ao.jpg');

//textures walls
const wallColorTexture = textureLoader.load('/textures/brick_color.jpg');
const wallNormalTexture = textureLoader.load('/textures/brick_normal.jpg');
const wallRoughnessTexture = textureLoader.load('/textures/brick_rough.jpg');

//Crée le sol
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x808080,
    side : THREE.DoubleSide,
    map : colortexture,
    normalMap : normaltexture,
    roughnessMap : roughtexture,
    aoMap : aotexture
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane); 
plane.rotation.x = -Math.PI / 2;


const wallGeometry = new THREE.PlaneGeometry(10, 3);
const wallMaterial = new THREE.MeshStandardMaterial({
    side : THREE.DoubleSide,
    map : wallColorTexture,
    normalMap : wallNormalTexture,
    roughnessMap : wallRoughnessTexture,
});
wallMaterial.repeat(2, 2);

const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
scene.add(wall1, wall2, wall3);
wall1.position.set(0, 1.5, -5);
wall2.position.set(-5, 1.5, 0);
wall2.rotation.y = Math.PI / 2;
wall3.position.set(5, 1.5, 0);
wall3.rotation.y = -Math.PI / 2;


const bookshelfMaterial = new THREE.MeshStandardMaterial({
    map : colortexture,
    normalMap : normaltexture,
    roughnessMap : roughtexture,
    aoMap : aotexture
});


camera.position.z = 5;
camera.position.y= 0.5;

orbit.update();

const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
scene.add(light);


THREE.DefaultLoadingManager.onLoad = function ( ) {
    console.log( 'Tous les modèles 3D et textures sont chargés !' );
    // On cache l'écran bleu et on affiche la page d'accueil
    ecranChargement.style.display = 'none';
    ecranAccueil.style.display = 'flex';
};

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/gltf/');


const ecranChargement = document.querySelector('#ui-chargement');
const ecranAccueil = document.querySelector('#ui-accueil');


THREE.DefaultLoadingManager.onLoad = function () {
    console.log('Tous les modèles sont chargés !');
   
    ecranChargement.style.display = 'none';
    ecranAccueil.style.display = 'flex';
};

loader.setDRACOLoader(dracoLoader);
const models = [];

function loadModel({
    path,
    position = { x: 0, y: 0, z: 0 },
    rotation = { x: 0, y: 0, z: 0 },
    scale = { x: 1, y: 1, z: 1 },
    onLoad = null,
    material = null
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

            if (material) {
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.material = material;
                    }
                });
            }

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
loadModel({ path: '/models/bookshelf3.glb', position: { x: 0, y: 0.75, z: 0 }, scale : { x: 3, y: 2, z: 2 }, material: bookshelfMaterial });
loadModel({ path: '/models/bookshelf2.glb', position: { x: 2.4, y: 0.5, z: 0.8 }, rotation: { x: 0, y: -0.7, z: 0 }, scale : { x: 2, y: 2, z: 2 }, material: bookshelfMaterial });
loadModel({ path: '/models/bookshelf2.glb', position: { x: -2.4, y: 0.5, z: 0.8}, rotation: { x: 0, y: 0.7, z: 0 }, scale : { x: 2, y: 2, z: 2 }, material: bookshelfMaterial });

//load les objets
loadModel({ path: '/models/piston_cup.glb', position: { x: 0, y: 1.1, z: 0.0 }, rotation: { x: 0, y: -1.6, z: 0 }, scale : { x: 0.35, y: 0.35, z: 0.35 } });
loadModel({ path: '/models/bycicle_redsdream.glb', position: { x: 0, y: 0.59, z: 0 }, rotation: { x: 0, y: 1, z: 0 }, scale: { x: 0.45, y: 0.45, z: 0.45 } });
loadModel({ path: '/models/bingbongcar_viceversa.glb', position: { x: 0.85, y: 0.47, z: 0 }, rotation: { x: 0, y: -1.2, z: 0 }, scale: { x: 0.7, y: 0.7, z: 0.7 } });
loadModel({ path: '/models/badge_soul.glb', position: { x: -0.85, y: 0.47, z: 0 }, rotation: { x: 1.8, y: 1, z: 0 }, scale: { x: 0.2, y: 0.2, z: 0.2 } });

const testModel = models[0]; 


const raycaster = new THREE.Raycaster();
const pointer  = new THREE.Vector2();

canvas.addEventListener('click', (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(models, true);
    if (intersects.length > 0) {
        const first = intersects[0];
        console.log('Model clicked:', first.object);
    }
});


/
btnCommencer.addEventListener('click', () => {
    ecranAccueil.style.display = 'none';
    ecranDifficulte.style.display = 'flex';
});

boutonsDifficulte.forEach((bouton) => {
    bouton.addEventListener('click', () => {
        const vies = parseInt(bouton.getAttribute('data-vies'));
        gameStats.vies = vies;
        ecranDifficulte.style.display = 'none';
        console.log("LE JEU COMMENCE AVEC " + vies + " VIES !");
    });
});


resize(camera, renderer);

function animate() {
    requestAnimationFrame(animate);
    orbit.update();
    renderer.render(scene, camera);
}
animate();