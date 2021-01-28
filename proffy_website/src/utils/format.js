const subjects = [
    "Art",
    "Biology",
    "Science",
    "PE",
    "Phisics",
    "Geography",
    "History",
    "Math",
    "English",
    "Chemistry",
]
const weekdays = [
    "Sunday", 
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]


//functionalities

function getSubject(subjectNumber){
    const position =+ subjectNumber-1 
    return subjects[position]
}

function convertHourToMin(time){
    const [hour, minutes] = time.split(":")
    return Number((hour * 60) + minutes)
}

module.exports = {subjects,weekdays,getSubject,convertHourToMin}