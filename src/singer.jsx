import "./App.css";

export default function Singer({ singer }) {
  return (
    <>
      <div className="students">
        <h2>Name: {singer.name}</h2>
        <p>Passion: {singer.age}</p>
      </div>
    </>
  );
}
