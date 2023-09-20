import * as BABYLON from "@babylonjs/core";

const canvas = document.getElementById("renderCanvas");

const engine = new BABYLON.WebGPUEngine(canvas);
await engine.initAsync();

const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0.05, 0.05, 0.15);
scene.createDefaultCameraOrLight(true, false, true);

const box = BABYLON.MeshBuilder.CreateBox("box", { size: 0.1 }, scene);

//render the scene every frame.
engine.runRenderLoop(function () {
  scene.render();
});

//resize the scene when the window is resized.
window.addEventListener("resize", function () {
  engine.resize();
});
