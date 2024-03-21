import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { LuPlay, LuPlayCircle } from "react-icons/lu";
import { BsMusicPlayerFill } from "react-icons/bs";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { FiPlayCircle } from "react-icons/fi";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import ThemeToggle from "./ToggleTheme";

// Custom icon component
const CustomIcon = () => {
  return (
    <Box borderRadius={"1rem"} padding={"1rem"} backgroundColor={"green.400"}>
      <Text fontSize={"1.2rem"}>
        🤘🏻 welcome and create something good today.
      </Text>
    </Box>
  );
};

function App() {
  const [videoId, setVideoId] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [localStorageItems, setLocalStorageItems] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showSave, setShowSave] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Fetch items from local storage on component mount
    const items = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("y2focus")) {
        items.push(key.replace("y2focus", ""));
      }
    }
    setLocalStorageItems(items);
  }, []);

  const handleChange = (event) => {
    setVideoId(event.target.value);
    setIsValid(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const videoIdRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = videoId.match(videoIdRegex);

    if (match) {
      const id = match[1];
      setVideoId(id);
    } else {
      setIsValid(false);
    }
    setShowSave(true);
    toast({
      title: "video fetched successfully",
      // description: "We've created your account for you.",
      status: "success",
      duration: 3000,
    });
  };

  const handleSave = () => {
    localStorage.setItem(`y2focus${title}`, videoId);
    setLocalStorageItems([...localStorageItems, title]);
    // setTitle("");
    // setVideoId("");
    onClose();
    toast({
      title: "video saved successfully",
      // description: "We've created your account for you.",
      status: "success",
      duration: 3000,
    });
  };

  const handleItemClick = (id) => {
    setVideoId(localStorage.getItem(`y2focus${id}`));
  };

  // Function to handle deletion of item from local storage
  const handleDeleteItem = (id) => {
    localStorage.removeItem(`y2focus${id}`);
    setLocalStorageItems(localStorageItems.filter((item) => item !== id));
    toast({
      title: "video deleted successfully",
      // description: "We've created your account for you.",
      status: "error",
      duration: 3000,
    });
  };

  return (
    <Box>
      {/* Modal Box*/}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Title of Video</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal Box */}
      <Flex justifyContent={"center"} alignItems={"end"} padding={"2rem"}>
        <Text fontWeight={"600"} fontSize={"50px"}>
          Focus.
        </Text>
        <Text color={"red"} fontWeight={""} fontSize={"15px"}>
          without distractions.
        </Text>
      </Flex>
      <Divider marginBottom={"2rem"} />

      <Flex justifyContent={"center"} marginX={"1rem"} marginBottom={"1rem"}>
        <form onSubmit={handleSubmit}>
          <InputGroup width={"30vw"}>
            <InputLeftElement pointerEvents="none">
              <LuPlayCircle />
            </InputLeftElement>
            <Input
              borderRadius={"1rem"}
              type="text"
              // value={videoId}
              onChange={handleChange}
              placeholder="paste the video url"
            />
          </InputGroup>
        </form>
        <Button
          borderRadius={"2rem"}
          marginX={"10px"}
          type="submit"
          onClick={handleSubmit}
        >
          Play Video
        </Button>
        {showSave && (
          <Button borderRadius={"2rem"} onClick={onOpen}>
            Save
          </Button>
        )}
      </Flex>
      <Flex marginX={"1rem"} justifyContent={"space-evenly"}>
        <Box
          overflow={"hidden"}
          border={"0.2px solid gray"}
          borderRadius={"1rem"}
          height={"100%"}
        >
          <iframe
            width="900"
            height="500vh"
            src={`https://www.youtube.com/embed/${videoId}`}
            title=""
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Box>
        <Box height={"63vh"} overflow={"scroll"}>
          <Text fontSize={"2rem"} fontWeight={"500"}>
            Saved Videos.
          </Text>
          <Flex direction={"column"}>
            {localStorageItems.map((item) => (
              <Box
                width={"20vw"}
                margin={"1rem"}
                // backgroundColor={"gray"}
                textAlign={"left"}
                key={item}
                onClick={() => handleItemClick(item)}
              >
                <Flex
                  cursor={"pointer"}
                  alignItems={"center"}
                  gap={"1rem"}
                  fontSize={"1.2rem"}
                >
                  <Box
                    padding={"0.5rem"}
                    borderRadius={"50%"}
                    backgroundColor={""}
                  >
                    <FiPlayCircle />
                  </Box>
                  <Flex
                    borderRadius={"1rem"}
                    backgroundColor={""}
                    width={"20vw"}
                    justifyContent={"space-between"}
                    padding={".5rem"}
                    alignItems={"center"}
                  >
                    <Text
                      fontSize={"0.9rem"}
                      marginLeft={"0.5rem"}
                      fontWeight={"500"}
                    >
                      {item}
                    </Text>
                    <Box
                      padding={"0.3rem"}
                      borderRadius={"100%"}
                      backgroundColor="red.300"
                      onClick={() => handleDeleteItem(item)}
                    >
                      <MdOutlineDeleteForever />
                    </Box>
                  </Flex>
                </Flex>
                <Divider marginTop={"1rem"} />
              </Box>
            ))}
          </Flex>
        </Box>
      </Flex>
      <Box as="footer" textAlign="center" paddingY={4}>
        <a href="https://www.linkedin.com/in/yogeshvashisth " target="_blank">
          <Text fontSize="sm" color="gray.600">
            🤘🏻
            <span style={{ color: "red", margin: "0 4px" }}>
              yogesh vashisth.
            </span>
          </Text>
        </a>
      </Box>

      <ThemeToggle />
    </Box>
  );
}

export default App;
