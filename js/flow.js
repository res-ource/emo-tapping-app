// js/flow.js
import { sessionState } from './state.js';
import { emoLogic, phraseBank } from './content.js';
import { addUserMessage, addBotMessage, showOptions, createSudsOptions, showSpeedSlider } from './ui.js';
import { runTappingSegment, runAlternativeExploratoryRound } from './tapping.js';
import { shuffle } from './utils.js';

/**
 * Gets a random response from a given category in the phraseBank.
 * @param {string} category - The key for the response category.
 * @returns {string} A random phrase.
 */
function getRandomResponse(category) {
    const responses = phraseBank[category];
    if (!responses || responses.length === 0) return "An error occurred.";
    return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * The main state machine. Handles all user choices and directs the application flow.
 * @param {string|number} value - The value of the user's choice.
 * @param {string} text - The display text of the user's choice.
 */
export async function handleUserChoice(value, text) {
    if (value !== 'continue') {
        addUserMessage(text.replace(' 🔒', ''));
    }
    showOptions([]);
    showSpeedSlider(false);

    const details = emoLogic.emotionDetails;

    switch (sessionState.currentStep) {
        case 'start_triage':
            sessionState.path = value;
            const pathData = emoLogic[value];
            await addBotMessage(pathData.prompt);
            
            const emotionOptions = Object.keys(pathData.options).map(key => {
                const isFree = (key === 'stress' || key === 'gratitude');
                return {
                    text: isFree ? pathData.options[key] : `${pathData.options[key]} 🔒`,
                    value: key
                };
            });
            sessionState.currentStep = 'select_emotion';
            showOptions(emotionOptions);
            break;
        
        case 'select_emotion':
            const isFreeFlow = (value === 'stress' || value === 'gratitude');
            if (isFreeFlow) {
                sessionState.primaryEmotion = value;
                await addBotMessage(details[value].initialPrompt);

                if (sessionState.path === 'positive') {
                    sessionState.originalPositiveGoal = value;
                    sessionState.currentStep = 'exploratory_setup';
                    await addBotMessage("Start by gently tapping on the Karate Chop Point and repeat each of these statements out loud or in your mind:");
                    const setupStatements = shuffle([...details[value].exploratorySetup]).slice(0, 3);
                    for (const phrase of setupStatements) {
                        await addBotMessage(`<em>"${phrase}"</em>`);
                    }
                    showOptions([{ text: "I'm ready to tap!", value: 'continue' }]);
                } else {
                    const promptName = details[value].promptName || details[value].displayName.toLowerCase();
                    await addBotMessage(`Before we begin, let’s check in. On a scale from 0-10, how big is your feeling of <strong>${promptName}</strong> right now?`);
                    sessionState.currentStep = 'suds_start';
                    showOptions(createSudsOptions());
                }
            } else {
                const emotionName = details[value]?.displayName || text.replace(' 🔒', '');
                await addBotMessage(`That's an excellent choice. The flow for **${emotionName}** is a key part of the full **E.M.O. Experience**.`);
                await addBotMessage(`The complete version gives you instant access to our entire library of emotional flows.`);
                showOptions([
                    { text: "Continue with a Free Flow", value: "restart_selection" },
                    { text: "Learn About Full Version", value: "learn_more" }
                ]);
                sessionState.currentStep = 'upsell_prompt';
            }
            break;

        case 'upsell_prompt':
            if (value === 'restart_selection') {
                window.dispatchEvent(new CustomEvent('session-restart', { detail: { soft: false } }));
            } else if (value === 'learn_more') {
                await addBotMessage("Thank you for your interest! This would normally open a new tab to our sales page. For now, let's start over.");
                await new Promise(resolve => setTimeout(resolve, 3000));
                window.dispatchEvent(new CustomEvent('session-restart', { detail: { soft: false } }));
            }
            break;

        case 'exploratory_setup':
            sessionState.currentStep = 'choose_pacing_mode';
            await addBotMessage(`How would you like to proceed?`);
            showOptions([
                {text: "Manual Pace (I click next)", value: 'manual'},
                {text: "Auto Pace (Timed)", value: 'auto'}
            ]);
            sessionState.isExploratory = true; 
            break;
        
        case 'post_exploratory_round':
            const originalEmotionData = details[sessionState.originalPositiveGoal];
            await addBotMessage(originalEmotionData.promptForBlocks);
            showOptions(originalEmotionData.blockOptions.map(opt => ({text: opt.text, value: opt.id})));
            sessionState.currentStep = 'check_for_blockers';
            break;
        
        case 'check_for_blockers':
            if (value === 'no_block') {
                sessionState.currentStep = 'ask_about_no_block';
                await addBotMessage("Thanks for checking in so honestly. Sometimes what’s underneath isn’t obvious—or doesn’t fit neatly into a label. That doesn’t mean it’s not there… it just means we’re being gentle with it.");
                await addBotMessage("If you’re open to it, you can still choose the one that feels closest and tap along. There’s a method called Borrowing Benefits—where just tapping through someone else’s process can unlock something surprising inside you. Your nervous system will know what to do.");
                await addBotMessage("But if none of this feels like a fit—if you want help uncovering what’s really going on—my person is here for that. He offers gentle 1-on-1 sessions for people who want a little more clarity, space, or care.");
                showOptions([
                    { text: "🌱 Okay, I’ll pick the closest one and tap anyway.", value: 'borrow_benefits' },
                    { text: "🧭 Tell me about 1-on-1 sessions with Tre.", value: 'learn_sessions' }
                ]);
            } else {
                sessionState.primaryEmotion = value; 
                sessionState.path = 'negative';
                const blockerData = details[value];
                const displayName = blockerData.displayName || text;
                await addBotMessage(`Okay, let's gently address that feeling of <strong>${displayName.toLowerCase()}</strong>. On a scale of 0-10, how big is that feeling for you?`);
                sessionState.currentStep = 'suds_start';
                showOptions(createSudsOptions());
                sessionState.isExploratory = false; 
            }
            break;

        case 'ask_about_no_block':
            if (value === 'borrow_benefits') {
                await runAlternativeExploratoryRound();
            } else if (value === 'learn_sessions') {
                await addBotMessage("My person, would be happy to help. A 1-on-1 session is the most direct way to get personal attention for your specific issues. You can learn more at <a href='https://emoalchemy.com/sessions/' target='_blank' class='text-blue-500 underline'>https://emoalchemy.com/sessions/</a>. For now, would you like to continue your session?");
                showOptions([{text: "Yes, Continue Session", value: "borrow_benefits"}]);
                sessionState.currentStep = 'ask_about_no_block';
            }
            break;

        case 'suds_start':
            sessionState.currentSuds = parseInt(value, 10);
            sessionState.initialSuds = parseInt(value, 10);
            await addBotMessage(`Got it, a <strong>${value}</strong>. Let's start with the Setup Statements. Tap on the <strong>Karate Chop Point</strong> and repeat these out loud:`);
            let setupPhrases;
            if(sessionState.path === 'positive'){
                 setupPhrases = shuffle([...details[sessionState.primaryEmotion]?.setupStatements]).slice(0, 3);
            } else {
                setupPhrases = details[sessionState.primaryEmotion]?.setupStatements;
            }

            if (setupPhrases && Array.isArray(setupPhrases)) {
                for (const phrase of setupPhrases) {
                    await addBotMessage(`<em>"${phrase}"</em>`);
                }
            }
            sessionState.currentStep = 'choose_pacing_mode';
            await addBotMessage(`How would you like to proceed with the tapping round?`);
            showOptions([
                {text: "Manual Pace", value: 'manual'},
                {text: "Auto Pace", value: 'auto'}
            ]);
            break;

        case 'choose_pacing_mode':
            sessionState.pacingMode = value;
            if (value === 'auto') {
                showSpeedSlider(true);
                const suds = sessionState.initialSuds;
                if (suds >= 7) sessionState.roundsToRun = 8;
                else if (suds >= 4) sessionState.roundsToRun = 5;
                else if (suds >= 3 || suds === 2) sessionState.roundsToRun = 2;
                else if (suds === 1) sessionState.roundsToRun = 1;
                else if (suds === 0) sessionState.roundsToRun = 3;
                else sessionState.roundsToRun = 1; 
            }
            runTappingSegment();
            break;
        
        case 'post_tapping_round':
            if (sessionState.pacingMode === 'auto') {
                sessionState.roundsToRun--;
                if (sessionState.roundsToRun > 0) {
                    runTappingSegment(); 
                    return; 
                } else {
                    const promptName = details[sessionState.primaryEmotion].promptName || details[sessionState.primaryEmotion].displayName;
                    await addBotMessage(`Okay, all done with the automatic rounds. Let's check in. On a scale from 0-10, how big is the feeling of <strong>${promptName.toLowerCase()}</strong> now?`);
                    sessionState.currentStep = 'post_suds';
                    showOptions(createSudsOptions());
                }
            } else {
                sessionState.currentStep = 'ask_for_next_action';
                await addBotMessage("Good round. What feels right for you to do next?");
                showOptions([
                    { text: "Do another round", value: 'another_round' },
                    { text: "Check my number now", value: 'check_suds' }
                ]);
            }
            break;
        
        case 'ask_for_next_action':
            if (value === 'another_round') {
                runTappingSegment();
            } else { 
                const promptName = details[sessionState.primaryEmotion].promptName || details[sessionState.primaryEmotion].displayName;
                await addBotMessage(`Okay, let's check in. On a scale from 0-10, how big is the feeling of <strong>${promptName.toLowerCase()}</strong> now?`);
                sessionState.currentStep = 'post_suds';
                showOptions(createSudsOptions());
            }
            break;
        
        case 'post_suds':
            const previousSuds = sessionState.currentSuds;
            sessionState.currentSuds = parseInt(value, 10);
            const sudsChange = previousSuds - sessionState.currentSuds;

            if (sessionState.path === 'negative') {
                if (sessionState.currentSuds === 0) {
                    await addBotMessage(getRandomResponse('celebrateZeroSuds'));
                    if (sessionState.originalPositiveGoal) {
                        await addBotMessage("Let's return to our original goal.");
                        sessionState.primaryEmotion = sessionState.originalPositiveGoal;
                        sessionState.path = 'positive';
                        const promptName = details[sessionState.primaryEmotion].promptName;
                        await addBotMessage(`Let's focus on building that feeling of <strong>${promptName}</strong>. On a scale of 0-10, how big is that feeling for you right now?`);
                        sessionState.currentStep = 'suds_start';
                        showOptions(createSudsOptions());
                    } else {
                        await addBotMessage("You've done amazing work. The session is complete for today.");
                        sessionState.currentStep = 'end_session';
                    }
                } else {
                    if (sudsChange > 2) await addBotMessage(getRandomResponse('sudsDropSignificant'));
                    else if (sudsChange > 0) await addBotMessage(getRandomResponse('sudsDropSlight'));
                    else await addBotMessage(getRandomResponse('sudsNoChange'));

                    if (sessionState.currentSuds <= 3 && sessionState.originalPositiveGoal) {
                        await addBotMessage("The intensity is much lower now. What feels like the right next step?");
                        showOptions([
                            { text: "Continue clearing this feeling", value: "continue_negative" },
                            { text: `Switch to building ${details[sessionState.originalPositiveGoal].promptName}`, value: "switch_to_positive" }
                        ]);
                        sessionState.currentStep = "ask_to_switch_or_continue";
                    } else {
                        await addBotMessage("You're making progress. What would you like to do?");
                        showOptions([
                            { text: "Do another round", value: "another_round" },
                            { text: "I feel complete for today", value: "end_session" }
                        ]);
                        sessionState.currentStep = "ask_for_next_action";
                    }
                }
            } else { // Positive path
                await addBotMessage(`Great work building that feeling! What's next?`);
                showOptions([
                    { text: "Let's continue to build this feeling.", value: "another_round" },
                    { text: "I feel complete for today", value: "end_session" }
                ]);
                sessionState.currentStep = 'positive_next_action';
            }
            break;
        
        case 'ask_to_switch_or_continue':
            if (value === 'switch_to_positive') {
                await addBotMessage("Excellent. Let's return to our original goal.");
                sessionState.primaryEmotion = sessionState.originalPositiveGoal;
                sessionState.path = 'positive';
                const promptName = details[sessionState.primaryEmotion].promptName;
                await addBotMessage(`Let's focus on building that feeling of <strong>${promptName}</strong>. On a scale of 0-10, how big is that feeling for you right now?`);
                sessionState.currentStep = 'suds_start';
                showOptions(createSudsOptions());
            } else { // continue_negative
                await addBotMessage("Okay, let's keep working on this feeling.");
                runTappingSegment();
            }
            break;

        case 'positive_next_action':
            if (value === 'another_round') {
                sessionState.currentStep = 'choose_pacing_mode';
                await addBotMessage(`How would you like to proceed with the next round?`);
                showOptions([
                    {text: "Manual Pace", value: 'manual'},
                    {text: "Auto Pace", value: 'auto'}
                ]);
            } else { 
                sessionState.currentStep = 'end_session';
                handleUserChoice('continue', 'Continue');
            }
            break;

        case 'end_session':
            await addBotMessage("Great work today! For more emotional flows like Anxiety and Confidence, learn more about the full E.M.O. experience. I'll be here when you need me.");
            sessionState.currentStep = 'final';
            showOptions([{text: "Start Over", value: "restart"}]);
            break;

        case 'final':
            if (value === 'restart') {
                window.dispatchEvent(new CustomEvent('session-restart', { detail: { soft: true } }));
            }
            break;
    }
}
