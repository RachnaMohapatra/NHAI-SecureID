import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.brandContainer}>
          <Text style={styles.headline}>NHAI SECUREID</Text>
          <Text style={styles.subhead}>Offline Identity Verification Terminal</Text>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Enroll')}>
            <Text style={styles.actionButtonText}>Enroll Workforce</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.verifyVariant]} onPress={() => navigation.navigate('Verify')}>
            <Text style={styles.actionButtonText}>Verify Identity</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.syncVariant]} onPress={() => navigation.navigate('SyncStatus')}>
            <Text style={styles.actionButtonText}>Sync Registry</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  innerContainer: { flex: 1, padding: 24, justifyContent: 'space-between' },
  brandContainer: { alignItems: 'center', marginTop: 48 },
  headline: { fontSize: 32, fontWeight: '900', color: '#1A365D', letterSpacing: 1.5 },
  subhead: { fontSize: 14, fontWeight: '500', color: '#718096', marginTop: 8 },
  menuContainer: { width: '100%', marginBottom: 32 },
  actionButton: { backgroundColor: '#3182CE', paddingVertical: 18, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  verifyVariant: { backgroundColor: '#2B6CB0' },
  syncVariant: { backgroundColor: '#4A5568' },
  actionButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});