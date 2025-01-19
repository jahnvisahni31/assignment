# Quiz App

This is a fully functional quiz application built using **Next.js** and **Tailwind CSS**. The application fetches quiz questions from the Open Trivia Database API and provides a seamless user experience with features like navigation, timer, and result reporting.

## Features

1. **Quiz Layout & Flow**:
   - Start page where users submit their email address to begin the quiz.
   - 15 multiple-choice questions fetched from the [Open Trivia Database API](https://opentdb.com/api.php?amount=15).
   - A 30-minute timer that auto-submits the quiz when it reaches zero.

2. **Navigation**:
   - Users can navigate to specific questions.
   - An overview panel showing:
     - Visited questions.
     - Attempted questions.

3. **End of Quiz**:
   - Displays a detailed report page showing:
     - Each question with the user’s answer.
     - Correct answers for comparison.

4. **Responsive Design**:
   - Adapts to different screen sizes for optimal user experience on all devices.

5. **Bonus Features**:
   - Smooth transitions between questions.

## Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **API**: Open Trivia Database
- **State Management**: React State

## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [Visual Studio Code](https://code.visualstudio.com/) or any code editor of your choice.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/jahnvisahni31/assignment
   cd assignment
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Tailwind CSS:

   Tailwind CSS is pre-configured in this project. The configuration is located in `tailwind.config.js` and styles are imported in `styles/globals.css`.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

## Folder Structure

```plaintext
quiz-app/
├── components/       # Reusable UI components (Timer, QuestionCard, Navigation)
├── pages/            # Application pages (index.js, quiz.js, report.js)
├── public/           # Static assets
├── styles/           # Global styles (Tailwind setup in globals.css)
├── tailwind.config.js
├── package.json
└── README.md
```

## Assumptions

- Users are expected to provide an email address to start the quiz.
- Questions fetched from the API are directly used without additional sanitization.

## Challenges Faced

1. **Dynamic Timer:** Ensuring the timer synchronized with the quiz submission logic when the timer expires.
   - Solution: Added state listeners to trigger submission when the timer reaches zero.

2. **API Data Handling:** Randomizing answer choices while retaining correct answers for evaluation.
   - Solution: Used `Array.sort` with a random comparator and carefully mapped the correct answer.

## Future Improvements

- Add user authentication for email validation.
- Allow users to restart the quiz without reloading the page.
- Enhance the UI with animations for a smoother experience.

## Deployment

This application is hosted on **Vercel** for easy access. Visit the live demo [here](#).

## Author

[Jahnvi sahni](https://github.com/jahnvisahni31)
