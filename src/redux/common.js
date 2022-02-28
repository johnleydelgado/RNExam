import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openModals: [],
  isFetching: false,
  scrollToTop: false,
};

export const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    /**
     * OPEN_MODAL
     * @param {string} action.payload - name of modal to be opened
     * @returns {string[]} array of name of modals that should be opened
     */
    OPEN_MODAL: (state, action) => {
      state.openModals =
        state.openModals.filter((x) => x === action.payload).length > 0 ? state.openModals : [...state.openModals, action.payload];
    },
    /**
     * CLOSE_MODAL
     * @param {string} action.payload - name of modal to be closed
     * @returns {string[]} array of name of modals without the payload
     */
    CLOSE_MODAL: (state, action) => {
      state.openModals =
        state.openModals.filter((x) => x === action.payload).length > 0
          ? state.openModals.filter((x) => x !== action.payload)
          : state.openModals;
    },
    // Scroll a scrollview to top
    SCROLL_TO_TOP: (state, action) => {
      state.scrollToTop = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { OPEN_MODAL, CLOSE_MODAL, SCROLL_TO_TOP } = common.actions;

export default common.reducer;
