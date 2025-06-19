// Text scrambling utility for animated text effects

// Array of "hello world" in different languages
const helloWorldTranslations = [
  "hello world", // English
  "hola mundo", // Spanish
  "bonjour le monde", // French
  "ciao mondo", // Italian
  "hallo welt", // German
  "olá mundo", // Portuguese
  "привет мир", // Russian
  "你好世界", // Chinese
  "こんにちは世界", // Japanese
  "안녕하세요 세계", // Korean
  "مرحبا بالعالم", // Arabic
  "नमस्ते दुनिया", // Hindi
  "γειά σου κόσμε", // Greek
  "שלום עולם", // Hebrew
  "hej världen", // Swedish
  "hei maailma", // Finnish
  "witaj świecie", // Polish
  "hej verden", // Danish
  "hallo wereld", // Dutch
  "merhaba dünya", // Turkish
];

// All characters that can be used for scrambling
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

interface ScrambleOptions {
  finalText: string;
  duration?: number;
  scrambleSpeed?: number;
  onUpdate?: (text: string) => void;
  onComplete?: () => void;
}

/**
 * Creates a text scrambling effect that progressively settles characters from left to right
 * @param options Configuration options for the scrambler
 */
export const scrambleText = (options: ScrambleOptions) => {
  const {
    finalText,
    duration = 2000, // Shorter default duration
    scrambleSpeed = 30, // Faster default scramble speed
    onUpdate,
    onComplete
  } = options;

  let startTime: number | null = null;
  let currentText = "hello world";
  let intervalId: number | null = null;

  // Function to get a random character
  const getRandomChar = () => {
    return chars.charAt(Math.floor(Math.random() * chars.length));
  };

  // Function to get a random character from translations
  const getRandomTranslationChar = (position: number) => {
    const randomTranslation = helloWorldTranslations[Math.floor(Math.random() * helloWorldTranslations.length)];
    return position < randomTranslation.length ? randomTranslation[position] : getRandomChar();
  };

  // Start the animation
  const start = () => {
    startTime = Date.now();

    intervalId = window.setInterval(() => {
      const elapsed = Date.now() - (startTime || 0);

      // If we've reached the duration, set the final text and clean up
      if (elapsed >= duration) {
        if (intervalId !== null) {
          clearInterval(intervalId);
          intervalId = null;
        }

        currentText = finalText;
        if (onUpdate) onUpdate(currentText);
        if (onComplete) onComplete();
        return;
      }

      // Calculate how many characters should be settled based on elapsed time
      const progress = elapsed / duration;
      const settledChars = Math.floor(progress * finalText.length);

      // Build the new text with settled and scrambled characters
      let newText = '';
      for (let i = 0; i < finalText.length; i++) {
        if (i < settledChars) {
          // This character is settled, use the final text character
          newText += finalText[i];
        } else {
          // This character is still scrambling, use a random character
          newText += getRandomTranslationChar(i);
        }
      }

      currentText = newText;
      if (onUpdate) onUpdate(currentText);

    }, scrambleSpeed);
  };

  // Function to stop the animation
  const stop = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  return {
    start,
    stop
  };
};

export default scrambleText;
