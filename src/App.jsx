import { AuthProvider } from "./context/AuthContext"
import Vitrual from "./virtual/Vitrual"

function App() {

  return (
    <>
    <AuthProvider>
      <Vitrual/>
    </AuthProvider>
      
    </>
  )
}

export default App
