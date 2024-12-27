import { useState } from "react";
import { QuizCategory } from "../interfaces/quizType";
import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import { Radio, RadioGroup } from "../components/ui/radio";
import CustomButton from "../components/button/CustomButton";

const SetQuestionCatagory = (p: {
  categories: QuizCategory[];
  onClickNext: (selectedCategoryId: string) => void;
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    p.categories[0].id.toString()
  );

  const radioList = p.categories?.map((category: QuizCategory) => {
    return (
      <Radio
        key={category.id}
        value={category.id.toString()}
        fontWeight={"semibold"}
      >
        {category.name}
      </Radio>
    );
  });

  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as="h1" fontSize="3xl" mb={5} color={"black"}>
          Select a Topic
        </Heading>

        <RadioGroup
          display={"flex"}
          justifyContent={"center"}
          value={selectedCategoryId}
          onValueChange={({ value }) => setSelectedCategoryId(value)}
          colorPalette={"yellow"}
        >
          <SimpleGrid columns={[1, 3, 4]} gap="4">
            {radioList}
          </SimpleGrid>
        </RadioGroup>
      </Flex>
      <Box position={"absolute"} top={{ sm: "92%", lg: "80%" }} right="10%">
        <CustomButton
          onClick={() => {
            p.onClickNext(selectedCategoryId);
          }}
          icon={<IoIosArrowForward />}
          text="Set Difficulty"
        />
      </Box>
    </>
  );
};

export default SetQuestionCatagory;
