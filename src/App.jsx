import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./Counter";
import ToDo from "./ToDo";
import Actor from "./Actor";
import Singer from "./singer";

function App() {
  // function handlClick() {
  //   alert("Clicked Done!");
  // }

  // const addNumber5 = (number) => {
  //   number + 5;
  //   alert("number added!");
  // };
  const actor = ["Jasim", "Manna", "Alomgir", "Umorsani"];
  const singers = [
    { id: 1, name: "Dr. Mahfuz", age: 68 },
    { id: 2, name: "Tahsan", age: 45 },
    { id: 3, name: "Shuvro Deb", age: 57 },
    { id: 4, name: "Rakibul", age: 26 },
  ];

  const time = 50;
  return (
    <>
      <h3>Rakibul first React Project</h3>

      {singers.map((singer) => (
        <Singer key={singer.id} singer={singer}></Singer>
      ))}

      {/* {actor.map((actor) => (
        <Actor actor={actor}></Actor>
      ))} */}
      {/* <ToDo task="Learn React" isDone={true} time={time}></ToDo>
      <ToDo task="Learn JS" isDone={false}></ToDo>
      <ToDo task="Learn Node" isDone={true}></ToDo> */}
      {/* <button
        onClick={() => {
          alert("clicked Done!");
        }}
      >
        click me1
      </button>
      <button
        onClick={() => {
          addNumber5(10);
        }}
      >
        Clicked 02
      </button>

      <Sports></Sports>
      <Players name="Alamin"></Players>
      <Student name="Masud" roll="5"></Student>
      <Developer name="Rakibul" tech="JS"></Developer>
      <Developer name="Hasan" tech="Python"></Developer>
      <Developer name="Parvej" tech=""></Developer> */}
    </>
  );
}

function Sports() {
  const name = 19;
  const age = "sagir";
  return (
    <>
      <p>
        I am a preson: {name} {age}
      </p>
    </>
  );
}

function Pet() {
  return (
    <>
      <h1>My Name is Parvej</h1>
      <h1>My Mother name is Parvina Khatun</h1>
    </>
  );
}

function Student(props) {
  const color = {
    color: "red",
    textAlign: "left",
  };
  return (
    <>
      <div className="students">
        <p style={color}>name:{props.name}</p>
        <p style={color}>Dept: {props.roll}</p>
      </div>
    </>
  );
}

function Developer(props) {
  return (
    <>
      <div className="students">
        <h2>Developer: {props.name}</h2>
        <p>Type: {props.tech}</p>
      </div>
    </>
  );
}

function Players({ name, run = 0 }) {
  return (
    <>
      <div className="students">
        <h2>Name: {name}</h2>
        <p>Runs: {run}</p>
      </div>
    </>
  );
}

export default App;
