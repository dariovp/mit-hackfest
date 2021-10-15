import React, { useState, useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three'

function Viewport() {
    useEffect(() => {
        console.log("executed");
        const canvas = document.querySelector('canvas.webgl');

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

        console.log(environmentMapTexture)

        const scene = new THREE.Scene()

        scene.background  = environmentMapTexture;

        /**
         * Objects
         */
        const character = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 16, 16),
            new THREE.MeshBasicMaterial({ color: 'white' })
        )

        scene.add(character)

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
        camera.position.z = 3
        scene.add(camera)

        // Controls
        const controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true

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
            controls.update()

            // Render
            renderer.render(scene, camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        tick()


    }, []);
    return (
        <div>
            <h1>A new star is born.</h1>
            <canvas class="webgl"></canvas>
        </div>

    );
}

export default Viewport;