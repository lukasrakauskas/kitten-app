import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CAT_API } from 'src/constants';
import { RootState } from 'src/store';

import { KittenDTO } from './kittenDto';

type BareKittenDTO = Pick<KittenDTO, 'id'>;

const CAT_NAMES = [
  'Perseus',
  'Quilstream',
  'MrFuzzbutt',
  'Butter',
  'Gulliver',
  'Ruby',
  'Azurisz',
  'Fred',
  'Twinkle'
];

export const fetchKittensByAmount = createAsyncThunk<BareKittenDTO[], number>(
  'kitten/fetchByAmount',
  async (amount) => {
    const response = await fetch(`${CAT_API}/api/cats?limit=${amount}`);
    return (await response.json()) as BareKittenDTO[];
  }
);

interface KittenState {
  kittens: KittenDTO[];
  status: 'idle' | 'pending' | 'succeded' | 'error';
  error: string;
}

const initialState: KittenState = {
  kittens: [],
  status: 'idle',
  error: ''
};

export const kittenSlice = createSlice({
  name: 'kitten',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchKittensByAmount.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(
      fetchKittensByAmount.fulfilled,
      (state, { payload: kittenIds }) => {
        const kittens = kittenIds.map<KittenDTO>(({ id }) => {
          const name = CAT_NAMES[Math.floor(Math.random() * CAT_NAMES.length)];
          const uri = `${CAT_API}/cat/${id}`;
          return { id, name, uri };
        });

        state.kittens = kittens;
        state.status = 'succeded';
      }
    );
    builder.addCase(fetchKittensByAmount.rejected, (state) => {
      state.error = 'failed to fetch kittens';
      state.status = 'error';
    });
  }
});

export const selectKittens = (state: RootState) => state.kitten.kittens;

export default kittenSlice.reducer;
