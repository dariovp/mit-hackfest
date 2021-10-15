import React, { useState, useEffect } from 'react';
// import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three'
import * as dat from 'dat.gui'
import './App.css';


function App() {
  useEffect(() => {
    console.log("executed");
    const canvas = document.querySelector('canvas.webgl');

    // Debug
    const gui = new dat.GUI()

    // Scene

    const cubeTextureLoader = new THREE.CubeTextureLoader()

    const environmentMapTexture = cubeTextureLoader.load([
      '/environment/px.png',
      '/environment/nx.png',
      '/environment/py.png',
      '/environment/ny.png',
      '/environment/pz.png',
      '/environment/nz.png'
    ])


    // environmentMapTexture.MinFilter = THREE.LinearFilter
    const scene = new THREE.Scene()

    scene.background = environmentMapTexture;

    /**
     * Objects
     */
    const character = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 16),
      new THREE.MeshBasicMaterial({ color: 'white' })
    )

    const ref = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 8, 8),
      new THREE.MeshBasicMaterial({ color: 'red' })
    )


    scene.add(character, ref);

    // movement - please calibrate these values
    var xSpeed = 0.1;
    var ySpeed = 0.1;

    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
      var keyCode = event.which;

      console.log(keyCode)

      if (keyCode == 87) {
        character.position.z -= ySpeed;
        camera.position.z -= ySpeed;
      } else if (keyCode == 83) {
        character.position.z += ySpeed;
        camera.position.z += ySpeed;
      } else if (keyCode == 65) {
        character.position.x -= xSpeed;
        camera.position.x -= xSpeed;
      } else if (keyCode == 68) {
        character.position.x += xSpeed;
        camera.position.x += xSpeed;
      } else if (keyCode == 32) {
        character.position.set(0, 0, 0);
      }
    };

    gui.add(character.position, "x", -3, 3, 0.01);
    gui.add(character.position, "y", -3, 3, 0.01);
    gui.add(character.position, "z", -3, 3, 0.01);


    /**
* Sizes
*/
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.z = 3;
    camera.position.y = 1;
    scene.add(camera)

    // Controls
    // const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true;
    // OrbitControls.enableKeys = true;

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    /**
     * Animate
     */
    const clock = new THREE.Clock()

    const tick = () => {
      const elapsedTime = clock.getElapsedTime()

      // Update controls
      // controls.update()

      // Render
      renderer.render(scene, camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
    }

    tick()
  }, []);

  return (

    <div>
      <canvas class="webgl"></canvas>
    </div>

  );
}

export default App;