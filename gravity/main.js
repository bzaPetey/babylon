import * as BABYLON from "@babylonjs/core";

const canvas = document.getElementById("renderCanvas");

const engine = new BABYLON.WebGPUEngine(canvas);
await engine.initAsync();

const createScene = async function () {
  // This creates a basic Babylon Scene object (non-mesh)
  const scene = new BABYLON.Scene(engine);

  // This creates and positions a free camera (non-mesh)
  const camera = new BABYLON.FreeCamera(
    "camera1",
    new BABYLON.Vector3(0, 5, -10),
    scene
  );

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  //create and position the box
  const box = new BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);
  box.position.y = 4;

  const sphere = BABYLON.MeshBuilder.CreateSphere(
    "sphere1",
    { diameter: 1 },
    scene
  );
  sphere.position.y = 4;
  sphere.position.x = -2;

  const sphere2 = BABYLON.MeshBuilder.CreateSphere(
    "sphere2",
    { diameter: 2 },
    scene
  );
  sphere2.position.y = 4;
  sphere2.position.x = 2;

  // Our built-in 'ground' shape.
  const ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 10, height: 10 },
    scene
  );

  // initialize plugin
  const havokInstance = await HavokPhysics();
  // DEFAULT VALUES FOLLOW
  // pass the engine to the plugin
  const hk = new BABYLON.HavokPlugin(true, havokInstance);
  // enable physics in the scene with a gravity
  scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), hk);

  const boxAggregate = new BABYLON.PhysicsAggregate(
    box,
    BABYLON.PhysicsShapeType.BOX,
    { mass: 1, restitution: 0.75 },
    scene
  );

  const sphereAggregate = new BABYLON.PhysicsAggregate(
    sphere,
    BABYLON.PhysicsShapeType.SPHERE,
    { mass: 1, restitution: 0.75 },
    scene
  );
  const sphereAggregate2 = new BABYLON.PhysicsAggregate(
    sphere2,
    BABYLON.PhysicsShapeType.SPHERE,
    { mass: 2, restitution: 0.75 },
    scene
  );

  // Create a static box shape.
  const groundAggregate = new BABYLON.PhysicsAggregate(
    ground,
    BABYLON.PhysicsShapeType.BOX,
    { mass: 0 },
    scene
  );

  return scene;
};

createScene().then((scene) => {
  engine.runRenderLoop(function () {
    if (scene) {
      scene.render();
    }
  });
});
// Resize
window.addEventListener("resize", function () {
  engine.resize();
});
