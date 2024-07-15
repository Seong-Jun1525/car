import React, { useEffect } from 'react'
import { usePlane } from "@react-three/cannon";
import { Tree } from './components/Tree';
// import DummyBox from "./dummy/DummyBox";
// import DummyBall from "./dummy/DummyBall";
// import DummyWall from "./dummy/DummyWall";
import { Ball } from './components/Ball';
import HowToPlay from './components/HowToPlay';
// import { useRecoilState } from 'recoil';
// import { checkAtom } from './utils/atom';
import { RoadSign } from './components/RoadSign';
import Banner from './components/Banner';
import { MotionStage } from './components/MotionStage';
import MotionStageTwo from './components/MotionStageTwo';
import { Road } from './components/Road';

export function Ground(props) {

  // useState를 사용하듯이 useRecoilState를 사용함
  // const [atom, setAtom] = useRecoilState(checkAtom)
  const [meshRef] = usePlane(
    () => ({ args: [15, 15], mass: 1, type: 'Static', ...props}),
  )

  // useEffect(() => {
  //   console.log('Ground : ', atom)
  // }, [atom])

  return (
    <group>
      <mesh
        {...props}
        ref={meshRef} 
        receiveShadow
        // onClick={() => setAtom('성준')}
      >
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="black" wireframe/>
        {/* 
          wireframe을 줘서 눈으로 확인하기 편함
        */}
      </mesh>

      {/* 나무 */}
      <Tree
        position={[1, 0.5, -1]}
      />
      <Tree
        position={[-1, 0.5, -1]}
      />
      <Tree
        position={[3, 0.5, -1]}
      />
      <Tree
        position={[-3, 0.5, -1]}
      />

      <Ball position={[0, 0.2, -2]} />
      {/* <DummyBall  position={[0, 0.2, -2]} args={[0.15]} /> */}
      {/* <DummyBox position={[1, 0.2, -2]} args={[0.2, 0.2, 0.2]} />
      <DummyBox position={[1, 0.2, 1]} args={[0.2, 0.5, 0.2]} type={"Static"} /> */}
      {/* <DummyWall position={[5, 0.5, 0]} args={[1, 1, 10]} />
      <DummyWall position={[0, 0.5, 5]} args={[10, 1, 1]} />
      <DummyWall position={[0, 0.5, -5]} args={[10, 1, 1]} />
      <DummyWall position={[-5, 0.5, 0]} args={[1, 1, 10]} /> */}

      <HowToPlay />
      <Banner position={[0, 1, -6]} />
      <RoadSign position={[0, 0.5, 3]} />
      <MotionStage position={[3, 0.55, 4]} />
      <MotionStageTwo position={[-4, 0.55, 5.5]} />

      <Road position={[-8.8, -0.06, 1]} rotation-y={Math.PI/2} />
      <Road position={[-8.8, -0.06, 10]} rotation-y={Math.PI/2} />
    </group>
  )
}