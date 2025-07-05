import { Card, CardContent } from "@/src/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Label } from "@/src/components/ui/label";

interface QuizQuestionProps {
  question: {
    id: number;
    question: string;
    options: string[];
    explanation?: string;
  };
  selectedAnswer: number;
  onAnswerSelect: (answerIndex: number) => void;
  showExplanation?: boolean;
  correctAnswer?: number;
}

export default function QuizQuestion({
  question,
  selectedAnswer,
  onAnswerSelect,
  showExplanation = false,
  correctAnswer
}: QuizQuestionProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {question.question}
        </h2>

        <RadioGroup
          value={selectedAnswer.toString()}
          onValueChange={(value) => onAnswerSelect(parseInt(value))}
        >
          <div className="space-y-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = showExplanation && correctAnswer === index;
              const isWrong = showExplanation && isSelected && correctAnswer !== index;

              return (
                <div key={index}>
                  <Label
                    htmlFor={`option-${index}`}
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition duration-200 ${isCorrect
                      ? 'border-success bg-green-50'
                      : isWrong
                        ? 'border-red-500 bg-red-50'
                        : isSelected
                          ? 'border-primary bg-blue-50'
                          : 'border-gray-200 hover:border-primary hover:bg-blue-50'
                      }`}
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                      className={
                        isCorrect
                          ? 'text-success border-success'
                          : isWrong
                            ? 'text-red-500 border-red-500'
                            : 'text-primary border-primary'
                      }
                    />
                    <span className={`ml-4 ${isCorrect
                      ? 'text-green-800 font-medium'
                      : isWrong
                        ? 'text-red-800'
                        : isSelected
                          ? 'text-primary font-medium'
                          : 'text-gray-900'
                      }`}>
                      {option}
                    </span>
                  </Label>
                </div>
              );
            })}
          </div>
        </RadioGroup>

        {showExplanation && question.explanation && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Explanation:</h4>
            <p className="text-gray-700 text-sm">{question.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}