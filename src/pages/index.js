import * as React from "react"
import {useState} from "react";
import moment, {duration} from "moment";
import Button from "../components/Button";
import 'moment-duration-format';

const IndexPage = () => {
  const [state, setState] = useState({
    time: duration(0),
    inputTime: ''
  });

  /**
   * Reset all.
   */
  const reset = () => {
    setState({
      time: duration(0),
      inputTime: ''
    });
  }

  /**
   * Perform an operation from the input time.
   *
   * @param {number} type - Operation type: -1 (reset), 0 (sum), 1 (subtract).
   */
  const handleOperation = (type) => {
    if (type === -1) {
      reset();
    } else {
      const mode_a = state.inputTime.match('^([0-9]*)$');
      const mode_b = state.inputTime.match('(\\d+)([smhd]{1})');
      const mode_c = state.inputTime.match('^(?:(\\d{1,2}):)?(\\d{1,2}):(\\d{1,2})$');
      const newTime = state.time.clone();
      if (mode_a) {
        // 0 = [1]
        newTime.add(mode_a[1], 's');
      } else if (mode_b) {
        // 0s = [1][2]
        if (type === 0) {
          newTime.add(parseInt(mode_b[1]), mode_b[2]);
        } else {
          newTime.subtract(parseInt(mode_b[1]), mode_b[2]);
        }
      } else if (mode_c) {
        if (mode_c[1] === undefined) {
          // 00:00 => [2][3]
          if (type === 0) {
            newTime.add(parseInt(mode_c[2]), 'm');
            newTime.add(parseInt(mode_c[3]), 's');
          } else {
            newTime.subtract(parseInt(mode_c[2]), 'm');
            newTime.subtract(parseInt(mode_c[3]), 's');
          }
        } else {
          // 00:00:00 => [1][2][3]
          if (type === 0) {
            newTime.add(parseInt(mode_c[1]), 'h');
            newTime.add(parseInt(mode_c[2]), 'm');
            newTime.add(parseInt(mode_c[3]), 's');
          } else {
            newTime.subtract(parseInt(mode_c[1]), 'h');
            newTime.subtract(parseInt(mode_c[2]), 'm');
            newTime.subtract(parseInt(mode_c[3]), 's');
          }
        }
      } else {
        handleInput('Wrong format');
        return;
      }
      setState((state) => ({
        ...state,
        time: newTime
      }));
    }
  }

  /**
   * Perform an update to the input time.
   *
   * @param {string} v Value
   */
  function handleInput(v) {
    setState((state) => ({
      ...state,
      inputTime: v
    }));
  }

  const units = ['s', 'm', 'h', 'd'];
  return (
      <main className="bg-gradient-to-r from-indigo-400 to-rose-300 p-24">
        <div className="inline-block py-12 px-6 bg-pink-200 rounded-xl shadow-lg items-center border-pink-300 border-4">
          <label className="block text-center bg-green-100 shadow-inner shadow-gray-400 py-6 mx-4 text-4xl">
            <span>{moment.duration(state.time, 'seconds').format('D[d] HH:mm:ss')}</span>
          </label>
          <div className='mx-10 my-16'>
            {units.map((unit) => (
                <div key={unit} className="mt-3 grid grid-flow-col">
                  {[1, 5, 10, 20, 30].map((value) => (
                      <Button
                          key={`${value}${unit}`}
                          onClick={() => handleInput(value + unit)}>
                        {`${value}${unit}`}
                      </Button>
                  ))}
                </div>
            ))}
          </div>
          <input type="text" className="p-2 drop-shadow-md text-center" placeholder="ex: 30, 30s, 00:30..."
                 value={state.inputTime}
                 onChange={(e) => handleInput(e.target.value)}/>
          <div className="mt-3 grid grid-flow-col mx-20">
            <Button color="bg-green-300" onClick={() => handleOperation(0)}>+</Button>
            <Button color="bg-red-300" onClick={() => handleOperation(1)}>-</Button>
            <Button color="bg-amber-300" onClick={() => handleOperation(-1)}>RESET</Button>
          </div>
        </div>
      </main>
  );
}

export default IndexPage

export const Head = () => <title>Time Calculator</title>
