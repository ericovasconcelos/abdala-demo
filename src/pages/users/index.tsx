import {
    Box,
    Flex,
    Heading,
    Button,
    Icon,
    Table,
    Thead,
    Tr,
    Th,
    Checkbox,
    Td,
    Text,
    Tbody,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Head } from "../../components/Head";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UserList() {
    return (
        <Box>
            <Head />
            <Flex
                w="100%"
                maxWidth={1480}
                my="6"
                mx="auto"
                px="6">
                <Sidebar />

                <Box flex='1' borderRadius="8" bg="gray.800" p="8">

                    <Flex
                        mb={8}
                        align={"center"}
                        justifyContent="space-between"
                    >
                        <Heading size="lg" fontWeight="normal">Usuários</Heading>
                        <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="teal"
                            leftIcon={<Icon as={RiAddLine} fontSize="20" />}>Criar novo</Button>
                    </Flex>

                    <Table colorScheme="whiteAlpha">
                        <Thead>
                            <Tr>
                                <Th width="8" color="gray.300" px='6'>
                                    <Checkbox colorScheme="teal" />
                                </Th>
                                <Th>Usuário</Th>
                                <Th>Data de cadastro</Th>
                                <Th width="8"></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td px="6">
                                    <Checkbox colorScheme="teal" />
                                </Td>
                                <Td>
                                    <Text fontWeight="bold">Erico Vasconcelos</Text>
                                    <Text fontSize="sm" color="gray.300">ericovasconcelos@gmail.com</Text>
                                </Td>
                                <Td>30 de outubro de 2021</Td>
                                <Td px="6">
                                    <Button
                                        as="a"
                                        colorScheme="teal"
                                        fontSize="sm"
                                        size="sm"
                                        leftIcon={<Icon as={RiPencilLine} />}
                                    >Editar</Button>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                    <Pagination />
                </Box>
            </Flex>
        </Box>
    )
}