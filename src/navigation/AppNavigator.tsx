import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import EnrollScreen from '../screens/EnrollScreen';
import VerifyScreen from '../screens/VerifyScreen';
import SyncStatusScreen from '../screens/SyncStatusScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#1A365D' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '600' },
        contentStyle: { backgroundColor: '#F7FAFC' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'NHAI SecureID Terminal' }} />
      <Stack.Screen name="Enroll" component={EnrollScreen} options={{ title: 'Workforce Enrollment' }} />
      <Stack.Screen name="Verify" component={VerifyScreen} options={{ title: 'Identity Verification' }} />
      <Stack.Screen name="SyncStatus" component={SyncStatusScreen} options={{ title: 'Data Synchronization' }} />
    </Stack.Navigator>
  );
}