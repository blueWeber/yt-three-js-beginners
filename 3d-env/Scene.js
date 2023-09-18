import * as THREE from 'three';

export default class Scene {
  constructor(useAxesHelper = false) {
    this.scene = new THREE.Scene();

    if (useAxesHelper) {
      // AxesHelper
      const axesHelper = new THREE.AxesHelper(1.5);
      this.scene.add(axesHelper);
    }

    return this.scene;
  }
}
