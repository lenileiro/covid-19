import React from 'react'
import './app.css';
function App(_props) {
    return <div class="w-full">
        <h2 class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">COVID-19 Infections Estimator</h2>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" autocomplete="off" data-estimation-form>
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="periodType">Period Type</label>
                <select id="periodType" data-period-type required class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option label="days" value="days">Days</option>
                    <option label="weeks" value="weeks">Weeks</option>
                    <option label="months" value="months">Months</option>
                </select>
            </div>
            <div>
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2"  for="timeToElapse">Time To Elapse</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" data-time-to-elapse id="timeToElapse" placeholder="Time To Elapse" required />
            </div>
            </div>
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="reportedCases">Reported Cases</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="number" data-reported-cases id="reportedCases" placeholder="Reported Cases" required />
            </div>
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="population">Population</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" data-population id="population" placeholder="Population" required />
            </div>
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="totalHospitalBeds">Total Hospital Beds</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number"  data-total-hospital-beds id="totalHospitalBeds" placeholder="Total Hospital Beds" required />
            </div>
            <hr/>
            <button class="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" data-go-estimate type="submit">Get Estimation</button>
        </form>
  </div>;
}
export default App;