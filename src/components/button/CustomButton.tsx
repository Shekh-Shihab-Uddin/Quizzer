import { Button } from "@chakra-ui/react";

type CustomButtonProps = {
  onClick: () => void;
  text: string;
  colorPalette?: string;
  icon?: JSX.Element;
};

const CustomButton = ({
  onClick,
  text,
  colorPalette = "yellow",
  icon,
}: CustomButtonProps) => {
  return (
    <Button colorPalette={colorPalette} onClick={onClick}>
      {text} {icon}
    </Button>
  );
};

export default CustomButton;
