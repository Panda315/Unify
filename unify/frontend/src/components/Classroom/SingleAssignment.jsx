import React, {useState,useEffect} from 'react';
import { Text, Button } from '@chakra-ui/react';
import DisplayPDF from './DisplayPdf';
function SingleAssignment() {
  // Retrieve assignment data from session storage
  const assignmentsData = JSON.parse(sessionStorage.getItem('assignmentsData'));
  console.log(assignmentsData[0].id); // Log the assignment data


  const [submissions, setSubmissions] = useState([]); 
    const [loading, setLoading] = useState(false);
  
    const loadSubmissions = async () => {
      setLoading(true);
      try {
        // Make an API request to fetch submissions from Django backend
        const response = await fetch('http://localhost:8000/loadall/', {
          method: 'POST',
          body: JSON.stringify({ head: assignmentsData[0].id }), // Pass any required data
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setSubmissions(data);
        } else {
          console.error('Failed to fetch submissions');
        }
      } catch (error) {
        console.error('Error fetching submissions:', error);
      } finally {
        setLoading(false);
      }
    };
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

        
<div>
    <Button onClick={loadSubmissions} disabled={loading}>
         Load Submissions
       </Button>

       {submissions.length > 0 ? (
        <div>
          {/* Render submissions */}
          {submissions.map((submission, index) => (
            <div key={index}>
              <Text>{submission.file_name}</Text>
              {submission.uploaded_file ? (
                <DisplayPDF pdfBase64String={submission.uploaded_file} />
              ) : (
                <Text>Not a PDF file</Text>
              )}
              {/* Render other submission details as needed */}
            </div>
          ))}
        </div>
      ) : (
        <Text>No submissions loaded</Text>
      )}
    </div>

    </div>
    
  );
}

export default SingleAssignment;


// import React, { useState } from 'react';
// import { Text, Button } from '@chakra-ui/react';
// import DisplayPDF from './DisplayPdf';

// function SingleAssignment() {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const loadSubmissions = async () => {
//     setLoading(true);
//     try {
//       // Make an API request to fetch submissions from Django backend
//       const response = await fetch('http://localhost:8000/loadall/', {
//         method: 'POST',
//         body: JSON.stringify({ head: 'YOUR_HEAD_DATA' }), // Pass any required data
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setSubmissions(data);
//       } else {
//         console.error('Failed to fetch submissions');
//       }
//     } catch (error) {
//       console.error('Error fetching submissions:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Button onClick={loadSubmissions} disabled={loading}>
//         Load Submissions
//       </Button>

//       {submissions.length > 0 ? (
//         <div>
//           {/* Render submissions */}
//           {submissions.map((submission, index) => (
//             <div key={index}>
//               <Text>{submission.file_name}</Text>
//               {submission.uploaded_file ? (
//                 <DisplayPDF pdfBase64String={submission.uploaded_file} />
//               ) : (
//                 <Text>Not a PDF file</Text>
//               )}
//               {/* Render other submission details as needed */}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <Text>No submissions loaded</Text>
//       )}
//     </div>
//   );
// }

// export default SingleAssignment;
