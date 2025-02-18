const MessageSkeleton = () => {
	return (
		<div className='flex gap-3 items-center p-2'>
		  <div className='skeleton w-10 h-10 rounded-full'></div>
		  <div className='flex flex-col gap-1'>
			<div className='skeleton h-4 w-40'></div>
			<div className='skeleton h-4 w-40'></div>
		  </div>
		</div>
	  );
};
export default MessageSkeleton;