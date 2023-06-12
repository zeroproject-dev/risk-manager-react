import { useRef, useState } from 'react';
import { Control } from '../types/Risk';
import { SelectRisk } from './SelectRisk';
import { frequencyOptions, levelOptions, typesOptions } from '../libs/Options';

function fromTagToNumber(
	options: {
		value: string;
		tag: string;
		label: string;
	}[],
	tag: string
) {
	return options.find((option: any) => option.tag === tag)?.value;
}

export function ControlsForm({ getResult }: any) {
	const [controls, setControls] = useState<Control[]>([]);
	const inputRefs = useRef<HTMLInputElement[]>([]);
	const keyCounter = useRef(0);

	const handleChangeInput = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
		id: number
	) => {
		const newControls = [...controls];
		if (e.target.name === 'name') {
			newControls[id] = {
				...newControls[id],
				name: e.target.value,
			};
		} else {
			newControls[id] = {
				...newControls[id],
				[e.target.name]: e.target.value,
			};
		}

		let i = 0;
		newControls.forEach((control) => {
			i +=
				Number(fromTagToNumber(levelOptions, control.level)) +
				Number(fromTagToNumber(frequencyOptions, control.frequency)) +
				Number(fromTagToNumber(typesOptions, control.type));
		});

		i /= newControls.length;

		inputRefs.current[id].focus();

		getResult(newControls, Math.round(i));

		setControls(newControls);
	};

	const handleAddControl = () => {
		setControls([
			...controls,
			{ name: '', type: 'P', level: 'A', frequency: 'D' } as Control,
		]);
		keyCounter.current++;
	};

	return (
		<>
			<button type="button" onClick={handleAddControl}>
				Agregar control
			</button>
			{controls.map((control, idx) => (
				<div key={`control-${keyCounter.current}-${idx}`}>
					<label>
						<input
							ref={(el) => (inputRefs.current[idx] = el as HTMLInputElement)}
							name={`name`}
							onChange={(e) => handleChangeInput(e, idx)}
							value={control.name}
							placeholder="Control"
						/>
					</label>
					<SelectRisk
						label="Tipo"
						name={`type`}
						options={typesOptions}
						value={control.type}
						onChange={(e) => handleChangeInput(e, idx)}
						tag={true}
					/>
					<SelectRisk
						label="Nivel"
						name={`level`}
						options={levelOptions}
						value={control.level}
						onChange={(e) => handleChangeInput(e, idx)}
						tag={true}
					/>
					<SelectRisk
						label="Frecuencia"
						name={`frequency`}
						options={frequencyOptions}
						value={control.frequency}
						onChange={(e) => handleChangeInput(e, idx)}
						tag={true}
					/>
				</div>
			))}
		</>
	);
}
