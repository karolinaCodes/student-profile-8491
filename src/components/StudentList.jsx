import axios from 'axios';
import {useState, useEffect} from 'react';
import '../styles/StudentList.scss';

// components //
import StudentListItem from './StudentListItem';

export default function StudentList() {
  const [results, setResults] = useState([]);
  // const [filteredList, setFilteredList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  // console.log(results);

  useEffect(() => {
    axios
      .get('https://api.hatchways.io/assessment/students')
      .then(res => {
        // setResults(res.data.students);
        // setFilteredList(res.data.students);
        setStudentList(res.data.students);
        setResults(res.data.students);
      })
      .catch(err => console.log(err));
  }, []);

  const list = studentList.map(student => (
    <StudentListItem
      key={student.id}
      {...student}
      results={results}
      setResults={setResults}
    />
  ));

  // filter the list based on name input and tag input then map then to elements to render
  // const filteredList = studentList
  //   .filter(
  //     student =>
  //       student.firstName.includes(nameInput) ||
  //       student.lastName.includes(nameInput)
  //   )
  //   .map(student => (
  //     <StudentListItem
  //       key={student.id}
  //       {...student}
  //       studentList={studentList}
  //       setStudentList={setStudentList}
  //     />
  //   ));

  // const filter = () => {
  //   if (nameInput) {
  //     const res = results.filter(
  //       student =>
  //         student.firstName.toLowerCase().includes(e.target.value) ||
  //         student.lastName.toLowerCase().includes(e.target.value)
  //     );
  //   }

  //   if (tagInput) {
  //     student => student.tags.includes(tag => tag.includes(e.target.value));
  //   }
  // };

  const nameInputHandler = e => {
    setNameInput(e.target.value);
    if (tagInput) {
      const res = results.filter(student => {
        return (
          (student.firstName.toLowerCase().includes(e.target.value) ||
            student.lastName.toLowerCase().includes(e.target.value)) &&
          student.tags &&
          student.tags.filter(tag => tag.includes(tagInput))
        );
      });
      return setStudentList(res);
    }
    const res = results.filter(
      student =>
        student.firstName.toLowerCase().includes(e.target.value) ||
        student.lastName.toLowerCase().includes(e.target.value)
    );
    setStudentList(res);
  };

  const tagInputHandler = e => {
    setTagInput(e.target.value);
    console.log(e.target.value);

    if (nameInput) {
      const res = results.filter(student => {
        return (
          (student.firstName.toLowerCase().includes(nameInput) ||
            student.lastName.toLowerCase().includes(nameInput)) &&
          student.tags &&
          student.tags.filter(tag => tag.includes(e.target.value))
        );
      });
      return setStudentList(res);
    }
    const res = results.filter(
      student =>
        student.tags && student.tags.filter(tag => tag.includes(e.target.value))
    );
    setStudentList(res);
  };

  return (
    <div className="student-list">
      <input
        type="text"
        id="name-search"
        placeholder="Search by name"
        value={nameInput}
        onChange={nameInputHandler}
      />
      <input
        type="text"
        id="tag-search"
        placeholder="Search by tag"
        value={tagInput}
        onChange={tagInputHandler}
      />
      {!studentList.length ? (
        <p id="no-results-msg">No Results found.</p>
      ) : (
        <ul>{list}</ul>
      )}
    </div>
  );
}
