import "./EventList.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import React, { useState, useEffect } from "react";
import { LogIn } from '../../api/Requests'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetEvents, CreateEvent, DeleteEvent } from '../../api/Requests'




export default function EventList(props) {
    let [events, setEvents] = useState([]);
    let [addEvent, setAddEvent] = useState(false);
    let [isEditing, setIsEditing] = useState(false);


    let [addFrom, setAddFrom] = useState('');
    let [addTo, setAddTo] = useState('');
    let [addContent, setAddContent] = useState('');
    let [addStatus, setAddStatus] = useState(false);

    useEffect(() => {
        GetEvents(props.data.token)
        .then(function (response) {
            console.log(response.data.result)
            setEvents(response.data.result)
          })
    }, []);
    
    const handleDelete = (id) => {
        DeleteEvent(id, props.data.token)
        .then(function (response) {
            setEvents(response.data.result)
          })
          setIsEditing(false)
    }
    const handleAddSubmit = () => {
        CreateEvent({
            from: addFrom,
            to: addTo,
            content: addContent,
            isCompleted: addStatus.toString(),
            creator: props.data.userId
        }, props.data.token)
        setAddEvent(false)
    }


  return (
    <div className='container'>
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
              <StyledTableCell component="th" scope="row">
                {row.from}
              </StyledTableCell>
              <StyledTableCell align="right">{row.to}</StyledTableCell>
              <StyledTableCell align="right">{row.content}</StyledTableCell>
              <StyledTableCell align="right">{row.isCompleted.toString()}</StyledTableCell>
              <StyledTableCell align="right">
              {!isEditing && 
              <Button variant="contained" color="success"
              onClick={() => setIsEditing(true)}
              >
                Edit
                </Button>
                }
                {isEditing && 
              <Button variant="contained" color="success"
              >
                Delete
                </Button>
                }
                 </StyledTableCell>
            </StyledTableRow>
          ))}
{addEvent && 
<StyledTableRow >
              <StyledTableCell component="th" scope="row">
                <input type='date' onChange={(e) => setAddFrom(e.target.value)}/>
              </StyledTableCell>
              <StyledTableCell align="right"><input type='date' 
              onChange={(e) => setAddTo(e.target.value)}/></StyledTableCell>
              <StyledTableCell align="right"><input type='text'
              onChange={(e) => setAddContent(e.target.value)} /></StyledTableCell>
              <StyledTableCell align="right"><input type='radio' 
              onChange={(e) => setAddStatus(true)}/></StyledTableCell>
              <StyledTableCell align="right">
              <Button variant="contained" color="success"
              onClick={handleAddSubmit}>
                Add
                </Button></StyledTableCell>
            </StyledTableRow>
}
        </TableBody>
      </Table>
    </TableContainer>
    <div>
    <Button variant="contained" 
        onClick={() => setAddEvent(true)}>Add New Event</Button>
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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

