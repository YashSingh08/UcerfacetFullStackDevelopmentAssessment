import React, { useEffect, useState, useRef } from 'react';
import './Dashboard.css'; // You can create a CSS file for styling
import axios from 'axios'; // Import Axios for making HTTP requests

function Dashboard() {
  const [message, setMessage] = useState('');
  const [editableCells, setEditableCells] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [timer, setTimer] = useState(300); // 300 seconds (5 minutes)
  const cellRefs = useRef([]); // To store references to all cells

  useEffect(() => {
    // Make a GET request to the API to fetch the message
    axios
      .get('http://localhost:3001/api/sentence')
      .then((response) => {
        setMessage(response.data.sentence);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error (e.g., set an error state)
      });
  }, []);

  useEffect(() => {
    createEditableCells();
  }, [message]);

  useEffect(() => {
    // Start the timer countdown
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Check if the timer has reached zero or messageText is "You won!"
    if (timer === 0) {
      clearInterval(interval);
      setMessageText('You Lose');
    } else if (messageText === 'You won!' || messageText === "You Lose") {
      clearInterval(interval);
    } else if (timer <= 300 - 180) {
      // If the user fills cells in less than 3 minutes, set "You won!"
      setMessageText('You won!');
    } else if (timer > 300 - 180 && isBoardFilledCorrectly()) {
      // If the user fills cells in more than 3 minutes but correctly, set "You won!"
      setMessageText('You won!');
    } else if (timer > 300 - 180) {
      // If the user fills cells in more than 3 minutes, set "Fill the cells in less than 3 minutes to win"
      setMessageText('Fill the cells in less than 3 minutes to win');
    } else {
      // If the board is filled but not correctly, set "Try again"
      setMessageText('Try again');
    }

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, [timer, messageText]);

  // Helper function to create cells
  const createEditableCells = () => {
    const cells = message.split('').map((letter, index) => {
      // Determine if the cell should be red (for empty spaces)
      const isRedCell = letter === ' ';

      // Determine if the cell should be prefilled and non-editable
      const isPrefilledCell = [
        1, 4, 6, 8, 12, 23, 28, 29, 37, 38, 41, 43, 45, 46, 48, 50,
        53, 54, 57, 58, 59, 61, 63, 64, 66, 67, 68, 70, 71, 72, 73
      ].includes(index + 1); // Adjust for 1-indexed list

      const isWhitespaceCell = isRedCell && !isPrefilledCell;

      const cellRef = React.createRef();
      cellRefs.current.push(cellRef);

      return (
        <div
          className={`grid-cell ${isWhitespaceCell ? 'red-cell' : ''}`}
          key={index}
          contentEditable={!isWhitespaceCell && !isPrefilledCell} // Make cells editable only if not whitespace or prefilled
          onKeyDown={(e) => handleKeyDown(e, index, letter)}
          onBlur={() => handleBlur(index)}
          ref={cellRef}
          style={{
            backgroundColor: isWhitespaceCell ? '#4d6c82' : '', // Set background color for whitespace cells
            cursor: isWhitespaceCell ? 'not-allowed' : 'auto', // Disable cursor for whitespace cells
          }}
        >
          {isWhitespaceCell ? '\u00A0' /* Non-breaking space */ : isPrefilledCell ? letter : ''}
        </div>
      );
    });
    setEditableCells(cells);
  };

  // Helper function to find the next empty cell index
  const findNextEmptyCellIndex = (currentIndex) => {
    let nextIndex = currentIndex + 1;
    while (nextIndex < cellRefs.current.length) {
      const nextCell = cellRefs.current[nextIndex].current;
      if (nextCell && !nextCell.innerText && !nextCell.classList.contains('red-cell')) {
        return nextIndex;
      }
      nextIndex++;
    }
    return -1; // No empty cell found
  };

  // Handle keydown event to check correctness and set background color
  const handleKeyDown = (e, index, expectedLetter) => {
    if (e.key.length === 1) {
      // Check if a character was entered
      const value = e.key.toUpperCase();
      const currentCellRef = cellRefs.current[index];
      if (currentCellRef) {
        const currentCell = currentCellRef.current;
        if (currentCell) {
          currentCell.innerText = value; // Display the input on the current cell
          e.preventDefault();
          const isCorrect = value === expectedLetter.toUpperCase();
          currentCell.style.backgroundColor = isCorrect ? 'green' : 'red';

          // Find the index of the next empty cell
          const nextEmptyCellIndex = findNextEmptyCellIndex(index);
          if (nextEmptyCellIndex !== -1) {
            const nextEmptyCell = cellRefs.current[nextEmptyCellIndex].current;
            if (nextEmptyCell) {
              nextEmptyCell.focus(); // Move focus to the next empty cell
            }
          } else {
            // All cells are filled
            setMessageText(isBoardFilledCorrectly() ? 'You won!' : 'Try again');
          }
        }
      }
    }
  };

  // Handle blur event to update the input on the cell when the user clicks away
  const handleBlur = (index) => {
    const cellRef = cellRefs.current[index];
    if (cellRef) {
      const currentCell = cellRef.current;
      if (currentCell && !currentCell.innerText) {
        currentCell.style.backgroundColor = ''; // Reset background color if cell is empty
      }
    }
  };

  // Helper function to check if the board is filled correctly
  const isBoardFilledCorrectly = () => {
    for (let i = 0; i < cellRefs.current.length; i++) {
      const cell = cellRefs.current[i].current;
      if (cell && cell.contentEditable === 'true') {
        if (!cell.innerText || cell.innerText.toUpperCase() !== message[i].toUpperCase()) {
          return false;
        }
      }
    }
    return true;
  };

  // Reset all editable cells to empty and reset the timer
  const resetCells = () => {
    cellRefs.current.forEach((cellRef) => {
      const cell = cellRef.current;
      if (cell && cell.contentEditable === 'true') {
        cell.innerText = '';
        cell.style.backgroundColor = ''; // Reset background color
      }
    });
    setMessageText('');
    setTimer(300); // Reset the timer to 5 minutes (300 seconds)
  };

  return (

    <div className="container">
      <div className="header">
        <h1>ucerfacet</h1>
      </div>
      <div className="gameboard">
        <div className="gameboard_header">
          <div className="heading">
            <p>userfacet statement</p>
          </div>
          <div className="timer">
            <div className="timer_text">Time left:</div>
            <div className="timer_running">
              {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
            </div>
          </div>
        </div>

        <div className="grid">{editableCells}</div>
        
        <div className="reset_button">
          <button onClick={resetCells}>Reset</button>
        </div>
        <div className="hint_button">
          <button>Hint</button>
        </div>
        <div className="submit_button">
          <button>Submit</button>
        </div>
        {messageText && <div className="message">{messageText}</div>}
      </div>
    </div>
  );
}

export default Dashboard;



