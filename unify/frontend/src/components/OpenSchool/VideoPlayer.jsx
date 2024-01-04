import React from 'react';
import { Box, Button } from '@chakra-ui/react';

const VideoPlayer = () => {
  const videoId = '_VQPFQMhl3s'; // Replace VIDEO_ID_HERE with your YouTube video ID

  const playVideo = () => {
    // Replace 'player' with the ID of the iframe if you want to control it programmatically
    const player = document.getElementById('player');
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  return (
    <Box>
      <Box
        as="iframe"
        id="player"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allowFullScreen
      ></Box>
   
    </Box>
  );
};

export default VideoPlayer;
