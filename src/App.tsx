import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Three from "./components/Three";
import "./App.css";


function App() {
  return (
    <>
      <div>
        <Canvas id="canvas-container" shadows>
          <Suspense fallback={null}>
          
            <Three />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}

export default App;
