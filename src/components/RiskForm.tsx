import { useState } from 'react';
import { Risk } from '../types/Risk';
import { Fieldset } from './Fieldset';
import { SelectRisk } from './SelectRisk';
import {
	frequencyOptions,
	levelOptions,
	selectOptions,
	typesOptions,
} from '../libs/Options';

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
	controls: '',
	type: 'P',
	level: 'A',
	frequency: 'D',
	rrProbability: 1,
	rrImpact: 1,
	rr: 1,
});

export function RiskForm({ onSubmitRisk }: RiskFormProps) {
	const [risk, setRisk] = useState<Risk>(createRisk());

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
		const newRisk = { ...risk, [name]: value };

		if (e.target instanceof HTMLSelectElement) {
			if (name.includes('ri'))
				newRisk.ri = newRisk.riProbability * newRisk.riImpact;
			else if (name.includes('rr'))
				newRisk.rr = newRisk.rrProbability * newRisk.rrImpact;
		}

		setRisk(newRisk);
	};

	return (
		<form className="createRisk" onSubmit={handleSubmitRisk}>
			<Fieldset title="Identificación y valoración">
				<div>
					<input
						type="text"
						value={risk.service}
						onChange={handleChangeInput}
						name="service"
						placeholder="Servicio afectado"
						required
					/>
					<input
						type="text"
						value={risk.vulnerabilityOrThreat}
						onChange={handleChangeInput}
						name="vulnerabilityOrThreat"
						placeholder="Vulnerabilidad o Amenaza"
						required
					/>
				</div>
				<textarea
					value={risk.consequences}
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
					value={risk.riImpact.toString()}
					onChange={handleChangeInput}
				/>
				<SelectRisk
					label="Probabilidad"
					name="riProbability"
					options={selectOptions}
					value={risk.riProbability.toString()}
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
						value={risk.treatment}
						placeholder="Tratamiento"
					/>
				</label>
				<label>
					<textarea
						name="controls"
						onChange={handleChangeInput}
						value={risk.controls}
						placeholder="Controles"
					/>
				</label>
				<SelectRisk
					label="Tipo"
					name="type"
					options={typesOptions}
					value={risk.type}
					onChange={handleChangeInput}
				/>
				<SelectRisk
					label="Nivel"
					name="level"
					options={levelOptions}
					value={risk.level}
					onChange={handleChangeInput}
				/>
				<SelectRisk
					label="Frecuencia"
					name="frequency"
					options={frequencyOptions}
					value={risk.frequency}
					onChange={handleChangeInput}
				/>
			</Fieldset>

			<Fieldset title="Riesgo Residual">
				<SelectRisk
					label="Impacto"
					name="rrImpact"
					options={selectOptions}
					value={risk.rrImpact.toString()}
					onChange={handleChangeInput}
				/>
				<SelectRisk
					label="Probabilidad"
					name="rrProbability"
					options={selectOptions}
					value={risk.rrProbability.toString()}
					onChange={handleChangeInput}
				/>
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
