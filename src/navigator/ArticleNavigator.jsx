import { createStackNavigator } from "@react-navigation/stack";

import ArticleScreen from '../page/article/ArticleScreen'
import FileList from '../page/components/FileList'
import FileViewer from '../page/article/FileViewer'

const Stack = createStackNavigator()

const ArticleNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: true
        }}>
            <Stack.Screen name="学习教材" component={ArticleScreen}/>
            <Stack.Screen name="文件列表" component={FileList}/>
            <Stack.Screen name="文件预览" component={FileViewer}/>
        </Stack.Navigator>
    )
}

export default ArticleNavigator;