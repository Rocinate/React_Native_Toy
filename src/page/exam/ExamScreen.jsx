import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './SignIn';
import Admin from './Admin';
import Exam from './Exam'
import Finish from './Finish'

const Stack = createStackNavigator()

const ExamScreen = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="SignIn" component={SignIn}/>
            <Stack.Screen name="Exam" component={Exam}/>
            <Stack.Screen name="Admin" component={Admin}/>
            <Stack.Screen name="Finish" component={Finish}/>
        </Stack.Navigator>
    )
}

export default ExamScreen