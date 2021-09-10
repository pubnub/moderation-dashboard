import React from "react";
import AccountCard from "./AccountCard";
import { fetchAllApps } from "../../services/pubnub";
import { getCookie, setLocalStorage } from "../../services/localStorage";
import { useHistory } from "react-router-dom";

const AccountList = ({ accounts }) => {
  const token = getCookie("token");
  const history = useHistory();

  const handleClick = async (selectedAccount) => {
    try {
      let apps = await fetchAllApps(selectedAccount.id, token);
      setLocalStorage("PubNubSelectedAccount", selectedAccount);
      setLocalStorage("PubNubApplications", apps);
      history.push("/dashboard");
    } catch (e) {
      throw new Error(e);
    }
  };

  function AccountListing() {
    return accounts.map((account, i) => {
      return <AccountCard account={account} key={i} handleClick={handleClick} index={i} />;
    });
  }

  return <AccountListing />;
};

export default AccountList;
