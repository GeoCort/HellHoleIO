
const folderDialog = document.getElementById("file_Dialog")
const folderIcon = document.getElementById("create_folder")
folderIcon.addEventListener("click", (e)=>{
    folderDialog.showModal()
})
const inputFile = document.getElementById("file")
const fileText = document.getElementById("fileValue")
inputFile.addEventListener("change", (e)=>{
    let uneditedPath = `${inputFile.value}`
    fileValue.innerText= `${uneditedPath.slice(findEndPath(uneditedPath))}`
    let button = document.getElementById("home-fileUpload")
    button.removeAttribute("disabled")

})
function findEndPath(s){
    let count = 0;
    let lastSlash =0 ;
    for(let i = 0; i < s.length; i ++){
        if(s[i] === "\\"){
            lastSlash= count
        }
        count++
    }
    return lastSlash +1
}