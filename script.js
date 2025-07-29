


const noteDialog=document.getElementById("noteDialog")
const noteTitle=document.getElementById("noteTitle")
const noteContent=document.getElementById("noteContent")
const notesContainer=document.getElementById("notesContainer")
const themeToggleBtn=document.getElementById("themeToggleBtn")

let notes=[]
let editing=null

function openNoteDialog(noteId=null){
  if(noteId){
  editing=noteId
  document.getElementById("dialogTitle").textContent='Edit Note'
  const editNote=notes.find(note=>noteId==note.Id)
  noteTitle.value=editNote.title
  noteContent.value=editNote.content
  }else{
  document.getElementById("dialogTitle").textContent='Add Note'
  noteTitle.value=''
  noteContent.value=''
  }
  noteDialog.showModal()
  noteTitle.focus()
    
}




function closeNoteDialog(){
    noteTitle.value=''
    noteContent.value=''
    noteDialog.close()
   

}

function savenote(event){
  event.preventDefault()

  const title=noteTitle.value.trim()
  const Content=noteContent.value.trim()

  if(editing){
    const editNoteIndex=notes.findIndex(note=>editing==note.Id)
    notes[editNoteIndex]={
      ...notes[editNoteIndex],
      title:title,
      content:Content
    }
    
  }else{
    editing=null
    notes.unshift({
      Id:Date.now(),
      title:title,
      content:Content
    })
  }


  noteTitle.value=''
  noteContent.value=''
  renderNotes()
  closeNoteDialog()
  saveNotes()
  console.log(notes);
  

  
}

function renderNotes(){
  if(notes.length===0){
    notesContainer.innerHTML=`
      <div class="empty-state">
        <h2>No notes yet</h2>
        <p>Create your first note to get started!</p>
        <button class="add-note-btn" onclick="openNoteDialog()">+ Add Your First Note</button>
      </div>`
      return

  }

       notesContainer.innerHTML=notes.map(note=>{
       return`<div class="note-card">
      <h3 class="note-title">${note.title}</h3>
      <p class="note-content">${note.content}</p>
      <div class="note-actions">
        <button class="edit-btn" onclick="openNoteDialog('${note.Id}')" title="Edit Note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>
        <button class="delete-btn" onclick="deleteNote('${note.Id}')" title="Delete Note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/>
          </svg>
        </button>
      </div>

    </div>`


  }).join('')    
  


}




function deleteNote(noteId){

  
  notes=notes.filter(note=>{
    return noteId!=note.Id
})
  saveNotes()
  renderNotes()
  
}


function toggleTheme(){
   
  const isDark= document.body.classList.toggle("dark-theme")
  localStorage.setItem("theme",isDark?'dark':'light')
  themeToggleBtn.textContent=isDark?'☀️':'🌙'


}

function saveNotes(){
  localStorage.setItem("notes",JSON.stringify(notes))
}

function getNotes(){
const savedNotes= localStorage.getItem("notes")
return savedNotes ? JSON.parse(savedNotes):[]
}

function getTheme(){
 if(localStorage.getItem("theme")=='dark') {
  themeToggleBtn.textContent='☀️'
  document.body.classList.add('dark-theme')
 }
  
}



document.addEventListener("DOMContentLoaded",()=>{
notes=getNotes()
renderNotes()
getTheme()
document.getElementById("noteForm").addEventListener("submit",savenote)

document.getElementById("themeToggleBtn").addEventListener("click",toggleTheme)



 
  
})

