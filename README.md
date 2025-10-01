# 🚀 DevJobs - Tech Job Listings Board

A front-end-focused job board application for filtering and browsing tech job listings. This project is built using vanilla JavaScript for core logic and Tailwind CSS for rapid, modern styling.

---

## ✨ Features

* **Dynamic Filtering:** Jobs can be filtered instantly by **Role**, **Experience Level**, **Location** (text search), and **Tech Stack** (multiple selection chips).
* **Interactive UI:** Clicking tech stack chips updates the displayed jobs in real-time.
* **Job Card Display:** Each job is presented in an appealing, responsive card format.
* **Apply Status Tracking:** Users can click "Apply Now" to mark a job as applied, which changes the button's style and disables future clicks for that listing.
* **Responsive Design:** The layout adjusts for different screen sizes, with the filter sidebar collapsing nicely on mobile.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Structure and Semantic Markup |
| **CSS3** | Custom styling for unique elements |
| **Tailwind CSS** | Utility-first framework for rapid, responsive styling (via CDN) |
| **Vanilla JavaScript (ES6+)** | Core filtering, rendering, and event handling logic |
| **Inter Font** | Clean, modern typography |

---

## 📂 Project Structure

The codebase is split into three main files:

| File | Description |
| :--- | :--- |
| `index.html` | Contains the complete structure, including the header, filter sidebar, job board container, and all filter forms. |
| `style.css` | Holds all custom CSS rules, defining the look for the header, filter box, and job cards. |
| `script.js` | Contains the entire application logic, including the job data array, filter functions (`filterJobs`), rendering functions (`renderJobCard`), and event listeners. |

---

## ⚙️ Key JavaScript Logic

The filtering mechanism relies on a single function, `filterJobs()`, which is triggered whenever a filter input changes.

1.  **Data Source:** Jobs are stored in the global `jobListings` array.
2.  **Filter State:** The currently active tech tags are tracked in the `currentFilters.techStack` array.
3.  **Filtering:** `jobListings.filter()` is used to check four conditions simultaneously:
    * `matchesRole`
    * `matchesLocation`
    * `matchesExperience`
    * `matchesTechStack` (uses `.every()` to ensure all selected tags are present in the job's tags).
4.  **Rendering:** The `renderJobCard()` function generates the HTML for successful matches, which is then inserted into the `jobBoardDisplay` container.

---

## 👤 Author

* Ashwin Shankar
