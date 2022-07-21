import * as THREE from "three";

// --------- 주제: 빛

export default function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGL1Renderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerWidth);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  camera.position.x = 2;
  camera.position.y = 2;

  scene.add(camera);

  // 빛
  const light = new THREE.DirectionalLight(0xffffff, 1); // 2번째 파마리터 및의 강도
  light.position.z = 2;
  light.position.x = 1;

  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // MeshBasicMaterial 는 빛에 반응 x
  // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

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
