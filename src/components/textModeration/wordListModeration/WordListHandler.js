export const handleChange =
  ({ setState, state, profanityList, setProfanityList, name }) =>
  (e) => {
    if (e.target.name === "wordListChannel") {
      setState({
        ...state,
        channelOnChange: true,
        wordList: { ...state.wordList, wordListChannel: e.target.value },
      });
    } else if (e.target.name === "wordListLanguage") {
      setState({
        ...state,
        wordList: { ...state.wordList, wordListLanguage: e.target.value },
      });
    } else if (e.target.name === "wordListLanguageWords") {
      setProfanityList({
        ...profanityList,
        [state.wordList.wordListLanguage]: e.target.value,
      });
    } else if (e.target.name === "wordListModtype") {
      setState({
        ...state,
        wordList: { ...state.wordList, wordListModType: e.target.value },
      });
    } else if (e.target.name === "wordListCharacterToMaskWith") {
      setState({
        ...state,
        wordList: {
          ...state.wordList,
          wordListCharacterToMaskWith: e.target.value,
        },
      });
    } else if (e.target.name === "wordListRerouteMessage") {
      setState({
        ...state,
        wordList: {
          ...state.wordList,
          wordListReRouteMessages: e.target.checked,
        },
      });
    } else if (name === "applyToAllChannelIdsWordlist") {
      if (e.target.checked) {
        setState({
          ...state,
          wordList: {
            ...state.wordList,
            wordListChannel: "*",
            applyToAllChannelIdsWordlist: e.target.checked,
          },
        });
      } else {
        setState({
          ...state,
          wordList: {
            ...state.wordList,
            applyToAllChannelIdsWordlist: e.target.checked,
          },
        });
      }
    }
  };
