export default function reducer(state={
    groups: [],
  }, action) {

    switch (action.type) {
      case "ADD_GROUP": {
        return {
          ...state,
          groups: [...state.groups, action.payload],
        }
      }
      case "UPDATE_TWEET": {
        const { id, text } = action.payload
        const newTweets = [...state.tweets]
        const tweetToUpdate = newTweets.findIndex(tweet => tweet.id === id)
        newTweets[tweetToUpdate] = action.payload;

        return {
          ...state,
          tweets: newTweets,
        }
      }
      case "DELETE_GROUP": {
        return {
          ...state,
          groups: state.groups.filter(group => group.id !== action.payload),
        }
      }
    }

    return state
}

