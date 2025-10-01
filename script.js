// skills data
const SKILL_NAMES = [
    'React', 'HTML', 'CSS', 'JS', 'Java', 'Python', 'SQL', 'TypeScript', 'Nodejs', 'AWS'
];

// job data
let jobListings = [
    { id: 1, title: 'Senior Frontend Architect', company: 'Google', location: 'Mountain View, CA', tags: ['React', 'JS', 'CSS', 'HTML', 'TypeScript'], role: 'Frontend Developer', experience: 'senior', isApplied: false },
    { id: 2, title: 'Fullstack Engineer II', company: 'Plaid', location: 'Remote (US)', tags: ['Nodejs', 'SQL', 'React', 'AWS'], role: 'Fullstack Developer', experience: 'mid-senior', isApplied: false },
    { id: 3, title: 'Junior Backend Developer (Java)', company: 'LocalBank Corp.', location: 'Dallas, TX', tags: ['Java', 'SQL'], role: 'Backend Developer', experience: 'junior', isApplied: false },
    { id: 4, title: 'UI/UX Prototyper', company: 'Apple', location: 'Cupertino, CA', tags: ['HTML', 'CSS', 'JS'], role: 'UX Designer', experience: 'senior', isApplied: false },
    { id: 5, title: 'Full-Time Student Internship', company: 'Startup X', location: 'Austin, TX', tags: ['Python'], role: 'Backend Developer', experience: 'entry', isApplied: false },
    { id: 6, title: 'ML Research Scientist', company: 'NVIDIA', location: 'Santa Clara, CA', tags: ['Python', 'AWS'], role: 'Machine Learning Engineer', experience: 'senior', isApplied: false },
    { id: 7, title: 'React Developer, Contractor', company: 'Acme Agency', location: 'New York, NY', tags: ['React', 'JS', 'HTML', 'CSS'], role: 'Frontend Developer', experience: 'mid', isApplied: false },
    { id: 8, title: 'Data Warehouse Specialist', company: 'Netflix', location: 'Los Gatos, CA', tags: ['Python', 'SQL'], role: 'Data Scientist', experience: 'mid-senior', isApplied: false },
    { id: 9, title: 'Senior Node.js Developer', company: 'Meta', location: 'Menlo Park, CA', tags: ['Nodejs', 'TypeScript', 'SQL'], role: 'Fullstack Developer', experience: 'mid-senior', isApplied: false },
    { id: 10, title: 'Cloud Data Architect', company: 'Salesforce', location: 'San Francisco, CA', tags: ['SQL', 'AWS'], role: 'Cloud Architect', experience: 'senior', isApplied: false },
    { id: 11, title: 'Entry Level SpringBoot Engineer', company: 'HubSpot', location: 'Cambridge, MA', tags: ['Java', 'JS'], role: 'Backend Developer', experience: 'entry', isApplied: false },
    { id: 12, title: 'Mobile UI/UX', company: 'Snap', location: 'Santa Monica, CA', tags: ['CSS', 'HTML', 'JS'], role: 'Mobile Developer', experience: 'junior', isApplied: false },
    { id: 13, title: 'DevOps Automation Specialist', company: 'Slack', location: 'Remote (EU)', tags: ['Python', 'AWS'], role: 'DevOps Engineer', experience: 'mid', isApplied: false },
    { id: 14, title: 'Senior Web Designer', company: 'Airbnb', location: 'San Francisco, CA', tags: ['HTML', 'CSS', 'JS'], role: 'UX Designer', experience: 'mid-senior', isApplied: false },
    { id: 15, title: 'SQL Data Analyst', company: 'Spotify', location: 'New York, NY', tags: ['SQL', 'Python'], role: 'Data Scientist', experience: 'entry', isApplied: false },
    { id: 16, title: 'Cloud Security Analyst', company: 'Cloudflare', location: 'Remote', tags: ['Python', 'AWS'], role: 'DevOps Engineer', experience: 'mid-senior', isApplied: false },
];

const jobBoardDisplay = document.getElementById('jobBoardDisplay');
const roleFilterSelect = document.getElementById('role-filter');
const locationInput = document.getElementById('location-filter');
const experienceSelect = document.getElementById('experience-filter');
const techChipsContainer = document.getElementById('tech-stack-chips');

let currentFilters = {
    techStack: [], 
};

// render job cards
function renderJobCard(job) {
    const tags = job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join(' ');
    
    let displayExperience;
    switch (job.experience) {
        case 'entry': displayExperience = 'Entry/Internship (0-1 yr)'; break;
        case 'junior': displayExperience = 'Junior (1-2 years)'; break;
        case 'mid': displayExperience = 'Mid-Level (2-4 years)'; break;
        case 'mid-senior': displayExperience = 'Mid-Senior (4-6 years)'; break;
        case 'senior': displayExperience = 'Senior/Lead (7+ years)'; break;
        default: displayExperience = 'Unknown Level';
    }
    
    let buttonClass = 'btn-apply available'; 
    let buttonText = 'Apply Now';
    let buttonAction = `onclick="markAsApplied(${job.id}, this)"`;
    let buttonDisabled = '';

    if (job.isApplied) {
        buttonClass = 'btn-apply applied';
        buttonText = 'Applied';
        buttonAction = 'disabled'; 
        buttonDisabled = 'disabled';
    }

    return `
        <div class="job-card">
            <div>
                <h3 class="job-title">${job.title}</h3>
                <p class="job-meta">${job.company} • ${job.location}</p>
                <p class="job-role-exp">${job.role} • ${displayExperience}</p>
                <div class="job-tags-container">
                    ${tags}
                </div>
            </div>
            <button ${buttonDisabled} ${buttonAction} class="${buttonClass}">
                ${buttonText}
            </button>
        </div>
    `;
}

// apply logic
function markAsApplied(jobId, buttonElement) {
    let job = jobListings.find(j => j.id === jobId);
    if (job) {
        job.isApplied = true;
    }

    buttonElement.textContent = "Applied";
    buttonElement.classList.remove('available'); 
    buttonElement.classList.add('applied');
    buttonElement.disabled = true;
}

// filtering jobs
function filterJobs() {
    const selectedRole = roleFilterSelect.value; 
    const selectedLocation = locationInput.value;
    const selectedExperience = experienceSelect.value;
    
    jobBoardDisplay.innerHTML = '';
    
    let matchingJobs = jobListings.filter(job => {
        let matchesRole = selectedRole === 'all' || job.role === selectedRole;
        let matchesLocation = selectedLocation.trim() === '' || job.location.toLowerCase().includes(selectedLocation.toLowerCase());
        let matchesExperience = selectedExperience === 'all' || job.experience === selectedExperience;
        
        const matchesTechStack = currentFilters.techStack.length === 0 || 
                                 currentFilters.techStack.every(tag => job.tags.includes(tag));

        return matchesRole && matchesLocation && matchesExperience && matchesTechStack;
    });
    
    if (matchingJobs.length === 0) {
        jobBoardDisplay.innerHTML = `<p class="text-center col-span-full text-gray-500 py-16">No jobs found matching your filters. Try adjusting them!</p>`;
    } else {
        matchingJobs.forEach(job => {
            jobBoardDisplay.innerHTML += renderJobCard(job);
        });
    }
}

function initTechChips() {
    techChipsContainer.innerHTML = ""; 
    
    for (const tag of SKILL_NAMES) { 
        let tagElement = document.createElement('span');
        tagElement.textContent = tag;
        tagElement.classList.add('tech-chip');
        
        tagElement.addEventListener('click', () => {
            tagElement.classList.toggle('active-tag'); 
            const index = currentFilters.techStack.indexOf(tag);
            
            if (index === -1) {
                currentFilters.techStack.push(tag); 
            } else {
                currentFilters.techStack.splice(index, 1);
            }
            
            filterJobs(); // filter
        });
        techChipsContainer.appendChild(tagElement);
    }
}

// start-up
document.addEventListener('DOMContentLoaded', () => {
    initTechChips();
    
    roleFilterSelect.addEventListener('change', filterJobs);
    locationInput.addEventListener('input', filterJobs);
    experienceSelect.addEventListener('change', filterJobs);

    filterJobs();
});