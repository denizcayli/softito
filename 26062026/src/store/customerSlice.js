import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async Thunks
export const fetchCustomers = createAsyncThunk( //fetch db den müşterileri çekiyor
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => { //_ boş geçiyor db istek aıyo cev<p varsa 
  // data customer dönüyo hata ise rejecctwith value
    //_ → parametre yok (çekerken veri göndermiyorsun). 
    // rejectWithValue → hata payload'ı için.
    try {
      const response = await fetch('/db.json')
      ///db.json'a istek at, cevabı bekle.
      if (!response.ok) throw new Error('Müşteri verileri yüklenemedi.')
     //Cevap başarısızsa (404, 500 vb.) hata fırlat → catch'e atlar.
        const data = await response.json()//Ham cevabı JSON objeye çevir.
      return data.customers
      //İçinden customers dizisini döndür → fulfilled payload'ı olu
    } catch (error) {
      return rejectWithValue(error.message)
    }//Hata olursa mesajı rejected'a gönder. 
    // //Özet: Oku. Veriyi çek, başarılıysa diziyi dön
  }
)

export const addCustomerAsync = createAsyncThunk( //addCustomerAsync thunk'ını oluştur.
  'customers/addCustomerAsync',//Action type adı.
  async (customerData, { rejectWithValue }) => { //formdan gelen datayı gönderdik 
  // edeit bölümünden calıstırdı
    //id buldu verileri eşletirdi tekrar yukarı çıktı 
    // customerData → eklenecek müşteri bilgisi (name, email vb.
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      //600ms sahte API gecikmesi.
      return {
        id: Date.now(),
        balance: 0,
        ...customerData
        //Yeni obje dön: benzersiz id (zaman), balance: 0, gelen verinin tamamı → fulfilled payload'ı.
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }//Hata olursa mesajı dön. Özet: Ekle. id ve balance ekleyip yeni müşteriyi dön.
  }
)

export const editCustomerAsync = createAsyncThunk(
  //editCustomerAsync thunk'ını oluştur.
  'customers/editCustomerAsync',//Action type adı
  async (customerData, { rejectWithValue }) => { //customerData → güncellenmiş müşteri bilgisi (id'siyle birlikte).
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      return customerData
    } catch (error) {
      return rejectWithValue(error.message)
    }//Hata olursa mesajı dön.
//Özet: Güncelle. Veriyi aynen geri dön, asıl güncelleme reducer'da yapılır.

  }
)

export const deleteCustomerAsync = createAsyncThunk(
  //deleteCustomerAsync thunk'ını oluştur.
  'customers/deleteCustomerAsync',//Action type adı.
  async (customerId, { rejectWithValue }) => {
    //customerId → silinecek müşterinin sadece id'si.
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      return customerId //id'yi geri dön → fulfilled'da filter ile bu id listeden çıkarılacak.
    } catch (error) {
      return rejectWithValue(error.message)
    }//Hata olursa mesajı dön.Özet: Sil. Sadece id'yi dön, reducer onu listeden filtreler.
  }
)

const initialState = {
  list: [],
  selectedCustomer: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  actionStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
}

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    selectCustomerForEdit: (state, action) => {
      state.selectedCustomer = action.payload
    },
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Add
      .addCase(addCustomerAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(addCustomerAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        state.list.unshift(action.payload)
      })
      .addCase(addCustomerAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
      // Edit
      .addCase(editCustomerAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(editCustomerAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        const index = state.list.findIndex(c => c.id === action.payload.id)
        if (index !== -1) {
          state.list[index] = { ...state.list[index], ...action.payload }
        }
        state.selectedCustomer = null
      })
      .addCase(editCustomerAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
      // Delete
      .addCase(deleteCustomerAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(deleteCustomerAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        state.list = state.list.filter(c => c.id !== action.payload)
      })
      .addCase(deleteCustomerAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
  }
})

export const { selectCustomerForEdit, clearSelectedCustomer } = customerSlice.actions
export default customerSlice.reducer
