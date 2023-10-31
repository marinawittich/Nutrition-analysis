

export default function Calories({ label, quantity, unit }) {
    return (
        <div>
            
        <div className="calories">
           <div className="positionCenter">
           <div className="label">{label}: <span>{quantity} {unit} </span></div>
           </div>
         
        </div>
        </div>

    )
}