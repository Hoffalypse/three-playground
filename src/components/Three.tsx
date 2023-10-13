import { PerspectiveCamera, OrbitControls, Environment } from "@react-three/drei";
import { angleToRadian } from "../utils/angle";
// import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";


type OrbitControls = {
  setAzimuthalAngle: (angle: number) => void;
  setPolarAngle: (angle: number) => void;
  update: () => void;
};

const Three = () => {
  const orbitControlsRef = useRef<OrbitControls | null>(null);
  const ballRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if(ballRef.current){
      //use gsap package to animate the ball
      //when using mulpiple animations, use gsap.timeline()
      //x-axis motion
      gsap.to(ballRef.current.position, {
        x: 0, 
        duration: 3, 
        delay: .5,
        //check 'gsap ease visualizer' to see all the ease options 
      ease: "power2.out"})

      //y-axis motion
      gsap.from(ballRef.current.position, {
      y: 3,
      duration: 3,
      delay: .5,
      ease: "bounce.out"
      })
    }
   
  }, [])
  
  // useFrame((state) => {
  //   //sets angle of camera with no mouse button pressed
  //   if (orbitControlsRef.current) {
  //     const {x, y} = state.mouse;
  //     orbitControlsRef.current.setAzimuthalAngle(x * angleToRadian(45))
  //     orbitControlsRef.current.setPolarAngle((.8 + y) * angleToRadian(45))
  //     orbitControlsRef.current.update()
  //   }
  // });

  // useEffect(() => {
  //   if (orbitControlsRef.current) {
  //     console.log(orbitControlsRef.current);
  //   }
  // }, [orbitControlsRef]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[-2, 1, 5]} />
      <OrbitControls ref={orbitControlsRef} minPolarAngle={angleToRadian(40)} maxPolarAngle={angleToRadian(85)}/>
      <mesh position={[-3, 0.5, 0]} castShadow ref={ballRef}>
        <sphereGeometry args={[.5, 32, 32]} />
        <meshStandardMaterial color="green" metalness={.6} roughness={.5}/>
      </mesh>
      <mesh rotation={[-angleToRadian(90), 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#62D2DA" />
      </mesh>
      <ambientLight args={["#ffffff", .5]} />
      <spotLight 
      args={["#ffffff", 3]} 
      position={[-3, 1, 0]} 
      penumbra={1.9}
      castShadow
      />
      <Environment background>
        <mesh>
          <sphereGeometry args={[100, 100, 100]} />
          <meshBasicMaterial color="#2280cc" side={THREE.BackSide}/>
          </mesh>
      </Environment>
    </>
  );
};

export default Three;
