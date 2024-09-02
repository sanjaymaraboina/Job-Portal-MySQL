import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes,  Route } from 'react-router-dom'
import EmployerLogin from './components/Employer/EmployerAuth/EmpLogin/EmployerLogin'
import EmpMain from './components/Employer/EmpMain/EmpMain'
import EmpSignup from './components/Employer/EmployerAuth/Empsignup/EmpSignup'
import Post from './components/Employer/PostJob/Post'
import Home from './components/Home/Home'
// import LoginEmployee from './components/Employee/EmployeeMain/Login/LoginEmployee'
import EmployeeMain from './components/Employee/EmployeeMain/EmployeeMain'
import LoginEmployee from './components/Employee/Authentication/Login/LoginEmployee'
import SignupEmployee from './components/Employee/Authentication/Signup/SignupEmployee'
import Appliedjobs from './components/Employee/AppliedJobs/Appliedjobs'
// import SignupEmployee from './components/Employee/Authentication/Signup/SignupEmployee'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/'  element={<Home />} />
          <Route path='/employerlogin' element = { <EmployerLogin /> } />
          <Route path='/employeelogin' element={<LoginEmployee />}  />
          <Route path='/employermain'  element={<EmpMain />}/>
          <Route path='/employeemain' element={<EmployeeMain />} />
          <Route path='/appliedjobs' element={<Appliedjobs />} />
          <Route path='/registerEmployee' element={<  SignupEmployee />} />
          <Route path='/empsignup' element={<EmpSignup />} />
          <Route  path='/postjob' element={<Post /> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
