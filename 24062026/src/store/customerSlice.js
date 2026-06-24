import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    {
      id: 1,
      name: "Deniz Çaylı",
      company: "Vera Patent",
      email: "deniz@vera.com",
      phone: "05335333333",
      balance: 12500,
      status: "Pasif",
    },
    {
      id: 2,
      name: "Gizem Çaylı Yasa",
      company: "Vera Patent",
      email: "gizem@vera.com",
      phone: "05335333333",
      balance: 4500,
      status: "Aktif",
    },
    {
      id: 3,
      name: "Alperen Yasa",
      company: "Vera Patent",
      email: "alperen@vera.com",
      phone: "05335333333",
      balance: 12500,
      status: "Aktif",
    },
    {
      id: 4,
      name: "Gökçe Yasa Aykaç",
      company: "Vera Patent",
      email: "gokce@vera.com",
      phone: "05335333333",
      balance: -5000,
      status: "Pasif",
    },
  ],
   selecterCustomer: null,
};


const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: (state, action) => {
    addCustomer: (state, action) => {
      const nextId =
        state.list.length > 0
          ? Math.max(...state.list.map((c) => c.id)) + 1
          : 1;
      state.list.push({
        id: nextId,
        balance: 0,
        ...action.payload,
      });
    };
    editCustomer: (state, action) => {
      const index = state.list.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
      state.selecterCustomer = null;
    };
    deleteCustomer: (state, action) => {
      state.list = state.list.filter((c) => c.id !== action.payload);
    };
    selecterCustomerForEdit: (state,action)=>{
        state.selecterCustomer = action.payload;
    }
    clearSelectedCustomer: (state) =>{
        state.selecterCustomer = null;
    }
  },
});
export const {
  addCustomer,
  editCustomer,
  deleteCustomer,
  selectCustomerForEdit,
  clearSelectedCustomer,
} = customerSlice.actions;
export default customerSlice.reducer;
