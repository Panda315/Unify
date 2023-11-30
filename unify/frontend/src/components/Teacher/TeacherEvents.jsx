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
        <div style={{ textAlign: "center" }}>
          <button
            onClick={handleAddEventsClick}
            style={{
              marginLeft: "30rem",
              backgroundColor: "green",
              color: "white",
              borderRadius: "10px",
              width: "110px",
              height: "40px",
              border: "none",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Add Events{" "}
            {/* <FontAwesomeIcon icon={faPlus} style={{ marginLeft: '10px' }} /> */}
          </button>
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
