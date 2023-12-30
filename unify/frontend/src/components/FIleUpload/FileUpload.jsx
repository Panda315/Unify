import React, { useState } from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      let file = selectedFile

      try {
        const response = await fetch('http://localhost:8000/uploadclassroomfile/', {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            file : file.name
          }),
        });

        if (response.ok) {
          setUploadStatus('File uploaded successfully!');
        } else {
          setUploadStatus('File upload failed.');
        }
      } catch (error) {
        setUploadStatus('Error uploading file.');
        console.error('Error uploading file:', error);
      }
    } else {
      setUploadStatus('No file selected.');
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={4}
      w="300px"
      textAlign="center"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      borderColor={isDragging ? 'blue.400' : 'gray.300'}
    >
      
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Box
        cursor="pointer"
        fontSize="32px"
        color="gray.500"
        border="2px dashed"
        borderRadius="md"
        p={4}
        mb={4}
        borderColor={isDragging ? 'blue.400' : 'gray.300'}
        onClick={() => document.querySelector('input[type="file"]').click()}
        onDragEnter={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <Text fontSize="sm">{selectedFile.name}</Text>
        ) : (
          <Text>+</Text>
        )}
      </Box>
      <Button colorScheme="blue" onClick={handleUpload} w="100%">
        Upload
      </Button>
      {uploadStatus && (
        <Text mt={4} color={uploadStatus.includes('failed') ? 'red' : 'green'}>
          {uploadStatus}
        </Text>
      )}
    </Box>
  );
};

export default FileUpload;
