import React, { useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';

function DisplayPDF({ pdfBase64String }) {
  const [pdfURL, setPdfURL] = useState('');

  useEffect(() => {
    try {
      const binaryString = atob(pdfBase64String);
      const binaryData = new Uint8Array(binaryString.length);

      for (let i = 0; i < binaryString.length; i++) {
        binaryData[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([binaryData], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfURL(url);
      console.log("success decoding pdf")
    } catch (error) {
      console.error('Error decoding PDF:', error);
    }
  }, [pdfBase64String]);

  return (
    <div>
      {pdfURL ? (
        <embed src={pdfURL} type="application/pdf" width="100%" height="500px" />
      ) : (
        <Text>Error displaying PDF</Text>
      )}
    </div>
  );
}

export default DisplayPDF;
    