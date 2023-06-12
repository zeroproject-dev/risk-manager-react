import { useState } from 'react';
import { Control, Risk } from '../types/Risk';
import { Fieldset } from './Fieldset';
import { SelectRisk } from './SelectRisk';
import { selectOptions } from '../libs/Options';
import { ControlsForm } from './ControlsForm';

interface RiskFormProps {
	onSubmitRisk: (risk: Risk) => void;
}

const createRisk = (): Risk => ({
	id: '',
	service: '',
	vulnerabilityOrThreat: '',
	consequences: '',
	riProbability: 1,
	riImpact: 1,
	ri: 1,
	treatment: '',
	controls: [],
	eControls: 0,
	// type: 'P',
	// level: 'A',
	// frequency: 'D',
	rrProbability: 1,
	rrImpact: 1,
	rr: 1,
});

export function RiskForm({ onSubmitRisk }: RiskFormProps) {
	const [risk, setRisk] = useState<Risk>(createRisk());
	const [riskForm, setRiskForm] = useState<any>();

	const handleSubmitRisk = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmitRisk(risk);
		setRisk(createRisk());
	};

	const handleChangeInput = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;
		setRiskForm((prev: any) => {
			const newR = { ...prev, [name]: value };
			return newR;
		});

		const newRisk = { ...risk, [name]: value };

		if (e.target instanceof HTMLSelectElement) {
			if (name.includes('ri'))
				newRisk.ri = newRisk.riProbability * newRisk.riImpact;
		}

		setRisk(newRisk);
	};

	const getResult = (newControls: Control[], eControl: number) => {
		setRisk((prev) => {
			const newRisk = {
				...prev,
				controls: newControls,
				eControls: eControl,
				rr: risk.ri - eControl,
			};
			console.log('newRisk');
			console.log(newRisk);
			return newRisk;
		});
	};

	return (
		<form className="createRisk" onSubmit={handleSubmitRisk}>
			<Fieldset title="Identificación y valoración">
				<div>
					<input
						type="text"
						value={riskForm?.service ?? ''}
						onChange={handleChangeInput}
						name="service"
						placeholder="Servicio afectado"
						required
					/>
					<input
						type="text"
						value={riskForm?.vulnerabilityOrThreat ?? ''}
						onChange={handleChangeInput}
						name="vulnerabilityOrThreat"
						placeholder="Vulnerabilidad o Amenaza"
						required
					/>
				</div>
				<textarea
					value={riskForm?.consequences ?? ''}
					onChange={handleChangeInput}
					name="consequences"
					placeholder="Consecuencias"
					rows={5}
					required
				/>
			</Fieldset>

			<Fieldset title="Riesgo Inherente">
				<SelectRisk
					label="Impacto"
					name="riImpact"
					options={selectOptions}
					value={riskForm?.riImpact?.toString() ?? ''}
					onChange={handleChangeInput}
				/>
				<SelectRisk
					label="Probabilidad"
					name="riProbability"
					options={selectOptions}
					value={riskForm?.riProbability?.toString() ?? ''}
					onChange={handleChangeInput}
				/>
				<label>
					<input
						type="number"
						name="ri"
						value={risk.ri}
						placeholder="Ri"
						readOnly
					/>
				</label>
			</Fieldset>

			<Fieldset title="Controles">
				<label>
					<input
						type="text"
						name="treatment"
						onChange={handleChangeInput}
						value={riskForm?.treatment ?? ''}
						placeholder="Tratamiento"
					/>
				</label>
				<ControlsForm getResult={getResult} />
				<small>Eficiencia de control: {risk.eControls}</small>
			</Fieldset>

			<Fieldset title="Riesgo Residual">
				<label>
					<input
						type="number"
						value={risk.rr}
						name="rr"
						placeholder="Riesgo Residual"
						readOnly
					/>
				</label>
			</Fieldset>

			<button>Guardar</button>
		</form>
	);
}
