import * as BABYLON from "@babylonjs/core";

const canvas = document.getElementById("renderCanvas");

//const engine = new BABYLON.Engine(canvas);
const engine = new BABYLON.WebGPUEngine(canvas);
await engine.initAsync();
const scene = new BABYLON.Scene(engine);
scene.createDefaultCameraOrLight(true, false, true);

const box = new BABYLON.MeshBuilder.CreateBox(
  "myBox",
  {
    size: 0.2,
  },
  scene
);

//render the scene every frame.
engine.runRenderLoop(function () {
  scene.render();
});

//resize the scene when the window is resized.
window.addEventListener("resize", function () {
  engine.resize();
});
