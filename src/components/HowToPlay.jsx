import { Text, Text3D } from '@react-three/drei'
import React from 'react'
import { motion } from 'framer-motion-3d'
import { useSetRecoilState } from 'recoil'
import { isStartScene } from '../utils/atom'

const HowToPlay = () => {
    const setStart = useSetRecoilState(isStartScene)
    const fontUrl = '/assets/fonts/Pretendard.json' // three에서 font의 확장자는 json이다. json으로 확장자 변경 필요

    const fontStyle = {
        font: fontUrl,
        size: 0.15,
        letterSpacing:0.01,
        height:0.02,
        lineHeight:1,
        fontSize:1
    }

    return (
        <motion.group
            /* 아래 속성들을 활용
            onUpdate={() => console.log('진행중')}
            onAnimationStart={() => console.log('시작')}
            onAnimationComplete={() => console.log('종료')}
            */
            onAnimationComplete={() => setStart(true)}
            position={[0.4, 0, 1.2]}
            rotation={[-Math.PI/2, 0, 0]}
            animate={{ y: [-2, 0], scale: [0, 1]}}
            transition={{ delay: 1.5, duration: 0.3 }}
        >
            {/* 2D Text */}
            {/* <Text
                font={fontUrl}
                color={"white"}
                characters='abcdefghijklmnopqrstuvwxyz0123456789'
                // 일반적으로 웹사이트에서 글꼴을 로딩하는 동안 텍스트가 표시되지 않는 문제가 발생할 수 있다
                // 그래서 characters 속성에 특정문자열을 지정하면 해당 문자열의 필요한 글꼴데이터만 먼저 로딩됨
            >
                Hello Seong Jun
            </Text> */}

            {/* 3D Text */}
            <Text3D
                // font={fontUrl}
                // size={0.15}
                // letterSpacing={0.01}
                // height={0.02}

                // // 일부속성은 글꼴에 따라서 적용이 안될 수도 있음
                // lineHeight={1}
                // fontSize={1}

                // // 두꺼운 폰트를 만들 때 사용
                // // bevelEnabled={true}
                // // bevelOffset={0.01}
                // // bevelSize={0.001}
                // // bevelThickness={0.1}
                {...fontStyle}
            >
                Hello Seong Jun
                <meshNormalMaterial />
            </Text3D>
            <group position={[0.3, -0.5, 0]}>
                <Text3D
                    position={[0.2, 0.1, 0]}
                    {...fontStyle}
                >
                    ↑
                    <meshNormalMaterial />
                </Text3D>
                <Text3D
                    position={[-0.06, -0.15, 0]}
                    {...fontStyle}
                >
                    ← ↓ →
                    <meshNormalMaterial />
                </Text3D>
            </group>
        </motion.group>
    )
}

export default HowToPlay