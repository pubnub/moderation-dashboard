export const mockPubnubAccounts = [
  {
    created: null,
    dates: {
      company: { created: 1619760528, modified: null },
      product_of_interest: { created: 1619760609, modified: null },
      use_case: { created: 1619760609, modified: null },
    },
    email: "testsourcefusepubnub@gmail.com",
    id: 572238,
    internal_cipher_key: ")[t*)u^>[\\\\t{7pi>./t2@,@-9}\\ys31",
    mau_pricing_plan: { pricing_plan: { plan_type: "mau_t1" } },
    modified: 1619760609,
    owner_id: 572287,
    product_of_interest: { name: "chat", value: 2 },
    properties: { company: "sourcefuse", product_of_interest: 2, use_case: 1 },
    protected: 0,
    transaction_pricing_plan: {},
  },
  {
    created: null,
    dates: {
      company: { created: 1618297058, modified: null },
      product_of_interest: { created: 1618297266, modified: null },
      use_case: { created: 1618297266, modified: null },
    },
    email: "abc@sourcefuse.com",
    id: 571121,
    idp_domain_forbidden: false,
    internal_cipher_key: ",3#(di^t-[?73_#t8:9*qih/s`5/}_0|",
    mau_pricing_plan: { pricing_plan: { plan_type: "mau_t1" } },
    modified: 1618297266,
    owner_id: 571170,
    product_of_interest: { name: "chat", value: 2 },
    properties: { company: "SourceFuse", product_of_interest: 2, use_case: 1 },
    protected: 0,
    transaction_pricing_plan: {},
  },
  {
    created: null,
    dates: {
      company: { created: 1618577901, modified: null },
      product_of_interest: { created: 1618732591, modified: null },
      use_case: { created: 1618732591, modified: null },
    },
    email: "xyz@gmail.com",
    id: 571344,
    idp_domain_forbidden: false,
    modified: 1618732591,
    owner_id: 571393,
    product_of_interest: { name: "chat", value: 2 },
    properties: { company: "Sourcefuse Technologies", product_of_interest: 2 },
    protected: 0,
  },
  {
    created: null,
    dates: {
      company: { created: 1619505312, modified: null },
      product_of_interest: { created: 1619505545, modified: null },
      use_case: { created: 1619505545, modified: null },
    },
    email: "testAccount@sourcefuse.com",
    id: 572023,
    idp_domain_forbidden: false,
    modified: 1619505545,
    owner_id: 572072,
    product_of_interest: { name: "chat", value: 2 },
    properties: { company: "sourcefuse", product_of_interest: 2 },
    protected: 0,
  },
];

export const mockPubnubChannelMembers = [
  {
    uuid: {
      id: "fb57c1db-63e3-436a-ad45-e0321",
      name: "Jagrit",
      externalId: null,
      profileUrl: null,
      email: "xyz@com.com",
      custom: null,
      updated: "2021-08-04T10:46:41.566864Z",
      eTag: "AeuKga/Jkviv3QE",
    },
    updated: "2021-08-04T10:50:56.624097Z",
    eTag: "AY39mJKK//C0VA",
    mute: false,
    block: false,
  },
  {
    uuid: {
      id: "user_16cc89c2e06c497cb65930f0c4729dce",
      name: "Ronny Raffa",
      externalId: null,
      profileUrl:
        "https://www.gravatar.com/avatar/11e9996402d7e921a55192bdf957bc18?s=256&d=identicon",
      email: "ronny@gmail.com",
      custom: {
        ban: true,
        title: "VP Product Management",
      },
      updated: "2021-08-02T10:15:55.866667Z",
      eTag: "AdfqvLrE1LC5Ow",
    },
    updated: "2021-07-14T10:37:26.920785Z",
    eTag: "AY39mJKK//C0VA",
    mute: false,
    block: false,
  },
  {
    uuid: {
      id: "user_2bf0a23078ca4ea09ed6a86c9efa3b14",
      name: "Zula Zufelt",
      externalId: null,
      profileUrl:
        "https://www.gravatar.com/avatar/29e3b01657aa849eba3711bcc1951c64?s=256&d=identicon",
      email: null,
      custom: {
        title: "VP Product Management",
        mutedChannels: ["pro.one", "abc"],
        blockedChannels: ["pro.one", "abc"],
      },
      updated: "2021-05-31T11:41:06.585022Z",
      eTag: "Ab+2gvH+z/ParAE",
    },
    updated: "2021-07-28T06:58:43.54965Z",
    eTag: "AY39mJKK//C0VA",
    mute: false,
    block: false,
  },
];

export const mockUuid = "6e9d8b51-e122-4515-b422-93f13db127d0";

export const mockPubNubSelectedChannel = "pro.one";

export const mockPubNubApplications = {
  result: [
    {
      app_type: 1,
      created: 1622091646,
      dates: {
        stats_channel: {
          created: 1622091646,
          modified: null,
        },
      },
      id: 35387765,
      keys: [
        {
          app_id: 35387765,
          app_type: {
            name: "pubsub",
            value: 1,
          },
          created: 1622091646,
          dates: {
            bill_by_uuid: {
              created: 1622091646,
              modified: null,
            },
            eh_skip_pub_func_exec_for_internal_chan_msg_enabled: {
              created: 1622091646,
              modified: null,
            },
            multiplexing: {
              created: 1622091646,
              modified: null,
            },
            name: {
              created: 1622091646,
              modified: null,
            },
            realtime_analytics: {
              created: 1622091646,
              modified: 1626181312,
            },
            realtime_analytics_channel: {
              created: 1622091646,
              modified: null,
            },
            wildcardsubscribe: {
              created: 1622091646,
              modified: null,
            },
          },
          expires: null,
          id: 1033619,
          modified: 1622091646,
          product_id: 12,
          properties: {
            bill_by_uuid: 1,
            eh_skip_pub_func_exec_for_internal_chan_msg_enabled: 1,
            multiplexing: 1,
            name: "Creator Keyset",
            realtime_analytics: 0,
            realtime_analytics_channel: "ouya7ZzkKZmfCK2AIlUa",
            wildcardsubscribe: 1,
          },
          publish_key: "pub-c-db8614ea-d77b-4998-8953-90644cb7a498",
          secret_key: "sec-c-NTQxZGUwODctMDI4Yi00NWE5LWIxZmEtZTU0ZWRiNDgwNDM4",
          status: 1,
          subscribe_key: "sub-c-7f42862c-bea8-11eb-8415-662615fc053c",
        },
      ],
      modified: null,
      name: "Creator",
      owner_id: 572238,
      properties: {
        stats_channel: "eapRpIYT7CXIvIQJE8JF",
      },
      status: 1,
    },
    {
      app_type: 1,
      created: 1622091655,
      dates: {
        stats_channel: {
          created: 1622091654,
          modified: null,
        },
      },
      id: 35387766,
      keys: [
        {
          app_id: 35387766,
          app_type: {
            name: "pubsub",
            value: 1,
          },
          created: 1622091655,
          dates: {
            bill_by_uuid: {
              created: 1622091654,
              modified: null,
            },
            eh_skip_pub_func_exec_for_internal_chan_msg_enabled: {
              created: 1622091654,
              modified: null,
            },
            multiplexing: {
              created: 1622091654,
              modified: null,
            },
            name: {
              created: 1622091654,
              modified: null,
            },
            realtime_analytics: {
              created: 1622091654,
              modified: 1626181312,
            },
            realtime_analytics_channel: {
              created: 1622091654,
              modified: null,
            },
            wildcardsubscribe: {
              created: 1622091654,
              modified: null,
            },
          },
          expires: null,
          id: 1033620,
          modified: 1622091655,
          product_id: 12,
          properties: {
            bill_by_uuid: 1,
            eh_skip_pub_func_exec_for_internal_chan_msg_enabled: 1,
            multiplexing: 1,
            name: "Genesis Keyset",
            realtime_analytics: 0,
            realtime_analytics_channel: "ZDiYquKlKIUgCqDlJqer",
            wildcardsubscribe: 1,
          },
          publish_key: "pub-c-2584c996-4aaf-4af1-a060-30499ce44e28",
          secret_key: "sec-c-NjUyOTA4NjMtNGZkMC00MjIwLWFkNTAtZDkyNDUzYmYzNzU4",
          status: 1,
          subscribe_key: "sub-c-844225ec-bea8-11eb-aee1-fe487e55b6a4",
        },
      ],
      modified: null,
      name: "Genesis",
      owner_id: 572238,
      properties: {
        stats_channel: "o8D37FrCESaEIKmLRy39",
      },
      status: 1,
    },
    {
      app_type: 1,
      created: 1622091704,
      dates: {
        stats_channel: {
          created: 1622091703,
          modified: null,
        },
      },
      id: 35387767,
      keys: [
        {
          app_id: 35387767,
          app_type: {
            name: "pubsub",
            value: 1,
          },
          created: 1622091704,
          dates: {
            bill_by_uuid: {
              created: 1622091704,
              modified: null,
            },
            eh_skip_pub_func_exec_for_internal_chan_msg_enabled: {
              created: 1622091704,
              modified: null,
            },
            multiplexing: {
              created: 1622091703,
              modified: null,
            },
            name: {
              created: 1622091703,
              modified: null,
            },
            realtime_analytics: {
              created: 1622091703,
              modified: 1626181312,
            },
            realtime_analytics_channel: {
              created: 1622091704,
              modified: null,
            },
            wildcardsubscribe: {
              created: 1622091703,
              modified: null,
            },
          },
          expires: null,
          id: 1042218,
          modified: 1622091704,
          product_id: 12,
          properties: {
            bill_by_uuid: 1,
            eh_skip_pub_func_exec_for_internal_chan_msg_enabled: 1,
            multiplexing: 1,
            name: "deuteronomy Keyset",
            realtime_analytics: 0,
            realtime_analytics_channel: "DE7bD9bLAKSota30tPce",
            wildcardsubscribe: 1,
          },
          publish_key: "pub-c-f0639103-3343-448c-87fa-64dbe803a56b",
          secret_key: "sec-c-MjlhYjhhZDItNjVkMi00OGY3LTkzN2UtNWMxMTU5MzVkZWEx",
          status: 1,
          subscribe_key: "sub-c-a18a4e86-bea8-11eb-aee1-fe487e55b6a4",
        },
      ],
      modified: null,
      name: "deuteronomy",
      owner_id: 572238,
      properties: {
        stats_channel: "srDsPWompQ7fnpejmeFu",
      },
      status: 1,
    },
    {
      app_type: 1,
      created: 1622091777,
      dates: {
        stats_channel: {
          created: 1622091776,
          modified: null,
        },
      },
      id: 35387768,
      keys: [
        {
          app_id: 35387768,
          app_type: {
            name: "pubsub",
            value: 1,
          },
          created: 1622091777,
          dates: {
            apns_bundle_id: {
              created: 1623411052,
              modified: null,
            },
            apns_sandbox: {
              created: 1623411052,
              modified: null,
            },
            apns_version: {
              created: 1623411052,
              modified: null,
            },
            bill_by_uuid: {
              created: 1622091777,
              modified: null,
            },
            channelgroup_index_disable: {
              created: 1623411052,
              modified: null,
            },
            eh_skip_pub_func_exec_for_internal_chan_msg_enabled: {
              created: 1622091777,
              modified: null,
            },
            history: {
              created: 1623411052,
              modified: null,
            },
            message_storage_ttl: {
              created: 1623411052,
              modified: null,
            },
            multiplexing: {
              created: 1622091777,
              modified: null,
            },
            name: {
              created: 1622091776,
              modified: null,
            },
            objects_region: {
              created: 1623411052,
              modified: null,
            },
            presence_announce_max: {
              created: 1623411052,
              modified: null,
            },
            presence_debounce: {
              created: 1623411052,
              modified: null,
            },
            presence_global_here_now: {
              created: 1623411052,
              modified: null,
            },
            presence_interval: {
              created: 1623411052,
              modified: null,
            },
            presence_store_event_messages: {
              created: 1623411052,
              modified: null,
            },
            presence_stream_filtering: {
              created: 1623411052,
              modified: null,
            },
            realtime_analytics: {
              created: 1622091776,
              modified: 1626181312,
            },
            realtime_analytics_channel: {
              created: 1622091777,
              modified: null,
            },
            wildcardsubscribe: {
              created: 1622091777,
              modified: null,
            },
          },
          expires: null,
          id: 1042278,
          modified: 1622091777,
          product_id: 12,
          properties: {
            apns_bundle_id: "",
            apns_sandbox: 1,
            apns_version: "v3",
            bill_by_uuid: 1,
            channelgroup_index_disable: 1,
            eh_skip_pub_func_exec_for_internal_chan_msg_enabled: 1,
            history: 1,
            message_storage_ttl: 7,
            multiplexing: 1,
            name: "humnaity Keyset",
            objects_region: "",
            presence_announce_max: 20,
            presence_debounce: 2,
            presence_global_here_now: 0,
            presence_interval: 30,
            presence_store_event_messages: 0,
            presence_stream_filtering: 1,
            realtime_analytics: 0,
            realtime_analytics_channel: "lDIHFSi9TQBYgl41UJrr",
            wildcardsubscribe: 1,
          },
          publish_key: "pub-c-ea4ed518-b3ef-4f5e-a78f-05a9c77289a4",
          secret_key: "sec-c-NzdmZDc2OTUtNDJiZi00N2Y1LWE1ODItNzJmNTg1MTNmNTk2",
          status: 1,
          subscribe_key: "sub-c-cd13ee18-bea8-11eb-aee1-fe487e55b6a4",
        },
      ],
      modified: null,
      name: "humnaity",
      owner_id: 572238,
      properties: {
        stats_channel: "ZGfud9wEnfbYztHaRnBR",
      },
      status: 1,
    },
  ],
  total: 4,
};

export const mockChannels = [
  {
    id: "Chanel",
    name: "chanel",
    description: "",
    updated: "July 19th 2021, 3:59 pm",
    eTag: "AcO1z8K3ocGTiAE",
  },
  {
    id: "pro.rest",
    name: "pro.rest",
    description: "testing",
    updated: "June 25th 2021, 8:16 pm",
    eTag: "Aezy1oWl5KODhwE",
  },
  {
    id: "pro.pro",
    name: "pro.pro",
    description: "",
    updated: "June 24th 2021, 6:32 pm",
    eTag: "AdeTpoilq7q32AE",
    occupancy: 1,
  },
  {
    id: "space_363d9255193e45f190539e0c7d5",
    name: "Running",
    description: "soc-running space",
    updated: "May 31st 2021, 5:12 pm",
    eTag: "AcrWgrqgmcyHswE",
  },
  {
    id: "space_149e60f311749f2a7c6515f7b34",
    name: "Movies",
    description: "Everything about movies",
    updated: "May 31st 2021, 5:12 pm",
    eTag: "AbOx6N+6vu3zoAE",
  },
  {
    id: "space_e1eda2fd92e551358e4af1b6174",
    name: "Exec AMA",
    description: "Ask the CEO anything",
    updated: "May 31st 2021, 5:12 pm",
    eTag: "Ade5g4XZzN652AE",
  },
  {
    id: "12we",
    name: "12we#",
    description: "",
    updated: "May 18th 2021, 6:56 pm",
    eTag: "AdqN04eY47fAMg",
  },
];

export const mockPubNubUsers = [
  {
    id: "renutereehghsgjskKJSJsdxcvbnmzxcvbnsdfghjdfgh3456789234567hj7fgh",
    name: "abc",
    externalId: null,
    profileUrl: null,
    email: "abc@gmai.com",
    custom: { ban: true },
    updated: "June 22nd 2021, 11:06 am",
    eTag: "AfjT/bqU2ZaiMw",
    uuid: "renutereehghsgjskKJSJsdxcvbnmzxcvbnsdfghjdfgh3456789234567hj7fgh",
  },
  {
    id: "814c3dc5-1bdb-4287-957b-fa338077841c",
    name: "xyz",
    externalId: null,
    profileUrl: null,
    email: null,
    custom: { ban: true },
    updated: "May 28th 2021, 5:10 pm",
    eTag: "AYOCvLyGq7HtlwE",
    uuid: "814c3dc5-1bdb-4287-957b-fa338077841c",
  },
];

export default null;
