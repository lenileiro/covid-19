import React from 'react'
import './app.css';
function App(_props) {
    return <div>
        <h2>COVID-19 Infections Estimator</h2>
        <form autocomplete="off" data-estimation-form>
            <div>
                <label for="periodType">Period Type</label>
                <select id="periodType" data-period-type required>
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                </select>

            </div>
            <div>
                <label for="timeToElapse">Time To Elapse</label>
                <input type="number" data-time-to-elapse id="timeToElapse" placeholder="Time To Elapse" required />

            </div>
            <div>
                <label for="reportedCases">Reported Cases</label>
                <input type="number" data-reported-cases id="reportedCases" placeholder="Reported Cases" required />

            </div>
            <div>
                <label for="population">Population</label>
                <input type="number" data-population id="population" placeholder="Population" required />
            </div>
            <div>
                <label for="totalHospitalBeds">Total Hospital Beds</label>
                <input type="number"  data-total-hospital-beds id="totalHospitalBeds" placeholder="Total Hospital Beds" required />
            </div>
            <button data-go-estimate type="submit">Get Estimation</button>
        </form>
  </div>;
}
export default App;