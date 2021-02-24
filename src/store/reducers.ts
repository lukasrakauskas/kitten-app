import { combineReducers } from '@reduxjs/toolkit';

import kitten from 'src/features/kitten/kittenSlice';

const rootReducer = combineReducers({
  kitten
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
