import React, { useState, useEffect } from "react";
import { getUsers } from "../../services/pubnub";
import ListingTable from "../tables/ListingTable";
import { setLocalStorage } from "../../services/localStorage";
import { CircularProgress, Grid } from "@material-ui/core";
import { formatDate } from "../../utils/helpers";
import ConfirmDialog from "../core/ConfirmDialog";
import UpdateUserMetadataModal from "./UpdateUserMetadataModal";
import FlagUser from "./FlagUser";
import BanUser from "./BanUser";

export default function UsersTable({
  searchResult,
  setSearchableData,
  deleteUser,
  data,
  pubnub,
  filterBy,
}) {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [UUID, setUUID] = useState("");
  const [tableCount, settableCount] = useState(0);
  const [nextpage, setNextpage] = useState("");
  const [previousPage, setpreviousPage] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [flagConfirmOpen, setFlagConfirmOpen] = useState(false);
  const [action, setAction] = useState("");
  const [banModalOpen, setBanModalOpen] = useState(false);

  const headCells = [
    {
      id: "name",
      alignment: "left",
      label: "USER NAME",
      avatar: true,
      user: true,
    },
    { id: "email", alignment: "left", label: "EMAIL ID" },
    { id: "updated", alignment: "left", label: "UPDATED ON" },
    { id: "icons", alignment: "left", icons: true, user: true },
  ];

  useEffect(() => {
    setPageNumber(0);
    fetchUsers(pubnub, "", "", filterBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, updatedData, filterBy]);

  useEffect(() => {
    if (searchResult.length) {
      setUsers(searchResult);
    }
  }, [searchResult]);

  useEffect(() => {
    setSearchableData(users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const fetchUsers = (pubnubObject, next, prev, filter) => {
    setUsers([]);
    setLoading(true);
    (async () => {
      try {
        const applicationUsers = await getUsers(pubnubObject, next, prev, filter);
        if (!applicationUsers.data.length) {
          setLoading(false);
          setMessage("No User Metadata Found");
        }
        settableCount(applicationUsers.totalCount);
        setpreviousPage(applicationUsers.prev);
        setNextpage(applicationUsers.next);
        const usersList = [];
        let selectedUser = {};
        applicationUsers.data.map((user, index) => {
          selectedUser = user;
          selectedUser.updated = formatDate(user.updated);
          selectedUser.uuid = user.id;
          usersList.push(selectedUser);
          return false;
        });
        setUsers(usersList);
        setLocalStorage("PubNubUsers", usersList);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setMessage("No User Metadata Found");
        setLocalStorage("PubNubUsers", []);
      }
    })();
  };

  const editRow = (event, row) => {
    setModalOpen(true);
    setUserData(row);
  };

  const deleteRow = (event, rowId) => {
    setConfirmOpen(true);
    setUUID(rowId);
  };

  const confirmDelete = () => {
    deleteUser(UUID);
  };

  const isUpdated = (x) => {
    setUpdatedData(x);
  };

  const getNewPage = (i) => {
    if (pageNumber < i) {
      setPageNumber(i);
      fetchUsers(pubnub, nextpage, "", "");
    } else {
      setPageNumber(pageNumber - 1);
      fetchUsers(pubnub, "", previousPage, "");
    }
  };

  const flagUser = (event, rowId) => {
    setFlagConfirmOpen(true);
    setAction("flag");
    setUUID(rowId);
  };

  const banUser = (event, rowId) => {
    setBanModalOpen(true);
    setAction("ban");
    setUUID(rowId);
  };

  const unFlagUser = (event, rowId) => {
    setFlagConfirmOpen(true);
    setAction("unflag");
    setUUID(rowId);
  };

  const unbanUser = (event, rowId) => {
    setBanModalOpen(true);
    setAction("unban");
    setUUID(rowId);
  };

  return (
    <>
      <ListingTable
        data={users}
        headCells={headCells}
        message={message}
        editRow={editRow}
        deleteRow={deleteRow}
        flagUser={flagUser}
        banUser={banUser}
        unbanUser={unbanUser}
        unFlagUser={unFlagUser}
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
        title="Are you sure?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={confirmDelete}
        actionMessage={"Yes, Delete it"}
      >
        You want to delete this user?
      </ConfirmDialog>
      <UpdateUserMetadataModal
        open={modalOpen}
        setOpen={setModalOpen}
        pubnubObject={pubnub}
        data={userData}
        isUpdated={isUpdated}
      />
      <BanUser
        title="Are you sure?"
        open={banModalOpen}
        setOpen={setBanModalOpen}
        pubnubObject={pubnub}
        uuid={UUID}
        isUpdated={isUpdated}
        action={action}
      >
        You want to {action} this user?
      </BanUser>
      <FlagUser
        open={flagConfirmOpen}
        setOpen={setFlagConfirmOpen}
        uuid={UUID}
        isUpdated={isUpdated}
        pubnub={pubnub}
        action={action}
      >
        You want to {action} this user?
      </FlagUser>
    </>
  );
}
