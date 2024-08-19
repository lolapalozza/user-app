import React, { useCallback, useEffect, useRef, useState } from "react";


export const Board = ({ limit = 100, numbers, setNumbers }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [touchedCells, setTouchedCells] = useState(new Set());
  const boardRef = useRef(null);

  const getSelectedCount = () => {
    return numbers.filter(item => item.selected).length;
  };

  const numberSelected = useCallback((number) => {
    setNumbers(prevNumbers => {
      const updatedNumbers = prevNumbers.map(item =>
        item.number === number
          ? { ...item, selected: !item.selected }
          : item
      );

      const selectedCount = updatedNumbers.filter(item => item.selected).length;

      // Если лимит достигнут, не позволяем выделить новые ячейки
      if (selectedCount > limit) {
        // Найдите первое выделенное значение
        const firstSelectedIndex = updatedNumbers.findIndex(item => item.selected);
        if (firstSelectedIndex !== -1) {
          updatedNumbers[firstSelectedIndex] = { ...updatedNumbers[firstSelectedIndex], selected: false };
        }
      }

      return updatedNumbers;
    });
  }, [limit]);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Только левый клик
    setIsDragging(true);
    const element = e.target;
    if (element.classList.contains('cell')) {
      const number = parseInt(element.textContent, 10);
      const selectedCount = getSelectedCount();
      if (selectedCount < limit || element.classList.contains('selected')) {
        numberSelected(number);
        setTouchedCells(new Set([number])); // Начинаем с одного числа
      }
    }
  };

  const handleTouchStart = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение
    setIsDragging(true);
    const element = e.target;
    if (element.classList.contains('cell')) {
      const number = parseInt(element.textContent, 10);
      const selectedCount = getSelectedCount();
      if (selectedCount < limit || element.classList.contains('selected')) {
        numberSelected(number);
        setTouchedCells(new Set([number])); // Начинаем с одного числа
      }
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element && element.classList.contains('cell')) {
        const number = parseInt(element.textContent, 10);
        const selectedCount = getSelectedCount();
        if (!touchedCells.has(number) && (selectedCount < limit || element.classList.contains('selected'))) {
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
        const selectedCount = getSelectedCount();
        if (!touchedCells.has(number) && (selectedCount < limit || element.classList.contains('selected'))) {
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
