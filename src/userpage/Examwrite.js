import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

const Examwrite = ({ route, navigation }) => {
  const { exam } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [results, setResults] = useState([]);

  const currentQuestion = exam.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === exam.questions.length - 1;

  const handleNext = () => {
    // Compare the selected option value with the correct answer and save the result
    const result = {
      question: currentQuestion.question,
      selectedOption: selectedOption,
      correctOption: currentQuestion.correct,
      isCorrect: selectedOption === currentQuestion.correct,
    };
    setResults([...results, result]);

    // Reset selected option when moving to the next question
    setSelectedOption(null);

    if (isLastQuestion) {
      // Calculate the score and display the result
      const correctAnswers = results.filter(
        (result) => result.isCorrect
      ).length;
      const totalQuestions = results.length + 1;
      const score = (correctAnswers / totalQuestions) * 100;
      Alert.alert(
        "Exam Result",
        `You answered ${correctAnswers} out of ${totalQuestions} questions correctly.\nYour score: ${score.toFixed(
          2
        )}%`,
        [{ text: "OK", onPress: () => handleResultDismissed() }],
        { cancelable: false }
      );
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    // Reset selected option when moving to the previous question
    setSelectedOption(
      results[currentQuestionIndex - 1]?.selectedOption || null
    );
    setResults(results.slice(0, currentQuestionIndex - 1));
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option.value);
  };

  const handleResultDismissed = () => {
    // Reset state and navigate back to the previous page
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setResults([]);
    navigation.goBack();
  };

  useEffect(() => {
    // Listen for changes in navigation state and reset state when navigating away from the screen
    const unsubscribe = navigation.addListener("blur", () => {
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setResults([]);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.examName}>{exam.examname}</Text>
        <Text style={styles.duration}>Duration: {exam.duration} minutes</Text>
      </View>
      <ScrollView>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{currentQuestion.question}</Text>
        </View>
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedOption === option.value && {
                  backgroundColor: "#28a745",
                }, // Change background color if option is selected
              ]}
              onPress={() => handleOptionSelect(option)}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.previousButton,
            {
              backgroundColor: currentQuestionIndex === 0 ? "#ccc" : "#007bff",
            }, // Change button color when disabled
          ]}
          onPress={handlePrevious}
          disabled={currentQuestionIndex === 0} // Disable if on the first question
        >
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.nextButton,
            {
              backgroundColor: isLastQuestion ? "#dc3545" : "#007bff", // Change button color to red if on last question
            },
          ]}
          onPress={handleNext}
          disabled={!selectedOption} // Disable if no option is selected
        >
          <Text style={styles.buttonText}>
            {isLastQuestion ? "Submit" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 45,
  },
  topSection: {
    marginBottom: 20,
  },
  examName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 5,
  },
  duration: {
    fontSize: 16,
    color: "#555",
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
  },
  optionsContainer: {
    marginBottom: 20,
  },
  option: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#007bff", // Default button color
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  previousButton: {
    marginRight: 10,
  },
  nextButton: {
    marginLeft: 10,
  },
});

export default Examwrite;
