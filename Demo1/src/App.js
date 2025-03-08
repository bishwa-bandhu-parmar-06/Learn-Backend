import PersonComponent from './Person';
import ButtonComponent from './Button';
import Header from "./Header";
import List from "./List"
import './App.css';

function App() {
  return (
    <>
      <Header title="PW Skills"/>
      <h1>Person Component</h1>
      <PersonComponent name='Sanket Singh' age="25"/>
      <PersonComponent name='Tony Stark' age="35"/>

      <h1>Button Component</h1>
      <ButtonComponent text="Click"/>

      <h1>Header Component</h1>
      <Header title="PW Skills"/>

      <h1>List Component</h1>
      <List items="Apple"/>
      <List items="Ball"/>
      <List items="Cat"/>
      <List items="Rat"/>
    </>
  );
}

export default App;
