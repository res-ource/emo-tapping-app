// js/state.js

// The single source of truth for the session state.
// It is exported so other modules can read it. Direct modification should be limited.
export let sessionState = {};

// Function to reset the state at the beginning of a new session.
export function resetState() {
    sessionState = {
        currentStep: 'start_triage',
        path: null,
        primaryEmotion: null,
        originalPositiveGoal: null,
        currentSuds: null,
        initialSuds: null,
        tappingRoundCount: 0,
        pacingMode: 'manual',
        roundsToRun: 0,
        autoPaceSpeed: 2500,
        isExploratory: false,
    };
}