import * as BABYLON from "@babylonjs/core";

const canvas = document.getElementById("renderCanvas");

//const engine = new BABYLON.Engine(canvas);
const engine = new BABYLON.WebGPUEngine(canvas);
await engine.initAsync();

const createScene = function () {
  const scene = new BABYLON.Scene(engine, true);

  // Parameters : name, position, scene
  const camera = new BABYLON.UniversalCamera(
    "UniversalCamera",
    new BABYLON.Vector3(1, 1, -5),
    scene
  );

  const light = new BABYLON.DirectionalLight(
    "DirectionalLight",
    new BABYLON.Vector3(-0.5, -1, 0.25),
    scene
  );

  // Targets the camera to a particular position. In this case the scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // Attach the camera to the canvas
  camera.attachControl(canvas, true);

  const box = new BABYLON.MeshBuilder.CreateBox(
    "myBox",
    {
      size: 1,
    },
    scene
  );

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
