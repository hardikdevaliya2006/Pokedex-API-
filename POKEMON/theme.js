let themeDark = document.querySelector(".darkTheme")
let themeLight = document.querySelector(".lightTheme")
let body = document.body

function handleDark() {
    themeDark.classList.toggle("active")
    themeLight.classList.toggle("active")
    body.classList.toggle("dark-mode")
}
