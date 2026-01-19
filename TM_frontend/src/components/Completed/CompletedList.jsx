import styles from "./CompletedList.module.css";

function HostTaskList({ item }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const newDate = formatDate(item.date);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl bg-gray-50 rounded-xl shadow-sm p-4">
        <div className="grid grid-cols-12 items-center gap-4">
          {/* Task */}
          <div className="col-span-6 font-medium text-lg text-gray-800">
            {item.task}
          </div>

          {/* Date */}
          <div className="col-span-4 text-gray-500 text-lg">{newDate}</div>

          {/* Status */}
          <div className="col-span-2  text-right">
            <span
              className={`px-3 py-1 rounded-full text-lg font-medium ${
                item.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {item.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostTaskList;
