"use strict"
const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldChar = '░';
const pathChar = '*';
const getRandomNum = (num) => {
	let positionNum = Math.floor(Math.random() * num)
	while (positionNum <= 1) {
		positionNum = Math.floor(Math.random() * num)
	}
	return positionNum
}

class Field {
	constructor(field) {
		this.field = field;
		this.currentRow = 0
		this.currentCol = 0
		this.tempArr = [[]]
		this.Instruction = 'Instruction:\nW for going up\nS for going down\nA for going left\nD for going right\nPlease choose a direction and press enter.\n-------'
		// this.fieldCol = 0
		// this.fieldRow = 0
		// this.holeProb = 0.2
	}
	// generate random field
	static generateField(row, col, prob) {

		let hatRow = getRandomNum(row)
		let hatCol = getRandomNum(col)
		this.field = new Array(row).fill('░').map(item => new Array(col))
		for (let i = 0; i < row; i++) {
			for (let j = 0; j < col; j++) {
				if (i === 0 && j === 0) {
					// set start point 
					this.field[i][j] = pathChar;
				} else if (i === hatRow && j === hatCol) {
					// set Hat Position 
					this.field[i][j] = hat
				} else {
					console.log()
					this.field[i][j] = Math.random() * 1.1 >= prob ? '░' : 'O';
					// if(field[i][j] === 'O' && countHole <= maxHoleNum){
					//     countHole++
					// } else if(field[i][j] === 'O' && countHole >= maxHoleNum){
					//     return field[i][j] = '░';
					// } else {
					// return field[i][j] = '░'
				}
			}
		}
		return this.field
	}
	print() {
		this.field.forEach(i => { this.tempArr.push(i.join('')) });
		this.tempArr = this.tempArr.join('\n')
		console.log(this.tempArr)
		this.tempArr = [[]]
	}
	takeUserInput() {
		console.log(this.Instruction)
		this.print()
		let askDirection = prompt('Which direction?')
		askDirection = askDirection.toUpperCase()
		switch (askDirection) {
			case 'W':
				this.currentRow -= 1;
				this.currentCol;
				if (this.isOutBoundary(this.currentRow, this.currentCol)) {
					console.log('You are out of boundary')
					this.gameOver(false)
				} else {
					this.checkUserInput(this.currentRow, this.currentCol)
				};
				break;
			case 'S':
				this.currentRow += 1;
				this.currentCol;
				if (this.isOutBoundary(this.currentRow, this.currentCol)) {
					console.log('You are out of boundary')
					this.gameOver(false)
				} else {
					this.checkUserInput(this.currentRow, this.currentCol)
				};
				break;
			case 'A':
				this.currentRow;
				this.currentCol -= 1;
				if (this.isOutBoundary(this.currentRow, this.currentCol)) {
					console.log('You are out of boundary')
					this.gameOver(false)
				} else {
					this.checkUserInput(this.currentRow, this.currentCol)
				};
				// this.checkUserInput(this.currentRow, this.currentCol);
				break;
			case 'D':
				this.currentRow;
				this.currentCol += 1;
				if (this.isOutBoundary(this.currentRow, this.currentCol)) {
					console.log('You are out of boundary')
					this.gameOver(false)
				} else {
					this.checkUserInput(this.currentRow, this.currentCol)
				};
				break;
			default:
				console.log('***Please enter W, S, A or D***');
				this.takeUserInput()
		}
	}
	// check did user go out of boundary
	isOutBoundary(row, col) {
		if (row < 0 || col < 0 || row > (this.field.length) || col > (this.field[0].length - 1)) {
			return true
		} else {
			return false
		}
	}
	// check user input 
	checkUserInput(row, col) {
		let position = this.field[row][col]
		if (position == hole) {
			console.log(`You fall in the hole.`)
			this.gameOver(false)
		}
		else if (position == hat) {
			this.gameOver(true)
		} else if (position == pathChar) {
			console.log('Don\'t turn back!')
			this.gameOver(false)
		}
		else {
			this.renewField(row, col)
		}
	}
	// renew field
	renewField(row, col) {
		this.field[row][col] = '*';
		this.takeUserInput()
	}
	// end game greeting
	gameOver(status) {
		if (status === true) {
			console.log("Congratulations! You found the hat!")
			this.currentCol = 0
			this.currentRow = 0
		} else {
			console.log("Your hat is still waiting for you~")
			this.currentCol = 0
			this.currentRow = 0
		}
	}
	// get game start
	playGame() {
		this.takeUserInput()
		/*
		let input = prompt('Easy: 1\nNormal: 2\nDifficult: 3\nPlease select a level then press enter:', 2)
		let option = parseInt(input)    
		if(option === 1){
			this.fieldCol = 10
			this.fieldRow = 6
			this.holeProb = 0.1
			this.generateField(this.fieldRow,this.fieldCol,this.holeProb)
			this.takeUserInput()  
		} else if(option === 2){
			this.fieldCol = 10
			this.fieldRow = 6
			this.holeProb = 0.3
			this.generateField(this.fieldRow,this.fieldCol,this.holeProb)
			this.takeUserInput() 
		} else if(option === 3){
			this.fieldCol = 12
			this.fieldRow = 8
			this.holeProb = 0.4
			this.generateField(this.fieldRow,this.fieldCol,this.holeProb)
			this.takeUserInput() 
		} else{
			console.log('Cannot read your input. Default level mode on...')
			this.fieldCol = 10
			this.fieldRow = 6
			this.holeProb = 0.3
			this.generateField(this.fieldRow,this.fieldCol,this.holeProb)
			this.takeUserInput() 
		}*/
	}
}

const selectField = () => {
	let level = prompt('Pick a level(please enter easy, normal, hard or custom): ', 'normal')
	switch (level) {
		case 'easy':
			easyField();
			break;
		case 'normal':
			normalField();
			break;
		case 'hard':
			hardField();
			break;
		case 'custom':
			customField();
			break;
		default:
			selectField();
	}

}

const myField = new Field(Field.generateField(8, 12, 0.3));
myField.playGame()








