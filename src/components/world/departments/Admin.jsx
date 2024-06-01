import { withStyles } from 'arwes'
import { Frame, Words, Button } from 'arwes'
import { jsPDF } from 'jspdf'
import React, { useState } from 'react'
import { IoDocument, IoClose, IoCheckmarkCircle } from 'react-icons/io5'

const styles = {
  root: {},
  '@media (max-width: 800px)': {
    root: {
      margin: '0 12px',
    },
  },
  modalFrame: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80%',
    zIndex: 1000,
    margin: 20,
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
  closeModal: {
    position: 'absolute',
    top: 5,
    right: 5,
    cursor: 'pointer',
    borderLeft: '1px solid #999',
  },
  icon: {
    position: 'absolute',
    top: 5,
    right: 5,
    cursor: 'pointer',
  },
  list: {
    padding: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
}

const Admin = (props) => {
  const { classes } = props
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [docContent, setDocContent] = useState('')
  const documents = [
    {
      title: 'Tutorials and Instructional Guides',
      description:
        "Our expansive Tutorials and Instructional Guides act as a comprehensive compendium, offering a detailed, step-by-step process for a broad understanding of software development tools, languages, and intricate concepts. Beginning from the basic topics like setting up your development environment to tackling more advanced topics such as debugging and resolving software anomalies, these guides form an essential resource for developers at various stages of their professional journey. They come equipped with handy snippets of code which developers can use as they are, or tweak in line with their specific requirements. A standout feature of these guides are the troubleshooting sections that offer well-thought-out solutions to common challenges, acting as a reliable lifeline for developers. Whether you're a seasoned developer seeking an avenue to refine and upgrade your skills or a newcomer aiming to familiarize yourself with our complex tech stack, these tutorials are designed keeping a wide audience in mind. Given their permanent accessibly, they are an ideal resource to keep revisiting as and when you need to grasp a complex idea, or simply brush up on forgotten concepts. Moving beyond traditional text-based learning, our tutorials are rich with strategy-driven diagrams, valid code examples, and step-by-step screenshots. This multifaceted approach guarantees maximum learner comprehension and retention, making the learning process a highly engaging pursuit.",
    },
    {
      title: 'Company Coding Standards',
      description:
        "Our extensively detailed Company Coding Standards lay the groundwork for the practices and conventions that developers are expected to adhere to when writing code. They cover everything from naming conventions, commenting, formatting, to coding practices. The purpose behind implementing these standards is to ensure there is a consistent style of code across the company. This not only helps in maintaining a uniformity, but also aids in enhancing its readability, making it easier for other developers to understand. Additionally, these standards also include advanced aspects of coding such as architectural considerations, data handling practices and security aspects, acting as a wholesome guidebook. The primary objective of these standards is to encourage a culture of best practices in software development, thereby maximizing efficiency and reducing errors. Crucially, they also aim to foster collaborative development by creating a shared understanding of code structure and intent, setting the stage for constructive code reviews and overall effective team cohesion, indispensable for an organization's success.",
    },
    {
      title: 'Software Architecture Documentation',
      description:
        'Our comprehensive Software Architecture Documentation not only offers a detailed overview, but also provides an intricate understanding of the different software systems that run within the company. The document goes to great lengths to explain the structural architecture of our software systems. It includes an in-depth examination of technical specifications, data models, and a thorough depiction of the sophisticated interactions amongst various software components. The document serves as an invaluable resource for developers to get a grasp of the big picture. It provides guidance on how different elements operate in unison to achieve larger functionality. This documentation is considered indispensable when it comes to navigating the intricacies of our systems, understanding the broader context of specific codebases, and planning new features or enhancements in sync with our wider architectural vision. By using clear diagrams, lucid explanations, and relevant examples, the document aims to simplify the technical complexities inherent in our software architecture. This focused approach aids in fostering better decision making in design and development.',
    },
    {
      title: 'Automation Scripts Guidelines',
      description:
        'Our exhaustive Automation Scripts Guidelines meticulously detail the process of creating and maintaining scripts for automated testing, building, and deployment. These scripts form a significant part of an efficient development cycle, aiming to reduce manual effort, speed up processes, and curtail human errors. The guides vividly explain the methods of implementing these automated scripts across various stages of software development using a wide gamut of tools. These guidelines also provide developers with insights into best practices for writing clear, manageable, and robust scripts, fostering an environment of standardization. Developers can also expect to learn about exception handling, debugging, logging, and scheduling of script executions, ensuring the automation processes work seamlessly. For the purpose of understanding, the guidelines are peppered with examples of scripts coding, case scenarios, and solutions for typical automation problems. By following these guidelines, developers are better equipped to develop strong, reliable automation systems which enable faster software releases.',
    },
    {
      title: 'Developer Onboarding Manual',
      description:
        "Our meticulously crafted Developer Onboarding Manual forms a robust step-by-step guide designed to smoothly orient and integrate new software developers in the organization. It offers a comprehensive introduction to the extensive tech stack deployed by us, provides details of the development process, throws light on the underlying systems and architecture, and offers insights about the standards, conventions, and tools employed. More than just a technical introduction, this manual also highlights the company's work ethos and culture. It diligently explains the code review process, pair programming practices, agile methodologies, and other team-specific practices. Moreover, developers will find practical how-to guides for setting up their development environment, accessing repositories, setting up databases, and much more. For easy reference, the manual also features a useful guide that points to additional resources for development tools. This makes it convenient for developers to find relevant tutorials, videos, and forums for further self-learning. In keeping with our commitment to continuous learning, we take special care to regularly update the onboarding manual to mirror the evolving industry best practices, methodologies, culture, and tools.",
    },
  ]

  const openModal = (document) => {
    setDocContent(`${document.title}\n\n${document.description}`)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const saveAsPdf = () => {
    var doc = new jsPDF()
    doc.text(docContent, 10, 10)
    const filename = `${docContent.trim().split('  ').join('_')}.pdf`
    doc.save(filename)
  }
  return (
    <Frame animate={true} corners={1} className={classes.root}>
      {documents.map((doc, index) => (
        <div
          key={index}
          className={classes.list}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IoDocument />
            {doc.title}
          </div>
          <Button onClick={() => openModal(doc)} className={classes.checkButton}>
            <IoCheckmarkCircle style={{ marginRight: '5px' }} />
            Check Document
          </Button>
        </div>
      ))}
      {modalIsOpen && (
        <div>
          <div className={classes.modalBackdrop} onClick={closeModal} />
          <Frame className={classes.modalFrame}>
            <div className={classes.icon} onClick={closeModal}>
              <IoClose />
            </div>

            {docContent.split('\n').map((line, index) => (
              <p key={index} style={{ fontSize: '15px', padding: '1em' }}>
                {line.trim()}
              </p>
            ))}
            <br></br>
            <div style={{ textAlign: 'center', marginBottom: '3em' }}>
              <Button onClick={saveAsPdf}>Save as PDF</Button>
            </div>
          </Frame>
        </div>
      )}
    </Frame>
  )
}

export default withStyles(styles)(Admin)
