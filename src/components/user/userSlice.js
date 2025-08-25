import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// רישום משתמש
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (form, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3002/api/user/add_user", form);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "שגיאת רשת");
    }
  }
);
// התחברות משתמש
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (form, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3002/api/user/login", form);
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "שגיאת רשת");
    }
  }
);

// אימות מייל
export const verifyEmail = createAsyncThunk(
  "user/verifyEmail",
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3002/api/user/verify_email", { email, code });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "קוד שגוי או שגיאת רשת");
    }
  }
);
// שליפת כל המשתמשים
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.token;
      const res = await axios.get("http://localhost:3002/api/user", {
        headers: { "x-access-token": token }
      });
      return res.data; // מערך של משתמשים
    } catch (err) {
      return rejectWithValue(err.response?.data || "שגיאת רשת");
    }
  }
);

// שליפת המשתמש הנוכחי
export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.token || localStorage.getItem("token");
      const res = await axios.get("http://localhost:3002/api/user/me", {
        headers: { "x-access-token": token }
      });
      return res.data; // מחזיר את המשתמש
    } catch (err) {
      return rejectWithValue(err.response?.data || "שגיאה באימות משתמש");
    }
  }
);

// מחיקת משתמש
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.token;
      await axios.delete(`http://localhost:3002/api/user/${userId}`, {
        headers: { "x-access-token": token }
      });
      return userId;
    } catch (err) {
      return rejectWithValue(err.response?.data || "שגיאת מחיקה");
    }
  }
);


const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  success: null,
  emailVerificationStep: false,
  emailToVerify: "",
  emailVerified: false,
  users: [],
  usersLoading: false,
  usersError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    resetStatus(state) {
      state.error = null;
      state.success = null;
    },
    setEmailVerificationStep(state, action) {
      state.emailVerificationStep = action.payload.status;
      state.emailToVerify = action.payload.email || "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "נשלח קוד אימות למייל. יש לאמת את המייל.";
        state.emailVerificationStep = true;
        state.emailToVerify = action.meta.arg.email;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "שגיאה ברישום";
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "האימייל אומת בהצלחה! אפשר להתחבר.";
        state.emailVerified = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "קוד שגוי או שגיאת רשת";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.success = "התחברת בהצלחה!";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "שגיאה בהתחברות";
      })

      .addCase(fetchAllUsers.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersError = action.payload || "שגיאה בטעינת המשתמשים";
      })

      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.user = null;
        state.token = null;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.usersError = action.payload || "שגיאה במחיקת משתמש";
      });

  },
});

export const { logout, resetStatus, setEmailVerificationStep } = userSlice.actions;
export default userSlice.reducer;