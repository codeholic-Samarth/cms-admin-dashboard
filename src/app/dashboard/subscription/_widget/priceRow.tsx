export const PriceRow = ({
  label,
  price,
  sale,
}: {
  label: string
  price: number
  sale: number
}) => (
  <div className="rounded-lg border p-4 space-y-1">
    <h2 className="font-medium">{label}</h2>
    <div className="font-medium flex justify-between items-center text-muted-foreground">
      <h4>Sale Price</h4>
      {sale > 0 ? sale : price}
    </div>
    {sale > 0 && (
      <div className="font-medium flex justify-between items-center text-muted-foreground">
        <h4>Original Price</h4>
        <p className="text-xs line-through text-muted-foreground">{price}</p>
      </div>
    )}
  </div>
)
