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

  const nameInputHandler = e => {
    setNameInput(e.target.value);

    // if tagInput is not present, filter only by the nameInput
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

    if (!e.target.value) {
      return setStudentList(results);
    }

    if (nameInput) {
      // if nameInput is not present, filter only by the tagInput
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

    // if student has tags property, filter the tags to find all the strings that include the tag input, since returns an array, if the array is empty that means no tags match.
    const res = results.filter(
      student =>
        student.tags &&
        student.tags.filter(tag => {
          return tag.includes(e.target.value);
        }).length > 0
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
