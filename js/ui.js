// js/ui.js
import { handleUserChoice } from './flow.js';

// This object will hold references to the DOM elements, populated by initUI.
const DOMElements = {};

/**
 * Initializes the UI module by providing it with essential DOM element references.
 * @param {object} elements - An object containing the DOM elements.
 */
export function initUI(elements) {
    Object.assign(DOMElements, elements);
}

/**
 * Smoothly scrolls the chat box to the bottom.
 * @param {boolean} [force=false] - If true, scrolls even if the user isn't at the bottom.
 */
export async function scrollToBottom(force = false) {
    if (!DOMElements.chatBox) return;
    const isAtBottom = DOMElements.chatBox.scrollTop + DOMElements.chatBox.clientHeight >= DOMElements.chatBox.scrollHeight - 50;
    if (force || isAtBottom) {
        DOMElements.chatBox.scrollTo({ top: DOMElements.chatBox.scrollHeight, behavior: 'smooth' });
        await new Promise(resolve => setTimeout(resolve, 300));
    }
}

/**
 * Displays the "bot is typing" indicator.
 */
function showThinkingIndicator() {
    if (document.getElementById('thinking-bubble')) return;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble-bot self-start p-4 flex items-center';
    bubble.id = 'thinking-bubble';
    const indicator = document.createElement('div');
    indicator.className = 'dot-flashing';
    bubble.appendChild(indicator);
    DOMElements.chatBox.appendChild(bubble);
    scrollToBottom(true);
}

/**
 * Removes the "bot is typing" indicator.
 */
function removeThinkingIndicator() {
    const indicator = document.getElementById('thinking-bubble');
    if (indicator) indicator.remove();
}

/**
 * Types out a message character by character into a chat bubble, preserving HTML.
 * @param {string} htmlString - The HTML string to type out.
 * @param {HTMLElement} bubbleElement - The chat bubble element to type into.
 */
async function typeOutText(htmlString, bubbleElement) {
    const typingSpeed = 30;
    bubbleElement.innerHTML = ''; // Clear the bubble first

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    async function processNode(node, parentElement) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            for (let i = 0; i < text.length; i++) {
                parentElement.innerHTML += text[i];
                if (DOMElements.chatBox) DOMElements.chatBox.scrollTop = DOMElements.chatBox.scrollHeight;
                await new Promise(resolve => setTimeout(resolve, typingSpeed));
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const newElement = document.createElement(node.tagName);
            for (let i = 0; i < node.attributes.length; i++) {
                const attr = node.attributes[i];
                newElement.setAttribute(attr.name, attr.value);
            }
            parentElement.appendChild(newElement);
            for (const childNode of Array.from(node.childNodes)) {
                await processNode(childNode, newElement);
            }
        }
    }

    for (const childNode of Array.from(tempDiv.childNodes)) {
        await processNode(childNode, bubbleElement);
    }
}

/**
 * Adds a message from the bot to the chat window with a typing animation.
 * @param {string} text - The text or HTML to be displayed.
 */
export async function addBotMessage(text) {
    showThinkingIndicator();
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    removeThinkingIndicator();
    
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble-bot self-start max-w-md p-4 text-sm';
    DOMElements.chatBox.appendChild(bubble);
    await scrollToBottom(true);
    await typeOutText(text, bubble);
}

/**
 * Adds a message from the user to the chat window.
 * @param {string} text - The user's message text.
 */
export function addUserMessage(text) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble-user self-end max-w-xs p-3 text-sm';
    bubble.textContent = text;
    DOMElements.chatBox.appendChild(bubble);
    scrollToBottom(true);
}

/**
 * Displays a set of option buttons for the user to click.
 * @param {Array<object>} options - An array of option objects, each with {text, value}.
 */
export function showOptions(options) {
    if (!DOMElements.optionsContainer) return;
    DOMElements.optionsContainer.style.pointerEvents = 'none';
    DOMElements.optionsContainer.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm';
        button.innerHTML = option.text;
        button.onclick = () => handleUserChoice(option.value, option.text);
        DOMElements.optionsContainer.appendChild(button);
    });
    setTimeout(() => {
        DOMElements.optionsContainer.style.pointerEvents = 'auto';
        scrollToBottom(true);
    }, 100);
}

/**
 * Creates an array of SUDs rating options (0-10).
 * @returns {Array<object>} An array of SUDs options.
 */
export function createSudsOptions() {
    return Array.from({ length: 11 }, (_, i) => ({ text: i.toString(), value: i }));
}

/**
 * Shows or hides the speed slider container.
 * @param {boolean} show - True to show the slider, false to hide it.
 */
export function showSpeedSlider(show) {
    if (!DOMElements.speedSliderContainer) return;
    if (show) {
        DOMElements.speedSliderContainer.classList.remove('hidden');
    } else {
        DOMElements.speedSliderContainer.classList.add('hidden');
    }
}