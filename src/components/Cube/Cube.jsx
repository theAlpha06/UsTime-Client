import React, { useEffect, useRef } from "react";
import * as THREE from 'three';
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CameraController = () => {
   const { camera, gl } = useThree();
   useEffect(
      () => {
         const controls = new OrbitControls(camera, gl.domElement);
         controls.minDistance = 5;
         controls.maxDistance = 10;
         return () => {
            controls.dispose();
         };
      },
      [camera, gl]
   );
   return null;
};


function Box(props) {
   const base = useLoader(THREE.TextureLoader, "/maskable.png");
   const mesh = useRef();
   useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
   return (
      <mesh {...props} ref={mesh}>
         <boxGeometry args={[2, 2, 2]} />
         <meshStandardMaterial attach="material" map={base} />
      </mesh>
   );
}
export default function Cube() {
   return (
      <Canvas updateDefaultCamera={true} >
         <CameraController />
         <ambientLight />
         <Box position={[0, 0, 0]} />
      </Canvas>
   );
}