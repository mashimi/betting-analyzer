import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Typography, Box } from '@mui/material';

const FileUpload = ({ onUpload }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'application/json',
    multiple: false,
    onDrop: files => files[0] && onUpload(files[0])
  });

  return (
    <Box {...getRootProps()} sx={{
      border: '2px dashed #aaa',
      borderRadius: 2,
      p: 4,
      textAlign: 'center',
      cursor: 'pointer',
      backgroundColor: isDragActive ? '#f5f5f5' : 'transparent'
    }}>
      <input {...getInputProps()} />
      <Button variant="contained" component="span">
        Upload JSON File
      </Button>
      <Typography variant="body1" sx={{ mt: 1 }}>
        {isDragActive ? 'Drop the file here' : 'or drag and drop a JSON file'}
      </Typography>
    </Box>
  );
};

export default FileUpload;
