export default function StudentListItem(props) {
  const {email, company, skill, firstName, lastName, pic, grades} = props;

  const average = (
    grades.reduce((acc, curr) => +acc + +curr) / grades.length
  ).toFixed(2);

  return (
    <li>
      <img src={pic} />
      <p>
        <b>
          {firstName} {lastName}
        </b>
      </p>
      <p>Email: {email}</p>
      <p>Company: {company}</p>
      <p>Skill: {skill}</p>
      <p>Average: {average}%</p>
    </li>
  );
}
