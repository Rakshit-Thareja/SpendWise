import { useState } from 'react'

function CurrencyConverter() {

    const [error, setError] = useState(null)

    const [rate, setRate] = useState(null)

    const [amount, setAmount] = useState(0)

    const [loading, setLoading] = useState(false)

    const handleConvert = async () => {
        setError(null)
        setLoading(true)
        try {
            const response = await fetch(
                "https://api.frankfurter.dev/v2/rate/USD/INR"
            )
            if (!response.ok) {
                throw new Error("Failed to get the response")
            }
            const data = await response.json()
            setRate(data.rate)
            console.log(data)
        } catch (error) {
            setError('Failed to fetch exchange rate')
        } finally {
            setLoading(false)
        }

    }

    const convertedAmount = Number(amount) * rate;

    return (
        <>
            <button onClick={handleConvert} disabled={loading} > {loading ? 'Converting...' : 'Convert'} </button>
            <input type='number' value={amount} onChange={(event) => {
                setAmount(event.target.value)
            }}></input>
            {error && <p>{error}</p>}
            {rate && amount && <p>Exchange Rate: {rate}</p>}
            {rate && amount && <p>Converted Amount: ₹{convertedAmount.toFixed(2)}</p>}
        </>
    )
}

export default CurrencyConverter