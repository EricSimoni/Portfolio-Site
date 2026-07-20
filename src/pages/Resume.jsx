import { Link } from 'react-router-dom'

/**
 * ─────────────────────────────────────────────────────────────────────
 * TEMPLATE NOTE (read this before building About.jsx):
 *
 * This file follows the same pattern as Home.jsx:
 *   1. Plain data lives in arrays/objects at the top of the file.
 *   2. The component just maps over that data into JSX.
 * That split matters because it means updating your resume later is
 * just editing the arrays below — never touching the JSX/markup.
 *
 * For About.jsx, you'd do the same thing: put your bio text, hobbies,
 * whatever you want to feature, into a data shape up top, then map it
 * into panels the same way SKILLS and EXPERIENCE are mapped here.
 * ─────────────────────────────────────────────────────────────────────
 */

const SKILLS = [
  { category: 'Programming', items: ['Java', 'Python', 'C', 'HTML', 'JavaScript', 'Agile', 'Git'] },
  { category: 'Design Tools', items: ['Adobe Illustrator', 'InDesign', 'Clip Studio Paint'] },
]

const EDUCATION = [
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'Virginia Commonwealth University',
    meta: 'Graduated May 2025 · GPA 3.247',
  },
  {
    degree: 'Associate of Science',
    school: 'Brightpoint Community College',
    meta: 'May 2018',
  },
]

const EXPERIENCE = [
  {
    title: 'Freelance Graphic Designer',
    place: 'Remote',
    dates: '2020 – Present',
    description:
      'Manages client requirements, timelines, and revisions to ensure accurate, consistent deliverables. Creates clear documentation for briefs and updates, applying strong attention to detail.',
  },
  {
    title: 'Quality Associate',
    place: 'Temperpack, Richmond, VA',
    dates: 'Jul – Dec 2021',
    description:
      'Conducted detailed quality control inspections in a fast-paced production environment. Identified, documented, and communicated defects to supervisors, supporting continuous improvement.',
  },
  {
    title: 'Community Organizer',
    place: 'Jetersville, VA',
    dates: '2019 – Present',
    description:
      'Coordinates collaborative weekly creative sessions, managing logistics and communication for participants. Maintains clear structure, expectations, and materials planning.',
  },
  {
    title: 'Independent Video Editor',
    place: 'Remote',
    dates: 'Jan 2025 – Present',
    description:
      'Plans, edits, and quality-checks short-form video content, ensuring continuity and alignment with project objectives. Maintains organized file structures and version control.',
  },
]

const PROJECTS = [
  {
    title: 'VCU Chatbot — UX Designer & Front-End Developer',
    description:
      'Executed usability testing, gathered feedback, and documented results to improve UI flow. Designed wireframes and implemented front-end features using HTML/JavaScript. Collaborated with peers using Agile methods.',
  },
]

export default function Resume() {
  return (
    <main className="page">
      <Link className="page__back" to="/">
        ← back to home
      </Link>

      <header className="page__header">
        <span className="page__eyebrow">// RESUME</span>
        <h1 className="page__title">Eric Simoni</h1>
        <p className="page__subtitle">
          Jetersville, VA · (804) 366-0261 · simoniericm@gmail.com
        </p>
        <a
          className="page__link"
          href="https://www.linkedin.com/in/simonieric/"
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/simonieric
        </a>
      </header>

      <section className="panel">
        <h2 className="panel__title">Summary</h2>
        <p className="panel__text">
          Entry-level QA/Software Engineering professional with a strong foundation in
          analytical thinking, software testing, and core programming skills. Experienced in
          documenting issues, improving user-focused solutions, and maintaining high accuracy
          and quality standards.
        </p>
      </section>

      <section className="panel">
        <h2 className="panel__title">Education</h2>
        {/* .map() again — same pattern as the nav tiles on the homepage */}
        {EDUCATION.map((edu) => (
          <div className="entry" key={edu.degree}>
            <div className="entry__row">
              <span className="entry__title">{edu.degree}</span>
              <span className="entry__dates">{edu.meta}</span>
            </div>
            <p className="entry__place">{edu.school}</p>
          </div>
        ))}
      </section>

      <section className="panel">
        <h2 className="panel__title">Skills</h2>
        {SKILLS.map((group) => (
          <div className="skill-group" key={group.category}>
            <span className="skill-group__label">{group.category}</span>
            <div className="skill-tags">
              {group.items.map((skill) => (
                <span className="skill-tag" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="panel">
        <h2 className="panel__title">Experience</h2>
        {EXPERIENCE.map((job) => (
          <div className="entry" key={job.title}>
            <div className="entry__row">
              <span className="entry__title">{job.title}</span>
              <span className="entry__dates">{job.dates}</span>
            </div>
            <p className="entry__place">{job.place}</p>
            <p className="entry__desc">{job.description}</p>
          </div>
        ))}
      </section>

      <section className="panel">
        <h2 className="panel__title">Academic Projects</h2>
        {PROJECTS.map((project) => (
          <div className="entry" key={project.title}>
            <span className="entry__title">{project.title}</span>
            <p className="entry__desc">{project.description}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
