"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Printer, Download, ShieldCheck } from "lucide-react"
import { api } from "@/lib/api"

// Types matching our API
interface InvoiceData {
    id: string
    amount: number
    status: string
    items: { description: string, amount: number }[]
    contract_terms: string
    created_at: string
    provider_name: string
    client_name: string
    service_date: string
}

export default function InvoicePage({ params }: { params: { id: string } }) {
    const [invoice, setInvoice] = useState<InvoiceData | null>(null)

    useEffect(() => {
        // Mock fetch
        async function fetchInvoice() {
            try {
                // In real app use params.id. For demo we hit the mocked endpoint with any ID.
                const data = await api.get<InvoiceData>(`/invoices/${params.id}`)
                setInvoice(data)
            } catch (e) {
                console.error(e)
            }
        }
        fetchInvoice()
    }, [params.id])

    if (!invoice) return <div className="p-10 text-center">Loading Invoice...</div>

    return (
        <div className="min-h-screen bg-slate-100 py-10 print:bg-white print:py-0">
            {/* Actions (Hidden when printing) */}
            <div className="max-w-3xl mx-auto mb-6 flex justify-end gap-4 print:hidden px-6">
                <Button variant="outline" onClick={() => window.print()}>
                    <Printer className="h-4 w-4 mr-2" /> Print
                </Button>
                <Button className="bg-teal-600">
                    <Download className="h-4 w-4 mr-2" /> Download PDF
                </Button>
            </div>

            {/* Invoice Paper */}
            <div className="max-w-3xl mx-auto bg-white p-10 shadow-lg print:shadow-none print:p-0">
                {/* Header */}
                <div className="flex justify-between items-start border-b pb-8 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-teal-800 flex items-center gap-2">
                            <ShieldCheck className="h-8 w-8" /> MtaaTrust
                        </h1>
                        <div className="text-sm text-slate-500 mt-2">
                            Trusted Local Services<br />
                            Nairobi, Kenya
                        </div>
                    </div>
                    <div className="text-right">
                        <h2 className="text-lg font-bold text-slate-900">INVOICE</h2>
                        <div className="font-mono text-slate-500 mt-1">#{invoice.id}</div>
                        <div className="mt-4 inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                            {invoice.status}
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-8 mb-10">
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bill To</h3>
                        <div className="font-bold text-slate-900">{invoice.client_name}</div>
                        <div className="text-sm text-slate-500">Consumer Account</div>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Provider</h3>
                        <div className="font-bold text-slate-900">{invoice.provider_name}</div>
                        <div className="text-sm text-slate-500">Verified Professional</div>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Service Date</h3>
                        <div className="font-medium text-slate-900">{invoice.service_date}</div>
                    </div>
                </div>

                {/* Line Items */}
                <div className="mb-10">
                    <table className="w-full">
                        <thead className="border-b border-slate-200">
                            <tr>
                                <th className="text-left font-bold text-slate-600 text-sm pb-3">Description</th>
                                <th className="text-right font-bold text-slate-600 text-sm pb-3">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {invoice.items.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="py-4 text-slate-800">{item.description}</td>
                                    <td className="py-4 text-right font-mono text-slate-600">KES {item.amount.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="border-t border-slate-200">
                            <tr>
                                <td className="pt-4 font-bold text-slate-900 text-right pr-10">Total</td>
                                <td className="pt-4 font-bold text-teal-700 text-right text-lg">KES {invoice.amount.toLocaleString()}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Contract/Terms */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Contract Terms & Conditions</h3>
                    <p className="text-xs text-slate-500 whitespace-pre-line leading-relaxed">
                        {invoice.contract_terms}
                    </p>
                    <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400">
                        <div>Digitally signed via MtaaTrust</div>
                        <div>{invoice.created_at}</div>
                    </div>
                </div>

                <div className="mt-10 text-center text-xs text-slate-400">
                    Thank you only usage MtaaTrust secure payments.
                </div>
            </div>
        </div>
    )
}
