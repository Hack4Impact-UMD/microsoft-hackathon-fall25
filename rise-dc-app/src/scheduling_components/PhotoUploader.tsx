import React, { useEffect, useRef, useState } from "react";
import { CameraAlt } from "@mui/icons-material";

export type ImageRec = { id: string; caption: string }; // matches your Image type

type UploadItem = {
  id: string;
  file: File;
  previewUrl: string;
  progress: number; // 0..100
  status: "pending" | "uploading" | "done" | "error";
  error?: string;
};

export type PhotoUploaderProps = {
  label?: string;
  helperText?: string;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSizeMB?: number;
  disabled?: boolean;

  onFilesChange?: (files: File[]) => void;
  onUpload?: (file: File, onProgress: (p: number) => void) => Promise<ImageRec>;
  autoUpload?: boolean;
  onUploadComplete?: (images: ImageRec[]) => void;
  exposeUploadApiRef?: React.MutableRefObject<
    null | (() => Promise<ImageRec[]>)
  >;
};

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  label = "Add a photo?",
  helperText = "Optional",
  accept = "image/*",
  multiple = true,
  maxFiles = 1,
  maxSizeMB = 10,
  disabled,
  onFilesChange,
  onUpload,
  autoUpload = false,
  onUploadComplete,
  exposeUploadApiRef,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [items, setItems] = useState<UploadItem[]>([]);

  // cleanup previews
  useEffect(() => {
    return () => items.forEach((i) => URL.revokeObjectURL(i.previewUrl));
  }, [items]);

  useEffect(() => {
    if (!exposeUploadApiRef) return;
    exposeUploadApiRef.current = uploadAll;
    return () => {
      if (exposeUploadApiRef) exposeUploadApiRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, onUpload]);

  const validate = (f: File): string | null => {
    if (!f.type.startsWith("image/")) return "Only image files are allowed.";
    if (f.size > maxSizeMB * 1024 * 1024) return `Max size is ${maxSizeMB} MB.`;
    return null;
  };

  const addFiles = (files: FileList | null) => {
    if (!files || disabled) return;
    const next: UploadItem[] = [...items];
    for (const f of Array.from(files)) {
      if (next.length >= maxFiles) break;
      const err = validate(f);
      next.push({
        id: crypto.randomUUID(),
        file: f,
        previewUrl: URL.createObjectURL(f),
        progress: 0,
        status: err ? "error" : "pending",
        error: err ?? undefined,
      });
    }
    setItems(next);
    onFilesChange?.(
      next.filter((i) => i.status !== "error").map((i) => i.file)
    );
    if (autoUpload && onUpload) void uploadAll();
  };

  const removeOne = (id: string) => {
    const target = items.find((i) => i.id === id);
    if (target) URL.revokeObjectURL(target.previewUrl);
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    onFilesChange?.(
      next.filter((i) => i.status !== "error").map((i) => i.file)
    );
  };

  const uploadAll = async (): Promise<ImageRec[]> => {
    if (!onUpload) return [];
    setBusy(true);
    const results: ImageRec[] = [];
    for (const it of items) {
      if (it.status === "error") continue;
      // mark uploading
      setItems((prev) =>
        prev.map((p) =>
          p.id === it.id ? { ...p, status: "uploading", progress: 0 } : p
        )
      );
      try {
        const image = await onUpload(it.file, (p) => {
          setItems((prev) =>
            prev.map((pItem) =>
              pItem.id === it.id ? { ...pItem, progress: p } : pItem
            )
          );
        });
        results.push(image);
        setItems((prev) =>
          prev.map((p) =>
            p.id === it.id ? { ...p, status: "done", progress: 100 } : p
          )
        );
      } catch (e: any) {
        setItems((prev) =>
          prev.map((p) =>
            p.id === it.id
              ? { ...p, status: "error", error: e?.message ?? "Upload failed" }
              : p
          )
        );
      }
    }
    setBusy(false);
    onUploadComplete?.(results);
    return results;
  };

  return (
    <div className="w-[80%]">
      <div
        role="button"
        tabIndex={0}
        aria-label="Image uploader"
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          if (disabled) return;
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          if (disabled) return;
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        className={[
          "rounded-2xl border-2 border-dashed p-4 md:p-6 transition flex flex-col items-center",
          dragOver ? "border-indigo-500 bg-indigo-50" : "border-gray-300",
          disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
        ].join(" ")}
      >
        <p className="text-lg font-semibold">
          {label}{" "}
          <span className="ml-2 inline-block bg-gray-300 text-gray-500 text-sm px-3 py-1 rounded-full shadow-sm">
            {helperText}
          </span>
        </p>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
          disabled={disabled}
        />

        <div className="mt-3 flex flex-wrap gap-3">
          {items.map((it) => (
            <figure
              key={it.id}
              className="relative w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden border"
            >
              <img
                src={it.previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              {it.status !== "done" && (
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="h-1 bg-gray-200">
                    <div
                      className="h-1 bg-green-600 transition-all"
                      style={{ width: `${it.progress}%` }}
                    />
                  </div>
                </div>
              )}
              <button
                type="button"
                aria-label="Remove image"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!disabled && !busy) removeOne(it.id);
                }}
                className="absolute right-1 top-1 rounded-full bg-white/90 px-2 py-0.5 text-xs shadow cursor-pointer"
              >
                ✕
              </button>
              {it.status === "error" && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-red-600/90 text-white text-[11px] px-1 py-0.5">
                  {it.error}
                </figcaption>
              )}
            </figure>
          ))}

          {items.length < maxFiles && (
            <CameraAlt className="text-gray-300 !w-16 !h-16 my-10" />
          )}
        </div>
      </div>
      {onUpload && (
        <div className="mt-3 flex items-center justify-end gap-2">
          <button
            type="button"
            disabled={busy || disabled}
            onClick={uploadAll}
            className={`rounded-xl px-4 py-2 text-white ${
              busy || disabled
                ? "bg-gray-400"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {busy ? "Uploading…" : "Upload"}
          </button>
        </div>
      )}
    </div>
  );
};
