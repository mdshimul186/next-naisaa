import React,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AdminHome from './AdminHome';
import AdminCategory from './AdminCategory';
import AdminGig from './AdminGig';
import AdminOrder from './AdminOrder';
import AdminUsers from './AdminUsers';
import AdminReviews from './AdminReviews';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    minHeight: '100vh',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function AdminLayout() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const {authenticated,user} = useSelector(state=>state.auth)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [access, setAccess] = useState(false)
  //---check authentication to access this route
  useEffect(() => {
   if(authenticated){
     if(user.role == 'admin'){
      setAccess(true)
     }
   }
  }, [])
  return (
    <div  className={classes.root}>
    {
      !access ? <p>Access denied</p>:<>
     <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Home" {...a11yProps(0)} />
        <Tab label="Categories" {...a11yProps(1)} />
        <Tab label="Gigs" {...a11yProps(2)} />
        <Tab label="Orders" {...a11yProps(3)} />
        <Tab label="Users" {...a11yProps(4)} />
        <Tab label="Reviews" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      <TabPanel style={{width:"100%",zIndex:"11"}} value={value} index={0}>
        <AdminHome />
      </TabPanel>
      <TabPanel component={'div'} style={{width:"100%",zIndex:"11"}} value={value} index={1}>
        <AdminCategory />
      </TabPanel>
      <TabPanel style={{width:"100%",zIndex:"11"}} value={value} index={2}>
        <AdminGig />
      </TabPanel>
      <TabPanel style={{width:"100%",zIndex:"11"}} value={value} index={3}>
        <AdminOrder/>
      </TabPanel>
      <TabPanel style={{width:"100%",zIndex:"11"}} value={value} index={4}>
        <AdminUsers />
      </TabPanel>
      <TabPanel style={{width:"100%",zIndex:"11"}} value={value} index={5}>
        <AdminReviews />
      </TabPanel>
      <TabPanel style={{width:"100%",zIndex:"11"}} value={value} index={6}>
        Item Seven
      </TabPanel></>}
    </div>
  );
}
