import React, { useState } from 'react';
import { validateFile, formatFileSize } from '../../utils/helpers';

const DropArea = ({ processFile, loading }) => {
  const [dropAreaActive, setDropAreaActive] = useState(false);
  const [file, setFile] = useState();
  const [fileError, setFileError] = useState({
    status: false,
    message: '',
  });

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
    validateFile(file, setFileError);
  };

  return (
    <div className="App__inputs">
      <div
        data-testid="droparea"
        className={`droparea ${dropAreaActive ? 'active' : ''} ${
          fileError.status ? 'error' : ''
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setDropAreaActive(true)}
        onDragLeave={() => setDropAreaActive(false)}
      >
        {!file && 'DROP FILE HERE'}
        {file && (
          <div className="file-details">
            {file.name} {formatFileSize(file.size)}
          </div>
        )}
      </div>
      {fileError.message && (
        <div data-testid="error-message" className="error">
          {fileError.message}
        </div>
      )}

      <button
        onClick={() => {
          processFile(file);
        }}
        data-testid="show-addresses"
        disabled={!file || fileError.status || loading}
        className="btn btn-primary"
      >
        Show Addresses
      </button>
    </div>
  );
};

export default DropArea;
