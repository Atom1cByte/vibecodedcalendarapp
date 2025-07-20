import { useState } from 'react'
import './App.css'

function App() {
  const [selectedColumn1, setSelectedColumn1] = useState('')
  const [selectedColumn2, setSelectedColumn2] = useState('')
  const [selectedColumn3, setSelectedColumn3] = useState('rch')
  const [selectedDay, setSelectedDay] = useState(1)
  const [selectedYear, setSelectedYear] = useState(1900)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // The meme layout - 3 columns exactly as shown in the image
  const monthColumns = [
    ['j', 'nov', 'dec', 'febr', 'm', 'sept'],
    ['octo', 'em', 'uly', 'a', 'une', 'an'],
    ['ber', 'y', 'uary', 'rch', 'pril', 'ugust']
  ]

  const handleFragmentClick = (fragment, columnIndex) => {
    if (columnIndex === 0) {
      setSelectedColumn1(prev => prev === fragment ? '' : fragment)
    } else if (columnIndex === 1) {
      setSelectedColumn2(prev => prev === fragment ? '' : fragment)
    } else if (columnIndex === 2) {
      setSelectedColumn3(prev => prev === fragment ? '' : fragment)
    }
  }

  const getCombinedMonth = () => {
    return selectedColumn1 + selectedColumn2 + selectedColumn3
  }





  return (
    <div className="calendar-container">
      <h1>Date Picker</h1>
      <p>Please select your desired date</p>

      <div className="date-picker">
        <div className="month-section">
          <label>Month</label>
          <div className="dropdown-container">
            <div
              className="dropdown-header"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{getCombinedMonth() || 'Select month'}</span>
              <span className="dropdown-arrow">{isDropdownOpen ? '▲' : '▼'}</span>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <div className="month-grid">
                  {monthColumns.map((column, columnIndex) => (
                    <div key={columnIndex} className="month-column">
                      {column.map((monthPart) => {
                        const isSelected =
                          (columnIndex === 0 && selectedColumn1 === monthPart) ||
                          (columnIndex === 1 && selectedColumn2 === monthPart) ||
                          (columnIndex === 2 && selectedColumn3 === monthPart)

                        return (
                          <div
                            key={monthPart}
                            className={`month-cell ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleFragmentClick(monthPart, columnIndex)}
                          >
                            {monthPart}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="day-section">
          <label>Day</label>
          <div className="day-input">
            <input
              type="number"
              value={selectedDay}
              onChange={(e) => setSelectedDay(parseInt(e.target.value) || 1)}
              min="1"
              max="31"
            />
            <div className="spinner">
              <button onClick={() => setSelectedDay(prev => Math.min(31, prev + 1))}>▲</button>
              <button onClick={() => setSelectedDay(prev => Math.max(1, prev - 1))}>▼</button>
            </div>
          </div>
        </div>

        <div className="year-section">
          <label>Year</label>
          <div className="year-input">
            <input
              type="range"
              min="1900"
              max="2100"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="year-slider"
            />
            <span className="year-display">{selectedYear}</span>
          </div>
        </div>


      </div>

      <div className="selected-date">
        <h3>Selected Date</h3>
        <p className="date-display">{getCombinedMonth() || '[No month selected]'} {selectedDay}, {selectedYear}</p>
      </div>

      <a
        href="https://twitter.com/atomicbyte_"
        target="_blank"
        rel="noopener noreferrer"
        className="twitter-button"
      >
        Follow atomicbyte on Twitter/X
      </a>
    </div>
  )
}

export default App
