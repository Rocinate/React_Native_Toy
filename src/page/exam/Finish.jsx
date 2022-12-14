import {useState, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { StackActions } from '@react-navigation/native';

const Finish = ({navigation}) => {
    const [second, setSecond] = useState(5)

    useEffect(() => {
        (function timer (num){
            if (num == 0) {
                navigation.dispatch(StackActions.popToTop());
            }
            setTimeout(function() {
                setSecond(num-1)
            }, 1000);
          }
          )(second)
    }, [second])

    return (
        <View style={styles.container}>
            <Text style={styles.info}>答题已完成，将在{second}秒后回到初始界面</Text>
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