"use client";

// Import necessary hooks from React
import { useState, ChangeEvent } from "react";

// Import custom UI components from the UI directory
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define a TypeScript interface for the BMI result
interface BmiResult {
  bmi: string;
  category: string;
}

// Default export of the BmiCalculator function
export default function BmiCalculator() {
  const [height, setHeight] = useState<string>(""); // Height state
  const [weight, setWeight] = useState<string>(""); // Weight state
  const [result, setResult] = useState<BmiResult | null>(null); // BMI result state
  const [error, setError] = useState<string>(""); // Error message state

  // Update height input
  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setHeight(e.target.value);
  };

  // Update weight input
  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWeight(e.target.value);
  };

  // Function to calculate BMI
  const calculateBmi = (): void => {
    if (!height || !weight) {
      setError("Please enter both height and weight.");
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    if (heightInMeters <= 0) {
      setError("Height must be a positive number.");
      return;
    }

    const weightInKg = parseFloat(weight);
    if (weightInKg <= 0) {
      setError("Weight must be a positive number.");
      return;
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    let category = "";

    if (bmiValue < 18.5) {
      category = "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = "Normal";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    setResult({ bmi: bmiValue.toFixed(1), category });
    setError(""); // Clear error
  };

  // JSX for rendering the BMI Calculator
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-black p-4">
      {/* Centered BMI Calculator Card */}
      <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
        <CardHeader className="p-6 text-center">
          <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">
            BMI Calculator
          </CardTitle>
          <CardDescription className="mt-2 text-gray-600 dark:text-gray-400">
            Enter your height and weight to calculate your BMI.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {/* Input for Height */}
          <div className="space-y-2">
            <Label htmlFor="height" className="text-gray-700 dark:text-gray-300">
              Height (cm)
            </Label>
            <Input
              id="height"
              type="number"
              placeholder="Enter your height"
              value={height}
              onChange={handleHeightChange}
              className="p-3 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Input for Weight */}
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-gray-700 dark:text-gray-300">
              Weight (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter your weight"
              value={weight}
              onChange={handleWeightChange}
              className="p-3 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Button to Calculate BMI */}
          <Button
            onClick={calculateBmi}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Calculate
          </Button>

          {/* Display Error Message */}
          {error && (
            <div className="text-red-500 text-center font-semibold">
              {error}
            </div>
          )}

          {/* Display BMI Result */}
          {result && (
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800 dark:text-white">
                {result.bmi}
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-400">
                {result.category}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
