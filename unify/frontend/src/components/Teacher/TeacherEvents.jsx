import React, { useState } from "react";
import ViewEvents from "../Events/ViewEvents";
import CreateEvent from "../Events/CreateEvent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const TeacherHome = () => {
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const handleAddEventsClick = () => {
    setShowCreateEvent(true);
  };

  const handleCloseClick = () => {
    setShowCreateEvent(false);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
        {!showCreateEvent ? (
          <div style={{ textAlign: "center" , }}>
         <div
  style={{
    marginTop: "0.5rem",
    marginBottom: "-1.15rem", 
    marginLeft: "1rem",
    backgroundColor: "green",
    color: "white",
    borderRadius: "50%",
    width: "3rem",
    height: "2.5rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <button
    onClick={handleAddEventsClick}
    style={{
      backgroundColor: "transparent",
      border: "none",
      width: "100%",
      height: "100%",
      padding: 0,
      margin: 0,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
            {/* Add Events */}
            <FontAwesomeIcon icon={faPlus} style={{ marginLeft: "1px" }} />
          </button>
          </div>
          <ViewEvents />
        </div>
      ) : (
        <div style={{ margin: "20px" }}>
          <button
            onClick={handleCloseClick}
            style={{
              backgroundColor: "red",
              color: "white",
              borderRadius: "5px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
          <CreateEvent />
        </div>
      )}
    </div>
  );
};

export default TeacherHome;
