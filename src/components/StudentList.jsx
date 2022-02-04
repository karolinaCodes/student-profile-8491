import axios from 'axios';
import {useState, useEffect} from 'react';
import '../styles/StudentList.scss';

// components //
import StudentListItem from './StudentListItem';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [queryString, setQueryString] = useState('');

  useEffect(() => {
    axios
      .get('https://api.hatchways.io/assessment/students')
      .then(res => setStudents(res.data.students))
      .catch(err => console.log(err));
  }, []);

  const studentList = students.map(student => <StudentListItem {...student} />);

  const changeHandler = e => {
    setQueryString(e.target.value);
    setStudents('');
  };

  return (
    <div className="student-list">
      <input
        type="type"
        id="name-search"
        placeholder="Search by name"
        value={queryString}
        onChange={changeHandler}
      />
      <ul>{studentList}</ul>
    </div>
  );
}
