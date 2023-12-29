// import React, { useState } from 'react';
// import { Box, Button, Heading, Text } from '@chakra-ui/react';
// import UserProfile from '../Profile/UserProfile';
// import Navbar from './Navbar';
// import FeatureCoursesSlider from './FeatureCourses';
// import FeatureCoursesDescription from './FeatureCourseDescription';
// import FileUpload from '../FIleUpload/FileUpload';

// const OpenSchool = () => {
  

//   return (
//     <div>
//       <Navbar/>
//       <FeatureCoursesDescription />
//       <FeatureCoursesSlider/>
//       <div className='OpenSchoolFileUpload'>
//       <FileUpload/>
//       </div>
//     </div>
//   );
// };

// export default OpenSchool;



import React from 'react';
import { Box, Button, Heading, Text, Flex } from '@chakra-ui/react';
import UserProfile from '../Profile/UserProfile';
import Navbar from './Navbar';
import FeatureCoursesSlider from './FeatureCourses';
import FeatureCoursesDescription from './FeatureCourseDescription';
import FileUpload from '../FIleUpload/FileUpload';

const OpenSchool = () => {
  return (
    <div>
      <Navbar />
      <FeatureCoursesDescription />
      <FeatureCoursesSlider />
      <Flex justifyContent="flex-end" alignItems="flex-end" padding={10}>
        <Text>Upload your course</Text>
        <FileUpload />
      </Flex>
    </div>
  );
};

export default OpenSchool;
