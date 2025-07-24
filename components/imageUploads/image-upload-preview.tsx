"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, X, ImageIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

interface ImageUploadPreviewProps {
  onImageSelect?: (file: File | null) => void;
  maxSize?: number;
  acceptedTypes?: string[];
  className?: string;
  previewMode?: "cover" | "contain" | "auto";
  previewImageLink?: string;
}

export default function ImageUploadPreview({
  onImageSelect,
  maxSize = 5,
  acceptedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
  className = "",
  previewMode = "contain",
  previewImageLink,
}: ImageUploadPreviewProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageLoadError, setImageLoadError] = useState(false);

  useEffect(() => {
    setImageLoadError(false);
  }, [previewImageLink]);

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return "Desteklenmeyen dosya formatı. Lütfen JPEG, PNG, GIF veya WebP formatında bir resim seçin.";
    }

    if (file.size > maxSize * 1024 * 1024) {
      return `Dosya boyutu ${maxSize}MB'dan büyük olamaz.`;
    }

    return null;
  };

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setSelectedFile(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    onImageSelect?.(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setError(null);
    onImageSelect?.(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const truncateFileName = (fileName: string, maxLength = 25): string => {
    if (fileName.length <= maxLength) return fileName;

    const extension = fileName.split(".").pop() || "";
    const nameWithoutExt = fileName.slice(0, fileName.lastIndexOf("."));
    const truncatedName =
      nameWithoutExt.slice(0, maxLength - extension.length - 4) + "...";

    return `${truncatedName}.${extension}`;
  };

  const handleImageError = () => {
    setImageLoadError(true);
  };

  const handleImageLoad = () => {
    setImageLoadError(false);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="space-y-4">
        {!previewUrl && (!previewImageLink || imageLoadError) ? (
          <Card
            className={`border-2 border-dashed transition-colors cursor-pointer ${
              isDragOver
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={openFileDialog}
          >
            <CardContent className="flex flex-col items-center justify-center p-6 text-center h-32">
              <div className="mb-4 rounded-full bg-muted p-4">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Resim yüklemek için tıklayın veya sürükleyip bırakın
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, GIF, WebP (max {maxSize}MB)
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card
            className={`overflow-hidden transition-colors ${
              isDragOver ? "ring-2 ring-primary ring-offset-2" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CardContent className="p-0">
              <div className="relative bg-muted/10 h-32">
                <Image
                  src={previewUrl || previewImageLink || "/placeholder.svg"}
                  alt="Preview"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  width={256}
                  height={256}
                  className={`w-full h-full ${
                    previewMode === "cover"
                      ? "object-cover"
                      : previewMode === "contain"
                      ? "object-contain"
                      : "object-scale-down"
                  }`}
                />
                {previewUrl && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                {isDragOver && (
                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                    <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium">
                      Resmi buraya bırakın
                    </div>
                  </div>
                )}
              </div>
              <div className="p-2 sm:p-4 space-y-2">
                {selectedFile && (
                  <>
                    <TooltipProvider>
                      <div className="flex items-center gap-2 min-w-0">
                        <ImageIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-sm font-medium truncate cursor-help">
                              {truncateFileName(selectedFile.name)}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs break-all">
                              {selectedFile.name}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Input
          ref={fileInputRef}
          id="image-upload"
          type="file"
          accept={acceptedTypes.join(",")}
          onChange={handleInputChange}
          className="hidden"
        />

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}

        {(previewUrl || previewImageLink) && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={openFileDialog}
              className="w-full bg-transparent"
            >
              <Upload className="h-4 w-4 mr-2" />
              Resim Yükle
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
