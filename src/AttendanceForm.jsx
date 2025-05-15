import React, { useState, useEffect } from "react";
import { loadData, saveData } from "./storage";

const students = {
  "Группа 1": [
    "Иванов И.И.", "Петрова П.П.", "Сидоров С.С.", "Козлова А.А.", "Орлов О.О.",
    "Морозова М.М.", "Смирнов С.С.", "Фёдоров Ф.Ф.", "Александров А.А.", "Васильева В.В."
  ],
  "Группа 2": [
    "Кузнецова К.К.", "Лебедев Л.Л.", "Мельников М.М.", "Николаева Н.Н.", "Осипов О.О.",
    "Павлова П.П.", "Романов Р.Р.", "Сергеева С.С.", "Тарасов Т.Т.", "Ушаков У.У."
  ],
  "Группа 3": [
    "Абрамов А.А.", "Баранова Б.Б.", "Веселова В.В.", "Горбунов Г.Г.", "Демидов Д.Д.",
    "Емельянов Е.Е.", "Жданова Ж.Ж.", "Захаров З.З.", "Игнатов И.И.", "Калинина К.К."
  ],
  "Группа 4": [
    "Белый Б.Б.", "Грачёва Г.Г.", "Дьяков Д.Д.", "Елисеев Е.Е.", "Зиновьева З.З.",
    "Ильин И.И.", "Карпова К.К.", "Леонов Л.Л.", "Майоров М.М.", "Никитина Н.Н."
  ],
  "Группа 5": [
    "Архипова А.А.", "Беспалова Б.Б.", "Винокуров В.В.", "Глухов Г.Г.", "Давыдов Д.Д.",
    "Ерофеев Е.Е.", "Журов Ж.Ж.", "Злобина З.З.", "Измайлов И.И.", "Киселёва К.К."
  ]
};

function AttendanceForm({ onSave }) {
  const [group, setGroup] = useState("Группа 1");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const loaded = loadData();
    const groupData = loaded[group]?.[date] || {};
    const initial = {};
    for (let name of students[group]) {
      initial[name] = groupData[name] === "присутствовал";
    }
    setAttendance(initial);
  }, [group, date]);

  const toggle = (name) => {
    setAttendance({ ...attendance, [name]: !attendance[name] });
  };

  const handleSave = () => {
    const data = loadData();
    if (!data[group]) data[group] = {};
    data[group][date] = {};
    for (const name of students[group]) {
      data[group][date][name] = attendance[name] ? "присутствовал" : "отсутствовал";
    }
    saveData(data);
    if (onSave) onSave(); 
  };

  return (
    <div>
      <label>Дата: <input type="date" value={date} onChange={e => setDate(e.target.value)} /></label>{" "}
      <label>Группа:
        <select value={group} onChange={e => setGroup(e.target.value)}>
          {Object.keys(students).map(g => <option key={g}>{g}</option>)}
        </select>
      </label>

      <table>
        <thead><tr><th>Студент</th><th>Присутствие</th></tr></thead>
        <tbody>
          {students[group].map(name => (
            <tr key={name}>
              <td>{name}</td>
              <td>
                <input type="checkbox"
                       checked={attendance[name] || false}
                       onChange={() => toggle(name)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
}

export default AttendanceForm;
