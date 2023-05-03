import { useState } from 'react';
import './App.css';
import Table from './Table';

const mockData = [];

for (let i = 1; i <= 40; i++) {
  const name = `Person ${i}`;
  const position = ['Manager', 'Engineer', 'Analyst', 'Designer', 'Developer'][
    Math.floor(Math.random() * 5)
  ];
  const office = [
    'New York',
    'San Francisco',
    'Chicago',
    'Los Angeles',
    'Boston',
  ][Math.floor(Math.random() * 5)];
  const age = Math.floor(Math.random() * 30) + 20;
  const year = Math.floor(Math.random() * 10) + 2010;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  const startDate = `${year}/${month}/${day}`;
  const salary = `$${(Math.floor(Math.random() * 10) + 1) * 1000}00`;
  mockData.push({ name, position, office, age, startDate, salary });
}

function App() {
  const [data, setData] = useState(mockData);

  return (
    <div>
      <Table data={data} />
    </div>
  );
}

export default App;
