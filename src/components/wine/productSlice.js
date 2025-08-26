import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// שליפת כל היינות עם פגיניישן
export const fetchWines = createAsyncThunk(
    "product/fetchWines",
    async ({ page = 1, perPage = 5, search = "" } = {}, { rejectWithValue }) => {
        try {
            const params = { page, perPage };
            if (search) params.search = search;
            const res = await axios.get("https://wine-store-server.onrender.com/api/product", { params });
            // השרת מחזיר { wines: [...], totalCount: ... }
            return { data: res.data.wines, totalCount: res.data.totalCount, page };
        } catch (err) {
            return rejectWithValue(err.response?.data || "שגיאת רשת");
        }
    }
);

// הוספת יין
export const addWine = createAsyncThunk(
    "product/addWine",
    async (wine, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post("https://wine-store-server.onrender.com/api/product/add_wine", wine, {
                headers: { "x-access-token": token }
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "שגיאת רשת");
        }
    }
);

// עדכון יין
export const updateWine = createAsyncThunk(
    "product/updateWine",
    async ({ wineid, wine }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(`https://wine-store-server.onrender.com/api/product/${wineid}`, wine, {
                headers: { "x-access-token": token }
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "שגיאת רשת");
        }
    }
);

// מחיקת יין
export const deleteWine = createAsyncThunk(
    "product/deleteWine",
    async (wineid, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`https://wine-store-server.onrender.com/api/product/${wineid}`, {
                headers: { "x-access-token": token }
            });
            return wineid;
        } catch (err) {
            return rejectWithValue(err.response?.data || "שגיאת רשת");
        }
    }
);

const initialState = {
    wines: {},      // שמירת יינות לפי עמודים
    loading: false,
    error: null,
    lastPage: 1,    // לשימור עמוד אחרון
    totalCount: 0,  // סך כל היינות במאגר
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setLastPage(state, action) {
            state.lastPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // שליפת יינות
            .addCase(fetchWines.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWines.fulfilled, (state, action) => {
                state.loading = false;
                const { data, page, totalCount } = action.payload;
                state.wines[page] = data; // כל עמוד מכיל בדיוק את היינות שלו
                state.totalCount = totalCount;
            })
            .addCase(fetchWines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // הוספת יין
            .addCase(addWine.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addWine.fulfilled, (state, action) => {
                state.loading = false;
                // מוסיף ליינות של עמוד 1 (רענון מהשרת עדיף)
                if (!state.wines[1]) state.wines[1] = [];
                state.wines[1].unshift(action.payload);
                state.totalCount += 1;
            })
            .addCase(addWine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // עדכון יין
            .addCase(updateWine.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateWine.fulfilled, (state, action) => {
                state.loading = false;
                // עדכון בכל העמודים
                Object.values(state.wines).forEach((arr) => {
                    const idx = arr.findIndex(w => w._id === action.payload._id);
                    if (idx !== -1) arr[idx] = action.payload;
                });
            })
            .addCase(updateWine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // מחיקת יין
            .addCase(deleteWine.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteWine.fulfilled, (state, action) => {
                state.loading = false;
                // מחיקה מכל העמודים
                Object.keys(state.wines).forEach(pageNum => {
                    state.wines[pageNum] = state.wines[pageNum].filter(w => w._id !== action.payload);
                });
                state.totalCount -= 1;
            })
            .addCase(deleteWine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setLastPage } = productSlice.actions;
export default productSlice.reducer;