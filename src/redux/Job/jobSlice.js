import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedJob: null,
}

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setSelectedJob(state, action) {
      state.selectedJob = action.payload
    },
  },
})

export const { setSelectedJob } = jobSlice.actions
export const selectSelectedJob = (state) => state.job.selectedJob
export default jobSlice.reducer
