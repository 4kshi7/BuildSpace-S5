import React from 'react';

const PhysicalHealthForm = () => {
  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col justify-center py-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl ">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">Physical Health Planner</h2>
        <div className="bg-white py-6 px-6 shadow-md sm:rounded-lg sm:px-10">
          <form className="space-y-6 " action="submit_physical_health_form.php" method="POST">

            <div className="grid grid-cols-2 gap-x-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                <input id="name" name="name" type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age:</label>
                <input id="age" name="age" type="number" min="1" max="120" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender:</label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input type="radio" name="gender" value="male" className="mr-2" required />
                    <span className="text-sm">Male</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input type="radio" name="gender" value="female" className="mr-2" />
                    <span className="text-sm">Female</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input type="radio" name="gender" value="other" className="mr-2" />
                    <span className="text-sm">Other</span>
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">Nationality:</label>
                <input id="nationality" name="nationality" type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="goals" className="block text-sm font-medium text-gray-700">Goals:</label>
              <textarea id="goals" name="goals" rows="3" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>

            <div>
              <label htmlFor="sleep" className="block text-sm font-medium text-gray-700">Average Sleep Hours:</label>
              <input id="sleep" name="sleep" type="number" min="0" max="24" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="exercise" className="block text-sm font-medium text-gray-700">Current Exercise Routine:</label>
              <div className="mt-1 space-y-2 space-x-4">
                <label className="inline-flex items-center">
                  <input type="checkbox" name="exercise[]" value="walking" className="mr-2" />
                  <span className="text-sm">Walking</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" name="exercise[]" value="running" className="mr-2" />
                  <span className="text-sm">Running</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" name="exercise[]" value="gym" className="mr-2" />
                  <span className="text-sm">Gym Workouts</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" name="exercise[]" value="yoga" className="mr-2" />
                  <span className="text-sm">Yoga</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" name="exercise[]" value="swimming" className="mr-2" />
                  <span className="text-sm">Swimming</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" name="exercise[]" value="cycling" className="mr-2" />
                  <span className="text-sm">Cycling</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1  gap-x-4">
              <div>
                <label htmlFor="work_type" className="block text-sm font-medium text-gray-700">Type of Work:</label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input type="radio" name="work_type" value="desk_job" className="mr-2" />
                    <span className="text-sm">Desk Job</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input type="radio" name="work_type" value="physical_labour" className="mr-2" />
                    <span className="text-sm">Physical Labour</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input type="radio" name="work_type" value="mixed" className="mr-2" />
                    <span className="text-sm">Mixed (Desk + Physical)</span>
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor="smoking_habits" className="block text-sm font-medium mt-4 text-gray-700">Smoking Habits:</label>
                <div className="mt-1 space-x-4">
                  <label className="inline-flex items-center">
                    <input type="radio" name="smoking_habits" value="no" className="mr-2" required />
                    <span className="text-sm">No</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="smoking_habits" value="sometimes" className="mr-2" />
                    <span className="text-sm">Sometimes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="smoking_habits" value="often" className="mr-2" />
                    <span className="text-sm">Often</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="smoking_habits" value="very_often" className="mr-2" />
                    <span className="text-sm">Very Often</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="alcohol_consumption" className="block text-sm font-medium text-gray-700">Alcohol Consumption:</label>
              <div className="mt-1 space-x-4">
                <label className="inline-flex items-center">
                  <input type="radio" name="alcohol_consumption" value="no" className="mr-2" required />
                  <span className="text-sm">No</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="alcohol_consumption" value="sometimes" className="mr-2" />
                  <span className="text-sm">Sometimes</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="alcohol_consumption" value="often" className="mr-2" />
                  <span className="text-sm">Often</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="alcohol_consumption" value="very_often" className="mr-2" />
                  <span className="text-sm">Very Often</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="preferred_diet" className="block text-sm font-medium text-gray-700">Preferred Diet:</label>
              <select id="preferred_diet" name="preferred_diet" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="eggetarian">Eggetarian</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>

            <div>
              <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Allergic To:</label>
              <textarea id="allergies" name="allergies" rows="2" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>

            <div>
              <label htmlFor="existing_diseases" className="block text-sm font-medium text-gray-700">Existing Diseases (if any):</label>
              <textarea id="existing_diseases" name="existing_diseases" rows="2" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>

            <div>
              <button type="submit" className="w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhysicalHealthForm;
