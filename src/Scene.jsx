import { Canvas } from "@react-three/fiber";
// import { Box } from "./Box";
import { Ground } from "./Ground";
import { Debug, Physics } from "@react-three/cannon";
// import { useControls } from "leva";
// import { Sphere } from "./Sphere";
// import { Cylinder } from "./Cylinder";
// import Torus from "./Torus";
// import Icosahedron from "./Icosahedron";
import Car from "./Car";
// import DummyMotionArea from "./dummy/DummyMotionArea";
// import DummyBox from "./dummy/DummyBox";
// import DummyBall from "./dummy/DummyBall";
// import DummyWall from "./dummy/DummyWall";

function Scene() {

  // const bgValue = useControls({ bgColor: '#fff' })
  // const gravity = useControls('Gravity', {
  //   x: {value: 0, min: -10, max: 10, step: 0.1},
  //   y: {value: -9.81, min: -10, max: 10, step: 0.1},
  //   z: {value: 0, min: -10, max: 10, step: 0.1}
  // })

  return (
    <>
      <Canvas camera={{ fov: 45, position: [1.5, 2, 5] }}>
        {/* <color attach={"background"} args={[bgValue.bgColor]} /> */}
        {/* <Physics gravity={[gravity.x, gravity.y, gravity.z]}> */}
        <ambientLight/>
        <directionalLight position={[0, 5, 5]} />
        <Physics gravity={[0, -2.6, 0]}>
          {/* 
            Physics 컴포넌트를 선언하는 것만으로 중력을 갖게 됨
            gravity 속성값을 줄 때 y값을 0으로 주게되면 살짝 떠있게 된다
            x,y,z 축에 전부 중력값을 줄 수 있다

            Ground 컴포넌트에 wireframe을 줘서 눈으로 그나마 확인하기 편하지만
            물리엔진 작업을 할때 디버깅을 할 수 있게 Debug 컴포넌트를 사용하면
            물리엔진의 충돌체영역을 확인할 수 있다
          */}
          <Debug>
            {/*
            <Box position={[0,1,0]}/>
            <Sphere position={[2, 1, 0]} />
            <Torus position={[-1, 1, 2]} />
            <Icosahedron position={[1, 1, 2]} />
            <Cylinder position={[-2, 1, 0]} /> */}
            <Car />
            {/* <DummyMotionArea position={[0, -0.2, 0]} /> */}
            {/* <DummyBall position={[0, 0.2, -2]} args={[0.15]} />
            <DummyBox position={[1, 0.2, -2]} args={[0.2, 0.2, 0.2]} />
            <DummyBox position={[1, 0.2, 1]} args={[0.2, 0.5, 0.2]} type={"Static"} />
            <DummyWall position={[5, 0.5, 0]} args={[1, 1, 10]} />
            <DummyWall position={[0, 0.5, 5]} args={[10, 1, 1]} />
            <DummyWall position={[0, 0.5, -5]} args={[10, 1, 1]} />
            <DummyWall position={[-5, 0.5, 0]} args={[1, 1, 10]} /> */}
            <Ground rotation={[-Math.PI/2,0,0]}/>
          </Debug>
        </Physics>
      </Canvas>
    </>
  );
}

export default Scene;