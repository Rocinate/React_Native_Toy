import { useEffect, useState } from 'react'
import {View} from 'react-native'

const Timer = () => {
    const [timer, setTimer] = useState(null)
    const [timerId, setTimerId] = useState(null)
    const endTime = new Date().getTime() + 1 * 60 * 60 * 1000

    useEffect(() => {
        if (timerId == null) {
            setTimerId(setInterval(() => {
                setTimer(endTime - new Date().getTime())
            }, 500))
        }
    }, [])
    return (
        <View></View>
    )
}

export default Timer;