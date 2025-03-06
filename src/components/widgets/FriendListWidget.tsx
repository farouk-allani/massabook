import { Box, Button, Typography, useTheme } from "@mui/material";
// import { setFriends } from "state";
import Friend from "../Friend";
import WidgetWrapper from "../WidgetWrapper";
import { useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import AddFriendModal from "../AddFriendModal";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchfriendsOfUser } from "../../redux/slices/userSlice";
import {getOwnerOfProfile,getProfile} from '../../services/getProfile'
type FriendListWidgetProps = {
  userId: string | undefined;
};

const FriendListWidget = ({ userId }: FriendListWidgetProps) => {
  // const dispatch = useDispatch();
  const { palette } = useTheme();
  console.log(userId);
  const [_friends, _setFriends] = useState<any>([]);
  const [openAddFriendModal, setOpenAddFriendModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { connectedAccount,currentWallet } = useSelector((state: RootState) => state.account);
  const fri = useSelector((state: RootState) => state.user.friends);
  console.log(fri,"000000000000");
  const handleAddFriend = (walletAddress: string) => {
    console.log("Friend to be added:", walletAddress);
  };
  useEffect(() => {
    const fetchProfile = async () => {
      if (connectedAccount) {
        try {
          // Dispatch the thunk with the user's address.
          await dispatch(
            fetchfriendsOfUser(connectedAccount.address)
          ).unwrap();
          // Now the Redux store's user property is populated.
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          // Optionally redirect to profile setup if profile is missing.
        }
      }
    };
    fetchProfile();
    }, [currentWallet, connectedAccount]);
   
    
  const friends = [
    {
      _id: "1",
      firstName: "John",
      lastName: "Doe",
      occupation: "Software Engineer",
      picturePath: "/assets/images/avatar default.png",
    },
    {
      _id: "2",
      firstName: "Jane",
      lastName: "Doe",
      occupation: "Software Engineer",
      picturePath: "/assets/images/avatar default.png",
    },
    {
      _id: "3",
      firstName: "John",
      lastName: "Smith",
      occupation: "Software Engineer",
      picturePath: "/assets/images/avatar default.png",
    },
  ];

  return (
    <WidgetWrapper>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        mb="1.5rem"
      >
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mb: "1.5rem" }}
          textAlign="left"
        >
          Friends List
        </Typography>
        <Button
          onClick={() => setOpenAddFriendModal(true)}
          variant="outlined"
          color="primary"
          sx={{
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          Add Friend
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
      <AddFriendModal
        open={openAddFriendModal}
        handleClose={() => setOpenAddFriendModal(false)}
        onAddFriend={handleAddFriend}
      />
    </WidgetWrapper>
  );
};

export default FriendListWidget;
