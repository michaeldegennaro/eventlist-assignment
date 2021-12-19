import "./EventList.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import { LogIn } from "../../api/Requests";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  GetEvents,
  CreateEvent,
  DeleteEvent,
  UpdateEvent,
} from "../../api/Requests";

export default function EventList(props) {
  let [events, setEvents] = useState([]);
  let [addEvent, setAddEvent] = useState(false);
  let [isEditing, setIsEditing] = useState("");
  let [rerender, setRerender] = useState(false);

  let [addFrom, setAddFrom] = useState("");
  let [addTo, setAddTo] = useState("");
  let [addContent, setAddContent] = useState("");
  let [addStatus, setAddStatus] = useState(false);

  let [updateEvent, setUpdateEvent] = useState({
    from: "",
    to: "",
    content: "",
    status: "",
    creator: "",
    id: "",
  });

  useEffect(() => {
    GetEvents(props.data.token).then(function (response) {
      setEvents(response.data.result);
    });
  }, []);

  useEffect(() => {
    GetEvents(props.data.token).then(function (response) {
      setEvents(response.data.result);
    });
  }, [rerender]);

  const handleDelete = (id) => {
    DeleteEvent(id, props.data.token).then(function (response) {
      console.log(response.data.result);
      for (let i = 0; i < events.length; i++) {
        if (id == events[i]._id) {
          const filtered = events.filter(
            (itemInArray) => itemInArray._id !== id
          );
          setEvents(filtered);
        }
      }
    });
    setIsEditing(false);
  };

  const handleAddSubmit = () => {
    CreateEvent(
      {
        from: addFrom,
        to: addTo,
        content: addContent,
        isCompleted: addStatus.toString(),
        creator: props.data.userId,
      },
      props.data.token
    ).then(function (response) {
      response.data.data._id = `${response.data.data.id}`;
      setEvents([...events, response.data.data]);
    });
    setAddEvent(false);
  };

  const handleUpdate = (id) => {
    let updateMapEvent = {
      from: "",
      to: "",
      content: "",
      status: "",
      creator: "",
      id: "",
    };
    for (let i = 0; i < events.length; i++) {
      if (id == events[i]._id) {
        setIsEditing("");
        setUpdateEvent({
          from: "",
          to: "",
          content: "",
          status: "",
          creator: "",
          id: "",
        });
        let updatedEvent = mapEvent(events[i], updateMapEvent);
        UpdateEvent(updatedEvent, props.data.token).then(function (response) {
          console.log(response);
          setRerender(!rerender);
        });
      }
    }
  };

  const mapEvent = (event, updateMapEvent) => {
    if (updateEvent.from == "") {
      updateMapEvent = {
        ...updateMapEvent,
        from: event.from,
      };
    } else
      updateMapEvent = {
        ...updateMapEvent,
        from: updateEvent.from,
      };
    if (updateEvent.to == "") {
      updateMapEvent = {
        ...updateMapEvent,
        to: event.to,
      };
    } else
      updateMapEvent = {
        ...updateMapEvent,
        to: updateEvent.to,
      };
    if (updateEvent.content == "") {
      updateMapEvent = {
        ...updateMapEvent,
        content: event.content,
      };
    } else
      updateMapEvent = {
        ...updateMapEvent,
        content: updateEvent.content,
      };
    if (updateEvent.status == "") {
      updateMapEvent = {
        ...updateMapEvent,
        status: event.isCompleted.toString(),
      };
    } else
      updateMapEvent = {
        ...updateMapEvent,
        status: updateEvent.status,
      };
    if (updateEvent.creator == "") {
      updateMapEvent = {
        ...updateMapEvent,
        creator: event.creator,
      };
    } else
      updateMapEvent = {
        ...updateMapEvent,
        creator: updateEvent.creator,
      };
    if (updateEvent.id == "") {
      updateMapEvent = {
        ...updateMapEvent,
        id: event._id,
      };
    } else
      updateMapEvent = {
        ...updateMapEvent,
        id: updateEvent.id,
      };
    return updateMapEvent;
  };

  return (
    <div className="container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>From</StyledTableCell>
              <StyledTableCell align="right">To</StyledTableCell>
              <StyledTableCell align="right">Content</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((row) => (
              <StyledTableRow key={row._id}>
                <>
                  {isEditing != row._id && (
                    <>
                      <StyledTableCell component="th" scope="row">
                        {row.from}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.to}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row.content}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.isCompleted.toString()}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => setIsEditing(row._id)}
                        >
                          Edit
                        </Button>
                      </StyledTableCell>
                    </>
                  )}
                  {isEditing === row._id && (
                    <>
                      <StyledTableCell component="th" scope="row">
                        <input
                          type="date"
                          onChange={(e) =>
                            setUpdateEvent({
                              ...updateEvent,
                              from: e.target.value,
                            })
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {" "}
                        <input
                          type="date"
                          onChange={(e) =>
                            setUpdateEvent({
                              ...updateEvent,
                              to: e.target.value,
                            })
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <input
                          type="text"
                          onChange={(e) =>
                            setUpdateEvent({
                              ...updateEvent,
                              content: e.target.value,
                            })
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <input
                          type="radio"
                          onChange={(e) =>
                            setUpdateEvent({
                              ...updateEvent,
                              status: true,
                            })
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleUpdate(row._id)}
                        >
                          Save
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(row._id)}
                        >
                          Delete
                        </Button>
                      </StyledTableCell>
                    </>
                  )}
                </>
              </StyledTableRow>
            ))}
            {addEvent && (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  <input
                    type="date"
                    onChange={(e) => setAddFrom(e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <input
                    type="date"
                    onChange={(e) => setAddTo(e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <input
                    type="text"
                    onChange={(e) => setAddContent(e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <input type="radio" onChange={(e) => setAddStatus(true)} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleAddSubmit}
                  >
                    Add
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Button variant="contained" onClick={() => setAddEvent(true)}>
          Add New Event
        </Button>
      </div>
    </div>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
