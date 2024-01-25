import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/UI/Header';
import FilterButton from './Components/Buttons/FilterButton';
import Postwall from './Components/UI/Postwall';




function App() {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '20px' }}>
        {/* Adjust the value of marginTop as needed */}
        <Postwall />
      </div>
    </div>
  );
}







// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           HELLO! WELCOME TO REACT!

//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
