import './App.scss'
import { useState, useEffect } from 'react'
import { Button, Card, CardHeader, Text, Badge, Input, Label, Field, Select} from '@fluentui/react-components'


const FILTER_OPTIONS = ['Alle', 'Genehmigt', 'Ausstehend', 'Abgelehnt'] as const

interface NewBillForm {
    nummer: string
    lieferant: string
    betrag: number
    status: string
}

function RechnungsKarte({ nummer, lieferant, betrag, status} : NewBillForm) {

    const badgeColor = {
        'Ausstehend': 'warning',
        'Genehmigt': 'success',
        'Abgelehnt': 'danger'
    }[status] as 'warning' | 'success' | 'danger'
return (
    <Card>
        <CardHeader
            header={<Text weight="semibold">{nummer}</Text>}
            description={<Text size={200}>{lieferant}</Text>}
        />
        <Text weight="bold">{betrag.toLocaleString('de-DE')} €</Text>
        <Badge appearance="tint" color={badgeColor} shape="rounded">{status}</Badge>
    </Card>

)
}

export default function App() {



    const [formular, setFormular] = useState<NewBillForm>({nummer: "", lieferant: "", betrag: 0, status: "Ausstehend"})

    const [rechnungen, setRechnungen] = useState<NewBillForm[]>(
        [
            {nummer: "RE-123456", lieferant: "Müller GmbH", betrag: 1250.00, status: "Ausstehend"},
            {nummer: "RE-1043", lieferant: "TechSupply AG", betrag: 3870.00, status: "Genehmigt"},
            {nummer: "RE-1044", lieferant: "Büro & Co KG", betrag: 540.00, status: "Abgelehnt"},
            {nummer: "RE-104445", lieferant: "Martin Guitars C.O.", betrag: 3440.00, status: "Ausstehend"},
            {nummer: "RE-10457689", lieferant: "KORG Japan", betrag: 13440.00, status: "Genehmigt"},
            {nummer: "RE-1045985", lieferant: "Volkswagen", betrag: 78456, status: "Abgelehnt"}
        ]
    )
    // reactive state:
    const [activeFilter, setActiveFilter] = useState<string>("Alle")
    const getFilteredBills = activeFilter === "Alle" ? rechnungen : rechnungen.filter(r => r.status === activeFilter)

    function handleNewBill(formular: NewBillForm) {
        setRechnungen([...rechnungen, {...formular, nummer: "RE-" + formular.nummer}])
        setFormular({nummer: "", lieferant: "", betrag: 0, status: "Ausstehend"})
    }

    //This useEffect will run when the app is loaded:
    useEffect(() => {
        console.log('App rendered')
    }, [])

    // This useEffect will run when the activeFilter state changes:
    useEffect(() => {
        console.log('Active filter changed:', activeFilter)
    }, [activeFilter])

    // This useEffect will run when the rechnungen state changes:
    useEffect(() => {
        console.log('Rechnungen changed:', rechnungen)
    }, [rechnungen]);

    return (
      <>
      <div className={"filter-wrapper"}>
          {FILTER_OPTIONS.map(filter => (
              <Button key={filter}
              appearance={activeFilter === filter ? "primary" : "subtle"}
              onClick={() => setActiveFilter(filter)}
              >{filter}</Button>
          ))}
      </div>
      <div className={"main-wrapper"}>


      {getFilteredBills.map((rechnung) => (<RechnungsKarte key={rechnung.nummer} {...rechnung} />))}


  </div>
          <div className="formular-wrapper">
              <Text weight="bold" size={700} >Neue rechnung</Text>
              <div className="formular">
                  <Field label="Nummer">
                      <Input
                          placeholder="z.B. 123456"
                          value={formular.nummer}
                          onChange={e => setFormular({...formular, nummer: e.target.value})}
                      />
                  </Field>
                  <Field label="Lieferant">
                      <Input
                          placeholder="z.B. Müller GmbH"
                          value={formular.lieferant}
                          onChange={e => setFormular({...formular, lieferant: e.target.value})}
                      />
                  </Field>
                  <Field label="Betrag">
                      <Input
                          placeholder="0"
                          value={formular.betrag === 0 ? '' : String(formular.betrag)}
                          onChange={e => setFormular({...formular, betrag: Number(e.target.value)})}
                      />
                  </Field>
                  <Field label="Status">
                      <Select
                          value={formular.status}
                          onChange={e => setFormular({...formular, status: e.target.value})}
                      >
                          {FILTER_OPTIONS.map(option => (
                              <option key={option} value={option}>{option}</option>
                          ))}
                      </Select>
                  </Field>

              </div>
              <div className="form-button">
                  <Button appearance="primary" onClick={() => handleNewBill(formular)}>Hinzufügen</Button>
              </div>


          </div>

      </>)
}