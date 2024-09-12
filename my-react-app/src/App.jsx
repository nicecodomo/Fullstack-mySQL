import './App.css'
import Navbar from './components/navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        {/* Main content here */}
        <Dashboard />
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default App
