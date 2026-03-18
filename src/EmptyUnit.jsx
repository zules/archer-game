export default function EmptyUnit({message = "EMPTY", engaged = false}) {

    const engagedStyling = engaged ? "ring-4 ring-blue-600 ring-offset-2 z-10 shadow-lg shadow-red-600/50 transition-all duration-200" : ""
    return (
    <div className={`w-54 h-64 m-1 flex rounded-2xl overflow-hidden border-2 border-black bg-gray-300 items-center justify-center ${engagedStyling}`}>
        <p>{message}</p>
    </div>
    )
}