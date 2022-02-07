import axios from 'axios';
import {useState, useEffect} from 'react';
import '../styles/StudentList.scss';

// components //
import StudentListItem from './StudentListItem';

export default function StudentList() {
  const [results, setResults] = useState([]);
  const [studentList, setStudentList] = useState([]);

  const [nameInput, setNameInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    axios
      .get('https://api.hatchways.io/assessment/students')
      .then(res => {
        setResults(res.data.students);
        setStudentList(res.data.students);
      })
      .catch(err => console.log(err));
  }, []);

  const list = studentList.map(student => (
    <StudentListItem
      key={student.id}
      {...student}
      studentList={studentList}
      setStudentList={setStudentList}
    />
  ));

  // filter the student list by the e.target.value (this way list updates even when users delete character in search bar)
  const filterList = val => {
    console.log(val.tag);
    console.log(studentList);
    return results.filter(student => {
      console.log(student.tags);
      console.log(
        student.tags && student.tags.filter(tag => tag.includes(val.tag))
      );
      return student.tags && student.tags.filter(tag => tag.includes(val.tag));
      // return (
      //   (student.firstName
      //     .toLowerCase()
      //     .includes(val.name ? val.name : nameInput) ||
      //     student.lastName
      //       .toLowerCase()
      //       .includes(val.name ? val.name : nameInput)) &&
      //   student.tags &&
      //   student.tags.includes(val.tag ? val.tag : tagInput)
      // );
    });
  };

  const nameInputHandler = e => {
    setNameInput(e.target.value);
    setStudentList(filterList({name: e.target.value}));
  };

  const tagInputHandler = e => {
    setTagInput(e.target.value);
    setStudentList(filterList({tag: e.target.value}));
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
