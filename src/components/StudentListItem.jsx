import '../styles/StudentListItem.scss';
import {useState} from 'react';

// react-icons //
import {AiOutlineMinusCircle, AiOutlinePlusCircle} from 'react-icons/ai';

export default function StudentListItem(props) {
  const {
    id,
    email,
    company,
    skill,
    firstName,
    lastName,
    pic,
    grades,
    results,
    setResults,
  } = props;
  const [open, setOpen] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  const average = (
    grades.reduce((acc, curr) => +acc + +curr) / grades.length
  ).toFixed(2);

  const formattedGrades = grades.map((grade, i) => (
    <p key={i}>
      Test {i + 1}: {grade}%
    </p>
  ));

  const handleSubmit = e => {
    e.preventDefault();
    setTags(prev => [...prev, tagInput]);
    setTagInput('');

    setResults(prev => {
      const copy = [...prev];
      const index = copy.findIndex(student => student.id === id);
      copy[index].tags
        ? copy[index].tags.push(tagInput)
        : (copy[index].tags = [tagInput]);
      return copy;
    });
  };

  const tagElements = tags.map((tag, i) => (
    <p key={i} className="tag">
      {tag}
    </p>
  ));

  return (
    <li className="student-item">
      <div className="student-data">
        <img src={pic} />
        <div className="student-info">
          <p className="student-name">
            {firstName} {lastName}
          </p>
          <div className="student-details">
            <p>Email: {email}</p>
            <p>Company: {company}</p>
            <p>Skill: {skill}</p>
            <p>Average: {average}%</p>
            {open && <div className="grades">{formattedGrades}</div>}
            <div className="tag-container">{tagElements}</div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="add-tag"
                placeholder="Add a tag"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
      <button className="expand-btn" onClick={() => setOpen(prev => !prev)}>
        {open ? (
          <AiOutlineMinusCircle size={50} />
        ) : (
          <AiOutlinePlusCircle size={50} />
        )}
      </button>
    </li>
  );
}
