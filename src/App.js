import React, { useState, useEffect } from 'react';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import * as dat from 'dat.gui'
import './App.css';
import Scoring from "./Components/scoring"
import { Vector3 } from 'three';



function App() {
  const [panel, setPanel] = useState(false);

  let energy = 0;
  let panelOn = false;
  // let resizeOn = 1;

  useEffect(() => {
    const canvas = document.querySelector('canvas.webgl');
    // const raycaster = new THREE.Raycaster()
    // Debug
    // const gui = new dat.GUI()

    const keys = { forward: false, boost: false }
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

    const scene = new THREE.Scene()
    scene.background = environmentMapTexture;

    const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);

    //Texture Loader

    const loadingManager = new THREE.LoadingManager()
    const textureLoader = new THREE.TextureLoader(loadingManager)
    const colorTexture = textureLoader.load("/logo.png");
    const alphaTexture = textureLoader.load("/alphamap.png")


    //Model Loader

    // const fbxLoader = new FBXLoader()
    // fbxLoader.load(
    //   'user.fbx',
    //   (gltf) => {
    //     console.log("FBX",gltf)
    //     scene.add(gltf.children[0])
    //   }
    // )

    const gltfLoader = new GLTFLoader()
    let character;
    let ref;
    let comet;
    let cometArr = [];
    let portArr = [];

    gltfLoader.load(
      'comet.gltf',
      (model) => {
        model.scene.scale.set(0.2, 0.2, 0.2)

        for (let i = 0; i < 20; i++) {
          model.scene.name = i;
          model.scene.position.set(((Math.random() - 0.5) * 50), ((Math.random() - 0.5) * 50), ((Math.random() - 0.5) * 50));
          model.scene.rotation.x = Math.random() * Math.PI
          model.scene.rotation.y = Math.random() * Math.PI
          cometArr.push(model.scene);
          scene.add(model.scene.clone())
        }
        generateTargets()
      }
    )

    gltfLoader.load(
      'avatar.gltf',
      (model) => {
        model.scene.position.set(0, 0, 0);
        model.scene.name = "character"
        model.scene.scale.set(0.5, 0.5, 0.5)
        scene.add(model.scene)
        character = scene.getObjectByName("character");
        controls.target = character.position;
      }
    )

    gltfLoader.load(
      'stand.gltf',
      (model) => {
        for (let i = 0; i < 5; i++) {
          for (let x = 0; x < 5; x++) {
            model.scene.name = "ref" + (i * x);
            model.scene.position.set(i * 10, x * 10, i * 10);
            portArr.push(model.scene.clone());
            scene.add(model.scene.clone())
          }
        }

          scene.add(model.scene)
        }
    )


    // environmentMapTexture.MinFilter = THREE.LinearFilter


    /**
  * Sizes
  */

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }


    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
    camera.position.z = 3;
    camera.position.y = 1;
    scene.add(camera)


    //Music

    const listener = new THREE.AudioListener();
    camera.add(listener);

    // create a global audio source
    const soundtrack = new THREE.Audio(listener);
    const boostfx = new THREE.Audio(listener);
    const eating1 = new THREE.Audio(listener);
    const eating2 = new THREE.Audio(listener);
    const eating3 = new THREE.Audio(listener);
    const eating4 = new THREE.Audio(listener);


    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('whispiverse.mp3', function (buffer) {
      soundtrack.setBuffer(buffer);
      soundtrack.setLoop(true);
      soundtrack.setVolume(0.5);
    });

    audioLoader.load('boostfx.mp3', function (buffer) {
      boostfx.setBuffer(buffer);
      boostfx.setVolume(0.2);
    });

    audioLoader.load('./sounds/collect1.mp3', function (buffer) {
      eating1.setBuffer(buffer);
      eating1.setVolume(0.2);
    });

    audioLoader.load('./sounds/collect2.mp3', function (buffer) {
      eating2.setBuffer(buffer);
      eating2.setVolume(0.2);
    });

    audioLoader.load('./sounds/collect3.mp3', function (buffer) {
      eating3.setBuffer(buffer);
      eating3.setVolume(0.2);
    });

    audioLoader.load('./sounds/collect4.mp3', function (buffer) {
      eating4.setBuffer(buffer);
      eating4.setVolume(0.2);
    });

    /**
     * Objects
     */

    // const character = new THREE.Group()

    //Character
    // const character = new THREE.Mesh(
    //   new THREE.SphereGeometry(0.5, 16, 16),
    //   new THREE.MeshBasicMaterial({ color: "light", side: THREE.DoubleSide })
    // )

    // const ref = new THREE.Mesh(
    //   new THREE.SphereGeometry(0.5, 8, 8),
    //   new THREE.MeshBasicMaterial({ color: 'red', })
    // )

    const logo = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 8),
      new THREE.MeshBasicMaterial({ map: colorTexture, transparent: true, })
    )


    logo.position.z = -5
    // logo.position.y = 4

    scene.add(logo, ref);

    // movement - please calibrate these values

    var speed = 8;

    const light = new THREE.AmbientLight(0xffffff, 4);
    scene.add(light);

    const light2 = new THREE.PointLight(0xff0000, 1, 100);
    light2.position.set(1, 1, 1);
    scene.add(light2);

    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
      var keyCode = event.which;
      if (keyCode == 87) {
        //Character position
        keys["forward"] = true
      } else if (keyCode == 16) {
        keys["boost"] = true;
      }
    }

    document.addEventListener("keyup", onDocumentKeyUp, false);
    function onDocumentKeyUp(event) {
      var keyCode = event.which;
      if (keyCode == 87) {
        //Character position
        keys["forward"] = false
      } else if (keyCode == 16) {
        keys["boost"] = false;
      }
    }

    // Controls
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true;
    OrbitControls.enableKeys = false;
    controls.maxDistance = 6;
    controls.minDistance = 6;
    controls.enablePan = false;
    controls.minPolarAngle = 1.8;
    controls.maxPolarAngle = 1.8;
    controls.minAzimuthAngle = 0;
    controls.maxAzimuthAngle = 0;

    //Start Experience

    function startExperience() {
      boostfx.play()
      speed = 30;
      keys.forward = true;

      setTimeout(function () {
        logo.visible = false;
        keys.forward = false;
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI;
        controls.minAzimuthAngle = Infinity;
        controls.maxAzimuthAngle = Infinity;
        scene.add(character);
      }, 6000)
    }

    startExperience()

    //Comets
    const Material = new THREE.MeshMatcapMaterial({ color: 'orange' });
    const sphereGeo = new THREE.SphereGeometry(0.3, 30, 30);


    function eatingSound() {
      let rndSound = Math.ceil(Math.random() * 4)
      switch (rndSound) {
        case 1:
          eating1.play()
          break;
        case 2:
          eating2.play()
          break;
        case 3:
          eating3.play()
          break;
        case 4:
          eating4.play()
          break;
      }
    }


    /**
     * Animate
     */
    const clock = new THREE.Clock()

    //comet target
    let comeTar = [];
    let genCounter = 0;
    let timeRare = 10;

    function generateTargets() {
      cometArr.forEach(function (item, i) {
        let rngTarget = new Vector3((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100);
        comeTar.push(rngTarget);
      })

    }

    const tick = () => {
      const elapsedTime = clock.getElapsedTime()
      genCounter = elapsedTime;

      if (cometArr.length > 0) {
        cometArr.forEach((item, i) => {
          let targ = scene.getObjectByName(i);
          targ.rotation.z += 0.01;
        })
      }

      //Upgradeable
      sizes.width = window.innerWidth;
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)

      // Update controls
      controls.update()

      logo.position.y = 4 + Math.sin(elapsedTime) / 4


      if (keys.forward == true && character) {
        character.position.add(new Vector3().copy(character.position).sub(camera.position).normalize().divide(new Vector3(speed, speed, speed)))
      }

      if (keys.boost == true) {
        speed = 4;
        boostfx.play()
        setTimeout(function () {
          speed = 8;
        }, 4000)
      }
      // console.log("DISTANCE", character.position)


      if (cometArr.length > 0) {
        cometArr.forEach(function (item, i) {
          let cometSui = scene.getObjectByName(i);
          cometSui.position.lerp(comeTar[i], 0.0003)
          if (character && character.position.distanceTo(cometSui.position) < 1) {
            console.log("dssdads", character.position.distanceTo(cometSui.position))
            cometSui.position.set((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100);
            cometSui.rotation.x = Math.random() * Math.PI
            cometSui.rotation.y = Math.random() * Math.PI
            eatingSound();
            console.log("eattt")
            energy = energy + 1;
          }
        })
      }


      if (character && portArr.length > 0) {
        let sw = false;
        portArr.forEach((item) => {
          if (character.position.distanceTo(item.position) < 5) {
            console.log(character.position.distanceTo(item.position));
            setPanel(true);
            sw = true;
          }
        })

        if (sw == false) {
          setPanel(false);
        }
      }



      // console.log("GC", genCounter)

      if (genCounter > timeRare) {
        timeRare = timeRare + 10;
        comeTar = [];
        for (let i = 0; i < 20; i++) {
          let rngTarget = new Vector3((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100);
          comeTar.push(rngTarget);
        }
      }

      // Render
      renderer.render(scene, camera)


      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
    }

    tick()

  }, []);

  // function changeEnergy(){
  //   setEnergy(energy + 1)
  //   console.log("xDdd", energy)
  // }

  return (
    <div id="viewport">
      {panel == true && <div id="menuPanel">
        <img class="logoStyle" src="maylandLogo.png"></img>
        <div class="prInfo">
          <h1>Mayland Labs</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>

          <h2 class="title">Members</h2>

          <div className="roles">
            <div class="card1">
              <h3>Joaquín Quiroga</h3>
              <div class="skills">
                <div class="skill">UX/UI</div>
                <div class="skill">Full Stack</div>
              </div>
            </div>

            <div class="card1">
              <h3>Tomas Garcia </h3>
              <div class="skills">
                <div class="skill">UX/UI</div>
                <div class="skill">Full Stack</div>
              </div>
            </div>

            <div class="card1">
              <h3>Dario Paz</h3>
              <div class="skills">
                <div class="skill">UX/UI</div>
              </div>
            </div>
          </div>

          <h2 class="title">Required</h2>

          <div className="roles">
            <div class="card2">
              <div class="skillHeader">
                <h3>Frontend Developer</h3>
                <div class="skills">
                  <div class="apply">Apply</div>
                </div>
              </div>
              <p class="roleDesc">Lorem ipsum dolor sit amet, consectetur adipiscing. t enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            </div>

            <div class="card2">
              <div class="skillHeader">
                <h3>Unity Developer</h3>
                <div class="skills">
                  <div class="apply">Apply</div>
                </div>

              </div>
              <p class="roleDesc">Lorem ipsum dolor sit amet, consectetur adipiscing. t enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>

            </div>
          </div>
        </div>
      </div>}
      <div class="camera">
        <canvas class="webgl"></canvas>
      </div>
    </div>

  )
}

export default App;