import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { Center, IconButton, Stack, useMediaQuery } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const sectionsData = [
  {
    title: 'Workshop and Training on “Quantitative Ecology and Lichens Taxonomy”',
    description: 'Workshop and Training on “Quantitative Ecology and Lichens Taxonomy”',
    img:"https://cdn.ku.edu.np/Jbexfubc_Sylre1695108057.cat/17/Workshop_Flyer1695108057.png" ,
    Category:"School of Science"
  },
  {
    title: 'Call for Papers: WTO Chairs Programme - Nepal',
    description:
      'Kathmandu University School of Management announces AIB SOUTH ASIA CONFERENCE - 2024 in collaboration with the Academy of International Business - South Asia Chapter under WTO Chairs Programme-Nepal. The information about the call for papers can be found on the WCP Nepal websites through the following links: ',
    img:"https://cdn.ku.edu.np/JPC_Arcny_Pbasrerapr_Onaare_sbe_XH_Fvgr1692344484.wct/35/WCP_Nepal_Conference_Banner_for_KU_Site1692344484.jpg" ,
    Category:"School of Management"
  },

  {
    title: 'KU-NTIC TECHNO FAIR',
    description:
      'We are thrilled to invite you to the Techno Fair, hosted by the Nepal Technology Innovation Center (NTIC) at Kathmandu University in Dhulikhel. The NTIC, a result of the remarkable KU-IRDP/NTIC initiative supported by a substantial USD 10 million investment from the Korea International Cooperation Agency (KOICA) and skillfully managed by Jeonbuk National University (JBNU), is a cutting-edge research center focused on Energy, Health, and Agriculture.',
    img: "https://cdn.ku.edu.np/Grpuab-Snve-Sylre1689912501.wct/2/Techno-Fair-Flyer1689912501.jpg",
    Category : "School of Science"
    
  },
  {
    title: 'International Conference on Mountain Hydrology and Cryosphere (ICMHC-2023)',
    description: 'For More Information visit the website: https://www.iahs-nepal.org/icmhc-2023',
    img: 'https://cdn.ku.edu.np/vpzup1680841721.wct/17/icmhc1680841721.jpg',
    Category:"School of management"
  },
];

function ViewEvents() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalContent, setModalContent] = useState({ title: '', description: '', img: '' });
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const [displayedEvents, setDisplayedEvents] = useState(2); // Show 2 events by default

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async() => {
      try {
        const response = await fetch('http://127.0.0.1:8000/events/fetch_events/');
        if(!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
    };
    
    fetchEvents();
    console.log(events)
  }, [])

  const openModal = (title, description, img, Category) => {
    setModalContent({ title, description, img , Category});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  function handlePreviousMonth() {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  }

  function handleNextMonth() {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  }
  const handleSeeMore = () => {
    setDisplayedEvents(displayedEvents + 2); //display two more events when see more is clicked
  };
  const handleShowLess = () => {
    setDisplayedEvents(Math.max(displayedEvents - 2, 2)); // reduce the number of displayed events by 2, but ensure at least 2 events are shown
  };
  
  const tileContent = ({ date, view }) => {
    if (view === 'month' && date.getDate() === new Date().getDate()) {
      return <div style={{ borderRadius: '50%', padding: '2px' }}></div>;
    }

   
    if (view === 'month' && date.getDate() === selectedDate.getDate()) {
      return <div style={{ padding: '2px' }}></div>;
    }

    return null;
  };

  return (
    <Box display="flex">
<Box as="section" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      {sectionsData.slice(0, displayedEvents).map((section, index) => (
  <SimpleGrid
    key={index}
    as="section"
    my="2rem"
    border="1px solid black"
    borderRadius="1rem"
    display="flex"
    templateColumns="2fr 2fr"
    ml={isLargerThan768 ? '10%' : '0%'}
    mr={isLargerThan768 ? '10%' : '0%'}
  >
    <Image
      src={section.img}
      alt=""
      borderRadius="xl"
      my="2rem"
      height="10rem"
      width="10rem"
      ml="1rem"
    />
    <Box p="4" display="flexbox">
      <Heading size="lg" my="4">
        {section.title}
      </Heading>
      <Text my="4" display="flexbox">
        {section.description}
      </Text>
      <SimpleGrid my="6" placeItems="center">
        <Button
          colorScheme="blue"
          size="4rem"
          p="2"
          mr="10rem"
          onClick={() =>
            openModal(section.title, section.description, section.img, section.Category)
          }
        >
          Learn more
        </Button>
      </SimpleGrid>
    </Box>
  </SimpleGrid>
))}
   {sectionsData.length > displayedEvents && (
        <Button mt="2" colorScheme="blue" onClick={handleSeeMore}>
          See more
        </Button>
      )}
      {displayedEvents > 2 && (
        <Button mt="2" ml="2"   margin-bottom= "2em"
        colorScheme="red" onClick={handleShowLess}>
          Show less
        </Button>
      )}

    

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{modalContent.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image src={modalContent.img} alt="" borderRadius="xl" mb="2" />
              <Text my="5">{modalContent.description}</Text>
              <Text fontSize='xs' my="4">Category: {modalContent.Category}</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>

      <Center h="80vh" my="1">
        <Box
        
         bg="white"
          w={isLargerThan768 ? '400px' : '70%'}
          flexDir="column"
          ml="3"
        >
          <Stack direction="row" justifyContent="space-between" mb="4">
            <IconButton
              icon={<ChevronLeftIcon />}
              aria-label="Previous Month"
              onClick={handlePreviousMonth}
            />
            <Text fontWeight="bold" fontSize="lg">
              {selectedDate.toDateString()}
            </Text>
            <IconButton
              icon={<ChevronRightIcon />}
              aria-label="Next Month"
              onClick={handleNextMonth}
            />
          </Stack>
          <Calendar onChange={handleDateChange} value={selectedDate} tileContent={tileContent} />
        </Box>
      </Center>
    </Box>
  );
}

export default ViewEvents;
