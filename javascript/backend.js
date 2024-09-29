// Show and hide button 
const toggleBtn = document.querySelector('#aboutMe');
const hiddenText = document.querySelector('#hiddenText');
hiddenText.style.display = 'none';

toggleBtn.addEventListener('click', () => {
    if(hiddenText.style.display === 'none') {
        hiddenText.style.display = 'block';
        toggleBtn.innerHTML = 'Hide';
    }
    else {
        hiddenText.style.display = 'none';
        toggleBtn.innerHTML = 'Find out more';
    }
});

//Slider, courses menu
const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) =>{
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
}

)

// toggle button, book form + backdrop
const bookYourCourse = document.getElementById('bookLesson');
const bookButton = document.querySelector('nav button');
const backdrop = document.getElementById('backdrop');
const cancelBtn = bookYourCourse.querySelector('.btn-cancel');
const userInputs = bookYourCourse.querySelectorAll('input');
const userChoice = bookYourCourse.querySelectorAll('select');
const submitBooking = cancelBtn.previousElementSibling;
const deleteStudentModal = document.getElementById('delete-modal');
const students = [];

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const closeStudentModal = () => {
    bookYourCourse.classList.remove('visible');
};

const showStudentModal = () => {
    bookYourCourse.classList.add('visible');
    toggleBackdrop();
};


const cancelBook = () => {
    closeStudentModal();
    clearUsrInputs();
    toggleBackdrop();
};

const clearUsrInputs = () => {
    for (const usrInput of userInputs) {
        usrInput.value = '';
    }
};

const submitBook = () => {
    const firstNameValue = userInputs[0].value;
    const lastNameValue = userInputs[1].value;
    const emailAddressValue = userInputs[2].value;
    const mobileNumberValue = userInputs[3].value;
    const chosenCourseValue = userChoice.value;

    if(firstNameValue.trim() === '') {
        alert('Please enter a valid first name');
        return;
    }
    else if(lastNameValue.trim() === '') {
        alert('Please enter a valid last name');
        return;
    }
    else if(emailAddressValue.trim() === '') {
        alert('Please enter a valid email address');
        return;
    }
    else if(mobileNumberValue.trim() === '' || isNaN(mobileNumberValue)) {
        alert('Please enter a valid mobile number');
        return;
    }
    
    const newStudent = {
        id: Math.random().toString(),
        firstName: firstNameValue,
        lastName: lastNameValue,
        emailAddress: emailAddressValue,
        mobileNumber: mobileNumberValue,
        chosenCourse: chosenCourseValue
    };
    students.push(newStudent);
    console.log(students);
    closeStudentModal();
    toggleBackdrop();
    clearUsrInputs();
    renderNewStudentInfo(newStudent.id, newStudent.firstName, newStudent.lastName, 
        newStudent.emailAddress, newStudent.mobileNumber, newStudent.chosenCourse);
          
};

const cancelStudentDeletion = () => {
    toggleBackdrop();
    deleteStudentModal.classList.remove('visible');
};

const deleteStudent = (studentId) => {
    let studentIndex = 0;
    for (const student of students) {
        if (student.id === studentId) {
            break;
        }
        studentIndex++;
    }
    students.splice(studentIndex, 1);
    const listRoot = document.getElementById('checkoutCourseInfo');
    listRoot.children[studentIndex].remove();
    cancelStudentDeletion();
};


const deleteStudentHandler = studentId => {
    deleteStudentModal.classList.add('visible');
    toggleBackdrop();
    const cancelDeletionButton = deleteStudentModal.querySelector('.btn-cancel');
    let confirmDeletionButton = deleteStudentModal.querySelector('.btn-danger');
    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
    confirmDeletionButton = deleteStudentModal.querySelector('.btn-danger');
        
    cancelDeletionButton.removeEventListener('click', cancelStudentDeletion);
    cancelDeletionButton.addEventListener('click', cancelStudentDeletion);
    confirmDeletionButton.addEventListener('click', deleteStudent.bind(null, studentId));
};

const renderNewStudentInfo = (id, firstName, lastName, emailAddress, mobileNumber, chosenCourse) => {
    const newStudentElement = document.createElement('li');
    newStudentElement.className = 'newStudentElement';
    newStudentElement.innerHTML = `
        <div class="newStudentElementInfo">
            <p>First Name: ${firstName} <br>
            Last Name: ${lastName} <br>
            Email address: ${emailAddress} <br>
            Mobile number: ${mobileNumber} <br>
            Course: ${chosenCourse}
            </p>
            <button>Submit</button>
        </div>
    `;
    newStudentElement.addEventListener('click', deleteStudentHandler.bind(null, id));
    const listRoot = document.getElementById('checkoutCourseInfo');
    listRoot.append(newStudentElement);
};

const backdropClickHandler = () => {
    closeStudentModal();
    cancelStudentDeletion();
    clearUsrInputs();
};

bookButton.addEventListener('click', showStudentModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelBtn.addEventListener('click', cancelBook);
submitBooking.addEventListener('click', submitBook);