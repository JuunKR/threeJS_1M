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
  // 초당 프레임 수 보정
  const clock = new THREE.Clock();

  function draw() {
    const time = clock.getElapsedTime();
    // mesh.rotation.y += 0.1; // radian 호도각 360 == 2파이
    // mesh.rotation.y += THREE.MathUtils.degToRad(10); // 통상적으로 화면 주사율에 따라 재랜더링 // 이전에는 초당 60프레임
    mesh.rotation.y = 2 * time; // 어떤 컴퓨터에서든 동일한 횟수 실행
    mesh.position.y = time;
    if (mesh.position.y > 3) {
      mesh.position.y = 0;
    }

    renderer.render(scene, camera);

    // 둘다 사용 가능
    // window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw); // ar 이나 vr을쓸 때는 반드시 이거 사용
  }

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
