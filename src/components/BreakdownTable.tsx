import React from 'react';
import type { ContractorVsEmployeeResult } from '../logic/contractorVsEmployeeCalculations';

interface BreakdownTableProps {
    result: ContractorVsEmployeeResult;
}

export const BreakdownTable: React.FC<BreakdownTableProps> = ({ result }) => {
    return (
        <div className="card" style={{ padding: '0' }}>
            {/* Classification Factors Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1rem' }}>Classification Factors</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
                <tbody>
                    {result.factors.map((factor, idx) => (
                        <tr key={idx} style={{
                            borderBottom: '1px solid var(--color-border)',
                            backgroundColor: idx % 2 === 0 ? 'transparent' : '#F8FAFC'
                        }}>
                            <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-secondary)' }}>
                                {factor.factor}
                            </td>
                            <td style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--color-text-primary)' }}>
                                {factor.value}
                            </td>
                            <td style={{
                                padding: 'var(--space-3) var(--space-6)',
                                textAlign: 'right',
                                fontWeight: 600,
                                color: factor.favorsContractor ? '#166534' : '#1e40af'
                            }}>
                                {factor.favorsContractor ? 'Contractor' : 'Employee'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Risk Areas Section */}
            {result.riskAreas.length > 0 && (
                <>
                    <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#FEF2F2' }}>
                        <h3 style={{ fontSize: '1rem', color: '#dc2626' }}>Potential Risk Areas</h3>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
                        <tbody>
                            {result.riskAreas.map((risk, idx) => (
                                <tr key={idx} style={{
                                    borderBottom: idx === result.riskAreas.length - 1 ? 'none' : '1px solid var(--color-border)',
                                    backgroundColor: idx % 2 === 0 ? 'transparent' : '#F8FAFC'
                                }}>
                                    <td style={{ padding: 'var(--space-3) var(--space-6)', color: '#dc2626' }}>
                                        {risk}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};
