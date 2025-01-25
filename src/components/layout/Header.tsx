import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import  { lazy, ReactNode, Suspense } from "react";
import {
   
  Group as GroupIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon, 
} from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile, setIsSearch,setIsNewGroup, setIsNotification } from "../../redux/reducers/misc";
import axios from "axios";
import { Server } from "../../constants/config";
import { resetNotificationCount } from "../../redux/reducers/chatSlice";
import { RootState } from "../../redux/reducers/store";
import { lightGreen } from "../../constants/color";

const SearchDailog = lazy(()=> import("../specific/Search"))
const NotificationDialog = lazy(()=> import("../specific/Notification"))
const NewGroup  = lazy(()=>import("../specific/NewGroup"))


export default function Header() {

  const dispatch = useDispatch()
  const {isSearch,isNewGroup,isNotification} = useSelector((state:RootState)=>state.misc)
  const {notificationCount} = useSelector((state:RootState) => state.chat);

  const handleMobileNav = () => {
dispatch(setIsMobile(true))
  }
  ;

  const openNotificationHandler =()=>{
    
    dispatch(setIsNotification(true))
 dispatch(resetNotificationCount())
  }


  const handleLogout = ()=>{

    axios.post(`${Server}user/logout`,
      {}, {
      withCredentials: true
  }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
          window.location.reload()
      }
  }).catch((error) => {
      console.log("error",error);
  })
  }

  const openSearchDeilog = () => {
    dispatch(setIsSearch(true));
  };

  const navigateGroup = ()=>{
    dispatch(setIsNewGroup(true))
  }





  return (
  <>
    <Box
      sx={{
        flexGrow: 1,
        height: "4rem",
      }}
    >
      <AppBar position="static" sx={{bgcolor:lightGreen}}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            Chats
          </Typography>
          <Box
            sx={{
              display: {
                sm: "none",
                xs: "block",
              },
            }}
          >
            <IconButton color="inherit" size="large" onClick={handleMobileNav}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              flexGlow: 1,
            }}
          ></Box>
          <Box>
          <IconBtn value={notificationCount}
                title={"Notifications"}
                icon={<NotificationsIcon />}
               onClick={openNotificationHandler}
              />
            <IconBtn title={"search"} icon={<SearchIcon />} onClick={openSearchDeilog}/>
            {/* <IconBtn  title={"Chat"} icon={<AddIcon />} onClick={openNotificationHandler} /> */}
            <IconBtn title={"Group"} icon={<GroupIcon />} onClick={navigateGroup} />
            <IconBtn  title={"logout"} icon={<LogoutIcon />} onClick={handleLogout}/>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
    
    {
      isSearch && <Suspense fallback={<div>Loading</div>
      }>
        <SearchDailog />
      </Suspense>
    }
     {
      isNotification && <Suspense fallback={<div>Loading</div>
      }>
        <NotificationDialog />
      </Suspense>
    }
     {
      isNewGroup && <Suspense fallback={<div>Loading</div>
      }>
        <NewGroup />
      </Suspense>
    }
    </>
  );
}


const IconBtn = ({title,onClick,icon,value}:{
  title:string,
  onClick:()=> void,
  icon:ReactNode,
  value?:number
})=>{

  return (

    <Tooltip title={title}>
      <IconButton
        color="inherit"
        size="large"
        onClick={onClick}
      >{
        value ? <Badge badgeContent={value} color="error">{icon}</Badge>
      : icon}
     
      </IconButton>
    </Tooltip>
  )
}
