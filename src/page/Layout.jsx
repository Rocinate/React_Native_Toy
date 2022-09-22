import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {colors} from '../config/color';
import ArticleScreen from './article/ArticleScreen';
import ExamScreen from './exam/ExamScreen';
import VideoScreen from './video/VideoScreen';

import {ThemeProvider, Button, createTheme, Text} from '@rneui/themed';
import {View} from 'react-native';

const TAB_ICON = {
  防化教材: 'book',
  模拟测试: 'school',
  防化课堂: 'videocam',
};

const Tab = createBottomTabNavigator();

const createScreenOptions = ({route}) => {
  const iconName = TAB_ICON[route.name];

  return {
    tabBarIcon: ({size, color}) => (
      <Icon name={iconName} size={size} color={color} />
    ),
    // 配置显示
    tabBarActiveTintColor: colors.brand.primary,
    tabBarInactiveTintColor: colors.brand.muted,
    headerShown: false,
  };
};

const theme = createTheme({
  components: {},
});

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={createScreenOptions}>
          <Tab.Screen name="防化教材" component={ArticleScreen} />
          <Tab.Screen name="模拟测试" component={ExamScreen} />
          <Tab.Screen name="防化课堂" component={VideoScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default Layout;
