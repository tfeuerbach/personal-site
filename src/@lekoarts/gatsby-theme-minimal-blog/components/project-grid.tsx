/** @jsx jsx */
import { jsx, Box, Heading, Text } from 'theme-ui'
import * as React from 'react'
import { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false)
  const image = getImage(project.image)

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
      <GatsbyImage
        image={image}
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

const ProjectGrid = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/projects/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          frontmatter {
            title
            description
            link
            image {
              childImageSharp {
                gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
              }
            }
          }
        }
      }
    }
  `)

  const projects = data.allMarkdownRemark.nodes.map((node) => node.frontmatter)

  return (
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
}

export default ProjectGrid
