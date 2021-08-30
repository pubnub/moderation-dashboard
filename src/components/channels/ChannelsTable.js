/**
 * Displays paginated table containg channel metadata
 */
import React, { useState, useEffect } from "react";
import { getChannels, getChannelsOccupancy } from "../../services/pubnub";
import ListingTable from "../tables/ListingTable";
import { setLocalStorage } from "../../services/localStorage";
import { CircularProgress, Grid } from "@material-ui/core";
import { formatDate } from "../../utils/helpers";
import ConfirmDialog from "../core/ConfirmDialog";
import UpdateChannelMetadataModal from "./UpdateChannelMetadataModal";
import { useHistory } from "react-router";

export default function ChannelsTable({
  searchResult,
  setSearchableData,
  deleteChannel,
  data,
  pubnub,
}) {
  const [channels, setChannels] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [channelData, setChannelData] = useState([]);
  const [channelID, setChannelID] = useState("");
  const [updatedChannel, setUpdatedChannel] = useState([]);
  const [tableCount, settableCount] = useState(0);
  const [nextpage, setNextPage] = useState("");
  const [previousPage, setpreviousPage] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const history = useHistory();

  /**
   * Defines Table headcells on channels page
   */
  const headCells = [
    { id: "id", alignment: "left", label: "CHANNEL", avatar: true },
    { id: "description", alignment: "left", label: "DESCRIPTION" },
    { id: "occupancy", alignment: "left", label: "OCCUPANCY" },
    { id: "icons", alignment: "left", icons: true, user: false },
  ];

  useEffect(() => {
    setPageNumber(0);
    fetchChannels(pubnub, "", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, updatedChannel]);

  useEffect(() => {
    if (searchResult.length) {
      setChannels(searchResult);
    }
  }, [searchResult]);

  useEffect(() => {
    setSearchableData(channels);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channels]);

  /**
   * Fetches 25 channels and count of online users in that channels to show occupancy
   */
  const fetchChannels = (pubnubObject, next, prev) => {
    setLoading(true);
    setChannels([]);
    (async () => {
      try {
        const applicationChannels = await getChannels(pubnubObject, next, prev);
        if (!applicationChannels.data.length) {
          setLoading(false);
          setMessage("No Channel Metadata Found");
        }
        settableCount(applicationChannels.totalCount);
        setpreviousPage(applicationChannels.prev);
        setNextPage(applicationChannels.next);
        const channelsList = [];
        const channelsIDs = [];
        let selectedChannel = {};
        applicationChannels.data.map((channel, index) => {
          selectedChannel = channel;
          selectedChannel.updated = formatDate(channel.updated);
          channelsList.push(selectedChannel);
          channelsIDs.push(selectedChannel.id);
          return false;
        });
        const channelsOccupancy = await getChannelsOccupancy(pubnub, channelsIDs);
        channelsIDs.forEach((id, channelIndex) => {
          channelsList[channelIndex]["occupancy"] =
            channelsOccupancy[id] && channelsOccupancy[id].occupancy;
        });
        setChannels(channelsList);
        setLocalStorage("PubNubChannels", channelsList);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setMessage("No Channel Metadata Found");
        setLocalStorage("PubNubChannels", []);
      }
    })();
  };

  /**
   * Handles channel row click to navigate to a channel
   */
  const handleRowClick = (event, row, iconsClick) => {
    if (!iconsClick) viewRow(event, row.id);
  };

  /**
   * Handles edit icon click to update channel metadata
   */
  const editRow = (event, row) => {
    setModalOpen(true);
    setChannelData(row);
  };

  /**
   * Handles view icon click to  to navigate to a channel
   */
  const viewRow = (event, channelName) => {
    history.push({
      pathname: "/channels/messages",
      state: { channel: channelName },
    });
  };

  /**
   * Handles delete confirm action to delete to a channel
   */
  const deleteRow = (event, rowId) => {
    setConfirmOpen(true);
    setChannelID(rowId);
  };

  /**
   * Handles delete icon click to confirm delete action
   */
  const confirmDelete = () => {
    deleteChannel(channelID);
  };

  /**
   * Handles when a channel is updated
   */
  const channelUpdated = (updatedChannelData) => {
    setUpdatedChannel(updatedChannelData);
  };

  /**
   * Handles pagination for fetching next and prev channels
   */
  const getNewPage = (i) => {
    if (pageNumber < i) {
      setPageNumber(i);
      fetchChannels(pubnub, nextpage, "");
    } else {
      setPageNumber(pageNumber - 1);
      fetchChannels(pubnub, "", previousPage);
    }
  };

  return (
    <>
      <ListingTable
        data={channels}
        headCells={headCells}
        handleRowClick={handleRowClick}
        message={message}
        editRow={editRow}
        deleteRow={deleteRow}
        viewRow={viewRow}
        getNewPage={getNewPage}
        tableCount={tableCount}
        number={pageNumber}
      />
      {loading ? (
        <Grid justify="center" container>
          <CircularProgress />
        </Grid>
      ) : null}
      <ConfirmDialog
        id="delete"
        title="Are you sure?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={confirmDelete}
        actionMessage={"Yes, Delete it"}
      >
        You want to delete this channel?
      </ConfirmDialog>
      <UpdateChannelMetadataModal
        open={modalOpen}
        setOpen={setModalOpen}
        pubnubObject={pubnub}
        data={channelData}
        channelUpdated={channelUpdated}
      />
    </>
  );
}
