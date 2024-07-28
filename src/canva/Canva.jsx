// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { useSnapshot } from 'valtio';
// import state from '../store';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// const Canva = () => {
//   const snapForState = useSnapshot(state);
//   const canvasRef = useRef(null);
//   const shirtMaterialRef = useRef(null);
//   const textureRef = useRef(null);

//   useEffect(() => {
//     // Setup scene, camera, and renderer
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     canvasRef.current.appendChild(renderer.domElement);

//     // Importing Model and using it
//     const loader = new GLTFLoader();

//     loader.load('/shirt_baked.glb', function (gltf) {
//       const shirt = gltf.scene;

//       // Textures
//       const textureLoader = new THREE.TextureLoader();

//       shirt.traverse((model) => {
//         if (model.isMesh) {
//           model.castShadow = true; // Enable shadows for the mesh
//           shirtMaterialRef.current = new THREE.MeshStandardMaterial({
//             color: snapForState.color,
//             emissiveIntensity: 3,
//           });
//           model.material = shirtMaterialRef.current;

//           textureRef.current = textureLoader.load(snapForState.logoDecal);
//           // Set texture properties
//           textureRef.current.wrapS = THREE.RepeatWrapping;
//           textureRef.current.wrapT = THREE.RepeatWrapping;
//           const scale = state.count; // Adjust this value to reduce the texture size
//           textureRef.current.repeat.set(scale, -scale); // Scale the texture to appear smaller
//           textureRef.current.offset.set((1 - scale) / 2, (1 - scale) / 2); // Center the texture
//           model.material.map = textureRef.current; // Texture Added
//           model.material.opacity = 1; // Adjust opacity if needed
//           model.material.needsUpdate = true; // Ensure the material updates
//         }
//       });

//       // Adding model to scene
//       scene.add(shirt);
//     }, undefined, function (error) {
//       console.error(error);
//     });

//     // Position the camera
//     camera.position.z = 0.7;

//     // Lighting
//     const ambience = new THREE.AmbientLight(0xffffff);
//     ambience.intensity = 2;
//     scene.add(ambience);

//     // Controls
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.3;
//     controls.enableZoom = false;
//     controls.maxPolarAngle = Math.PI / 2; // Lock vertical rotation to 90 degrees
//     controls.minPolarAngle = Math.PI / 2; // Lock vertical rotation to 90 degrees
//     // controls.minAzimuthAngle = -Math.PI / 8;
//     // controls.maxAzimuthAngle = Math.PI / 8;

//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//       controls.update();
//     };
//     animate();

//     // Handle window resize
//     const onWindowResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener('resize', onWindowResize);

//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', onWindowResize);
//       canvasRef.current.removeChild(renderer.domElement);
//     };
//   }, []);

//   // Update material color when state.color changes
//   useEffect(() => {
//     if (shirtMaterialRef.current) {
//       shirtMaterialRef.current.color.set(snapForState.color);
//     }
//   }, [snapForState.color]);

//   // Update texture when state.logoDecal changes
//   useEffect(() => {
//     if (textureRef.current) {
//       const newTexture = new THREE.TextureLoader().load(snapForState.logoDecal);
//       textureRef.current.dispose();
//       textureRef.current = newTexture;
//       shirtMaterialRef.current.map = newTexture;
//       shirtMaterialRef.current.needsUpdate = true;
//     }
//   }, [snapForState.logoDecal]);

//   return <div ref={canvasRef} />;
// };

// export default Canva;






import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useSnapshot } from 'valtio';
import state from '../store';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Canva = () => {
  const snap = useSnapshot(state);
  const canvasRef = useRef(null);
  const shirtMaterialRef = useRef(null);
  const decalMeshRef = useRef(null);

  useEffect(() => {
    // Setup scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // Load the GLTF model
    const loader = new GLTFLoader();
    loader.load('/shirt_baked.glb', (gltf) => {
      const shirt = gltf.scene;
      const material = shirt.children[0].material;
      material.roughness = 1;
      shirt.castShadow = true;
      shirtMaterialRef.current = material;

      // Initial texture and material setup
      const textureLoader = new THREE.TextureLoader();
      const logoTexture = textureLoader.load(snap.logoDecal, (texture) => {
        texture.anisotropy = 16;
        const logoMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          depthWrite: true,
          transparent: true
        });

        const decalMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.15), logoMaterial);
        decalMesh.position.set(0, 0.04, 0.137);
        scene.add(decalMesh);
        decalMeshRef.current = decalMesh;
      });

      scene.add(shirt);

      // Update material color
      material.color.set(snap.color);
    }, undefined, (error) => {
      console.error(error);
    });

    // Position the camera
    camera.position.z = 0.7;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.3;
    controls.enableZoom = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 2;
    controls.minAzimuthAngle = -Math.PI / 8;
    controls.maxAzimuthAngle = Math.PI / 8;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();
    };
    animate();

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update material color when state.color changes
  useEffect(() => {
    if (shirtMaterialRef.current) {
      shirtMaterialRef.current.color.set(snap.color);
    }
  }, [snap.color]);

  // Update decal texture when state.logoDecal changes
  useEffect(() => {
    if (decalMeshRef.current) {
      const newTexture = new THREE.TextureLoader().load(snap.logoDecal, (texture) => {
        texture.anisotropy = 16;
        decalMeshRef.current.material.map.dispose();
        decalMeshRef.current.material.map = texture;
        decalMeshRef.current.material.needsUpdate = true;
      });
    }
  }, [snap.logoDecal]);

  return <div ref={canvasRef} />;
};

export default Canva;
