import React from 'react';
import type { ContractorVsEmployeeInput } from '../logic/contractorVsEmployeeCalculations';

interface InputCardProps {
    values: ContractorVsEmployeeInput;
    onChange: (field: keyof ContractorVsEmployeeInput, value: number | boolean | string) => void;
}

const selectStyle = {
    width: '100%',
    padding: 'var(--space-3)',
    fontSize: '1rem',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    background: '#fff'
};

export const InputCard: React.FC<InputCardProps> = ({ values, onChange }) => {
    return (
        <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {/* Work Control */}
                <div>
                    <label htmlFor="workControl">Degree of Work Control</label>
                    <select
                        id="workControl"
                        value={values.workControl}
                        onChange={(e) => onChange('workControl', e.target.value)}
                        style={selectStyle}
                    >
                        <option value="company">Company controls how work is done</option>
                        <option value="worker">Worker controls how work is done</option>
                        <option value="mixed">Mixed - some direction, some autonomy</option>
                    </select>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Who determines how the work is performed?
                    </span>
                </div>

                {/* Schedule Flexibility */}
                <div>
                    <label htmlFor="scheduleFlexibility">Schedule Flexibility</label>
                    <select
                        id="scheduleFlexibility"
                        value={values.scheduleFlexibility}
                        onChange={(e) => onChange('scheduleFlexibility', e.target.value)}
                        style={selectStyle}
                    >
                        <option value="fixed">Fixed schedule set by company</option>
                        <option value="flexible">Worker sets own schedule</option>
                        <option value="somewhat">Somewhat flexible with guidelines</option>
                    </select>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Who controls when work is performed?
                    </span>
                </div>

                {/* Equipment Ownership */}
                <div>
                    <label htmlFor="equipmentOwnership">Equipment Ownership</label>
                    <select
                        id="equipmentOwnership"
                        value={values.equipmentOwnership}
                        onChange={(e) => onChange('equipmentOwnership', e.target.value)}
                        style={selectStyle}
                    >
                        <option value="company">Company provides all equipment</option>
                        <option value="worker">Worker provides own equipment</option>
                        <option value="both">Both provide some equipment</option>
                    </select>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Who provides tools and equipment?
                    </span>
                </div>

                {/* Can Work for Others */}
                <div>
                    <label htmlFor="canWorkForOthers">Ability to Work for Others</label>
                    <select
                        id="canWorkForOthers"
                        value={values.canWorkForOthers ? 'yes' : 'no'}
                        onChange={(e) => onChange('canWorkForOthers', e.target.value === 'yes')}
                        style={selectStyle}
                    >
                        <option value="yes">Yes - can work for other clients</option>
                        <option value="no">No - exclusive to this company</option>
                    </select>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Is the worker allowed to work for other clients?
                    </span>
                </div>

                {/* Payment Method */}
                <div>
                    <label htmlFor="paymentMethod">Payment Method</label>
                    <select
                        id="paymentMethod"
                        value={values.paymentMethod}
                        onChange={(e) => onChange('paymentMethod', e.target.value)}
                        style={selectStyle}
                    >
                        <option value="hourly">Hourly wage</option>
                        <option value="project">Per project/deliverable</option>
                        <option value="salary">Regular salary</option>
                    </select>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        How is the worker compensated?
                    </span>
                </div>

                {/* Benefits Provided */}
                <div>
                    <label htmlFor="benefitsProvided">Benefits Provided</label>
                    <select
                        id="benefitsProvided"
                        value={values.benefitsProvided ? 'yes' : 'no'}
                        onChange={(e) => onChange('benefitsProvided', e.target.value === 'yes')}
                        style={selectStyle}
                    >
                        <option value="no">No benefits provided</option>
                        <option value="yes">Benefits provided (health, PTO, etc.)</option>
                    </select>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Does the company provide employee benefits?
                    </span>
                </div>
            </div>
        </div>
    );
};
