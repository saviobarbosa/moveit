import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExpericence: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge; 
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
}

interface ChallengesProvierProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children } : ChallengesProvierProps ){
    const [level, setLevel] = useState(1);
    const [currentExpericence, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    const [activeChallenge, setActiveChallenge] = useState(null);

    function levelUp() {
      setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    return (
        <ChallengesContext.Provider 
            value={{ 
                level, 
                currentExpericence, 
                challengesCompleted, 
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge               
            }}>
            {children}
        </ChallengesContext.Provider>
    )
}