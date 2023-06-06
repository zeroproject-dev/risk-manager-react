interface SelectRiskProps {
	label: string;
	name: string;
	options: { value: string; label: string }[];
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function SelectRisk({
	onChange,
	label,
	name,
	value,
	options,
}: SelectRiskProps) {
	return (
		<label>
			{label}:
			<select name={name} onChange={onChange} value={value}>
				{options.map((option) => {
					return (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					);
				})}
			</select>
		</label>
	);
}