import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../config/firebaseinit";

export const createUserThunk = createAsyncThunk(
  "user/createUserThunk",
  async ({ email, password }, thunkAPI) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          return thunkAPI.rejectWithValue("This email is already registered."); // Email already used for another account

        case "auth/invalid-email":
          return thunkAPI.rejectWithValue("Invalid email format."); // Invalid email format

        case "auth/weak-password":
          return thunkAPI.rejectWithValue(
            "Password should be at least 6 characters."
          ); // Weak password

        default:
          return thunkAPI.rejectWithValue("Signup failed: " + error.message); // General error message
      }
    }
  }
);

export const signInThunk = createAsyncThunk(
  "user/signInThunk",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredentials;
    } catch (error) {
      // Handle different error cases from Firebase authentication
      switch (error.code) {
        case "auth/invalid-email":
          return thunkAPI.rejectWithValue("Invalid email address."); // Invalid email format

        case "auth/invalid-credential":
          return thunkAPI.rejectWithValue("Incorrect email or password."); // Incorrect password entered

        case "auth/user-not-found":
          return thunkAPI.rejectWithValue("No user found with this email."); // No user registered with this email

        default:
          return thunkAPI.rejectWithValue("Login failed: " + error.message); // General error message
      }
    }
  }
);

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
  error: "",
  success: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setErrorEmpty: (state) => {
      state.error = "";
      state.success = "";
    },
    setClearInputBox: (state) => {
      state.name = "";
      state.email = "";
      state.password = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserThunk.pending, (state) => {})
      .addCase(createUserThunk.fulfilled, (state) => {
        state.success = "You Have Successfully SignUp!.";
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(signInThunk.pending, (state) => {})
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.success = "You have succeefully logged in!";
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  setName,
  setEmail,
  setPassword,
  setClearInputBox,
  setErrorEmpty,
} = userSlice.actions;

export default userSlice.reducer;
