// Inject copy buttons into all code blocks
document.querySelectorAll("pre").forEach(pre => {
    const code = pre.querySelector("code");
    if (!code) return;

    const lang = pre.getAttribute("data-language") || "";
    const rawText = code.textContent || "";

    // Create the code-bar header
    const bar = document.createElement("div");
    bar.className = "code-bar";

    const title = document.createElement("div");
    title.className = "code-title";
    title.textContent = lang;

    const btn = document.createElement("div");
    btn.className = "copy-code-button";
    btn.setAttribute("data-code", rawText);

    bar.appendChild(title);
    bar.appendChild(btn);

    pre.parentNode.insertBefore(bar, pre);

    btn.addEventListener("click", async () => {
        await navigator.clipboard.writeText(btn.getAttribute("data-code"));
        btn.classList.add("copied");
        setTimeout(() => btn.classList.remove("copied"), 2000);
    });
});