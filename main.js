import * as THREE from 'three';

import './style.css'

//scene
const scene = new THREE.Scene();

//Sphere radius and segments
const geometry = new THREE.SphereGeometry(3,64, 64)

//material to add texture
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83',

})

//geometry and material
const mesh = new THREE.Mesh(geometry, material)

//add to scene
scene.add(mesh)


//screen sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
//add light
const light = new THREE.PointLight(0xffffff, 70, 100, 1.7)
//x y z position
light.position.set(0, 10, 10)
scene.add(light)

//camera 
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
//change camera position
camera.position.z = 10
//add it to scene
scene.add(camera)

//get canvas
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas})
//
renderer.setSize(sizes.width, sizes.height)
//render scene and camera
renderer.render(scene, camera)



//resizing window 

window.addEventListener('resize', function(){
  //update size
  sizes.height = window.innerHeight
  sizes.width = window.innerWidth

  //update the camera to maitain shape
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

//re
const loop = () => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()