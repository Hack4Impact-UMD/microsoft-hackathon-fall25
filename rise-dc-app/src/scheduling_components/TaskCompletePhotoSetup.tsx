import { PhotoUploader } from "./PhotoUploader";
import { uploadImageWithMeta } from "../services/uploadImage";

export function TaskCompletePhotoStep({
  assignmentId,
  eventId,
  userId,
  onDone,
}: {
  assignmentId: string;
  eventId: string;
  userId: string;
  onDone: () => void;
}) {
  return (
    <PhotoUploader
      label="Add a photo of your work?"
      helperText="Optional"
      maxFiles={1}
      accept="image/*"
      autoUpload
      onUpload={(file, onProgress) =>
        uploadImageWithMeta(file, onProgress, {
          caption: `assignment:${assignmentId}`,
          userId,
          eventId,
        })
      }
      onUploadComplete={async (images) => {
        onDone();
      }}
    />
  );
}
