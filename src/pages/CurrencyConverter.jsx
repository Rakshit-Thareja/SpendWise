import { useEffect, useState } from 'react'
import Button from '../components/Button'

function CurrencyConverter() {
    const [error, setError] = useState(null)
    const [rate, setRate] = useState(null)
    const [amount, setAmount] = useState(0)
    const [loading, setLoading] = useState(false)

    const [currencies, setCurrencies] = useState([])

    const [fromCurrency, setFromCurrency] = useState('USD')
    const [toCurrency, setToCurrency] = useState('INR')

    // Swap currencies
    const handleSwap = () => {
        setRate(null)
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
    }

    // Fetch available currencies
    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await fetch(
                    'https://api.frankfurter.dev/v2/currencies'
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch currencies')
                }

                const data = await response.json()

                setCurrencies(data)
            } catch {
                setError('Failed to load currencies')
            }
        }

        fetchCurrencies()
    }, [])

    // Convert currency
    const handleConvert = async () => {
        const url = `https://api.frankfurter.dev/v2/rate/${fromCurrency}/${toCurrency}`

        setError(null)
        setRate(null)

        // Same currency
        if (fromCurrency === toCurrency) {
            setRate(1)
            return
        }

        setLoading(true)

        try {
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error('Failed to get the response')
            }

            const data = await response.json()

            setRate(data.rate)
        } catch {
            setError('Failed to fetch exchange rate')
        } finally {
            setLoading(false)
        }
    }

    const convertedAmount = Number(amount) * rate

    return (
    <div className="space-y-8">

        {/* Page Header */}

        <div>
            <p className="text-sm font-medium text-indigo-400">
                Currency Tools
            </p>

            <h2 className="mt-1 text-3xl font-bold tracking-tight text-white">
                Currency Converter
            </h2>

            <p className="mt-2 text-gray-400">
                Convert currencies using live exchange rates.
            </p>
        </div>

        {/* Converter Card */}

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">

            {/* Currency Selection */}

            <div className="mb-5 grid grid-cols-1 items-end gap-4 md:grid-cols-[1fr_auto_1fr]">

                {/* From */}

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                        From
                    </label>

                    <select
                        value={fromCurrency}
                        onChange={(event) => {
                            setFromCurrency(event.target.value)
                            setRate(null)
                        }}
                        className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                    >
                        {currencies.map((currency) => (
                            <option
                                key={currency.iso_code}
                                value={currency.iso_code}
                            >
                                {currency.iso_code} - {currency.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Swap */}

                <button
                    type="button"
                    onClick={handleSwap}
                    className="rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-xl text-gray-300 transition hover:border-indigo-500 hover:text-indigo-400"
                    aria-label="Swap currencies"
                >
                    ⇄
                </button>

                {/* To */}

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                        To
                    </label>

                    <select
                        value={toCurrency}
                        onChange={(event) => {
                            setToCurrency(event.target.value)
                            setRate(null)
                        }}
                        className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                    >
                        {currencies.map((currency) => (
                            <option
                                key={currency.iso_code}
                                value={currency.iso_code}
                            >
                                {currency.iso_code} - {currency.name}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            {/* Amount */}

            <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Amount
                </label>

                <input
                    type="number"
                    min="0"
                    value={amount}
                    onChange={(event) => {
                        setAmount(event.target.value)
                    }}
                    className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                    placeholder="Enter amount"
                />
            </div>

            {/* Convert Button */}

            <Button
                type="button"
                onClick={handleConvert}
                disabled={loading || currencies.length === 0}
                className="w-full"
            >
                {loading ? 'Converting...' : 'Convert'}
            </Button>

            {/* Error */}

            {error && (
                <div className="mt-5 rounded-lg border border-red-900 bg-red-950/40 p-4">
                    <p className="text-sm text-red-400">
                        ⚠️ {error}
                    </p>
                </div>
            )}

            {/* Results */}

            {rate && amount && (
                <div className="mt-5 rounded-xl border border-gray-800 bg-gray-950 p-5">

                    <p className="text-sm text-gray-400">
                        Exchange Rate
                    </p>

                    <p className="mt-1 text-lg font-semibold text-white">
                        1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
                    </p>

                    <div className="my-4 border-t border-gray-800" />

                    <p className="text-sm text-gray-400">
                        Converted Amount
                    </p>

                    <p className="mt-1 text-3xl font-bold text-indigo-400">
                        {convertedAmount.toFixed(2)} {toCurrency}
                    </p>

                </div>
            )}

        </div>

    </div>    
    )
}

export default CurrencyConverter
