/**
 * Converts a file to a base64 string
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Validates file size and type
 */
export function validateFile(file: File, allowedTypes: string[], maxSizeMB: number): string | null {
  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return `File size exceeds the maximum allowed size of ${maxSizeMB}MB`;
  }

  // Check file type
  const fileType = file.type;
  if (!allowedTypes.includes(fileType)) {
    return `File type ${fileType} is not supported. Allowed types: ${allowedTypes.join(', ')}`;
  }

  return null; // No error
}
