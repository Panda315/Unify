import React, { useState, useEffect } from 'react';

function LoadAssignments({classroomId, token}) {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/downloadfile/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: classroomId,
            token: token,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setAssignments(data);
        } else {
          console.error('Failed to fetch assignments');
        }
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchData();
  }, [classroomId, token]);

  return (
    <div>
      <h2>Assignments</h2>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.id}>
            <p>ID: {assignment.id}</p>
            {/* Render other assignment details here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoadAssignments;