import React, { useEffect, useState } from "react";
import { Avatar, Box, Grid, IconButton, Typography } from "@material-ui/core";
import { useStyles } from "../../style/messages";
import { getChannelMembers, getOnlineMembers } from "../../services/pubnub";
import { OnlineBadge, OfflineBadge } from "../../style/badge";
import {
  capitalizeFirstLetter,
  formatProfileImageUrl,
  checkMuteStatus,
  checkBlockStatus,
} from "../../utils/helpers";
import { LightTooltip } from "../../style/tooltip";
import UserAction from "../users/UserAction";
import MembersLoader from "./MembersLoader";

export default function Members(props) {
  const classes = useStyles();
  const [members, setMembers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [over, setOver] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [action, setAction] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOnlineMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.channelMembers]);

  useEffect(() => {
    setNextPage(props.page);
  }, [props.page]);

  /**
   * Fetches online users of a channel
   */
  const fetchOnlineMembers = () => {
    (async () => {
      try {
        const onlineMembersResponse = await getOnlineMembers(props.pubnub, props.channelName);
        setOnlineUsers(onlineMembersResponse.length);
        props.channelMembers.map((member, i) => {
          props.channelMembers[i]["mute"] = false;
          props.channelMembers[i]["block"] = false;
          if (checkMuteStatus(member, props.channelName)) {
            props.channelMembers[i]["mute"] = true;
          }
          if (checkBlockStatus(member, props.channelName)) {
            props.channelMembers[i]["block"] = true;
          }
          onlineMembersResponse.map((onlineMember, j) => {
            if (member.uuid.id === onlineMember.uuid) {
              props.channelMembers[i]["status"] = "online";
            }
            return false;
          });
          return false;
        });
        let onlineUsersArray = [];
        onlineMembersResponse.map((onlineMember, j) => {
          let userObj = {
            uuid: {
              name: null,
              profileUrl: null,
              id: null,
            },
            status: "online",
            actionsDisable: true,
            toolTipTitle: "User not a member of channel",
          };
          let filterMember = props.channelMembers.filter(
            (member) => member.uuid.id === onlineMember.uuid
          );
          if (!filterMember.length) {
            userObj.uuid.id = onlineMember.uuid;
            onlineUsersArray.push(userObj);
          }
          return false;
        });

        const setOnlineUsersArray = [...new Set(onlineUsersArray)];
        const users = [...setOnlineUsersArray, ...props.channelMembers];
        setMembers(users);
      } catch (e) {}
    })();
  };

  /**
   * Handles clicking on a member to view use details in a card
   */
  const handleClick = (detail) => {
    if (!over) props.selectedMemberDetail(detail);
  };

  /**
   * Handles mute icon click to mute a user
   */
  const confirmMute = (event, user) => {
    setAction("mute");
    setConfirmOpen(true);
    setSelectedUser(user);
  };

  /**
   * Handles unmute icon click to unmute a user
   */
  const confirmUnmute = (event, user) => {
    setAction("unmute");
    setConfirmOpen(true);
    setSelectedUser(user);
  };

  /**
   * Handles block icon click to blcok a user
   */
  const confirmBlock = (event, user) => {
    setAction("block");
    setConfirmOpen(true);
    setSelectedUser(user);
  };

  /**
   * Handles unblock icon click to unblock a user
   */
  const confirmUnblock = (event, user) => {
    setAction("unblock");
    setConfirmOpen(true);
    setSelectedUser(user);
  };

  const metadataUpdated = (userDetail, response) => {
    let filteredArray = members.filter((item) => item.uuid.id !== userDetail.id);
    let filteredMember = members.filter((row) => {
      return row.uuid.id.includes(userDetail.id);
    });
    switch (response) {
      case "mute":
        filteredMember[0].mute = true;
        break;
      case "unmute":
        filteredMember[0].mute = false;
        break;
      case "block":
        filteredMember[0].block = true;
        break;
      case "unblock":
        filteredMember[0].block = false;
        break;
      default:
        break;
    }
    const memberIndex = members.findIndex((row) => {
      return row.uuid.id.includes(userDetail.id);
    });
    filteredArray.splice(memberIndex, 0, filteredMember[0]);
    setMembers(filteredArray);
  };

  /**
   * Fetches other channel members on scrolling down
   */
  const fetchChannelsMembersOnScroll = () => {
    setLoading(true);
    (async () => {
      try {
        const channelMembers = await getChannelMembers(props.pubnub, props.channelName, nextPage);
        setMembers((oldArray) => [...oldArray, ...channelMembers.data]);
        setNextPage(channelMembers.next);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    })();
  };

  return (
    <>
      <Grid>
        <Typography className={classes.members}>Members</Typography>
        <Grid container>
          <Grid>
            <Box mr={1} ml={1} mb={2}>
              <Avatar variant="square" className={classes.onlineUsers}>
                {onlineUsers}
              </Avatar>
            </Box>
          </Grid>
          <Box>
            <small className={classes.totalCount}>Online Users</small>
          </Box>
          <Grid>
            <Box mr={1} mb={2} ml={1}>
              <Avatar variant="square" className={classes.totalUsers}>
                {members.length}
              </Avatar>
            </Box>
          </Grid>
          <Box>
            <small className={classes.totalCount}>Total Users</small>
          </Box>
        </Grid>
        {members?.map((member, i) => {
          return (
            <Grid
              justify="flex-start"
              container
              className={classes.channelMember}
              key={i}
              onClick={() => handleClick(member)}
            >
              <Box mr={1}>
                {member.status ? (
                  <OnlineBadge
                    variant="dot"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <Avatar
                      variant="square"
                      className={classes.userProfile}
                      src={formatProfileImageUrl(member.uuid.profileUrl)}
                    />
                  </OnlineBadge>
                ) : (
                  <OfflineBadge
                    variant="dot"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <Avatar
                      variant="square"
                      className={classes.userProfile}
                      src={formatProfileImageUrl(member.uuid.profileUrl)}
                    />
                  </OfflineBadge>
                )}
              </Box>
              <Grid item sm={6} xs={12} md={6}>
                <small className={classes.values}>
                  {!member.uuid.name
                    ? member.uuid.id.substring(0, 12) + ".." || "Unknown"
                    : capitalizeFirstLetter(member.uuid.name)}
                </small>
                <br />
                <small className={classes.appName}>
                  {!member.status ? "offline" : member.status}
                </small>
              </Grid>
              <Box ml={1}>
                {!member.mute ? (
                  <>
                    <LightTooltip title={member.toolTipTitle || "Mute"}>
                      <span>
                        <IconButton
                          edge="start"
                          onClick={(event) => confirmMute(event, member.uuid)}
                          onMouseOver={() => setOver(true)}
                          onMouseOut={() => setOver(false)}
                          disabled={member.actionsDisable}
                        >
                          <img
                            src={process.env.PUBLIC_URL + "/images/unmute.svg"}
                            alt="mute"
                            style={{ width: "20px", height: "16px" }}
                          />
                        </IconButton>
                      </span>
                    </LightTooltip>
                  </>
                ) : (
                  <>
                    <LightTooltip title="Unmute">
                      <span>
                        <IconButton
                          edge="start"
                          onClick={(event) => confirmUnmute(event, member.uuid)}
                          onMouseOver={() => setOver(true)}
                          onMouseOut={() => setOver(false)}
                          disabled={member.actionsDisable}
                        >
                          <img src={process.env.PUBLIC_URL + "/images/mute.svg"} alt="unmute" />
                        </IconButton>
                      </span>
                    </LightTooltip>
                  </>
                )}
                {!member.block ? (
                  <>
                    <LightTooltip title={member.toolTipTitle || "Block"}>
                      <span>
                        <IconButton
                          edge="start"
                          onClick={(event) => confirmBlock(event, member.uuid)}
                          onMouseOver={() => setOver(true)}
                          onMouseOut={() => setOver(false)}
                          disabled={member.actionsDisable}
                        >
                          <img src={process.env.PUBLIC_URL + "/images/unblock.svg"} alt="block" />
                        </IconButton>
                      </span>
                    </LightTooltip>
                  </>
                ) : (
                  <>
                    <LightTooltip title="Unblock">
                      <span>
                        <IconButton
                          edge="start"
                          onClick={(event) => confirmUnblock(event, member.uuid)}
                          onMouseOver={() => setOver(true)}
                          onMouseOut={() => setOver(false)}
                          disabled={member.actionsDisable}
                        >
                          <img src={process.env.PUBLIC_URL + "/images/block.svg"} alt="unblock" />
                        </IconButton>
                      </span>
                    </LightTooltip>
                  </>
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <UserAction
        open={confirmOpen}
        user={selectedUser}
        title="Are you sure?"
        setOpen={setConfirmOpen}
        pubnub={props.pubnub}
        action={action}
        updated={metadataUpdated}
      >
        You want to {action} this user?
      </UserAction>
      <MembersLoader
        loading={loading}
        membersLength={members.length}
        fetchChannelsMembersOnScroll={fetchChannelsMembersOnScroll}
        totalCount={props.totalCount}
      />
    </>
  );
}
