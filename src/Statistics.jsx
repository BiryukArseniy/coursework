import React, { useState, useEffect } from "react";
import { loadData } from "./storage";

function Statistics({ refreshKey }) {
  const [group, setGroup] = useState("Группа 1");
  const [stats, setStats] = useState({});

  useEffect(() => {
    const data = loadData();
    const result = {};
    const records = data[group] || {};

    for (const date in records) {
      const day = records[date];
      for (const name in day) {
        if (!result[name]) result[name] = { present: 0, absent: 0 };
        if (day[name] === "присутствовал") result[name].present++;
        else result[name].absent++;
      }
    }

    setStats(result);
  }, [group, refreshKey]);

  return (
    <div>
      <h3>Статистика</h3>
      <label>Группа:
        <select value={group} onChange={e => setGroup(e.target.value)}>
          <option>Группа 1</option>
          <option>Группа 2</option>
          <option>Группа 3</option>
          <option>Группа 4</option>
          <option>Группа 5</option>
        </select>
      </label>

      <table>
        <thead>
          <tr><th>Студент</th><th>Присутствий</th><th>Пропусков</th></tr>
        </thead>
        <tbody>
          {Object.entries(stats).map(([name, val]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{val.present}</td>
              <td>{val.absent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default Statistics;
