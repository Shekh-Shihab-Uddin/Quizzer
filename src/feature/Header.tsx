import { Flex, Image } from "@chakra-ui/react";
import logo from "../assets/QuizLogo.png";

const Header = () => {
  return (
    <>
      <Flex justify="center" mb={10}>
        <Image rounded={"md"} h={24} src={logo} zIndex={1} />
      </Flex>
    </>
  );
};

export default Header;
