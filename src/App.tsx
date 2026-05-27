import './App.scss'

interface RechnungsKarteProps {
  nummer: string
  lieferant: string
  betrag: number
  status: string
}
function RechnungsKarte({ nummer, lieferant, betrag, status} : RechnungsKarteProps) {
return (
    <div className={"karte"}>
      <div className={"nummer"}>{nummer}</div>
      <p className={"lieferant"}>{lieferant}</p>
      <p className={"betrag"}>{betrag}€</p>
      <p className={`badge badge--${status.toLowerCase()}`}>{status}</p>
    </div>
)
}

export default function App() {
  const rechnungen = [
    {nummer: "RE-123456", lieferant: "Müller GmbH", betrag: 1250.00, status: "Ausstehend"},
    {nummer: "RE-1043", lieferant: "TechSupply AG", betrag: 3870.00, status: "Genehmigt"},
    {nummer: "RE-1044", lieferant: "Büro & Co KG", betrag: 540.00, status: "Abgelehnt"},
  ]
  return (<div className={"main-wrapper"}>

      {rechnungen.map((rechnung) => (<RechnungsKarte key={rechnung.nummer} {...rechnung} />))}


  </div>)
}