// js/main.js
import { resetState, sessionState } from './state.js';
import { initUI, addBotMessage, showOptions } from './ui.js';
import { handleUserChoice } from './flow.js';

const DOMElements = {
    chatBox: document.getElementById('chat-box'),
    optionsContainer: document.getElementById('options-container'),
    footerDisclaimer: document.getElementById('footer-disclaimer'),
    speedSliderContainer: document.getElementById('speed-slider-container'),
    speedSlider: document.getElementById('speed-slider'),
};

export async function init(isSoftRestart = false) {
    if (!isSoftRestart) {
        DOMElements.chatBox.innerHTML = '';
    }
    resetState();
    await addBotMessage("Hi there! I’m E.M.O., your Emotion Management Operator. I’m here to help you with how you’re feeling today. Let’s take a moment to check in with yourself.");
    await addBotMessage("Would you say your current feeling is GENERALLY more positive or more negative? This helps me guide you better.");
    DOMElements.footerDisclaimer.style.display = 'block';
    sessionState.currentStep = 'start_triage';
    showOptions([
        { text: "Feeling Positive", value: "positive" },
        { text: "Feeling Negative", value: "negative" }
    ]);
}

initUI(DOMElements);

DOMElements.speedSlider.addEventListener('input', (e) => {
    sessionState.autoPaceSpeed = 5500 - e.target.value; 
});

window.addEventListener('load', () => init());

window.addEventListener('session-restart', (e) => {
    const isSoft = e.detail?.soft || false;
    init(isSoft);
});