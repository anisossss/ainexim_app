import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
  createNewConversation,
  fetchConversations,
  fetchConversation,
  postMessage,
  createNewTeamConversation,
  fetchTeamConversations,
  fetchTeamConversation,
  postTeamMessage,
} from './chatOperations'

const extraActions = [
  createNewConversation.fulfilled,
  fetchConversations.fulfilled,
  fetchConversation.fulfilled,
  postMessage.fulfilled,
  createNewTeamConversation.fulfilled,
  fetchTeamConversations.fulfilled,
  fetchTeamConversation.fulfilled,
  postTeamMessage.fulfilled,
]

const getActions = (type) => isAnyOf(...extraActions.map((action) => action.type))

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    conversations: [],
    currentConversation: null,
    messages: [],
    lastMessages: {}, // Store last message for each conversation
    lastMessageSender: {}, // Store last message for each conversation
    teamConversations: [],
    currentTeamConversation: null,
    teamMessages: [],
    lastTeamMessages: {}, // Store last message for each team conversation
    isLoading: false,
    error: null,
    otherOnlineStatus: false,
  },
  reducers: {
    clearChatState(state) {
      state.conversations = []
      state.currentConversation = null
      state.messages = []
      state.lastMessages = {}
      state.isLoading = false
      state.error = null
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(getActions('pending'), (state) => {
        state.isLoading = true
      })
      .addMatcher(getActions('fulfilled'), (state, action) => {
        switch (action.type) {
          case fetchConversations.fulfilled.type:
            state.conversations = action.payload.conversationsWithLastMessages
            break
          case fetchConversation.fulfilled.type:
            state.currentConversation = action.payload.conversation
            state.messages = action.payload.messages
            state.otherOnlineStatus = action.payload.otherUserOnlineStatus
            state.otherUserName = action.payload.otherUserName

            state.lastMessages[action.payload.conversation._id] =
              action.payload.messages.slice(-1)[0]
            break
          case postMessage.fulfilled.type:
            state.messages.push({ ...action.payload })
            break
          case fetchTeamConversations.fulfilled.type:
            state.teamConversations = action.payload
            break
          case fetchTeamConversation.fulfilled.type:
            state.currentTeamConversation = action.payload
            state.teamMessages = action.payload.messages
            // Update last message for current team conversation
            state.lastTeamMessages[action.payload._id] = action.payload.messages.slice(-1)[0]
            break
          case postTeamMessage.fulfilled.type:
            state.teamMessages.push({ ...action.payload })
            // Update last message for current team conversation after posting new message
            state.lastTeamMessages[state.currentTeamConversation.id] = action.payload
            break
          default:
            break
        }
        state.isLoading = false
        state.error = null
      })
      .addMatcher(getActions('rejected'), (state, action) => {
        state.isLoading = false
        state.error = action.payload
      }),
})

export const { clearChatState } = chatSlice.actions
export default chatSlice.reducer
