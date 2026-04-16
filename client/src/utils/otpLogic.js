import { useRef } from "react";

export function useOtp() {
  const inputRefs = useRef([]);
  function handleInput(e, index) {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && index > 0 && e.target.value.length === 0) {
      inputRefs.current[index - 1].focus();
    }
  }
  function handlePaste(e) {
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    pasteData.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  }

  return { inputRefs, handleInput, handleKeyDown, handlePaste };
}
