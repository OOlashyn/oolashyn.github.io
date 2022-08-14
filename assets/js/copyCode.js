const copyCode = async (copyCodeButton) => {
    const code = copyCodeButton.getAttribute("data-code");

    await navigator.clipboard.writeText(code);

    copyCodeButton.classList.add("copied");
    setTimeout(() => {
        copyCodeButton.classList.remove("copied");
    }, 2000);
};

document.querySelectorAll(".copy-code-button").forEach(copyCodeButton => {
    copyCodeButton.addEventListener("click", clickEvent =>
        copyCode(clickEvent.target)
    );
});