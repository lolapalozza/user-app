import React, { useState, useCallback, useEffect, useRef } from "react";

const initialNumberArr = [...Array(100).keys()].map(x => ({ number: x + 1, selected: false }));

export const LuckyGame = () => {
  const [numbers, setNumbers] = useState(initialNumberArr);
  const [isDragging, setIsDragging] = useState(false);
  const [touchedCells, setTouchedCells] = useState(new Set());
  const boardRef = useRef(null);

  const numberSelected = useCallback((number) => {
    setNumbers(prevNumbers =>
      prevNumbers.map(item =>
        item.number === number
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  }, []);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Только левый клик
    setIsDragging(true);
    const element = e.target;
    if (element.classList.contains('cell')) {
      const number = parseInt(element.textContent, 10);
      numberSelected(number);
      setTouchedCells(new Set([number])); // Начинаем с одного числа
    }
  };

  const handleTouchStart = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение
    setIsDragging(true);
    const element = e.target;
    if (element.classList.contains('cell')) {
      const number = parseInt(element.textContent, 10);
      numberSelected(number);
      setTouchedCells(new Set([number])); // Начинаем с одного числа
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element && element.classList.contains('cell')) {
        const number = parseInt(element.textContent, 10);
        if (!touchedCells.has(number)) {
          numberSelected(number);
          setTouchedCells(prevTouchedCells => new Set(prevTouchedCells).add(number));
        }
      }
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение
    if (isDragging) {
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element && element.classList.contains('cell')) {
        const number = parseInt(element.textContent, 10);
        if (!touchedCells.has(number)) {
          numberSelected(number);
          setTouchedCells(prevTouchedCells => new Set(prevTouchedCells).add(number));
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTouchedCells(new Set()); // Сбрасываем список затронутых ячеек
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchedCells(new Set()); // Сбрасываем список затронутых ячеек
  };

  useEffect(() => {
    const boardElement = boardRef.current;
    if (boardElement) {
      boardElement.addEventListener('mousedown', handleMouseDown);
      boardElement.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);
      // Предотвращаем выделение текста
      boardElement.addEventListener('dragstart', (e) => e.preventDefault());
    }

    return () => {
      if (boardElement) {
        boardElement.removeEventListener('mousedown', handleMouseDown);
        boardElement.removeEventListener('touchstart', handleTouchStart);
        boardElement.removeEventListener('dragstart', (e) => e.preventDefault());
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleMouseDown, handleTouchMove, handleTouchStart, handleTouchEnd]);

  return (
    <div ref={boardRef} className="flex flex-wrap lucky-board">
      {numbers.map(({ number, selected }) => (
        <div
          key={number}
          className={`cell ${selected ? 'selected' : ''}`}
        >
          {number}
        </div>
      ))}
    </div>
  );
};
