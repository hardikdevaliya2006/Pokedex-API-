
const sortWrapper = document.querySelector(".sort")
const search = document.getElementById("searchValue")

sortWrapper.addEventListener("click",handleSortIconOnClick)
search.addEventListener("keyup",handleRemove)

function handleSortIconOnClick(){
    document.querySelector(".sort-warrper").classList.toggle("sort-warrper-open")
}

function handleRemove(){
    const remove = document.getElementById("cross")
    remove.style.display = "block"
    remove.addEventListener("click",() => {
        search.value = ""
        remove.style.display = "none"
    })
}