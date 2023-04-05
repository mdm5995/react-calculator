import { useState, useEffect } from 'react'
import './App.css'
import { evaluate } from 'mathjs'

const calculatorButtons = {
	// these affect the display order of the calculator. 
	// perhaps not ideal
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
	one: 1,
	two: 2,
	three: 3,
	equals: '=',
	zero: 0,
	decimal: '.'
}

function App() {

	const [calculation, setCalculation] = useState([]);
	const [display, setDisplay] = useState('initial display');

	// on button press, relevant glyph is pushed to "calculation" array
	// on equals button press, math.evaluate(calculation.concat())
	// on AC button press, calculation = '';
	// for */+ operators, include check that previous glyph is not operator, 
	// // -(minus) operator excluded because can be negative number
	// if it is operator, replace it with new button press

	const handleClick = (event) => {
		setCalculation([...calculation, event.target.value]);
	};

	useEffect(() => {
		setDisplay(calculation.concat());
	}, [calculation]);

  return (
    <div className="App">
			<div className="grid">
				<div id="display">{display}</div>
				{Object.keys(calculatorButtons).map((key) => {
					return (
						<button id={key} onClick={handleClick} value={calculatorButtons[key]}>{calculatorButtons[key]}</button>
					)
				})}
			</div>
		</div>
  );
}

export default App;
