import {
    Text,
    Flex,
    Input,
    Icon,
    HStack,
    Stack,
    Avatar,
    Box,
    AspectRatio,
    Image
} from '@chakra-ui/react';
import { RiSearchLine, RiNotificationLine, RiUserAddLine } from 'react-icons/ri';

export const Head = () => (
    <Flex
        as="header"
        w="100%"
        maxWidth={1480}
        h="20"
        px="6"
        mx="auto"
        mt="4"
        align="center"
    >
        <Text
            fontSize="3xl"
            fontWeight="bold"
            letterSpacing="tight"
            w={64}
        >
            <AspectRatio maxW='200px' ratio={5 / 2}>
                <Image src='https://www.abdalaadvogados.adv.br/wp-content/uploads/2019/09/Logo-Abdala-Advogados-Big-1.png' alt='Abdala' objectFit='cover' />
            </AspectRatio>
        </Text>
       
    </Flex>
);