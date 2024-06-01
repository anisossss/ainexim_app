import React from 'react'
import { withStyles, Words } from 'arwes'
import { Table } from 'arwes'
import { Link } from 'react-router-dom'
import { MdWork } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { setSelectedJob } from '../../../redux/Job/jobSlice'
const styles = () => ({
  '@media (max-width: 800px)': {
    root: {
      margin: '0 12px',
    },
  },
  quizContainer: {
    padding: '20px',
    height: '80vh',
    width: '100%',
    overflowY: 'auto',
  },
  question: {
    height: '72%',
  },
  buttonContainer: {
    display: 'flex',
    width: '20%',
    justifyContent: 'space-evenly',
  },
  submitButton: {
    textAlign: 'right',
  },
  progressBarContainer: {
    height: '5px',
    width: '100%',
    background: '#222',
    position: 'relative',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    background: '#029DBB',
    transition: 'width 0.3s ease-in-out',
  },
  buttonsContainer: {
    marginTop: '5px',
  },
  modalFrame: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80%',
    zIndex: 1000,
  },
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  textArea: {
    border: '1px solid white',
    color: '#fff',
  },
})

const OpenJobsFrame = (props) => {
  const { classes } = props
  const dispatch = useDispatch()

  const staticTasks = [
    {
      id: 1,
      title: 'Frontend Developer',
      status: 'Open',
      applicants: 5,
    },
    {
      id: 2,
      title: 'Backend Developer',
      status: 'Open',
      applicants: 3,
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      status: 'Closed',
      applicants: 8,
    },
    {
      id: 4,
      title: 'Mobile App Developer',
      status: 'Open',
      applicants: 6,
    },
    {
      id: 5,
      title: 'Web Developer',
      status: 'Closed',
      applicants: 4,
    },
    {
      id: 6,
      title: 'Desktop Application Developer',
      status: 'Open',
      applicants: 2,
    },
    {
      id: 7,
      title: 'UI/UX Developer',
      status: 'Open',
      applicants: 7,
    },
    {
      id: 8,
      title: 'JavaScript Developer',
      status: 'Closed',
      applicants: 1,
    },
    {
      id: 9,
      title: 'Android Developer',
      status: 'Open',
      applicants: 9,
    },
    {
      id: 10,
      title: 'iOS Developer',
      status: 'Open',
      applicants: 10,
    },
  ]
    .filter((task) => task.title.includes('Developer'))
    .map((task) => ({
      ...task,
      disabled: task.status === 'Closed',
    }))

  const handleJobSelect = (jobTitle) => {
    dispatch(setSelectedJob(jobTitle))
  }

  return (
    <>
      <Words animate>Open Jobs on AINEXIM</Words>
      <br />
      <br />
      <Table>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Applicants</th>
              <th>Apply</th>
            </tr>
          </thead>
          <tbody>
            {staticTasks.map((rowData) => (
              <tr key={rowData.id}>
                <td>{rowData.id}</td>
                <td>{rowData.title}</td>
                <td>{rowData.status}</td>
                <td>{rowData.applicants}</td>
                <td>
                  {rowData.status === 'Closed' ? (
                    <MdWork size={20} style={{ marginRight: '5px', opacity: 0.5 }} />
                  ) : (
                    <Link to={`/preworld/apply/`} onClick={() => handleJobSelect(rowData.title)}>
                      <MdWork size={20} style={{ marginRight: '5px' }} />
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>
    </>
  )
}

export default withStyles(styles)(OpenJobsFrame)
