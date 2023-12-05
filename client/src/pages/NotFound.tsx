import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
        <p className="text-lg text-gray-600">The page you're looking for does not exist.</p>
        <Link to='/' className="text-pink-500 hover:underline mt-4 block">Go Back to Home</Link>
      </div>
    </div>
  )
}

export default NotFound