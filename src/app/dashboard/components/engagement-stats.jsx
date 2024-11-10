export default function EngagementStats({ data }) {
  return (
    <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
      <div className="p-4 flex items-center">
        <div className="p-3 rounded-full text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500 mr-4">
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
          </svg>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Likes
          </p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {data.daily.totalLikes}
          </p>
        </div>
      </div>
    </div>
  )
}