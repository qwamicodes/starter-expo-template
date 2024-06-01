import { combineReducers } from 'redux';

import api from '@/services';

const rootReducer = combineReducers({
  // Add your reducers here
  [api.reducerPath]: api.reducer
});

export default rootReducer;
export type RootReducerType = ReturnType<typeof rootReducer>;
