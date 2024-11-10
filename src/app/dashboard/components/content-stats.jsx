export default function ContentStats({ data }) {
  return (
    <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
      <div className="p-4 flex items-center">
        <div className="p-3 rounded-full text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4">
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
          </svg>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Posts
          </p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {data.daily.totalPosts}
          </p>
        </div>
      </div>
    </div>
  )
}