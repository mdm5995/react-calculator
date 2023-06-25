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
	// Tracks legality of decimal point
	// changes false when a decimal is added
	// changes to true when the next operator, AC or = is pressed
	const [canDecimal, setCanDecimal] = useState(true);
	const [display, setDisplay] = useState('initial display');
	const [answer, setAnswer] = useState('');

	// on button press, relevant glyph is pushed to "calculation" array
	// on equals button press, math.evaluate(calculation.concat())
	// on AC button press, calculation = '';
	// for */+. operators, include check that previous glyph is not operator, 
	// // -(minus) operator excluded because can be negative number
	// if it is operator, replace it with new button press

	const handleClick = (event) => {
		const isDigit = (string) => {
			const regex = /\d+/;
			return regex.test(string);
		}
		const isOperator = (string) => {
			const regex = /[+-/\*\.]/;
			return regex.test(string);
		}

		if (event.target.value === 'AC') {
			setCalculation([]);
			setCanDecimal(true);
			return;
		}

		if (isDigit(event.target.value)) {
			setCalculation([...calculation, event.target.value]);
			return;
		} 

		if (event.target.value === '.') {
			if (canDecimal && isOperator(calculation.at(-1))) {
				setCalculation([...calculation, '0.']);
				setCanDecimal(false);
				return;
			} else if (canDecimal) {
				setCalculation([...calculation, '.']);
				setCanDecimal(false);
				return;
			}
			// illegal decimal
			return;
		} 

		// operator logic
		if (isOperator(event.target.value)) {
			// if calc is empty && isOperator, 
			// no operator possible except '-' as negative sign
			if (calculation.length === 0 && event.target.value === '-') {
				setCalculation([...calculation, event.target.value]);
				setCanDecimal(true);
				return;
			}
			// if calc[-1] === operator && calc[-2] isDigit, 
			// append minus, otherwise append nothing
			if (
				isOperator(calculation.at(-1)) 
				&& isDigit(calculation.at(-2)) 
				&& event.target.value === '-'
			) {
				setCalculation([...calculation, event.target.value]);
				setCanDecimal(true);
				return;
			}
			// if calc[-1] !== operator, append operator
			if (isDigit(calculation[calculation.length - 1])) {
				setCalculation([...calculation, event.target.value]);
				setCanDecimal(true);
				return;
			}
		}

		if (event.target.value === '=' && calculation.length !== 0) {
			const evaluatedCalculation = evaluate(calculation.join(''));
			setAnswer(`${calculation.join('')} = ${evaluatedCalculation}`);
			setCalculation([evaluatedCalculation]);
			return;
		}
	};

	useEffect(() => {
		setDisplay(calculation.concat());
	}, [calculation]);

  return (
    <div className="App">
			<div className="grid">
				<div id="answer">{answer}</div>
				<div id="display">{display}</div>
				{Object.keys(calculatorButtons).map((key) => {
					return (
						<button key={key} id={key} onClick={handleClick} value={calculatorButtons[key]}>{calculatorButtons[key]}</button>
					)
				})}
			</div>
		</div>
  );
}

export default App;
