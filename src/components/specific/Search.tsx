import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import  { useEffect, useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import toast from "react-hot-toast";
export default function Search() {
  const [search, setSearch] = useState("");
  const { isSearch } = useSelector((state: any) => state.misc);
  const dispatch = useDispatch();

  const [sendFriendRequest] = useSendFriendRequestMutation();
  const [users, setusers] = useState([]);

  const addFriendHandler = async (userId:any) => {
    console.log("id", userId);


    sendFriendRequest({userId});
  };

  const [userSearcher] = useLazySearchUserQuery();

  useEffect(() => {
    const setTimeOutId = setTimeout(() => {
      userSearcher(search)
        .then((res) => {
          console.log(res.data.data);
          setusers(res.data.data);
          toast.success(res.data.message);
        })
        .catch((res) => {
          console.log(res);
        });
    }, 500);

    return () => {
      clearTimeout(setTimeOutId);
    };
  }, [search]);


  const addFriendHandlerIsLoading = false

  const handleCloseSearch = () => {
    dispatch(setIsSearch(false));
  };

  return (
    <Dialog open={isSearch} onClose={handleCloseSearch}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find Prople</DialogTitle>
        <TextField
          label=""
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          size="small"
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((user,index) => {
            return (
              <UserItem
                user={user}
                key={index}
                handler={addFriendHandler}
                handlerIsLoading={addFriendHandlerIsLoading}
              />
            );
          })}
        </List>
      </Stack>
    </Dialog>
  );
}
