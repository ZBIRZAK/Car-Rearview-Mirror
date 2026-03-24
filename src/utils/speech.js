export function supportsSpeech() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function stopSpeech() {
  if (!supportsSpeech()) return;
  window.speechSynthesis.cancel();
}

export function speakFr(text) {
  if (!supportsSpeech() || !text) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-FR';
  utterance.rate = 0.94;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
  return true;
}
