import React, { useState } from "react";
import Helmet from "react-helmet";
import { Grid, Typography, Box } from "@material-ui/core";
import ChannelsTable from "./ChannelsTable";
import { JoinChannelModal } from "./JoinChannelModal";
import { channelsFromLS, formatDate, showError } from "../../utils/helpers";
import Search from "../core/Search";
import AddChannelMetadataModal from "./AddChannelMetadataModal";
import usePubNub from "../../utils/usePubNub";
import { deleteChannelMetadata, getChannelByName } from "../../services/pubnub";
import SnackBar from "../core/SnackBar";

function ChannelsListing() {
  const [searchResult, setSearchResult] = useState([]);
  const [updatedData, setupdatedData] = useState([]);
  const [searched] = useState("");
  const [channelAlert, setChannelAlert] = useState({
    success: { status: false, msg: "" },
    error: { status: false, msg: "" },
  });
  const { pubnub } = usePubNub();

  const requestChannelSearch = (searchedVal) => {
    setChannelAlert({
      ...channelAlert,
      success: { status: false, msg: "" },
      error: { status: false, msg: "" },
    });
    (async () => {
      try {
        const filteredRows = await getChannelByName(pubnub, searchedVal);
        const channelsList = [];
        let selectedChannel = {};
        if (!filteredRows.length) {
          setChannelAlert({
            ...channelAlert,
            success: { status: false, msg: "" },
            error: { status: true, msg: "No channels found" },
          });
        }
        filteredRows.map((user, index) => {
          selectedChannel = user;
          selectedChannel.updated = formatDate(user.updated);
          channelsList.push(selectedChannel);
          return false;
        });
        setSearchResult(channelsList);
      } catch (e) {
        setChannelAlert({
          ...channelAlert,
          success: { status: false, msg: "" },
          error: { status: true, msg: "Failed to filter channel" },
        });
      }
    })();
  };
  const cancelChannelSearch = () => {
    setSearchResult(channelsFromLS());
  };

  const setSearchableData = (channelsData) => {
    setSearchResult(channelsData);
  };

  const channelUpdated = (updatedChannelsData) => {
    setupdatedData(updatedChannelsData);
  };

  const deleteChannel = (channelID) => {
    if (channelID) {
      (async () => {
        try {
          await deleteChannelMetadata(pubnub, channelID);
          setupdatedData([]);
          setChannelAlert({
            ...channelAlert,
            success: { status: true, msg: "Channel deleted successfully" },
            error: { status: false, msg: "" },
          });
        } catch (e) {
          setChannelAlert({
            ...channelAlert,
            success: { status: true, msg: showError(e.status.errorData) },
            error: { status: false, msg: "" },
          });
        }
      })();
    }
  };

  return (
    <>
      <Helmet title="Channels" />
      <Grid justify="space-between" container>
        <Grid item sm={3}>
          <Box pl={1}>
            <Typography testid="channelHeader" variant="h5">
              Channels
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={9}>
          <Box display="flex" justifyContent="flex-end">
            <Box ml={2}>
              <Search
                id="search"
                searched={searched}
                requestSearch={requestChannelSearch}
                cancelSearch={cancelChannelSearch}
                placeholder={"Search for channel name"}
              />
            </Box>
            <Box ml={2}>
              <AddChannelMetadataModal pubnubObject={pubnub} isAdded={channelUpdated} />
            </Box>
            <Box ml={2}>
              <JoinChannelModal />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ChannelsTable
            searchResult={searchResult}
            setSearchableData={setSearchableData}
            deleteChannel={deleteChannel}
            data={updatedData}
            pubnub={pubnub}
          />
        </Grid>
      </Grid>
      {channelAlert.error.status && <SnackBar msg={channelAlert.error.msg} status={"info"} />}
      {channelAlert.success.status && (
        <SnackBar msg={channelAlert.success.msg} status={"success"} />
      )}
    </>
  );
}

export default ChannelsListing;
