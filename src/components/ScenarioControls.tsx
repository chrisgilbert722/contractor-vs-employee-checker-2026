import React from 'react';
import type { ContractorVsEmployeeInput } from '../logic/contractorVsEmployeeCalculations';

interface ScenarioControlsProps {
    values: ContractorVsEmployeeInput;
    onChange: (field: keyof ContractorVsEmployeeInput, value: number | boolean | string) => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({ values, onChange }) => {
    const workControlOptions = [
        { label: 'Company', value: 'company' },
        { label: 'Worker', value: 'worker' },
        { label: 'Mixed', value: 'mixed' },
    ];

    const benefitsOptions = [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
    ];

    return (
        <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Adjustments</h3>

            {/* Work Control Quick Select */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ marginBottom: 'var(--space-2)' }}>Work Control</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {workControlOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('workControl', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.workControl === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.workControl === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.workControl === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Benefits Quick Select */}
            <div>
                <label style={{ marginBottom: 'var(--space-2)' }}>Benefits Provided</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {benefitsOptions.map((option) => (
                        <button
                            key={String(option.value)}
                            type="button"
                            onClick={() => onChange('benefitsProvided', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.benefitsProvided === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.benefitsProvided === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.benefitsProvided === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
