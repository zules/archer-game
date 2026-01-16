export default function Lane() {
    const laneNums = Array.from({ length: 3 }, (_, i) => i + 1);
    return (
        <div className="lanes">
            {laneNums.map((num) => (
                <div key={num} className="lane">
                    <p>Some text</p>
                </div>
            ))}
        </div>
    );
}