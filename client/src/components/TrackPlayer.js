import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import WaveSurfer from 'wavesurfer.js';

export default function TrackPlayer({ files }) {
  const waveformRefs = {
    bass: useRef(null),
    drums: useRef(null),
    vocals: useRef(null),
    other: useRef(null),
  };
  const wavesurfers = {
    bass: useRef(null),
    drums: useRef(null),
    vocals: useRef(null),
    other: useRef(null),
  };
  const tracks = {
    bass: useRef(null),
    drums: useRef(null),
    vocals: useRef(null),
    other: useRef(null),
  };

  const [loadingError, setLoadingError] = useState(false);


      console.log('Files:', files);
  
      // Bass track
      tracks.bass = files.find((file) => file.name === 'bass.wav');
  
      // Drums track
      tracks.drums = files.find((file) => file.name === 'drums.wav');

  
      // Vocals track
      tracks.vocals = files.find((file) => file.name === 'vocals.wav');

  
      // Other track
      tracks.other = files.find((file) => file.name === 'other.wav');


  useEffect(() => {
    Object.keys(tracks).forEach((key) => {
      if (!wavesurfers[key].current && tracks[key].url) {
        wavesurfers[key].current = WaveSurfer.create({
          container: waveformRefs[key].current,
          waveColor: 'rgb(255, 255, 255)',
          progressColor: '#EF4A40',
          backend: 'WebAudio',
          cursorWidth: 1,
          barWidth: 2,
          barHeight: 1,
          responsive: true,
          height: 60,
          normalize: true,
        });

        wavesurfers[key].current.load(tracks[key].url);

        wavesurfers[key].current.on('ready', () => {
          console.log(`${key} WaveSurfer is ready`);
          setLoadingError(false);
        });

        wavesurfers[key].current.on('error', (err) => {
          console.error(`${key} WaveSurfer error:`, err);
          setLoadingError(true); 
        });
      }
    });
  }, [tracks]);

  const handlePlay = (key) => {
    console.log('Attempting to play:', key);
    if (wavesurfers[key].current && tracks[key].ref.current) {
      wavesurfers[key].current.load(tracks[key].ref.current.url);
      wavesurfers[key].current.play();
    } else {
      console.error(`${key} WaveSurfer is not initialized or track not available`);
    }
  };

  const boxStyle = {
    backgroundColor: '#121A1E',
    borderRadius: '8px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
  };

  const titleStyle = {
    color: '#FFF',
    marginRight: '10px',
    paddingLeft: '8px',
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        pt: { xs: 8, sm: 12 },
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 8 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            marginBottom: '20px',
          }}
        >
          <Typography variant="h4" textAlign="center" color="text.primary" pb={3}>
            Enjoy your seperated tracks.
          </Typography>
          <Box sx={{ ...boxStyle }}>
            <Typography variant="h5" sx={titleStyle}>
              Bass
            </Typography>
            <div style={{ width: 'calc(100% - 100px)', display: 'flex', alignItems: 'center' }}>
              <div ref={waveformRefs.bass} style={{ width: '100%', height: '60px' }} />
              <Button
                variant="outlined"
                color="primary"
                href={tracks.bass.url}
                download
                style={{ marginLeft: '10px' }}
              >
                Download
              </Button>
            </div>
          </Box>
          <Box sx={{ ...boxStyle }}>
            <Typography variant="h5" sx={titleStyle}>
              Drums
            </Typography>
            <div style={{ width: 'calc(100% - 100px)', display: 'flex', alignItems: 'center' }}>
              <div ref={waveformRefs.drums} style={{ width: '100%', height: '60px' }} />
              <Button
                variant="outlined"
                color="primary"
                href={tracks.drums.url}
                download
                style={{ marginLeft: '10px' }}
              >
                Download
              </Button>
            </div>
          </Box>
          <Box sx={{ ...boxStyle }}>
            <Typography variant="h5" sx={titleStyle}>
              Vocals
            </Typography>
            <div style={{ width: 'calc(100% - 100px)', display: 'flex', alignItems: 'center' }}>
              <div ref={waveformRefs.vocals} style={{ width: '100%', height: '60px' }} />
              <Button
                variant="outlined"
                color="primary"
                href={tracks.vocals.url}
                download
                style={{ marginLeft: '10px' }}
              >
                Download
              </Button>
            </div>
          </Box>
          <Box sx={{ ...boxStyle }}>
            <Typography variant="h5" sx={titleStyle}>
              Other
            </Typography>
            <div style={{ width: 'calc(100% - 100px)', display: 'flex', alignItems: 'center' }}>
              <div ref={waveformRefs.other} style={{ width: '100%', height: '60px' }} />
              <Button
                variant="outlined"
                color="primary"
                href={tracks.other.url}
                download
                style={{ marginLeft: '10px' }}
              >
                Download
              </Button>
            </div>
          </Box>
        </Box>

        {loadingError && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            Failed to load one or more tracks. Please check the file URLs and try again.
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={() => {
            Object.values(wavesurfers).forEach((wavesurfer) => {
              if (wavesurfer.current) {
                wavesurfer.current.playPause();
              }
            });
          }}
        >
          Play/Pause
        </Button>
      </Container>
    </Box>
  );
}
