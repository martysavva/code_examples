// Libs
import { createSelector } from 'reselect';

// Helpers
import timestampConverter from '../../helpers/timestamp-converter';
import arrayEquality from "../../helpers/array-equality";

// Imported Selectors
import { selectWIWFilter } from '../filter/selectors';
import { selectWIWEditModeHasEdit } from "../edit-mode/selectors";
import { selectTimeLastSavedMessage, selectFilterKeys, selectWIWService, selectUserUnknown } from "../constants/selectors";
import { selectCombinedVariant } from "../variants/selectors";
import { selectVariantAttributes } from "../variants-attributes/selectors";

// Selectors
export const selectSubjectIds = state => state.wiwSubjects.changes;
export const selectSubject = (state, subjectId) => state.wiwSubjects[subjectId];
export const selectCurrentConcertina = state => state.app.currentConcertina;

export const selectCurrentOutfit = createSelector(
  selectSubject,
  subject => subject.wearItWith.selectedChange
);
export const selectIsActive = (state, subjectId) => subjectId === selectCurrentConcertina(state);

export const selectOutfitIds = (state, subjectId) => {
  const outfitIds = state.wiwSubjects[subjectId].wearItWith.changes;
  const filter = selectWIWFilter(state).key;

  if(filter) {
    return outfitIds.filter((outfitId) => {
        return selectSlotIds(state, subjectId, outfitId).length > 0;
      });
  }

  return outfitIds;
};

export const selectSlotIds = (state, subjectId, outfitId = null, unfiltered = null) => {
  const { autoFilled, manuallyCurated, all } = selectFilterKeys(state);

  // use supplied outfitId or select the current outfit
  const selectedOutfitId = outfitId || selectCurrentOutfit(state, subjectId);
  // allow for unfiltered results, all will force default condition
  const filter = unfiltered ? all : selectWIWFilter(state).key;

  switch (filter) {
    case autoFilled:
      return state.wiwSubjects[subjectId].wearItWith[selectedOutfitId].slots.changes
        .filter((slotId)=>{
          // add slot if its in the edit queue
          if(selectWIWEditModeHasEdit(state, `${subjectId}_${selectedOutfitId}_${slotId}`)){
            return true;
          }
          // otherwise add slot if autofilled
          const slot = selectSlot(state, subjectId, slotId, selectedOutfitId);
          return slot.autoFilled;
        });
    case manuallyCurated:
      return state.wiwSubjects[subjectId].wearItWith[selectedOutfitId].slots.changes
        .filter((slotId)=>{
          const slot = selectSlot(state, subjectId, slotId, selectedOutfitId);
          return !slot.autoFilled && !slot.error;
        });
    default:
      return state.wiwSubjects[subjectId].wearItWith[selectedOutfitId].slots.changes;
  }
};

export const selectSlot = (state, subjectId, slotId, outfitId = null) => {
  const outfit = outfitId || selectCurrentOutfit(state, subjectId);
  return state.wiwSubjects[subjectId].wearItWith[outfit].slots[slotId];
};

export const selectSlotsChanges = (state, subjectId, outfitId = null) => {
  const outfit = outfitId || selectCurrentOutfit(state, subjectId);
  return state.wiwSubjects[subjectId].wearItWith[outfit].slots.changes;
};

export const selectSlotsSaved = (state, subjectId, outfitId = null) => {
  const outfit = outfitId || selectCurrentOutfit(state, subjectId);
  return state.wiwSubjects[subjectId].wearItWith[outfit].slots.saved;
};

export const selectsSlotsOrderHasChanged = createSelector(
  [selectSlotsChanges, selectSlotsSaved],
  (changes, saved) => {

    return arrayEquality(changes, saved);
  }
);

export const selectOutfitImage = createSelector(
  [selectCurrentOutfit, selectSubject],
  (currentOutfit, subject) => {
    return subject.wearItWith[currentOutfit].photo
  }
);
export const selectOutfitImagePreview = (state, subjectId, outfitId) => state.wiwSubjects[subjectId].wearItWith[outfitId].photo;

export const selectDescriptionContent = createSelector(
  [selectSubject],
  (subject) => {
    return {
      variantId: subject.variantId,
      photo: subject.photo,
      designerName: subject.designerName,
      colour: subject.colour,
      filterColour: subject.filterColour,
      name: subject.name,
      price: subject.price,
      classification: subject.classification,
      season: subject.season
    }
  }
);




export const selectSlotError = createSelector(
  [selectSlot],
  slot => slot.error
);
export const selectSlotAutofilled = createSelector(
  [selectSlot],
  slot => slot.autoFilled
);
export const selectSlotEditedBy = createSelector(
  [selectSlot, selectUserUnknown],
  (slot, userUnknownText) => slot.editedBy || userUnknownText
);
export const selectTimeLastSaved = createSelector(
  [selectSlot, selectTimeLastSavedMessage],
  (slot, message) => {
    let momentTimeLastSaved = null;
    if(slot.timeLastSaved){
      momentTimeLastSaved = timestampConverter(slot.timeLastSaved);
    }
    return momentTimeLastSaved || message;
  }
);
export const selectReplacementIds = createSelector(
  [selectSlot],
  slot => slot.replacementVariants.changes[slot.replacementVariants.changesPosition]
);
export const selectNumberOfItemsInSlot = createSelector(
  [selectSlot],
  slot => slot.replacementVariants.changes[slot.replacementVariants.changesPosition].length
);
export const selectSavedReplacementIds = createSelector(
  [selectSlot],
  slot => slot.replacementVariants.saved
);
export const selectChanges = createSelector(
  [selectSlot],
  slot => slot.replacementVariants.changes
);
export const selectChangesPosition = createSelector(
  [selectSlot],
  slot => slot.replacementVariants.changesPosition
);

export const selectArrayFromChangesArray = createSelector(
  [selectChanges, selectChangesPosition],
  (changesArray, changesPosition) => {
    if (changesArray[changesPosition]) return changesArray[changesPosition];
    return [];
  }
);

export const selectWIWVariant = (state, subjectId, associatedId, variantId, outfitId = null) => {
  const outfit = outfitId || selectCurrentOutfit(state, subjectId);
  const service = selectWIWService(state);
  return selectCombinedVariant(state, service, subjectId, outfit, associatedId, variantId);
};
export const selectWIWVariantError = (state, subjectId, associatedId, variantId, outfitId = null) => {
  const outfit = outfitId || selectCurrentOutfit(state, subjectId);
  const service = selectWIWService(state);
  return selectVariantAttributes(state, service, subjectId, outfit, associatedId, variantId).error;
};


