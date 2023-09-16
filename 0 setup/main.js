/*
Four tings all babylon applications need:
canvas element
engine
scene
camera

Why not use the playground?

WebGPU: https://doc.babylonjs.com/setup/support/webGPU
 */

import * as BABYLON from "@babylonjs/core";

const canvas = document.getElementById("renderCanvas");

//const engine = new BABYLON.Engine(canvas);
const engine = new BABYLON.WebGPUEngine(canvas);
await engine.initAsync();

const createScene = function () {
  const scene = new BABYLON.Scene(engine);
  scene.createDefaultCameraOrLight(true, false, true);

  return scene;
};

const scene = createScene();

//render the scene every frame.
engine.runRenderLoop(function () {
  scene.render();
});

//resize the scene when the window is resized.
window.addEventListener("resize", function () {
  engine.resize();
});
