import {
    Alert,
    AlertIcon,
    Button,
    ButtonGroup,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Switch,
    Text,
    Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabaseClient } from "../lib/client";

const ManageTodo = ({ isOpen, onClose, todo, setTodo }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setDescription(todo.description);
            setIsComplete(todo.isComplete);
        }
    }, [todo]);

    const submitHandler = async (event) => {

        event.preventDefault();


        if (todo) {
            await supabaseClient
                .from("todos")
                .update({ title, description, isComplete })
                .eq("id", todo.id);

        } else {
            await supabaseClient
                .from("todos")
                .insert([{ title, description, isComplete }]);

        }


        closeHandler();

    };

    const closeHandler = () => {
        setTitle("");
        setDescription("");
        setIsComplete(false);
        setTodo(null);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={submitHandler}>
                    <ModalHeader>{todo ? "Update Todo" : "Add Todo"}</ModalHeader>
                    <ModalCloseButton onClick={closeHandler} />
                    <ModalBody pb={6}>


                        <FormControl isRequired={true}>
                            <FormLabel>Title</FormLabel>
                            <Input
                                placeholder="Add your title here"
                                onChange={(event) => setTitle(event.target.value)}
                                value={title}
                            />
                        </FormControl>

                        <FormControl mt={4} isRequired={false}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                placeholder="Add your description here"
                                onChange={(event) => setDescription(event.target.value)}
                                value={description}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Is Completed?</FormLabel>
                            <Switch
                                isChecked={isComplete}
                                id="is-completed"
                                onChange={(event) => setIsComplete(!isComplete)}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <ButtonGroup spacing="3">
                            <Button
                                onClick={closeHandler}
                                colorScheme="red"
                                type="reset"

                            >
                                Cancel
                            </Button>
                            <Button colorScheme="blue" type="submit"  >
                                {todo ? "Update" : "Save"}
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default ManageTodo;