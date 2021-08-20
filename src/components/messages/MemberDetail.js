import React, { useEffect, useState } from "react";
import { useStyles } from "../../style/memberDetail";
import { Box, Grid, Typography, IconButton } from "@material-ui/core";
import moment from "moment";
import UserAction from "../users/UserAction";
import { LightTooltip } from "../../style/tooltip";
import { formatProfileImageUrl } from "../../utils/helpers";

const MemberDetail = ({ member, toggleMemberDetails, pubnub }) => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [action, setAction] = useState("");
  const [mute, setMute] = useState(false);
  const [block, setBlock] = useState(false);

  useEffect(() => {
    if (member.block) setBlock(member.block);
    if (member.mute) setMute(member.mute);
  }, [member]);

  const muteMember = (event, user) => {
    setAction("mute");
    setDialogOpen(true);
    setSelectedUser(user);
  };

  const unmuteMember = (event, user) => {
    setAction("unmute");
    setDialogOpen(true);
    setSelectedUser(user);
  };

  const blockUser = (event, user) => {
    setAction("block");
    setDialogOpen(true);
    setSelectedUser(user);
  };

  const unblockUser = (event, user) => {
    setAction("unblock");
    setDialogOpen(true);
    setSelectedUser(user);
  };

  const metadataUpdated = (userDetail, response) => {
    switch (response) {
      case "mute":
        setMute(true);
        break;
      case "unmute":
        setMute(false);
        break;
      case "block":
        setBlock(true);
        break;
      case "unblock":
        setBlock(false);
        break;
      default:
        break;
    }
  };

  if (member) {
    return (
      <>
        <Grid container justify="flex-start">
          <Grid item>
            <Grid container>
              <Grid item>
                <IconButton onClick={() => toggleMemberDetails(false)}>
                  <img src={process.env.PUBLIC_URL + "/images/Button-Arrow.svg"} alt="toggle" />
                </IconButton>
              </Grid>
              <Grid item>
                <Box pt={1} pl={1}>
                  <Typography variant="body2" className={classes.sectionHeading}>
                    More Details
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Grid container justify="center">
          <Grid sm={6} md={6} item>
            <img
              src={formatProfileImageUrl(member.uuid.profileUrl)}
              className={classes.profilePicture}
              alt="profile"
            />
          </Grid>
          <Grid sm={12} md={12} item>
            <Typography variant="h6" align="center" className={classes.name}>
              {member.uuid.name || member.uuid.id}{" "}
              {member.status && <span className={classes.online} />}
            </Typography>
          </Grid>
          <Grid container justify="center">
            <Grid sm={4} md={4} lg={3} item>
              {!mute ? (
                <LightTooltip title="Mute">
                  <span>
                    <IconButton
                      aria-label="notification"
                      size="small"
                      onClick={(event) => muteMember(event, member.uuid)}
                      disabled={member.actionsDisable}
                    >
                      <div className={classes.blockIcon}>
                        <img
                          src={process.env.PUBLIC_URL + "/images/unmute.svg"}
                          alt="mute"
                          style={{ width: "20px", height: "16px" }}
                        />
                      </div>
                    </IconButton>
                  </span>
                </LightTooltip>
              ) : (
                <LightTooltip title="UnMute">
                  <span>
                    <IconButton
                      aria-label="notification"
                      size="small"
                      onClick={(event) => unmuteMember(event, member.uuid)}
                      disabled={member.actionsDisable}
                    >
                      <div className={classes.closeIcon}>
                        <img src={process.env.PUBLIC_URL + "/images/mute.svg"} alt="unmute" />
                      </div>
                    </IconButton>
                  </span>
                </LightTooltip>
              )}
            </Grid>
            <Grid sm={4} md={4} lg={3} item>
              {!block ? (
                <LightTooltip title="Block">
                  <span>
                    <IconButton
                      aria-label="close"
                      size="small"
                      onClick={(event) => blockUser(event, member.uuid)}
                      disabled={member.actionsDisable}
                    >
                      <div className={classes.blockIcon}>
                        <img src={process.env.PUBLIC_URL + "/images/unblock.svg"} alt="block" />
                      </div>
                    </IconButton>
                  </span>
                </LightTooltip>
              ) : (
                <LightTooltip title="UnBlock">
                  <span>
                    <IconButton
                      aria-label="close"
                      size="small"
                      onClick={(event) => unblockUser(event, member.uuid)}
                      disabled={member.actionsDisable}
                    >
                      <div className={classes.closeIcon}>
                        <img
                          src={process.env.PUBLIC_URL + "/images/times-circle.svg"}
                          alt="block"
                        />
                      </div>
                    </IconButton>
                  </span>
                </LightTooltip>
              )}
            </Grid>
            <Grid></Grid>
          </Grid>
          <Grid container justify="flex-start" spacing={2} className={classes.containerRoot}>
            <Grid item sm={12} md={12}>
              <Typography testid="nick_name" className={classes.label}>
                NICK NAME
              </Typography>
              <Typography className={classes.labelItem}>{member.uuid.name}</Typography>
            </Grid>
            <Grid item sm={12} md={12}>
              <Typography testid="created_at" className={classes.label}>
                CREATED DATE
              </Typography>
              <Typography className={classes.labelItem}>
                {moment(member.updated).format("MMMM DD, YYYY hh:mm a")}
              </Typography>
            </Grid>
            <Grid item sm={12} md={12}>
              <Typography testid="email" className={classes.label}>
                EMAIL ADDRESS
              </Typography>
              <Typography className={classes.labelItem}>{member.uuid.email}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <UserAction
          open={dialogOpen}
          user={selectedUser}
          title="Are you sure?"
          setOpen={setDialogOpen}
          pubnub={pubnub}
          action={action}
          updated={metadataUpdated}
        >
          You want to {action} this user?
        </UserAction>
      </>
    );
  } else {
    return <></>;
  }
};

export default MemberDetail;
