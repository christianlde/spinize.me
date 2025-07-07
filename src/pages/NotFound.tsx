import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <main>
        404 - destination not found
        <h1 className="text-2xl font-semibold">Sorry, the page you have requested does not exist, or perhaps has been removed throughout the versions.</h1>
        <Link to='/app' className="text-lg underline">Consider moving to the Homepage to get back to the app.</Link>
      </main>
    </>
  )
}
