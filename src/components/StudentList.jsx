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
      .then(res => {
        // filter the student list by the queryString (this way list updates even when users delete character in search bar)
        const filteredStudentList = res.data.students.filter(student => {
          return (
            student.firstName.toLowerCase().includes(queryString) ||
            student.lastName.toLowerCase().includes(queryString)
          );
        });
        setStudents(filteredStudentList);
      })
      .catch(err => console.log(err));
  }, [queryString]);

  const studentList = students.map(student => (
    <StudentListItem key={student.id} {...student} />
  ));

  const changeHandler = e => {
    setQueryString(e.target.value);
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
      {!students.length ? (
        <p id="no-results-msg">No Results found.</p>
      ) : (
        <ul>{studentList}</ul>
      )}
    </div>
  );
}
