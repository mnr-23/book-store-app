import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete, MdOutlineAddBox } from "react-icons/md";

const BooksTable = ({ books }) => {
  return (
    <table className="w-full border-separate border-spacing-1">
      <thead>
        <tr>
          <th className="border border-gray-600 rounded-md">No</th>
          <th className="border border-gray-600 rounded-md">Title</th>
          <th className="border border-gray-600 max-md:hidden rounded-md">
            Author
          </th>
          <th className="border border-gray-600 max-md:hidden rounded-md">
            Publish Year
          </th>
          <th className="border border-gray-600 rounded-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id}>
            <td className="border border-gray-500 rounded-md text-center">
              {index + 1}
            </td>
            <td className="border border-gray-500 rounded-md text-center">
              {book.title}
            </td>
            <td className="border border-gray-500 rounded-md max-md:hidden text-center">
              {book.author}
            </td>
            <td className="border border-gray-500 rounded-md max-md:hidden text-center">
              {book.publishYear}
            </td>
            <td className="border border-gray-500 rounded-md text-center">
              <div className="flex justify-center gap-x-2">
                <Link
                  to={`/books/details/${book._id}`}
                  className="text-blue-500 mr-2"
                >
                  <BsInfoCircle />
                </Link>
                <Link
                  to={`/books/edit/${book._id}`}
                  className="text-green-500 mr-2"
                >
                  <AiOutlineEdit />
                </Link>
                <Link to={`/books/delete/${book._id}`} className="text-red-500">
                  <MdOutlineDelete />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
