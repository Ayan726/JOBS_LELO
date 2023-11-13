# Jobs Lelo API

Welcome to the Jobs Lelo API - your solution for managing and retrieving job posts for startups instead of unorganized WhatsApp group job posts. This API provides a set of routes for user registration, login, login with Google, and an admin dashboard for efficient job post management.

## Features

- **User Authentication**: Secure admin registration, login, and login with Google functionality.
- **Admin Dashboard**: An authenticated admin dashboard to post, update, and delete job listings.
- **Automated Cleanup**: A route to automatically delete job posts older than 30 days.
- **Chrome Extension Integration**: Fetch and filter job posts directly from your database and integrate a Chrome extension.
- **Filtering and Sorting**: Filter jobs by salary, years of experience, work location, job type, and more. Sort jobs by date and salary.
- **Search Functionality**: Search for specific jobs by company.

## API Routes

### Admin Authentication

- `POST /api/v1/auth/register`: Register a new user.
- `POST /api/v1/auth/login`: Login with username and password.
- `POST /api/v1/auth/loginwithgoogle`: Login with Google.
- `DELETE /api/v1/auth/logout`: Logout.

### Admin Dashboard

- `GET /api/v1/jobs/myjobs`: Get all the jobs posted by admin.
- `POST /api/v1/jobs/myjobs`: Post a new job listing.
- `DELETE /api/v1/jobs/myjobs`: Delete job posts older than 30 days.
- `GET /api/v1/jobs/myjobs/:id`: Get an existing job listing.
- `PATCH /api/v1/jobs/myjobs/:id`: Update an existing job listing.
- `DELETE /api/v1/jobs/myjobs/:id`: Delete a job listing.

### Chrome Extension Integration

- `GET /api/v1/jobs/alljobs`: Fetch all job posts.
  - Query Parameters:
    - `company`: Search for jobs by company.
    - `sort`: Sort jobs by date or salary.
    - `numericFilters`: Filter jobs by salary or year of experience. example:`numericFilters=salary>=65000,yoe<2`.
    - `location`: Filter jobs by location.
    - `jobtype`: Filter jobs by job type. only accepts full-time, part-time, contract & internship.
    - `workfrom`: Filter jobs by work location. only accepts home or office.
    - `page`: page number of the data.
    - `limit`: number of data per page.

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up your database and configure environment variables as shown in `.env.example` file.
4. Run the server: `npm run dev`.

## Usage

- For admin authentication, use the provided routes for registration, login, and login with Google.
- Admins can manage job listings through the admin dashboard routes.
- The Chrome extension can be developed to fetch and filter job posts using the `/api/v1/jobs/alljobs` route with query parameters.

## Future Enhancements

- Add frontend to complement the API functionality.
- Implement additional filtering options and search features.
- Enhance security measures.

Feel free to contribute to the project and make it even more powerful!
