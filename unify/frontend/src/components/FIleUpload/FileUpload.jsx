// import React, { useState } from 'react';
// import { Box, Button, Heading, Text } from '@chakra-ui/react';

// const FileUpload = () => {


//   const [role, setUserRole] = useState('');
//   const [token, setUserToken] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState('');
//   const [isDragging, setIsDragging] = useState(false);

//   const [isHead, setIsHead] = useState(false); // Default value false

//       useEffect(() => {
//         // Fetch user role from local storage
//         const roleFromStorage = localStorage.getItem('role');
//         if (roleFromStorage) {
//             setUserRole(roleFromStorage);
//         } else {
//             console.error('User role not found in local storage');
//         }

//     }, []);

//     useEffect(() => {
//         const tokenFromStorage = localStorage.getItem('token');
//         if(tokenFromStorage){
//             setUserToken(tokenFromStorage);
//         }
//         else {
//             console.error('User token not found in local storage');
//         }
//     }, [])

//         useEffect(()=>{
//       if(role === 'faculty'){
//         setIsHead(true);
//       }else{
//         setIsHead(false);
//       }
//     },[])


//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };


//   const handleUpload = async () => {
//     if (selectedFile) {
//       const formData = new FormData();
//       formData.append('file', selectedFile);
//       formData.append("token" ,token)
//       formData.append("classroom_id", 3)
//       formData.append("description",)
//       formData.append("is_head", isHead)
//       formData.append("role",role)
//       formData.append("head",1)
//       console.log(formData.get('role'))
//       try {
//         const response = await fetch('http://localhost:8000/uploadclassroomfile/', {
//           method: 'POST',
//           // headers: {
//           //   'Content-Type': 'multipart/form-data',
//           // },          
//           body: formData
//         });
  
//         if (response.ok) {
//           setUploadStatus('File uploaded successfully!');
//         } else {
//           setUploadStatus('File upload failed.');
//         }
//       } catch (error) {
//         setUploadStatus('Error uploading file.');
//         console.error('Error uploading file:', error);
//       }
//     } else {
//       setUploadStatus('No file selected.');
//     }
//   };
  

//   const handleDragEnter = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);

//     const file = e.dataTransfer.files[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };

//   return (
//     <Box
//       borderWidth="1px"
//       borderRadius="md"
//       p={4}
//       w="300px"
//       textAlign="center"
//       onDragEnter={handleDragEnter}
//       onDragOver={handleDragEnter}
//       onDragLeave={handleDragLeave}
//       onDrop={handleDrop}
//       borderColor={isDragging ? 'blue.400' : 'gray.300'}
//     >
      
//       <input
//         type="file"
//         onChange={handleFileChange}
//         style={{ display: 'none' }}
//       />
//       <Box
//         cursor="pointer"
//         fontSize="32px"
//         color="gray.500"
//         border="2px dashed"
//         borderRadius="md"
//         p={4}
//         mb={4}
//         borderColor={isDragging ? 'blue.400' : 'gray.300'}
//         onClick={() => document.querySelector('input[type="file"]').click()}
//         onDragEnter={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={(e) => {
//           e.preventDefault();
//           setIsDragging(false);
//         }}
//         onDrop={handleDrop}
//       >
//         {selectedFile ? (
//           <Text fontSize="sm">{selectedFile.name}</Text>
//         ) : (
//           <Text>+</Text>
//         )}
//       </Box>
//       <Button colorScheme="blue" onClick={handleUpload} w="100%">
//         Upload
//       </Button>
//       {uploadStatus && (
//         <Text mt={4} color={uploadStatus.includes('failed') ? 'red' : 'green'}>
//           {uploadStatus}
//         </Text>
//       )}
//     </Box>
//   );
// };

// export default FileUpload;



// import React, { useState, useEffect } from 'react';
// import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

// const FIleUpload = ({  classroom_id }) => {
//   const [file, setFile] = useState(null);
//   const [description, setDescription] = useState('');
//   const [isHead, setIsHead] = useState(false); // Default value false
//   const [head, setHead] = useState('');
//   const [role, setUserRole] = useState('');
//   const [token, setUserToken] = useState('');

//     useEffect(() => {
//         // Fetch user role from local storage
//         const roleFromStorage = localStorage.getItem('role');
//         if (roleFromStorage) {
//             setUserRole(roleFromStorage);
//         } else {
//             console.error('User role not found in local storage');
//         }

//     }, []);

//     useEffect(() => {
//         const tokenFromStorage = localStorage.getItem('token');
//         if(tokenFromStorage){
//             setUserToken(tokenFromStorage);
//         }
//         else {
//             console.error('User token not found in local storage');
//         }
//     }, [])

//     useEffect(()=>{
//       if(role === 'faculty'){
//         setIsHead(true);
//       }else{
//         setIsHead(false);
//       }
//     },[])

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('token', token);
//     formData.append('classroom_id', classroom_id);
//     formData.append('description', description);
//     formData.append('is_head', isHead);
//     formData.append('role', role);
//     formData.append('head', head);


//     try {
//       const response = await fetch('http://localhost:8000/uploadclassroomfile/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           formData
//         }),
//       });

//       // Handle response as needed
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };


//   return (
//     <Box>
//       <form onSubmit={handleSubmit}>
       
//       <FormControl>
//           <FormLabel>File</FormLabel>
//           <Input type="file" onChange={handleFileChange} />
//         </FormControl>  
      

//         <FormControl>
//           <FormLabel>Description</FormLabel>
//           <Input value={description} onChange={(e) => setDescription(e.target.value)} />
//         </FormControl>

    

//         <Button type="submit">Upload</Button>
//       </form>
//     </Box>
//   );
// };


// export default FIleUpload;



// FileUpload.js

// import React, { useState, useEffect } from 'react';
// import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

// const FileUpload = ({ classroom_id }) => {
//   const [file, setFile] = useState(null);
//   const [description, setDescription] = useState('');
//   const [isHead, setIsHead] = useState(false); // Default value false
//   const [head, setHead] = useState('');
//   const [role, setUserRole] = useState('');
//   const [token, setUserToken] = useState('');

//   useEffect(() => {
//     // Fetch user role from local storage
//     const roleFromStorage = localStorage.getItem('role');
//     if (roleFromStorage) {
//       setUserRole(roleFromStorage);
//     } else {
//       console.error('User role not found in local storage');
//     }

//     const tokenFromStorage = localStorage.getItem('token');
//     if (tokenFromStorage) {
//       setUserToken(tokenFromStorage);
//     } else {
//       console.error('User token not found in local storage');
//     }
//   }, []);

//   useEffect(() => {
//     if (role === 'faculty') {
//       setIsHead(true);
//     } else {
//       setIsHead(false);
//     }
//   }, [role]);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('token', token);
//     formData.append('classroom_id', classroom_id);
//     formData.append('description', description);
//     formData.append('is_head', isHead);
//     formData.append('role', role);
//     formData.append('head', head);

//     try {
//       const response = await fetch('http://localhost:8000/uploadclassroomfile/', {
//         method: 'POST',
//         headers:{
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           formData

//       }),
//       });

//       // Handle response as needed
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   return (
//     <Box>
//       <form onSubmit={handleSubmit}>
//         <FormControl>
//           <FormLabel>File</FormLabel>
//           <Input type="file" onChange={handleFileChange} />
//         </FormControl>

//         <FormControl>
//           <FormLabel>Description</FormLabel>
//           <Input value={description} onChange={(e) => setDescription(e.target.value)} />
//         </FormControl>

//         <Button type="submit">Upload</Button>
//       </form>
//     </Box>
//   );
// };

// export default FileUpload;


import React, { useState, useEffect } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';


const FileUpload = ({classroom_id}) => {
  const [role, setUserRole] = useState('');
  const [token, setUserToken] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [description, setDescription] = useState(''); // State to store file description
  const [isHead, setIsHead] = useState(false); // Default value false
  const [head, setHead] = useState('');


  useEffect(() => {
    // Fetch user role from local storage
    const roleFromStorage = localStorage.getItem('role');
    if (roleFromStorage) {
      setUserRole(roleFromStorage);
    } else {
      console.error('User role not found in local storage');
    }
  }, []);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setUserToken(tokenFromStorage);
    } else {
      console.error('User token not found in local storage');
    }
  }, []);


    useEffect(() => {
    if (role === 'faculty') {
      setIsHead(true);
    } else {
      setIsHead(false);
    }
  }, [role]);

  useEffect(() => {
    if (role === 'faculty') {
      setHead('');
    } else {
      setIsHead(1);
    }
  }, [role]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // const handleUpload = async () => {
  //   if (selectedFile) {
  //   const formData = new FormData();  
  //   formData.append('file', file);
  //   formData.append('token', "dd57877ab4a455f5256ab99a8f6be9c39d420c20");
  //   formData.append('classroom_id', 1);
  //   formData.append('description', "submitting my assignment");
  //   formData.append('is_head', false);
  //   formData.append('role', "student");
  //   formData.append('head', 7);
    

  //     try {
  //       const response = await fetch('http://localhost:8000/uploadclassroomfile/', {
  //         method: 'POST',
  //         body: formData,
  //       });

  //       if (response.ok) {
  //         setUploadStatus('File uploaded successfully!');
  //       } else {
  //         setUploadStatus('File upload failed.');
  //       }
  //     } catch (error) {
  //       setUploadStatus('Error uploading file.');
  //       console.error('Error uploading file:', error);
  //     }
  //   } else {
  //     setUploadStatus('No file selected.');
  //   }
  // };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();  
      formData.append('file', selectedFile);
      formData.append('token', token);
      formData.append('classroom_id', classroom_id);
      formData.append('description', description);
      formData.append('is_head', isHead);
      formData.append('role', role);
      formData.append('head', head);
  
      try {
        const response = await fetch('http://localhost:8000/uploadclassroomfile/', {
          method: 'POST',
          body: formData,
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
  
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={4}
      w="300px"
      textAlign="center"
      borderColor="gray.300"
    >
      <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
      <Box
        cursor="pointer"
        fontSize="32px"
        color="gray.500"
        border="2px dashed"
        borderRadius="md"
        p={4}
        mb={4}
        borderColor="gray.300"
        onClick={() => document.querySelector('input[type="file"]').click()}
      >
        {selectedFile ? (
          <Text fontSize="sm">{selectedFile.name}</Text>
        ) : (
          <Text>+</Text>
        )}
      </Box>
      <input
        type="text"
        placeholder="Enter description"
        value={description}
        onChange={handleDescriptionChange}
        style={{ width: '100%', marginBottom: '10px' }}
      />
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
