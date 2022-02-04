import '../styles/StudentListItem.scss';

export default function StudentListItem(props) {
  const {email, company, skill, firstName, lastName, pic, grades} = props;

  const average = (
    grades.reduce((acc, curr) => +acc + +curr) / grades.length
  ).toFixed(2);

  return (
    <li className="student-item">
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
        </div>
      </div>
    </li>
  );
}
