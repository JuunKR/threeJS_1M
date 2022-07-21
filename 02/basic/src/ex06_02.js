import * as THREE from "three";

// --------- 주제: 애니메이션 성능 보정

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
  // const clock = new THREE.Clock();
  // js 내장 기능 사용
  let oldTime = Date.now();

  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - oldTime;
    oldTime = newTime;
    // 05번에서 올라가는게 멈춤
    // const time = clock.getElapsedTime(); 실행 시점으로부터 총경과 시간을 나타냄
    // const delta = clock.getDelta(); // draw가 실행될 때 마다의 시간 차 * 위아래 둘다 동시에 쓰면 에러남 주의

    // mesh.rotation.y += 0.1; // radian 호도각 360 == 2파이
    // mesh.rotation.y += THREE.MathUtils.degToRad(10); // 통상적으로 화면 주사율에 따라 재랜더링 // 이전에는 초당 60프레임
    mesh.rotation.y += deltaTime * 0.005; // 어떤 컴퓨터에서든 동일한 횟수 실행
    mesh.position.y += deltaTime * 0.001;
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
