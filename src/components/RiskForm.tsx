import { useState } from 'react';
import { Control, Risk } from '../types/Risk';
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
	const [controls, setControls] = useState<Control[]>([]);
	const [risk, setRisk] = useState<Risk>(createRisk());
	// const [riskForm, setRiskForm] = useState<any>();

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
		e.target.focus();
		if (e.target.name.includes('.')) {
			const [idx, key] = e.target.name.split('.');
			// if (key === 'name') {
			// 	e.target.focus({
			// 		preventScroll: true,
			// 	});
			// }
			const newControls = [...controls];
			const newControl = {
				...newControls[parseInt(idx)],
				[key]: value,
			} as Control;
			newControls[parseInt(idx)] = newControl;

			let i = 0;
			newControls.forEach((control) => {
				i +=
					Number(control.level) +
					Number(control.frequency) +
					Number(control.type);
			});

			i /= newControls.length;

			setControls(newControls);

			const newRisk = {
				...risk,
				eControls: Math.round(i),
				rr: risk.ri - Math.round(i),
			};
			setRisk(newRisk);
			return;
		}

		const newRisk = { ...risk, [name]: value };
		console.log(newRisk);

		if (e.target instanceof HTMLSelectElement) {
			if (name.includes('ri'))
				newRisk.ri = newRisk.riProbability * newRisk.riImpact;
			else if (name.includes('rr')) newRisk.rr = newRisk.ri - newRisk.eControls;
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
				<button
					type="button"
					onClick={() =>
						setControls([
							...controls,
							{ name: '', type: '1', level: '1', frequency: '1' } as Control,
						])
					}
				>
					Agregar control
				</button>
				{controls.map((control, idx) => (
					<div key={crypto.randomUUID()}>
						<label>
							<input
								name={`${idx}.name`}
								onChange={handleChangeInput}
								value={control.name}
								placeholder="Control"
							/>
						</label>
						<SelectRisk
							label="Tipo"
							name={`${idx}.type`}
							options={typesOptions}
							value={control.type}
							onChange={handleChangeInput}
						/>
						<SelectRisk
							label="Nivel"
							name={`${idx}.level`}
							options={levelOptions}
							value={control.level}
							onChange={handleChangeInput}
						/>
						<SelectRisk
							label="Frecuencia"
							name={`${idx}.frequency`}
							options={frequencyOptions}
							value={control.frequency}
							onChange={handleChangeInput}
						/>
					</div>
				))}
				<small>Eficacia de control: {risk.eControls}</small>
			</Fieldset>

			<Fieldset title="Riesgo Residual">
				{/* <SelectRisk
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
				/> */}
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
