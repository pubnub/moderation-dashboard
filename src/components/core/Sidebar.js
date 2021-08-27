import React from "react";
import { useHistory } from "react-router-dom";
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import { useStyles } from "../../style/sidebar";
import {
  DescriptionOutlined,
  HomeOutlined,
  MailOutline,
  ChatBubbleOutline,
  PersonOutlined,
  SettingsOutlined,
  ExpandMore,
  ExpandLess,
} from "@material-ui/icons";

function Sidebar({ content }) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List disablePadding={true}>
        <ListItem
          id="overviewItem"
          onClick={() => history.push("/overview")}
          selected={history.location.pathname === "/overview"}
          button
        >
          <ListItemIcon className={classes.listItemRoot}>
            <HomeOutlined className={classes.overviewIcon} />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2">Overview</Typography>
          </ListItemText>
        </ListItem>

        <ListItem id="settingsItem" button onClick={handleClick}>
          <ListItemIcon className={classes.listItemRoot}>
            <SettingsOutlined className={classes.settingsIcon} />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2">Settings</Typography>
          </ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              onClick={() => history.push("/text-moderation")}
              selected={history.location.pathname === "/text-moderation"}
            >
              <ListItemIcon className={classes.settingsItemRoot}>
                <DescriptionOutlined className={classes.textModerationIcon} />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">Text Moderation</Typography>
              </ListItemText>
            </ListItem>

            <ListItem button onClick={() => history.push("/image-moderation")}>
              <ListItemIcon className={classes.settingsItemRoot}>
                <ChatBubbleOutline className={classes.chatIcon} />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">Image Moderation</Typography>
              </ListItemText>
            </ListItem>
          </List>
        </Collapse>

        <ListItem
          id="usersItem"
          button
          onClick={() => history.push("/users")}
          selected={history.location.pathname === "/users"}
        >
          <ListItemIcon className={classes.listItemRoot}>
            <PersonOutlined className={classes.userIcon} />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2">Users</Typography>
          </ListItemText>
        </ListItem>

        <ListItem
          id="channelsItem"
          button
          onClick={() => history.push("/channels")}
          selected={history.location.pathname === "/channels"}
        >
          <ListItemIcon className={classes.listItemRoot}>
            <MailOutline className={classes.channelIcon} />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2">Channels</Typography>
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <nav className={classes.drawer}>{drawer}</nav>
      <main className={classes.content}>{content}</main>
    </div>
  );
}

export default Sidebar;
