import Forum from './pages/Forum';
import Home from './pages/Forum';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function Routes() {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Forum" component={Forum} />
        </Tab.Navigator>
)
}