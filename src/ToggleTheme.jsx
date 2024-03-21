import { useColorMode } from "@chakra-ui/react";
import React from "react";
import { Button } from "@chakra-ui/react"; // Make sure Button is imported
import { MdOutlineDarkMode } from "react-icons/md";
import { Switch } from "@chakra-ui/react";

const ThemeToggle = () => {
  const { toggleColorMode } = useColorMode(); // Move inside the functional component
  return (
    <Button
      position={"fixed"}
      bottom={"3"}
      right={"3"}
      borderRadius={"10rem"}
      background={"transparent"}
      onClick={toggleColorMode}
    >
      <MdOutlineDarkMode />
    </Button>
  );
};

export default ThemeToggle;
