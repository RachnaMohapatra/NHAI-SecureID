import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface WorkerRecord {
  workerId: string;
  timestamp: string;
  status: 'Pending' | 'Synced ✅';
  photoPath: string;
  alignment: string;
  confidence: number;
}

export interface VerificationLog {
  id: string;
  workerId: string;
  confidence: number;
  liveness: 'Passed' | 'Failed';
  timestamp: string;
  mode: 'Offline';
}

interface AppStateContextType {
  pendingQueue: WorkerRecord[];
  syncedCount: number;
  verificationLogs: VerificationLog[];
  enrollWorker: (photoPath: string, alignment: string, confidence: number) => WorkerRecord;
  triggerSyncAll: (onProgress: (progress: number) => void) => Promise<void>;
  addVerificationLog: (workerId: string, confidence: number, liveness: 'Passed' | 'Failed') => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [pendingQueue, setPendingQueue] = useState<WorkerRecord[]>([]);
  const [syncedCount, setSyncedCount] = useState<number>(142); // Warm base baseline metrics
  const [verificationLogs, setVerificationLogs] = useState<VerificationLog[]>([]);
  const [nextIdIndex, setNextIdIndex] = useState(1);

  const enrollWorker = (photoPath: string, alignment: string, confidence: number) => {
    const paddedId = String(nextIdIndex).padStart(3, '0');
    const workerId = `NHAI-${paddedId}`;
    setNextIdIndex(prev => prev + 1);

    const newRecord: WorkerRecord = {
      workerId,
      timestamp: new Date().toLocaleTimeString(),
      status: 'Pending',
      photoPath,
      alignment,
      confidence: confidence > 0 ? confidence : 92 // Fallback nominal base metric
    };

    setPendingQueue(prev => [...prev, newRecord]);
    return newRecord;
  };

  const addVerificationLog = (workerId: string, confidence: number, liveness: 'Passed' | 'Failed') => {
    const newLog: VerificationLog = {
      id: Math.random().toString(),
      workerId,
      confidence,
      liveness,
      timestamp: new Date().toLocaleTimeString(),
      mode: 'Offline'
    };
    setVerificationLogs(prev => [newLog, ...prev]);
  };

  const triggerSyncAll = async (onProgress: (progress: number) => void) => {
    // Simulated smooth tick progression fitting strict deadline timeline limitations
    for (let i = 1; i <= 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      onProgress(i * 10);
    }
    setSyncedCount(prev => prev + pendingQueue.length);
    setPendingQueue([]);
  };

  return (
    <AppStateContext.Provider value={{
      pendingQueue,
      syncedCount,
      verificationLogs,
      enrollWorker,
      triggerSyncAll,
      addVerificationLog
    }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used within an AppStateProvider');
  return context;
}