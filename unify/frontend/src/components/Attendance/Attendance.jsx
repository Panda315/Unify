import React from 'react';
import {
    Text,
    Button,
} from '@chakra-ui/react';
import useGeolocation from '../../hooks/useGeolocation.js';
import AttendanceSheet from './AttendanceSheet.jsx';
// import "../../styles/attendance.css";

function Attendance() {
    const location = useGeolocation();
    

    const attendanceSession = async() => {
        console.log(location)
        const dateObj = new Date();
        const sessionData = {
            classroom_id: 74,
            latitude: location.coordinates.lat,
            longitude: location.coordinates.lng,
            start_time: dateObj
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/start_session/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sessionData)
            })
            
            if (!response.ok) {
                throw new Error('Failed to start session')
            }
        }
        catch (error) {
            console.log("Error sending data", error);
        }
    }

    return (
        <div>
            {/* {location.loaded ? JSON.stringify(location) : "location data not available!"} */}
            <Text fontSize='4xl'>Attendance</Text>
            <Button type="submit" mt={3} onClick={attendanceSession}>Start Session</Button>
            <div className="attendance-sheet-container">
                <AttendanceSheet />
            </div>
        </div>
    )
}

export default Attendance;