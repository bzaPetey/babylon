import * as BABYLON from "@babylonjs/core";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.WebGPUEngine(canvas);
await engine.initAsync();
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

const ambientLight = new BABYLON.HemisphericLight(
  "amb",
  new BABYLON.Vector3(0, -0.5, 0),
  scene
);
ambientLight.intensity = 0.45;
const light = new BABYLON.DirectionalLight(
  "light",
  new BABYLON.Vector3(0.5, -0.5, 0.25),
  scene
);
light.intensity = 0.8;
light.autoCalcShadowZBounds = true;

const box = new BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);
box.position.y = 0.75;
box.rotation.y = Math.PI / 4;

const boxMat = new BABYLON.StandardMaterial("boxMaterial", scene);
boxMat.diffuseColor = new BABYLON.Color3(0.75, 0, 0);
box.material = boxMat;

// Our built-in 'ground' shape.
const ground = BABYLON.MeshBuilder.CreateGround(
  "ground",
  { width: 25, height: 25 },
  scene
);

const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
groundMat.diffuseColor = new BABYLON.Color3(0, 0.75, 0.75);
ground.material = groundMat;

const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
shadowGenerator.getShadowMap().renderList.push(box);
ground.receiveShadows = true;
shadowGenerator.useBlurCloseExponentialShadowMap = true;

engine.runRenderLoop(function () {
  if (scene) {
    scene.render();
  }
});

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});
