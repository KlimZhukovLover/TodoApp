import { Box, Button, ButtonGroup, Flex, Heading } from "@chakra-ui/react";


const Navbar = ({ onOpen, showCompleted, showComplete }) => {

    return (
        <Box  height="100%" p="3" bg="blue.100">
            <Box  maxW="3xl" mx="auto">
                <Flex
                    as="nav"
                    aria-label="navigation"
                    align="center"
                    justify="space-between"
                >
                    <Heading>TodoApp</Heading>
                    <Box  borderRadius="10px 100px / 120px" p="5" bg="gray.100">
                        <Button colorScheme="blue" mr="10" onClick={onOpen}>Add Todo</Button>
                        <Button colorScheme={showComplete == false ? "green" : "yellow"}
                            onClick={showCompleted}>Show {showComplete ? "Incomplete" : "Complete"}</Button>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export default Navbar;