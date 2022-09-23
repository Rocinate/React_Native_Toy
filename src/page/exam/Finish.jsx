import {useState, useEffect} from 'react';

import { View, StyleSheet, Text } from 'react-native'

const Finish = ({navigation}) => {
    const [second, setSecond] = useState(5)
    let timerId = null

    useEffect(() => {
        (function timer (num){
            if (num == 0) {
                navigation.navigate("Choose")
            }
            setTimeout(function() {
                setSecond(num-1)
            }, 1000);
          }
          )(second)
    }, [second])
    useEffect(() => {
        return () => {
            clearInterval(timerId)
        }
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.info}>答题已完成，将在{second}秒后回到登录界面</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        fontSize: 20
    }
})

export default Finish