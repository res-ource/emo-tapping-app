// js/content.js

// NEW, ROBUST PHRASE BANK FOR PERSONALITY
export const phraseBank = {
    sudsDropSignificant: [
        "Amazing! That’s a big shift. My human would be so proud of the progress you’re making.",
        "Wow, look that progress! Seeing a number drop like that is where the real magic happens.",
        "That's a wonderful result! You've really moved that feeling. Let's keep this momentum going!"
    ],
    sudsDropSlight: [
        "Nice! Even small changes are steps in the right direction. Progress, no matter how small, is still progress.",
        "Good, a small shift is exactly what we want to see. That means you're connecting with it.",
        "Alright, progress! Every little step down is a win. You're doing great just by showing up for yourself."
    ],
    sudsNoChange: [
        "That’s okay! Sometimes these feelings are stubborn. My human always says that means we're getting closer to the real issue.",
        "No worries at all. It's perfectly normal for a feeling not to shift on the first round.",
        "Okay, thanks for checking in. Sometimes the first round just helps bring the feeling to the surface."
    ],
    celebrateZeroSuds: [
        "A zero! Fantastic. You've cleared that feeling completely. Great work!",
        "Perfect! A zero. My human would be so excited to see that. You did it!"
    ]
};

// --- DYNAMIC ROUND GENERATION LOGIC ---
export const negativeRoundThemeMap = {
    1: "Raw Experience", 2: "Validating Truth", 3: "Justification & Defense", 4: "Resigned Acceptance",
    5: "Softened Curiosity", 6: "Underlying Layers", 7: "Emerging Possibilities", 8: "Small Shifts",
    9: "New Perspective", 10: "Self-Compassion"
};

export const positiveRoundThemeMap = {
     1: "Opening to Gratitude", 2: "Appreciating the Small Things", 3: "Expanding the Feeling", 4: "Connecting to a Bigger Picture",
     5: "Embodying Gratitude", 6: "Anchoring the Gratitude"
};

// CORE EMOTIONAL LOGIC AND CONTENT
export const emoLogic = {
    negative: {
        prompt: "Got it! We all have those days. Which of these feels closest to what you're experiencing?",
        options: { stress: "Stress or Overwhelm", stuck: "Feeling Stuck or Sluggish", anxious: "Anxiety or Worry" }
    },
    positive: {
        prompt: "Wonderful! Let’s build on that good energy. Which of these are you focusing on right now?",
        options: { gratitude: "Feeling grateful and appreciative", confidence: "Strengthening confidence and self-belief", joy: "Finding more joy and ease" }
    },
    emotionDetails: {
        stress: {
            id: "stress",
            displayName: "Stress or Overwhelm",
            promptName: "stress or overwhelm",
            initialPrompt: "Stress can feel like the weight of the world on your shoulders. Let’s take a moment to slow it all down.",
            setupStatements: [
                "Even though I feel all this stress and overwhelm, I deeply and completely accept myself.",
                "Even though there's so much pressure, I give myself permission to breathe.",
                "Even though I don’t feel calm yet, I honor my efforts to find peace."
            ],
            phraseBank_negative: [
                { text: "This stress", theme: "Raw Experience" }, { text: "This feeling of overwhelm", theme: "Raw Experience" },
                { text: "All this tension", theme: "Raw Experience" }, { text: "My mind is so busy", theme: "Raw Experience" },
                { text: "This is what’s real right now", theme: "Validating Truth" }, { text: "And of course I feel this way", theme: "Validating Truth" },
                { text: "There's a good reason I'm stressed", theme: "Justification & Defense" }, { text: "I have to feel this way", theme: "Justification & Defense" },
                { text: "I don't think this will ever end", theme: "Resigned Acceptance" }, { text: "Part of me is so tired of this", theme: "Resigned Acceptance" },
                { text: "I wonder what's under this stress", theme: "Softened Curiosity" }, { text: "What if there's more to it?", theme: "Softened Curiosity" },
                { text: "Maybe it's really sadness", theme: "Underlying Layers" }, { text: "Maybe it's really fear", theme: "Underlying Layers" },
                { text: "It doesn't have to be this heavy", theme: "Emerging Possibilities" }, { text: "What if I could feel a little lighter?", theme: "Emerging Possibilities" },
                { text: "Who am I without this stress?", theme: "Small Shifts" }, { text: "This stress feels like a part of me", theme: "Small Shifts" },
                { text: "I might be ready to let some of it go", theme: "New Perspective" }, { text: "Releasing this need to be stressed", theme: "New Perspective" },
                { text: "What if peace could take its place?", theme: "Self-Compassion" }, { text: "Choosing to feel calm in my body", theme: "Self-Compassion" }
            ],
        },
        stuck: { // LOCKED - BUT NOW FULLY POPULATED FOR GRATITUDE FLOW
            displayName: "Numbness or disconnection",
            promptName: "numbness or disconnection",
              setupStatements: [
                "Even though I feel this numbness, I deeply and completely accept myself.",
                "Even though it's hard to connect with my feelings right now, I honor my system for protecting me.",
                "Even though I feel disconnected, I am open to the possibility of feeling a little more present."
            ],
            phraseBank_negative: [
                { "text": "This feeling of numbness", "theme": "Raw Experience" }, { "text": "This sense of disconnection", "theme": "Raw Experience" },
                { "text": "This feeling of being far away", "theme": "Raw Experience" }, { "text": "All this emptiness inside", "theme": "Raw Experience" },
                { "text": "This quiet fog I'm in", "theme": "Raw Experience" }, { "text": "This feeling of watching my life from a distance", "theme": "Raw Experience" },
                { "text": "This lack of feeling", "theme": "Raw Experience" }, { "text": "This wall between me and my emotions", "theme": "Raw Experience" },
                { "text": "It makes sense that a part of me checked out", "theme": "Validating Truth" }, { "text": "It's okay that I feel this way", "theme": "Validating Truth" },
                { "text": "This numbness has probably been protecting me", "theme": "Validating Truth" }, { "text": "My system might have needed this break", "theme": "Validating Truth" },
                { "text": "My feelings about this are valid, even if I can't feel them", "theme": "Validating Truth" }, { "text": "Of course it's hard to connect right now", "theme": "Validating Truth" },
                { "text": "Allowing myself to be exactly where I am", "theme": "Validating Truth" }, { "text": "This disconnection might have a very good reason to be here", "theme": "Validating Truth" },
                { "text": "Maybe this numbness is a form of self-care", "theme": "Justification & Defense" }, { "text": "Could a part of me feel that it's safer to not feel?", "theme": "Justification & Defense" },
                { "text": "It’s possible this was the only way to get through it", "theme": "Justification & Defense" }, { "text": "Maybe feeling everything at once was just too much", "theme": "Justification & Defense" },
                { "text": "What if this numbness is a very clever survival skill?", "theme": "Justification & Defense" }, { "text": "I wonder if this wall is protecting something very tender", "theme": "Justification & Defense" },
                { "text": "Could this be how I keep myself from getting overwhelmed?", "theme": "Justification & Defense" }, { "text": "Maybe I needed this distance to stay functional", "theme": "Justification & Defense" },
                { "text": "Maybe I'll be stuck in this fog forever", "theme": "Resigned Acceptance" }, { "text": "I wonder if I'll ever feel things normally again", "theme": "Resigned Acceptance" },
                { "text": "It feels like connection is impossible from here", "theme": "Resigned Acceptance" }, { "text": "Maybe this is just my reality now", "theme": "Resigned Acceptance" },
                { "text": "It’s possible a part of me has forgotten how to feel", "theme": "Resigned Acceptance" }, { "text": "What’s the point in trying to break through this wall?", "theme": "Resigned Acceptance" },
                { "text": "I guess I'm just disconnected", "theme": "Resigned Acceptance" }, { "text": "Maybe I’m too tired to even try to connect", "theme": "Resigned Acceptance" },
                { "text": "I wonder what it would feel like to thaw, just a little", "theme": "Softened Curiosity" }, { "text": "Is it possible to feel safe and connected at the same time?", "theme": "Softened Curiosity" },
                { "text": "What if there are feelings waiting for me under this blanket of numb?", "theme": "Softened Curiosity" }, { "text": "Maybe there's a tiny flicker of something under the surface", "theme": "Softened Curiosity" },
                { "text": "I'm curious about what my heart might want to say", "theme": "Softened Curiosity" }, { "text": "What if I could just be with this numbness, without judgment?", "theme": "Softened Curiosity" },
                { "text": "Could a part of me be ready for a little more sensation?", "theme": "Softened Curiosity" }, { "text": "I wonder what one degree of connection would feel like", "theme": "Softened Curiosity" },
                { "text": "Could there be enormous grief under this numbness?", "theme": "Underlying Layers" }, { "text": "Maybe a part of me is terrified of the anger it's holding down", "theme": "Underlying Layers" },
                { "text": "What if this is really about a deep-seated fear?", "theme": "Underlying Layers" }, { "text": "I wonder if this is touching on a feeling of being completely overwhelmed", "theme": "Underlying Layers" },
                { "text": "Is it possible I feel profound sadness, and this is how I cope?", "theme": "Underlying Layers" }, { "text": "Could there be shame hiding in this disconnection?", "theme": "Underlying Layers" },
                { "text": "Maybe this numbness is masking a feeling of deep vulnerability", "theme": "Underlying Layers" }, { "text": "What if part of me feels it might shatter if it felt everything?", "theme": "Underlying Layers" },
                { "text": "Maybe it's possible to feel again, safely", "theme": "Emerging Possibilities" }, { "text": "What if a little bit of feeling could come back online?", "theme": "Emerging Possibilities" },
                { "text": "Could there be a safe way to lower this wall, brick by brick?", "theme": "Emerging Possibilities" }, { "text": "I wonder if there’s space for me to reconnect with my body", "theme": "Emerging Possibilities" },
                { "text": "Is it possible that my heart is ready to whisper again?", "theme": "Emerging Possibilities" }, { "text": "What if feeling wasn't a threat anymore?", "theme": "Emerging Possibilities" },
                { "text": "Could it be safe to come back into the room?", "theme": "Emerging Possibilities" }, { "text": "Maybe I’m ready to feel my own aliveness again", "theme": "Emerging Possibilities" },
                { "text": "Maybe this fog has lifted, just an inch", "theme": "Small Shifts" }, { "text": "I think I feel a little more present in my body", "theme": "Small Shifts" },
                { "text": "Could that feeling of distance be shrinking?", "theme": "Small Shifts" }, { "text": "Maybe I don’t feel quite as empty as before", "theme": "Small Shifts" },
                { "text": "I’m noticing the feeling of my breath a little more", "theme": "Small Shifts" }, { "text": "There's still numbness, but maybe there's something else too", "theme": "Small Shifts" },
                { "text": "A part of me might be starting to thaw", "theme": "Small Shifts" }, { "text": "I think my senses are a little sharper now", "theme": "Small Shifts" },
                { "text": "What if this numbness was an act of profound self-preservation?", "theme": "New Perspective" }, { "text": "Could this experience have taught me how to pace myself emotionally?", "theme": "New Perspective" },
                { "text": "Maybe this quiet was a necessary pause for my system", "theme": "New Perspective" }, { "text": "I wonder if I can thank this numbness for protecting me", "theme": "New Perspective" },
                { "text": "Is it possible this helped me survive something unsurvivable?", "theme": "New Perspective" }, { "text": "What if this disconnection showed me how much I truly value connection?", "theme": "New Perspective" },
                { "text": "Could this be a chance to rebuild my relationship with my feelings?", "theme": "New Perspective" }, { "text": "Maybe I’m learning how to feel safely, on my own terms", "theme": "New Perspective" },
                { "text": "Maybe I can be kind to the part of me that needed to shut down", "theme": "Self-Compassion" }, { "text": "Could I offer myself some grace for not being able to feel?", "theme": "Self-Compassion" },
                { "text": "I wonder if it's okay to be gentle with myself as I reconnect", "theme": "Self-Compassion" }, { "text": "What if I don't have to force myself to feel anything I'm not ready for?", "theme": "Self-Compassion" },
                { "text": "Maybe my body and heart knew exactly what they were doing", "theme": "Self-Compassion" }, { "text": "Is it possible I’m doing the best I can with an overloaded system?", "theme": "Self-Compassion" },
                { "text": "What if this doesn’t mean I’m broken, but that I’m resilient?", "theme": "Self-Compassion" }, { "text": "Could I be patient with myself as I find my way back?", "theme": "Self-Compassion" }
            ]
        },
        anxious: { displayName: "Anxiety or Worry" },
        gratitude: { // FREE FLOW
            id: "gratitude",
            type: "positive",
            displayName: "Feeling grateful and appreciative",
            promptName: "gratitude and appreciation",
            initialPrompt: "Gratitude is a beautiful feeling to cultivate. Let's take a moment to gently explore whatever is present for you right now.",
            exploratorySetup: [
                "Even though a part of me may be protecting myself from disappointment, I am open to gently exploring what's here with curiosity.",
                "Even though part of me still feels guarded, I’m choosing to be kind to myself as I create a safe space for gratitude to grow.",
                "Even though I have chosen to invite more gratitude into my life, I honor any part of me that might feel it isn't safe or possible, and I accept myself completely."
            ],
            phrases_exploratory: [
                [
                    { phrase: "Right now, I desire to feel truly grateful" }, 
                    { phrase: "I’m wondering if any part of me feels hesitant to fully welcome appreciation." },
                    { phrase: "Could there be a quiet reason inside me that’s holding back from gratitude?" }, 
                    { phrase: "Maybe a feeling of 'not quite yet'" },
                    { phrase: "And if so, it's okay for it to be here" }, 
                    { phrase: "Choosing to be kind toward any resistance I may find" },
                    { phrase: "Making space for whatever is real for me" }, 
                    { phrase: "It is safe to explore this" }
                ]
            ],
            promptForBlocks: "Let’s check in now. With gentle awareness, does one of these feel close to what might be underneath?",
            blockOptions: [
                {"id": "resentment", "text": "Resentment or frustration"},
                {"id": "disappointment", "text": "Disappointment or letdown"},
                {"id": "stuck", "text": "Numbness or disconnection"},
                {"id": "no_block", "text": "None of these feel quite right"}
            ],
            setupStatements: [ 
                "Even though I’m not fully feeling it yet, I’m open to exploring what gratitude might feel like right now.",
                "Even though something in me might still be holding back, I’d like to make space for even a little appreciation.",
                "Even if I’m not sure I can access gratitude, I’m open to noticing what’s here and allowing the possibility."
            ],
            phraseBank_positive: [
                { "text": "Choosing to open the door to gratitude", "theme": "Opening to Gratitude" },
                { "text": "Just noticing any small spark of good", "theme": "Opening to Gratitude" },
                { "text": "It's safe to let a little warmth in", "theme": "Opening to Gratitude" },
                { "text": "Welcoming a feeling of appreciation", "theme": "Opening to Gratitude" },
                { "text": "Making space for a moment of peace", "theme": "Opening to Gratitude" },
                { "text": "I’m curious about what good is here", "theme": "Opening to Gratitude" },
                { "text": "Allowing my heart to soften just a bit", "theme": "Opening to Gratitude" },
                { "text": "Simply being present with what is", "theme": "Opening to Gratitude" },
                { "text": "Letting go of the need to force it", "theme": "Opening to Gratitude" },
                { "text": "My readiness to feel something good", "theme": "Opening to Gratitude" },
                { "text": "This breath I’m breathing right now", "theme": "Appreciating the Small Things" },
                { "text": "The feeling of my feet on the ground", "theme": "Appreciating the Small Things" },
                { "text": "Grateful for this quiet moment", "theme": "Appreciating the Small Things" },
                { "text": "Appreciating something simple from my day", "theme": "Appreciating the Small Things" },
                { "text": "Remembering a kind word or smile", "theme": "Appreciating the Small Things" },
                { "text": "Thankful for my body, just as it is", "theme": "Appreciating the Small Things" },
                { "text": "Noticing a beautiful color or sound nearby", "theme": "Appreciating the Small Things" },
                { "text": "This simple feeling of being okay right now", "theme": "Appreciating the Small Things" },
                { "text": "The comfort of this chair or bed", "theme": "Appreciating the Small Things" },
                { "text": "A moment of ease in my body", "theme": "Appreciating the Small Things" },
                { "text": "Letting this warmth spread through my chest", "theme": "Expanding the Feeling" },
                { "text": "Allowing this good feeling to get a little bigger", "theme": "Expanding the Feeling" },
                { "text": "Breathing into this appreciation", "theme": "Expanding the Feeling" },
                { "text": "What if this feeling could fill me up?", "theme": "Expanding the Feeling" },
                { "text": "Choosing to magnify this sense of gratitude", "theme": "Expanding the Feeling" },
                { "text": "Letting this peace resonate within me", "theme": "Expanding the Feeling" },
                { "text": "This feeling of my heart opening", "theme": "Expanding the Feeling" },
                { "text": "Welcoming more of this good energy", "theme": "Expanding the Feeling" },
                { "text": "Inviting this feeling into every cell", "theme": "Expanding the Feeling" },
                { "text": "This sensation of inner space opening up", "theme": "Expanding the Feeling" },
                { "text": "Feeling connected to the good in the world", "theme": "Connecting to a Bigger Picture" },
                { "text": "Thankful for the lessons I've learned", "theme": "Connecting to a Bigger Picture" },
                { "text": "Appreciating the strength that got me here", "theme": "Connecting to a Bigger Picture" },
                { "text": "This feeling of being part of something larger", "theme": "Connecting to a Bigger Picture" },
                { "text": "Grateful for the people who have cared for me", "theme": "Connecting to a Bigger Picture" },
                { "text": "Honoring the journey, with all its twists and turns", "theme": "Connecting to a Bigger Picture" },
                { "text": "Trusting that there is good here, and more to come", "theme": "Connecting to a Bigger Picture" },
                { "text": "This feeling of hope in my heart", "theme": "Connecting to a Bigger Picture" },
                { "text": "Recognizing my own resilience", "theme": "Connecting to a Bigger Picture" },
                { "text": "Gratitude for the love I've given and received", "theme": "Connecting to a Bigger Picture" },
                { "text": "This feeling is becoming a part of me", "theme": "Embodying Gratitude" },
                { "text": "I am a person who can feel gratitude", "theme": "Embodying Gratitude" },
                { "text": "Carrying this peace in my posture", "theme": "Embodying Gratitude" },
                { "text": "Seeing the world through kinder eyes", "theme": "Embodying Gratitude" },
                { "text": "Letting this feeling soften my expression", "theme": "Embodying Gratitude" },
                { "text": "This sense of being enough, right now", "theme": "Embodying Gratitude" },
                { "text": "Radiating this gentle, warm energy", "theme": "Embodying Gratitude" },
                { "text": "My actions can flow from this place of peace", "theme": "Embodying Gratitude" },
                { "text": "Choosing to be a source of this good feeling", "theme": "Embodying Gratitude" },
                { "text": "This shift from doing to simply being", "theme": "Embodying Gratitude" },
                { "text": "I am locking in this feeling of peace", "theme": "Anchoring the Gratitude" },
                { "text": "Choosing to carry this warmth with me", "theme": "Anchoring the Gratitude" },
                { "text": "This gratitude is now part of my inner landscape", "theme": "Anchoring the Gratitude" },
                { "text": "I can return to this feeling anytime", "theme": "Anchoring the Gratitude" },
                { "text": "My body remembers this state of appreciation", "theme": "Anchoring the Gratitude" },
                { "text": "Sealing this moment with love for myself", "theme": "Anchoring the Gratitude" },
                { "text": "Anchoring this calm in my heart", "theme": "Anchoring the Gratitude" },
                { "text": "This feeling of gratitude is mine to keep", "theme": "Anchoring the Gratitude" },
                { "text": "Creating an inner sanctuary of appreciation", "theme": "Anchoring the Gratitude" },
                { "text": "This good feeling is now stored within me", "theme": "Anchoring the Gratitude" }
            ]
        },
        confidence: { displayName: "Strengthening confidence" },
        joy: { displayName: "Finding more joy and ease" },
        disappointment: {
            displayName: "Disappointment or letdown", promptName: "disappointment",
            setupStatements: ["Even though I feel this disappointment, I deeply and completely accept myself.", "Even though things didn't work out the way I hoped, I honor my feelings about it.", "Even though this feels heavy, I am open to finding peace."],
            phraseBank_negative: [
                { "text": "This feeling of disappointment", "theme": "Raw Experience" }, { "text": "This heavy feeling in my chest", "theme": "Raw Experience" },
                { "text": "This sense of being let down", "theme": "Raw Experience" }, { "text": "All this sadness I’m carrying", "theme": "Raw Experience" },
                { "text": "This quiet ache of what isn’t", "theme": "Raw Experience" }, { "text": "That sinking feeling", "theme": "Raw Experience" },
                { "text": "This cloud of disappointment", "theme": "Raw Experience" }, { "text": "The weight of this letdown", "theme": "Raw Experience" },
                { "text": "It makes sense that I feel this way", "theme": "Validating Truth" }, { "text": "It's okay to feel disappointed", "theme": "Validating Truth" },
                { "text": "I had hopes, and it's okay to mourn them", "theme": "Validating Truth" }, { "text": "This mattered to me", "theme": "Validating Truth" },
                { "text": "My feelings about this are valid", "theme": "Validating Truth" }, { "text": "Of course this hurts", "theme": "Validating Truth" },
                { "text": "Allowing myself to feel this letdown", "theme": "Validating Truth" }, { "text": "This is a real loss, even if it seems small", "theme": "Validating Truth" },
                { "text": "Maybe this sadness is here for a reason", "theme": "Justification & Defense" }, { "text": "Could a part of me feel like my hopes were dismissed?", "theme": "Justification & Defense" },
                { "text": "It’s possible this is protecting me from hoping again", "theme": "Justification & Defense" }, { "text": "Maybe it’s important to remember what I wanted", "theme": "Justification & Defense" },
                { "text": "What if this disappointment is honoring my original dream?", "theme": "Justification & Defense" }, { "text": "I wonder if this feeling is marking how much it mattered", "theme": "Justification & Defense" },
                { "text": "Could this just be a sign that I have a heart that cares?", "theme": "Justification & Defense" }, { "text": "Maybe I needed to feel this to know what I truly value", "theme": "Justification & Defense" },
                { "text": "Maybe I should have known better than to hope", "theme": "Resigned Acceptance" }, { "text": "I wonder if I’ll always be let down", "theme": "Resigned Acceptance" },
                { "text": "It feels like things never work out the way I want", "theme": "Resigned Acceptance" }, { "text": "Maybe this is just how it is", "theme": "Resigned Acceptance" },
                { "text": "It’s possible a part of me has just given up", "theme": "Resigned Acceptance" }, { "text": "What’s the point in getting my hopes up again?", "theme": "Resigned Acceptance" },
                { "text": "I guess I just have to accept this feeling", "theme": "Resigned Acceptance" }, { "text": "Maybe I’m just tired of being disappointed", "theme": "Resigned Acceptance" },
                { "text": "I wonder what it would feel like to release this weight", "theme": "Softened Curiosity" }, { "text": "Is it possible to hope again, safely?", "theme": "Softened Curiosity" },
                { "text": "What if this feeling has a message for me?", "theme": "Softened Curiosity" }, { "text": "Maybe there's a different path forward", "theme": "Softened Curiosity" },
                { "text": "I'm curious about what's on the other side of this feeling", "theme": "Softened Curiosity" }, { "text": "What if I could honor the wish without holding the hurt?", "theme": "Softened Curiosity" },
                { "text": "Could a part of me be ready to see this differently?", "theme": "Softened Curiosity" }, { "text": "I wonder what a little bit of peace would feel like here", "theme": "Softened Curiosity" },
                { "text": "Could there be some grief under this disappointment?", "theme": "Underlying Layers" }, { "text": "Maybe a part of me feels a little foolish for hoping", "theme": "Underlying Layers" },
                { "text": "What if this is really about a fear of not being worthy?", "theme": "Underlying Layers" }, { "text": "I wonder if this is touching on an older, deeper hurt", "theme": "Underlying Layers" },
                { "text": "Is it possible I feel a sense of loss for what could have been?", "theme": "Underlying Layers" }, { "text": "Could there be loneliness underneath this feeling?", "theme": "Underlying Layers" },
                { "text": "Maybe this disappointment is masking a feeling of helplessness", "theme": "Underlying Layers" }, { "text": "What if part of me feels invisible or unheard?", "theme": "Underlying Layers" },
                { "text": "Maybe it's possible to dream again", "theme": "Emerging Possibilities" }, { "text": "What if a new possibility is waiting to be seen?", "theme": "Emerging Possibilities" },
                { "text": "Could there be a different kind of happy ending to this story?", "theme": "Emerging Possibilities" }, { "text": "I wonder if there’s space for a little hope to return", "theme": "Emerging Possibilities" },
                { "text": "Is it possible that my heart is starting to open again?", "theme": "Emerging Possibilities" }, { "text": "What if this wasn’t the only chance for happiness?", "theme": "Emerging Possibilities" },
                { "text": "Could it be safe to be optimistic again, even just a little?", "theme": "Emerging Possibilities" }, { "text": "Maybe I’m ready to create a new vision", "theme": "Emerging Possibilities" },
                { "text": "Maybe this heavy feeling has lifted, just a little", "theme": "Small Shifts" }, { "text": "I think I feel a bit lighter than before", "theme": "Small Shifts" },
                { "text": "Could that cloud of disappointment be thinning?", "theme": "Small Shifts" }, { "text": "Maybe I don’t feel quite as stuck in the sadness", "theme": "Small Shifts" },
                { "text": "I’m noticing a little more space in my chest", "theme": "Small Shifts" }, { "text": "The memory is still there, but some of the sting is gone", "theme": "Small Shifts" },
                { "text": "A part of me might be beginning to accept it", "theme": "Small Shifts" }, { "text": "I think my breathing is a little deeper now", "theme": "Small Shifts" },
                { "text": "What if this disappointment taught me what I truly want?", "theme": "New Perspective" }, { "text": "Could this experience have clarified my values?", "theme": "New Perspective" },
                { "text": "Maybe this pain is a sign of how much I’m able to care", "theme": "New Perspective" }, { "text": "I wonder if this has made me more compassionate", "theme": "New Perspective" },
                { "text": "Is it possible this prepared me for something better?", "theme": "New Perspective" }, { "text": "What if this redirection is actually a good thing?", "theme": "New Perspective" },
                { "text": "Could this be a chance to find a new, more aligned path?", "theme": "New Perspective" }, { "text": "Maybe I’m seeing my own resilience more clearly now", "theme": "New Perspective" },
                { "text": "Maybe I can be gentle with myself for feeling so let down", "theme": "Self-Compassion" }, { "text": "Could I offer my heart some comfort right now?", "theme": "Self-Compassion" },
                { "text": "I wonder if it's okay to just sit with this sadness for a bit", "theme": "Self-Compassion" }, { "text": "What if I don't have to rush past this feeling?", "theme": "Self-Compassion" },
                { "text": "Maybe my heart needs a little extra kindness today", "theme": "Self-Compassion" }, { "text": "Is it possible I’m doing the best I can with this disappointment?", "theme": "Self-Compassion" },
                { "text": "What if this doesn’t mean I failed, but that I tried?", "theme": "Self-Compassion" }, { "text": "Could I still be whole, even with this ache in my heart?", "theme": "Self-Compassion" }
            ]
        },
        resentment: { // FULLY POPULATED WITH NEW PHRASES
            displayName: "Resentment or frustration", promptName: "resentment",
            setupStatements: ["Even though I feel this resentment, I accept myself.", "Even though this feeling might be connected to frustration, I choose to be kind to myself anyway.", "Even though a part of me might feel this is justified, I'm still open to finding peace."],
            phraseBank_negative: [
                { "text": "Do I feel resentment in my body?", "theme": "Raw Experience" }, { "text": "Is there a hint of stubbornness to this resentment?", "theme": "Raw Experience" },
                { "text": "Is it old resentment? Is it lingering? Or is it new?", "theme": "Raw Experience" }, { "text": "Is it a flash of resentment or is it something that is persistent, long-lasting, or deep-seated?", "theme": "Raw Experience" },
                { "text": "Resentment bubbling up again?", "theme": "Raw Experience" }, { "text": "Could there be a sting of resentment inside?", "theme": "Raw Experience" },
                { "text": "Is there a repeating resentment story?", "theme": "Raw Experience" }, { "text": "Could this be a knot of resentment?", "theme": "Raw Experience" },
                { "text": "Does it make sense that this still lingers?", "theme": "Validating Truth" }, { "text": "It’s likely that part of me had a reason to feel this", "theme": "Validating Truth" },
                { "text": "I’m not just making this up, am I?", "theme": "Validating Truth" }, { "text": "Whether this is old or new, it could still feel very real to a part of me.", "theme": "Validating Truth" },
                { "text": "Maybe this resentment was trying to protect something", "theme": "Validating Truth" }, { "text": "If this still feels so true, maybe I don’t know how to lessen it", "theme": "Validating Truth" },
                { "text": "Did it touch something that mattered?", "theme": "Validating Truth" }, { "text": "I’ allowed to feel this way", "theme": "Validating Truth" },
                { "text": "Maybe this resentment is standing up for something", "theme": "Justification & Defense" }, { "text": "Could a part of me believe I was right to feel this?", "theme": "Justification & Defense" },
                { "text": "I wonder if letting this go would feel like giving in", "theme": "Justification & Defense" }, { "text": "It’s possible this part of me is protecting my dignity", "theme": "Justification & Defense" },
                { "text": "Maybe this feeling helped me hold my ground", "theme": "Justification & Defense" }, { "text": "What if letting go too soon felt unsafe back then?", "theme": "Justification & Defense" },
                { "text": "Could this be the part that remembers what mattered?", "theme": "Justification & Defense" }, { "text": "Maybe this resentment helped me feel powerful when I didn’t", "theme": "Justification & Defense" },
                { "text": "Maybe this resentment is just part of who I am now", "theme": "Resigned Acceptance" }, { "text": "I wonder if this will always be here, no matter what I do", "theme": "Resigned Acceptance" },
                { "text": "It might be too late to change how I feel about this", "theme": "Resigned Acceptance" }, { "text": "Maybe nothing will ever make this right", "theme": "Resigned Acceptance" },
                { "text": "It’s possible I’ve carried this so long, I wouldn’t know who I am without it", "theme": "Resigned Acceptance" }, { "text": "I’ve tried before… maybe this is just how it is", "theme": "Resigned Acceptance" },
                { "text": "Maybe part of me gave up on this ever changing", "theme": "Resigned Acceptance" }, { "text": "Somewhere inside, this might feel like a permanent truth", "theme": "Resigned Acceptance" },
                { "text": "I wonder what it might feel like without all this tension", "theme": "Softened Curiosity" }, { "text": "Could there be a version of me that doesn’t need this wall?", "theme": "Softened Curiosity" },
                { "text": "What if I could hold my truth without holding the charge?", "theme": "Softened Curiosity" }, { "text": "Maybe something softer wants to emerge beneath this", "theme": "Softened Curiosity" },
                { "text": "Is it possible to keep what matters without staying stuck?", "theme": "Softened Curiosity" }, { "text": "I’m curious what might be possible if this eased just a little", "theme": "Softened Curiosity" },
                { "text": "What if this part of me is ready for something new?", "theme": "Softened Curiosity" }, { "text": "Could this resentment be whispering that it’s time?", "theme": "Softened Curiosity" },
                { "text": "Could there be some hurt under all this weight?", "theme": "Underlying Layers" }, { "text": "Maybe a part of me was just feeling small and didn’t know what else to do", "theme": "Underlying Layers" },
                { "text": "What if this resentment is really sadness in disguise?", "theme": "Underlying Layers" }, { "text": "I wonder if this was protecting something tender", "theme": "Underlying Layers" },
                { "text": "Is it possible I felt powerless, and this gave me strength?", "theme": "Underlying Layers" }, { "text": "Could this be guarding a really old disappointment?", "theme": "Underlying Layers" },
                { "text": "Maybe there’s grief underneath this grip", "theme": "Underlying Layers" }, { "text": "What if this wall of resentment is covering up something that once hurt a lot?", "theme": "Underlying Layers" },
                { "text": "Maybe I don’t need to carry this quite so tightly anymore", "theme": "Emerging Possibilities" }, { "text": "What if something lighter is ready to take root?", "theme": "Emerging Possibilities" },
                { "text": "Could there be a version of this story that doesn’t weigh so much?", "theme": "Emerging Possibilities" }, { "text": "I wonder if there’s space for more peace around this", "theme": "Emerging Possibilities" },
                { "text": "Is it possible that part of me is already shifting?", "theme": "Emerging Possibilities" }, { "text": "What if something in me wants to feel more free?", "theme": "Emerging Possibilities" },
                { "text": "Could letting go be safer now than it was back then?", "theme": "Emerging Possibilities" }, { "text": "Maybe I’m more ready than I thought to feel something new", "theme": "Emerging Possibilities" },
                { "text": "Maybe something in me has already softened a little", "theme": "Small Shifts" }, { "text": "I think I feel a little less tight about this than before", "theme": "Small Shifts" },
                { "text": "Could that grip be easing—just a bit?", "theme": "Small Shifts" }, { "text": "Maybe I don’t feel quite as stuck as I did a moment ago", "theme": "Small Shifts" },
                { "text": "I’m noticing a little more room around this", "theme": "Small Shifts" }, { "text": "This still matters… but something feels a little different", "theme": "Small Shifts" },
                { "text": "A part of me might be loosening its grip", "theme": "Small Shifts" }, { "text": "I think I’m starting to breathe a little easier now", "theme": "Small Shifts" },
                { "text": "What if this wasn’t about weakness—but about something that deeply mattered?", "theme": "New Perspective" }, { "text": "Could this resentment be showing me where my boundaries are?", "theme": "New Perspective" },
                { "text": "Maybe this pain means I care more than I thought", "theme": "New Perspective" }, { "text": "I wonder if this experience shaped my strength in ways I didn’t see before", "theme": "New Perspective" },
                { "text": "Is it possible this helped me learn what I won’t tolerate again?", "theme": "New Perspective" }, { "text": "What if this feeling protected something sacred in me?", "theme": "New Perspective" },
                { "text": "Could this be a turning point I didn’t recognize before?", "theme": "New Perspective" }, { "text": "Maybe I’m seeing this through a wiser lens now", "theme": "New Perspective" },
                { "text": "Maybe I deserve kindness, even while I feel this way", "theme": "Self-Compassion" }, { "text": "Could I offer myself some grace for how much this stirred up?", "theme": "Self-Compassion" },
                { "text": "I wonder if it's okay to meet this part of me with gentleness", "theme": "Self-Compassion" }, { "text": "What if I don’t have to be harsh with myself about this?", "theme": "Self-Compassion" },
                { "text": "Maybe I’ve been carrying more than anyone realized", "theme": "Self-Compassion" }, { "text": "Is it possible I’m doing the best I can with what I’ve been through?", "theme": "Self-Compassion" },
                { "text": "What if this doesn’t make me broken — just human?", "theme": "Self-Compassion" }, { "text": "Could I still be lovable, even with this resentment?", "theme": "Self-Compassion" }
            ]
        },
        alternative_exploratory: { // NEW SCRIPT FOR UNCERTAINTY
            setupStatements: [
                "Even though I don’t feel much right now, I’m still here and I’m open to noticing.",
                "Even though part of me might be shut down or disconnected, I accept that with kindness.",
                "Even if there’s a fog over my feelings, I’m just gently showing up with curiosity."
            ],
            tappingScript: [
                { point: "Top of Head", phrase: "Maybe this emptiness is trying to protect me." },
                { point: "Eyebrow", phrase: "There might be something underneath—I don’t have to push it." },
                { point: "Side of Eye", phrase: "Even if it’s just quiet right now, that’s okay." },
                { point: "Under Eye", phrase: "I don’t need to fix anything—just notice." },
                { point: "Under Nose", phrase: "There could be something waiting to be seen." },
                { "point": "Chin", "phrase": "But only if it feels safe to look." },
                { point: "Collarbone", phrase: "I’m open to a gentle shift, or not." },
                { point: "Under Arm", phrase: "Whatever I feel—or don’t—is welcome here." }
            ]
        }
    }
};