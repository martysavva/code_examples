// Libs
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

// Actions
import * as actions from "./actions";
import { SET_DRAGGED_ARRAY } from "./actions";
import { SET_CATEGORIES_TO_SAVE } from "./actions";

// Setup
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Tests
describe('category-state actions', () => {


  it('setCategories: should set category state', ()=>{
    const initialState = {};
    const store = mockStore(initialState);
    const payload = {categories:{
        'MRP-1':{
          'activeRules':[],
          'changes':[],
          'draggedArray':[]
        },
      }};
    const expectedAction = {
      type: actions.SET,
      payload: {"categories": {"MRP-1": {"activeRules": [], "changes": [], "draggedArray": []}}}
    };

    // Dispatch the action
    store.dispatch(actions.setCategories(payload));

    // Test if your store dispatched the expected actions
    const storeActions = store.getActions();
    expect(storeActions).toEqual([expectedAction])
  });

  it('setActiveRules: should set set activeRules', ()=>{
    const initialState = {};
    const store = mockStore(initialState);
    const payload = {
      'identifier': 'MRP-1',
      'activeRules': [1,2,3]
    };

    const expectedAction = {
      type: actions.SET_ACTIVE_RULES,
      payload: {
        'identifier':'MRP-1',
        'activeRules': [1,2,3]
      }
    };

    // Dispatch the action
    store.dispatch(actions.setActiveRules(payload));

    // Test if your store dispatched the expected actions
    const storeActions = store.getActions();
    expect(storeActions).toEqual([expectedAction])
  });

  it('setChanges: should set set Changes', ()=>{
    const initialState = {};
    const store = mockStore(initialState);
    const payload = {
      'identifier': 'MRP-1',
      'changes': [1,2,3]
    };

    const expectedAction = {
      type: actions.SET_CHANGES,
      payload: {
        'identifier':'MRP-1',
        'changes': [1,2,3]
      }
    };

    // Dispatch the action
    store.dispatch(actions.setChanges(payload));

    // Test if your store dispatched the expected actions
    const storeActions = store.getActions();
    expect(storeActions).toEqual([expectedAction])
  });

  it('setDraggedArray: should set draggedArray', ()=>{
    const initialState = {};
    const store = mockStore(initialState);
    const payload = {
      'identifier': 'MRP-1',
      'array': [1,2,3]
    };

    const expectedAction = {
      type: actions.SET_DRAGGED_ARRAY,
      payload: {
        'identifier':'MRP-1',
        'array': [1,2,3]
      }
    };

    // Dispatch the action
    store.dispatch(actions.setDraggedArray(payload));

    // Test if your store dispatched the expected actions
    const storeActions = store.getActions();
    expect(storeActions).toEqual([expectedAction])
  });

  it('setCategoriesToSave: should set categoriesToSave', ()=>{
    const initialState = {};
    const store = mockStore(initialState);
    const payload = ['MRP-1'];

    const expectedAction = {
      type: actions.SET_CATEGORIES_TO_SAVE,
      payload: ['MRP-1']
    };

    // Dispatch the action
    store.dispatch(actions.setCategoriesToSave(payload));

    // Test if your store dispatched the expected actions
    const storeActions = store.getActions();
    expect(storeActions).toEqual([expectedAction])
  });

  it('handleCategoriesToSave: should remove item from array', ()=>{
    const initialState = {
      'categoryState': {
        'categoriesToSave':['MRP-1'],
        'categories':{
          'MRP-1':{
            'activeRules':[1,2,3],
            'changes':[[1,2,3]],
            'changesPosition':0,
            'draggedArray':[1,2,3,4]
          },
          'MRP-1-1':{
            'activeRules':[1,2,3],
            'changes':[[1,2,3]],
            'changesPosition':0,
            'draggedArray':[1,2,3,4]
          },
          'MRP-1-1-1':{
            'activeRules':[1,2,3],
            'changes':[[1,2,3]],
            'changesPosition':0,
            'draggedArray':[1,2,3,4]
          }
        }
      }
    };
    const store = mockStore(initialState);

    const payload = {identifier: 'MRP-1'};
    const expectedActions = [
      {
        "payload": [],
        "type": "[Category State] SET_CATEGORIES_TO_SAVE"
      }
    ];

    // Dispatch the action
    return store.dispatch(actions.handleCategoriesToSave(payload))
      .then(()=>{
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions)
      });
  });

  it('handleCategoriesToSave: should make no changes to array (no changes in category)', ()=>{
    const initialState = {
      'categoryState': {
        'categoriesToSave':['MRP-1'],
        'categories':{
          'MRP-1':{
            'activeRules':[1,2,3],
            'changes':[[1,2,3]],
            'changesPosition':0,
            'draggedArray':[1,2,3,4]
          },
          'MRP-1-1':{
            'activeRules':[1,2,3],
            'changes':[[1,2,3]],
            'changesPosition':0,
            'draggedArray':[1,2,3,4]
          },
          'MRP-1-1-1':{
            'activeRules':[1,2,3],
            'changes':[[1,2,3]],
            'changesPosition':0,
            'draggedArray':[1,2,3,4]
          }
        }
      }
    };
    const store = mockStore(initialState);

    const payload = {identifier: 'MRP-1-1'};
    const expectedActions = [
      {
        "payload": ['MRP-1'],
        "type": "[Category State] SET_CATEGORIES_TO_SAVE"
      }
    ];

    // Dispatch the action
    return store.dispatch(actions.handleCategoriesToSave(payload))
      .then(()=>{
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions)
      });
  });

  it('handleCategoriesToSave: should add category to array (changes in category)', ()=>{
    const initialState = {
      'categoryState': {
        'categoriesToSave':['MRP-1'],
        'categories':{
          'MRP-1':{
            'activeRules':[1,2,3],
            'changes':[1,2,3],
            'draggedArray':[1,2,3,4]
          },
          'MRP-1-1':{
            'activeRules':[1,2,3],
            'changes':[1,9,3],
            'draggedArray':[1,2,3,4]
          },
          'MRP-1-1-1':{
            'activeRules':[1,2,3],
            'changes':[1,2,3],
            'draggedArray':[1,2,3,4]
          }
        }
      }
    };
    const store = mockStore(initialState);

    const payload = {identifier: 'MRP-1-1'};
    const expectedActions = [
      {
        "payload": ['MRP-1', 'MRP-1-1'],
        "type": "[Category State] SET_CATEGORIES_TO_SAVE"
      }
    ];

    // Dispatch the action
    return store.dispatch(actions.handleCategoriesToSave(payload))
      .then(()=>{
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions)
      });
  });

  it('activateAllRules: should activate all rules', ()=> {
    // Initialize mockstore with empty state
    const initialState = {
      categoryState: {
        categories: {
          '12': {
            changes: [[6,4,3]],
            changesPosition: 0,
          }
        }
      },
      rules: {
        order: [1,2,3,4,5,6,7,8]
      }
    };
    const store = mockStore(initialState);
    const payload = {identifier:12};
    const expectedAction = {
      type: actions.SET_CHANGES,
      payload: {identifier:12, changes:[[6,4,3,1,2,5,7,8],[6,4,3]]}
    };


    // Dispatch the action
    store.dispatch(actions.activateAllRules(payload));

    // Test if your store dispatched the expected actions
    const storeActions = store.getActions();
    expect(storeActions).toEqual([expectedAction])
  });

  it('addRuleToBottomOfActiveRules: should add rule to the bottom of the list', ()=> {
    // Initialize mockstore with empty state
    const initialState = {
      categoryState: {
        categories: {
          '12': {
            changes: [[1,2,3]]
          }
        }
      }
    };
    const store = mockStore(initialState);
    const payload = {identifier:12, ruleId: 7};
    const expectedAction = {
      type: actions.SET_CHANGES,
      payload: {identifier:12, changes:[[1,2,3,7], [1,2,3]]}
    };


    // Dispatch the action
    store.dispatch(actions.addRuleToBottomOfActiveRules(payload));

    // Test if your store dispatched the expected actions
    const storeActions = store.getActions();
    expect(storeActions).toEqual([expectedAction]);
  });

  it('removeRuleFromActiveRules: should deactivate a rule', ()=> {
    // Initialize mockstore with empty state
    const initialState = {
      categoryState: {
        categories: {
          '12': {
            changes: [[1,7,2,3]]
          }
        }
      }
    };
    const store = mockStore(initialState);
    const payload = {identifier:12, ruleId: 7};
    const expectedAction = {
      type: actions.SET_CHANGES,
      payload: {identifier:12, changes:[[1,2,3], [1,7,2,3]]}
    };


    // Dispatch the action
    store.dispatch(actions.removeRuleFromActiveRules(payload));

    // Test if your store dispatched the expected actions
    const storeActions = store.getActions();
    expect(storeActions).toEqual([expectedAction]);
  });

  it('activateDeactivateRuleByDragging: should call handleChanges', async ()=> {
    // Initialize mockstore with empty state
    const initialState = {
      categoryState: {
        categories: {
          '12': {
            changes: [[1,2,3,4,5,6]],
            changesPosition: 0
          }
        }
      },
      CONSTS: {
        dragAndDrop: {
          targetTypes: {
            activeTop: 'activetop',
            activeBottom: 'activebottom',
            activeRule: 'activerule',
            deactivateRule: 'deactivaterule'
          }
        }
      }
    };
    const store = mockStore(initialState);
    const payload = {
      identifier:12,
      ruleId: 4
    };
    const expectedAction = {
      type: actions.SET_CHANGES,
      payload: {identifier:12, changes:[[1,2,3,5,6],[1,2,3,4,5,6]]}
    };

    // Dispatch the action
    await store.dispatch(actions.removeRuleFromActiveRules(payload));

    // Test if your store dispatched the expected actions
    const storeActions = store.getActions();
    expect(storeActions).toEqual([expectedAction]);
  });

  it('activateDeactivateRuleByDragging: should call removeRuleFromActiveRules', async ()=> {
    // Initialize mockstore with empty state
    const initialState = {
      categoryState: {
        categories: {
          '12': {
            changes: [[1,2,3,4,5,6]]
          }
        }
      },
      CONSTS: {
        dragAndDrop: {
          targetTypes: {
            activeTop: 'activetop',
            activeBottom: 'activebottom',
            activeRule: 'activerule',
            deactivateRule: 'deactivaterule'
          }
        }
      }
    };
    const store = mockStore(initialState);
    const payload = {
      identifier:12,
      ruleId: 4
    };
    const expectedAction = {
      type: actions.SET_CHANGES,
      payload: {identifier:12, changes:[[1,2,3,5,6],[1,2,3,4,5,6]]}
    };


    // Dispatch the action
    await store.dispatch(actions.removeRuleFromActiveRules(payload));

    // Test if your store dispatched the expected actions
    const storeActions = store.getActions();
    expect(storeActions).toEqual([expectedAction]);
  });

});