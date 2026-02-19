function runQuiz() {
  const qiq = document.querySelector<HTMLElement>("#questionInitialQuiz");
  if (qiq) {
    qiq.textContent = "Varför är bankID så svårt att använda?";
  }
}

export default { runQuiz };
