// Select all "Add New" buttons using querySelectorAll to target multiple buttons
const addNewButtons = document.querySelectorAll('.add');
const popupForm = document.getElementById('popupForm');
const closePopup = document.getElementById('closePopup');
let selectedSection; // Variable to store the selected section
let currentTaskCard = null; // Variable to store the currently selected task card for editing

// Loop through each 'Add New' button to add an event listener
addNewButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        popupForm.style.display = 'flex'; // Show the popup
        selectedSection = event.target.closest('.section'); // Identify the section
        currentTaskCard = null; // Clear the current task card on new task creation
    });
});

// Close the popup
closePopup.addEventListener('click', () => {
    popupForm.style.display = 'none'; // Hide the popup
    resetFormFields(); // Reset the form fields when popup is closed
});

// Save or update task and add card to the respective section
document.getElementById('saveTask').addEventListener('click', function(event) {
    event.preventDefault();
    
    // Get the task data from the form
    const taskName = document.getElementById('taskName').value;
    const difficulty = document.getElementById('difficulty').value;
    const deadline = document.getElementById('deadline').value;
    const lastModified = document.getElementById('lastModified').value;
    
    if (taskName === "" || deadline === "") {
        alert("Please fill in all the required fields!");
        return;
    }

    if (currentTaskCard) {
        // Update existing task card
        currentTaskCard.querySelector('h3').textContent = taskName;
        currentTaskCard.querySelector('p:nth-of-type(1)').textContent = `Difficulty: ${difficulty}`;
        currentTaskCard.querySelector('p:nth-of-type(2)').textContent = `Deadline: ${deadline}`;
        currentTaskCard.querySelector('p:nth-of-type(3)').textContent = `Last Modified: ${lastModified}`;
    } else {
        // Create a new task card
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        taskCard.innerHTML = `
            <h3>${taskName}</h3>
            <p><strong>Difficulty:</strong> ${difficulty}</p>
            <p><strong>Deadline:</strong> ${deadline}</p>
            <p><strong>Last Modified:</strong> ${lastModified}</p>
            <div class="task-icons">
                <button class="delete-task"><img src="https://cdn-icons-png.freepik.com/256/4980/4980658.png?semt=ais_hybrid" alt="delete" class="edit-icon"></button>
                <button class="edit-task"><img src="https://cdn-icons-png.flaticon.com/512/1375/1375128.png" alt="edit" class="edit-icon"></button>
            </div>
        `;
        
        // Append the task card to the correct section (the one that was selected)
        if (selectedSection) {
            selectedSection.appendChild(taskCard);
        }
    }

    // Close the popup
    popupForm.style.display = 'none';

    // Reset form fields
    resetFormFields();

    // Show success message
    alert('Task saved successfully!');
});

// Delegate click events for edit and delete icons
document.addEventListener('click', function(event) {
    if (event.target.closest('.delete-task')) {
        // Delete task card
        const taskCard = event.target.closest('.task-card');
        if (taskCard) {
            taskCard.remove();
            alert('Task deleted successfully!');
        }
    } else if (event.target.closest('.edit-task')) {
        // Edit task card
        currentTaskCard = event.target.closest('.task-card');
        if (currentTaskCard) {
            // Populate the form with current task card data
            document.getElementById('taskName').value = currentTaskCard.querySelector('h3').textContent;
            document.getElementById('difficulty').value = currentTaskCard.querySelector('p:nth-of-type(1)').textContent.replace('Difficulty: ', '').toLowerCase();
            document.getElementById('deadline').value = currentTaskCard.querySelector('p:nth-of-type(2)').textContent.replace('Deadline: ', '');
            document.getElementById('lastModified').value = currentTaskCard.querySelector('p:nth-of-type(3)').textContent.replace('Last Modified: ', '');
            popupForm.style.display = 'flex'; // Show the popup for editing
        }
    }
});

// Initialize Sortable for each section
const sections = document.querySelectorAll('.section');

sections.forEach(section => {
    new Sortable(section, {
        group: 'tasks', // Set the group name to allow movement between sections
        animation: 150, // Animation speed in ms
        draggable: '.task-card', // The class of the draggable items
        ghostClass: 'sortable-ghost', // Class applied when dragging over
        onEnd: function (evt) {
            console.log(`Task moved to ${evt.to.id}`);
        }
    });
});

// Helper function to reset form fields after saving or closing the popup
function resetFormFields() {
    document.getElementById('taskName').value = '';
    document.getElementById('difficulty').value = 'easy';
    document.getElementById('deadline').value = '';
    document.getElementById('lastModified').value = '';
}
