import * as THREE from "three";

// --------- 주제: 배경의 색, 투명도 설정

export default function example() {
  const canvas = document.querySelector("#three-canvas");
  // 투명도 설정
  const renderer = new THREE.WebGL1Renderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerWidth);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  // 투명도 정도; 0~1
  renderer.setClearAlpha(0.5);
  // 배경 색
  renderer.setClearColor("#00ff00");

  // Scene
  const scene = new THREE.Scene();
  //Scene에 백그라운드 색을 주면 render의 색 덮음
  scene.background = new THREE.Color("blue");

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  camera.position.x = 1;
  camera.position.y = 2;

  scene.add(camera);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Render
  renderer.render(scene, camera);

  function setSize() {
    //카메라
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerWidth);
    renderer.render(scene, camera);
  }

  //이벤트
  window.addEventListener("resize", setSize);
}
