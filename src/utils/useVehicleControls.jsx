import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { stageOne } from './atom'

const useVehicleControls = (vehicleApi, chassisApi) => {
    const motionStage = useRecoilValue(stageOne)
    const [controls, setControls] = useState({})

    useEffect(() => {
        const KeyDownPressHandler = (e) => {
            setControls((controls) => ({
                ...controls, [e.key] : true
            }))
        }
        const keyUpPressHandler = (e) => {
            setControls((controls) => ({
                ...controls, [e.key] : false
            }))
        }

        window.addEventListener('keydown', KeyDownPressHandler)
        window.addEventListener('keyup', keyUpPressHandler)

        return () => {
            window.removeEventListener('keydown', KeyDownPressHandler)
            window.removeEventListener('keyup', keyUpPressHandler)
        }
    }, [])

    useEffect(() => {
        // console.log(vehicleApi)
        if(controls.ArrowUp) {
            vehicleApi.applyEngineForce(120, 2)
            vehicleApi.applyEngineForce(120, 3)
        } else if(controls.ArrowDown) {
            vehicleApi.applyEngineForce(-120, 2)
            vehicleApi.applyEngineForce(-120, 3)
        } else {
            vehicleApi.applyEngineForce(0, 2)
            vehicleApi.applyEngineForce(0, 3)
        }

        if(controls.ArrowLeft) {
            vehicleApi.setSteeringValue(-0.1, 0)
            vehicleApi.setSteeringValue(-0.1, 1)
            vehicleApi.setSteeringValue(0.35, 2)
            vehicleApi.setSteeringValue(0.35, 3)
        } else if(controls.ArrowRight) {
            vehicleApi.setSteeringValue(0.1, 0)
            vehicleApi.setSteeringValue(0.1, 1)
            vehicleApi.setSteeringValue(-0.35, 2)
            vehicleApi.setSteeringValue(-0.35, 3)
        } else {
            for(let i = 0; i < 4; i++) {
                vehicleApi.setSteeringValue(0, i)
            }
        }
    }, [controls, vehicleApi, chassisApi])
    
    const onHandleHistory = () => {
        const url = 'https://github.com/Seong-Jun1525'
        window.open(url, '_blank')
    }

    useEffect(() => {
        if(controls.Enter && motionStage) {
            onHandleHistory()
            setControls((controls) => ({
                ...controls,
                Enter: false
            }))
        }
    }, [controls, motionStage])

    return controls
}

export default useVehicleControls