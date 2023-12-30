import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import {
  Box,
  Heading,
  Divider,
  VStack,
  Text,
  InputGroup,
  Input,
  Button,
  Avatar,
  Flex,
} from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';

const StudentComment = () => {
    const initialComments = [
        {
          id: 1,
          user: 'John Doe',
          comment: 'This is a comment.',
        },
        {
          id: 2,
          user: 'Alice',
          comment: 'Another comment here.',
        },
        // Add more comments as needed
      ];
      
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:8000/comments')
//       .then((response) => {
//         setComments(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching comments:', error);
//       });
//   }, []);

//   const user = user; 

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    const newCommentObj = {
      id: comments.length + 1,
      user: "Current User",
      comment: newComment,
    };


    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Box className="messages-container" width="40%">
        <Heading as="h1" size="2rem" mb="4">
          Comment
        </Heading>
        <Divider />
        <VStack spacing="4" className="feedback-container" alignItems="center" width="70%">
          {comments.map((comment) => (
            <Box key={comment.id} width="100%" borderRadius="lg" p="2" bg="gray.100">
              <Flex alignItems="center" mb="2">
                <Avatar size="sm" name={comment.user} mr="2" />
                <Text fontSize="sm" fontWeight="bold">
                  {comment.user}
                </Text>
              </Flex>
              <Text fontSize="md">{comment.comment}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
      {/* Add Comment Section */}
      <Box p="2" display="flex" alignItems="center" width="50rem">
        <InputGroup flex="1">
          <Input
            borderRadius="3rem"
            placeholder="Add a class comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            size="lg"
            ml="1rem"
            h="3rem"
            onClick={handleAddComment}
            leftIcon={<FiSend />}
            background="transparent"
          ></Button>
        </InputGroup>
      </Box>
    </Box>
  );
};

export default StudentComment;
