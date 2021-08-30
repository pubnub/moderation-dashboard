import React from "react";
import WordListProfanityMethod from "./wordListModeration/WordListProfanityMethod";
import AutomaticProfanityMethod from "./automaticModeration/AutomaticProfanityMethod";

const ModerationMethods = ({
  handleSave,
  defaultWords,
  state,
  setState,
  profanityList,
  setProfanityList,
}) => {
  if (state.wordListProfanity === "true") {
    return (
      <WordListProfanityMethod
        handleSave={handleSave}
        defaultWords={defaultWords}
        state={state}
        setState={setState}
        profanityList={profanityList}
        setProfanityList={setProfanityList}
      />
    );
  } else if (state.automaticProfanity === "true") {
    return <AutomaticProfanityMethod state={state} setState={setState} handleSave={handleSave} />;
  } else {
    return <></>;
  }
};

export default ModerationMethods;
