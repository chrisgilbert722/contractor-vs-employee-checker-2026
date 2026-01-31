export interface ContractorVsEmployeeInput {
    workControl: 'company' | 'worker' | 'mixed';
    scheduleFlexibility: 'fixed' | 'flexible' | 'somewhat';
    equipmentOwnership: 'company' | 'worker' | 'both';
    canWorkForOthers: boolean;
    paymentMethod: 'hourly' | 'project' | 'salary';
    benefitsProvided: boolean;
}

export interface ClassificationFactor {
    factor: string;
    value: string;
    favorsContractor: boolean;
    weight: number;
}

export interface ContractorVsEmployeeResult {
    classification: 'contractor' | 'employee' | 'unclear';
    confidenceScore: number;
    contractorScore: number;
    employeeScore: number;
    factors: ClassificationFactor[];
    riskAreas: string[];
    message: string;
}

export function calculateContractorVsEmployee(input: ContractorVsEmployeeInput): ContractorVsEmployeeResult {
    const {
        workControl,
        scheduleFlexibility,
        equipmentOwnership,
        canWorkForOthers,
        paymentMethod,
        benefitsProvided
    } = input;

    const factors: ClassificationFactor[] = [];
    let contractorScore = 0;
    let employeeScore = 0;

    // Work Control Factor (high weight)
    const workControlFactor: ClassificationFactor = {
        factor: 'Degree of Work Control',
        value: workControl === 'company' ? 'Company controls' : workControl === 'worker' ? 'Worker controls' : 'Mixed control',
        favorsContractor: workControl === 'worker',
        weight: 3
    };
    factors.push(workControlFactor);
    if (workControl === 'worker') contractorScore += 3;
    else if (workControl === 'company') employeeScore += 3;
    else { contractorScore += 1; employeeScore += 1; }

    // Schedule Flexibility Factor
    const scheduleFactor: ClassificationFactor = {
        factor: 'Schedule Flexibility',
        value: scheduleFlexibility === 'fixed' ? 'Fixed schedule' : scheduleFlexibility === 'flexible' ? 'Flexible schedule' : 'Somewhat flexible',
        favorsContractor: scheduleFlexibility === 'flexible',
        weight: 2
    };
    factors.push(scheduleFactor);
    if (scheduleFlexibility === 'flexible') contractorScore += 2;
    else if (scheduleFlexibility === 'fixed') employeeScore += 2;
    else { contractorScore += 0.5; employeeScore += 0.5; }

    // Equipment Ownership Factor
    const equipmentFactor: ClassificationFactor = {
        factor: 'Equipment Ownership',
        value: equipmentOwnership === 'company' ? 'Company provides' : equipmentOwnership === 'worker' ? 'Worker provides' : 'Both provide',
        favorsContractor: equipmentOwnership === 'worker',
        weight: 2
    };
    factors.push(equipmentFactor);
    if (equipmentOwnership === 'worker') contractorScore += 2;
    else if (equipmentOwnership === 'company') employeeScore += 2;
    else { contractorScore += 0.5; employeeScore += 0.5; }

    // Ability to Work for Others Factor
    const otherWorkFactor: ClassificationFactor = {
        factor: 'Can Work for Others',
        value: canWorkForOthers ? 'Yes' : 'No',
        favorsContractor: canWorkForOthers,
        weight: 2
    };
    factors.push(otherWorkFactor);
    if (canWorkForOthers) contractorScore += 2;
    else employeeScore += 2;

    // Payment Method Factor
    const paymentFactor: ClassificationFactor = {
        factor: 'Payment Method',
        value: paymentMethod === 'hourly' ? 'Hourly wage' : paymentMethod === 'project' ? 'Per project' : 'Salary',
        favorsContractor: paymentMethod === 'project',
        weight: 2
    };
    factors.push(paymentFactor);
    if (paymentMethod === 'project') contractorScore += 2;
    else if (paymentMethod === 'salary') employeeScore += 2;
    else employeeScore += 1;

    // Benefits Factor
    const benefitsFactor: ClassificationFactor = {
        factor: 'Benefits Provided',
        value: benefitsProvided ? 'Yes' : 'No',
        favorsContractor: !benefitsProvided,
        weight: 2
    };
    factors.push(benefitsFactor);
    if (!benefitsProvided) contractorScore += 2;
    else employeeScore += 2;

    // Calculate totals
    const totalScore = contractorScore + employeeScore;
    const confidenceScore = Math.abs(contractorScore - employeeScore) / totalScore * 100;

    // Determine classification
    let classification: 'contractor' | 'employee' | 'unclear';
    if (contractorScore > employeeScore + 2) {
        classification = 'contractor';
    } else if (employeeScore > contractorScore + 2) {
        classification = 'employee';
    } else {
        classification = 'unclear';
    }

    // Identify risk areas
    const riskAreas: string[] = [];
    if (workControl === 'company' && !benefitsProvided) {
        riskAreas.push('High control without benefits may indicate misclassification');
    }
    if (scheduleFlexibility === 'fixed' && paymentMethod === 'project') {
        riskAreas.push('Fixed schedule with project pay is uncommon for contractors');
    }
    if (!canWorkForOthers && paymentMethod === 'project') {
        riskAreas.push('Exclusivity requirement may suggest employee relationship');
    }
    if (classification === 'unclear') {
        riskAreas.push('Mixed factors require careful review of specific circumstances');
    }

    // Generate message
    let message: string;
    if (classification === 'contractor') {
        message = 'Factors suggest independent contractor classification';
    } else if (classification === 'employee') {
        message = 'Factors suggest employee classification';
    } else {
        message = 'Classification is unclear - review specific facts';
    }

    return {
        classification,
        confidenceScore,
        contractorScore,
        employeeScore,
        factors,
        riskAreas,
        message
    };
}
