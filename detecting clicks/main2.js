import * as BABYLON from "@babylonjs/core";
import { EvilCubie } from "./EvilCubie";

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

const evilCubie = new EvilCubie(scene, "Mr. Cube");

scene.onPointerUp = function castRay() {
  const hit = scene.pick(scene.pointerX, scene.pointerY);

  if (hit.pickedMesh)
    if (hit.pickedMesh.name === evilCubie.mesh.name) {
      evilCubie.clicked();
    }
};

//render the scene every frame.
engine.runRenderLoop(function () {
  scene.render();
});

//resize the scene when the window is resized.
window.addEventListener("resize", function () {
  engine.resize();
});
