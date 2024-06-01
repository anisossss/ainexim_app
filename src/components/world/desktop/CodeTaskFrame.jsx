import React, { useState, useEffect } from 'react'
import { withStyles } from 'arwes'
import { Frame, Button, Words } from 'arwes'
import { Link } from 'react-router-dom'
import { CONSTANTS } from '../../../constants/api'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { python } from '@codemirror/lang-python'
import { cpp } from '@codemirror/lang-cpp'
import { java } from '@codemirror/lang-java'
import { php } from '@codemirror/lang-php'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'

const styles = () => ({
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
    height: '100px',
  },
})
const CodeTaskFrame = (props) => {
  const { classes, height, width, marginTop, marginLeft } = props
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value)
  }
  const [taskData, setTaskData] = useState(null)

  useEffect(() => {
    const fetchTask = () => {
      axios
        .get(`${CONSTANTS.API_URL}/generation/get-web-task/65d7d404b74ede7428d938ad`)
        .then((response) => {
          setTaskData(response.data.task)
          setIsLoading(false)
          console.log('Task data:', response.data)
        })
        .catch((error) => {
          console.error('Error getting evaluation data from backend:', error)
        })
    }
    fetchTask()
  }, [])

  const history = useLocation()
  const [clickCount, setClickCount] = useState(0)
  const [tabActivityCount, setTabActivityCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingConfirmation, setIsLoadingConfirmation] = useState(false)

  useEffect(() => {
    const handleTabActivityChange = () => {
      if (document.hidden) {
        setTabActivityCount((prevCount) => prevCount + 1)
      }
    }

    const handleClick = () => {
      setClickCount((prevCount) => prevCount + 1)
    }

    document.addEventListener('visibilitychange', handleTabActivityChange)
    document.body.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('visibilitychange', handleTabActivityChange)
      document.body.removeEventListener('click', handleClick)
    }
  }, [])

  const handleConfirmClick = () => {
    if (!inputMessage || inputMessage === '') {
      toast.error('Please provide a response before validating.')
      return
    }

    setIsLoadingConfirmation(true)
    setModalOpen(false)
    console.log('Task response:', inputMessage)
    axios
      .post(`${CONSTANTS.API_URL}/evaluation/evaluate-web-task/65d7d404b74ede7428d938ad`, {
        tabActivityCount,
        clickCount,
        taskResponse: inputMessage,
      })
      .then((response) => {
        setIsLoadingConfirmation(false)
        toast.success('Task validated successfully')
        history.push(`/world/desktop/task/verification/660e0755c5f7913ef8fb370a`)
        // history.push(`/world/desktop/task/verification/${response.data.taskEvaluation._id}`)
      })
      .catch((error) => {
        toast.error('Error validating task')
        console.error('Error getting score from backend:', error)
        setIsLoadingConfirmation(false)
      })
  }

  const [inputMessage, setInputMessage] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleInputChange = (value) => {
    setInputMessage(value)
  }

  const handleInputResize = (e) => {
    e.target.style.height = 'auto'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  const handleVerifyClick = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="isModalOpen">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
        }}
      />
      <Frame animate={true}>
        {isLoading ? (
          <div style={{ textAlign: 'center', marginTop: '8em' }}>
            <div className="loadingio">
              <div className="loading">
                <div></div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              height: height,
              width: width,
              marginTop: marginTop,
              marginLeft: marginLeft,
            }}
          >
            <div
              id="leftDiv"
              style={{ width: '50%', marginRight: '1em', overflowY: 'scroll', padding: '1em' }}
            >
              <span animate style={{ fontWeight: 'bold' }}>
                Task 1: {taskData && <Words animate>{taskData.title}</Words>}
              </span>
              <br></br>
              <br></br>
              {taskData && <Words animate>{taskData.description}</Words>}
              <br></br>
              <br></br>
              <Words animate style={{ fontWeight: 'bold' }}>
                Instructions
              </Words>
              {taskData && (
                <div>
                  {taskData.content.map((stepString, index) => {
                    let stepIndex = 0
                    return stepString.split(/\d+\.\s*/).map(
                      (step, innerIndex) =>
                        step.trim() && (
                          <div key={index * 100 + innerIndex} style={{ fontSize: '15px' }}>
                            {++stepIndex}. {step.trim()}
                          </div>
                        )
                    )
                  })}
                </div>
              )}
              <br></br>
              <Words animate style={{ fontWeight: 'bold' }}>
                Helpful Resources
              </Words>
              <br></br>
              {taskData &&
                taskData.resources.map((resource, index) => (
                  <span key={index}>
                    {resource.split(',').map((link, linkIndex) => (
                      <React.Fragment key={linkIndex}>
                        💡{' '}
                        <a href={link.trim()} target="_blank" style={{ fontSize: '15px' }}>
                          {link.trim()}
                        </a>
                        <br />
                      </React.Fragment>
                    ))}
                  </span>
                ))}
            </div>

            <div
              id="rightDiv"
              style={{ width: '50%', padding: '1em', marginRight: '1em', overflowY: 'scroll' }}
            >
              <div>
                <label htmlFor="language">Select Programming Language:</label>
                &nbsp;{' '}
                <select id="language" value={selectedLanguage} onChange={handleLanguageChange}>
                  <option value="javascript">JavaScript</option>
                  <option value="css">CSS</option>
                  <option value="html">HTML</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                  <option value="php">PHP</option>
                </select>
              </div>

              <CodeMirror
                height="320px"
                extensions={[
                  selectedLanguage === 'javascript'
                    ? javascript()
                    : selectedLanguage === 'css'
                    ? css()
                    : selectedLanguage === 'html'
                    ? html()
                    : selectedLanguage === 'python'
                    ? python()
                    : selectedLanguage === 'cpp'
                    ? cpp()
                    : selectedLanguage === 'java'
                    ? java()
                    : php(),
                ]}
                theme={vscodeDark}
                options={{ mode: selectedLanguage }}
                placeholder="Type your response here..."
                value={inputMessage}
                onChange={handleInputChange}
                onInput={handleInputResize}
              />
              <br></br>
              <Button className={classes.sendButton} onClick={handleVerifyClick}>
                Validate
              </Button>
            </div>
          </div>
        )}{' '}
      </Frame>

      {isModalOpen && (
        <>
          <div className={classes.modalBackdrop} onClick={handleCloseModal}></div>

          <Frame className={classes.modalFrame} animate={true} corners={1}>
            <div style={{ padding: '1em' }}>
              <Words>Are you sure you want to Validate the task?</Words>
              <br />
              <br />
              <div className="btns_confirm">
                <Button onClick={handleConfirmClick} layer="success">
                  Confirm
                </Button>

                <Button onClick={handleCloseModal} layer="secondary">
                  Cancel
                </Button>
              </div>
            </div>
          </Frame>
        </>
      )}
      {isLoadingConfirmation && (
        <div
          style={{
            position: 'absolute',
            zIndex: 1000,
            top: '60%',
            left: '40%',
            transform: 'translate(-60%, -40%)',
          }}
        >
          <div className="loadingio">
            <div className="loading">
              <div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default withStyles(styles)(CodeTaskFrame)
