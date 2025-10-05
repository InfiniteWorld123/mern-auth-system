import { Link } from "react-router-dom"

export default function CustomLink({ to = "/", text }) {
    return (
        <Link
            to={to} // رابط مؤقت، يجب أن يتطابق مع إعدادات التوجيه الخاصة بك
            className="text-indigo-400 font-semibold ml-1 hover:text-indigo-300 transition duration-150"
        >
            {text}
        </Link>
    )
}