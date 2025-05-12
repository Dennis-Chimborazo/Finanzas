import React, { useEffect, useRef, useState } from 'react';

interface CameraPreviewProps {
  onCapture: (imageData: string) => void;
  className?: string;
}

const CameraPreview: React.FC<CameraPreviewProps> = ({ onCapture, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreaming(true);
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Camera access denied or unavailable.');
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
        onCapture(imageData);
      }
    }
  };

  return (
    <div className="text-center space-y-4">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={`rounded-lg shadow border ${className ?? 'w-full max-w-sm'}`}
      />
      <canvas ref={canvasRef} className="hidden" />
      <button
        type="button"
        onClick={handleCapture}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
      >
        Capture Photo
      </button>
    </div>
  );
};

export default CameraPreview;
