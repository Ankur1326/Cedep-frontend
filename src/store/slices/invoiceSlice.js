import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helper/axiosInstance';
import { base_url } from '../../helper/helper';

// Define async thunk for creating an invoice
export const createInvoice = createAsyncThunk(
  'invoice/createInvoice',
  async (invoiceData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${base_url}/invoices/create-invoice`, invoiceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    invoice: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoice = action.payload;
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default invoiceSlice.reducer;
