import { View, Text } from 'react-native'
import React from 'react'

const PrintReviewPage = () => {
    return (
        <div ref={ref} style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100vh' }}>
        {[0, 1].map((_, index) => (
            <div key={index} style={{ width: '50%', padding: '20px', boxSizing: 'border-box' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1D4ED8', marginBottom: '10px' }}>Invoice</h1>
                <div style={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <div>
                            <p><strong>Invoice Number:</strong> {formdata?.invoiceNum}</p>
                            <p><strong>Invoice Date:</strong> {formdata?.invoiceDate}</p>
                        </div>
                        <div>
                            <p><strong>Authorized Sign:</strong> {formdata?.authorizedSign}</p>
                            <p><strong>Print Date:</strong> {formdata?.printDate}</p>
                        </div>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #E5E7EB', padding: '8px' }}>S.N</th>
                                <th style={{ border: '1px solid #E5E7EB', padding: '8px' }}>Particulars</th>
                                <th style={{ border: '1px solid #E5E7EB', padding: '8px' }}>Qty</th>
                                <th style={{ border: '1px solid #E5E7EB', padding: '8px' }}>Rate</th>
                                <th style={{ border: '1px solid #E5E7EB', padding: '8px' }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}>1</td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}>{formdata?.particular}</td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}></td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}></td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}>{formdata?.grandTotal}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}></td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}></td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}></td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}>Sub Total</td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}>{formdata?.subTotal}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}></td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}></td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}></td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}>Discount</td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}>{formdata?.discount}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}></td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}></td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}></td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}>Taxable Amount</td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}>{formdata?.taxableAmount}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}></td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}></td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}></td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}>13% VAT</td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}>{formdata?.VAT}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}></td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}></td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}></td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}>Grand Total</td>
                                <td style={{ border: '1px solid #E5E7EB', padding: '8px' }}>{formdata?.grandTotal}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        ))}
    </div>
    )
}

export default PrintReviewPage