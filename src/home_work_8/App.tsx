import React from 'react';

type User = {
  createdAt?: string;
  email?: string;
  id?: string;
  name?: string;
  phone?: string;
  position?: string;
};

function App() {
  const [users, setUsers] = React.useState<User[]>([]);

  async function getUsers() {
    try {
      const response = await fetch('https://6241e09676c4fb91f67bc245.mockapi.io/users');
      if (response.ok) {
        const json = await response.json();
        setUsers(json);
      } else {
        throw Error('Ошибка при отправке запроса');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {users.map((obj) => (
        <li key={obj.id}>
          {obj.id}, {obj.name}
        </li>
      ))}
      <button onClick={getUsers}>Получить данные с сервера</button>
    </div>
  );
}

export default App;
