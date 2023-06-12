export interface Risk {
	id: string;
	// identificación y valoración
	service: string;
	vulnerabilityOrThreat: string;
	consequences: string;
	// riesgo inherente
	riProbability: number;
	riImpact: number;
	ri: number;
	// mitigación y control
	treatment: string;
	controls: Control[];
	eControls: number;
	// type: string;
	// level: string;
	// frequency: string;
	// riesgo residual
	rrProbability: number;
	rrImpact: number;
	rr: number;
}

export interface Control {
	name: string;
	type: string;
	level: string;
	frequency: string;
}
