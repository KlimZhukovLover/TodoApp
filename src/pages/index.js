import { Box, SimpleGrid, Text, HStack, Tag } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import ManageTodo from "../components/ManageTodo";
import SingleTodo from "../components/SingleTodo";
import { supabaseClient } from "../lib/client";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showComplete, setShowComplete] = useState(false);


  useEffect(() => {
    supabaseClient
      .from("todos")
      .select("*, isComplete")
      .eq("isComplete", showComplete)
      .order("id", { ascending: false })
      .then(({ data, error }) => {
        if (!error) {
          setTodos(data);

        }
      });

  });


  const openHandler = (clickedTodo) => {
    setTodo(clickedTodo);
    onOpen();
  };

  const deleteHandler = async (todoId) => {

    await supabaseClient
      .from("todos")
      .delete()
      .eq("id", todoId);
    setTodos(todos.filter((todo) => todo.id !== todoId));


  };

  function showCompleted() {
    setShowComplete(!showComplete)
  }


  return (
    <div>
      <Head>
        <title>Todo List</title>
        <meta
          name="description"
          content=" todoapp to store your tasks"
        />
      </Head>
      <main>
        <Navbar onOpen={onOpen} showCompleted={showCompleted} showComplete={showComplete} />
        <ManageTodo isOpen={isOpen} onClose={onClose} todo={todo} setTodo={setTodo} />
        <HStack m="10" spacing="4" justify="center">
          <Box
          >
            <Tag bg="green.500" borderRadius="3xl" size="sm" mt="1" /> Complete
          </Box>
          <Box>
            <Tag bg="yellow.400" borderRadius="3xl" size="sm" mt="1" />{" "}
            Incomplete
          </Box>
        </HStack>
        <SimpleGrid
          columns={{ base: 2, md: 3, lg: 4 }}
          gap={{ base: "4", md: "6", lg: "8" }}
          m="10"
        >
          {todos.map((todo) => (
            <SingleTodo todo={todo} key={todo.id} openHandler={openHandler} deleteHandler={deleteHandler}
            />
          ))}
        </SimpleGrid>
      </main>
    </div>
  );
};

export default Home;