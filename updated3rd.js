// script.js

document.addEventListener('DOMContentLoaded', () => {
    const habitsList = document.getElementById('habitsList');
    const addHabitBtn = document.getElementById('addHabitBtn');
    const newHabitInput = document.getElementById('newHabitInput');
    let habitIdCounter = 6; // Start counter after the 5 pre-made habits

    // --- Core Habit Item HTML Template Function ---
    const createHabitHTML = (id, name) => { /* mo add ug lain nga exercise dre ang function nga naa na daan ang format*/
        return `
            <div class="habit-item" data-habit-id="${id}">
                <div class="habit-info">
                    <h3 class="habit-name">${name}</h3>
                    <div class="streak-counter">
                        <span class="fire-emoji">🔥</span>
                        <span class="streak-count">0</span>
                    </div>
                    <button class="remove-button delete-btn" aria-label="Delete habit">Delete</button>
                </div>
                <div class="habit-tracking">
                    <div class="day-buttons">
                        <button class="day-btn" data-day="S">S</button>
                        <button class="day-btn" data-day="M">M</button>
                        <button class="day-btn" data-day="T">T</button>
                        <button class="day-btn" data-day="W">W</button>
                        <button class="day-btn" data-day="T">T</button>
                        <button class="day-btn" data-day="F">F</button>
                        <button class="day-btn" data-day="S">S</button>
                    </div>
                    <div class="progress-section">
                        <div class="progress-bar-container">
                            <div class="progress-bar" style="width: 0%;"></div>
                        </div>
                        <span class="progress-percentage">0%</span>
                    </div>
                </div>
            </div>
        `;
    };

    // 1. Add Habit Functionality
    addHabitBtn.addEventListener('click', () => { // dre ang mo add ug habit 
        const habitName = newHabitInput.value.trim();
        if (habitName) {
            const newHabitHTML = createHabitHTML(habitIdCounter, habitName);
            habitsList.insertAdjacentHTML('beforeend', newHabitHTML);
            habitIdCounter++;
            newHabitInput.value = ''; // Clear the input field
        } else {
            alert("Please enter a name for your new habit.");
        }
    });

    // 2. Event Delegation for Remove and Day Toggle
    habitsList.addEventListener('click', (e) => {// notification nga sure ba nga mag delete ug button
        // Handle Delete Button
        if (e.target.classList.contains('delete-btn')) {
            const habitItem = e.target.closest('.habit-item');
            if (confirm(`Are you sure you want to remove the habit: "${habitItem.querySelector('.habit-name').textContent}"?`)) {
                habitItem.remove();
            }
        }

        // Handle Day Button Toggle // FUNCTION PARA MO CLICK ANG MGA DAYS
        if (e.target.classList.contains('day-btn')) {
            const dayButton = e.target;
            dayButton.classList.toggle('done');
            updateProgress(dayButton.closest('.habit-item'));
        }
    });

    // --- Progress and Streak Update Function ---
    const updateProgress = (habitItem) => {
        const dayButtons = habitItem.querySelectorAll('.day-btn');
        let daysDone = 0;
        const totalDays = dayButtons.length;

        dayButtons.forEach(btn => {
            if (btn.classList.contains('done')) {
                daysDone++;
            }
        });

        const progressPercent = (daysDone / totalDays) * 100;
        const progressBar = habitItem.querySelector('.progress-bar');
        const progressPercentageSpan = habitItem.querySelector('.progress-percentage');
        
        // Update Progress Visuals
        progressBar.style.width = `${progressPercent.toFixed(0)}%`;
        progressPercentageSpan.textContent = `${progressPercent.toFixed(0)}%`;
        
        // Placeholder for Streak: In a simple tracker, we use daysDone as a placeholder for the streak count
        habitItem.querySelector('.streak-count').textContent = daysDone;
    };

    // Initialize progress for all pre-made habits on load
    document.querySelectorAll('.habit-item').forEach(updateProgress);
});