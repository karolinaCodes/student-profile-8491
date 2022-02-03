import axios from 'axios';
import {useState, useEffect} from 'react';
import '../styles/StudentList.scss';

// components //
import StudentListItem from './StudentListItem';

export default function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.hatchways.io/assessment/students')
      .then(res => setStudents(res.data.students))
      .catch(err => console.log(err));
  }, []);

  const studentList = students.map(student => {
    console.log({...student});
    return <StudentListItem {...student} />;
  });

  return (
    <div className="main-content">
      <ul>{studentList}</ul>
    </div>
  );
}
