import React, { useState, useEffect } from "react";
import { withStyles } from "arwes";
import { Frame, Words, Button } from "arwes";
import axios from "axios";
import { CONSTANTS } from "../../../../../constants/api";

const styles = () => ({
  root: {
    width: 1200,
  },
  "@media (max-width: 800px)": {
    root: {},
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
const BooksFrame = (props) => {
  const { classes, className } = props;
  const [booksByLang, setBooksByLang] = useState([]);
  const [booksBySubject, setBooksBySubject] = useState([]);
  const [filter, setFilter] = useState("lang");
  const [isLoading, setIsLoading] = useState(true);
  const [langSearchQuery, setLangSearchQuery] = useState("");
  const [subjectSearchQuery, setSubjectSearchQuery] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${CONSTANTS.API_URL}/resources/get-software-books`;
        const response = await axios.get(url);
        const { booksByLang, booksBySubject } = response.data;
        setBooksByLang(booksByLang);
        setBooksBySubject(booksBySubject.slice(1));
        setIsLoading(false);
        console.log("booksByLang", booksByLang);
        console.log("booksBySubject", booksBySubject);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  const renderBooks = (books) => {
    return (
      <div style={{ height: "62vh", overflow: "auto" }}>
        <ul>
          {isLoading ? (
            <div style={{ textAlign: "center", marginTop: "8em" }}>
              <div className="loadingio">
                <div className="loading">
                  <div></div>
                </div>
              </div>
            </div>
          ) : (
            books
              .filter((book) => {
                if (filter === "lang") {
                  return book.language_name
                    .toLowerCase()
                    .includes(langSearchQuery.toLowerCase());
                } else {
                  return book.subject
                    .toLowerCase()
                    .includes(subjectSearchQuery.toLowerCase());
                }
              })
              .map((book) => (
                <li
                  key={book.language_name || book.section_name || book.subject}
                >
                  <h3>
                    {book.language_name || book.section_name || book.subject}
                  </h3>
                  <ul>
                    {book.entries.map((entry) => (
                      <li key={entry.url}>
                        <a
                          style={{ fontSize: "15px", textDecoration: "none" }}
                          href={entry.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {entry.title}
                        </a>
                        {entry.notes && entry.notes.length > 0 && (
                          <span> ({entry.notes.join(", ")})</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))
          )}
        </ul>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.buttonContainer}>
        <Button onClick={() => handleFilterChange("lang")}>
          Filter by Language
        </Button>
        <Button onClick={() => handleFilterChange("subject")}>
          Filter by Subject
        </Button>
      </div>

      <Frame animate={true}>
        <div className={classes.headerContainer}>
          <div>
            <Words animate className="words">
              {filter === "lang" ? "Books by Language" : "Books by Subject"}
            </Words>
          </div>
          <div>
            {filter === "lang" ? (
              <input
                type="text"
                placeholder="Search by Language"
                value={langSearchQuery}
                onChange={(e) => setLangSearchQuery(e.target.value)}
              />
            ) : (
              <input
                type="text"
                placeholder="Search by Subject"
                value={subjectSearchQuery}
                onChange={(e) => setSubjectSearchQuery(e.target.value)}
              />
            )}
          </div>
        </div>

        {filter === "lang"
          ? renderBooks(booksByLang)
          : renderBooks(booksBySubject)}
      </Frame>
    </div>
  );
};

export default withStyles(styles)(BooksFrame);
