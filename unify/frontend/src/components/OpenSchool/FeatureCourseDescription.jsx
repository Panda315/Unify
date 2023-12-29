import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const FeatureCoursesDescription = () => {
  return (
    <Box bg="gray.200" p={0} textAlign="right">
      <img src="https://sims.ku.edu.np/ku-drone.jpg" alt="Feature Courses" style={{ width: '100%', height: '50rem' }} />
      <marquee>
      <Text>
      Unlimited access to 7,000+ world-class courses, hands-on
projects, and job-ready certificate programs—all included in
your subscription
      </Text>
      </marquee>
    </Box>
  );
};

export default FeatureCoursesDescription;
