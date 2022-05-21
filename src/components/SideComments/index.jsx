import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

export const SideComments = ({ items }) => {
  return (
    <List>
      {items.map((obj) => (
        <React.Fragment key={obj.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
            </ListItemAvatar>
            <ListItemText primary={obj.user.fullName} secondary={obj.text} />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};
