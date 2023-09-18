import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

import {
  addListenerToggleFullScreenOnElementDblClick,
  addListenerUpdatesOnWindowResize,
  getWindowDimensions,
} from './utils/window-util.js';
import Scene from './3d-env/Scene.js';

const sizes = getWindowDimensions();

// 캔버스
const canvas = document.getElementById('webgl');

// 장면
const scene = new Scene(true);
scene.background = new THREE.CubeTextureLoader()
  .setPath('./textures/sky-box/')
  .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);

// 카메라
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);

// Orbit Control
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// 렌더러
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Textures
const textureLoader = new THREE.TextureLoader();
const textureAlbedo = textureLoader.load(
  './textures/modern-brick-wall/TexturesCom_Brick_Modern_512_albedo.jpg'
);
const textureAO = textureLoader.load(
  './textures/modern-brick-wall/TexturesCom_Brick_Modern_512_ao.jpg'
);
const textureNormal = textureLoader.load(
  './textures/modern-brick-wall/TexturesCom_Brick_Modern_512_normal.jpg'
);
const textureRoughness = textureLoader.load(
  './textures/modern-brick-wall/TexturesCom_Brick_Modern_512_roughness.jpg'
);

// 라이트
const width = 5;
const height = 5;
const intensity = 5;
const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
rectLight.position.set(1, 2, 0);
rectLight.lookAt(0, 0, 0);
scene.add(rectLight);

const rectLightHelper = new RectAreaLightHelper(rectLight);
rectLight.add(rectLightHelper);

// 3D 오브젝트들
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({});
material.map = textureAlbedo;
material.aoMap = textureAO;
material.normalMap = textureNormal;
material.roughnessMap = textureRoughness;

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

/**
 *
 */
addListenerUpdatesOnWindowResize(sizes, camera, renderer);
addListenerToggleFullScreenOnElementDblClick(canvas);
