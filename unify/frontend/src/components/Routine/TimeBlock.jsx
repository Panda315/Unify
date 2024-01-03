import { 
    Box,
    GridItem
} from '@chakra-ui/react';

const TimeBlock = ({ time, day, classes }) => {
    const classInfo = classes.find(
        (cls) =>
            cls.WeekDay === day &&
            cls.StartTime === time
    )

    return (
        <Box
            border="1px solid black"
            minHeight="50px"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            {classInfo && `${classInfo.Course} (Room ${classInfo.RoomNo})`}
        </Box>
    )
}

export default TimeBlock;