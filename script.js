import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
/* gsap plugins */
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true }); 
let isMobile = false;
let activeBackground = true;
if(ScrollTrigger.isTouch === 1){
    isMobile = true;
    console.log(isMobile);
    //ScrollTrigger.normalizeScroll(true);
    /*window.addEventListener('touchmove', ev => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
      }, { passive: false });*/
}
let mm = gsap.matchMedia(),
  breakPoint = 800;

console.log(isMobile);
//ScrollTrigger.normalizeScroll((true));
//this one solves an issue for resizing a during a pinned scroll trigger
/*ScrollTrigger.normalizeScroll({
    allowNestedScroll: true,
    lockAxis: false,
    momentum: self => Math.min(2, self.velocityY / 1000), // dynamically control the duration of the momentum when flick-scrolling
    type: "touch", // now the page will be drag-scrollable on desktop because "pointer" is in the list
  });*/
// Set up scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(20, window.visualViewport.width / window.visualViewport.height, 1, 2000);
const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.visualViewport.width, window.visualViewport.height);
renderer.setClearColor(0x000000, 1);
renderer.setPixelRatio(window.devicePixelRatio);

const renderer2 = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer2.outputColorSpace = THREE.SRGBColorSpace;

renderer2.setSize(window.visualViewport.width/2, window.visualViewport.height/2);
renderer2.setClearColor(0x000000 , 0);
renderer2.setPixelRatio(window.devicePixelRatio);

/*const renderer3 = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer3.outputColorSpace = THREE.SRGBColorSpace;

renderer3.setSize(window.innerWidth/2, window.innerHeight*0.75);
renderer3.setClearColor(0x000000 , 1);
renderer3.setPixelRatio(window.devicePixelRatio);*/

document.getElementById('container').appendChild(renderer.domElement);
document.getElementById('discs').appendChild(renderer2.domElement);

//document.getElementById('3dPanel').appendChild(renderer3.domElement);

//set up Disc Menu Scene
const discScene = new THREE.Scene();
const discCamera = new THREE.PerspectiveCamera(22, window.visualViewport.width / window.visualViewport.height, 1, 2000);
// Load 3D model
const discLoader = new GLTFLoader();
/*
//set up Text Menus Scene
const textScene = new THREE.Scene();
const textCamera = new THREE.PerspectiveCamera(20, (window.innerWidth/2) / (window.innerHeight*0.75), 1, 2000);
// Load 3D model
const textLoader = new GLTFLoader();

//adding 3d panel for text info on selected disc
const geometry = new THREE.BoxGeometry( (window.innerWidth/2)-100, (window.innerHeight*0.75), 100 ); 
const material = new THREE.MeshBasicMaterial( {color: 0x3366ff} ); 
const cube = new THREE.Mesh( geometry, material ); 
const edges = new THREE.EdgesGeometry( geometry ); 
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) ); 
textScene.add( line );
textScene.add( cube );
line.rotation.y = 75;
cube.rotation.y = 75;

cube.position.set(0,0,0);
line.position.set(0,0,0);
*/
/*discLoader.load('FF73DDisc.glb', function (gltf) {
    const mesh = gltf.scene;
    //mesh.position.set(-0.125,1.45,3.5)
    mesh.position.set(0,0,90);
    mesh.rotation.x = 90;
    mesh.rotation.y = 3.1;
    discScene.add(mesh);
});

discLoader.load('FF73DDisc.glb', function (gltf) {
    const mesh2 = gltf.scene;
    //mesh.position.set(-0.125,1.45,3.5)
    mesh2.position.set(5,0,90);
    mesh2.rotation.x = 90;
    mesh2.rotation.y = 3.1;
    discScene.add(mesh2);
});

discLoader.load('FF73DDisc.glb', function (gltf) {
    const mesh2 = gltf.scene;
    //mesh.position.set(-0.125,1.45,3.5)
    mesh2.position.set(10,0,90);
    mesh2.rotation.x = 90;
    mesh2.rotation.y = 3.1;
    discScene.add(mesh2);
});
*/

//boolean 0/1 to determine if mouse event is valid
let moveAble  = 1; 

// Load 3D model
const loader = new GLTFLoader();
loader.load('PS1Logo3D.glb', function (gltf) {
    const mesh = gltf.scene;
    //mesh.position.set(-0.125,1.45,3.5)
    mesh.position.set(0.8,1.85,0)
    mesh.rotation.x = 0.25;
    mesh.rotation.y = -0.75;
    scene.add(mesh);
});

// Load 2nd 3D model
const loader2 = new GLTFLoader();
var ps1Mesh;
var ps1Spin = false;
loader2.load('playstation_1.glb', function (gltf) {
    ps1Mesh = gltf.scene;
    //mesh.position.set(-0.125,1.45,3.5)
    ps1Mesh.position.set(10,25.55,-80)
    ps1Mesh.rotation.x = -75;
    ps1Mesh.rotation.y = 0;
    scene.add(ps1Mesh);
});
/*
// Create a canvas to capture the iframe content
const videoCanvas = document.createElement('canvas');
const videoContext = videoCanvas.getContext('2d');
videoCanvas.width = 1280;
videoCanvas.height = 720;

// Create a texture from the canvas
const videoTexture = new THREE.Texture(videoCanvas);
videoTexture.minFilter = THREE.LinearFilter;

// Create a basic material with the video texture
const material = new THREE.MeshBasicMaterial({ map: videoTexture });

// Create a plane geometry
const geometry = new THREE.PlaneGeometry(16, 9);

// Create a mesh with the geometry and material
const mesh3 = new THREE.Mesh(geometry, material);
scene.add(mesh3);
*/
const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 9;
controls.maxDistance = 10;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target.set(1,3.05,0)
//controls.target = new THREE.Vector3(0,1.25,0);

// Set up lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

const ambientLight2 = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight2.position.set(0, 1, 0);
discScene.add(ambientLight2);
discScene.add(directionalLight2);
/*
const ambientLight3 = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight3.position.set(0, 1, 0);
textScene.add(ambientLight3);
textScene.add(directionalLight3);
*/
// Set up camera
camera.position.z = 100;
camera.position.y = 0;
camera.position.x = 0;

discCamera.position.set(0,0,100);

//textCamera.position.set(0,10,2000);
// Add mouse move event listener
document.addEventListener('mousemove', onMouseMove, false);

// Mouse movement variables
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2.5;
let windowHalfY = window.innerHeight / 2.5;

// Function to handle mouse movement
function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 200;
    mouseY = (event.clientY - windowHalfY) / 50;


}

/**
 * Sizes
 */
const sizes = {
    width: window.visualViewport.width,
    height: window.visualViewport.height
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.visualViewport.width;
    sizes.height = window.visualViewport.height;

    windowHalfX = window.visualViewport.width / 2.5;
    windowHalfY = window.visualViewport.height / 2.5;
    
    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    discCamera.aspect = sizes.width / sizes.height;
    discCamera.updateProjectionMatrix();

    // Update renderer
    renderer2.setSize(sizes.width/2, sizes.height/2);
    renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    console.log("hi");
    ScrollTrigger.refresh();
    //textCamera.aspect = (sizes.width/2) / (sizes.height*0.75);
    //textCamera.updateProjectionMatrix();
    // Update renderer
    //renderer3.setSize(sizes.width/2, sizes.height*0.75);
    //renderer3.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

let bobble = true;
// Add animation loop
function animate() {
    if(activeBackground){
        controls.update()
        requestAnimationFrame(animate);
        
        // Update camera position based on mouse movement
        camera.position.x += moveAble*(mouseX - camera.position.x) * 0.02;
        camera.position.y += (-mouseY - camera.position.y) * 0.02;


        // Update camera position based on mouse movement
        //textCamera.position.x += (mouseX - textCamera.position.x) * 1;
        //textCamera.position.y += (-mouseY - textCamera.position.y) * 1;

        if (bobble == true){
            discCamera.position.y += 0.003;
            if (discCamera.position.y >= 0.1){
                bobble = false;
            }
        }
        else{
            discCamera.position.y -= 0.003;
            if (discCamera.position.y <= -0.1){
                bobble = true;
            }
        }


        renderer.render(scene, camera);
        renderer2.render(discScene, discCamera);
        //renderer3.render(textScene, textCamera);
    }
    // Capture the iframe content and update the texture
    //videoContext.drawImage(videoIframe.contentWindow.document.body, 0, 0, videoCanvas.width, videoCanvas.height);
    //videoTexture.needsUpdate = true;
}

document.getElementById("playB1").onclick = function(){playTransition()};
function playTransition(){
    //const t1 = gsap.timeline()
    //t1.to(controls.target.set(1,50,0),{duration: 2})
    controls.enabled = false;
		
    gsap.to( controls.target, {
        duration: 3,
        y: 30,
        onUpdate: function() {
            
            controls.update();
        
        },
        onComplete: function() {
        
            //controls.enabled = true;
        
        }
    } );
    const content = CSSRulePlugin.getRule('.content:before')
    const h1 = document.querySelector('h1')
    const p = document.querySelector('p')
    const pb = document.querySelector(".playButton")
    const t1  = gsap.timeline()

    t1.to(content, {delay: 0.5, duration: 2, cssRule: {scaleX: 0}})
    t1.to(h1, {duration: 2, opacity: 0}, "-=2");
    t1.to(p, {duration: 2, opacity: 0}, "-=2");
    t1.to(pb, {duration: 2, bottom: '-40%'}, "-=2");
    t1.to(".playButton2", {duration: 2, bottom: '2%'}, "-=1.5");
    
    camera.position.x = 0;
    camera.position.y = 0;
    moveAble = 0;
}
document.getElementById("playB2").onclick = function(){discPreview()};
function discPreview(){
    //const t1 = gsap.timeline()
    //t1.to(controls.target.set(1,50,0),{duration: 2})
    controls.enabled = false;
		
    gsap.to( controls.target, {
        duration: 3,
        x: 2.5,
        onUpdate: function() {
            
            controls.update();
        
        },
        onComplete: function() {
        
            //controls.enabled = true;
        
        }
    } );
    const t1  = gsap.timeline()


    t1.to(".playButton2", {duration: 2, bottom: '-40%'});
    t1.to(".discMenu", {duration: 2, left: '50%'}, "-=2");
    gsap.to(ps1Mesh.rotation, { duration: 2, x: ps1Mesh.rotation.x + Math.PI * 2, y: ps1Mesh.rotation.y + Math.PI * 2, ease: "power1.inOut" });
    //document.getElementById("discExitMenu").onclick = function(){exitDiscMenu()};

}
document.getElementById("discExitMenu").onclick = function(){exitDiscMenu()};
function exitDiscMenu(){
    console.log(jsonData['discs']);
    controls.enabled = false;
		
    gsap.to( controls.target, {
        duration: 3,
        x: 1,
        onUpdate: function() {
            
            controls.update();
        
        },
        onComplete: function() {
        
            //controls.enabled = true;
        
        }
    } );
    const t1  = gsap.timeline()


    t1.to(".playButton2", {duration: 2, bottom: '2%'});
    t1.to(".discMenu", {duration: 2, left: '350%'}, "-=2");

}
document.getElementById("nd").onclick = function(){switchDisc(1)};
document.getElementById("pd").onclick = function(){switchDisc(-1)};
function switchDisc(change){
    console.log(jsonData['discs']);
    currJsonDisc = (currJsonDisc + change)%jsonData['discs'].length;
    if (currJsonDisc < 0){
        currJsonDisc = jsonData['discs'].length + currJsonDisc; 
    }
        
		
    gsap.to( discCamera.position, {
        duration: 3,
        x: currJsonDisc*5,
    } );
    gsap.to(document.getElementById("discName"),{
        duration: 1,
        text: jsonData['discs'][currJsonDisc]['name'],
        ease: "none",
    })
    gsap.to(document.getElementById("discPara"),{
        duration: 0.5,
        text: jsonData['discs'][currJsonDisc]['description'],
        ease: "none",
    })
    gsap.to(".discMenu",{
        duration: 1,
        css:{
            "--backGroundColor": jsonData['discs'][currJsonDisc]['color']
        }
        })
    //const t1  = gsap.timeline()


    //t1.to(".playButton2", {duration: 2, bottom: '2%'});
    //t1.to(".discMenu", {duration: 2, left: '350%'}, "-=2");

}
let jsonData;
let currJsonDisc = 0;

document.getElementById("startDisc").onclick = function(){playDisc(currJsonDisc)};
function playDisc(currDisc){
    //console.log(jsonData['discs']);
    const loadingText = document.getElementById("loadText").innerHTML = "loading Disc...<br>" + jsonData['discs'][currDisc]['name'];
    //exit disc menua and update text indicating which disc is loading up
    exitDiscMenu();
    
    const iframe = document.getElementById('video-iframe');
    
    // Change the video src after fading out
    iframe.src = jsonData['discs'][currDisc]['video']; 
    const container = document.getElementById('discContent');
    const trackDiv = document.createElement('div');
    trackDiv.classList.add("myTracks");
    trackDiv.classList.add("aboutPanel");
    if(jsonData['discs'][currDisc]['music'].length > 1){
        trackDiv.style.gridTemplateColumns = 'repeat(auto-fill, 400px)';
    }

    //insert soundcloud iframes for music data
    const musicLabel = document.createElement('label');
    musicLabel.innerHTML = "Music - OST";
    trackDiv.appendChild(musicLabel);
    for(let track in jsonData['discs'][currDisc]['music']){
        // Create a div to hold each track
        console.log(track)
        const newTrack = document.createElement('div');
        newTrack.innerHTML = jsonData['discs'][currDisc]['music'][track];
        trackDiv.appendChild(newTrack);
    }
    
    container.appendChild(trackDiv);

    const t2 = gsap.timeline()
    t2.to( controls.target, {
        duration: 1,
        y: 150,
        onUpdate: function() {
            
            //controls.update();
        
        },
        onComplete: function() {
            activeBackground = false;
            controls.enabled = false;
        
        }
    } );

    gsap.to(".playButton2", {duration: 2, bottom: '-40%'});
    
    t2.to(document.getElementById("loadText"),{
        duration: 1,
        opacity: 1,
        onComplete: function() {  
            
            const photos = gsap.utils.toArray(".photo");
            const chars  = [];
            const charTag = document.getElementById("characterTag");

            //load in images related to the ps1 game
            if(jsonData['discs'][currDisc]['images']){
                for(let p = 0; p < photos.length; p++){
                    photos[p].lastElementChild.src = jsonData['discs'][currDisc]['images'][p];
                }
            }
            if(jsonData['discs'][currDisc]['characters']){
                const charPanel = document.getElementById("charPhotos");
                for(const [key, value] of Object.entries(jsonData['discs'][currDisc]['characters'])){
                    let charDiv = document.createElement('img');
                    charDiv.classList.add("myChar");
                    chars.push(charDiv);
                    charDiv.style.position = "absolute";
                    charDiv.style.width = "max(40vw,40vw)";
                    charDiv.src = jsonData['discs'][currDisc]['characters'][key];
                    charPanel.appendChild(charDiv);
                }
            }
            let charDiv = document.createElement('img');
            chars.push(charDiv);

            //load in text for about section
            if(jsonData['discs'][currDisc]['about']){
                const aboutPanel = document.getElementById("aPanel1");
                let newInfo = document.createElement('h3');
                for (const [key, value] of Object.entries(jsonData['discs'][currDisc]['about'])) {
                    console.log(`${key}: ${value}`);
                    newInfo.innerHTML += `<b>${key}:</b> ${value}<br>`;
                    aboutPanel.appendChild(newInfo);
                  }
            }
            //load in text for review section
            if(jsonData['discs'][currDisc]['reviews']){
                const aboutPanel = document.getElementById("aPanel2");
                let newInfo = document.createElement('h3');
                for (const [key, value] of Object.entries(jsonData['discs'][currDisc]['reviews'])) {
                    console.log(`${key}: ${value}`);
                    if(value === parseFloat(value)){
                        let starGrade = value*10;
                        let starBlank = 100-starGrade;
                        newInfo.innerHTML += `<b>${key}:</b> <span style="margin:auto; display: inline-block; background: linear-gradient(to right, orange ${starGrade}%, black ${starGrade}% 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">&starf;&starf;&starf;&starf;&starf;</span> ${value}/10<br>`;
                    }
                    else{
                        newInfo.innerHTML += `<b>${key}:</b> ${value}<br><br>`;
                    }
                    aboutPanel.appendChild(newInfo);
                    }
            }

            console.log(photos);
            const aPhotos = photos.slice(1);
            gsap.set(aPhotos, {yPercent:0, xPercent:-105})
            gsap.set(chars, {yPercent: -50, xPercent:0})
            let charKeys = Object.keys(jsonData['discs'][currDisc]['characters']);
            let currProg = -1;
            let mobileProg = -1;

            mm.add("(max-width: 768px)",() => {
                let animation = gsap.to(aPhotos,{
                    yPercent:0, xPercent:0, duration:1, stagger:3, delay: 1, yoyo: true, repeatDelay: 2, repeat: -1
                });
                
                
                let animation2 = gsap.to(chars,{
                    xPercent:-50, 
                    duration:1, 
                    scrollTrigger:{
                        scroller: ".dContain",
                        trigger:".cPhotos",
                        start: "top 50%",
                        end: "90% 50%",
                        toggleActions: "play pause play pause",
                        markers: true
                    },
                    onRepeat:function(){
                        gsap.to(".cPhotos", {
                            duration: 0.5,
                            backgroundColor: "rgb(151, 0, 0)"
                        });
                        gsap.to(".cPhotos", {
                            delay:0.5,
                            duration: 1,
                            backgroundColor: "rgba(0, 255, 221, 0.178)"
                        });
                        
                    },
                    stagger:{
                        each: 5,
                        onComplete: function(i,target,targets){
                            let currentElement = this.targets()[0];

                            // Find the index of this element in the targets array
                            let index = chars.indexOf(currentElement);
                            gsap.to(document.getElementById("characterTag"),{
                                duration: 0.5,
                                text: charKeys[index],
                                ease: "none",
                            });
                        }
                    }, delay: 1, repeat: -1
                });
                ScrollTrigger.refresh();
            });



            mm.add("(min-width: 769px)", () =>{
                let animation = gsap.to(aPhotos,{
                    yPercent:0, xPercent:0, duration:1, stagger:3, delay: 0
                })
                let animation2 = gsap.to(chars,{
                    xPercent:-50, duration:1, stagger:3
                })
                ScrollTrigger.create({
                    scroller: ".dContain",
                    trigger:".discAbout",
                    start: "top 20%",
                    //end:()=> "+=" + document.getElementById('container-disc').offsetHeight,
                    end: "75% 20%", 
                    pin: ".photos",
                    animation:animation,
                    scrub:true,
                    //markers: true,
                    anticipatePin: 5,
                    pinSpacing: true,
                    pinType: "transform",
                    fastScrollEnd: true, // This improves scroll end detection speed on touch devices
                    ignoreMobileResize: false,
                    invalidateOnRefresh: true

                    

                });

                //scrollTrigger for character info
                ScrollTrigger.create({
                    scroller: ".dContain",
                    trigger:".cPhotos",
                    toggleActions: "play none reverse none",
                    //onEnter:()=> gsap.to(".charPanel", {duration: 1, top:"0%"}),
                    //onLeave:()=> gsap.to(".charPanel", {duration: 1, top: "-0%"}),
                    //onEnterBack:()=> gsap.to(".charPanel", {duration: 1, top:"0%"}),
                    //onLeaveBack:()=> gsap.to(".charPanel", {duration: 1, top: "0%"}),
                    //end:()=> "+=" + document.getElementById('container-disc').offsetHeight,
                    end: "bottom+=5000px 0%", 
                    //onEnter:()=> console.log("enter"),
                    //onLeave:()=> console.log("leave"),
                    onUpdate: (self) => {
                        //console.log(self.progress);
                        gsap.to("progress",{
                        duration: 0.1, 
                        value: self.progress*100
                        });
                        //modulo of self.progress by 25% to get a animation
                        //trigger for each image with a text change
                        let charProg = Math.max(0,Math.floor((self.progress*100-10) / 30));
                        if(charProg != currProg && charProg < 4){
                            gsap.to(document.getElementById("characterTag"),{
                                duration: 0.5,
                                text: charKeys[charProg],
                                ease: "none",
                            });
                            currProg = charProg;
                        }


                    },
                    //markers: true,
                    pin: ".charPanel",
                    animation: animation2,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    immediateRender:false,
                    ignoreMobileResize: false,
                    anticipatePin: 5,
                    fastScrollEnd: true, // This improves scroll end detection speed on touch devices
                    pinSpacing: true,
                    pinType: "transform"
                }
                );
            });
            


            // Refresh ScrollTrigger after scroller initialization
            /*ScrollTrigger.normalizeScroll({
                allowNestedScroll: true,
                lockAxis: false,
                momentum: self => Math.min(2, self.velocityY / 1000), // dynamically control the duration of the momentum when flick-scrolling
                type: "touch", // now the page will be drag-scrollable on desktop because "pointer" is in the list
            });*/
            ScrollTrigger.refresh();

            

        }
    });
    t2.to(document.getElementById("loadText"),{
        duration: 2,
        opacity: 0,
    });
    t2.to(".canScroll", {duration: 1, opacity: '1',
        onComplete: function(){
            const dc = document.getElementById('discContent');
            document.getElementById("container-disc").style.pointerEvents = "auto";
            document.getElementById("container-disc").style.touchAction = "auto";
            document.getElementById("container-disc").style.overflowY = "auto";
            
        }
    });
    // Fade in the new video
    t2.to(iframe, {delay:1, duration: 3, opacity: 1,
        onComplete: function(){
            const element = document.getElementById("container");
            element.remove();
        }

    });


}



//gsap anim for scroll trigger of scrollable disc page (when disc is picked)
gsap.fromTo(".canScroll",{opacity:1},{
    scrollTrigger:{
        scroller: ".dContain",
        trigger:".canScroll",
        toggleActions: "play none reverse none",
        //onEnter:()=> gsap.to(iframe, {duration: 2, opacity: 0.3}),
        //onLeave:()=> gsap.to(iframe, {duration: 2, opacity: 1}),
        start: "90% 85%",
        //end:()=> "+=" + document.getElementById('container-disc').offsetHeight,
        end: "90% 85%", 
        //onEnter:()=> console.log("enter"),
        //onLeave:()=> console.log("leave"),
        //markers: true
    },
    opacity: 0,
    duration: 1
});
gsap.to(".canScroll",{duration: 0.1, opacity:0});

//const photos = gsap.utils.toArray(".des")
const discName = document.getElementById("discName");
var discCount = 0;
fetch('discList.json')
  .then(response => response.json())
  .then(async data => {
    jsonData = data;
    
    // Load models in order using async/await
    for (let disc of jsonData['discs']) {
      await loadDiscModel(disc, discCount);
      discCount += 1;
    }

    console.log(jsonData['discs']);  // Now jsonData holds the JSON data
    discInfoUpdate(jsonData['discs'][0]);
  })
  .catch(error => console.error('Error fetching the JSON file:', error));

// Helper function to load disc model as a promise
function loadDiscModel(disc, count) {
  return new Promise((resolve, reject) => {
    discLoader.load(disc['model'], function (gltf) {
      let mesh = gltf.scene;
      // Set position and rotation
      mesh.position.set(count * 5, 0, 93);
      mesh.rotation.x = 90;
      mesh.rotation.y = 3.1;
      discScene.add(mesh);
      
      resolve(); // Resolve the promise after the model is loaded
    }, undefined, function (error) {
      reject(error); // Handle error while loading
    });
  });
}


function discInfoUpdate(discData){
    document.getElementById("discName").innerHTML = discData['name'];
    document.getElementById("discPara").innerHTML = discData['description'];
    document.getElementById("discPara").innerHTML = discData['description'];
    gsap.to(".discMenu",{
        duration: 1,
        css:{
            "--backGroundColor": discData['color']
        }
        });
}



// Function to change the video source
function changeVideoSource(newVideoId) {
    const iframeSrc = `https://www.youtube.com/embed/${newVideoId}?autoplay=1&mute=1&enablejsapi=1`;
    videoIframe.src = iframeSrc;
}

animate();
