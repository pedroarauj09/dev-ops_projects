//Search Button
document.querySelector("#add-time")
.addEventListener('click' /*Which event*/, cloneField /*action after the event*/ )

//Execute the event 
function cloneField(){
    //Duplicate camps, Which camp?
     const newField = document.querySelector('.schedule-item').cloneNode(true) //clone the camp schedule-item, and its childs(*true)

    //Erase camps
    const fields = newField.querySelectorAll('input')

    fields.forEach(function(actual) {
        actual.value = ""
    })
     //Put on page, where?
    document.querySelector('#schedule-items').appendChild(newField)

    
}

