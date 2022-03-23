import { Flex, Button, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <Flex
      h="100vh"
      w="100vp"
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Flex
        as={'form'}
        direction={'column'}
        width="100%"
        maxWidth={360}
        borderRadius="md"
        p="8"
        bgColor="gray.700"
      >
        <Stack spacing="4">
          <Button
            mt="6"
            type="submit"
            colorScheme="teal"
          >Login</Button>
        </Stack>
      </Flex>
    </Flex>
  )
}