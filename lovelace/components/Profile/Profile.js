import React from 'react'
import Image from 'next/image'
import { Text, Heading, Stack, Box, Link} from '@chakra-ui/react'
import linkedin from '../../assets/images/linkedin.png'
import github from '../../assets/images/github.png'

export const Profile = ({ profile, profileType }) => {
  return (
    <Box>
      <Box maxWidth="340px" textAlign="center">
        <Heading as='h2' size='xl' fontFamily='Bebas Neue, cursive' mb='8px' color='#2B7DE9'><u>{profileType}</u></Heading>
        <Heading as="h3" size="md">{profile.name}, {profile.age}</Heading>
        <Text color="#999999">{profile.state}, BR</Text>
        <Text color="#999999">{profile.email}</Text>
        <Box d="flex" justifyContent="center">
          <Box d="flex" w="56px" justifyContent="space-between" my="8px">
            <Link href={profile.linkedin} isExternal>
              <Image width={24} height={24} src={linkedin} />
            </Link>
            <Link href={profile.github} isExternal>
              <Image width={24} height={24} src={github} />
            </Link>
          </Box>
        </Box>
        <Box d="flex" justifyContent="center">
          <Box border="2px solid #2B7DE9" borderRadius="12px" p="1em 3em 1em 3em" w="400px" maxWidth="300px" alignSelf="center">
            <Stack spacing={2}>
              {profile.company && 
                <Box d="flex" justifyContent="space-between">
                  <Text as="b" textAlign="left">Empresa</Text> 
                  <Text textAlign="right">{profile.company}</Text>
                </Box>
              }
              {profile.marketTime &&
                <Box d="flex" justifyContent="space-between">
                    <Text as="b" textAlign="left">Tempo de mercado</Text> 
                    <Text textAlign="right">{profile.marketTime}</Text>
                </Box>
              }
              {profile.skills.length !== 0 &&
                <Box d="flex" justifyContent="space-between">
                    <Text as="b" textAlign="left">Competências</Text> 
                    <Text textAlign="right">{profile.skills.join(', ')}</Text>
                </Box>
              }
              {profile.interests.length !== 0 &&
                <Box d="flex" justifyContent="space-between">
                    <Text as="b" textAlign="left">Quer desenvolver</Text> 
                    <Text textAlign="right">{profile.interests.join(', ')}</Text>
                </Box>
              }
            </Stack>
          </Box>
        </Box>
      </Box>
      </Box>
  )
}

export default Profile