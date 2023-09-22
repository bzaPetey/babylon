import * as BABYLON from "@babylonjs/core";

const canvas = document.getElementById("renderCanvas");
// const engine = new BABYLON.WebGPUEngine(canvas);
// await engine.initAsync();
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

const camera = new BABYLON.ArcRotateCamera(
  "camera",
  -Math.PI / 2,
  Math.PI / 4,
  6,
  BABYLON.Vector3.Zero(),
  scene
);
camera.attachControl(canvas, true);

const light = new BABYLON.DirectionalLight(
  "light",
  new BABYLON.Vector3(-0.5, -1, 0.5),
  scene
);
light.intensity = 0.8;

const box = new BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);
box.position.y = 0.75;
box.rotation.y = Math.PI / 4;

// Our built-in 'ground' shape.
const ground = BABYLON.MeshBuilder.CreateGround(
  "ground",
  { width: 10, height: 10 },
  scene
);

const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
groundMat.diffuseColor = new BABYLON.Color3(0.5, 0, 0);
ground.material = groundMat;

const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
shadowGenerator.getShadowMap().renderList.push(box);
ground.receiveShadows = true;

engine.runRenderLoop(function () {
  if (scene) {
    scene.render();
  }
});

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});
