import { Heading, Flex, Box } from "@chakra-ui/react";
import { Slider } from "../components/ui/slider";
import { IoIosArrowForward } from "react-icons/io";

import { useState } from "react";
import CustomButton from "../components/button/CustomButton";

type PropsType = {
  defaultValue: number;
  max: number;
  min: number;
  step: number;
  onClickNext: (amount: number) => void;
};

const SetQuestionQuantity = (p: PropsType) => {
  const [sliderValue, setSliderValue] = useState<number>(p.defaultValue);

  const renderMarks = (): { value: number; label: string }[] => {
    const marks = [];
    for (let i = p.min; i <= p.max; i += p.step) {
      marks.push({ value: i, label: i.toString() });
    }
    return marks;
  };

  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as="h1" fontSize="3xl" mb={5} color={"black"}>
          How many questions?
        </Heading>
        <Slider
          min={p.min}
          max={p.max}
          step={p.step}
          value={[sliderValue]}
          defaultValue={[p.defaultValue]}
          size="md"
          width="300px"
          colorPalette="yellow"
          variant="solid"
          marks={renderMarks()}
          onValueChange={(details) => setSliderValue(details.value[0])}
        />
      </Flex>
      <Box position={"absolute"} top={{ sm: "92%", lg: "80%" }} right="10%">
        <CustomButton
          onClick={() => {
            p.onClickNext(sliderValue);
          }}
          icon={<IoIosArrowForward />}
          text="Set Catagory"
        />
      </Box>
    </>
  );
};

export default SetQuestionQuantity;
