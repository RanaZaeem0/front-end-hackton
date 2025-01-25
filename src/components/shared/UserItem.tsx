import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import { Add as AddIcon,Remove as RemoveIcon } from "@mui/icons-material";
function UserItem({ user, handler, handlerIsLoading,isAdded }:{
  user:any,
  handler:(id:any)=> void,
  handlerIsLoading:boolean,
  isAdded? :boolean
}) {
  const { name, _id, } = user;
  console.log(isAdded);
  
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar />
        <Typography variant="body1" display={"-webkit-box"}
        overflow={'hidden'}
        className="bg-red-200 w-full " 
        >
          {name}
        </Typography>
        <IconButton
          size="small"
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
         {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Stack>
    </ListItem>
  );
}

export default UserItem;
