const GroupMessageSkeleton = () => {
    return (
      <div className="flex gap-3 items-center p-3 animate-pulse">
        <div className="w-10 h-10 rounded-full bg-gray-700"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  };
  export default GroupMessageSkeleton;