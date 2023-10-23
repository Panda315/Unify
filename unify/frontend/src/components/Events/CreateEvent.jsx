import React, { useState, useEffect } from 'react';
import FormatDate from '../../Utils/FormatDate'
import {
    Box,
    Heading,
    Input,
    Select,
    Image,
    Textarea,
    Button
} from '@chakra-ui/react'

function CreateEvent() {
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [invalidDate, setInvalidDate] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetch('http://127.0.0.1:8000/events/category_list/')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error: ', error));
    }, [])

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
        setSelectedCategory(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleImageUpload = (event) => {
        setImage(event.target.files[0])
    }

    const handleSubmit = (event) => {
        const formData = new FormData();

        formData.append('title', title);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('category', selectedCategory);
        formData.append('coverImage', image);
        formData.append('description', description);

        fetch('http://127.0.0.1:8000/events/event_create', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error('Error: ', error)
            })
    }

    return (
        <>
        <Heading m="5">Create an Event</Heading>
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
                    value={FormatDate(startDate)}
                    onChange={handleStartDateChange}
                />
                <Input
                    isInvalid={invalidDate}
                    type="date"
                    value={FormatDate(endDate)}
                    onChange={handleEndDateChange}
                />
            </Box>
            <Box display="flex" alignItems="center" gap={10} margin={10}>
                <Heading as='h4' size="md" width={100}>
                Category
                </Heading>
                <Select
                    placeholder='Select category'
                    value={selectedCategory.name}
                    onChange={handleCategoryChange}    
                >
                    {categories.map(category => (
                        <option value={category.name}>{category.name}</option>
                    ))}
                </Select>
            </Box>
            <Box gap={10} margin={10}>
                <Heading as='h4' size="md" marginBottom="5">
                Cover Image
                </Heading>
                <input type='file' accept='image/*' onChange={handleImageUpload}/>
                {image && (
                    <Image
                        mt="4"
                        src={URL.createObjectURL(image)}
                        alt="Uploaded"
                        maxW='400px'
                    />
                )}
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
                <Button colorScheme='blue' onClick={handleSubmit}>Submit</Button>
            </Box>
        </Box>
        </>
    )
}

export default CreateEvent;