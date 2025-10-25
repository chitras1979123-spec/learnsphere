
import React, { useEffect, useRef, useState, useCallback } from 'react';

interface ProctoringMonitorProps {
  onWarning: (type: 'tab' | 'face') => void;
  warnings: number;
}

const ProctoringMonitor: React.FC<ProctoringMonitorProps> = ({ onWarning, warnings }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      onWarning('tab');
    }
  }, [onWarning]);
  
  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setCameraError("Camera access denied. Please enable camera permissions in your browser settings.");
      }
    };
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 sticky top-4">
      <h3 className="text-lg font-bold mb-2 text-center text-teal-300">Proctoring Monitor</h3>
      <div className="aspect-video bg-black rounded-md overflow-hidden mb-4">
        {cameraError ? (
          <div className="h-full w-full flex items-center justify-center text-red-400 p-4 text-center">
            {cameraError}
          </div>
        ) : (
          <video ref={videoRef} autoPlay muted className="w-full h-full object-cover"></video>
        )}
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center bg-slate-700 p-2 rounded-md">
          <span className="font-semibold text-slate-300">Face Detection</span>
          <span className="px-2 py-1 text-xs font-bold bg-green-500 text-white rounded-full">OK</span>
        </div>
         <div className="flex justify-between items-center bg-slate-700 p-2 rounded-md">
          <span className="font-semibold text-slate-300">Tab Focus</span>
          <span className="px-2 py-1 text-xs font-bold bg-green-500 text-white rounded-full">OK</span>
        </div>
        <div className="flex justify-between items-center bg-slate-900 p-3 rounded-md border border-red-500/50">
          <span className="font-bold text-red-400">Warnings</span>
          <span className="text-2xl font-extrabold text-red-400">{warnings} / 3</span>
        </div>
      </div>
       <div className="mt-4 text-center">
         <button 
           onClick={() => onWarning('face')}
           className="text-xs bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded-full transition-colors"
           title="This is for demonstration purposes."
         >
           Simulate Cheating (Look Away)
         </button>
       </div>
    </div>
  );
};

export default ProctoringMonitor;
