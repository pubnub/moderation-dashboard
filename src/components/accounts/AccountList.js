import React from 'react';
import AccountCard from './AccountCard';
import { fetchAllApps } from '../../services/pubnub';
import { getCookie, setLocalStorage } from '../../services/localStorage';

const AccountList = ({ accounts }) => {
  const token = getCookie('token');

  const handleClick = async (selectedAccount) => {
    try {
      let apps = await fetchAllApps(selectedAccount.id, token);
      setLocalStorage('PubNubSelectedAccount', selectedAccount);
      setLocalStorage('PubNubApplications', apps);
      window.location.href = '/dashboard';
    } catch (e) {
      throw new Error(e);
    }
  };

  function AccountListing() {
    return accounts.map((account, i) => {
      return (
        <AccountCard
          account={account}
          key={i}
          handleClick={handleClick}
          index={i}
        />
      );
    });
  }

  return <AccountListing />;
};

export default AccountList;
