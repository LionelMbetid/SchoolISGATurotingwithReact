import * as React from 'react';
import {ThemeProvider} from '@mui/material'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ClassIcon from '@mui/icons-material/Class';
import { Link, Outlet } from 'react-router-dom';
import { useStateContext } from '../../context/ContextProvider';
import axiosClient from '../../axios-client';


export default function DashboardAdmin() {
  const drawerWidth = 240;

  const { setToken, setRole } = useStateContext();


  const logout = ()=>{
    axiosClient.post('/admin/logout').then(({ data }) => {
      setToken(null);
      setRole(null);
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('ROLE_USER');
      console.log("hi");
    }).catch(err => {
      const response = err.response;
      if (response) {
        if (response.status === 422) {
          console.log("no data found");
          setErrors(response.data.errors);
        }
      }
    })
  }
  return (
    <>
    <Box sx={{ display: 'flex' }}>

      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div className="flex min-h-screen flex-col justify-between">
          <div>
        <Toolbar />
        <Divider />

        <List>
          <ListItem>
            <Link to="/admin/student/list" className="w-full">
              <ListItemButton>
                <ListItemIcon>
                  <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText primary="Students" />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/admin/subject/list" className="w-full">
              <ListItemButton>
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="Subjects" />
              </ListItemButton>
            </Link>
          </ListItem>
          {/* <ListItem>
            <Link to="#" className="w-full">
              <ListItemButton>
                <ListItemIcon>
                  <ClassIcon />
                </ListItemIcon>
                <ListItemText primary="Classes" />
              </ListItemButton>
            </Link>
          </ListItem> */}

        </List>
        </div>
        <button onClick={logout} type="button" class="mx-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Logout</button>

        </div>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 0 }}
        className="mt-16 mx-2"
      >
        <Outlet/>
      </Box>
    </Box>
    </>
  );
}
