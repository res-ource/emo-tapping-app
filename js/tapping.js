// js/tapping.js
import { sessionState } from './state.js';
import { emoLogic, negativeRoundThemeMap, positiveRoundThemeMap } from './content.js';
import { addBotMessage, showOptions } from './ui.js';
import { handleUserChoice } from './flow.js';
import { shuffle } from './utils.js';


/**
 * Generates the script (tapping points and phrases) for a single round.
 * @param {string} emotion - The key for the current emotion being processed.
 * @param {number} roundCount - The current round number (zero-indexed).
 * @returns {Array<object>} An array of objects, each with {point, phrase}.
 */
function generateTappingRound(emotion, roundCount) {
    const tappingPoints = ["Top of Head", "Eyebrow", "Side of Eye", "Under Eye", "Under Nose", "Chin", "Collarbone", "Under Arm"];
    const emotionData = emoLogic.emotionDetails[emotion];
    
    if (sessionState.isExploratory) {
        const roundScript = emotionData.phrases_exploratory[0];
        return roundScript.map((pointData, index) => ({ point: tappingPoints[index], phrase: pointData.phrase }));
    }
    
    const isNegativePath = sessionState.path === 'negative';
    const themeMap = isNegativePath ? negativeRoundThemeMap : positiveRoundThemeMap;
    const phraseSource = isNegativePath ? emotionData.phraseBank_negative : emotionData.phraseBank_positive;

    if (!phraseSource) {
        return tappingPoints.map(point => ({ point, phrase: `Acknowledging this ${emotion}.`}));
    }
    
    if (!isNegativePath && (roundCount + 1 > Object.keys(themeMap).length)) {
        const shuffledBank = shuffle([...phraseSource]);
        return tappingPoints.map((point, index) => ({
            point,
            phrase: shuffledBank[index % shuffledBank.length].text 
        }));
    }
    
    const theme = themeMap[roundCount + 1] || (isNegativePath ? "Self-Compassion" : "Anchoring the Gratitude");
    const themePhrases = phraseSource.filter(p => p.theme === theme);
    
    if (themePhrases.length < 8) {
        return tappingPoints.map(point => ({
            point,
            phrase: themePhrases[Math.floor(Math.random() * themePhrases.length)].text
        }));
    }
    
    const shuffledPhrases = shuffle([...themePhrases]);
    return tappingPoints.map((point, index) => ({
        point,
        phrase: shuffledPhrases[index].text
    }));
}

/**
 * Runs the user through a full tapping round, showing each point and phrase.
 */
export async function runTappingSegment() {
    await addBotMessage(`Okay, let's begin Round ${sessionState.tappingRoundCount + 1}...`);
    
    const roundScript = generateTappingRound(sessionState.primaryEmotion, sessionState.tappingRoundCount);
    
    for (let i = 0; i < roundScript.length; i++) {
        const point = roundScript[i];
        await addBotMessage(`<strong>${point.point}:</strong> <em>"${point.phrase}"</em>`);
        
        if (sessionState.pacingMode === 'manual' && i < roundScript.length - 1) {
            await new Promise(resolve => {
                showOptions([{ text: "Next Point", value: 'continue' }]);
                document.querySelector('#options-container button').onclick = () => { resolve(); };
            });
            showOptions([]);
        } else if (sessionState.pacingMode === 'auto') {
            await new Promise(resolve => setTimeout(resolve, sessionState.autoPaceSpeed));
        }
    }
    sessionState.tappingRoundCount++;
    
    sessionState.currentStep = sessionState.isExploratory ? 'post_exploratory_round' : 'post_tapping_round';
    handleUserChoice('continue', 'Continue');
}

/**
 * Runs the special exploratory round for when the user is unsure of their feelings.
 */
export async function runAlternativeExploratoryRound() {
    await addBotMessage("Okay, let's try something gentle to see if we can clear some space. First, the setup statements. Just tap along with me on the Karate Chop point.");
    const altSetup = emoLogic.emotionDetails.alternative_exploratory.setupStatements;
    for (const phrase of altSetup) {
        await addBotMessage(`<em>"${phrase}"</em>`);
        await new Promise(resolve => setTimeout(resolve, 1500));
    }

    await addBotMessage("Now for the tapping round...");
    const altScript = emoLogic.emotionDetails.alternative_exploratory.tappingScript;
    for (const pointData of altScript) {
        await addBotMessage(`<strong>${pointData.point}:</strong> <em>"${pointData.phrase}"</em>`);
        await new Promise(resolve => setTimeout(resolve, sessionState.autoPaceSpeed));
    }

    await addBotMessage("Okay, let's check in again. Does one of these feel any closer now, even a little?");
    const originalEmotionData = emoLogic.emotionDetails[sessionState.originalPositiveGoal];
    showOptions(originalEmotionData.blockOptions.filter(opt => opt.id !== 'no_block').map(opt => ({ text: opt.text, value: opt.id })));
    sessionState.currentStep = 'check_for_blockers';
}