# Clean Campus – Smart Waste Reporting Web Application

A responsive campus cleanliness reporting demo. Community members can submit waste observations and view recent reports and a simple participation leaderboard.

## Features
- Demo sign-in using a name and email
- Session state stored in `sessionStorage`
- Submit a waste report with location, category and description
- Basic required-field and length validation
- View recent reports
- Community leaderboard based on submitted report count
- Store demo users and reports in browser `LocalStorage`
- Responsive layout

## Tech stack
HTML5, CSS3, JavaScript (Vanilla), LocalStorage, SessionStorage

## Run locally
1. Download or clone this repository.
2. Open `index.html` in a modern web browser.
3. Enter a name and email to enter the demo.
4. Submit a sample waste report and view it in Recent reports.

No build tools or dependencies are required.

## Project structure
- `index.html` – page structure and forms
- `style.css` – responsive styles
- `script.js` – demo session, validation, reports and leaderboard

## Important security and scope note
This is a front-end academic/demo project. The sign-in is not real authentication: users can enter any name and email. Data is stored in the browser and is not shared across devices. Do not use it for real personal information or operational campus reporting. A production version should use a secure backend, password-based or institutional authentication, server-side validation, access controls and a database.

## Future improvements
- Secure authentication and role-based access
- Backend API and database
- Photo upload and report status tracking
- Admin dashboard for campus staff
- Map view for reported locations
