import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useAppState } from '../state/AppStateContext';

interface LocalLog {
  time: string;
  message: string;
}

export default function SyncStatusScreen() {
  const {
    pendingQueue,
    syncedCount,
    triggerSyncAll,
  } = useAppState();

  const [isOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [progress, setProgress] = useState(0);

  const [logs, setLogs] = useState<LocalLog[]>([
    {
      time: new Date().toLocaleTimeString(),
      message: 'Offline identity vault initialized successfully.',
    },
  ]);

  const pendingRows = pendingQueue.length;

  const handleSyncNow = async () => {
    if (pendingRows === 0 || isSyncing) {
      return;
    }

    setIsSyncing(true);

    const startTime = new Date().toLocaleTimeString();

    setLogs(prev => [
      {
        time: startTime,
        message: `Establishing secure AWS sync session for ${pendingRows} worker records...`,
      },
      ...prev,
    ]);

    try {
      await triggerSyncAll((value: number) => {
        setProgress(value);
      });

      const finishTime = new Date().toLocaleTimeString();

      setLogs(prev => [
        {
          time: finishTime,
          message: `SUCCESS: ${pendingRows} worker records synchronized and purged locally.`,
        },
        ...prev,
      ]);
    } catch {
      setLogs(prev => [
        {
          time: new Date().toLocaleTimeString(),
          message: 'ERROR: Synchronization failed.',
        },
        ...prev,
      ]);
    }

    setProgress(0);
    setIsSyncing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>

        <View style={styles.card}>
          <Text style={styles.cardHeader}>
            Local DB Sync Queue
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>
              Pending Identity Rows:
            </Text>

            <Text
              style={[
                styles.value,
                pendingRows > 0
                  ? styles.alertText
                  : styles.successText,
              ]}
            >
              {pendingRows}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Total Synced Records:
            </Text>

            <Text style={styles.value}>
              {syncedCount}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Connectivity State:
            </Text>

            <Text
              style={[
                styles.value,
                isOnline
                  ? styles.onlineText
                  : styles.offlineText,
              ]}
            >
              {isOnline
                ? 'Online (Gateway Active)'
                : 'Offline'}
            </Text>
          </View>

          {pendingQueue.length > 0 && (
            <View style={styles.recordsContainer}>
              <Text style={styles.recordsTitle}>
                Pending Worker Records
              </Text>

              {pendingQueue.map(worker => (
                <View
                  key={worker.workerId}
                  style={styles.workerCard}
                >
                  <Text style={styles.workerId}>
                    {worker.workerId}
                  </Text>

                  <Text style={styles.workerStatus}>
                    {worker.status}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {isSyncing && (
            <Text style={styles.progressText}>
              Sync Progress: {progress}%
            </Text>
          )}

          <TouchableOpacity
            style={[
              styles.syncButton,
              pendingRows === 0 &&
                styles.disabledButton,
            ]}
            disabled={pendingRows === 0 || isSyncing}
            onPress={handleSyncNow}
          >
            {isSyncing ? (
              <ActivityIndicator
                color="#FFFFFF"
                size="small"
              />
            ) : (
              <Text style={styles.syncButtonText}>
                {pendingRows === 0
                  ? 'Database Fully Synced'
                  : 'Force Synchronize Registry'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.logsContainer}>
          <Text style={styles.logsTitle}>
            System Ledger Operations
          </Text>

          <ScrollView>
            {logs.map((log, index) => (
              <View
                key={index}
                style={styles.logLine}
              >
                <Text style={styles.logTime}>
                  {log.time}
                </Text>

                <Text style={styles.logMessage}>
                  {log.message}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },

  innerContainer: {
    flex: 1,
    padding: 24,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
    elevation: 2,
  },

  cardHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    color: '#4A5568',
  },

  value: {
    fontSize: 14,
    fontWeight: '700',
  },

  alertText: {
    color: '#DD6B20',
  },

  successText: {
    color: '#38A169',
  },

  onlineText: {
    color: '#3182CE',
  },

  offlineText: {
    color: '#E53E3E',
  },

  recordsContainer: {
    marginTop: 16,
  },

  recordsTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },

  workerCard: {
    backgroundColor: '#EDF2F7',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },

  workerId: {
    fontWeight: '700',
  },

  workerStatus: {
    color: '#DD6B20',
  },

  progressText: {
    marginTop: 12,
    fontWeight: '700',
    color: '#3182CE',
  },

  syncButton: {
    backgroundColor: '#3182CE',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 16,
  },

  disabledButton: {
    backgroundColor: '#CBD5E0',
  },

  syncButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  logsContainer: {
    flex: 1,
    backgroundColor: '#1A202C',
    borderRadius: 8,
    padding: 16,
  },

  logsTitle: {
    color: '#A0AEC0',
    fontWeight: '700',
    marginBottom: 12,
  },

  logLine: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  logTime: {
    color: '#4FD1C5',
    marginRight: 8,
    fontSize: 12,
  },

  logMessage: {
    color: '#E2E8F0',
    flex: 1,
    fontSize: 12,
  },
});