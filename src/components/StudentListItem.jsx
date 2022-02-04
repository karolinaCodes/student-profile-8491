import '../styles/StudentListItem.scss';
import {useState} from 'react';

// react-icons //
import {AiOutlineMinusCircle, AiOutlinePlusCircle} from 'react-icons/ai';

export default function StudentListItem(props) {
  const {email, company, skill, firstName, lastName, pic, grades} = props;
  const [open, setOpen] = useState(false);
  console.log(grades);

  const average = (
    grades.reduce((acc, curr) => +acc + +curr) / grades.length
  ).toFixed(2);

  const formattedGrades = grades.map((grade, i) => (
    <p key={i}>
      Test {i + 1}: {grade}%
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
