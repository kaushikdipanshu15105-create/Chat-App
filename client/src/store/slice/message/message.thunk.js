import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../../components/utitlities/axiosInstance";

export const sendMessageThunk = createAsyncThunk(
  "message/send",
  async ({ receiverId, message }, { rejectWithValue }) => {
    console.log("Thunk received receiverId:", receiverId);
    console.log("Thunk received message:", message);

    try {
      

      const response = await axiosInstance.post(`/message/send/${receiverId}`, {
        message
      });
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const getMessageThunk = createAsyncThunk(
  "message/get",
  async ({ receiverId }, { rejectWithValue }) => {
    try {
      console.log("Getting messages for:", receiverId);
      const response = await axiosInstance.get(`/message/get-messages/${receiverId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);
