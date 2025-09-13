/** @jsx jsx */
import { jsx, Box, Heading, Text } from 'theme-ui'
import * as React from 'react'
import { useState } from 'react'
import { Link } from 'gatsby'

const projects = [
  {
    title: 'SchemaScribe',
    description: 'A simple, fast, and focused tool for generating and annotating JSON Schemas.',
    link: 'https://schemascribe.tfeuerbach.dev',
    image: '/media/projects/placeholder-square.jpg',
  },
  {
    title: 'Steam Wallpaper',
    description: 'A web app to search for and download high-resolution wallpapers from Steam.',
    link: 'https://steamwallpaper.com',
    image: '/media/projects/placeholder-square.jpg',
  },
  {
    title: 'Track Titan Downloader',
    description: 'A GUI application for downloading iRacing setups in bulk from TrackTitan.io.',
    link: 'https://tfeuerbach.github.io/track-titan-downloader',
    image: '/media/projects/placeholder-square.jpg',
  },
  {
    title: 'Stay on 23H2',
    description: 'A script to prevent Windows from upgrading beyond version 23H2 to maintain Windows Mixed Reality support.',
    link: 'https://github.com/tfeuerbach/stay-on-23h2',
    image: '/media/projects/placeholder-square.jpg',
  },
  {
    title: 'FIP Radio Discord Bot',
    description: 'A Discord bot that streams Radio France’s FIP stations into a voice channel.',
    link: 'https://fip-bot.tfeuerbach.dev',
    image: '/media/projects/placeholder-square.jpg',
  },
  {
    title: 'Virginia Tech Email Saver',
    description: 'A self-hosted program to automatically log into a Virginia Tech email account to prevent deactivation.',
    link: 'https://github.com/tfeuerbach/virginiatech-email-saver',
    image: '/media/projects/placeholder-square.jpg',
  },
  {
    title: 'Feuerbach Wedding',
    description: 'The official website for our wedding, providing guests with event details and RSVP options.',
    link: 'https://feuerbachwedding.com',
    image: '/media/projects/placeholder-square.jpg',
  },
]

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'lg',
        boxShadow: 'lg',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 'xl',
        },
        display: 'block',
        aspectRatio: '1 / 1',
        width: ['100%', '45%', '30%'],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={project.image}
        alt={project.title}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'filter 0.3s ease',
          filter: isHovered ? 'brightness(0.4)' : 'brightness(0.85)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
          textAlign: 'center',
          color: 'white',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <Text sx={{ fontSize: 2 }}>{project.description}</Text>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
          textAlign: 'center',
          color: 'white',
          opacity: isHovered ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      >
        <Heading as="h3" sx={{ fontSize: 4 }}>{project.title}</Heading>
      </Box>
    </a>
  )
}

const ProjectGrid = () => (
  <Box
    sx={{
      display: `flex`,
      flexWrap: `wrap`,
      justifyContent: `center`,
      gap: 4,
      mt: [4, 5],
    }}
  >
    {projects.map((project) => (
      <ProjectCard key={project.title} project={project} />
    ))}
  </Box>
)

export default ProjectGrid
