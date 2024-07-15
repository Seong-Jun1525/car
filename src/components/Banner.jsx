import { useBox } from '@react-three/cannon'
import { Html, useTexture } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'

const Banner = ({position}) => {
    const texture = useTexture('/assets/images/yuhan.png')

    const [info, setInfo] = useState(false)

    // 물리엔진
    const [ref] = useBox(() => ({
        args: [5, 2, 2],
        position,
        type: 'Static',
        onCollide: handleCollision
    }), useRef(null))

    const handleCollision = () => {
        setInfo(true)
    }

    useEffect(() => {
        let timeout
        if(info) {
            timeout = setTimeout(() => setInfo(false), 1000)
        }
        return () => clearTimeout(timeout)
    })

    const onHandleHistory = () => {
        const url = 'https://www.yuhan.ac.kr/index.do'
        window.open(url, '_blank')
    }

    return (
        <mesh ref={ref} onClick={onHandleHistory}>
            <boxGeometry args={[5, 2, 2]} />
            <meshStandardMaterial map={texture} />
            {info && 
                <Html center>
                    <div className='information'>
                        마우스로 클릭해보세요
                    </div>
                </Html>
            }   
        </mesh>
    )
}

export default Banner