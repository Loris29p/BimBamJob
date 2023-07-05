import React, { useState, useEffect } from 'react';
import TondeuseIMG from '../assets/img/tondeuse.png'
import '../assets/css/Tondeuse.css';

function Tondeuse() {
    const [position1, setPosition1] = useState({x: 0, y: 0, orientation: 'S'});
    const [position2, setPosition2] = useState({x: 0, y: 0, orientation: 'S'});
    const [grid, setGrid] = useState([]);
 
    const doFirstTondeuse = (text) => {
        var newPos = {x: 0, y: 0, orientation: 'S'};

        const instructions = text.split('\n').slice(1);
        const tondeuse1 = instructions[0].split(' ');

        const tondeuse1Number = tondeuse1[0];
        const [tondeuse1X, tondeuse1Y] = tondeuse1Number.split('');
        const tondeuse1Orientation = tondeuse1[1];
        newPos = { x: parseInt(tondeuse1X), y: parseInt(tondeuse1Y), orientation: tondeuse1Orientation };

        const tondeuse1Instructions = instructions[1].split('');
        tondeuse1Instructions.forEach(instruction => {
            if (instruction === 'L') {
                newPos = turnLeft(newPos)
            } else if (instruction === 'R') {
                newPos = turnRight(newPos);
            } else if (instruction === 'F') {
                newPos = moveForward(newPos);
            }
        });

        setPosition1(newPos);
    }

    const doSecondTondeuse = (text) => {
        var newPos = {x: 0, y: 0, orientation: 'S'};

        const instructions = text.split('\n').slice(1);
        const tondeuse2 = instructions[2].split(' ');

        const tondeuse2Number = tondeuse2[0];
        const [tondeuse2X, tondeuse2Y] = tondeuse2Number.split('');
        const tondeuse2Orientation = tondeuse2[1];
        newPos = { x: parseInt(tondeuse2X), y: parseInt(tondeuse2Y), orientation: tondeuse2Orientation };

        const tondeuse2Instructions = instructions[3].split('');
        tondeuse2Instructions.forEach(instruction => {
            if (instruction === 'L') {
                newPos = turnLeft(newPos)
            } else if (instruction === 'R') {
                newPos = turnRight(newPos);
            } else if (instruction === 'F') {
                newPos = moveForward(newPos);
            }
        });

        setPosition2(newPos);
    }

    const turnLeft = (newPos) => {
        if (newPos.orientation === 'N') {
            newPos.orientation = 'W';
        } else if (newPos.orientation === 'W') {
            newPos.orientation = 'S';
        } else if (newPos.orientation === 'S') {
            newPos.orientation = 'E';
        } else if (newPos.orientation === 'E') {
            newPos.orientation = 'N';
        }
        return newPos;
    }

    const turnRight = (newPos) => {
        if (newPos.orientation === 'N') {
            newPos.orientation = 'E';
        } else if (newPos.orientation === 'E') {
            newPos.orientation = 'S';
        } else if (newPos.orientation === 'S') {
            newPos.orientation = 'W';
        } else if (newPos.orientation === 'W') {
            newPos.orientation = 'N';
        }
        return newPos;
    }

    const moveForward = (newPos) => {
        var dontChangeNewPos = newPos;

        if (newPos.orientation === 'N') {
            newPos.y = newPos.y + 1;
        } else if (newPos.orientation === 'E') {
            newPos.x = newPos.x + 1;
        } else if (newPos.orientation === 'S') {
            newPos.y = newPos.y - 1;
        } else if (newPos.orientation === 'W') {
            newPos.x = newPos.x - 1;
        }

        if (newPos.y > 5) {
            newPos.y = 5;
        } else if (newPos.x > 5) {
            newPos.x = 5;
        } else if (newPos.y < 0) {
            newPos.y = 0;
        } else if (newPos.x < 0) {
            newPos.x = 0;
        }

        return newPos;
    }

    const readFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = (e.target.result);

            const firstLine = text.split('\n')[0];
            const [x, y] = firstLine.split('');
            
            const gridS = [];
            for (let i = x; i >= 0; i--) {
                gridS.push([]);
                for (let j = y; j >= 0; j--) {
                    gridS[x - i].push(parseInt(j));
                }
            }

            setGrid(gridS);

            doFirstTondeuse(text)

            setTimeout(() => {
                doSecondTondeuse(text)
            }, 1000);
        };
        reader.readAsText(file);
    }

    useEffect(() => {
        setPosition1({ x: 0, y: 0, orientation: "N" });
        const file = new File(['55\n44 S\nLFRRFFLFRFF\n22 N\nFFRLLRFRLF'], 'instructions.txt', { type: 'text/plain' });
        readFile(file);
    }, []);

    return (
        <div>
            <div className="grid">
                {grid.map((row, i) => (
                    <div key={i} className="row">
                        {row.map((col, j) => (
                            <div key={j} className="col">
                                <span className='textCol'>{i} {col}</span>
                                {position1.x === i && position1.y === col && <img src={TondeuseIMG} alt="Tondeuse" className='tondeuse' />}
                                {position2.x === i && position2.y === col && <img src={TondeuseIMG} alt="Tondeuse" className='tondeuse' />}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tondeuse;