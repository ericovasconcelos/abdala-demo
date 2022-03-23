import { Box, Stack, Text, Link, Icon } from '@chakra-ui/react';
import { RiContactsLine, RiDashboardLine } from 'react-icons/ri';
import NextLink from 'next/link';


export const Sidebar = () => (
    <Box as="aside" w="64" mr="8">
        <Stack spacing="12" align="flex-start">
            <Box>
                <Text fontWeight="bold" color="gray.400" fontSize="small">GERAL</Text>
                <Stack spacing="4" mt="8" align="stretch">
                    <NextLink href="/dashboard">
                        <Link display="flex" >
                            <Icon as={RiDashboardLine} fontSize="20" />
                            <Text ml="4" fontWeight="medium">Dashboard</Text>
                        </Link>
                    </NextLink>
                   
                </Stack>
            </Box>
        </Stack>
    </Box>
);