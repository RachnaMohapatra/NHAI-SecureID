import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface LocalLog {
  time: string;
  message: string;
}

export default function SyncStatusScreen() {
  const [pendingRows, setPendingRows] = useState(3);
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [logs, setLogs] = useState<LocalLog[]>([
    { time: '10:14:22', message: 'Local sync pipeline structural framework initialized.' },
    { time: '10:15:02', message: 'Enrolled biometric payload generated for Worker NHAI-082.' },
    { time: '11:02:15', message: 'Liveness check passed: Face verification log appended for NHAI-094.' },
    { time: '11:45:50', message: 'Enrolled biometric payload generated for Worker NHAI-041.' },
  ]);

  // Handle a live simulated server sync
  const handleSyncNow = () => {
    if (pendingRows === 0 || isSyncing) return;

    setIsSyncing(true);
    const now = new Date().toLocaleTimeString();
    
    setLogs(prev => [
      { time: now, message: `Establishing handshake with NHAI Central Cloud Server...` },
      ...prev
    ]);

    setTimeout(() => {
      const completionTime = new Date().toLocaleTimeString();
      setPendingRows(0);
      setIsSyncing(false);
      setLogs(prev => [
        { time: completionTime, message: 'SUCCESS: 3 Identity rows transmitted and verified successfully! Registry cleared.' },
        ...prev
      ]);
    }, 2500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        
        {/* Sync Queue Card Dashboard */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Local DB Sync Queue</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Pending Identity Rows:</Text>
            <Text style={[styles.value, pendingRows > 0 ? styles.alertText : styles.successText]}>
              {pendingRows}
            </Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Connectivity State:</Text>
            <Text style={[styles.value, isOnline ? styles.onlineText : styles.offlineText]}>
              {isOnline ? 'Online (Gateways Active)' : 'Offline (Local Vault Queue Enabled)'}
            </Text>
          </View>

          {/* Dynamic Sync Trigger Action */}
          <TouchableOpacity 
            style={[styles.syncButton, pendingRows === 0 && styles.disabledButton]}
            disabled={pendingRows === 0 || isSyncing}
            onPress={handleSyncNow}
          >
            {isSyncing ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.syncButtonText}>
                {pendingRows === 0 ? 'Database fully synced' : 'Force Synchronize Registry'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Real-time Rolling Console Log Box */}
        <View style={styles.logsContainer}>
          <Text style={styles.logsTitle}>System Ledger Operations</Text>
          
          <ScrollView contentContainerStyle={styles.scrollLogContent}>
            {logs.map((log, index) => (
              <View key={index} style={styles.logLine}>
                <Text style={styles.logTime}>{log.time}</Text>
                <Text style={styles.logMessage}>{log.message}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  innerContainer: { flex: 1, padding: 24 },
  card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 24, elevation: 2 },
  cardHeader: { fontSize: 18, fontWeight: '700', color: '#2D3748', marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#EDF2F7', paddingBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  label: { fontSize: 14, fontWeight: '500', color: '#4A5568' },
  value: { fontSize: 14, fontWeight: '700', color: '#1A202C' },
  alertText: { color: '#DD6B20' },
  successText: { color: '#38A169' },
  onlineText: { color: '#3182CE' },
  offlineText: { color: '#E53E3E' },
  
  // New Functional UI elements
  syncButton: {
    backgroundColor: '#3182CE',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
  },
  disabledButton: {
    backgroundColor: '#CBD5E0',
  },
  syncButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },

  // Terminal box structural styling
  logsContainer: { flex: 1, backgroundColor: '#1A202C', borderRadius: 8, padding: 16 },
  logsTitle: { fontSize: 14, fontWeight: '700', color: '#A0AEC0', marginBottom: 12, textTransform: 'uppercase' },
  scrollLogContent: { paddingBottom: 10 },
  logLine: { flexDirection: 'row', marginBottom: 10, alignItems: 'flex-start' },
  logTime: { color: '#4FD1C5', fontSize: 12, marginRight: 8, fontFamily: 'monospace' },
  logMessage: { color: '#E2E8F0', fontSize: 12, flex: 1, fontFamily: 'monospace', lineHeight: 16 },
});