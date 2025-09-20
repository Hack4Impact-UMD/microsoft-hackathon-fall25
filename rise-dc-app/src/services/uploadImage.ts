// src/api/uploadImage.ts
export type ImageRec = { id: string; url: string; caption: string };

const API_BASE =
  import.meta.env.VITE_API_BASE?.replace(/\/$/, "") || "http://localhost:3000";

export function uploadImageWithMeta(
  file: File,
  onProgress: (p: number) => void,
  opts: { caption: string; userId?: string; eventId?: string }
): Promise<ImageRec> {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append("file", file);
    form.append("caption", opts.caption);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_BASE}/api/upload_image`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = async () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(new Error(`Upload failed (${xhr.status})`));
        return;
      }
      try {
        const data = JSON.parse(xhr.responseText);
        const img = {
          id: data.id ?? crypto.randomUUID(),
          url: data.url,
          caption: data.caption ?? opts.caption,
        };

        try {
          await fetch(`${API_BASE}/api/photos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              blobUrl: img.url,
              caption: img.caption,
              userId: opts.userId,
              eventId: opts.eventId,
            }),
          });
        } catch (metaErr) {
          console.warn("Saved blob, but metadata upsert failed:", metaErr);
        }

        resolve(img);
      } catch {
        reject(new Error("Invalid JSON response from upload_image"));
      }
    };

    xhr.onerror = () => reject(new Error("Network error"));
    xhr.send(form);
  });
}
