// components/Visualizer.tsx
'use client'
import React, { useState, useEffect } from 'react';
import Bar from './Bar';

const Visualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(50);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < 50; i++) {
      newArray.push(Math.floor(Math.random() * 500) + 5);
    }
    setArray(newArray);
  };

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const getSpeedDelay = () => {
    return 110 - speed; // Invert the speed value
  };

  const bubbleSort = async () => {
    setSorting(true);
    const arr = array.slice();
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(getSpeedDelay());
        }
      }
    }
    setSorting(false);
  };

  const insertionSort = async () => {
    setSorting(true);
    const arr = array.slice();
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        setArray([...arr]);
        await sleep(getSpeedDelay());
        j--;
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }
    setSorting(false);
  };

  const selectionSort = async () => {
    setSorting(true);
    const arr = array.slice();
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
        await sleep(getSpeedDelay());
      }
    }
    setSorting(false);
  };

  const mergeSort = async (arr: number[]) => {
    setSorting(true);
    await mergeSortHelper(arr, 0, arr.length - 1);
    setSorting(false);
  };

  const mergeSortHelper = async (arr: number[], left: number, right: number) => {
    if (left < right) {
      const middle = Math.floor((left + right) / 2);
      await mergeSortHelper(arr, left, middle);
      await mergeSortHelper(arr, middle + 1, right);
      await merge(arr, left, middle, right);
    }
  };

  const merge = async (arr: number[], left: number, middle: number, right: number) => {
    const leftArr = arr.slice(left, middle + 1);
    const rightArr = arr.slice(middle + 1, right + 1);
    let i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      setArray([...arr]);
      await sleep(getSpeedDelay());
      k++;
    }
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
    }
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
    }
    setArray([...arr]);
  };

  const quickSort = async (arr: number[]) => {
    setSorting(true);
    await quickSortHelper(arr, 0, arr.length - 1);
    setSorting(false);
  };

  const quickSortHelper = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  };

  const partition = async (arr: number[], low: number, high: number) => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(getSpeedDelay());
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await sleep(getSpeedDelay());
    return i + 1;
  };

  return (
    <div className="flex flex-col items-center ">
        <h1 className='font-extrabold text-3xl mb-2 -mt-10 ' >Sorting Visualizer</h1>
      <div className="flex justify-center items-end h-100 w-full border  bg-black mb-5">
        {array.map((value, index) => (
          <Bar key={index} height={value} />
        ))}
      </div>
      <div className="flex space-x-4 mb-5">
        <button
          onClick={resetArray}
          disabled={sorting}
          className="px-4 py-2 bg-black hover:border-2 hover:border-white text-white  rounded disabled:opacity-50"
        >
          Reset Array
        </button>
        <button
          onClick={bubbleSort}
          disabled={sorting}
          className="px-4 py-2 bg-black hover:border-2 hover:border-white text-white rounded disabled:opacity-50"
        >
          Bubble Sort
        </button>
        <button
          onClick={insertionSort}
          disabled={sorting}
          className="px-4 py-2 bg-black hover:border-2 hover:border-white text-white rounded disabled:opacity-50"
        >
          Insertion Sort
        </button>
        <button
          onClick={selectionSort}
          disabled={sorting}
          className="px-4 py-2 bg-black hover:border-2 hover:border-white text-white rounded disabled:opacity-50"
        >
          Selection Sort
        </button>
        <button
          onClick={() => mergeSort(array)}
          disabled={sorting}
          className="px-4 py-2 bg-black hover:border-2 hover:border-white text-white rounded disabled:opacity-50"
        >
          Merge Sort
        </button>
        <button
          onClick={() => quickSort(array)}
          disabled={sorting}
          className="px-4 py-2 bg-black hover:border-2 hover:border-white text-white rounded disabled:opacity-50"
        >
          Quick Sort
        </button>
      </div>
      <div className="flex space-x-4">
        <label htmlFor="speed" className="mr-2">Speed:</label>
        <input
          type="range"
          id="speed"
          min="10"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Visualizer;
