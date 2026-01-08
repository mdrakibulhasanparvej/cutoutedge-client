export default function Counter() {
  const counterStyle = {
    border: "2px solid yellow",
  };
  return (
    <>
      <div style={counterStyle}>
        <h2>Count: </h2>
        <button>add</button>
      </div>
    </>
  );
}
