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

//je enable les shadows pour le renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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
const wallColorTexture = textureLoader.load('/textures/red_brick_diff.jpg');
const wallNormalTexture = textureLoader.load('/textures/red_brick_nor.jpg');
const wallRoughnessTexture = textureLoader.load('/textures/red_brick_rough.jpg');
const wallAoTexture = textureLoader.load('/textures/red_brick_disp.png');

[wallColorTexture, wallNormalTexture, wallRoughnessTexture, wallAoTexture].forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
});


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

//crée les murs
const wallGeometry = new THREE.PlaneGeometry(10, 3);
const wallMaterial = new THREE.MeshStandardMaterial({
    side : THREE.DoubleSide,
    map : wallColorTexture,
    normalMap : wallNormalTexture,
    roughnessMap : wallRoughnessTexture,
});

const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
scene.add(wall1, wall2, wall3);
wall1.position.set(0, 1.5, -5);
wall2.position.set(-5, 1.5, 0);
wall2.rotation.y = Math.PI / 2;
wall3.position.set(5, 1.5, 0);
wall3.rotation.y = -Math.PI / 2;

//setup les ombres pour que les murs et sol puissent recevoir des ombres
plane.receiveShadow = true;
wall1.receiveShadow = true;
wall2.receiveShadow = true;
wall3.receiveShadow = true;

//crée le material pour les bookshelves
const bookshelfMaterial = new THREE.MeshStandardMaterial({
    map : colortexture,
    normalMap : normaltexture,
    roughnessMap : roughtexture,
    aoMap : aotexture
});




// On recule un peu la caméra pour voir le cube
camera.position.z = 5;
camera.position.y= 0.5;

orbit.update();

//setup toutes les lumières
const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambientLight);
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x2b2b2b, 0.4);
scene.add(hemiLight);
const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(4, 6, 3);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(2048, 2048);
keyLight.shadow.camera.near = 0.5;
keyLight.shadow.camera.far = 30;
keyLight.shadow.camera.left = -8;
keyLight.shadow.camera.right = 8;
keyLight.shadow.camera.top = 8;
keyLight.shadow.camera.bottom = -8;
scene.add(keyLight);



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
                        child.castShadow = true;
                        child.receiveShadow = true;
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
loadModel({
    path: '/models/bookshelf3.glb',
    position: { x: 0, y: 0.75, z: 0 },
    scale : { x: 3, y: 2, z: 2 },
    material: bookshelfMaterial
});

loadModel({
    path: '/models/bookshelf2.glb',
    position: { x: 2.4, y: 0.5, z: 0.8 },
    rotation: { x: 0, y: -0.7, z: 0 },
    scale : { x: 2, y: 2, z: 2 },
    material: bookshelfMaterial
});

loadModel({
    path: '/models/bookshelf2.glb',
    position: { x: -2.4, y: 0.5, z: 0.8},
    rotation: { x: 0, y: 0.7, z: 0 },
    scale : { x: 2, y: 2, z: 2 },
    material: bookshelfMaterial
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


const testModel = models[0]; // Remplacez par le modèle que vous souhaitez tester

// ajouter des interactions click // 
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
    ;

});


//mise en place des stickers sur les murs
const textureLoader = new THREE.TextureLoader();
const imageNemoTexture = textureLoader.load('/textures/sticker_nemo.png');

const imageMaterial = new THREE.MeshBasicMaterial({
  map: imageNemoTexture,
  transparent: true
});

const imageGeometry = new THREE.PlaneGeometry(2, 1.5);
const image = new THREE.Mesh(imageGeometry, imageMaterial);

scene.add(image);


// Mur du fond : wall1 est à z = -5
image.position.set(0, 1.5, -4.99);



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
