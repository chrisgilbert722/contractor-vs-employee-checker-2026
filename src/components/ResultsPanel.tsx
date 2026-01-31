import React from 'react';
import type { ContractorVsEmployeeResult } from '../logic/contractorVsEmployeeCalculations';

interface ResultsPanelProps {
    result: ContractorVsEmployeeResult;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
    const getClassificationColor = () => {
        if (result.classification === 'contractor') return '#166534';
        if (result.classification === 'employee') return '#1e40af';
        return '#92400e';
    };

    const getClassificationBg = () => {
        if (result.classification === 'contractor') return 'linear-gradient(to bottom, #F0FDF4, #DCFCE7)';
        if (result.classification === 'employee') return 'linear-gradient(to bottom, #EFF6FF, #DBEAFE)';
        return 'linear-gradient(to bottom, #FFFBEB, #FEF3C7)';
    };

    const getBorderColor = () => {
        if (result.classification === 'contractor') return '#86EFAC';
        if (result.classification === 'employee') return '#93C5FD';
        return '#FCD34D';
    };

    const getClassificationLabel = () => {
        if (result.classification === 'contractor') return 'Independent Contractor';
        if (result.classification === 'employee') return 'Employee';
        return 'Unclear';
    };

    return (
        <div className="card" style={{
            background: getClassificationBg(),
            borderColor: getBorderColor(),
            boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.1)'
        }}>
            <div className="text-center">
                <h2 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                    Estimated Classification
                </h2>
                <div style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: getClassificationColor(),
                    lineHeight: 1.2,
                    letterSpacing: '-0.025em'
                }}>
                    {getClassificationLabel()}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
                    {result.message}
                </div>
            </div>

            <hr style={{
                margin: 'var(--space-6) 0',
                border: 'none',
                borderTop: `1px solid ${getBorderColor()}`
            }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)', textAlign: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>CONTRACTOR</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: '#166534' }}>
                        {result.contractorScore.toFixed(1)}
                    </div>
                </div>
                <div style={{ borderLeft: `1px solid ${getBorderColor()}`, borderRight: `1px solid ${getBorderColor()}` }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>EMPLOYEE</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: '#1e40af' }}>
                        {result.employeeScore.toFixed(1)}
                    </div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>RISK AREAS</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: result.riskAreas.length > 0 ? '#dc2626' : '#166534' }}>
                        {result.riskAreas.length}
                    </div>
                </div>
            </div>
        </div>
    );
};
