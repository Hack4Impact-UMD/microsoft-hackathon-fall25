import { useEffect, useRef, useState } from "react";
import { QuietHobbyModalProps } from "./types";

export default function QuietHobbyModal({
    isOpen,
    onClose,
    timeRange = "09:00AM - 09:15AM",
    hobbies,
    onChooseActivity,
    onTakePhoto,
    initialHobbyId = "",
}: QuietHobbyModalProps) {
    const [selectedId, setSelectedId] = useState(initialHobbyId);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    
    useEffect(() => {
        if (isOpen) {
            setSelectedId(initialHobbyId);
        } else {
            // Reset camera states when modal closes
            if (isCameraOpen) {
                stopCamera();
            }
            setCapturedPhoto(null);
        }
    }, [isOpen, initialHobbyId]);

    // Cleanup camera stream when component unmounts or modal closes
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Handle video setup when camera opens
    useEffect(() => {
        if (isCameraOpen && streamRef.current && videoRef.current) {
            const video = videoRef.current;
            const stream = streamRef.current;
            
            video.srcObject = stream;
            
            // Set up event listeners
            const handleVideoReady = () => {
                setIsVideoReady(true);
            };
            
            video.onloadedmetadata = handleVideoReady;
            video.oncanplay = handleVideoReady;
            video.onloadeddata = handleVideoReady;
            
            // Fallback timeout
            setTimeout(() => {
                setIsVideoReady(true);
            }, 2000);
        }
    }, [isCameraOpen]);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'user', // Use front camera on MacBook
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                } 
            });
            streamRef.current = stream;
            setIsCameraOpen(true);
        } catch (error) {
            alert('Unable to access camera. Please check permissions.');
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsCameraOpen(false);
        setIsVideoReady(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current && isVideoReady) {
            const canvas = canvasRef.current;
            const video = videoRef.current;
            const context = canvas.getContext('2d');
            
            if (context && video.videoWidth > 0 && video.videoHeight > 0) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0);
                
                const photoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
                setCapturedPhoto(photoDataUrl);
                onTakePhoto(photoDataUrl);
                stopCamera();
            } else {
                alert('Camera not ready. Please wait a moment and try again.');
            }
        } else {
            alert('Camera not ready. Please wait a moment and try again.');
        }
    };

    const handleTakePhoto = () => {
        if (isCameraOpen) {
            capturePhoto();
        } else {
            startCamera();
        }
    };

    if (!isOpen) return null;
return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="qh-title"
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-6 py-8"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-sm rounded-lg bg-white shadow-2xl p-6"
      >
        {/* header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
            </div>
            <div>
              <h2 id="qh-title" className="text-2xl font-bold text-gray-800">
                Quiet Time
              </h2>
              <p className="text-sm text-gray-600">{timeRange}</p>
            </div>
          </div>
          <button
            aria-label="Close"
            onClick={() => onClose?.()}
            className="ml-4 h-8 w-8 grid place-items-center rounded-full bg-pink-500 text-white text-lg hover:brightness-95 active:scale-95 transition-transform"
          >
            ×
          </button>
        </div>
        <p className="text-base text-gray-700 mb-4">
          Choose a quiet activity to enjoy!
        </p>
        <div className="mb-6">
          <label className="block text-base font-semibold text-gray-800 mb-3">
            Choose an activity:
          </label>
          <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
            {hobbies.map((hobby) => (
              <button
                key={hobby.id}
                onClick={() => setSelectedId(hobby.id)}
                className={`w-full text-left px-4 py-3 text-base text-gray-800 hover:bg-gray-50 transition-colors ${
                  selectedId === hobby.id ? 'bg-gray-100' : ''
                }`}
              >
                {hobby.name}
              </button>
            ))}
          </div>
        </div>

        {/* Camera interface */}
        {isCameraOpen && (
          <div className="mb-6">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-64 object-cover"
              />
              {!isVideoReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Loading camera...</p>
                  </div>
                </div>
              )}
              {isVideoReady && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 border-4 border-white rounded-full opacity-50"></div>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-3">
              <button
                onClick={capturePhoto}
                disabled={!isVideoReady}
                className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-white text-base font-semibold hover:brightness-95 active:scale-98 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="mr-2 text-lg">📸</span>
                {isVideoReady ? 'Capture Photo' : 'Loading...'}
              </button>
              <button
                onClick={stopCamera}
                className="flex-1 rounded-lg bg-gray-600 px-4 py-3 text-white text-base font-semibold hover:brightness-95 active:scale-98 transition-all flex items-center justify-center"
              >
                <span className="mr-2 text-lg">✕</span>
                Cancel
              </button>
            </div>
            {!isVideoReady && (
              <div className="mt-2 text-center">
                <button
                  onClick={() => {
                    setIsVideoReady(true);
                  }}
                  className="text-sm text-blue-600 underline hover:text-blue-800"
                >
                  Camera not loading? Click here to continue
                </button>
              </div>
            )}
          </div>
        )}

        {/* Captured photo preview */}
        {capturedPhoto && !isCameraOpen && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Photo captured:</p>
            <img
              src={capturedPhoto}
              alt="Captured photo"
              className="w-full h-48 object-cover rounded-lg border border-gray-200"
            />
          </div>
        )}

        {/* actions */}
        <div className="space-y-3">
          <button
            onClick={() => selectedId && onChooseActivity(selectedId)}
            disabled={!selectedId}
            className="w-full rounded-lg bg-green-600 px-4 py-3 text-white text-base font-semibold enabled:hover:brightness-95 enabled:active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            <span className="mr-2 text-lg">✓</span> Select Activity
          </button>
          {/* <button
            onClick={handleTakePhoto}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white text-base font-semibold hover:brightness-95 active:scale-98 transition-all flex items-center justify-center"
          >
            <span className="mr-2 text-lg" aria-hidden>
              📸
            </span>
            {isCameraOpen ? 'Capture Photo' : 'Take Photo'}
          </button> */}
        </div>

        {/* Hidden canvas for photo capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}