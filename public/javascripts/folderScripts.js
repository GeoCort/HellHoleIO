let uploadButton = document.getElementById("folderSubmitButton")
document.getElementById("file").addEventListener("change",(e)=>{
    let uneditedPath = `${inputFile.value}`
    fileValue.innerText= `${uneditedPath.slice(findEndPath(uneditedPath))}`
    uploadButton.removeAttribute("disabled")
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