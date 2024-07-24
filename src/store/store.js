import { configureStore } from "@reduxjs/toolkit"
import invoiceReducer from "./slices/invoiceSlice.js"

export const store = configureStore({
    reducer: {
        invoice: invoiceReducer,
    },
})
