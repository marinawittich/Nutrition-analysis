export default function Total({ calories, weight }) {
    return (
        <div className="calories">
           <div className="label">Total calories {calories}</div>
           <div>
           <div className="label"> Weight {weight.toFixed()}</div>
           </div>
        </div>

    )
}