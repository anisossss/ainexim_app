import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4402/api'
// axios.defaults.baseURL = 'https://api.ainexim.com/api'

axios.defaults.headers['Access-Control-Allow-Origin'] = '*'

export const checkActivityStatus = async (id) => {
  const { data } = await axios.post('/chat/activity-status', { id })
  return data.data
}
export const createConversation = async (participants, name) => {
  const { data } = await axios.post('/chat/create-conversation', { name, participants })
  return data
}

export const listConversations = async () => {
  const { data } = await axios.get('/chat/list-conversations')
  return data.data
}

export const getConversation = async (id) => {
  const { data } = await axios.get(`/chat/get-conversation/${id}`)
  return data.data
}

export const sendMessage = async (message) => {
  const { data } = await axios.post('/chat/send-message', message)
  return data.data
}

export const createTeamConversation = async (participants) => {
  const { data } = await axios.post('/chat/create-team-conversation', { participants })
  return data.data
}

export const listTeamConversations = async () => {
  const { data } = await axios.get('/chat/list-team-conversations')
  return data.data
}

export const getTeamConversation = async (id) => {
  const { data } = await axios.get(`/chat/get-team-conversation/${id}`)
  return data.data
}

export const sendTeamMessage = async (message) => {
  const { data } = await axios.post('/chat/send-team-message', message)
  return data.data
}
