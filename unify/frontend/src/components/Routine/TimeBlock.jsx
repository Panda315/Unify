import { 
    Box,
    GridItem
} from '@chakra-ui/react';

const TimeBlock = ({ time, day, classes }) => {
    const classInfo = classes.find(
        (cls) =>
            cls.weekday === day &&
            cls.startTime === time
    )

    return (
        <Box
            border="1px solid black"
            minHeight="50px"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            {classInfo && `${classInfo.courseName} (Room ${classInfo.room})`}
        </Box>
    )
}

export default TimeBlock;