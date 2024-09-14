export default function Loading() {
    return (
        <>
            <div className='flex items-center fixed inset-0 justify-center bg-black bg-opacity-30'>
                <span className="loading loading-spinner loading-lg"></span>
                <span className='ml-2'>
                    Loading
                </span>
            </div>
        </>
    )
}