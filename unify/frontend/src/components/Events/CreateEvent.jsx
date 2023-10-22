import React, { useState } from 'react';
import {
    Box,
    Heading,
    Input,
    Select,
    Textarea,
    Button
} from '@chakra-ui/react'

function CreateEvent() {
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [invalidDate, setInvalidDate] = useState(false);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value)
        if (startDate < event.target.value) {
            setInvalidDate(true)
        } else {
            setInvalidDate(false)
        }
    }

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value)
        if (startDate > event.target.value) {
            setInvalidDate(true)
        } else {
            setInvalidDate(false)
        }
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    return (
        <>
        <Heading m="10">Create an Event</Heading>
        <Box width="80%" borderWidth={2} margin={10}>
            
            <Box display="flex" alignItems="center" gap={10} margin={10}>
                <Heading as='h4' size='md' width="100px">
                Title
                </Heading>
                <Input
                    width="100%"
                    variant='outline'
                    placeholder='Enter the title of the event'
                    value={title}
                    onChange={handleTitleChange}
                />
            </Box>
            <Box display="flex" alignItems="center" gap={10} margin={10}>
                <Heading as='h4' size='md' width="20%">
                Date
                </Heading>
                <Input
                    isInvalid={invalidDate}
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                />
                <Input
                    isInvalid={invalidDate}
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                />
            </Box>
            <Box display="flex" alignItems="center" gap={10} margin={10}>
                <Heading as='h4' size="md" width={100}>
                Category
                </Heading>
                <Select
                    placeholder='Select category'
                    value={category}
                    onChange={handleCategoryChange}    
                >
                    <option value='Sports'>Sports</option>
                    <option value='Workshop'>Workshop</option>
                    <option value='Orientation'>Orientation</option>
                </Select>
            </Box>
            <Box gap={10} margin={10}>
                <Heading as='h4' size="md" marginBottom="5">
                Description
                </Heading>
                <Textarea
                    size="md"
                    height={200}
                    placeholder="Describe about the event"
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </Box>
            <Box display="flex" alignItems="center" gap={10} margin={10}>
                <Button colorScheme='blue'>Submit</Button>
            </Box>
        </Box>
        </>
    )
}

export default CreateEvent;