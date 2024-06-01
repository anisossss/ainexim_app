import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createConversation as createConversationAPI,
  listConversations as listConversationsAPI,
  getConversation as getConversationAPI,
  sendMessage as sendMessageAPI,
  createTeamConversation as createTeamConversationAPI,
  listTeamConversations as listTeamConversationsAPI,
  getTeamConversation as getTeamConversationAPI,
  sendTeamMessage as sendTeamMessageAPI,
  checkActivityStatus as checkActivityStatusAPI,
} from 'services/chat-API'
import { selectToken } from '../Auth/authSelectors'

const withAuthHeader = (apiFunc) => async (args, thunkAPI) => {
  const token = selectToken(thunkAPI.getState())
  try {
    const res = await apiFunc(args, token)
    return res
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : 'Something went wrong'
    return thunkAPI.rejectWithValue(errorMessage)
  }
}

export const activityStatus = createAsyncThunk(
  'chat/activityStatus',
  withAuthHeader(checkActivityStatusAPI)
)

export const createNewConversation = createAsyncThunk(
  'chat/createConversation',
  withAuthHeader(createConversationAPI)
)

export const fetchConversations = createAsyncThunk(
  'chat/listConversations',
  withAuthHeader(listConversationsAPI)
)

export const fetchConversation = createAsyncThunk(
  'chat/getConversation',
  withAuthHeader(getConversationAPI)
)

export const postMessage = createAsyncThunk('chat/sendMessage', withAuthHeader(sendMessageAPI))

export const createNewTeamConversation = createAsyncThunk(
  'chat/createTeamConversation',
  withAuthHeader(createTeamConversationAPI)
)

export const fetchTeamConversations = createAsyncThunk(
  'chat/listTeamConversations',
  withAuthHeader(listTeamConversationsAPI)
)

export const fetchTeamConversation = createAsyncThunk(
  'chat/getTeamConversation',
  withAuthHeader(getTeamConversationAPI)
)

export const postTeamMessage = createAsyncThunk(
  'chat/sendTeamMessage',
  withAuthHeader(sendTeamMessageAPI)
)
