import { useControls } from 'leva'
import DummyCarBody from './dummy/DummyCarBody'
import { useBox, useCompoundBody, useRaycastVehicle } from '@react-three/cannon'
import { useMemo, useRef } from 'react'
import DummyWheel from './dummy/DummyWheel'
import useWheels from './utils/useWheels'
import useVehicleControls from './utils/useVehicleControls'
import { Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'
import useFollowCam from './utils/useFollowCam'
import { CarBody } from './components/CarBody'
import Wheel from './components/Wheel'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { stageOne, stageTwo } from './utils/atom'

const Car = () => {
    const setStageOne = useSetRecoilState(stageOne)
    const setStageTwo = useSetRecoilState(stageTwo)
    const [value] = useRecoilState(stageTwo)

    const { pivot } = useFollowCam()

    // Car의 현재 위치
    const worldPosition = useMemo(() => new Vector3(), []) // Vector3 : x, y, z

    // leva 라이브러리 사용
    const chassisBodyValue = useControls('chassisBody', {
        width: {value : 0.33, min : 0, max : 1}, // 차체의 너비
        height: {value : 0.28, min : 0, max : 1}, // 차체의 높이
        front: {value : 0.24 * 2, min : 0, max : 1} // 차체의 길이
    })

    const position = [0, 0.5, 0]

    let width, height, front, mass, wheelRadius

    width = 0.16
    height = 0.12
    front = 0.17
    mass = 150
    wheelRadius = 0.05

    const chassisBodyArgs = [width, height, front * 2]

    const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius)

    // useBox를 useCompoundBody로 변경
    const [chassisBody, chassisApi] = useCompoundBody(() => ({
        // args: [chassisBodyValue.width, chassisBodyValue.height, chassisBodyValue.front],
        // args: chassisBodyArgs,
        collisionFilterGroup: 5,
        position,
        mass,
        shapes: [
            {
                args: chassisBodyArgs,
                position: [0, 0, 0],
                type: "Box"
            },
            {
                args: [width, height, front],
                position: [0, height, 0],
                type: "Box"
            }
        ]
    }), useRef(null)) // 초기값 null
    // useCompoundBody와 useBox를 사용할 때 두번째 인자로 useRef() 훅을 사용할 수 있다

    const [vehicle, vehicleApi] = useRaycastVehicle(() => ({ // 차 부품들 합체시켜주는 훅
        chassisBody,
        wheelInfos,
        wheels
    }))

    useVehicleControls(vehicleApi, chassisApi)

    // 현재위치값 콘솔에 출력
    const makeFollowCam = () => {
        // console.log('wp', worldPosition)
        chassisBody?.current.getWorldPosition(worldPosition)
        pivot.position.lerp(worldPosition, 0.9)
        // 선형보간. 0에 가까울수록 이동이 적게되고 1에 가까울수록 이동이 많이됨
        // 0.9정도가 적당하다
    }

    const makeStageOne = () => {
        const chassisPosition = new Vector3().setFromMatrixPosition(chassisBody.current.matrixWorld)
        // console.log('x', chassisPosition.x)
        // console.log('z', chassisPosition.z)

        if(Math.abs(3 - chassisPosition.x) < 0.7 && Math.abs(4.9 - chassisPosition.z) < 0.7) {
            setStageOne(true)
        } else {
            setStageOne(false)
        }
    }
    
    const makeStageTwo = () => {
        const chassisPosition = new Vector3().setFromMatrixPosition(chassisBody.current.matrixWorld)
        // console.log('x', chassisPosition.x)
        // console.log('z', chassisPosition.z)
        // x -3     0.8
        // z 5.4    0.8
        if(Math.abs(-3 - chassisPosition.x) < 0.8 && Math.abs(5.4 - chassisPosition.z) < 0.8) {
            setStageTwo(true)
        } else {
            setStageTwo(false)
        }
        // console.log(value)
    }

    useFrame(() => {
        makeFollowCam()
        makeStageOne()
        makeStageTwo()
    })

    return (
        <group ref={vehicle}>
            {/* 차체 */}
            <group ref={chassisBody} name='chassisBody'>
                {/* 차체바디 */}
                <CarBody
                    width={chassisBodyValue.width}
                    height={chassisBodyValue.height}
                    front={chassisBodyValue.front}
                />
                {/* <DummyCarBody
                    width={chassisBodyValue.width}
                    height={chassisBodyValue.height}
                    front={chassisBodyValue.front * 2}
                /> */}
            </group>
            {/* 바퀴 */}
            <Wheel
                wheelRef={wheels[0]}
                radius={wheelRadius}
                leftSide={true}
            />
            <Wheel
                wheelRef={wheels[1]}
                radius={wheelRadius}
            />
            <Wheel
                wheelRef={wheels[2]}
                radius={wheelRadius}
                leftSide={true}
            />
            <Wheel
                wheelRef={wheels[3]}
                radius={wheelRadius}
            />
            {/* <DummyWheel
                wheelRef={wheels[0]}
                radius={wheelRadius}
            />
            <DummyWheel
                wheelRef={wheels[1]}
                radius={wheelRadius}
            />
            <DummyWheel
                wheelRef={wheels[2]}
                radius={wheelRadius}
            />
            <DummyWheel
                wheelRef={wheels[3]}
                radius={wheelRadius}
            /> */}
        </group>
    )
}

export default Car