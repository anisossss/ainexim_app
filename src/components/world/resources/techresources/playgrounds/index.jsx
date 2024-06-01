import React, { useEffect, useState } from 'react'
import { withStyles } from 'arwes'
import { CONSTANTS } from '../../../../../constants/api'
import axios from 'axios'
import { Frame, Words } from 'arwes'
const styles = () => ({
  root: {
    height: '80vh',
    overflowY: 'auto',
  },
  searchInput: {
    marginBottom: 10,
    position: 'sticky',
    top: 0,
    zIndex: 999,
    width: '100%',
  },
})

const PlaygroundsFrame = (props) => {
  const { classes } = props
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${CONSTANTS.API_URL}/resources/get-software-playgrounds`
        const response = await axios.get(url)
        const coursesWithoutFirst = response.data.titles.slice(1)
        setCourses(coursesWithoutFirst)
        setFilteredCourses(coursesWithoutFirst)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching:', error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSearch = (event) => {
    const query = event.target.value
    setSearchQuery(query)
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredCourses(filtered)
  }

  return (
    <div className={classes.root}>
      <input
        type="text"
        placeholder="Search Playgrounds By Software Language"
        className={classes.searchInput}
        value={searchQuery}
        onChange={handleSearch}
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        filteredCourses.map((titleObj, index) => (
          <Frame key={index} animate={true}>
            <div style={{ padding: '1em' }}>
              <h2>{titleObj.title}</h2>
              <ul style={{ lineHeight: '2em' }}>
                {titleObj.courses.map((course, idx) => (
                  <li key={idx}>
                    <a href={`#${course}`}>{course}</a>
                  </li>
                ))}
              </ul>
            </div>
          </Frame>
        ))
      )}
    </div>
  )
}

export default withStyles(styles)(PlaygroundsFrame)
