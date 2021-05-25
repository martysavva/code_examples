// Actions
import * as actions from "./actions";

// Initial State
import InitialState from "./initial-state";

export default function editMode(
  state = InitialState,
  action = { type: null }
) {
  const { type, payload } = action;
  switch (type) {
    case actions.SET: {
      return {
        ...state,
        [payload.key]: [...state[payload.key], payload.value]
      }
    }
    case actions.RESET: {
      return {
        ...state,
        [payload.key]: []
      }
    }
    default:
      return state;
  }
}