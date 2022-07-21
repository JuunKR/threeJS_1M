import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";
// --------- 주제: 브라우저 창 사이즈 변경에 대응하기

// --------- 주제: 기본 장면

// 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGL1Renderer();
// renderer.setSize(window.innerWidth, window.innerWidth);
// document.body.appendChild(renderer.domElement);

const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGL1Renderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerWidth);

// Scene
const scene = new THREE.Scene();

// Camera
// Perspective Camera(원근 카메라)
// const camera = new THREE.PerspectiveCamera(
//   75, // 시야각(field of view)
//   window.innerWidth / window.innerHeight, // 종횡비(aspect)
//   0.1, // near
//   1000 // far
// );
// camera.position.z = 5; // threeJS에서 거리는 개념적인 거리 단위, 만드는 물체에 따라 유동적으로 생각을 해라!
// camera.position.x = 1;
// camera.position.y = 2;

// Orthographic Camera(직교 카메라)
const camera = new THREE.OrthographicCamera(
  -(window.innerWidth / window.innerHeight), //left
  window.innerWidth / window.innerHeight, // right
  1, //top
  -1, // botoom
  0.1,
  1000
);
camera.position.z = 5;
camera.position.x = 1;
camera.position.y = 2;
camera.lookAt(0, 0, 0); // 카메라가 정의된 포지션을 바라봄
camera.zoom = 0.5; // Orthographic에서 거리를 조절 하기위해 zoom 사용
camera.updateProjectionMatrix();
scene.add(camera);

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Render
renderer.render(scene, camera);
