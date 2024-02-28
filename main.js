import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import { gsap } from 'gsap';
import './style.css'

//scene
const scene = new THREE.Scene();

//Sphere radius and segments
const geometry = new THREE.SphereGeometry(3,64, 64)

//material to add texture
const material = new THREE.MeshStandardMaterial({
  color: '#e77d11',
  roughness: 0.9

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
renderer.setPixelRatio(2)
//render scene and camera
renderer.render(scene, camera)

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5


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
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop() 



//timeline animation (multiple animation)
const timeline = gsap.timeline({defaults: {duration: 1}})
//scale in
timeline.fromTo(mesh.scale, {z:0, x:0, y:0},{z:1, x:1, y:1})

//animate navigation from top
timeline.fromTo("nav", {y:"-100%"},{y: "0%"})
//animate title, by opacity change
timeline.fromTo('.heading',{opacity: 0}, {opacity: 1}) 

//mouse animation color on drag
let mousedown = false
let rgb = []

window.addEventListener('mousedown', function(){
  mousedown = true
})
window.addEventListener('mouseup',function(){
  mousedown = false
})

//color magic
window.addEventListener('mousemove', function(e){
  if(mousedown){
    rgb = [
      Math.round((e.pageX / sizes.width * 255)),
      Math.round((e.pageY / sizes.height * 255)),
      150, //depth
    ]
    //animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    // new THREE.Color('rgb(0,100,150')
    gsap.to(mesh.material.color,
      {r: newColor.r, g:newColor.g, b:newColor.b})
  }
})
