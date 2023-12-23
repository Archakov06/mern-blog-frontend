import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import {SideBlock} from "./SideBlock";
import {useNavigate} from "react-router-dom";
import TagPage from "./TagPage/TagPage";
import {see} from "../utilities/myUtils";

export const TagsBlock = ({items, isLoading = true}) => {

    const navigate = useNavigate();


    return (
        <SideBlock title="Tags">
            <List>
                {(isLoading ? [...Array(5)] : items).map((name, i) => (
                    <a
                        style={{textDecoration: "none", color: "black"}}
                        href={`/tag/${name}`}
                    >
                        <ListItem key={i} disablePadding>

                            <ListItemButton onClick={'' }>
                                <ListItemIcon>
                                    <TagIcon/>
                                </ListItemIcon>
                                { isLoading ? <Skeleton width={100}/> : <ListItemText primary={name}/> }
                            </ListItemButton>
                        </ListItem>
                    </a>
                ))}
            </List>

        </SideBlock>
    );
};
