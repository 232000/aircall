import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RestoreSharpIcon from '@mui/icons-material/RestoreSharp';



export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const [messages, setMessages] = React.useState();
  const [calls, setCalls] = React.useState([]);
  
  function archiveAllCalls() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_archived: true })
    };
    for (let i = 0; i < calls.length; i++) {
        fetch('https://aircall-job.herokuapp.com/activities/' + calls[i]['id'], requestOptions)
            .then(response => response.json())
            .then(data => setMessages(data));
    }
    for (let i = 0; i < calls.length; i++) {
            calls[i]['is_archived'] = true;
            setMessages(!calls[i]['is_archived'])
    }
   }

function resetAllCalls() {  
    fetch('https://aircall-job.herokuapp.com/reset')
    .then(response => response.json())
    .then(data => setMessages(data));
    for (let i = 0; i < calls.length; i++) {
        calls[i]['is_archived'] = false;
        setMessages(!calls[i]['is_archived'])
    }
}

function archiveCall(id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_archived: true })
    };

    fetch('https://aircall-job.herokuapp.com/activities/' + id, requestOptions)
        .then(response => response.json())
        .then(data => setMessages(data));
    setMessages(1)

}

function restoreCall(id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_archived: false })
    };

    fetch('https://aircall-job.herokuapp.com/activities/' + id, requestOptions)
        .then(response => response.json())
        .then(data => setMessages(data));
    setMessages(0)
}


React.useEffect(() => {
    fetch('https://aircall-job.herokuapp.com/activities')
        .then(response => response.json())
        .then(data => setCalls(data));
}, [value, messages]);

if (value == 0) {
    return (
            <Box sx={{position: 'absolute', width: 376, height: 666}} ref={ref}>
            <Button variant="outlined" onClick={archiveAllCalls} sx={{width:376}}>Archive All</Button>
            <CssBaseline />
            <List sx ={{height: 666}}>
                {calls.filter(call => call['is_archived'] == false).map(({ id, from, duration, call_type, direction, created_at, via }, index) => (
                <ListItem button key={index}>
                    <ListItemAvatar>
                    <Avatar alt="Profile Picture"/>
                    </ListItemAvatar>
                    <ListItemText primary={from} secondary={direction + " | " + new Date(created_at).toDateString() + " | " + call_type + "   " + "(" + Math.floor(duration / 60)  + " m, " + duration % 60 + " s)" + " | " +" via: " +  via} />
                    <IconButton aria-label="archive" onClick={() => archiveCall(id)}>
                        <ArchiveIcon/>
                    </IconButton>
                </ListItem>
                ))}
            </List>
            <Paper sx={{ position: 'sticky', bottom: 0, left: 0, right: 0, color: 'black'}} elevation={3}>
                <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                >
                <BottomNavigationAction label="Feed" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
                </BottomNavigation>
            </Paper>
            </Box>
        );
} else {
        return (
            <Box sx={{position: 'absolute', width: 376, height: 666}} ref={ref}>
            <Button variant="outlined" onClick={resetAllCalls} sx={{width:376}}>Reset All</Button>
            <CssBaseline />
            <List sx ={{height: 666}}>
                {calls.filter(call => call['is_archived'] == true).map(({ id, from, duration, call_type, direction, created_at, via }, index) => (
                <ListItem button key={index}>
                    <ListItemAvatar>
                    <Avatar alt="Profile Picture"/>
                    </ListItemAvatar>
                    <ListItemText primary={from} secondary={direction + " | " + new Date(created_at).toDateString() + " | " + call_type + "   " + "(" + Math.floor(duration / 60)  + " m, " + duration % 60 + " s)" + " | " +" via: " +  via} />
                    <IconButton aria-label="archive" onClick={() => restoreCall(id)}>
                        <RestoreSharpIcon/>
                    </IconButton>
                </ListItem>
                ))}
            </List>
            <Paper sx={{ position: 'sticky', bottom: 0, left: 0, right: 0, color: 'black'}} elevation={3}>
                <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                >
                <BottomNavigationAction label="Feed" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
                </BottomNavigation>
            </Paper>
            </Box>
        );
  }
}