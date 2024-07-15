import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { stageTwo } from '../utils/atom'
import { useBox } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'

const colors = ['red', 'orange', 'yellow', 'green', 'blue']
const MAX_BOX_COUNT = 200

const BoxDrop = () => {
    const flood = useRecoilValue(stageTwo)
    const [box, setBox] = useState([])

    const generateRandomBox = () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        const x = -6 - Math.random() * 5
        const y = 3 + Math.random() * 5
        const z = -7 + Math.random() * 14

        return {
            color: randomColor,
            position: [x , y, z],
            args: [0.2, 0.2, 0.2]
        }
    }

    const addRandomBox = () => {
        if(box.length < MAX_BOX_COUNT) {
            setBox((currBox) => [...currBox, generateRandomBox()])
        }
    }

    useEffect(() => {
        if(flood) addRandomBox()
    }, [flood])

    useFrame(({clock}) => {
        // console.log(clock.getElapsedTime())
        const elapsedTime = Math.floor(clock.getElapsedTime())
        if(flood && elapsedTime % 5 === 0) {
            addRandomBox()
        }
    })

    return box.map((boxInfo, i) => <Box key={i} {...boxInfo} />)
}

function Box({color, args, position=[0, 1, 0]}) {
    const [ref] = useBox(() => ({
        mass: 1,
        args: args,
        position
    }))
    return (
        <mesh ref={ref}>
            <boxGeometry args={args} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}

export default BoxDrop