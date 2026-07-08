import type { ServiceComponentDef } from "../types";

export const mediaComponents: ServiceComponentDef[] = [
  { id: "image-processor", label: "Image Processor", category: "media" },
  { id: "video-processor", label: "Video Processor", category: "media" },
  { id: "audio-processor", label: "Audio Processor", category: "media" },
  { id: "thumbnail-generator", label: "Thumbnail Generator", category: "media" },
  { id: "ffmpeg", label: "FFmpeg", category: "media" },
  { id: "video-transcoder", label: "Video Transcoder", category: "media" },
];
