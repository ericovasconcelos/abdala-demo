import { useEffect, useState } from "react";
import { Head } from "../../components/Head";
import {
    Box,
    Flex,
    Spinner,
    SimpleGrid,
    Input,
    Button,
    Heading,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Icon
} from '@chakra-ui/react';
import { Sidebar } from "../../components/Sidebar";
import fs from 'fs';

import { RiSearchLine } from 'react-icons/ri';
import data from '../../../data/mrs/summary/6124003faa4aac000c990571.json';
import ChartLawsuits from "../../components/ChartLawsuits";
import path from "path";
import { Interface } from "readline";
import { GetServerSideProps } from 'next'

const years = Object.values(data.distribution.year);
const yearsLabels = Object.keys(data.distribution.year);

const justiceField = Object.values(data.distribution.justice_field);
const justiceFieldLabels = Object.keys(data.distribution.justice_field);

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { entity } = context.query;
    console.log(fs.readdirSync(`.`));
    return {
        notFound: true,
      }
    if (entity === 'mrs' || entity === 'votorantim' || entity === 'abril') {


        const jsonFiles = await fs.readdirSync(`./data/mrs/lawsuits_labor_justice`).filter((lawsuitFile: string) => path.extname(lawsuitFile).toLowerCase() === '.json');
        const data = await Promise.all(jsonFiles.map(jsonFile => JSON.parse(fs.readFileSync(`./data/mrs/lawsuits_labor_justice/${jsonFile}`, 'utf8'))));

        return {
            props: {
                lawsuits: data,
            },
        };

    } else {
        return {
            notFound: true,
          }
    }
}

interface DashboardProps {
    lawsuits: any;
}

const Dashboard = ({ lawsuits }: DashboardProps) => {
    const { search_term, distribution, total_cnj_numbers } = data;
    const [searchTerm, setSearchTerm] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [filteredLawsuits, setFilteredLawsuits] = useState(lawsuits);
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: any) => { setInputValue(e.target.value) };
    const handleClick = (e: any) => { setIsLoading(true); setSearchTerm(inputValue) };

    useEffect(() => {
        if (searchTerm.length > 3) {
            const newFilteredLawsuits = lawsuits.filter((lawsuit: any) =>
                lawsuit.activity.filter(
                    (activity: any) => activity.text.includes(searchTerm)
                ).length > 0);
            setFilteredLawsuits(newFilteredLawsuits);
        } else {
            setFilteredLawsuits(lawsuits);
        }
        setIsLoading(false);
    }, [searchTerm, lawsuits]);



    return (
        <Flex
            h='100vh'
            direction="column"
        >
            <Head />
            <Flex
                w="100%"
                maxWidth={1480}
                my="6"
                mx="auto"
                px="6">
                <Sidebar />

                <Box flex='1' borderRadius="8" bg="gray.800" p="8">
                    <Heading as='h1' size='xl' isTruncated>{search_term}</Heading>
                    {/* <Heading as='h1' size='xl' isTruncated>{distribution}</Heading> */}
                    <Text as='h1' size='xl' isTruncated>Total de CNPJ: {total_cnj_numbers}</Text>

                    <SimpleGrid flex="1" minChildWidth="320px" gap="4" >
                        <Box p="8" bg='gray.800' borderRadius='8' pb="2" >
                            <Text>Distribuição por ano</Text>
                            <ChartLawsuits seriesData={years} categoriesData={yearsLabels} type="area" isDate={true} />
                        </Box>
                        <Box p="8" bg='gray.800' borderRadius='8' pb="2">
                            <Text>Distribuição por ramo da justiça</Text>
                            <ChartLawsuits seriesData={justiceField} categoriesData={justiceFieldLabels} type="bar" />
                        </Box>
                    </SimpleGrid>

                    <Flex
                        as='label'
                        flex="1"
                        maxWidth="400"
                        alignSelf={"center"}
                        py="4"
                        ml="6"
                        px="8"
                        backgroundColor="gray.800"
                        position="relative"
                        color="gray.200"
                        borderRadius='full'
                    >
                        <Input
                            variant="unstyled"
                            color="gray.50"
                            placeholder="Pesquisar em atividades"
                            _placeholder={{
                                color: 'gray.400'
                            }}
                            value={inputValue}
                            onChange={handleChange}
                        ></Input>
                        <Button
                            variant="unstyled"
                            color="gray.50"
                            onClick={handleClick}
                        >
                            <Icon as={RiSearchLine} fontSize="20" />
                        </Button>

                    </Flex>


                    {isLoading ? <Text align="center"><Spinner /></Text> : <>
                        <Flex
                            ml="auto"
                            align="center"
                        >
                            <Text fontSize="xl" fontWeight="bold">Total de processos: {filteredLawsuits.length}</Text>
                        </Flex>

                        <Accordion allowToggle>
                            {filteredLawsuits.map((lawsuit: any) => {
                                return (
                                    <AccordionItem key={lawsuit.id}>
                                        <h2>
                                            <AccordionButton>
                                                <Box flex='1' textAlign='left'>
                                                    {lawsuit.lawsuit.number} - {lawsuit.lawsuit.court} - ({lawsuit.lawsuit.activityCount} atividades) - {lawsuit.lawsuit.nature.normalized ? lawsuit.lawsuit.nature.normalized : ''}
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <Table size='sm'>
                                                <Thead>
                                                    <Tr>
                                                        <Th>DATA</Th>
                                                        <Th>ATIVIDADE</Th>
                                                    </Tr>
                                                </Thead>

                                                <Tbody>
                                                    {lawsuit.activity.map((activity: any) =>
                                                        <Tr key={activity.id}>
                                                            <Td>{new Date(activity.date).toLocaleDateString()}</Td>
                                                            <Td>{activity.text}</Td>
                                                        </Tr>
                                                    )}
                                                </Tbody>

                                            </Table>
                                        </AccordionPanel>
                                    </AccordionItem>
                                )
                            })}
                        </Accordion>
                    </>
                    }

                </Box>
            </Flex>


        </Flex>
    )
}

export default Dashboard;