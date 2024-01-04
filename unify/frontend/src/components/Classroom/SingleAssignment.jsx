import React from 'react';
import { Text } from '@chakra-ui/react';
import DisplayPDF from './DisplayPdf';
function SingleAssignment() {
  // Retrieve assignment data from session storage
  const assignmentsData = JSON.parse(sessionStorage.getItem('assignmentsData'));
  console.log(assignmentsData); // Log the assignment data

  return (
    <div>
      {assignmentsData ? (
        <div>
          {/* Render assignment details using assignmentsData */}
          <Text>{JSON.stringify(assignmentsData[0].description)}</Text>
          {/* Render other details as needed */}
        </div>
      ) : (
        <div>
          <Text>No assignment data available</Text>
        </div>

        
      )}
      {assignmentsData[0].uploaded_file ? (
                    <DisplayPDF pdfBase64String={assignmentsData[0].uploaded_file} />
                  ) : (
                    <Text>Not a PDF file</Text>
                  )}
    </div>
  );
}

export default SingleAssignment;
