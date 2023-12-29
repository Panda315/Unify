import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Heading, Text } from '@chakra-ui/react';

const FeatureCoursesSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const featureCourses = [
    { id: 1, title: 'Course 1', description: 'Description for Course 1', image: 'https://media.istockphoto.com/id/1002018094/photo/rear-view-of-business-people-attending-a-seminar-in-board-room.jpg?s=612x612&w=0&k=20&c=oTPHt7HWmTvEcrPy-evfd9_yYFXQzRSw6J7qh0TKp0Q=' },
    { id: 2, title: 'Course 2', description: 'Description for Course 2', image: 'https://media.istockphoto.com/id/1408304018/photo/group-of-cheerful-people-on-a-seminar.jpg?s=612x612&w=0&k=20&c=RKm4vcP-sLN4MqIxRjmOA3ZN2NhIUKUEM4oqZWn6cq0=' },
    { id: 3, title: 'Course 3', description: 'Description for Course 3', image: 'https://media.istockphoto.com/id/1434116614/photo/teamwork-diversity-and-sales-manager-planning-branding-ideas-with-a-creative-designer-on-a.jpg?s=612x612&w=0&k=20&c=0qDHz0EDKEgxqcRP7V-YWaGv9nrjKDXG5lz8svrlbcQ=' },
    { id: 4, title: 'Course 4', description: 'Description for Course 4', image: 'https://media.istockphoto.com/id/1299734004/photo/skillful-worker-attending-brief-meeting-in-the-factory.jpg?s=612x612&w=0&k=20&c=A4HZVtx6YbVtD0KRn4N4yI2ORFmSBT-Al8lJhzeCG9Q=' },
    { id: 5, title: 'Course 5', description: 'Description for Course 5', image: 'https://media.istockphoto.com/id/1143540970/vector/human-resource-linear-icon-set-job-hunting-and-employee-search-interview-and-recruitment.jpg?s=612x612&w=0&k=20&c=rhZ_ILFIqag8VdTY2TMS2EfmeQ4Rlq-Z2rpMAFO_f34=' },
  ];
 
  return (
    <Slider {...settings}>
      {featureCourses.map((course) => (
        <Box key={course.id} p={8}>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
            <Box h="200px" w="100%">
              <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
            <Box p={4}>
              <Heading as="h3" size="md" mb={2}>
                {course.title}
              </Heading>
              <Text>{course.description}</Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Slider>
  );
};

export default FeatureCoursesSlider;
