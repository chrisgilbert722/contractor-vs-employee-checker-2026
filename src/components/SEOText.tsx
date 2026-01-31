import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div className="card" style={{ background: '#F8FAFC' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                This checker evaluates common factors used to distinguish independent contractors from employees,
                including degree of work control, schedule flexibility, equipment ownership, payment method, and
                benefits provided. Results are estimates only and should not be relied upon as definitive
                classifications. This tool does not constitute legal advice. Actual classification depends on
                facts and jurisdiction, as employment laws vary by location. Consult a qualified professional
                for guidance on worker classification matters.
            </p>
        </div>
    );
};
