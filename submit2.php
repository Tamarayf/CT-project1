<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $userAnswers = isset($_POST['userAnswers']) ? $_POST['userAnswers'] : [];

    if ($username !== '' && !empty($userAnswers)) {
        // Assuming your questions have numeric indices, and correct answers are known
        $correctAnswers = ["Adding interactivity to web pages", "color", "HyperText Markup Language", "Java applications are platform-independent", "To control how the width and height of an element are calculated", "Git", "To identify and fix bugs in the software", "Algorithm complexity and performance"];

        // Pad the user answers array with default values if necessary
        if (count($userAnswers) < count($correctAnswers)) {
            for ($i = count($userAnswers); $i < count($correctAnswers); $i++) {
                $userAnswers[] = ''; // Use an empty string to indicate an unanswered question
            }
        }

        // Trim user answers
        $userAnswers = array_map('trim', $userAnswers);

        // Calculate the score and percentage
        $score = calculateScore($userAnswers, $correctAnswers);
        $percentage = $score / count($correctAnswers) * 100;

        // Format the response message
        $responseMessage = "Hi $username, Your Score\n";
        $responseMessage .= "$score Out of " . count($correctAnswers) . " questions were correct.\n";
        $responseMessage .= " " . $percentage . "%\n";
        $responseMessage .= "Maybe you should try a little harder.";

        // Echo the formatted response message
        echo $responseMessage;
    } else {
        echo 'Invalid data';
    }
} else {
    echo 'Invalid request method';
}

// Function to calculate the score
function calculateScore($userAnswers, $correctAnswers) {
    $score = 0;

    // Compare each answer with the correct answer, ignoring unanswered questions
    for ($i = 0; $i < count($userAnswers); $i++) {
        if ($userAnswers[$i] !== '') { // Check if the answer is not an unanswered question
            if ($userAnswers[$i] == $correctAnswers[$i]) {
                $score++;
            }
        }
    }

    return $score;
}
?>
