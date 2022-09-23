import { createStackNavigator } from '@react-navigation/stack';

import Choose from '../page/exam/Choose';
import SignIn from '../page/exam/SignIn';
import Admin from '../page/exam/Admin';
import Exam from '../page/exam/Exam';
import Finish from '../page/exam/Finish';

const Stack = createStackNavigator()

const ExamScreen = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: true,
        }}>
            <Stack.Screen name="测试" component={Choose}/>
            <Stack.Screen name="登录" component={SignIn}/>
            <Stack.Screen name="考试" component={Exam}/>
            <Stack.Screen name="试卷管理" component={Admin}/>
            <Stack.Screen name="完成" component={Finish}/>
        </Stack.Navigator>
    )
}

export default ExamScreen