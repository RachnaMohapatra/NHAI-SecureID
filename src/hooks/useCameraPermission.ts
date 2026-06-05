import { useEffect, useState } from 'react';
import { Camera } from 'react-native-vision-camera';

export const useCameraPermission = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    const checkAndRequestPermission = async () => {
      try {
        // Check current status
        const currentStatus = await Camera.getCameraPermissionStatus();
        
        if (currentStatus === 'granted') {
          setHasPermission(true);
        } else {
          // If not granted, request it automatically
          const requestStatus = await Camera.requestCameraPermission();
          setHasPermission(requestStatus === 'granted');
        }
      } catch (error) {
        console.error('Error requesting camera permission:', error);
        setHasPermission(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAndRequestPermission();
  }, []);

  return { hasPermission, isChecking };
};