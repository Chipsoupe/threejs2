console.log("hello world");

import * as THREE from 'three';
import resize from './resize.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

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

//ajout des axis help
const axesHelper = new THREE.AxesHelper(5); 
scene.add(axesHelper); 

//ajout grille pour help
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// textures floor (Ceramic)
const textureLoader = new THREE.TextureLoader();
const ceramicColorTexture = textureLoader.load('/textures/Ceramic_Color.png');
const ceramicNormalTexture = textureLoader.load('/textures/Ceramic_normal.png');
const ceramicRoughnessTexture = textureLoader.load('/textures/Ceramic_rough.png');

// textures wood oak
const oakColorTexture = textureLoader.load('/textures/oak.jpg');
const oakNormalTexture = textureLoader.load('/textures/oak_normal.jpg');
const oakRoughnessTexture = textureLoader.load('/textures/oak_rough.jpg');
const oakAoTexture = textureLoader.load('/textures/oak_ao.jpg');

// textures ceiling
const sandstoneColorTexture = textureLoader.load('/textures/Sandstone_Color.png');
const sandstoneNormalTexture = textureLoader.load('/textures/Sandstone_normal.png');
const sandstoneRoughnessTexture = textureLoader.load('/textures/Sandstone_rough.png');

//textures walls (Sandstone)
const wallColorTexture = textureLoader.load('/textures/Sandstone_Color.png');
const wallNormalTexture = textureLoader.load('/textures/Sandstone_normal.png');
const wallRoughnessTexture = textureLoader.load('/textures/Sandstone_rough.png');

//Textures sol bois
const woodNormalTexture = textureLoader.load('/textures/wood_floor_nor_gl_4k.jpg');
const woodColorTexture = textureLoader.load('/textures/wood_floor_diff_4k.jpg');
const woodDispTexture = textureLoader.load('/textures/wood_floor_disp_4k.png');
const woodRoughnessTexture = textureLoader.load('/textures/wood_floor_rough_4k.jpg');
const woodAoTexture = oakAoTexture;

const wallTextureRepeatFactor = 0.8;

function createWallMaterial(width, height) {
    const colorTexture = wallColorTexture.clone();
    const normalTexture = wallNormalTexture.clone();
    const roughnessTexture = wallRoughnessTexture.clone();

    [colorTexture, normalTexture, roughnessTexture].forEach((texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(width * wallTextureRepeatFactor, height * wallTextureRepeatFactor);
    });

    return new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        map: colorTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture
    });
}


//Crée le sol avec matériau Ceramic
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    side : THREE.DoubleSide,
    map : ceramicColorTexture,
    normalMap : ceramicNormalTexture,
    roughnessMap : ceramicRoughnessTexture
});
const sol = new THREE.Mesh(planeGeometry, planeMaterial);
const plafondGeometry = new THREE.PlaneGeometry(10, 10);
const plafondMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    side : THREE.DoubleSide,
    map : wallColorTexture,
    normalMap : wallNormalTexture,
    roughnessMap : wallRoughnessTexture
});
const plafond = new THREE.Mesh(plafondGeometry, plafondMaterial);
scene.add(sol, plafond); 
sol.rotation.x = -Math.PI / 2;
plafond.position.y = 3;
plafond.rotation.x = Math.PI / 2;

//plafond séparé
/*const ceilingGeometry = new THREE.PlaneGeometry(10, 10);
const ceilingMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x000000,
    side : THREE.DoubleSide,
    map : colortexture,
    normalMap : normaltexture,
    roughnessMap : roughtexture,
    aoMap : aotexture
});
const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
scene.add(ceiling); 
ceiling.position.y = 3;
ceiling.rotation.x = Math.PI / 2; */

//crée les murs
const wallGeometry = new THREE.PlaneGeometry(10, 3);
const wall1Material = createWallMaterial(10, 3);
const wall2Material = createWallMaterial(10, 3);
const wall3Material = createWallMaterial(10, 3);

// Ouverture de porte sur le mur derrière le spawn, côté droit
const wallWidth = 10;
const wallHeight = 3;
const doorWidth = 1.6;
const doorHeight = 2.2;
const doorCenterX = 2.6;
const wallLeftEdge = -wallWidth / 2;
const wallRightEdge = wallWidth / 2;
const doorLeftX = doorCenterX - doorWidth / 2;
const doorRightX = doorCenterX + doorWidth / 2;
const leftSegmentWidth = doorLeftX - wallLeftEdge;
const rightSegmentWidth = wallRightEdge - doorRightX;
const topSegmentHeight = wallHeight - doorHeight;

const wall4LeftMaterial = createWallMaterial(leftSegmentWidth, wallHeight);
const wall4RightMaterial = createWallMaterial(rightSegmentWidth, wallHeight);
const wall4TopMaterial = createWallMaterial(doorWidth, topSegmentHeight);

const wall1 = new THREE.Mesh(wallGeometry, wall1Material);
const wall2 = new THREE.Mesh(wallGeometry, wall2Material);
const wall3 = new THREE.Mesh(wallGeometry, wall3Material);
const wall4Left = new THREE.Mesh(new THREE.PlaneGeometry(leftSegmentWidth, wallHeight), wall4LeftMaterial);
const wall4Right = new THREE.Mesh(new THREE.PlaneGeometry(rightSegmentWidth, wallHeight), wall4RightMaterial);
const wall4Top = new THREE.Mesh(new THREE.PlaneGeometry(doorWidth, topSegmentHeight), wall4TopMaterial);

scene.add(wall1, wall2, wall3, wall4Left, wall4Right, wall4Top);
wall1.position.set(0, 1.5, -5);
wall2.position.set(-5, 1.5, 0);
wall2.rotation.y = Math.PI / 2;
wall3.position.set(5, 1.5, 0);
wall3.rotation.y = -Math.PI / 2;

wall4Left.position.set((wallLeftEdge + doorLeftX) / 2, wallHeight / 2, 5);
wall4Right.position.set((doorRightX + wallRightEdge) / 2, wallHeight / 2, 5);
wall4Top.position.set(doorCenterX, doorHeight + topSegmentHeight / 2, 5);

wall4Left.rotation.y = Math.PI;
wall4Right.rotation.y = Math.PI;
wall4Top.rotation.y = Math.PI;

//setup les ombres pour que les murs et sol puissent recevoir des ombres
sol.receiveShadow = true;
plafond.receiveShadow = true;
wall1.receiveShadow = true;
wall2.receiveShadow = true;
wall3.receiveShadow = true;
wall4Left.receiveShadow = true;
wall4Right.receiveShadow = true;
wall4Top.receiveShadow = true;

//crée le material pour les bookshelves
const bookshelfMaterial = new THREE.MeshStandardMaterial({
    map : oakColorTexture,
    normalMap : oakNormalTexture,
    roughnessMap : oakRoughnessTexture,
    aoMap : oakAoTexture
});

//matériau black
const blackMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    roughness: 0.3,
    metalness: 0,
    emissive: 0x444444
});

//teinte destabourets
const createTintedMaterial = (baseMaterial, hexColor) => {
const m = baseMaterial.clone();
m.color = new THREE.Color(hexColor);
return m;
};

//matériau white
const whiteMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.3,
    metalness: 0,
    emissive: 0x444444
});

// Matériau teinté pour les tabourets (clone de `whiteMaterial`)
const stoolTintMaterial = createTintedMaterial(whiteMaterial, 0xffe6e6);
stoolTintMaterial.roughness = 0.35;
stoolTintMaterial.emissive = new THREE.Color(0x111111);

// Teintes spécifiques demandées: un bleu et deux jaunes
const stoolBlueMaterial = createTintedMaterial(whiteMaterial, 0x4da6ff);
stoolBlueMaterial.roughness = 0.35;
stoolBlueMaterial.emissive = new THREE.Color(0x0a0a1a);

const stoolYellowMaterial = createTintedMaterial(whiteMaterial, 0xffe066);
stoolYellowMaterial.roughness = 0.35;
stoolYellowMaterial.emissive = new THREE.Color(0x111100);

const stoolRedMaterial = createTintedMaterial(whiteMaterial, 0xc94a4a);
stoolRedMaterial.roughness = 0.45;
stoolRedMaterial.emissive = new THREE.Color(0x220000);

//Material bois sol
const woodFloorMaterial = new THREE.MeshStandardMaterial({
    map : woodColorTexture,
    normalMap : woodNormalTexture,
    roughnessMap : woodRoughnessTexture,
    aoMap : woodAoTexture
});

// Appliquer le matériau bois au sol
sol.material = woodFloorMaterial;

// Caméra de pov
camera.position.set(0, 1.65, 3.5);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

window.addEventListener('keydown', (event) => {
    if (event.key in keys) {
        keys[event.key] = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.key in keys) {
        keys[event.key] = false;
    }
});

let cameraYaw = 0;
camera.rotation.set(0, cameraYaw, 0);

const clock = new THREE.Clock();
const movementSpeed = 3;
const rotationSpeed = 2;
const viewDirection = new THREE.Vector3();
const movementDirection = new THREE.Vector3();

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


//Les pointlight dans la chambre
function createRoomLight({ x, y, z, color = 0xfff1d6, intensity = 1.2, distance = 4, decay = 2 }) {
    const light = new THREE.PointLight(color, intensity, distance, decay);
    light.position.set(x, y, z);
    scene.add(light);

    const bulb = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 12, 12),
        new THREE.MeshBasicMaterial({ color })
    );
    bulb.position.set(x, y, z);
    scene.add(bulb);

    return light;
}

createRoomLight({ x: -4.5, y: 2.9, z: -4.5, color: 0xfff3c4, intensity: 1.1, distance: 5 });
createRoomLight({ x: 4.5, y: 2.9, z: -4.5, color: 0xfff3c4, intensity: 1.1, distance: 5 });
createRoomLight({ x: -4.5, y: 2.9, z: 4.5, color: 0xfff3c4, intensity: 1.1, distance: 5 });
createRoomLight({ x: 4.5, y: 2.9, z: 4.5, color: 0xfff3c4, intensity: 1.1, distance: 5 });


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

//load les meubles


loadModel({
    path: '/models/meubles/bookshelf3.glb',
    position: { x: -2, y: 0.5, z: -4.5},
    rotation: { x: 0, y: 0, z: 0 },
    scale : { x: 2.5, y: 2.5, z: 2.5 },
    material: bookshelfMaterial
});

loadModel({
    path: '/models/meubles/doorframe.glb',
    position: { x: 2.6 , y: 1.1, z: 5.1
    },
    rotation: { x: 0, y: 0, z: 0 },
    scale : { x: 1.7, y: 1.05, z: 1.5 },
    material: bookshelfMaterial
});

loadModel({
    path: '/models/meubles/table.glb',
    position: { x: -4.4, y: 0.5, z: 2},
    rotation: { x: 0, y: 1.57, z: 0 },
    scale : { x: 1.2, y: 1, z: 1 },
    material: bookshelfMaterial
});

loadModel({
    path: '/models/meubles/monitor.glb',
    position: { x: -4.4, y: 1.38, z: 2},
    rotation: { x: 0, y: 1.57, z: 0 },
    scale : { x: 1.8, y: 1.8, z: 1.8 },
    material : blackMaterial
});

loadModel({
    path: '/models/meubles/drawer.glb',
    position: { x: -4.4, y: 0.95, z: 0},
    rotation: { x: 0, y: 1.57, z: 0 },
    scale : { x: 2.8, y: 2, z: 2.8 },
    material: bookshelfMaterial
});

loadModel({
    path: '/models/meubles/drawer2.glb',
    position: { x: -4.4, y: 0.42, z: 0},
    rotation: { x: 0, y: 1.57, z: 0 },
    scale : { x: 2.8, y: 2, z: 2.8 },
    material: bookshelfMaterial
});

loadModel({
    path: '/models/meubles/bookshelf2.glb',
    position: { x: -4.7, y: 1.2, z: 4},
    rotation: { x: 0, y: 1.57, z: 0 },
    scale : { x: 1.7, y: 2.8, z:2 },
    material: bookshelfMaterial
});

loadModel({
    path: '/models/meubles/bookshelf2.glb',
    position: { x: 4.7, y: 1.2, z: 4},
    rotation: { x: 0, y: -1.57, z: 0 },
    scale : { x: 1.7, y: 2.8, z:2 },
    material: bookshelfMaterial
});

loadModel({
    path: '/models/meubles/wardrobe2.glb',
    position: { x: 4.75, y: 1.4, z: 0.5 },
    rotation: { x: 0, y: -1.57, z: 0 },
    scale: { x: 2.8 , y: 1.8, z: 1 },
    material: woodFloorMaterial
});

loadModel({
    path: '/models/meubles/table-basse.glb',
    position: { x: 3.5, y: 0.5, z: -3.3 },
    rotation: { x: 0, y: -1.57, z: 0 },
    scale: { x: 0.7, y: 0.7, z: 0.7 },
    material: woodFloorMaterial
});

loadModel({
    path: '/models/meubles/tabouret.glb',
    position: { x: 4, y: 0.2, z: -4.5 },
    rotation: { x: 0, y: -1.57, z: 0 },
    scale: { x: 0.6, y: 0.6, z: 0.6 },
    material: stoolBlueMaterial
});

loadModel({
    path: '/models/meubles/tabouret.glb',
    position: { x: 4.5, y: 0.2, z: -3 },
    rotation: { x: 0, y: -1.57, z: 0 },
    scale: { x: 0.6, y: 0.6, z: 0.6 },
    material: stoolYellowMaterial
});

loadModel({
    path: '/models/meubles/tabouret.glb',
    position: { x: 3, y: 0.2, z: -2.8 },
    rotation: { x: 0, y: -1.57, z: 0 },
    scale: { x: 0.6, y: 0.6, z: 0.6 },
    material: stoolRedMaterial
});

loadModel({
    path: '/models/meubles/chaise.glb',
    position: { x: -3.5, y: 0.7, z: 2 },
    rotation: { x: 0, y: -1.57, z: 0 },
    scale: { x: 1.4, y: 1.4, z: 1.4 },
    material : woodFloorMaterial
});

loadModel({
    path: '/models/meubles/pixar bed .glb',
    position: { x: -3.7, y: 0.7, z: -3.2 },
    rotation: { x: 0, y: 1.57, z: 0 },
    scale : { x: 3, y: 3, z: 4 },

});

loadModel({
    path: '/models/meubles/wooden letter blocks.glb',
    position: { x: -3.5, y: 2, z: -4.5 },
    rotation: { x: 0, y: -1.57, z: 0 },
    scale: { x: 1, y: 1, z: 1 }
});

loadModel({
    path: '/models/meubles/pixar round poster 3d model.glb',
    position: { x: 0, y: 0.01, z: -1 },
    rotation: { x: -1.56, y: -1.57, z: 0 },
    scale: { x: 0.1, y: 5, z: 5 }
});


//===========================OBJETS PIXAR====================================

//load les objets
loadModel({
    path: '/models/piston_cup.glb',
    position: { x: -4.4, y: 1.3, z: 0},
    rotation: { x: 0, y: Math.PI, z: 0 },
    scale : { x: 0.5, y: 0.5, z: 0.5 }
});

loadModel({
    path: '/models/bycicle_redsdream.glb',
    position: { x: 4.7, y: 0.42, z: 3.05 },
    rotation: { x: 0, y: 2, z: 0.2 },
    scale: { x:0.85, y:0.85, z: 0.85 }
});

loadModel({
    path: '/models/casquette_monster_and_co.glb',
    position: { x: -3.1, y: 1.3, z: 1.7 },
    rotation: { x: 0, y: Math.PI/3, z: -0.8 },
    scale: { x: 0.3, y: 0.3, z: 0.3
    }
}); 

loadModel({
    path: '/models/bingbongcar_viceversa.glb',
    position: { x:0.5, y: 0.23, z: 4.2 },
    rotation: { x: 0, y: 1, z: 0 },
    scale: { x: 1.3, y: 1.3, z: 1.3 }
});

loadModel({
    path: '/models/badge_soul.glb',
    position: { x: -4.38, y: 1.5, z: 2.3 },
    rotation: { x: 0, y: 0, z: -1.4 },
    scale: { x: 0.15, y: 0.05, z: 0.15 }
});

/*
loadModel({
    path: '/models/meubles/pixar round poster 3d model.glb',
    position: { x: 0, y: 1.5, z: -4.85 },
    rotation: { x: 0.45, y: -1.57, z: 0 },
    scale: { x: 1.8, y: 1.8, z: 1.8 }
});
*/


loadModel({
    path: '/models/cailloux_1001pattes.glb',
    position: { x: 3, y: 0.58, z: -2.8},
    rotation: { x: 0, y:4, z: 0 },
    scale: { x: 0.2, y: 0.2, z: 0.2 }
});

loadModel({
    path: '/models/casque_lifted.glb',
    position: { x: -4.1, y: 1.09, z: 2.8 },
    rotation: { x:1.25, y: 0, z: 0 },
    scale: { x: 0.35, y: 0.35, z: 0.35 }
});


loadModel({
    path: '/models/chapeau_elio.glb',
    position: { x: -4.7, y: 1.15, z: 4 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 0.4, y: 0.4, z: 0.4 }
});

loadModel({
    path: '/models/chapeau-of-wallyB_the-adventure-of-andre-and-wallyB.glb',
    position: { x: -4.7, y: 0.4, z: 4.4 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 0.3, y: 0.3, z: 0.3 }
});

loadModel({
    path: '/models/collier_chien_lahaut.glb',
    position: { x: 4.5, y: 0.55, z: -3 },
    rotation: { x: 0, y: 4, z: 0 },
    scale: { x: 0.5, y: 0.5, z: 0.5 }
});

loadModel({
    path: '/models/eponge_elementaire.glb',
    position: { x: -3.8, y: 0.9, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 0.3, y: 0.3, z: 0.3 }
});

loadModel({
    path: '/models/eve.glb',
    position: { x: -4.2, y: 0.7, z: -0.93 },
    rotation: { x: 0.2, y: 0, z: 0 },
    scale: { x: 1.5, y: 1.5, z: 1.5 }
});

loadModel({
    path: '/models/gateaux_rebelle.glb',
    position: { x: 3.5, y: 0.9, z: -3.3 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 0.4, y: 0.4, z: 0.4 }
});

loadModel({
    path: '/models/gemephoenix_enavant.glb',
    position: { x: 4.7, y: 1.1, z: 4.3},
    rotation: { x: 1.8, y: 1, z: 0 },
    scale: { x: 0.3, y: 0.3, z: 0.3 }
});

loadModel({
    path: '/models/guitare_coco.glb',
    position: { x: 4.8, y: 0.68, z: -0.92},
    rotation: { x:-1.4, y:0.5, z:1.5 },
    scale: { x: 1.3, y: 1.3, z: 1.3 }
});

loadModel({
    path: '/models/lotso_toystory3.glb',
    position: { x: -2, y: 1.3, z: -4.5 },
    rotation: { x: 0, y: -Math.PI/2, z: 0 },
    scale: { x:0.7, y:0.7, z:0.7 }
});

loadModel({
    path: '/models/vespa_luca.glb',
    position: { x: 0.5, y: 0.63, z: -4.52 },
    rotation: { x: 0, y: Math.PI/2, z: -0.2 },
    scale: { x: 1.5, y: 1.5, z: 1.5 }
});


const testModel = models[0]; // Remplacer par le modèle quon veut

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
const imageNemoTexture = textureLoader.load('/textures/sticker_nemo2.jpg');
const imageCarsTexture = textureLoader.load('/textures/cars_sticker2.jpg');
const imageRatatouilleTexture = textureLoader.load('/textures/sticker_ratatouille2.jpg');
const imageToyStoryTexture = textureLoader.load('/textures/sticker_toystory2.jpg');
const imageLaHautTexture = textureLoader.load('/textures/sticker_up2.jpg');
const imageViceVersaTexture = textureLoader.load('/textures/sticker_insideout2.jpg');
const imageWallETexture = textureLoader.load('/textures/sticker_walle2.jpg');
const image1001pattesTexture = textureLoader.load('/textures/sticker_bugslife2.jpg');
const imageMonstresetcieTexture = textureLoader.load('/textures/sticker_monstresetcie2.jpg');

function createWallSticker(texture, position, rotationY, scaleX, scaleY = 1) {
        const stickerMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                side: THREE.DoubleSide
        });
        const stickerGeometry = new THREE.PlaneGeometry(1.6, 1.2);
        const sticker = new THREE.Mesh(stickerGeometry, stickerMaterial);
        sticker.position.set(position.x, position.y, position.z);
        sticker.rotation.y = rotationY;
        sticker.scale.set(scaleX, scaleY, 1);
        scene.add(sticker);
}

// Mur du fond
createWallSticker(imageViceVersaTexture, { x: 3.5, y: 1.7, z: -4.95 }, 0, 0.8, 1.4);
createWallSticker(imageNemoTexture, { x: 1.5, y: 1.7, z: -4.95 }, 0, 0.8,1.4);
createWallSticker(imageCarsTexture, { x: -0.5, y: 1.7, z: -4.98 }, 0, 0.8, 1.4);

// Mur gauche
createWallSticker(imageRatatouilleTexture, { x: -4.95, y: 1.8, z: -3.5 }, Math.PI / 2, 0.8, 1.4);
createWallSticker(image1001pattesTexture, { x: -4.95, y: 1.8, z: -1.5 }, Math.PI / 2, 0.8, 1.4);


// Mur droit
createWallSticker(imageToyStoryTexture, { x: 4.95, y: 1.7, z: -3.5 }, -Math.PI / 2, 0.8, 1.4);

// Mur derrière le spawn
createWallSticker(imageLaHautTexture, { x: -3.5, y: 1.7, z: 4.95 }, Math.PI, 0.8, 1.4);
createWallSticker(imageWallETexture, { x: -1.5, y: 1.7, z: 4.95 }, Math.PI, 0.8, 1.4);
createWallSticker(imageMonstresetcieTexture, { x: 0.5, y: 1.7, z: 4.95 }, Math.PI, 0.8, 1.4);

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

    const delta = clock.getDelta();

    if (keys.ArrowLeft) {
        cameraYaw += rotationSpeed * delta;
    }

    if (keys.ArrowRight) {
        cameraYaw -= rotationSpeed * delta;
    }

    camera.rotation.set(0, cameraYaw, 0);

    camera.getWorldDirection(viewDirection);
    viewDirection.y = 0;
    viewDirection.normalize();

    movementDirection.set(0, 0, 0);

    if (keys.ArrowUp) {
        movementDirection.add(viewDirection);
    }

    if (keys.ArrowDown) {
        movementDirection.sub(viewDirection);
    }

    if (movementDirection.lengthSq() > 0) {
        movementDirection.normalize();
        camera.position.addScaledVector(movementDirection, movementSpeed * delta);
    }

    camera.position.y = 1.65;

    renderer.render(scene, camera);
}
animate();
