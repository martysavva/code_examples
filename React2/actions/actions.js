// API
import { apiPostCategories } from "../../data/api";

// Actions
import { globalMessagesSet } from "../global-messages/actions";
import { appIsLoadingContent } from "../app/actions";
import { messagesDeleteGroup, messagesSet } from "../messages/actions";

// Selectors
import {
  selectChangesIds,
  selectCategoriesToSave,
  selectHasChanges,
  selectChangesPosition,
  selectChanges
} from "./selectors";
import { selectCurrentCategory } from "../master-categories/selectors";
import { selectRuleIds } from "../rules/selectors";
import {
  selectErrorTypeSuccess,
  selectErrorTypeWarning,
  selectOopsMessage,
  selectTargetTypes
} from "../constants/selectors";
import { selectSelectedBrand } from "../config/selectors";

// Helpers
import globalMessageGenerator from "../../helpers/global-message-generator";
import httpResponseMessages from "../../helpers/http-response-messages";
import sortArrayByValue from "../../helpers/sort-array-by-value";
import messageGenerator from "../../helpers/message-generator";
import removeExtraneousArrays from "../../helpers/remove-extraneous-arrays";

// Constants
export const SET = "[Category State] SET";
export const RESET = "[Category State] RESET";
export const SET_ACTIVE_RULES = "[Category State] SET_ACTIVE_RULES";
export const SET_CHANGES = "[Category State] SET_CHANGES";
export const SET_DRAGGED_ARRAY = "[Category State] SET_DRAGGED_ARRAY";
export const SET_CATEGORIES_TO_SAVE = "[Category State] SET_CATEGORIES_TO_SAVE";
export const SET_CHANGES_POSITION = "[Category State] SET_CHANGES_POSITION";

// Setters
export const setCategories = payload => {
  return {
    type: SET,
    payload
  };
};

export const resetCategories = payload => {
  return {
    type: RESET
  };
};

export const setActiveRules = payload => {
  return {
    type: SET_ACTIVE_RULES,
    payload
  };
};

export const setChanges = payload => {
  return {
    type: SET_CHANGES,
    payload
  };
};

export const setDraggedArray = payload => {
  return {
    type: SET_DRAGGED_ARRAY,
    payload
  };
};

export const setCategoriesToSave = payload => {
  return {
    type: SET_CATEGORIES_TO_SAVE,
    payload
  };
};

export const setChangesPosition = payload => {
  return {
    type: SET_CHANGES_POSITION,
    payload
  };
};

/**
 * Adds or removes a category from 'categoriesToSave'
 *
 * @param identifier : string
 * @returns {Function}
 */
export const handleCategoriesToSave = ({identifier}) => async (dispatch, getState) => {
  const state = getState();
  const shouldAddItem = !selectHasChanges(state, identifier);

  let payload;
  if(shouldAddItem){
    const addItemToArrayAndRemoveDuplicates = new Set([...selectCategoriesToSave(state), identifier]);
    payload = [...addItemToArrayAndRemoveDuplicates];
  } else {
    payload = [...selectCategoriesToSave(state).filter((id)=>id!==identifier)];
  }

  dispatch(setCategoriesToSave(payload));
};

/**
 * Updates the 'changes' array relating to 'identifier'
 * then calls 'handleCategoriesToSave' to add or remove the identifier from the array
 *
 * @param identifier : string
 * @param changes : array
 * @returns {Function}
 */
export const handleChanges = ({identifier, changes}) => async (dispatch, getState) => {
  const state = getState();

  const position = selectChangesPosition(state, identifier);
  const fullChanges = selectChanges(state, identifier);

  // reset position to 0 if changes are made to anything other than the top change
  if(position > 0){
    await dispatch(setChangesPosition({identifier, value: 0}));
  }

  const newChanges = [changes, ...removeExtraneousArrays({array: fullChanges, position})];
  await dispatch(setChanges({identifier, changes: newChanges}));
  await dispatch(handleCategoriesToSave({identifier}));
  dispatch(resetDraggedArray({identifier}));
};

export const handleHoveredRule = ({identifier, array, hoveredRule, draggedRule}) => async (dispatch, getState) => {
  const isNewVariant = !array.includes(draggedRule);
  const newArray = isNewVariant ? [...array, draggedRule] : [...array];
  const reorderedArray = [...sortArrayByValue({array: [...newArray], valueFrom: draggedRule, valueTo: hoveredRule})];
  return dispatch(setDraggedArray({identifier, array: reorderedArray}));
};

export const resetDraggedArray = ({identifier}) => async (dispatch, getState) => {
  dispatch(setDraggedArray({identifier, array: []}));
};

export const deactivateAllRules = ({identifier}) => async (dispatch, getState) => {
  const changes = [];
  dispatch(handleChanges({identifier, changes}));
};

export const activateAllRules = ({identifier}) => async (dispatch, getState) => {
  const state = getState();

  const allRules = selectRuleIds(state);
  const activeRules = selectChangesIds(state, identifier);
  const fullRuleSet = [...activeRules, ...allRules.filter(rule=>!activeRules.includes(rule))];

  dispatch(handleChanges({identifier, changes: fullRuleSet}))
};

export const addRuleToTopOfActiveRules = ({identifier, ruleId}) => async (dispatch, getState) => {
  const state = getState();
  const activeRules = selectChangesIds(state, identifier);

  const activeRulesWithSourceIdRemoved = [...activeRules.filter((rule)=>rule!==ruleId)];

  const changes = [ruleId, ...activeRulesWithSourceIdRemoved];
  dispatch(handleChanges({identifier, changes}));
};

export const addRuleToBottomOfActiveRules = ({identifier, ruleId}) => async (dispatch, getState) => {
  const state = getState();

  const activeRules = selectChangesIds(state, identifier);
  const activeRulesWithSourceIdRemoved = [...activeRules.filter((rule)=>rule!==ruleId)];

  const changes = [...activeRulesWithSourceIdRemoved, ruleId];
  dispatch(handleChanges({identifier, changes}));
};

export const removeRuleFromActiveRules = ({identifier, ruleId}) => async (dispatch, getState) => {
  const state = getState();

  const activeRules = selectChangesIds(state, identifier);

  const changes = [...activeRules.filter((rule)=>rule!==ruleId)];

  dispatch(handleChanges({identifier, changes}));
};

export const activateDeactivateRuleByDragging = ({identifier, targetType, sourceRuleId, array }) => async (dispatch, getState) => {
  const state = getState();
  const targetTypes = selectTargetTypes(state);

  // adding rule to top of list (when dragging into an empty top list)
  if(targetType === targetTypes.activeTop){
    return dispatch(addRuleToTopOfActiveRules({identifier, ruleId: sourceRuleId}));
  }

  // changing rule position or adding rule to a specific position in the current ruleset
  if(targetType === targetTypes.activeRule){
    return dispatch(handleChanges({identifier, changes: array}));
  }

  // removing rules from activeRules
  if(targetType === targetTypes.deactivateRule){
    return dispatch(removeRuleFromActiveRules({identifier, ruleId: sourceRuleId}));
  }
};

export const saveCategories = ({saveAll = false} = false) => async (dispatch, getState) => {
  const state = getState();
  let messageObj = {};

  const brand = selectSelectedBrand(state);

  // save all or single
  const categoriesToSave = saveAll ? selectCategoriesToSave(state) : [selectCurrentCategory(state)];

  // build payload
  const arrayOfObjectsToSave = categoriesToSave.map((category)=>{
    return {
      identifier: category,
      rules: selectChangesIds(state, category)
    }
  });

  // generate payload for API
  const payload = {
    ruleMappings: arrayOfObjectsToSave
  };

  // start spinner
  dispatch(appIsLoadingContent(true));

  /**
   * API Call
   */
  const response = await apiPostCategories({payload, brand});

  // stop spinner
  dispatch(appIsLoadingContent(false));


  /**
   * API Error
   */
  // single variant message
  if (!saveAll && response.error) {
    const isNetworkError = !response.error.response.data.message;
    messageObj = {
      key: categoriesToSave[0],
      message: isNetworkError ? httpResponseMessages(response.error.response.status).message : response.error.response.data.message,
      type: selectErrorTypeWarning(state),
      active: true,
      position: 'right'
    };
    // send message
    return dispatch(messagesSet(messageGenerator(messageObj)));
  }

  // save all message
  if (saveAll && response.error) {
    const isNetworkError = !response.error.response.data.message;
    let globalMessageObj = {
      content: isNetworkError ? httpResponseMessages(response.error.response.status).message : response.error.response.data.message,
      type: selectErrorTypeWarning(state),
      active: true
    };
    // set global message
    return dispatch(globalMessagesSet(globalMessageGenerator(globalMessageObj)));
  }


  /**
   * API Success
   */
  const hasErrors = response.ruleMappings.some(rule=>!!rule.message);

  // SINGLE CATEGORY  ///////
  if (!saveAll) {
    const identifier = response.ruleMappings[0].identifier;
    const activeRules = response.ruleMappings[0].rules;
    const message = response.ruleMappings[0].message;

    // if no errors then save category
    if (!hasErrors){
      await dispatch(setActiveRules({identifier, activeRules}));
      await dispatch(handleCategoriesToSave({identifier}));
    }

    // send Message
    const messageObj = {
      key: identifier,
      message: hasErrors ? message : 'Category rules saved',
      type: hasErrors ? selectErrorTypeWarning(state) : selectErrorTypeSuccess(state),
      active: true,
      position: 'right'
    };
    // remove previous message
    await dispatch(messagesDeleteGroup(identifier));
    // set local message
    return dispatch(messagesSet(messageGenerator(messageObj)));
  }

  // SAVE ALL  //////////////
  // update all saved rules (with no errors)
  response.ruleMappings.map(async (rule)=>{
    const identifier = rule.identifier;
    const activeRules = rule.rules;

    // do not update categories with errors
    if (rule.message) return false;

    await dispatch(setActiveRules({identifier, activeRules}));
    await dispatch(handleCategoriesToSave({identifier}));
  });


  let globalMessageObj = {
    content: hasErrors ? selectOopsMessage(state) : 'All rules saved',
    type: hasErrors ? selectErrorTypeWarning(state) : selectErrorTypeSuccess(state),
    active: true
  };
  // set global message
  return dispatch(globalMessagesSet(globalMessageGenerator(globalMessageObj)));
};

export const undoChange = () => async (dispatch, getState) => {
  const state = getState();
  const identifier = selectCurrentCategory(state);
  const changesPosition = selectChangesPosition(state, identifier);

  await dispatch(setChangesPosition({identifier, value: changesPosition + 1}));
  return dispatch(handleCategoriesToSave({identifier}));
};

export const redoChange = () => async (dispatch, getState) => {
  const state = getState();
  const identifier = selectCurrentCategory(state);
  const changesPosition = selectChangesPosition(state, identifier);

  await dispatch(setChangesPosition({identifier, value: changesPosition - 1}));
  return dispatch(handleCategoriesToSave({identifier}));
};