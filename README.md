This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) - a conversion of my [Quizlet-Plus](https://github.com/tmchuynh/Quizlet-Plus) project into a Next.js project. It's a web-based quiz application designed to offer a variety of quizzes across multiple subjects, including Chemistry, History, Math, and more. The application supports user registration, tracks progress, and allows users to select quizzes based on

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Roadmap](#roadmap)
- [License](#license)

## Features

**User Registration and Login:**

- Users register with first name, last name, email, username, and password. Users are shown a checklist of password requirements during registration and password reset, with real-time indicators for compliance (e.g., minimum length, inclusion of uppercase letters, etc.). Requirements are updated dynamically as users type, providing immediate feedback on password strength.
- Users can initiate a password reset process through a "Forgot Password?" link on the login page. This is mocked by using cookies instead of sending POST requests to the user's email address.
- Upon accessing the confirmation code, users can enter a new password, which is validated against the established password requirements.
- Users are notified of successful password changes, allowing them to log in with their new credentials immediately.

**User Profile Management:**

- Users will have dedicated profiles containing their username, email, and password, with the ability to update any information.
- A selection of default profile photos will be available for users to choose from, enhancing personalization.
- Profile management will ensure that users can maintain their account details easily.

**Quiz Functionality:**

- Users can take quizzes consisting of a series of questions tailored to different subjects and difficulty levels.
- Questions are dynamically loaded based on the selected quiz and user progress.
- Progress is visually represented through a progress bar, allowing users to track their completion status.
- The application saves quiz progress in `localStorage`, allowing users to easily resume quizzes where they left off without losing their current state.
- Users have the option to retry quizzes, which resets their current question index and score for a new attempt.
- Users receive confirmation prompts for critical actions, such as resetting scores or changing passwords, helping to prevent accidental changes.

**Score Tracking:**

- Scores are calculated at the end of each quiz and displayed alongside the total number of questions answered. Each quiz level button will display the user’s highest score, providing quick access to performance metrics. Users can easily see their best achievements at a glance, encouraging them to improve.
- Scores are stored in `localStorage` for persistence across sessions, ensuring users can revisit their achievements.
- Users can view a history of their past scores, including individual score details, total questions, and timestamps for reference.
- Users have the ability to sort their past scores by date or score, providing flexibility in how they view their performance.
- A reset functionality allows users to clear their past scores, giving them a fresh start whenever desired.

**Leaderboard:**

- A leaderboard feature displays the top scores achieved by users, fostering a sense of competition and motivation.
- Users can view their ranking based on scores across quizzes, along with the total number of quizzes taken.
- The leaderboard updates dynamically as users complete quizzes, showcasing the highest scores and their respective usernames.
- The application will include a consistent header and footer throughout the interface for improved navigation.
- The header will feature quick links to different sections of the app, while the footer will contain copyright information and additional resources.

**Responsive UI:**

- The application is designed with a flexible and responsive layout, ensuring a seamless experience across devices and screen sizes.
- Clear error messages and visual indicators provide immediate feedback for form validation, enhancing usability.

**Accessibility Features:**

- Input fields are highlighted with error indicators when validation fails, helping users identify issues easily.
- User-friendly messages are displayed for success or error states, ensuring clarity in communication.

**Data Management:**

- Users login information is stored in a MySQL database and Sequelize is used to retrieve users information as well as quizzes, scores, progress and other information.
- Next-Auth is used to help with the authentication process of users' information as they login and register.

## Technologies Used

- **Frontend**:

  - HTML
  - CSS (Tailwind CSS)
  - TypeScript
  - JavaScript
  - Local Storage / Session Storage / Cookies for data management

- **Backend**:
  - TypeScript
  - JavaScript
  - Local Storage / Session Storage / Cookies
  - SQL

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Roadmap

**Flashcards Feature:**

- Users will have the ability to create and utilize flashcards to study content derived from quizzes.
- Options will include studying the entire subject, specific difficulty levels, or a custom selection of questions.
- A user-friendly interface will allow users to select questions from a list, facilitating focused study sessions.

**Gamification Elements:**

- Introduce badges to encourage users.
- Users can earn rewards for completing quizzes and studying consistently.

**Testing Feature:**

- A new testing functionality will be implemented, allowing users to answer written and true/false questions.
- Upon completing a test, users will be presented with a chart visualizing their performance, displaying the number of correct and incorrect responses.
- Detailed feedback will be provided for each question answered, indicating whether the user’s choice was correct or incorrect. If incorrect, the correct answer will be highlighted for learning purposes.

**Progress Tracking and Analytics:**

- Users will receive insights into their study habits, including time spent on each subject, accuracy rates, and areas needing improvement.
- Visual graphs and charts will represent progress over time, motivating users to stay engaged.

**Audio and Visual Learning:**

- Users can add audio pronunciations or visual images to their flashcards, enhancing multi-sensory learning.
- This feature will be particularly useful for language learning or subjects requiring visual aids.

## License

This project is licensed under the MIT License

### MIT License

MIT License

Copyright (c) [2024] [Tina Huynh]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

1. The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
2. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
