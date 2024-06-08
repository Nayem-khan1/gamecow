import React, { useState, useEffect } from 'react';
import Dino from '../compnents/Dinosaur/Dino.jsx';
import Obstacle from '../compnents/Obstacle/Obstacle.jsx';
import Ground from '../compnents/Ground/Ground.jsx';
import './Game.css';

const Game = () => {
    const [jump, setJump] = useState(false);
    const [obstacleLeft, setObstacleLeft] = useState(100);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        let obstacleTimerId;
        let scoreTimerId;

        if (gameStarted && !gameOver) {
            obstacleTimerId = setInterval(() => {
                setObstacleLeft(prevLeft => prevLeft > 0 ? prevLeft - 1 : 100);
            }, 20);

            scoreTimerId = setInterval(() => {
                setScore(prevScore => prevScore + 1);
            }, 100);
        }

        return () => {
            clearInterval(obstacleTimerId);
            clearInterval(scoreTimerId);
        };
    }, [gameStarted, gameOver]);

    useEffect(() => {
        const handleJump = () => {
            setJump(true);
            setTimeout(() => {
                setJump(false);
            }, 500);
        };

        const handleStart = (e) => {
            if (e.key === ' ' || e.type === 'touchstart') {
                if (!gameStarted) {
                    setGameStarted(true);
                    setGameOver(false);
                    setScore(0); // Reset score
                } else {
                    handleJump();
                }
            }
        };

        document.addEventListener('keydown', handleStart);
        document.addEventListener('touchstart', handleStart);

        return () => {
            document.removeEventListener('keydown', handleStart);
            document.removeEventListener('touchstart', handleStart);
        };
    }, [gameStarted]);

    useEffect(() => {
        const dinoTop = jump ? 50 : 70;
        const obstacleTop = 70;
        if (obstacleLeft > 0 && obstacleLeft < 10 && dinoTop >= obstacleTop) {
            setGameOver(true);
            setGameStarted(false);
        }
    }, [jump, obstacleLeft]);

    const handleRestart = () => {
        setGameStarted(true);
        setGameOver(false);
        setScore(0);
        setObstacleLeft(100);
    };

    const handleHome = () => {
        setGameStarted(false);
        setGameOver(false);
        setScore(0);
        setObstacleLeft(100);
    };

    useEffect(() => {
        if (gameOver) {
            alert(`Game Over! Your score is ${score}`);
        }
    }, [gameOver, score]);

    return (
        <div className="game">
            <Dino jump={jump} />
            {gameStarted && !gameOver && <Obstacle left={obstacleLeft} />}
            <Ground />
            {gameOver && (
                <div className="game-over">
                    <div>Game Over</div>
                    <div>Your Score: {score}</div>
                    <button onClick={handleRestart}>Restart</button>
                    <button onClick={handleHome}>Home</button>
                </div>
            )}
            {!gameStarted && !gameOver && <div className="start-instruction">Press Space or Tap to Start</div>}
            <div className="score">Score: {score}</div>
        </div>
    );
};

export default Game;

