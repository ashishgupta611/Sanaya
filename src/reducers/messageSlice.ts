import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  text: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface MessageState {
  messages: Message[];
}

const initialState: MessageState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Omit<Message, 'id'>>) => {
      const newMessage = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.messages.push(newMessage);
    },
    removeMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(msg => msg.id !== action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, removeMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;