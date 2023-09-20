import * as BABYLON from "@babylonjs/core";

const canvas = document.getElementById("renderCanvas");

//const engine = new BABYLON.Engine(canvas);
const engine = new BABYLON.WebGPUEngine(canvas);
await engine.initAsync();
const scene = new BABYLON.Scene(engine);

const camera = new BABYLON.ArcRotateCamera(
  "Camera",
  1,
  1,
  5,
  new BABYLON.Vector3(0, 0, 0),
  scene
);

const light = new BABYLON.DirectionalLight(
  "DirectionalLight",
  new BABYLON.Vector3(-0.5, -1, 0.25),
  scene
);

// This attaches the camera to the canvas
camera.attachControl(canvas, true);

const box = new BABYLON.MeshBuilder.CreateBox(
  "myBox",
  {
    size: 1,
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
