import React, { useState } from 'react';

const MentalHealthForm = () => {
  const [meditationGuides, setMeditationGuides] = useState('');
  const [mindfulnessExercises, setMindfulnessExercises] = useState('');
  const [stressManagementTechniques, setStressManagementTechniques] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here, like sending data to a backend or storing locally
    console.log({
      meditationGuides,
      mindfulnessExercises,
      stressManagementTechniques
    });
    // Optionally, clear the form fields after submission
    setMeditationGuides('');
    setMindfulnessExercises('');
    setStressManagementTechniques('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Mental Health Resources</h2>
      <label>
        Meditation Guides:
        <textarea
          value={meditationGuides}
          onChange={(e) => setMeditationGuides(e.target.value)}
          required
        />
      </label>
      <label>
        Mindfulness Exercises:
        <textarea
          value={mindfulnessExercises}
          onChange={(e) => setMindfulnessExercises(e.target.value)}
          required
        />
      </label>
      <label>
        Stress Management Techniques:
        <textarea
          value={stressManagementTechniques}
          onChange={(e) => setStressManagementTechniques(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MentalHealthForm;
