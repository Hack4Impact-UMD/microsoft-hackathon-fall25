import { useState, useEffect } from "react";

export const PhotoViewer = ({ photoFile }: { photoFile: File }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>("");

  useEffect(() => {
    if (photoFile) {
      const url = URL.createObjectURL(photoFile);
      setPhotoUrl(url);
      
      // Cleanup when component unmounts or photoFile changes
      return () => URL.revokeObjectURL(url);
    }
  }, [photoFile]);

  return (
    <>
      <div className="flex flex-col items-center">
        <img
          src={photoUrl}
          alt="Event completion"
          className="w-32 h-32 object-cover rounded-lg cursor-pointer border-2 border-gray-200"
          onClick={() => setIsFullscreen(true)}
        />
        <button
          onClick={() => setIsFullscreen(true)}
          className="mt-2 px-4 py-2 bg-[#1BBB57]/80 text-white rounded-lg text-sm hover:bg-[#1BBB57]/50"
        >
          📸 View Photo
        </button>
      </div>

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="relative max-w-4xl max-h-4xl">
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white bg-red-500 rounded-full text-xl z-10"
            >
              ✕
            </button>
            <img
              src={photoUrl}
              alt="Event completion fullscreen"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};