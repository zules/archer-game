export default function EmptyUnit({message = "EMPTY"}) {
    return (
    <div className={`w-54 h-64 m-1 flex rounded-2xl overflow-hidden border-2 border-black bg-gray-300 items-center justify-center`}>
        <p>{message}</p>
    </div>
    )
}