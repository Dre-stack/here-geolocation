export const validateFile = (file, setFileError) => {
  setFileError({ status: false, message: '' });
  if (file.type !== 'application/json') {
    setFileError({
      status: true,
      message: 'Invalid file format, Only Json files allowed',
    });
  }
  if (file.size > 1048576) {
    setFileError((previousError) => {
      const message = previousError.message
        ? `${previousError.message};
         File too large, max size allowed is 1MB`
        : 'File too large, max size allowed is 1MB';
      return {
        status: true,
        message,
      };
    });
  }
};

export const formatFileSize = (size) => {
  if (size < 1024) {
    return `${size}bytes`;
  }
  if (size >= 1024 && size < 1048576) {
    return `${(size / 1024).toFixed(2)}Kb`;
  }
  if (size > 1048576) {
    return `${(size / 1048576).toFixed(2)}Mb`;
  }
};
