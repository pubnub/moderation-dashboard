import React, { useState, useEffect } from "react";
import { setLocalStorage } from "../../services/localStorage";
import { useHistory } from "react-router-dom";
import ListingTable from "../tables/ListingTable";
import { appsFromLS } from "../../utils/helpers";
import moment from "moment";

export default function ApplicationTable({ searchResult }) {
  const [applications, setApplications] = useState([]);
  const history = useHistory();

  const headCells = [
    {
      id: "name",
      alignment: "left",
      label: "NAME",
      avatar: true,
    },
    { id: "publish_key", alignment: "left", label: "PUBLISH KEY" },
    { id: "subscribe_key", alignment: "left", label: "SUBSCRIBE KEY" },
    { id: "created", alignment: "left", label: "CREATED ON" },
  ];

  useEffect(() => {
    const appsList = (appsFromLS() && appsFromLS().result) || [];
    const keysList = [];
    let keyWithAppName = {};
    appsList.map((app, appIndex) => {
      app.keys.map((key, keyIndex) => {
        keyWithAppName = key;
        keyWithAppName.appName = app.name;
        keyWithAppName.created =
          key.created && moment(new Date(key.created * 1000)).format("MMMM Do YYYY, h:mm a");
        keyWithAppName.modified =
          key.modified && moment(new Date(key.modified * 1000)).format("MMMM Do YYYY, h:mm a");
        keyWithAppName.name = key.properties.name;
        keysList.push(keyWithAppName);
        return false;
      });
      return false;
    });
    setApplications(keysList);
    setLocalStorage("PubNubApplicationsWithKey", keysList);
  }, []);

  useEffect(() => {
    if (searchResult.length) {
      setApplications(searchResult);
    }
  }, [searchResult]);

  const handleRowClick = (event, row) => {
    try {
      const selectedApp = applications.filter(function (app) {
        return app.subscribe_key === row.subscribe_key;
      });
      setLocalStorage("PubNubSelectedApp", selectedApp[0]);
      history.push("/overview");
    } catch (n) {
      throw new Error(n);
    }
  };

  return (
    <ListingTable
      data={applications}
      headCells={headCells}
      handleRowClick={handleRowClick}
      message={"No data Found"}
      number={0}
    />
  );
}
