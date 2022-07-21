import * as THREE from "three";
import gsap from "gsap";

// --------- 주제: 라이브러리를 이용한 애니메이션 npm i gsap
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
  // 안개
  scene.fog = new THREE.Fog("black", 3, 7); // 색, near far

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  camera.position.y = 2;

  scene.add(camera);

  // 빛
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.z = 10;
  light.position.y = 3;
  light.position.x = 1;

  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  let time = Date.now();

  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - time;
    time = newTime;

    // meshes.forEach((item) => {
    //   item.rotation.y += deltaTime * 0.001;
    // });

    renderer.render(scene, camera);

    renderer.setAnimationLoop(draw);
  }
  gsap.to(mesh.position, {
    duration: 1,
    y: 2,
    z: 3,
  });

  function setSize() {
    //카메라
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerWidth);
    renderer.render(scene, camera);
  }

  //이벤트
  window.addEventListener("resize", setSize);

  draw();
}
