import './App.css';

const calculatorButtons = {
	clear: 'AC',
	divide: '/',
	multiply: '*',
	seven: 7,
	eight: 8,
	nine: 9,
	minus: '-',
	four: 4,
	five: 5,
	six: 6,
	plus: '+',
	equals: '=',
	one: 1,
	two: 2,
	three: 3,
}

function App() {
  return (
    <div className="App">
			<div className="grid">
				<div id="display" />
				{Object.keys(calculatorButtons).map((key) => {
					return (
						<div id={key} value={calculatorButtons[key]}>{calculatorButtons[key]}</div>
					)
				})}
			</div>
		</div>
  );
}

export default App;
