import { StandardMaterial, Color3, MeshBuilder } from "@babylonjs/core";

export class EvilCubie {
  constructor(scene, name) {
    console.log("Creating: " + name);
    this.name = name;
    this.scene = scene;
    this.mesh = this.createMesh();

    this.material = new StandardMaterial(this.name + "Mat", this.scene);
    this.material.diffuseColor = new Color3(1, 0, 0);
    this.mesh.material = this.material;
  }

  createMesh() {
    console.log("Creating mesh for: " + this.name);
    let mesh = new MeshBuilder.CreateBox(this.name, { size: 0.1 }, this.scene);

    return mesh;
  }

  clicked() {
    console.log(this.name + " was just clicked.");
    this.material.diffuseColor = new Color3(
      Math.random(),
      Math.random(),
      Math.random()
    );
  }
}
